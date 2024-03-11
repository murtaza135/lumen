import { htmlUnsafe } from './html';
import { Hole } from 'uhtml';

export type Converter<T = any> = (attrs: string) => T;

/**
 * Premade converters for the BaseComponent attr() method.
 * Converters included are `(string) => string`, `(string) => number`,
 * `(string) => boolean`, and `(string) => html`
 */
export const converter = {
  string: ((attr: string) => String(attr)) as Converter<string>,
  number: ((attr: string) => Number(attr)) as Converter<number>,
  boolean: ((attr: string) => attr === "true") as Converter<boolean>,
  html: ((attr: string) => htmlUnsafe(attr)) as Converter<Hole>
};
