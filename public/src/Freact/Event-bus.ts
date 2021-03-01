export class EventBus {
  private listeners: {[key: string]: Function[]} = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) this.listeners[event] = [];

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function) {
        if (!this.listeners[event]) throw new Error(`Нет события: ${event}`);

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: any) {
        if (!this.listeners[event]) throw new Error(`Нет события: ${event}`);

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}
