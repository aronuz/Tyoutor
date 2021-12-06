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
        <section>
          <tutor-filter
            @set-filter="setFilters"
            :list-areas="listAreas_0"
          ></tutor-filter>
        </section>
        <section class="main-list">
          <ui-card>
            <div class="controls">
              <ui-button mode="outline" @click="fetchTutors(true)">
                Refresh
              </ui-button>
              <ui-button v-if="!isTutor" link to="/register">
                Tutor registration
              </ui-button>
            </div>
            <div
              v-if="hasTutors"
              @scroll.prevent="onScroll($event)"
              class="tutor-cards"
              :style="{ top: cTop + 'px' }"
            >
              <tutor-item
                v-for="(tutor, index) in filteredTutors"
                :key="tutor.id"
                :index="index"
                :id="tutor.tutorId"
                :full-name="tutor.fullName"
                :description="tutor.description"
                :rate="tutor.hourlyRate"
                :areas="tutor.areas"
                :current-card="currentCard"
                :total="listTutors.length"
              >
              </tutor-item>
            </div>
            <h3 v-else>No tutors found.</h3>
          </ui-card>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      currentCard: 1,
    };
  },
  computed: {
    ...mapGetters({
      listTutors: "tutors/getTutors",
      isTutor: "tutors/isTutor",
      hasTutors: "tutors/hasTutors",
      listAreas: "areas/getAreas",
    }),
    listAreas_0() {
      return this.listAreas[0];
    },
    filteredTutors() {
      const tutors = this.listTutors;
      if (this.activeFilters.length === 0) {
        return tutors;
      } else {
        const areas = this.listAreas[0];
        if (areas && areas.length) {
          const idSet = new Set();
          let af;
          for (let fi of this.activeFilters) {
            af = fi.replace(" ", "-~");
            for (let el of areas) {
              if (el.areas.includes(af)) {
                idSet.add(el.tutor_id);
              }
            }
          }
          return tutors.filter((tutor) => {
            idSet.has(tutor.tutor_id);
          });
        } else {
          return null;
        }
      }
    },
    hasTutors() {
      return this.listTutors.length;
    },
    cTop() {
      return this.currentCard * 10;
    },
  },
  mounted() {
    this.fetchTutors();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async fetchTutors(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "tutors/fetchTutors",
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
    onScroll(event) {
      const el = event.target;
      const pos = el.scrollTop / (2 * (el.scrollHeight - el.clientHeight));
      const currentCard = Math.ceil(pos * 10) || 1;
      if (currentCard <= this.listTutors.length) this.currentCard = currentCard;
      console.log(this.currentCard);
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
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.main-list {
  overflow-y: hidden;
  height: 65vh;
  margin-top: -2rem;
}

.tutor-cards {
  position: relative;
  height: 50vh;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main-list::-webkit-scrollbar,
.tutor-cards::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-list,
.tutor-cards {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.main-list .card {
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.tutor-cards {
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
