<template>
  <div>
    <ui-dialog :show="!!error" title="Error" @close="closeDialogue">
      <p>{{ error }}</p>
    </ui-dialog>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <div class="home-page">
      <div class="child_1">
        <div class="container" fluid height="100%">
          <div xs12 justify="center" class="row no-gutters">
            <div class="col" cols="12">
              <ui-card width="100vw" class="mx-auto card-row" color="#fff">
                <div class="row-title title-area black--text">
                  Our tutors can help you with...
                </div>
                <div xs12 justify="start" class="inner-row area-sub-row">
                  <div class="col" cols="10" sm="0" md="7">
                    <areaList :tutor-id="tutorId" part="all">
                      <template v-slot:default></template>
                    </areaList>
                  </div>
                </div>
              </ui-card>
            </div>
          </div>
          <div class="row tutor-row no-gutters">
            <div class="col tutor-col hide-on-big">
              <ui-card
                color="#FFF"
                height="100%"
                width="100%"
                class="info-sheet"
              >
                <div
                  class="display-1 black--text pa-10 info-text"
                  v-html="tutorInfo"
                ></div>
              </ui-card>
            </div>
            <div class="col tutor-col">
              <div class="lazy">
                <ui-card light flat color="#9ca39b" height="100%">
                  <div class="carousel">
                    <div
                      :id="`ci-${index}`"
                      class="carousel-item"
                      :class="[{ active: index === currentIndex }]"
                      v-for="(tutor, index) in listTutors"
                      :key="tutor.tutorId"
                      :height="carouselHeight()"
                      @click="showTutor(tutor.tutorId)"
                      :style="`z-index:${index}`"
                    >
                      <img
                        :src="getImgUrl_tutors(`logo_${index}.png`)"
                        class="d-block w-100"
                        :alt="`${tutor.fullName} photo`"
                      />
                    </div>
                  </div>
                </ui-card>
              </div>
            </div>
          </div>
          <div xs12 justify="center" class="row no-gutters">
            <div class="col" cols="12">
              <areaList :tutor-id="tutorId" part="tutor">
                <template v-slot:tutor-areas></template>
              </areaList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  data() {
    return {
      cycle: null,
      currentIndex: null,
      isActive: false,
      isLoading: false,
      tutorId: "",
      tutorInfo: "",
      error: null,
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
  },
  watch: {
    currentIndex() {
      if (this.listTutors.length) {
        this.tutorId = this.listTutors[this.currentIndex].tutorId;
        const tutorItem = this.listTutors[this.currentIndex];
        let info = `<span>${tutorItem["firstName"]} ${tutorItem["lastName"]}</span>`;
        info += `<br/><span>${tutorItem["description"]}</span>`;
        this.tutorInfo = info;
      } else {
        this.tutorInfo = "";
      }
    },
  },
  mounted() {
    // const loadData = new Promise((resolve, reject) => {
    //   try {
    //     this.fetchTutors();
    //     resolve(true);
    //   } catch (e) {
    //     reject(e);
    //   }
    // });
    // loadData
    //   .then(() => {
    //     this.fetchAreas();
    //   })
    //   .catch((e) => {
    //     alert(`Failed to load tutor data. ${e}`);
    //   });
    this.fetchTutors();
  },
  beforeUnmount() {
    clearInterval(this.cycle);
  },
  methods: {
    // ...mapActions({
    //   fetchAreas: "areas/fetchAreas",
    // }),
    // ...mapActions("tutors", ["loadTutors"])
    async storeDispatch(endPoint, data) {
      return await this.$store.dispatch(endPoint, data, { root: true });
    },
    async fetchTutors() {
      this.isLoading = true;
      try {
        await this.storeDispatch("tutors/fetchTutors", { forceRefresh: true });
        if (this.listTutors.length) this.setAreas();
      } catch (e) {
        this.error = e;
        console.log(this.error);
        this.isLoading = false;
      }
    },
    async setAreas() {
      if (this.listTutors.length) {
        this.currentIndex = 0;
        this.fetchAreas()
          .then(() => {
            this.cycle = setInterval(this.reCycle, 6000);
          })
          .catch((e) => {
            this.error = e;
            console.log(`${this.error}`);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    async fetchAreas() {
      const idList = this.listTutors.map((tutor) => tutor.tutorId);
      // this.$store.dispatch("areas/fetchAreas", { idList }, { root: true });
      await this.storeDispatch("areas/fetchAreas", idList);
    },
    reCycle() {
      const listLength = this.listTutors.length;
      this.currentIndex +=
        this.currentIndex < listLength - 1 ? 1 : -this.currentIndex;
      let carouselItem;
      setTimeout(() => {
        const ix =
          this.currentIndex === listLength - 1 ? 0 : this.currentIndex + 1;
        // if (ix > 0) {
        carouselItem = document.getElementById(`ci-${ix}`) || null;
        if (carouselItem) carouselItem.classList.add("n-active");
        // }
      }, 2000);
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
    closeDialogue() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.home-page {
  position: fixed;
  top: 2.5rem;
  z-index: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.home-page::-webkit-scrollbar,
.card::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.home-page,
.card {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.child_1 {
  position: relative;
  bottom: 0;
  /* margin-bottom: 8vh; */
  height: 100vh;
  width: 100%;
}

.row {
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.no-gutters {
  margin-top: -5vh;
  margin-bottom: 5vh;
}

.tutor-row {
  position: relative;
}

/* .tutor-col {
  display: inline;
} */

.area-card {
  background-color: #2ba4d300;
}

.v-footer {
  position: fixed !important;
  bottom: 0px !important;
  width: 100% !important;
}

.info-text {
  font-family: "Dancing Script" !important;
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
.area-info {
  display: inline-block;
  font-family: "Times New Roman", Times, serif;
  background-color: lightgrey;
  position: relative;
  width: 100%;
  background-color: #00000017;
}

.contact-row .row-title {
  position: relative;
}

.tutor-col .card {
  width: 232px;
}

.carousel {
  height: 100px;
  display: flex;
  flex-direction: row;
}

.carousel-item {
  display: none;
  position: relative;
  height: 100%;
  width: 100%;
}

.carousel-item.active {
  animation-name: slidein;
  animation-duration: 6s;
  animation-timing-function: ease-in-out;
  display: inline;
}

.carousel-item.n-active {
  animation-name: n-slidein;
  animation-duration: 2s;
  animation-timing-function: linear;
  display: inline;
}

.carousel-item img {
  position: relative;
  height: 100%;
  width: 100%;
}

@keyframes slidein {
  0% {
    width: 0%;
    right: -100%;
  }
  30% {
    width: 100%;
    right: 0%;
  }
  70% {
    width: 100%;
    right: 0%;
  }
  100% {
    width: 0;
    right: 0;
  }
}
@keyframes n-slidein {
  0% {
    width: 0%;
    right: 0%;
  }
  100% {
    width: 100%;
    right: 0%;
  }
}

@media (max-width: 344px) {
  .area-row {
    height: 235px;
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
}
@media (min-width: 601px) and (max-width: 959px) {
  .row-title {
    font-size: 2.5em !important;
  }
  .area-row {
    height: 410px;
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
  .contact-row {
    padding-top: 30px;
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
}

@media (min-width: 1024px) {
  .home-page {
    background-image: linear-gradient(
      337deg,
      #41c1d0 0%,
      #d5d9db 52%,
      #00b8ff 100%
    );
    background-position: top;
    background-size: cover;
  }
  .child_1 > .container {
    height: 100%;
  }
  .info-text {
    font-size: 2em !important;
  }

  .tutor-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 36vh;
  }

  .tutor-col .card {
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    height: 100%;
  }

  .tutor-col span {
    margin: auto;
  }

  .hide-on-big {
    display: block;
  }

  .show-on-small {
    display: none;
  }
  .row-title {
    left: 120px;
    font-size: 3.5rem !important;
  }
  .area-row {
    height: 70px;
  }
}
</style>
