import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';

export const torchForScript = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  if (options.removeScriptTag) {
    $(element).remove();
  }
};
