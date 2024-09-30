import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';

export const torchForSVG = (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  if (options.removeSvgTag) {
    $(element).empty();
  }
};
