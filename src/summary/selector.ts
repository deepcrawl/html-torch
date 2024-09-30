import * as cheerio from 'cheerio';

export const getUniqueSelector = (
  element: cheerio.Element,
  $: cheerio.CheerioAPI,
): string => {
  if (element.attribs && element.attribs.id) {
    return `#${element.attribs.id}`;
  }
  const path: string[] = [];
  while (element && element.type === 'tag') {
    let selector = $(element).get(0)!.tagName.toLowerCase();
    if (element.attribs && element.attribs.id) {
      selector += `#${element.attribs.id}`;
      path.unshift(selector);
      break;
    }
    const siblings = $(element).parent().children().toArray();
    const index = siblings.indexOf(element);
    const sameTagSiblings = siblings.filter(
      (sib) => $(sib).get(0)!.tagName === $(element).get(0)!.tagName,
    );
    const position = sameTagSiblings.indexOf(element) + 1;
    if (position > 1) {
      selector += `:nth-of-type(${position})`;
    }
    path.unshift(selector);
    element = $(element).parent().get(0) as cheerio.Element;
  }
  return path.join(' > ');
};
