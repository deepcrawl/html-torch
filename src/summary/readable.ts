import * as cheerio from 'cheerio';
import { getUniqueSelector } from './selector';
import { getTagName } from '../cheerio';

export type ReadableContent = {
  text?: string;
  tag: string;
  selector: string;
};

export type ReadableElement = {
  text?: string;
  tag: string;
  selector: string;
  children?: ReadableElement[];
};

export const readableDOM = (
  $: cheerio.CheerioAPI,
): { elements: ReadableElement[]; selectors: string[] } => {
  const selectors: string[] = [];

  const getOrAddSelectorIndex = (selector: string) => {
    const index = selectors.indexOf(selector);
    if (index !== -1) {
      return `#s_${index}`;
    }
    selectors.push(selector);
    return `#s_${selectors.length - 1}`;
  };

  const createReadableElement = (
    element: cheerio.Element,
  ): ReadableElement | null => {
    const text = $(element)
      .contents()
      .toArray()
      .filter(
        (node) =>
          node.type === 'text' ||
          getTagName(node as cheerio.Element, $) === 'title' ||
          getTagName(node as cheerio.Element, $) === 'meta',
      )
      .map((node) => $(node).text().trim())
      .filter(Boolean)
      .join(' ');

    const selector = getOrAddSelectorIndex(getUniqueSelector(element, $));

    const readableElement: ReadableElement = {
      text: text || '',
      tag: element.tagName.toLowerCase(),
      selector,
      children: [],
    };

    if (!text) delete readableElement.text;

    $(element)
      .children()
      .toArray()
      .forEach((child) => {
        const childElement = createReadableElement(child as cheerio.Element);
        if (childElement) {
          readableElement.children?.push(childElement);
        }
      });

    if (!text && readableElement.children?.length === 0) return null;

    return readableElement;
  };

  const flattenEmptyElements = (
    element: ReadableElement,
  ): ReadableElement | null => {
    if (element.text || (element.children && element.children.length > 0)) {
      element.children = element
        .children!.map(flattenEmptyElements)
        .filter(Boolean) as ReadableElement[];
      const nonEmptyChildren: ReadableElement[] = [];
      element.children.forEach((child) => {
        if (child.text) {
          nonEmptyChildren.push(child);
        } else {
          if (child.children) nonEmptyChildren.push(...child.children);
        }
      });
      element.children = nonEmptyChildren;
      return element;
    }
    return null;
  };

  const removeEmptyChildren = (element: ReadableElement): ReadableElement => {
    if (element.children && element.children.length === 0) {
      delete element.children;
    } else if (element.children) {
      element.children = element.children.map(removeEmptyChildren);
    }
    return element;
  };

  let rootElements = [
    ...$('head').children().toArray(),
    ...$('body').children().toArray(),
  ]
    .map(createReadableElement)
    .filter(Boolean) as ReadableElement[];

  rootElements = rootElements
    .map(flattenEmptyElements)
    .filter(Boolean) as ReadableElement[];
  rootElements = rootElements.map(removeEmptyChildren);

  return { elements: rootElements, selectors };
};
