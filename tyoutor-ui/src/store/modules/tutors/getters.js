export default {
  getTutors(state) {
    if (state.tutors) {
      return state.tutors;
    }
  },
  getTutorsSlice(state) {
    const tutors = (data) => {
      const start = data.page === 0 ? 0 : data.page * 2 - 2;
      //console.log("store page: " + page);
      const stateTutors = !data.filter ? state.tutors : state.filteredTutors;
      return stateTutors.slice(start, 2);
    };
    return tutors;
  },
  currentUser: (_, _1, _2, rootGetters) => (id) => {
    return id === rootGetters.tutorId;
  },
  isTutor(_, getters, _1, rootGetters) {
    const tutorId = rootGetters.tutorId;
    return tutorId !== -1;
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
