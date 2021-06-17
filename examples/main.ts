import {createApp} from 'vue';
import Global from './components/Global.vue';
import Local from './components/Local.vue';
import VueImgResizeParamsPlugin from '../src/index';

createApp(Global)
  .use(VueImgResizeParamsPlugin, {
    host: 'resizer.loc:8090',
    pathname: 'resize:img-path',
    protocol: 'http',
    query: { testParam: 1 }
  })
  .mount('#global');

createApp(Local)
  .mount('#local');
