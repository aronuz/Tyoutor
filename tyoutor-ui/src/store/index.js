import { createStore } from "vuex";

import areasModule from "./modules/areas/index.js";
import tutorsModule from "./modules/tutors/index.js";
import requestsModule from "./modules/requests/index.js";
import contactsModule from "./modules/contacts/index.js";

const store = createStore({
  modules: {
    areas: areasModule,
    tutors: tutorsModule,
    requests: requestsModule,
    contacts: contactsModule,
  },
  state() {
    return {
      userId: "ACogan-6wB",
      tutorId: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    tutorId(state) {
      return state.tutorId;
    },
  },
});

export default store;
