import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';

export const torchForStyle = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  if (options.removeStyleTag) {
    $(element).remove();
  }
};
