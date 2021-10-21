<template>
  <section>filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Tutor registration</router-link>
    </div>
    <ul v-if="hasTutors">
      <tutor-item
        v-for="tutor in filteredTutors"
        :key="tutor.id"
        :id="tutor.id"
        :first-name="tutor.firstName"
        :last-name="tutor.lastName"
        :rate="tutor.hourlyRate"
        :areas="tutor.areas"
      ></tutor-item>
    </ul>
    <h3 v-else>No tutors found.</h3>
  </section>
</template>

<script>
import TutorItem from "../../components/tutors/TutorItem.vue";

export default {
  components: {
    TutorItem,
  },
  computed: {
    filteredTutors() {
      return this.$store.getters["tutors/tutors"];
    },
    hasTutors() {
      return this.$store.getters["tutors/hasTutors"];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>