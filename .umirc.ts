import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: false,
    compact: true,
  },
    nodeModulesTransform: {
    type: 'none',
  },

    request: {
      dataField: '',
    },
  // dva: {
  //   immer: true
  // },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/search', component: '@/pages/search' },
    { path: '/list', component: '@/pages/ranking' },
    // { path: '/style', component: '@/pages/stylePage' },
    { path: '/songList', component: '@/pages/sonPage/songListSon' },
    { path: '/songDetail', component: '@/pages/sonPage/songPage' },
  ],
});
