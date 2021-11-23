export default {
  getAreas(state) {
    return state.areas;
  },
  getTutorAreas: (state) => (id) => {
    return id ? state.areas[0].filter((area) => area.tutorId === id) : [];
  },
};
