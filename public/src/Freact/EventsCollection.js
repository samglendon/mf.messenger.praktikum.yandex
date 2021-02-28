export class EventsCollection {
  constructor() {
    this.collectionEvents = {};
  }

  set(elemSelector, eventName, callback) {
    if (!this.collectionEvents[elemSelector]) {
      this.collectionEvents[elemSelector] = [];
    }

    this.collectionEvents[elemSelector].push({eventName, callback});
    const currentElement = document.querySelector(elemSelector);
    if (currentElement) {
      currentElement.addEventListener(eventName, callback);
      // console.log('сработал set для ' + elemSelector);
    }
  }

  resetEvents(root = document) {
    Object.keys(this.collectionEvents).forEach((elemSelector) => {
      const currentElement = root.querySelector(elemSelector);
      // console.log('сработал resetEvents для ' + elemSelector);
      // console.log('currentElement= ');
      // console.dirxml(currentElement);
      // console.log('--------------------------');

      if (currentElement) this.collectionEvents[elemSelector].forEach(({eventName, callback}) => {
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
