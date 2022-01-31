<template>
  <layout
    :has-items="!!hasRequests"
    :is-loading="isLoading"
    :error="error"
    :requests-style="true"
  >
    <template v-slot:default>
      <ui-card>
        <h2>Our mission and how to reach Tyoutor</h2>
      </ui-card>
    </template>
    <template v-slot:cards>
      <div class="card-stack">
        <contact-list :contacts="listContacts" />
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import contactList from "@/components/contacts/ContactList.vue";

export default {
  components: {
    contactList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listContacts: "contacts/getContacts",
    }),
    isBigScreen() {
      try {
        return (
          window.innerWidth && window.matchMedia("(min-width: 1024px)").matches
        );
      } catch (e) {
        return false;
      }
    },
  },
  created() {
    this.fetchContacts();
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchContacts: "contacts/fetchContacts",
    }),
  },
};
</script>

<style scoped>
.home-page {
  position: fixed;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
}
.child_1 {
  position: relative;
  bottom: 0;
  height: 90vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.card-row {
  background-image: linear-gradient(
    to right,
    rgb(255, 255, 255) 10%,
    #90978ee3 90%
  );
}
.row-title {
  position: relative;
  z-index: 10;
  font-family: "Arizonia" !important;
}
.contact-row {
  position: absolute;
  width: 100%;
}
.contact-row .row-title {
  position: relative;
}
@media (max-width: 344px) {
}
@media (min-width: 345px) and (max-width: 600px) {
}
@media (max-width: 600px) {
  .row-title {
    font-size: 1.9em !important;
  }
  .contact-row .row-title {
    top: -30px;
  }
  .contact-content * {
    font-size: 1.9em !important;
    line-height: 1;
  }
}
@media (min-width: 601px) and (max-width: 959px) {
  .row-title {
    font-size: 2.5em !important;
  }
  .contact-row .row-title {
    top: -100px;
  }
}
@media (max-width: 959px) {
  .home-page {
    background-image: linear-gradient(
      to bottom,
      rgba(234, 213, 122) 15%,
      rgba(103, 194, 255, 0.452) 25%
    );
  }
  .row-title {
    top: 5px;
    left: 5px;
    line-height: 0.9;
    float: left;
    display: block;
  }
  .hide-on-big,
  .show-on-small {
    display: none;
  }
  .message-button {
    font-size: 1.8em;
    line-height: 1.2;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .home-page {
    background-image: linear-gradient(
      to bottom,
      rgba(234, 213, 122) 15%,
      rgba(103, 194, 255, 0.452) 25%
    );
  }
  .intro h1 {
    font-size: 2rem;
  }
  .hide-on-big {
    display: none;
  }
  .show-on-small {
    display: block;
  }
  row.show-on-small {
    margin-left: 0;
  }
  .info-sheet {
    width: 99vw;
    min-height: 400px;
    position: relative;
    top: 80px;
    left: -15px;
  }
  .row-title {
    top: 5px;
    left: 5px;
    font-size: 3em !important;
    float: left;
    display: block;
  }
  .contact-row {
    width: 100vw;
    min-height: 550px;
  }
  .map-image img {
    width: 100% !important;
  }
}

@media (min-width: 1024px) {
  .home-page {
    background-image: linear-gradient(
      337deg,
      #41c1d0 0%,
      #d5d9db 52%,
      #00b8ff 100%
    ); /* url("../assets/logo.png"); */
    background-position: top;
    background-size: cover;
  }
  .contact-row {
    padding-top: 100px;
  }
  .contact-row .row-title {
    top: -100px;
  }
  .contact-list {
    position: relative;
    top: 50px;
  }
  .message-form {
    text-align: center;
  }
  .message-button {
    font-size: 2em;
  }
}
</style>
