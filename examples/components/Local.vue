<template>
  <div>
    <h2>Local registration</h2>
    <p>
      Base url - {{ url }}
    </p>

    <p v-if="imgEl">
      Modified url - {{ imgEl.getAttribute('src') }}
    </p>

    <p>Params: {{ params }}</p>

    <img v-img-resize-params="params" :src="url" ref="imgEl" alt="test img">
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import { directive } from '../../src';

export default defineComponent({
  directives: {
    ImgResizeParams: directive
  },
  setup() {
    const imgEl = ref(null);

    return {
      url: 'https://test.ru/path/to/image?test-query-params=1',
      imgEl,
      params: { width: 200, height: 300, options: { host: 'resizer.loc', port: '80', query: { test: 123, } }},
    }
  }
});
</script>
