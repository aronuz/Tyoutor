<template>
  <v-app>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <div class="home-page d-flex justify-center">
      <div class="child_1">
        <v-container fluid height="100%">
          <v-row xs12 justify="center" class="ml-n6 pt-1">
            <v-col cols="12">
              <v-card
                width="100vw"
                class="mx-auto card-row area-row"
                color="#fff"
              >
                <div class="row-title title-area black--text">
                  Our tutors can help you with...
                </div>
                <v-row xs12 justify="start" class="area-sub-row">
                  <v-col cols="2" sm="12" md="5">
                    <div class="ml-md-16 ml-xs-1 area-list">
                      <AreasList :areas-list="areas" />
                    </div>
                  </v-col>
                  <v-col cols="10" sm="0" md="7">
                    <div
                      class="
                        mr-md-10
                        mt-md-0
                        pt-md-n16
                        ml-xs-0
                        pt-md-0
                        area-info
                      "
                    >
                      <v-card
                        class="area-card black--text px-md-2 py-md-1 py-xs-5"
                        width="100%"
                        v-html="areaInfo"
                      >
                      </v-card>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="ml-n6 mt-n3 tutor-row" no-gutters>
            <v-col cols="6" class="hide-on-big pt-md-12">
              <v-sheet
                color="#FFF"
                height="100%"
                width="100%"
                class="info-sheet"
              >
                <v-row align="center" justify="center">
                  <div class="display-1 black--text pa-10 info-text">
                    {{ tutorInfo }}
                  </div>
                </v-row>
              </v-sheet>
            </v-col>
            <v-col md="6" xs="12">
              <v-lazy
                v-model="isActive"
                :options="{
                  threshold: 0.7,
                }"
                transition="fade-transition"
              >
                <v-card light flat color="#9ca39b" height="100%">
                  <v-carousel
                    ref="slides"
                    class="tutor-carousel"
                    hide-delimiter-background
                    cycle
                    :show-arrows="false"
                    :height="carouselHeight()"
                    v-model="currentIndex"
                  >
                    <v-carousel-item
                      v-for="tutor in listTutors"
                      :key="tutor.tutor_id"
                      :src="getImgUrl_tutors(tutor.thumbnail)"
                      :height="carouselHeight()"
                      @click="showTutor(tutor.id)"
                      contain
                    >
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-lazy>
            </v-col>
          </v-row>
          <v-row xs12 justify="center" class="ml-n6 pt-1">
            <v-col cols="12">
              <v-card
                width="100vw"
                class="mx-auto card-row area-row"
                color="#fff"
              >
                <div
                  class="mr-md-10 mt-md-0 pt-md-n16 ml-xs-0 pt-md-0 area-info"
                >
                  <v-card
                    class="area-card black--text px-md-2 py-md-1 py-xs-5"
                    width="100%"
                    v-text="areaInfo"
                  >
                  </v-card>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentIndex: 0,
      isActive: false,
      isLoading: false,
      tutorInfo: "",
      areas: [],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
    };
  },
  computed: {
    ...mapGetters({
      listAreas: "areas/getAreas",
    }),
    listTutors() {
      return this.$store.getters["tutors/getTutors"];
    },
    isBigScreen() {
      try {
        return (
          window.innerWidth && window.matchMedia("(min-width: 1024px)").matches
        );
      } catch (e) {
        return false;
      }
    },
    areaInfo() {
      if (this.areas.length) {
        const tutorId = this.listTutors[this.currentIndex].tutor_id;
        const areaItem = this.areas.find((tutor_id) => tutor_id === tutorId);
        return areaItem.areas.join(", ");
      } else {
        return "";
      }
    },
  },
  watch: {
    listTutors() {
      if (this.listTutors.length) {
        const tutorItem = this.listTutors[this.currentIndex];
        let info = `${tutorItem["firstName"]} ${tutorItem["lastName"]}`;
        info += `\n${tutorItem["description"]}`;
        this.infoText = info;
      } else {
        this.infoText = "";
      }
    },
    listAreas() {
      this.areas = this.listAreas;
    },
  },
  mounted() {
    this.fetchAreas();
    this.loadTutors();
  },
  methods: {
    ...mapActions({
      fetchAreas: "areas/fetchAreas",
    }),
    async loadTutors() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "tutors/loadTutors",
          {
            forceRefresh: false,
          },
          { root: true }
        );
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    getImgUrl_tutors(link) {
      const picFolder = this.isBigScreen ? "big" : "small";
      return require(`@/assets/images/tutors/${picFolder}/${link}`);
    },
    showTutor(id) {
      this.$router.push(`/tutors/${id}`);
    },
    carouselHeight() {
      return this.isBigScreen ? "80vh" : "300px";
    },
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

.tutor-row {
  position: relative;
}

.area-card {
  background-color: #fff !important;
}

.v-footer {
  position: fixed !important;
  bottom: 0px !important;
  width: 100% !important;
}

.info-sheet {
  background-image: linear-gradient(
    to right,
    #90978ee3 1%,
    rgb(255, 255, 255) 99%
  );
}

.info-text {
  font-family: "Dancing Script" !important;
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
.area-list {
  display: inline-block;
  position: relative;
}
.area-list {
  position: relative;
}
.area-info {
  display: inline-block;
  font-family: "Times New Roman", Times, serif;
  background-color: lightgrey;
  position: relative;
}

.contact-row .row-title {
  position: relative;
}
@media (max-width: 344px) {
  .area-row {
    height: 235px;
  }
  .area-list {
    position: relative;
    left: 30vw;
    top: -30px;
  }
}
@media (min-width: 345px) and (max-width: 600px) {
  .area-row {
    height: 295px;
  }
}
@media (max-width: 600px) {
  .row-title {
    font-size: 1.9em !important;
  }
  .area-list {
    padding: 0px !important;
    width: 40vw;
  }
}
@media (min-width: 601px) and (max-width: 959px) {
  .row-title {
    font-size: 2.5em !important;
  }
  .area-row {
    height: 410px;
  }
  .area-list {
    display: block;
    width: 40vw;
  }
  .area-list {
    padding: 0px !important;
    width: 100%;
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
  .tutor-row {
    height: 400px;
    margin-bottom: -50px;
    top: 60px;
  }
  .tutor-row * {
    height: 100%;
  }
  .hide-on-big,
  .show-on-small {
    display: none;
  }
  .tutor-carousel {
    min-height: 0vh;
    padding: 0px 5% 0 10%;
  }
  .tutor-carousel .v-image {
    height: auto !important;
    max-height: 30vh;
    border-radius: 20px 20px 20px 20px !important;
  }
  .area-sub-row {
    float: left;
    position: relative;
    top: 35px;
  }
  .area-info {
    display: none;
  }
  .area-card {
    display: none;
  }
  .contact-row {
    padding-top: 30px;
  }
  .message-button {
    font-size: 1.8em;
    line-height: 1.2;
  }
  .area-list {
    top: 0px;
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
  .child_1 > .container {
    min-height: 90%;
  }
  .intro h1 {
    font-size: 2rem;
  }
  .tutor-row {
    max-height: 300px;
    top: 80px;
  }
  .tutor-row > .v-card {
    background-color: transparent !important;
  }
  .tutor-row .v-image {
    border-radius: 50px 50px 0 0;
  }
  .tutor-row .v-carousel__controls {
    width: 50% !important;
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
  .tutor-carousel {
    min-height: 0vh;
    padding: 0px 25% 0 25%;
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
  .area-row {
    min-height: 427px;
  }
  .area-sub-row {
    width: 95%;
  }

  .area-list {
    width: 100%;
    height: 100%;
  }
  .area-list {
    padding: 0 0 0 15% !important;
    width: 90%;
  }
  .area-card {
    font-size: 1.8rem;
    line-height: 1.13;
  }
}

@media (min-width: 1024px) {
  .home-page {
    background-image: url("../assets/logo.png");
    background-position: top;
    background-size: cover;
  }
  .child_1 > .container {
    min-height: 90%;
  }
  .info-text {
    font-size: 2em !important;
  }

  .tutor-row {
    min-height: 90vh;
  }
  .info-sheet {
    height: 100%;
    width: 97.5vw;
  }
  .hide-on-big {
    display: block;
  }

  .show-on-small {
    display: none;
  }
  .row-title {
    top: 80px;
    left: 120px;
    font-size: 3.5rem !important;
  }
  .area-row .row-title {
    top: 0px;
  }
  .area-list {
    top: -480px;
    right: 90px;
  }
  .area-list {
    top: 500px;
    left: 150px;
  }
  .area-info {
    max-width: 62vw;
  }
  .area-preview {
    width: 350px !important;
    height: 500px;
    margin: 10px 0 0 20px !important;
  }
  .area-content {
    padding: 10px;
    text-align: center;
    position: relative;
    top: 200px;
  }
  .area-thumbnail {
    width: 200%;
  }
  .area-content {
    width: 200%;
  }
  .area-content h1 {
    font-size: 2.5em;
    font-weight: 200;
  }
  .area-card {
    font-size: 1.9em;
    height: 550px;
    overflow-y: scroll;
  }
}
</style>
