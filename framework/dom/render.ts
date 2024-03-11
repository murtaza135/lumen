import { render as uhtmlRender, Hole } from 'uhtml';

/**
 * A tag to render html to the DOM
 * @param root the root element in which to render the html
 * @param html the html to render
 * @returns the `root` element
 */
export function render<T>(root: T, html: Hole): T {
  return uhtmlRender(root, () => html);
}
