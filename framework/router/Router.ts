import UniversalRouter from 'universal-router';
import { history } from './history';
import { Route, RouteResult } from './router.types';
import { renderRoute, extractRoutes } from './router.utils';
import { html } from '../dom/html';

type RouterConstructor = {
  root: Element,
  routes: (Route | null)[];
};

export class Router {
  private router: UniversalRouter;
  private unlisten: () => void;

  constructor({ root, routes }: RouterConstructor) {
    const { routesWithActions, notFoundRoute, errorRoute } = extractRoutes(routes);

    this.router = new UniversalRouter<RouteResult>(routesWithActions, {
      context: { router: this },
      errorHandler: (error) => {
        const notFoundComponent = notFoundRoute ?? html`<p>404 Not Found</p>`;
        const errorComponent = errorRoute ?? html`<p>Oops, something went wrong</p>`;
        const htmlComponent = error.status === 404 ? notFoundComponent : errorComponent;
        return { html: htmlComponent, redirect: undefined };
      },
      resolveRoute: (context, params) => {
        history.setParams(params);
        return context.route.action?.(context, params);
      }
    });

    this.router.resolve(location.pathname)
      .then(route => renderRoute(root, route));

    this.unlisten = history.history.listen((update) => {
      this.router.resolve(update.location.pathname)
        .then(route => renderRoute(root, route));
    });
  }

  public _destruct() {
    this.unlisten();
  }
}

/**
 * Create a `Router` instance
 * @param object an object containing the root element to render at, and an array of `Route` objects
 * @returns a `Router` instance
 */
export function createRouter({ root, routes }: RouterConstructor) {
  return new Router({ root, routes });
}