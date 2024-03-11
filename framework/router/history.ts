import { createBrowserHistory, BrowserHistory, To } from 'history';

export class History {
  public history: BrowserHistory;
  private params: Record<string, unknown>;

  constructor() {
    this.history = createBrowserHistory();
    this.params = {};
  }

  /**
   * Pushes a new location onto the history stack, increasing its length by one. If there were any entries in the stack after the current one, they are lost.
   * @param to The new URL
   * @param state Data to associate with the new location
   */
  public push(to: To, state?: unknown) {
    this.history.push(to, state);
  }

  /**
   * Replaces the current location in the history stack with a new one. The location that was replaced will no longer be available.
   * @param to The new URL
   * @param state Data to associate with the new location
   */
  public replace(to: To, state?: unknown) {
    this.history.replace(to, state);
  }

  /**
   * Navigates `n` entries backward/forward in the history stack relative to the current index. For example, a "back" navigation would use go(-1).
   * @param delta The delta in the stack index
   */
  public go(delta: number) {
    this.history.go(delta);
  }

  /**
   * Navigates to the previous entry in the stack. Identical to go(-1).
   * 
   * Warning: if the current location is the first location in the stack, this will unload the current document.
   */
  public back() {
    this.history.back();
  }

  /**
   * Navigates to the next entry in the stack. Identical to go(1).
   */
  public forward() {
    this.history.forward();
  }

  /**
   * Data on the current location. Includes the following:
   * 
   * `key`: A unique string associated with this location. May be used to safely store and retrieve data in some other storage API, like localStorage.
   * 
   * `pathname`: A URL pathname, beginning with a /
   * 
   * `params`: some number of `:param` identified on the router
   * 
   * `state`: A value of arbitrary data associated with this location
   * 
   * `search`: A URL search string, beginning with a ?
   * 
   * `hash`: A URL fragment identifier, beginning with a #
   */
  public get data() {
    const urlSearchParams = new URLSearchParams(this.history.location.search.slice(1));
    const search = Object.fromEntries(urlSearchParams.entries());

    return {
      key: this.history.location.key,
      pathname: this.history.location.pathname,
      params: { ...this.params },
      state: this.history.location.state,
      search,
      hash: this.history.location.hash
    };
  }

  public setParams(params: Record<string, unknown>) {
    this.params = params;
  }
}

export const history = new History();
