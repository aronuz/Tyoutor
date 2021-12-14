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
            <div v-if="hasTutors" class="tutor-cards">
              <div
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
              <div class="card-arrows">
                <div
                  class="arrow-up"
                  @click.stop="changeCard($event, -1)"
                  @mouseup="resetButton($event)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-circle-up']"
                    size="2x"
                  />
                </div>
                <div
                  class="arrow-down"
                  @click.stop="changeCard($event, 1)"
                  @mouseup="resetButton($event)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-circle-down']"
                    size="2x"
                  />
                </div>
              </div>
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
    resetButton(event) {
      let el = event.target.parentNode;
      if (
        !(
          event.target.parentNode.classList.contains("arrow-up") ||
          event.target.parentNode.classList.contains("arrow-down")
        )
      ) {
        el = el.parentNode;
      }
      setTimeout(() => {
        el.style.background = "#39d704";
      }, 250);
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
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: stretch;
}

.card-stack {
  width: 90vw;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main-list::-webkit-scrollbar,
.card-stack::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-list,
.card-stack {
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

.controls {
  display: flex;
  justify-content: space-between;
}

.card-stack,
.card-arrows {
  display: inline-block;
}

.card-arrows {
  position: relative;
  bottom: 4.5vh;
  right: 5vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
}

.card-arrows div {
  border-radius: 50px;
  background: #39d704;
  box-shadow: 0px 0px 0px 2px #3e3e3e;
  cursor: pointer;
}
</style>
