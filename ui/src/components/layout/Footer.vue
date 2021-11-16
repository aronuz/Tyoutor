<template>
  <v-app>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="footer-color" height="10px">
          <div class="pad-on-small">
            <span class="subheading">Find us online: </span>
            <v-btn
              v-for="(icon, index) in icons"
              :key="icon"
              :aria-label="icon.substr(4)"
              class="ml-7"
              dark
              icon
              @click="goFunction[index]()"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text
          style="display: inline-block; max-width: 50%; float: right"
          class="py-2 white--text text-right"
        >
          {{ new Date().getFullYear() }} — <strong>Tyoutor dev.</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      goFunction: {
        0: this.goFacebook,
        1: this.goTwitter,
        2: this.goLinkedin,
        3: this.goInstagram,
      },
    };
  },
  methods: {
    goFacebook() {
      window.open("https://www.facebook.com/tyoutor/", "_blank");
    },
    goTwitter() {
      window.open("https://twitter.com/tyoutor", "_blank");
    },
    goLinkedin() {
      window.open("https://www.linkedin.com/company/tyoutor", "_blank");
    },
    goInstagram() {
      window.open("https://www.instagram.com/tyoutor/?hl=en", "_blank");
    },
  },
};
</script>

<style scoped>
.footer-color {
  background-color: #247ba0;
}
.v-footer {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  z-index: 999;
}

@media (max-width: 431px) {
  .v-card__title * {
    font-size: 0.6em;
    line-height: 0.5;
  }
  .v-btn--icon {
    width: 14px;
  }
}

@media (min-width: 432px) and (max-width: 959px) {
  .v-card__title * {
    font-size: 1em;
    line-height: 0.5;
  }
  .v-btn--icon {
    width: 24px;
  }
}

@media (max-width: 959px) {
  .v-card__subtitle {
    padding: 2px 4px;
  }
  .v-btn--icon {
    font-size: 18px !important;
  }
  button,
  .subheading {
    font-size: larger;
  }
  button {
    float: right;
  }
  .pad-on-small {
    padding-top: 16px;
    padding-left: 15px;
  }
}

@media (min-width: 960px) and (max-width: 1023px) {
  .v-card__title * {
    font-size: 1.2rem !important;
  }
  .v-btn--icon {
    font-size: 24px !important;
  }
}

@media (min-width: 1024px) {
  .v-btn--icon {
    font-size: 24px !important;
  }
}
</style>
