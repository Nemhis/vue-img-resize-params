<template>
  <div>
    <h2>Global registration</h2>
    <p>
      Base url - {{ url }}
    </p>

    <p v-if="imgEl">
      Modified url - {{ imgEl.getAttribute('src') }}
    </p>

    <p v-if="sourceEl">
      Modified source url - {{ sourceEl.getAttribute('srcset') }}
    </p>

    <p>Params: {{ params }}</p>

    <img v-img-resize-params="params" :src="url" ref="imgEl" alt="test img">

    <picture>
      <source v-img-resize-params="params" ref="sourceEl" :srcset="sourceUrl" media="(min-width: 600px)">
      <img v-img-resize-params="params" :src="url" ref="imgEl" alt="test img">
    </picture>

    <div style="display: flex; flex-direction: column; align-items: flex-start">
      <label for="url">URL</label>
      <input v-model="url" id="url" type="text" style="width: 400px">

      <label for="width">Width</label>
      <input v-model="params.width" id="width" type="number">

      <label for="height">Height</label>
      <input v-model="params.height" id="height" type="number">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import { directive } from '../../src';

const LOCAL_RESIZER_URL = 'http://local-resizer.loc:8090/resizer:imgPath?:imgQuery&test-param=1&width=:width&height=:height';

export default defineComponent({
  directives: {
    ImgResizeParams: directive
  },
  setup() {
    const imgEl = ref(null);
    const sourceEl = ref(null);
    const url = ref('https://test.ru/path/to/image?img=1');
    const sourceUrl = ref('https://test.ru/path/to/image?source=1');
    const params = ref({ width: 200, height: 300, options: { url: LOCAL_RESIZER_URL }});

    return {
      url,
      imgEl,
      sourceEl,
      sourceUrl,
      params,
    }
  }
});
</script>
