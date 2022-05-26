export default class Observable<T> {
  private observers: Set<(value: T) => void>;

  constructor() {
    this.observers = new Set();
    this.next = this.next.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  next(value: T) {
    this.observers.forEach((observer) => observer(value));
  }

  subscribe(observer: (value: T) => void) {
    this.observers.add(observer);

    return {
      unsubscribe: () => this.observers.delete(observer),
    };
  }
}
