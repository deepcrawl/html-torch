/**
 * Options for the HTMLTorch function.
 */
export type HTMLTorchOptions = {
  /**
   * Removes all script tags from HTML.
   */
  removeScriptTag?: boolean;
  /**
   * Removes all style tags from HTML.
   */
  removeStyleTag?: boolean;
  /**
   * Removes all attributes that start with "on".
   */
  removeAttributeOfOnEvent?: boolean;
  /**
   *  Removes all style attributes from HTML.
   */
  removeAttributeOfStyle?: boolean;
  /**
   * Removes all class attributes from HTML.
   */
  removeAttributeOfClass?: boolean;
  /**
   * Removes all svg tags from HTML.
   */
  removeSvgTag?: boolean;
  /**
   * Removes all link tags from HTML.
   */
  removeLinkTag?: boolean;
  /**
   * Removes unnecessary meta tags.
   */
  torchMetaTag?: boolean;
  /**
   * Removes unnecessary attributes of all tags.
   */
  torchAttributes?: boolean;
  /**
   * Removes unnecessary Data URLs.
   */
  torchDataUrl?: boolean;
};

export const defaultHTMLTorchOptions: HTMLTorchOptions = {
  removeScriptTag: true,
  removeStyleTag: true,
  removeAttributeOfOnEvent: true,
  removeAttributeOfStyle: true,
  removeAttributeOfClass: false,
  removeSvgTag: true,
  removeLinkTag: true,
  torchMetaTag: true,
  torchAttributes: true,
  torchDataUrl: true,
};
