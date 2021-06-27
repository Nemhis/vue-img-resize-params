import {createApp} from 'vue';
import Global from './components/Global.vue';
import Local from './components/Local.vue';
import VueImgResizeParamsPlugin from '../src/index';

createApp(Global)
  .use(VueImgResizeParamsPlugin, {
      url: 'http://global-resizer.loc:8090/resizer:imgPath?:imgQuery&test-param=1&width=:width&height=:height',
  })
  .mount('#global');

createApp(Local)
  .mount('#local');
