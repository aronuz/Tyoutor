<template>
  <section><tutor-filter @change-filter="setFilters"></tutor-filter></section>
  <section>
    <ui-card>
      <div class="controls">
        <ui-button mode="outline">Refresh</ui-button>
        <ui-button v-if="!isTutor" link to="/register">
          Tutor registration
        </ui-button>
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
        >
        </tutor-item>
      </ul>
      <h3 v-else>No tutors found.</h3>
    </ui-card>
  </section>
</template>

<script>
import TutorItem from "@/components/tutors/TutorItem.vue";
import TutorFilter from "@/components/tutors/TutorFilter.vue";

export default {
  components: {
    TutorItem,
    TutorFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isTutor() {
      return this.$store.getters["tutors/isTutor"];
    },
    filteredTutors() {
      const tutors = this.$store.getters["tutors/tutors"];
      return tutors.filter((tutor) => {
        if (this.activeFilters.frontend && tutor.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && tutor.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && tutor.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasTutors() {
      return this.$store.getters["tutors/hasTutors"];
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
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