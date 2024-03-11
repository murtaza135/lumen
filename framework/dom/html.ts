import { html as uhtmlHtml, Value, Hole } from 'uhtml';

type RenderValue = Value | Function;

/**
 * A tag to render HTML content
 * @returns renderable and sanitised HTML
 */
export function html(template: TemplateStringsArray, ...values: RenderValue[]): Hole {
  return uhtmlHtml(template, ...values as any) as Hole;
}

/**
 * A function to render unsafe HTML content.
 * 
 * WARNING: this will render HTML without any sanitasation. Therefore you must
 * make sure yourself that all input is appropriately sanitised.
 * 
 * @returns renderable, UNSAFE HTML
 */
export function htmlUnsafe(str: string) {
  return html([str] as any);
}
