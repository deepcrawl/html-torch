import { torchForAllTags } from './tags/index';
import { torchForAllAttributes } from './atributes/index';
import { HTMLTorchOptions, defaultHTMLTorchOptions } from './options';
import { summaryDOM } from './summary/index';
import * as cheerio from 'cheerio';

export default async function htmlTorch(
  html: string,
  _options: HTMLTorchOptions,
) {
  const options = {
    ...defaultHTMLTorchOptions,
    ..._options,
  };
  const $ = cheerio.load(html);

  // * Iterate through all tags
  const elements = $('*');
  for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
    // * Get the current tag
    const element = elements[elementIndex];

    // * Torch the tag based on its type
    await torchForAllTags(element, options, $);

    // * Iterate through all attributes of the tag
    await torchForAllAttributes(element, options, $);
  }

  // * Get the string of all html tags in dom
  const torchedHTML = $.html();

  // * Get the summary of the HTML
  const summaryJSON = summaryDOM($);

  return { torchedHTML, summaryJSON };
}

export { HTMLTorchOptions };
