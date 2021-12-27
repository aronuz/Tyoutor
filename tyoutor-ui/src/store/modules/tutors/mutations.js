export default {
  registerTutor(state, payload) {
    for (let item of payload) {
      state.tutors.push(item);
    }
  },
  setTutors(state, payload) {
    for (let item of payload) {
      state.tutors.push(item);
    }
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
