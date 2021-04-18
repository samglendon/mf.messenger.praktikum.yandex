interface IEvent {
  [key: string]: Array<{
    eventName: string
    callback: Function,
    needRun: boolean
  }>
}

export class EventsCollection {
  // private collectionEvents: IEvent = {};
  public collectionEvents: IEvent = {};

  set(elemSelector: string, eventName: string, callback: Function, needRun: boolean) {
    if (!this.collectionEvents[elemSelector]) {
      this.collectionEvents[elemSelector] = [];
    }

    this.collectionEvents[elemSelector].push({ eventName, callback, needRun });
    const currentElement = document.querySelector(elemSelector);
    if (currentElement) {
      const callbackTruly: EventListener = (needRun) ? callback() : callback;
      currentElement.addEventListener(eventName, callbackTruly);
    }
  }

  resetEvents(root: Element = document.body) {
    Object.keys(this.collectionEvents).forEach((elemSelector) => {
      const currentElement = root.querySelector(elemSelector);
      // console.log('сработал resetEvents для ' + elemSelector);
      // console.log('currentElement= ');
      // console.dirxml(currentElement);
      // console.log('--------------------------');

      if (currentElement) {
        this.collectionEvents[elemSelector].forEach(({ eventName, callback, needRun }) => {
          const callbackTruly: EventListener = (needRun) ? callback() : callback;
          currentElement.addEventListener(eventName, callbackTruly);
        });
      }
    });
  }

  // off(event, callback) {
  //     if (!this.listeners[event]) {
  //         throw new Error(`Нет события: ${event}`);
  //     }
  //
  //     this.listeners[event] = this.listeners[event].filter(
  //         listener => listener !== callback
  //     );
  // }
  //
}
