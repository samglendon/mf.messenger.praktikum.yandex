import { queryString } from '../utils/queryString';
import { isPlainObject } from '../utils/isSomething';
import { PlainObject } from '../interfacesAndTypeApp';
import { omit } from '../utils/myDash/omit';
import { CHAT_URL_PROD } from '../../config';

// eslint-disable-next-line no-unused-vars
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  headers?: PlainObject;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

interface IFuncParams {
  calledMethod: string;
  url: string;
  options: OptionsWithoutMethod;
  timeout: number;
}

export class HTTPTransport {
  private static __instance: HTTPTransport;
  private readonly _baseUrl: string = CHAT_URL_PROD;

  constructor() {
    if (HTTPTransport.__instance) {
      return HTTPTransport.__instance;
    }
    HTTPTransport.__instance = this;
  }

  xhrWithRetry = (tries: number, funcParamsObj?: IFuncParams): any => {
    let funcParams: IFuncParams = funcParamsObj || {
      calledMethod: '',
      url: '',
      options: {},
      timeout: 0,
    };

    const onError = (err: unknown): never | unknown => {
      const triesLeft = tries - 1;
      if (!triesLeft) {
        throw err;
      }
      return this.xhrWithRetry(triesLeft, funcParams)[funcParams.calledMethod as string]();
    };

    const methodRun = (funcParamsObj: IFuncParams) => {
      if (!funcParams.calledMethod) {
        funcParams = { ...funcParamsObj };
      }
      const { calledMethod, url, options, timeout } = funcParams;
      // @ts-ignore
      return this[calledMethod](url, options, timeout).catch(onError);
    };

    return {
      get: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => methodRun({
        calledMethod: 'get', url, options, timeout,
      }),
      post: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => methodRun({
        calledMethod: 'get', url, options, timeout,
      }),
      delete: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => methodRun({
        calledMethod: 'get', url, options, timeout,
      }),
      put: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => methodRun({
        calledMethod: 'get', url, options, timeout,
      }),
      patch: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => methodRun({
        calledMethod: 'get', url, options, timeout,
      }),
    };
  };

  get = (url: string, options: OptionsWithoutMethod = {}, timeout?: number): Promise<XMLHttpRequest> => {
    const { data } = options;
    let getUrl: string;
    let optWithoutData: OptionsWithoutMethod;

    if (data) {
      getUrl = `${url}?${queryString(data)}`;
      optWithoutData = omit(options, ['data']);
    } else {
      getUrl = url;
      optWithoutData = options;
    }

    return this.request(getUrl, { ...optWithoutData, method: METHOD.GET }, timeout);
  };
  post = (url: string, options: OptionsWithoutMethod = {}, timeout?: number) => this.request(url, {
    ...options,
    method: METHOD.POST,
  }, timeout);
  delete = (url: string, options: OptionsWithoutMethod = {}, timeout?: number) => this.request(url, {
    ...options,
    method: METHOD.DELETE,
  }, timeout);
  put = (url: string, options: OptionsWithoutMethod = {}, timeout?: number) => this.request(url, {
    ...options,
    method: METHOD.PUT,
  }, timeout);
  patch = (url: string, options: OptionsWithoutMethod = {}, timeout: number) => this.request(url, {
    ...options,
    method: METHOD.PATCH,
  }, timeout);

  private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    console.log('url в запросе на сервак');
    console.log(`${this._baseUrl}${url}`);

    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${this._baseUrl}${url}`);

      xhr.withCredentials = true;
      if (data) xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      if (isPlainObject(headers)) {
        Object.entries(headers).forEach(([key, value]) => {
          // FIXME: НИЗКИЙ. Расписать все варианты key для headers, чтобы было точное соответсвие
          // eslint-disable-next-line no-return-assign
          if (key === 'credentials' && value === false) return xhr.withCredentials = false;
          return xhr.setRequestHeader(key, value as string);
        });
      }

      xhr.timeout = timeout;

      // тут нам не нужен this, поэтому можем применить стрелочную функцию
      xhr.onload = () => {
        // Тут можно сразу проверять статус 200 <= xhr.status < 300 и сразу бросать reject, если пришла ошибка
        // TODO: СРЕДНИЙ. Но нужно ли тогда применять onerror?
        if (!(xhr.status >= 200 && xhr.status < 300)) reject(JSON.parse(xhr.response));
        else {
          const regExp = /^(\[?\{".*\}\]?|\[\])$/;
          // debugger
          if (regExp.test(xhr.response)) resolve(JSON.parse(xhr.response));
          else resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
