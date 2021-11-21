import httpRequest from "@/common/httpRequest.js";

export default {
  async contactTutor(context, data) {
    const tutorId = data.tutorId;
    const sentDate = new Date().toISOString();
    const requestId = `${tutorId}@${sentDate}`;
    const requestData = {
      requestId,
      tutorId,
      sentDate,
      userEmail: data.email,
      message: data.message,
    };

    const response = await httpRequest(
      `tutors/${tutorId}/request/`,
      "post",
      requestData
    );

    if (response.data) {
      //if (response.ok) {
      context.commit("addRequest", response.data);
    } else {
      const error = new Error(
        `${
          response.error.message || "Failed to send message."
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

    if ("result" in response) {
      const requests = [];
      let request;
      for (let item of response["result"]) {
        request = {
          tutorId,
          requestId: item.request_id,
          userEmail: item.user_email,
          message: item.message,
          sentDate: item.sent_date,
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
