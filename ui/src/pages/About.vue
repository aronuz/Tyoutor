<template>
  <v-app>
    <div class="home-page d-flex justify-center"></div>
    <div class="child_1">
      <v-container fluid height="100%">
        <v-row xs12 justify="center" class="ml-n6 pt-1">
          <v-col cols="12">
            <v-card
              width="100vw"
              class="mx-auto mt-1 card-row contact-row"
              color="#fff"
            >
              <span class="row-title black--text"> Contact Us </span>
              <ContactsList
                :contacts="listContacts"
                class="mt-md-n15 mt-xs-0"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listContacts: "contacts/ListContacts",
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
    document.querySelectorAll(".v-application--wrap")[1].style.minHeight =
      "100vh";
    this.initContacts();
  },
  mounted() {},
  methods: {
    ...mapActions({
      initContacts: "contacts/initContacts",
    }),
  },
};
</script>

<style scoped>
.child_1 {
  width: 100vw;
  position: relative;
  top: 0px;
  padding: 0px;
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
    background-image: url("~assets/images/big/medical-2458202_1920.jpg");
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
