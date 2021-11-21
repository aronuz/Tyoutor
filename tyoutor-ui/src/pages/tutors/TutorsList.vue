<template>
  <v-app>
    <ui-dialog :show="!!error" title="Error" @close="closeDialogue">
      <p>{{ error }}</p>
    </ui-dialog>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <section>
      <tutor-filter
        @change-filter="setFilters"
        :areas-list="areasList"
      ></tutor-filter>
    </section>
    <section>
      <ui-card>
        <div class="controls">
          <ui-button mode="outline" @click="loadTutors(true)"
            >Refresh</ui-button
          >
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
            :description="tutor.description"
            :rate="tutor.hourlyRate"
            :areas="tutor.areas"
          >
          </tutor-item>
        </ul>
        <h3 v-else>No tutors found.</h3>
      </ui-card>
    </section>
  </v-app>
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
      activeFilters: [],
      error: null,
      isLoading: false,
    };
  },
  computed: {
    isTutor() {
      return this.$store.getters["tutors/isTutor"];
    },
    areasList() {
      return this.$store.getters["areas/getAreas"];
    },
    filteredTutors() {
      const tutors = this.$store.getters["tutors/tutors"];
      if (this.activeFilters.length === 0) {
        return tutors;
      } else {
        const idSet = new Set();
        let af;
        for (let fi of this.activeFilters) {
          af = fi.replace(" ", "-~");
          for (let el of this.areasList) {
            if (el.areas.includes(af)) {
              idSet.add(el.tutor_id);
            }
          }
        }
        return tutors.filter((tutor) => {
          idSet.has(tutor.tutor_id);
        });
      }
    },
    hasTutors() {
      return this.$store.getters["tutors/hasTutors"];
    },
  },
  mounted() {
    this.loadTutors();
    this.emitter.on("remove-area", (data) => {
      this.$store.dispatch("areas/removeArea", data);
    });
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadTutors(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "tutors/loadTutors",
          {
            forceRefresh: refresh,
          },
          { root: true }
        );
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    closeDialogue() {
      this.error = null;
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
