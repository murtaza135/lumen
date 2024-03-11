import { StateSlice } from './StateSlice';
import { QueryStateValue, Transformer, QueryFunction } from './state.types';

type QueryStateConstructor = {
  queryFn: QueryFunction,
  transformer?: Transformer;
};

export class QueryStateSlice extends StateSlice {
  private queryFn: QueryFunction;
  private transformer?: Transformer;

  constructor({ queryFn, transformer }: QueryStateConstructor) {
    const initialQueryState: QueryStateValue = {
      isFetching: false,
      status: "loading",
      data: null,
      error: null
    };

    super(initialQueryState);

    this.queryFn = queryFn;
    this.transformer = transformer;

    this.fetch();
  }

  private async fetch() {
    if (!this.state.isFetching) {
      this.state.isFetching = true;
      try {
        const data = await this.queryFn();
        this.state.data = this.transformer ? this.transformer(data) : data;
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

  public async refetch() {
    await this.fetch();
  }

  public reset() {
    this.state.isFetching = false;
    this.state.status = "loading";
    this.state.data = null;
    this.state.error = null;
  }
}
