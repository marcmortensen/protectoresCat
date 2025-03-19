import { getAbsoluteLinkURL as _getAbsoluteLinkURL } from '../../utils/links.js';

const TARGET_DOMAIN = 'https://www.aparodamon.com';
export const TARGET_ENTRY_POINT_URL = `${TARGET_DOMAIN}/wp-content/lt/lt-animals-get.php`;

export const getAbsoluteLinkURL = (link: string): string =>
  _getAbsoluteLinkURL(TARGET_DOMAIN, link);
