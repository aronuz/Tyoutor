export default {
  getTutors(state) {
    return state.tutors;
  },
  currentUser: (_, _1, _2, rootGetters) => (id) => {
    return id === rootGetters.userId;
  },
  hasTutors(state) {
    return state.tutors && state.tutors.length > 0;
  },
  isTutor(_, getters, _1, rootGetters) {
    const tutors = getters.getTutors;
    const userId = rootGetters.userId;
    return tutors.some((tutor) => tutor.tutorId === userId);
  },
  forceUpdate(state) {
    const fetchTimeStamp = state.fetchTimeStamp;
    if (fetchTimeStamp) {
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - fetchTimeStamp) / 1000 > 60;
    } else {
      return true;
    }
  },
};
