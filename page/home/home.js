import { sync } from 'vuex-router-sync';
import store from 'store/home';
import router from 'component/app/router';
import Entry from './home.vue';
import App from 'app';

sync(store, router);

export default App.init({
  ...Entry,
  router,
  store
});
