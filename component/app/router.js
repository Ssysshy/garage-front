import Vue from 'vue';
import VueRouter from 'vue-router';

import User from './User.vue';
import Home from './Home.vue';
import Cate from './Cate.vue';
import Upload from './Upload.vue';
import News from './News.vue';
import Comment from './Comment.vue';
import Product from './Product.vue';
import ParkInfo from './ParkInfo.vue';
import Disk from './disk.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/user',
      component: User,
      name: 'user'
    },
    {
      path: '/cate',
      component: Cate,
      name: 'cate'
    },
    {
      path: '/upload',
      component: Upload,
      name: 'upload'
    },
    {
      path: '/news',
      component: News,
      name: 'news'
    },
    {
      path: '/comment',
      component: Comment,
      name: 'comment'
    },
    {
      path: '/product',
      component: Product,
      name: 'product'
    },
    {
      path: '/parkinfo',
      component: ParkInfo,
      name: 'parkinfo'
    },
    {
      path: '/disk',
      component: Disk,
      name: 'disk'
    }
  ]
});

export default router;
