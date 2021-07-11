import {VNode} from "vue";

enum Params {
  IMG_PATH = ':imgPath',
  IMG_QUERY = ':imgQuery',
  WIDTH = ':width',
  HEIGHT = ':height',
}

enum AttrName {
  SRC = 'src',
  SRCSET = 'srcset',
}

enum Tag {
  IMG = 'IMG',
  SOURCE = 'SOURCE',
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
    throw new Error('Vue-img-resize-params: base url didn`t configure');
  }

  const srcUrl = new URL(src);

  return optionsUrl
      .replace(Params.IMG_PATH, srcUrl.pathname)
      .replace(Params.IMG_QUERY, srcUrl.search.slice(1))
      .replace(Params.WIDTH, String(bindings.width))
      .replace(Params.HEIGHT, String(bindings.height));
}

const getAttrName = (el: HTMLElement): AttrName | undefined => {
  switch (el.tagName) {
    case Tag.IMG:
      return AttrName.SRC;
    case Tag.SOURCE:
      return AttrName.SRCSET;
  }
}

const directive = {
  mounted(el: HTMLImageElement, { value }: { value: DirectiveBindings }) {
    const attrName = getAttrName(el);

    if (!attrName) {
      return;
    }

    el.setAttribute(attrName, makeUrl(el.getAttribute(attrName) || '', value))
  },
  updated(el: HTMLImageElement, { value }: { value: DirectiveBindings; }, vm: VNode) {
    const attrName = getAttrName(el);

    if (!attrName) {
      return;
    }

    const url = makeUrl(vm.props ? vm.props[attrName] : '', value);

    if (url !== el.getAttribute(attrName)) {
      el.setAttribute(attrName, url)
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
