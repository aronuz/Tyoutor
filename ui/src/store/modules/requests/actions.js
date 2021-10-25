export default {
  contactTutor(context, payload) {
    const newRequest = {
      sentDate: new Date().toISOString(),
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(`post-url`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });
    const responseData = await response.json();

    if (response.ok) {
      newRequest.id = responseData.name;
      newRequest.tutorId = payload.tutorId;
      context.commit('addRequest', newRequest);
    } else {
      const error = new Error(`${responseData.message || 'Failed to send message.'} Please try again.`);
      throw error;
    }
  },
  async fetchRequests(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const tutorId = context.rootGetters.userId;
    const response = await fetch('get-url');
    const responseData = await response.json();

    if (response.ok) {

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          tutorId: tutorId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message
        };
        requests.push(request);
      }

      context.commit('setRequests', requests);
      context.commit('setFetchTimestamp');
    } else {
      const error = new Error(`${responseData.message || 'Failed to fetch messages.'} Please try again`);
      throw error;
    }
  }
};