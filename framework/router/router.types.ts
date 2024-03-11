import { XOR } from "ts-essentials";
import { Hole } from 'uhtml';
import { z } from "zod";

export type Route = { path: string; } & XOR<{ html: Hole; }, { redirect: string; }>;

export type RouteWithAction = {
  path: string;
  action: () => RouteResult;
};

export const routeHtmlSchema = z.object({ html: z.instanceof(Hole) });
export const routeRedirectSchema = z.object({ redirect: z.string() });
export const routeResultSchema = routeHtmlSchema.merge(routeRedirectSchema).partial();

export type RouteResult = z.infer<typeof routeResultSchema>;
