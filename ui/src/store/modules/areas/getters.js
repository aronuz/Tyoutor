export default {
  getAreas(state) {
    return state.areas
  },
  getTutorAreas: (state) => (id) => {
    return state.areas.find(area => area.tutor_id === id)
  }
};