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

    if (Response) {
      //if (response.ok) {
      context.commit("addRequest", response);
    } else {
      const error = new Error(
        `${response.error.message || "Failed to send message."
        } Please try again.`
      );
      throw error;
    }
  },
  async fetchRequests(context, data) {
    if (!data.forceRefresh && !context.getters.forceUpdate) {
      return;
    }

    const tutorId = context.rootGetters.userId;
    const response = await httpRequest(`tutors/${tutorId}/requests/`, "get");

    if (response[0]) {
      const requests = [];
      let request;
      for (let item of response[0]) {
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
      const error = new Error(
        `${response.error || "Failed to fetch messages."} Please try again`
      );
      throw error;
    }
  },
};
