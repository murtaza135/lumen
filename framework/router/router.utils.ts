import { Route, RouteWithAction, RouteResult, routeHtmlSchema, routeRedirectSchema } from './router.types';
import { render } from '../dom/render';
import { history } from './history';

export function extractRoutes(routes: (Route | null)[]) {
  const nonNullRoutes = routes.filter((route): route is Route => !!route);
  const routesWithActions: RouteWithAction[] = nonNullRoutes
    .filter(({ path }) => path !== "*" && path.toLowerCase() !== "x")
    .map(route => ({ path: route.path, action: extractRouteResult(route) }));
  const notFoundRoute = nonNullRoutes.filter(({ path }) => path === "*")[0]?.html;
  const errorRoute = nonNullRoutes.filter(({ path }) => path.toLowerCase() === "x")[0]?.html;
  return { routesWithActions, notFoundRoute, errorRoute };
}

export function extractRouteResult(route: Route) {
  const isValidRoute = routeHtmlSchema.safeParse(route).success
    || routeRedirectSchema.safeParse(route).success;

  if (isValidRoute) {
    return () => ({ html: route.html, redirect: route.redirect });
  } else {
    throw new Error("Route does not have any html or redirect");
  }
}

export function renderRoute(root: Element, route: RouteResult) {
  if (routeHtmlSchema.safeParse(route).success) {
    render(root, route.html!);
  } else if (routeRedirectSchema.safeParse(route).success) {
    history.push(route.redirect!);
  } else {
    throw new Error("Route does not have any html or redirect");
  }
}