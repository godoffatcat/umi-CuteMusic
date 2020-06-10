import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/search', component: '@/pages/search' },
    { path: '/list', component: '@/pages/list' },

  ],
});
