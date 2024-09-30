import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';
import { getAllAttributes } from '../cheerio';

// * Define the tags and attributes you want to keep among the meta tags.
export const keepMetaTags: Record<string, string[]> = {
  description: ['content'],
  keywords: ['content'],
  viewport: ['content'],
  charset: [],
};

export const torchForMeta = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  if (options.torchMetaTag) {
    // * Check if the meta tag has text for the visually impaired
    const name =
      $(element).attr('name') ||
      $(element).attr('property') ||
      $(element).attr('http-equiv') ||
      '';

    // * Check if it is a meta tag to keep.
    if (Object.keys(keepMetaTags).includes(name)) {
      // * Remove all attributes except the ones to keep.
      const attributes = getAllAttributes($(element).get(0) as cheerio.Element);
      attributes.forEach((attr) => {
        if (
          !keepMetaTags[name].includes(attr.name) &&
          attr.name !== 'content'
        ) {
          $(element).removeAttr(attr.name);
        }
      });
    } else {
      // * Remove the tag if it is not a tag to keep.
      $(element).remove();
    }
  }
};
