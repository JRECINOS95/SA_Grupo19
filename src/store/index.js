import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import ecommerceStoreModule from '@/views/pages/shop/eCommerceStoreModule';
import app from './app';
import appConfig from './app-config';
import verticalMenu from './vertical-menu';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    state,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
});
