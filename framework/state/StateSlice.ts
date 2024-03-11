import onChange from 'on-change';

type StateValue = Record<string, any>;
type StateSubscriber = (state: StateValue) => void;

/**
 * Subclass `StateSlice` to create your own custom state slices
 */
export abstract class StateSlice {
  public state: StateValue;
  private subscribers: { subscribers: StateSubscriber[]; };

  constructor(state: StateValue) {
    this.state = onChange(state, () => {
      this.subscribers.subscribers.forEach(
        subscriber => subscriber(this.state)
      );
    });
    this.subscribers = { subscribers: [] };
  }

  public subscribe(subscriber: StateSubscriber) {
    this.subscribers.subscribers = this.subscribers.subscribers.concat(subscriber);
    return () => {
      this.subscribers.subscribers = this.subscribers.subscribers.filter(
        sub => sub !== subscriber
      );
    };
  }

  public hasSubscribers() {
    return this.subscribers.subscribers.length !== 0;
  }

  public destruct() {
    onChange.unsubscribe(this.state);
  }
}
