import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: false,
    compact: true,
  },
    nodeModulesTransform: {
    type: 'none',
  },
  // dva: {
  //   immer: true
  // },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/search', component: '@/pages/search' },
    { path: '/list', component: '@/pages/list' },
    { path: '/style', component: '@/pages/stylePage' },

  ],
});
