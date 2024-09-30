import { getTagName } from '../cheerio';
import { HTMLTorchOptions } from '../options';
import { torchForLink } from './link';
import { torchForMeta } from './meta';
import { torchForScript } from './script';
import { torchForStyle } from './style';
import { torchForSVG } from './svg';
import * as cheerio from 'cheerio';

export const torchForAllTags = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  const tagName = getTagName(element as cheerio.Element, $);
  if (tagName === 'script') {
    await torchForScript(element, options, $);
  } else if (tagName === 'style') {
    await torchForStyle(element, options, $);
  } else if (tagName === 'meta') {
    await torchForMeta(element, options, $);
  } else if (tagName === 'svg') {
    await torchForSVG(element, options, $);
  } else if (tagName === 'link') {
    await torchForLink(element, options, $);
  }
};
