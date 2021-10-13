import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import usersModule from './modules/users/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    users: usersModule,
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;