import {VNode} from "vue";

enum Params {
  IMG_PATH = ':imgPath',
  IMG_QUERY = ':imgQuery',
  WIDTH = ':width',
  HEIGHT = ':height',
}

interface Options {
  url?: string;
}

interface DirectiveBindings {
  width: number;
  height: number;
  baseUrl: string;
  options?: Options;
}

let globalOptions: Options = {};

const makeUrl = (src: string, bindings: DirectiveBindings): string => {
  const { options } = bindings;
  const optionsUrl = options?.url || globalOptions?.url || '';

  if (!optionsUrl) {
    throw new Error('Vue-img-resize-params: base url does not configured');
  }

  const srcUrl = new URL(src);

  return optionsUrl
      .replace(Params.IMG_PATH, srcUrl.pathname)
      .replace(Params.IMG_QUERY, srcUrl.search.slice(1))
      .replace(Params.WIDTH, String(bindings.width))
      .replace(Params.HEIGHT, String(bindings.height));
}

const directive = {
  mounted(el: HTMLImageElement, { value }: { value: DirectiveBindings }) {
    el.setAttribute('src', makeUrl(el.getAttribute('src') || '', value))
  },
  updated(el: HTMLImageElement, { value }: { value: DirectiveBindings; }, vm: VNode) {
    const url = makeUrl(vm.props?.src || '', value);

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
