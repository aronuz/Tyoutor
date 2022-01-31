import httpRequest from "@/common/httpRequest.js";

export default {
  async fetchContacts(context) {
    const contacts = [];
    let contact;
    const response = httpRequest(`contacts/`, "get");

    if (response.success) {
      const data = response.data;
      for (let item of data[0]) {
        contact = {
          address: item.address,
          phone: item.phone,
        };
        contacts.push(contact);
      }
      if (contacts.length) context.commit("setContacts", contacts);
    } else {
      const message = response.error || "Failed to fetch Tyoutor contacts.";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
  async addContact(context, data) {
    const contactId = data.contactId;
    const contactData = {
      contactId,
      address: data.address,
      phone: data.phone,
    };

    const response = await httpRequest(
      `contact/${contactId}/add`,
      "post",
      contactData
    );

    if (response.success) {
      //response.ok
      if ("file" in data) {
        const uploadData = { file: data.file, source_id: contactId, type: 3 };
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

      context.commit("addContact", contactData);
    } else {
      const error = new Error(
        `${response.error || "Failed to add contact."} Please try again.`
      );
      throw error;
    }
  },
  async removeContact(context, data) {
    if (!data.forceRefresh && !context.getters.forceUpdate) {
      return;
    }

    const contactId = data.tutorId;
    const response = await httpRequest(`contact/${contactId}/remove`, "delete");

    if (response.success && response.data[0].result) {
      context.commit("removeContact", data);
    } else {
      const message = response.error || "Failed to remove contact.";
      const e = new Error(`${message}. Please try again.`);
      throw e;
    }
  },
};
