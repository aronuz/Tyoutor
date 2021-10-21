import { createStore } from 'vuex';

import tutorsModule from './modules/tutors/index.js';

const store = createStore({
  modules: {
    tutors: tutorsModule
  }
});

export default store;