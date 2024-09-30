import * as cheerio from 'cheerio';
import { readableDOM } from './readable';

export const summaryDOM = ($: cheerio.CheerioAPI) => {
  const { elements, selectors } = readableDOM($);
  return { elements, selectors };
};
