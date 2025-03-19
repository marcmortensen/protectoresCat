import { getAbsoluteLinkURL as _getAbsoluteLinkURL } from '../../utils/links.js';

const TARGET_DOMAIN = 'https://caas.selva.cat';
export const TARGET_ENTRY_POINT_URL = `${TARGET_DOMAIN}/registre.php`;

export const getAbsoluteLinkURL = (link: string): string =>
  _getAbsoluteLinkURL(TARGET_DOMAIN, link);
