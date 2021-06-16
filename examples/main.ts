import {createApp} from 'vue';
import Global from './components/Global.vue';
import Local from './components/Local.vue';
import VueImgResizeParamsPlugin from '../src/index';

createApp(Global)
  .use(VueImgResizeParamsPlugin, {
    host: 'resizer.loc',
    port: '8090',
    protocol: 'http',
    query: { testParam: 1 }
  })
  .mount('#global');

createApp(Local)
  .mount('#local');
