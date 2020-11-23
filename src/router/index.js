import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入路由组件
import Home from '../views/Home'
// const EBook = () => import('../views/EBook');
// const SelectBook = () => import('../views/SelectBook');

// 安装插件
Vue.use(VueRouter);

// 配置路由
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    }
];

// 创建路由
const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;