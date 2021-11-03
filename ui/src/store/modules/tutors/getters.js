export default {
  getTutors(state) {
    return state.tutors;
  },
  currentUser = (_, _1, _2, rootGetters) => (id) => {
    return id === rootGetters.userId
  },
  hasTutors(state) {
    return state.tutors && state.tutors.length > 0;
  },
  isTutor(_, getters, _1, rootGetters) {
    const tutors = getters.tutors;
    const userId = rootGetters.userId;
    return tutors.some(tutor => tutor.id === userId);
  },
  forceUpdate(state) {
    const lastFetch = state.lastFetch;
    if (lastFetch) {
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    } else {
      return true;
    }
  }
};