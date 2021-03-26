type PlainObject<T = unknown> = {
  [k in string]: T;
};

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
}

type PathDescription = {
  pathname: string;
  exactly: boolean;
}


export {
  PlainObject,
  PathDescription,
  HTMLElementEvent
}
