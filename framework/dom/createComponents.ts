import { ClassZero } from '../types';

/**
 * Allow custom components to be renderable onto the DOM
 * @param components an object mapping names to components
 */
export function createComponents(components: Record<string, ClassZero<HTMLElement> | null>) {
  Object.entries(components).forEach(([name, component]) => {
    if (component) {
      customElements.define(name, component);
    }
  });
}
