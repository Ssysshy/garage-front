
module.exports = {
  type: 'client',
  framework: 'vue',
  entry: {
    include: ['page',
      { 'home/home': 'page/home/home.js?loader=false' },
      { 'login/login': 'page/login/login.js?loader=false' }
    ],
    exclude: ['page/test'],
    loader: {
      client: 'framework/vue/entry/client-loader.js'
    }
  },
  template: 'view/layout.html',
  alias: {
    client: 'framework/vue/entry/client.js',
    app: 'framework/vue/app.js',
    asset: 'asset',
    mocks: 'mocks',
    component: 'component',
    framework: 'framework',
    store: 'store'
  },
  lib: ['vue', 'vuex', 'axios'],
  loaders: {
    eslint: true,
    less: {
      enable: true,
      postcss: true,
      framework: true
    }
  },
  plugins: {},
  done() {

  }
};
