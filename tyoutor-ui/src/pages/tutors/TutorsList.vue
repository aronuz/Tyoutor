<template>
  <layout :has-items="!!hasTutors" :is-loading="isLoading" :error="error">
    <template v-slot:default>
      <tutor-filter
        @set-filter="setFilters"
        :list-areas="listAreas_0"
      ></tutor-filter>
    </template>
    <template v-slot:controls>
      <ui-button mode="outline" @click="fetchTutors(true)">Refresh</ui-button>
      <ui-button v-if="!isTutor" link to="/register">
        Tutor registration
      </ui-button>
    </template>
    <template v-slot:cards>
      <div
        v-if="hasTutors"
        class="card-stack"
        @scroll.prevent.stop="onScroll($event)"
        :style="{ marginTop: mTop + 'px', paddingTop: pTop + 'px' }"
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
          :is-scroll="isScroll"
          :direction="direction"
        >
        </tutor-item>
      </div>
      <h3 v-else>No tutors found.</h3>
    </template>
  </layout>
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
      isScroll: true,
      hasScrolled: false,
      direction: null,
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
    mTop() {
      return this.currentCard * 10;
    },
    pTop() {
      if (!this.hasScrolled && this.pTop === 100) return 100;
      else return this.hasScrolled ? this.currentCard * 50 : 0;
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
    changeCard(event, d) {
      event.currentTarget.style.background = "#36e965";
      const cardIdx = this.currentCard + d;
      if (
        1 <= cardIdx &&
        cardIdx <= this.listTutors.length &&
        cardIdx !== this.currentCard
      ) {
        this.isScroll = false;
        this.direction = cardIdx > this.currentCard;
        this.currentCard = cardIdx;
        this.hasScrolled = false;
      }
    },
    onScroll(event) {
      if (event.target.scrollTop >= 0 && event.target.scrollTop <= 100) {
        const el = event.target;
        const pos = el.scrollTop / (2 * (el.scrollHeight - el.clientHeight));
        const cardIdx = Math.ceil(pos * 10) || 1;
        if (
          1 <= cardIdx &&
          cardIdx <= this.listTutors.length &&
          cardIdx !== this.currentCard
        ) {
          this.isScroll = false;
          this.direction = cardIdx > this.currentCard;
          this.currentCard = cardIdx;
        }
        this.hasScrolled = true;
      } else if (event.target.scrollTop < 0) {
        event.target.scrollTo(0, 0);
      } else {
        event.target.scrollTo(0, 100);
      }
    },
  },
};
</script>

<style scoped>
.card-stack {
  display: inline-block;
  width: 90vw;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.card-stack::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.card-stack {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
