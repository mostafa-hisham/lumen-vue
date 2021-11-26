import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import compatibilitiesModule from './modules/compatibilities/index.js';

const store = createStore({
  modules: {
      auth: authModule,
      compatibilities: compatibilitiesModule,
  },
/*  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }*/
});

export default store;