export default {
  getAreas(state) {
    return state.areas;
  },
  getTutorAreas: (state) => (id) => {
    return id && state.areas
      ? state.areas.filter((area) => area.tutorId === id)
      : [];
  },
};
