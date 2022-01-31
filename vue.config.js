const webpack = require('webpack');
const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // target: 'https://www.helenarubinstein.co.kr/',
        target: 'http://localhost:8078/',
        ws: true,
        changeOrigin: true,
      },
      '^/personal': {
        // target: 'https://www.helenarubinstein.co.kr/',
        target: 'http://localhost:8078/',
        ws: true,
        changeOrigin: true,
      },
    },
    port: '8081',
    disableHostCheck: true,
  },
  outputDir: resolve('../web/WEB-INF/dist'),
  indexPath: 'index.jsp',
  configureWebpack: {
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/swiper'),
          resolve('node_modules/dom7'),
          resolve('node_modules/mini-toastr'),
          resolve('node_modules/vue-notifications'),
        ],
      }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'config': {
          title: JSON.stringify('Helena Rubinstein'),
          cdn: JSON.stringify(process.env.NODE_ENV === 'development' ? '' : 'http://img.helenarubinstein.co.kr/_brand_'),
          uploaded: JSON.stringify(process.env.NODE_ENV === 'development' ? '/api/files' : 'http://img.helenarubinstein.co.kr/_upload_'),
        },
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          'cdn-base': JSON.stringify(process.env.NODE_ENV === 'development' ? '' : 'http://img.helenarubinstein.co.kr/_brand_'),
        }
      }
    }
  }
};
