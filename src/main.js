import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import {routes} from './routes';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueQuillEditor from 'vue-quill-editor';
import {store} from './store/store';

Vue.use(VueAxios, axios)
Vue.use(VueQuillEditor)


Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
    routes:routes, // 可以直接写成routes
    mode:'history' // mode设置成history，那么地址就可以请求http://localhost:8080/user
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
