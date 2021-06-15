import {createApp} from 'vue';
import Global from './components/Global.vue';
import Local from './components/Local.vue';
import VueImgResizeParamsPlugin from '../src/index';

createApp(Global)
  .use(VueImgResizeParamsPlugin, {
    host: 'test-host.ru',
    query: { testParam: 1 }
  })
  .mount('#global');

createApp(Local)
  .mount('#local');
