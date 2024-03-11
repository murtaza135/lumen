import { MutationFunction, Transformer } from './state.types';

export type MutationObject = {
  mutationFn: MutationFunction,
  invalidateTags?: string[];
  transformer?: Transformer;
};

type MutationObjectCreater = (...args: any[]) => MutationObject;

export function createMutationObject(mutationObjectCreater: MutationObjectCreater) {
  return mutationObjectCreater;
}
