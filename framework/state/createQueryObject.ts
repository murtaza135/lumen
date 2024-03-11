import { QueryFunction, Transformer } from './state.types';

export type QueryObject = {
  queryFn: QueryFunction,
  tag: string,
  transformer?: Transformer;
};

type QueryObjectCreater = (...args: any[]) => QueryObject;

export function createQueryObject(queryObjectCreater: QueryObjectCreater) {
  return queryObjectCreater;
}
