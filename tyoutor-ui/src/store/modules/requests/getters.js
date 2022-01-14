export default {
  requests(state, _, _2, rootGetters) {
    const tutorId = rootGetters.tutorId;
    return state.requests
      ? state.requests.filter((req) => req.tutorId === tutorId)
      : [];
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  forceUpdate(state) {
    const fetchTimeStamp = state.fetchTimeStamp;
    if (!fetchTimeStamp) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - fetchTimeStamp) / 1000 > 60;
  },
};
