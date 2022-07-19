import { defineConfig } from 'umi';
import theme from './theme';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  ignoreMomentLocale: true,
  theme,
  proxy: {
    '/api/': {
      target: 'https://yxntab.vecchio.top/',
      changeOrigin: true,
      secure: false,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  chainWebpack(memo) {
    // 修改less-loader的css-modules的配置，添加文件名作为前缀
    memo.module
      .rule('less')
      .oneOf('css-modules')
      .use('css-loader')
      .options({
        modules: {
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      });
  },
});
