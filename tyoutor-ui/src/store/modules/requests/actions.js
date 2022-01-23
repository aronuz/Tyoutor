import httpRequest from "@/common/httpRequest.js";

export default {
  async contactTutor(context, data) {
    const tutorId = data.tutorId;
    const sentDate = new Date().toISOString();
    const requestId = `${tutorId}@${sentDate}`;
    const requestData = {
      requestId,
      sentDate,
      userEmail: data.email,
      message: data.message,
    };

    const response = await httpRequest(
      `tutors/${tutorId}/requests/new`,
      "post",
      requestData
    );

    if (response.success) {
      //if (response.ok) {
      context.commit("addRequest", response.data[0]);
    } else {
      const message = response.error || "Failed to send your message";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
  async fetchRequests(context, data) {
    if (!data.forceRefresh && !context.getters.forceUpdate) {
      return;
    }

    const tutorId = context.rootGetters.tutorId;
    const response = await httpRequest(`tutors/${tutorId}/requests/`, "get");

    if (response.success) {
      const requests = [];
      let request;
      for (let item of response.data[0]) {
        request = {
          tutorId,
          requestId: item.request_id,
          userEmail: item.email,
          message: item.message,
          sentDate: item.created_at,
        };
        requests.push(request);
      }

      context.commit("setRequests", requests);
      context.commit("setFetchTimestamp");
    } else {
      const message = response.error || "Failed to fetch messages.";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
};
