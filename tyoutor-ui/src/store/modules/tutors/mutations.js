export default {
  registerTutor(state, payload) {
    for (let item of payload) {
      state.tutors.push(item);
    }
  },
  setTutors(state, payload) {
    const stateTutors = payload.filtered ? state.filteredTutors : state.tutors;
    for (let item of payload.tutors) {
      stateTutors.push(item);
    }
  },
  unsetTutors(state) {
    state.filteredTutors = [];
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
