import * as cheerio from 'cheerio';
import { HTMLTorchOptions } from '../options';
import { getAllAttributes } from '../cheerio';

export const torchForAllAttributes = async (
  element: cheerio.AnyNode,
  options: HTMLTorchOptions,
  $: cheerio.CheerioAPI,
) => {
  const attributes = getAllAttributes($(element).get(0) as cheerio.Element);

  if (options.torchAttributes) {
    const usefulAttributesWithARIA = [
      'src',
      'href',
      'alt',
      'title',
      'role',
      'aria-label',
      'aria-hidden',
      'aria-atomic',
      'focusable',
      'class',
      'id',
      'name',
      'type',
      'value',
      'placeholder',
      'checked',
      'disabled',
      'readonly',
      'selected',
      'required',
      'for',
      'tabindex',
      'maxlength',
      'minlength',
      'pattern',
      'size',
      'maxlength',
      'min',
      'max',
      'step',
      'multiple',
      'autocomplete',
      'autofocus',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
    ];

    // * Remove all attributes that are not useful
    attributes.forEach((attr) => {
      if (!usefulAttributesWithARIA.includes(attr.name)) {
        $(element).removeAttr(attr.name);
      }

      if (options.removeAttributeOfClass && attr.name === 'class') {
        $(element).removeAttr(attr.name);
      }
    });
  } else {
    for (let j = 0; j < attributes.length; j++) {
      const attr = attributes[j];
      // * Remove if the attribute name starts with on
      if (options.removeAttributeOfOnEvent && attr.name.startsWith('on')) {
        $(element).removeAttr(attr.name);
      }

      // * Remove if the attribute name is style
      if (options.removeAttributeOfStyle && attr.name === 'style') {
        $(element).removeAttr(attr.name);
      }
    }
  }

  if (options.torchDataUrl) {
    if ($(element).attr('src')?.startsWith('data:')) {
      $(element).removeAttr('src');
    }
  }
};
