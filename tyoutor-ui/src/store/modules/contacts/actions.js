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
};
