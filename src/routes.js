import User from './components/user/User.vue';
import Home from './components/Home.vue';
import Cate from './components/Cate.vue';
import Upload from './components/upload/Upload.vue';


export const routes = [
	{ path:'/',component:Home},
	{ path:'/user',component:User,name:'user'},
	{ path:'/cate',component:Cate,name:'cate'},
	{ path:'/upload',component:Upload,name:'upload'},
];