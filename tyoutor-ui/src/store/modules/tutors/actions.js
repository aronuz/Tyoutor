import httpRequest from "@/common/httpRequest.js";

export default {
  setUserIds(context) {
    httpRequest(`tutors/ids/`, "get").then((r) => {
      if (r.success) context.commit("setIds", r.data, { root: true });
      else {
        const error = r.error || "Failed to fetch user id.";
        const e = new Error(`${error} Please try refreshing the page`);
        throw e;
      }
    });
    // .catch((err) => {
    //   const error = err || "Failed to fetch user id.";
    //   const e = new Error(`${error} Please try refreshing the page`);
    //   throw e;
    // });
  },
  async registerTutor(context, data) {
    const tutorId = context.rootGetters.tutorId;
    const tutorData = {
      tutorId,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const areaData = {
      tutorId,
      areas: data.areas,
    };

    const response = await httpRequest("tutors/", "post", tutorData);
    // const response = await fetch(
    //     `put-url`,
    //     {
    //         method: 'PUT',
    //         body: JSON.stringify(tutorData)
    //     }
    // );

    if (response.success) {
      //response.ok
      if ("file" in data) {
        const uploadData = { file: data.file, source_id: tutorId };
        const upload_response = await httpRequest(
          "photoupload",
          "post",
          uploadData
        );
        if (!upload_response.success) {
          const e = new Error(upload_response.error);
          throw e;
        }
      }

      context.commit("registerTutor", tutorData);
      context.commit("areas/addArea", areaData);
    } else {
      const error = new Error(
        `${response.error || "Failed to register tutor."} Please try again.`
      );
      throw error;
    }
  },
  async fetchTutors(context, payload) {
    if (!payload.forceRefresh && !context.getters.forceUpdate) {
      return;
    }
    const pageParam = payload.page < 1 ? "" : `?page=${payload.page}`;
    const response = await httpRequest(`tutors/${pageParam}`, "get");

    if (response.success) {
      const data = response.data;
      const tutors = setTutor(data[0], false);

      context.commit("setTutors", { tutors, filtered: false });
      context.commit("setFetchTimestamp");
      localStorage.setItem("tutorsPrevious", getQueryPage(data[1]));
      localStorage.setItem("tutorsNext", getQueryPage(data[2]));
      localStorage.setItem("tutorsTotal", data[3]);
    } else {
      //console.log(err);
      const message = response.error || "Failed to load tutors";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
  async fetchFilteredTutors(context, payload) {
    const filterParam = payload.filter;
    const pageParam = payload.page < 1 ? "" : `?page=${payload.page}`;
    const response = await httpRequest(
      `tutors/${filterParam}/${pageParam}`,
      "get"
    );

    if (response.success) {
      const data = response.data;
      const tutors = setTutor(data[0], payload.tutorIDs);

      context.commit("setTutors", { tutors, filtered: true });
      localStorage.setItem("tutorsPreviousFilter", getQueryPage(data[1]));
      localStorage.setItem("tutorsNextFilter", getQueryPage(data[2]));
      localStorage.setItem("tutorsTotalFilter", data[3]);
    } else {
      //console.log(err);
      const message = response.error || "Tutor search failed";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
};
function getQueryPage(url) {
  if (url === null) return -1;
  const page =
    url.indexOf("?page=") > -1 ? url.substr(url.indexOf("?page=") + 6) : 0;
  return page;
}
function setTutor(data, tutorIds) {
  const tutors = [];
  let tutor, areas;
  const tutorsData = !tutorIds
    ? data.slice()
    : data.filter((item) => !tutorIds.includes(item.tutorId));
  for (let item of tutorsData) {
    areas = [];
    for (let area of item.areas) {
      areas.push(area);
    }
    tutor = {
      tutorId: item.tutorId,
      createdAt: item.created_at,
      firstName: item.first_name,
      lastName: item.last_name,
      fullName: item.full_name,
      description: item.description,
      shortDescription: `${item.description.substr(0, 10)}...`,
      hourlyRateStr: item.hourlyRate,
      hourlyRate: item.hourly_rate,
      email: item.email,
      areas: item.areas,
    };
    tutors.push(tutor);
  }
  return tutors;
}
