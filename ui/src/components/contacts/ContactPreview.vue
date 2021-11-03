<template>
  <v-card
    class="contact-preview"
    :to="getLocation"
    target="_blank"
    rel="noopener"
  >
    <div class="contact-content">
      <h2>{{ address }}</h2>
      <h3>{{ phone }}</h3>
    </div>
    <div class="map-image" :style="mapDisplay">
      <img :data-url="getImgUrl(address)" alt="Location" />
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ContactPreview",
  props: {
    id: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  computed: {
    getLocation() {
      return `//www.google.com/maps/place/${this.address}`;
    },
    mapDisplay() {
      return {
        display: window.matchMedia("(max-width: 959px)").matches
          ? "none"
          : "block",
      };
    },
  },
  methods: {
    getImgUrl(address) {
      const markerImage =
        address.indexOf("Brooklyn") > 0
          ? "brooklyn_office.png"
          : "manhattan_office.png";
      return require(`@/assets/images/maps/${markerImage}`);
    },
  },
};
</script>

<style scoped>
.contact-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  color: black;
  font-size: 0.7em;
  font-family: "Times New Roman", Times, serif;
}

a {
  text-decoration: none;
  color: black;
}

@media (max-width: 600px) {
  .contact-content * {
    text-align: center;
    font-size: 1.6em; /*!important*/
    line-height: 1;
  }
}
@media (min-width: 601px) and (max-width: 959px) {
  .contact-content * {
    font-size: 2.5em; /*!important*/
    line-height: 1;
  }
}
@media (max-width: 959px) {
  .contact-preview {
    float: left;
    min-width: 40vw;
    max-width: 40vw;
    margin: 5px;
    white-space: pre-wrap;
  }
  .contact-content {
    padding: 5px 0 0 5px;
    text-align: start;
  }
  .map-image img {
    width: 100%;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .contact-preview {
    float: left;
    min-width: 40vw;
    max-width: 40vw;
    min-height: 15vh;
    margin: 5px;
    white-space: pre-wrap;
  }
  .contact-content {
    padding: 5px 0 0 5px;
    text-align: start;
  }
  .contact-content * {
    font-size: 2.75em;
  }
  .map-image {
    width: 100%;
  }
  .map-image img {
    width: 100%;
  }
}
@media (min-width: 1024px) {
  .contact-preview {
    width: 400px;
    margin: 10px;
  }
  .contact-content {
    padding: 10px;
    text-align: center;
  }
  .contact-preview {
    width: 400px;
    margin: 10px;
    position: relative;
    top: 50px !important;
  }
  .contact-content * {
    font-size: 2em !important;
  }
  .map-image img {
    height: 250px;
    width: 100%;
  }
}

a:hover .contact-content,
a:active .contact-content {
  background-color: rgb(255, 255, 255);
}
</style>
