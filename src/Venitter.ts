type Handler = (...args: any) => void;

class Venitter {
  private map: Map<string, Set<Handler>> = new Map();

  on(eventName: string, handler: Handler) {
    if (this.map.get(eventName)) {
      this.map.get(eventName)!.add(handler);
    } else {
      this.map.set(eventName, new Set([handler]));
    }
  }

  once(eventName: string, handler: Handler) {
    const onceHandler = (...args: any[]) => {
      handler(...args);
      this.off(eventName, onceHandler);
    };

    this.on(eventName, onceHandler);
  }
  off(eventName: string, handler: Handler) {
    const handlerSet = this.map.get(eventName);
    if (handlerSet) {
      handlerSet.delete(handler);
    }
  }
  emit(eventName: string, payload?: any) {
    const handlerSet = this.map.get(eventName);

    if (!handlerSet) throw new Error("No registered event");

    handlerSet.forEach((handler) => handler(payload));
  }
  clear() {
    this.map.clear();
  }

  get size() {
    return this.map.size;
  }
}

export default Venitter;
