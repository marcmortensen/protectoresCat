import { JSDOM } from 'jsdom';
import { subtractYears, formatMonthToDateMonth } from '../../utils/date.js';
import { Animal, Cat, Dog } from '../../animalsFromOrganizations.js';
import { capitalizeFirstLetter } from '../../utils/string.js';

const RODAMON_ID = 'e21ae529';
const dataKeysToAnimalKeys: Record<string, keyof Animal> = {
  'Tipus animal:': 'type',
  'Raça:': 'breed',
  'Sexe:': 'isMale',
  'Mida:': 'size',
  'Anys:': 'dateOfBirth',
  'Data entrada:': 'dateOfAdmission',
  "Data d'alta servei adopcions:": 'isReadyForAdoption',
};

export async function getAnimal(
  detailLink: string,
  name: string,
): Promise<Animal | null> {
  try {
    const detailResponse = await fetch(detailLink);
    const detailHtml = await detailResponse.text();
    const detailDoc = new JSDOM(detailHtml);

    const getImagesSelector = 'table.TablaMarcFitxa img';
    const images = [
      ...detailDoc.window.document.querySelectorAll(getImagesSelector),
    ].map((img: Element) => img.getAttribute('src'));

    // Remove duplicated image.
    images.splice(0, 1);

    if (images.length === 0) {
      console.log(`No images found for ${name} on ${detailLink}`);
      return null;
    }
    const dataSheetSelector = 'table * tr td span';
    const animal = { internalId: detailLink.match(/\d+$/)[0], name };
    detailDoc.window.document
      .querySelectorAll(dataSheetSelector)
      .forEach((element: Element) => {
        const key = element.textContent;
        const attrb: keyof Animal | undefined = dataKeysToAnimalKeys[key];

        if (attrb) {
          const valueRaw = element.nextSibling.textContent
            .replace(/\t/g, '')
            .replace(' ', '');
          switch (attrb) {
            case 'isMale':
              animal[attrb] = valueRaw === 'M';
              break;
            case 'size':
              animal[attrb] =
                valueRaw === 'Gran'
                  ? 'large'
                  : valueRaw === 'Mitjana'
                    ? 'medium'
                    : 'small';
              break;
            case 'type':
              animal[attrb] =
                valueRaw === 'Gos'
                  ? 'dog'
                  : valueRaw === 'Gat'
                    ? 'cat'
                    : 'other';
              break;
            case 'breed':
              animal[attrb] = capitalizeFirstLetter(valueRaw.toLowerCase());
              break;
            case 'dateOfAdmission': {
              const date = valueRaw.split('-');
              // TODO create a date object to validate date is valid.
              animal[attrb] = `${date[2]}-${date[1]}-${date[0]}T00:00:00.000Z`;
              break;
            }
            case 'dateOfBirth': {
              const years = parseInt(valueRaw, 10);
              const dt = new Date();
              const date = subtractYears(dt, years);
              animal[attrb] =
                `${date.getFullYear()}-${formatMonthToDateMonth(date.getMonth())}-01T00:00:00.000Z`;

              break;
            }
            case 'isReadyForAdoption': {
              const date = valueRaw.split('-');
              animal[attrb] =
                new Date(`${date[2]}/${date[1]}/${date[0]}`) <= new Date();
              break;
            }
            default:
              break;
          }
        }
      });

    switch (animal['type'] as Animal['type']) {
      case 'dog': {
        const dog: Dog = {
          type: 'dog',
          organizationId: RODAMON_ID,
          images,
          id: `${RODAMON_ID}-${animal['internalId']}`,
          name: animal['name'],
          isMale: animal['isMale'],
          internalId: animal['internalId'],
          dateOfBirth: animal['dateOfBirth'],
          originUrl: detailLink,
          size: animal['size'],
          breed: animal['breed'] !== undefined ? animal['breed'] : 'Indefinit',
          dateOfAdmission: animal['dateOfAdmission'],
          isReadyForAdoption:
            animal['isReadyForAdoption'] !== undefined
              ? animal['isReadyForAdoption']
              : true,
        };
        return dog;
      }
      case 'cat': {
        const cat: Cat = {
          type: 'cat',
          organizationId: RODAMON_ID,
          images,
          id: `${RODAMON_ID}-${animal['internalId']}`,
          name: animal['name'],
          isMale: animal['isMale'],
          internalId: animal['internalId'],
          dateOfBirth: animal['dateOfBirth'],
          originUrl: detailLink,
          size: animal['size'],
          breed: animal['breed'] !== undefined ? animal['breed'] : 'Indefinit',
          dateOfAdmission: animal['dateOfAdmission'],
          isReadyForAdoption:
            animal['isReadyForAdoption'] !== undefined
              ? animal['isReadyForAdoption']
              : true,
        };
        return cat;
      }
      case 'other':
      default:
        return null;
    }
  } catch (err) {
    console.log(`Unable to fetch detail page of ${name} on `, err);
    return null;
  }
}
