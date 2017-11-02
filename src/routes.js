import User from './components/user/User.vue';
import Home from './components/Home.vue';
import Cate from './components/Cate.vue';
import Upload from './components/upload/Upload.vue';
import News from './components/news/News.vue';
import Comment from './components/news/Comment.vue';
import Product from './components/product/Product.vue';


export const routes = [
	{ path:'/',component:Home},
	{ path:'/user',component:User,name:'user'},
	{ path:'/cate',component:Cate,name:'cate'},
	{ path:'/upload',component:Upload,name:'upload'},
	{ path:'/news',component:News,name:'news'},
	{ path:'/comment',component:Comment,name:'comment'},
	{ path:'/product',component:Product,name:'product'},
];