import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      fetchTimeStamp: null,
      tutors: [
        {
          id: 'c1',
          firstName: 'John',
          lastName: 'Doe',
          areas: ['frontend', 'backend', 'career'],
          description:
            "John the Tutor",
          hourlyRate: 35
        },
        {
          id: 'c2',
          firstName: 'Jane',
          lastName: 'Smith',
          areas: ['frontend', 'career'],
          description:
            'my description',
          hourlyRate: 35
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
