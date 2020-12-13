export class EventsCollection {
  constructor() {
    this.collectionEvents = {};
  }

  set(elemSelector, eventName, callback) {
    if (!this.collectionEvents[elemSelector]) {
      this.collectionEvents[elemSelector] = [];
    }

    this.collectionEvents[elemSelector].push({eventName, callback});

    document.querySelector(elemSelector).addEventListener(eventName, callback);
  }

  resetEvents() {
    Object.keys(this.collectionEvents).forEach((elemSelector) => {
      const currentElement = document.querySelector(elemSelector);

      this.collectionEvents[elemSelector].forEach(({eventName, callback}) => {
        currentElement.addEventListener(eventName, callback);
      })
    })
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
