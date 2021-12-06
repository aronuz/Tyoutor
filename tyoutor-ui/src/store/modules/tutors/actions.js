import httpRequest from "@/common/httpRequest.js";

export default {
  async registerTutor(context, data) {
    const tutorId = context.rootGetters.userId;
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

    if (response.data) {
      //response.ok
      context.commit("registerTutor", tutorData);
      context.commit("areas/addArea", areaData);
    } else {
      const error = new Error(
        `${response.error || "Couldn't load tutors."} Please try again.`
      );
      throw error;
    }
  },
  async fetchTutors(context, payload) {
    if (!payload.forceRefresh && !context.getters.forceUpdate) {
      return;
    }
    try {
      const data = await httpRequest("tutors/", "get");
      const tutors = [];
      let tutor, areas;
      for (let item of data[0]) {
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

      context.commit("setTutors", tutors);
      context.commit("setFetchTimestamp");
    } catch (err) {
      console.log(err);
      const message = err[0].error || "Failed to load tutors";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
};
