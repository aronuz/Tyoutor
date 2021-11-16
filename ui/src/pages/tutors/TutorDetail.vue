<template>
  <v-app>
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
    <section>
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
  </v-app>
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
      return `${this.selectedTutor.firstName} ${this.selectedTutor.lastName}`;
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
      (tutor) => tutor.id === this.id
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