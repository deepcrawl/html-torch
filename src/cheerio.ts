import * as cheerio from 'cheerio';

export const getAllAttributes = function (node: cheerio.Element) {
  return (
    node.attributes ||
    Object.keys(node.attribs).map((name) => ({
      name,
      value: node.attribs[name],
    }))
  );
};

export const getTagName = function (
  node: cheerio.Element,
  $: cheerio.CheerioAPI,
) {
  return $(node).get(0)!.tagName;
};
