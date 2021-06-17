type Query = Record<string, string | number>;

interface Options {
  protocol?: string;
  host?: string;
  pathname?: string;
  query?: Query;
}

interface DirectiveBindings {
  width: number;
  height: number;
  options?: Options;
}

let globalOptions: Options = {};

const appendQuery = (searchParams: URLSearchParams, query: Query) => {
  Object
    .keys(query)
    .forEach((item: string) => {
      if (query) {
        searchParams.set(item, String(query[item]))
      }
    });
}

const makeUrl = (el: HTMLImageElement, bindings: DirectiveBindings): URL => {
  const srcUrl = new URL(el.getAttribute('src') || '');
  const { options } = bindings;

  if (options?.host) {
    srcUrl.host = options.host;
  } else if (globalOptions.host) {
    srcUrl.host = globalOptions.host;
  }

  if (options?.protocol) {
    srcUrl.protocol = options.protocol;
  } else if (globalOptions.protocol) {
    srcUrl.protocol = globalOptions.protocol;
  }

  if (options?.pathname) {
    srcUrl.pathname = options.pathname;
  } else if (globalOptions.pathname) {
    srcUrl.pathname = globalOptions.pathname;
  }

  if (options?.query) {
    appendQuery(srcUrl.searchParams, options.query);
  }

  if (globalOptions.query) {
    appendQuery(srcUrl.searchParams, globalOptions.query);
  }

  srcUrl.searchParams.set('height', String(bindings.height));
  srcUrl.searchParams.set('width', String(bindings.width));

  return srcUrl;
}

const directive = {
  mounted(el: HTMLImageElement, { value }: { value: DirectiveBindings }) {
    el.setAttribute('src', makeUrl(el, value).href)
  },
  updated(el: HTMLImageElement, { value }: { value: DirectiveBindings; }) {
    const url = makeUrl(el, value).href;

    if (url !== el.getAttribute('src')) {
      el.setAttribute('src', url)
    }
  }
};

const mixin = {
  directives: { ImgResizeParams: directive },
};

export {
  directive,
  mixin
}

export default {
  install(app, options: Options) {
    globalOptions = options || {};
    app.directive('img-resize-params', directive)
  }
};
