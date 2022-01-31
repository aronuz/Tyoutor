export default {
  setContacts(state, payload) {
    state.contacts.push(payload);
  },
  addContact(state, payload) {
    for (let item of payload) {
      state.contacts.push(item);
    }
  },
  removeContact(state, payload) {
    const ix = state.contacts.indexOf(payload.contactId);
    state.contacts.splice(ix, 1);
  },
};
