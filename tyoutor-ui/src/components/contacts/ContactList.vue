<template>
  <section class="contact-list">
    <ContactPreview
      v-for="contact in contacts"
      :key="contact.id"
      :address="contact.address"
      :phone="contact.phone"
    />
  </section>
  <section class="message-form pt-md-16" id="message-form" name="message-form">
    <ContactForm />
  </section>
</template>

<script>
import ContactPreview from "./ContactPreview";
import ContactForm from "./ContactForm";

export default {
  components: {
    ContactPreview,
    ContactForm,
  },
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped>
.contact-list {
  display: flex;
  box-sizing: border-box;
  align-items: center;
}
@media (max-width: 344px) {
  .contact-list {
    position: relative;
    left: -45vw;
  }
}
@media (min-width: 345px) and (max-width: 959px) {
  .contact-list {
    margin: 0 30vw 0 0;
  }
}
@media (min-width: 345px) and (max-width: 959px) {
  .contact-list {
    position: relative;
    justify-content: center;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .contact-list {
    position: relative;
    justify-content: center;
    top: 80px;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .contact-list {
    position: relative;
    justify-content: center;
    right: 13vw;
    top: 80px;
  }
  .contactPreviewHome {
    float: left;
    min-width: 40vw;
    max-width: 40vw;
    height: 23vh;
    margin: 5px;
    white-space: pre-wrap;
  }
  .contactPreviewHome img {
    width: 100%;
  }
  .message-form {
    position: relative;
    bottom: 18vh;
    left: 95px;
  }
}
@media (min-width: 1024px) {
  .contact-list {
    padding: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
