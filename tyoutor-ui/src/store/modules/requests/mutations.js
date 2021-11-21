export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
