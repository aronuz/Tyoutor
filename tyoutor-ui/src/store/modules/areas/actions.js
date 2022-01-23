import httpRequest from "@/common/httpRequest.js";

export default {
  async fetchAreas(context) {
    //, data
    const areas = [];
    let area;
    const page = localStorage.getItem("areasNext")
      ? +localStorage.getItem("areasNext")
      : 0;
    if (page !== -1) {
      const pageParam = page === 0 ? "" : `?page=${page}`;
      // for (let id of data) {
      //httpRequest(`tutors/${id}/areas/`, 'get').then((data) => {
      const response = await httpRequest(`areas/${pageParam}`, "get");
      if (response.success) {
        const data = response.data;
        for (let item of data[0]) {
          area = {
            tutorId: item.tutor_id,
            createdAt: item.created_at,
            areaId: item.area_id,
            areas: item.area,
          };
          areas.push(area);
        }
        if (areas.length) {
          context.commit("setAreas", areas);
          const data_next = data[2] ? data[2] : -1;
          //console.log("data_next: " + data_next);
          const next =
            data_next === -1
              ? -1
              : data_next.substr(data_next.indexOf("?page=") + 6);
          localStorage.setItem("areasNext", next);
        }
      } else {
        const message = response.error || "Failed to fetch a skill.";
        const e = new Error(`${message}. Please try again.`);
        throw e;
      }
      // }
    }
  },
  async addArea(context, data) {
    const areaData = {
      areas: data.areasList,
    };

    const response = await httpRequest(`tutors/area/`, "post", data.areasList);

    if (response.success) {
      const data = response.data;
      areaData[data[0].tutorId] = context.rootGetters.tutorId;
      context.commit("addArea", areaData);
    } else {
      const message = response.error || "Failed to load tutors.";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
  async removeArea(context, data) {
    if (!data.forceRefresh && !context.getters.forceUpdate) {
      return;
    }

    const tutorId = context.rootGetters.tutorId;
    const area = data[area];
    const areaId = `${area}@${tutorId}`;
    const response = await httpRequest(`tutors/area/${areaId}/`, "delete");

    if (response.success && response.data[0].result) {
      Object.assign(data, { tutorId });
      context.commit("removeArea", data);
    } else {
      const message = response.error || "Failed to remove a skill.";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
};
