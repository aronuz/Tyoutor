import { createStore } from 'vuex';

import areasModule from './modules/areas/index.js';
import tutorsModule from './modules/tutors/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
  modules: {
    areas: areasModule,
    turors: tutorsModule,
    requests: requestsModule
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