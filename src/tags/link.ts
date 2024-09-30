import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';

export const torchForLink = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  if (options.removeLinkTag) {
    $(element).remove();
  }
};
