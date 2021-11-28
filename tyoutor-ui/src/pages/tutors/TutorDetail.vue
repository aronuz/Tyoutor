<template>
  <div class="home-page">
    <div class="child_1">
      <div class="meta-data">
        <section>
          <ui-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hr</h3>
          </ui-card>
        </section>
        <section>
          <ui-card>
            <header>
              <h2>Send a message</h2>
              <ui-button link :to="contactLink">Contact</ui-button>
            </header>
            <router-view></router-view>
          </ui-card>
        </section>
      </div>
      <section class="main-list">
        <ui-card>
          <ui-badge
            v-for="area in areas"
            :key="area"
            :type="area"
            :is-own-area="isOwnDetail"
          ></ui-badge>
          <p>{{ description }}</p>
        </ui-card>
        <ui-card v-if="isOwnDetail">
          <areaForm @add-area="addArea" />
        </ui-card>
      </section>
    </div>
  </div>
</template>

<script>
import areaForm from "@/components/areas/AreaForm.vue";

export default {
  props: ["id"],
  components: {
    areaForm,
  },
  data() {
    return {
      selectedTutor: null,
      isOwnDetail: false,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedTutor.fullName}`;
    },
    areas() {
      return this.selectedTutor.areas;
    },
    rate() {
      return this.selectedTutor.hourlyRate;
    },
    description() {
      return this.selectedTutor.description;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
  },
  created() {
    this.selectedTutor = this.$store.getters["tutors/getTutors"].find(
      (tutor) => tutor.tutorId === this.id
    );
    this.isOwnDetail = this.$store.getters["tutors/currentUser"](this.id);
  },
  methods: {
    addArea(data) {
      this.$store.dispatch("areas/addArea", data);
      this.$router.replace("/tutors");
    },
  },
};
</script>

<style scoped>
.home-page {
  position: fixed;
  top: 2rem;
  z-index: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow-y: hidden;
}

.child_1 {
  position: relative;
  bottom: 0;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
}

.meta-data {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.meta-data .card {
  box-shadow: none;
}

.main-list {
  overflow-y: scroll;
  height: 65vh;
}

.main-list .card {
  height: 100%;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.main-list::-webkit-scrollbar,
.main-list .card::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-list,
.main-list .card {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
