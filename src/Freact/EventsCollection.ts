interface IEvent {
  [key: string]: Array<{
    eventName: string
    callback: Function,
    needRun: boolean
  }>
}

export class EventsCollection {
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

      if (currentElement) {
        this.collectionEvents[elemSelector].forEach(({ eventName, callback, needRun }) => {
          const callbackTruly: EventListener = (needRun) ? callback() : callback;
          currentElement.addEventListener(eventName, callbackTruly);
        });
      }
    });
  }
}
