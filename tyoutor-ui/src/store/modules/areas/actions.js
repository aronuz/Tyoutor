import httpRequest from "@/common/httpRequest.js";

export default {
  fetchAreas(context) {
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
      httpRequest(`areas/${pageParam}`, "get")
        .then((data) => {
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
        })
        .catch((data) => {
          const e = new Error(
            `${data.error || "Failed to fetch expertise."} Please try again`
          );
          throw e;
        });
    }
    // }
  },
  async addArea(context, data) {
    const areaData = {
      areas: data.areasList,
    };

    const response = await httpRequest(`tutors/area/`, "post", data.areasList);

    if (response.data) {
      areaData[data.tutorId] = context.rootGetters.userId;
      context.commit("addArea", areaData);
    } else {
      const error = new Error(
        `${response.error || "Couldn't load tutors."} Please try again.`
      );
      throw error;
    }
  },
  async removeArea(context, data) {
    if (!data.forceRefresh && !context.getters.forceUpdate) {
      return;
    }

    const tutorId = context.rootGetters.userId;
    const area = data[area];
    const areaId = `${area}@${tutorId}`;
    const response = await httpRequest(`tutors/area/${areaId}/`, "delete");

    if ("result" in response) {
      Object.assign(data, { tutorId });
      context.commit("removeArea", data);
    } else {
      const error = new Error(
        `${response.error || "Couldn't load tutors."} Please try again.`
      );
      throw error;
    }
  },
};
