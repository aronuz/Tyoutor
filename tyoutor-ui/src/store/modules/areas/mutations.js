export default {
  setAreas(state, payload) {
    state.areas.push(payload);
  },
  addArea(state, payload) {
    for (let item of payload.areas) {
      state.tutors[payload.tutorId]["areas"].push(item);
    }
  },
  removeArea(state, payload) {
    const areas = state.tutors[payload.tutorId]["areas"];
    const ix = areas.indexOf(payload.areas);
    state.tutors[payload.tutorId]["areas"].splice(ix, 1);
  },
};
