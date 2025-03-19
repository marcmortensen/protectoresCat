import { JSDOM } from 'jsdom';
import { delay } from '../../utils/delay.js';
import { Animal } from '../../animalsFromOrganizations.js';
import { getAbsoluteLinkURL, TARGET_ENTRY_POINT_URL } from './utils.js';
import { getAnimal } from './getAnimal.js';

const params = new URLSearchParams({
  limit: '1000',
  start: '0',
  lloc: 'adoptar',
});

export async function getAnimals(): Promise<Animal[]> {
  try {
    const arr: Animal[] = [];
    const response = await fetch(TARGET_ENTRY_POINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const doc = new JSDOM(`<html><table><tbody>${html}</tbody></table></html>`);

    const nodes = doc.window.document.querySelectorAll('tr');
    const concurrencyLimit = 10; // Adjust this number based on your needs
    const queue = [];

    for (const node of nodes) {
      const name = node.querySelector('th').textContent.replace(/\s/g, '');

      const imgSource = node.querySelector('img').getAttribute('src');
      let internalId: string;
      const regExp = /foto_(\d+)_/;
      const matches = regExp.exec(imgSource);
      if (matches && matches[1]) {
        internalId = matches[1];
      } else {
        console.log(`No match found for Rodamon ${name}`);
        continue;
      }

      const detailLink = getAbsoluteLinkURL(
        `wp-content/lt/lt-animals-fitxa.php?id=${internalId}`,
      );

      const promise = getAnimal(detailLink, name)
        .then((animal) => {
          if (animal) {
            arr.push(animal);
          } else {
            console.log(
              `No animal was pusehd for ${name} on ${detailLink}`,
              animal,
            );
          }
        })
        .catch((error) => {
          console.error(`Error fetching animal details for ${name}:`, error);
        });

      queue.push(promise);

      if (queue.length >= concurrencyLimit) {
        await Promise.race(queue);
        queue.splice(
          queue.findIndex(
            (p) => p.status === 'fulfilled' || p.status === 'rejected',
          ),
          1,
        );
      }
    }

    // Introduce a delay to ensure all promises are checked
    while (queue.length > 0) {
      await delay(1500); // Adjust the delay as needed
      await Promise.race(queue);
      queue.splice(
        queue.findIndex(
          (p) => p.status === 'fulfilled' || p.status === 'rejected',
        ),
        1,
      );
    }

    // Wait for all remaining promises to resolve
    await Promise.all(queue);
    return arr;
  } catch (err) {
    console.log(`Unable to fetch main page: ${TARGET_ENTRY_POINT_URL}`, err);
    return [];
  }
}
