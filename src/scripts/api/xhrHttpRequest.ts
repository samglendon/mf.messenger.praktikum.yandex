import {queryString} from "../utils/queryString.js";
import {isPlainObject} from "../utils/isSomething.js";
import {PlainObject} from "../interfacesAndTypeApp";


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

interface IFuncParams {
  calledMethod: string;
  url: string;
  options: OptionsWithoutMethod;
  timeout: number;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;


export class HTTPTransport {
  private static __instance: HTTPTransport;
  private _baseUrl: string;

  constructor(isProd: boolen) {
    _baseUrl = (isProd) ? 'https://ya-praktikum.tech' : 'http://localhost:5000';
    
    if (HTTPTransport.__instance) {
      return HTTPTransport.__instance;
    }
    HTTPTransport.__instance = this;
  }

  xhrWithRetry = (tries: number, funcParamsObj?: IFuncParams): any => {
    let funcParams: IFuncParams = funcParamsObj
      ? funcParamsObj
      : {
        calledMethod: '',
        url: '',
        options: {},
        timeout: 0
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
        funcParams = {...funcParamsObj};
      }
      const {calledMethod, url, options, timeout} = funcParams;
      // @ts-ignore
      return this[calledMethod](url, options, timeout).catch(onError)
    };

    return {
      get: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
        return methodRun({calledMethod: 'get', url, options, timeout});
      },
      post: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
        return methodRun({calledMethod: 'get', url, options, timeout});
      },
      delete: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
        return methodRun({calledMethod: 'get', url, options, timeout});
      },
      put: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
        return methodRun({calledMethod: 'get', url, options, timeout});
      },
      patch: (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
        return methodRun({calledMethod: 'get', url, options, timeout});
      }
    };
  };


  get = (url: string, options: OptionsWithoutMethod = {}, timeout?: number): Promise<XMLHttpRequest> => {
    const {data} = options;
    let getUrl: string;

    if (data) {
      getUrl = `${url}?${queryString(data)}`;
    } else {
      getUrl = url;
    }

    return this.request(getUrl, {...options, method: METHOD.GET}, timeout);
  };
  post = (url: string, options: OptionsWithoutMethod = {}, timeout?: number): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.POST}, timeout);
  };
  delete = (url: string, options: OptionsWithoutMethod = {}, timeout?: number): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.DELETE}, timeout);
  };
  put = (url: string, options: OptionsWithoutMethod = {}, timeout?: number): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.PUT}, timeout);
  };
  patch = (url: string, options: OptionsWithoutMethod = {}, timeout: number): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.PATCH}, timeout);
  };

  private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    console.log('url в запросе на сервак');
    console.log(`${this._baseUrl}${url}`);

    const {method, data, headers} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${this._baseUrl}${url}`);

      xhr.withCredentials = true;
      if (isPlainObject(headers)) {
        Object.entries(headers).forEach(([key, value]) => {
          // FIXME: НИЗКИЙ. Расписать все варианты key для headers, чтобы было точное соответсвие
          if (key === 'credentials' && !value) return xhr.withCredentials = false;
          xhr.setRequestHeader(key, value as string);
        })
      }

      xhr.timeout = timeout;

      // тут нам не нужен this, поэтому можем применить стрелочную функцию
      xhr.onload = () => {
        // Тут можно сразу проверять статус 200 <= xhr.status < 300 и сразу бросать reject, если пришла ошибка
        // TODO: СРЕДНИЙ. Но нужно ли тогда применять onerror?
        if (!(200 <= xhr.status && xhr.status < 300)) throw new Error('Прилетела ошибка');
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
