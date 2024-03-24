import { StateSlice } from './StateSlice';
import { QueryStateSlice } from './QueryStateSlice';
import { MutationStateSlice } from './MutationStateSlice';
import { ClassZero } from '../types';
import { objectMap } from '../util/objectMap';
import { Transformer, StateSubscriber, QueryFunction, MutationFunction } from './state.types';
import { objectFilter } from 'framework/util/objectFilter';

type QueryMethodArgs = {
  queryFn: QueryFunction,
  tag: string,
  subscriber: StateSubscriber,
  transformer?: Transformer;
};

type MutationMethodArgs = {
  mutationFn: MutationFunction,
  invalidateTags?: string[];
  subscriber: StateSubscriber,
  transformer?: Transformer;
};

export class StateManager {
  private stateSlices: Record<string, StateSlice>;
  private querySlices: Record<string, QueryStateSlice>;

  constructor() {
    this.stateSlices = {};
    this.querySlices = {};
  }

  /**
   * Add your custom made state slices to the state manager
   * @param states an object mapping names to `StateSlice` classes
   */
  public createSlices(states: Record<string, ClassZero<StateSlice> | null>) {
    const nonNullStates = objectFilter(states, (state) => !!state) as Record<string, ClassZero<StateSlice>>;
    this.stateSlices = objectMap(nonNullStates, state => new state());
  }

  public slice(name: string) {
    const slice = this.stateSlices[name];
    if (!slice)
      throw new Error(`State slice "${name}" does not exist, please add it via stateManager.createSlices()`);
    return slice;
  }

  public querySlice(tag: string) {
    const query = this.querySlices[tag];
    if (!query)
      return null;
    return query;
  }

  public query({ queryFn, tag, subscriber, transformer }: QueryMethodArgs) {
    if (!this.querySlices[tag])
      this.querySlices[tag] = new QueryStateSlice({ queryFn, transformer });
    const query = this.querySlices[tag];
    const refetch = async () => { await query.refetch(); };
    const reset = () => { query.reset(); };
    if (query.state.status === "error") refetch();
    const unsubscribe = query.subscribe(subscriber);
    return { query, refetch, reset, unsubscribe } as const;
  }

  public mutation({ mutationFn, invalidateTags, subscriber, transformer }: MutationMethodArgs) {
    const mutation = new MutationStateSlice({ mutationFn, transformer });

    const unsubscribeFromMutation = mutation.subscribe(subscriber);
    const unsubscribe = () => {
      unsubscribeFromMutation();
      mutation.destruct();
    };

    const mutate = async (data: any) => {
      await mutation.mutate(data);
      if (mutation.state.status === "success") {
        invalidateTags?.forEach(tag => {
          const tagArray = tag.split("/");
          Object.entries(this.querySlices).forEach(([sliceTag, slice]) => {
            const sliceTagArray = sliceTag.split("/");
            const isTagInvalidated = tagArray.every((value, index) => sliceTagArray[index] === value);
            if (isTagInvalidated) slice?.refetch();
          });
        });
      }
    };

    const reset = () => { mutation.reset(); };

    return { mutation, mutate, reset, unsubscribe } as const;
  }
}

export const stateManager = new StateManager();
