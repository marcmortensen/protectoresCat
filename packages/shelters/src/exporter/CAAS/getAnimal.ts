import { JSDOM } from 'jsdom';
import { monthToDateMonth, Month } from '../../utils/date.js';
import { Animal, Dog } from '../../animalsFromOrganizations.js';
import { getAbsoluteLinkURL } from './utils.js';

const CAAS_ID = 'b1840f32';
const dataKeysToAnimalKeys: Record<string, keyof Animal> = {
  'Número de registre': 'internalId',
  "Nom de l'animal": 'name',
  Especie: 'type',
  Raça: 'breed',
  Sexe: 'isMale',
  Mida: 'size',
  Edat: 'dateOfBirth',
  "Data d'alta al servei d'adopcions": 'isReadyForAdoption',
  "Data d'entrada al CAAS": 'dateOfAdmission',
};

export async function getAnimal(
  detailLink: string,
  name: string,
): Promise<Animal | null> {
  try {
    const detailResponse = await fetch(detailLink);
    const detailHtml = await detailResponse.text();
    const detailDoc = new JSDOM(detailHtml);

    const getImagesSelector = 'table * table * img';
    const images = [
      ...detailDoc.window.document.querySelectorAll(getImagesSelector),
    ].map((img: Element) => getAbsoluteLinkURL(img.getAttribute('src')));
    if (images.length === 0) {
      console.log(`No images found for ${name} on ${detailLink}`);
      return null;
    }
    const dataSheetSelector = 'table * table * table * tr';
    const animal = {};
    detailDoc.window.document
      .querySelectorAll(dataSheetSelector)
      .forEach((element: Element) => {
        const key = element.children[0].textContent;
        const attrb: keyof Animal | undefined = dataKeysToAnimalKeys[key];

        if (attrb) {
          const valueRaw = element.children[1].textContent;
          switch (attrb) {
            case 'isMale':
              animal[attrb] = valueRaw === 'mascle';
              break;
            case 'size':
              animal[attrb] =
                valueRaw === 'gran'
                  ? 'large'
                  : valueRaw === 'mitjà'
                    ? 'medium'
                    : 'small';
              break;
            case 'type':
              animal[attrb] =
                valueRaw === 'gos'
                  ? 'dog'
                  : valueRaw === 'gat'
                    ? 'cat'
                    : 'other';
              break;
            case 'isReadyForAdoption':
              animal[attrb] = false;
              break;
            case 'internalId':
            case 'breed':
            case 'name':
              animal[attrb] = valueRaw;
              break;
            case 'dateOfAdmission': {
              const date = valueRaw.split('/');
              // TODO create a date object to validate date is valid.
              animal[attrb] = `${date[2]}-${date[1]}-${date[0]}T00:00:00.000Z`;
              break;
            }
            case 'dateOfBirth': {
              const mmDDDD = valueRaw
                .match(/\((.*)\)/)
                .pop()
                .split('/');
              const monthString = monthToDateMonth(mmDDDD[0] as Month);
              // TODO create a date object to validate date is valid.
              if (monthString) {
                animal[attrb] = `${mmDDDD[1]}-${monthString}-01T00:00:00.000Z`;
              }
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
          organizationId: CAAS_ID,
          images,
          id: `${CAAS_ID}-${animal['internalId']}`,
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
      case 'cat':
      case 'other':
      default:
        return null;
    }
  } catch (err) {
    console.log(`Unable to fetch detail page of ${name} on `, err);
    return null;
  }
}
