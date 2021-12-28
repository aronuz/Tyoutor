export default {
  getTutors(state) {
    if (state.tutors) {
      return state.tutors;
    }
  },
  getTutorsSlice(state) {
    const tutors = (page) => {
      const start = page === 0 ? 0 : page * 2 - 2;
      //console.log("store page: " + page);
      return state.tutors.slice(start, 2);
    };
    return tutors;
  },
  currentUser: (_, _1, _2, rootGetters) => (id) => {
    return id === rootGetters.userId;
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
