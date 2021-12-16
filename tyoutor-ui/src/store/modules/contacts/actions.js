import httpRequest from "@/common/httpRequest.js";

export default {
  fetchContacts(context) {
    const contacts = [];
    let contact;
    httpRequest(`contacts/`, "get")
      .then((data) => {
        for (let item of data[0]) {
          contact = {
            address: item.address,
            phone: item.phone,
          };
          contacts.push(contact);
        }
        if (contacts.length) context.commit("setContacts", contacts);
      })
      .catch((data) => {
        const e = new Error(
          `${data.error || "Failed to fetch Tyoutor contacts."
          } Please try again`
        );
        throw e;
      });
  },
};
