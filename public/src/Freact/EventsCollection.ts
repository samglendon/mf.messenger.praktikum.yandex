interface IEvent {
  [key: string]: Array<{
    eventName: string
    callback: EventListener
  }>
}

export class EventsCollection {
  private collectionEvents: IEvent = {};

  set(elemSelector: string, eventName: string, callback: EventListener) {
    if (!this.collectionEvents[elemSelector]) {
      this.collectionEvents[elemSelector] = [];
    }

    this.collectionEvents[elemSelector].push({eventName, callback});
    const currentElement = document.querySelector(elemSelector);
    if (currentElement) {
      currentElement.addEventListener('click', callback);
      // console.log('сработал set для ' + elemSelector);
    }
  }

  resetEvents(root: Element = document.body) {
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
