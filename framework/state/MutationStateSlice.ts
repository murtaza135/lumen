import { StateSlice } from './StateSlice';
import { Transformer, MutationStateValue, MutationFunction } from './state.types';

type MutationStateConstructor = {
  mutationFn: MutationFunction,
  transformer?: Transformer;
};

export class MutationStateSlice extends StateSlice {
  private mutationFn: MutationFunction;
  private transformer?: Transformer;

  constructor({ mutationFn, transformer }: MutationStateConstructor) {
    const initialMutationState: MutationStateValue = {
      isFetching: false,
      status: "loading",
      data: null,
      error: null
    };

    super(initialMutationState);

    this.mutationFn = mutationFn;
    this.transformer = transformer;
  }

  private async fetch(data: any) {
    if (!this.state.isFetching) {
      this.state.isFetching = true;
      try {
        const newData = await this.mutationFn(data);
        this.state.data = this.transformer ? this.transformer(newData) : newData;
        this.state.error = null;
        this.state.status = "success";
      } catch (error) {
        this.state.error = error;
        this.state.status = "error";
      } finally {
        this.state.isFetching = false;
      }
    }
  }

  public async mutate(data: any) {
    await this.fetch(data);
  }

  public reset() {
    this.state.isFetching = false;
    this.state.status = "loading";
    this.state.data = null;
    this.state.error = null;
  }
}
