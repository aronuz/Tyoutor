<template>
  <layout
    :has-items="!!hasTutors"
    :is-loading="isLoading"
    :error="error"
    :up-active="upActive"
    :down-active="downActive"
  >
    <template v-slot:default>
      <tutor-filter
        @load-areas="loadAreas"
        @set-search="setSearch"
        @set-filter="setFilters"
        :list-areas="listAreas"
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
        ref="card-stack"
        @scroll.prevent.stop="onScroll($event)"
        :style="{ marginTop: mTop + 'px', paddingTop: pTop + 'px' }"
      >
        <tutor-item
          v-for="(tutor, index) in filteredTutors"
          :key="tutor.id"
          :index="index + 1"
          :id="tutor.tutorId"
          :full-name="tutor.fullName"
          :description="tutor.description"
          :rate="tutor.hourlyRate"
          :areas="tutor.areas"
          :current-card="currentCard"
          :total="filteredTutors.length"
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
  props: {
    isTutor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeFilters: [],
      error: null,
      isLoading: false,
      currentCard: 1,
      hasScrolled: false,
      direction: null,
      filteredTutors: [],
      searchTerm: "",
      previousTerm: "",
      activeSearch: [],
      filterTimeOut: null,
      isSearch: false,
      filteredIDs: [],
    };
  },
  computed: {
    ...mapGetters({
      listTutors: "tutors/getTutors",
      listPageTutors: "tutors/getTutorsSlice",
      listAreas: "areas/getAreas",
    }),
    hasTutors() {
      return this.filteredTutors.length;
    },
    scrollY() {
      return (this.filteredTutors.length + 2) * 50;
    },
    mTop() {
      return this.currentCard * 10;
    },
    pTop() {
      if (!this.hasScrolled && this.pTop >= 100) return 100;
      else if (this.hasScrolled && this.currentCard) {
        const currentY = this.$refs["card-stack"].scrollTop - 50;
        return currentY;
      } else return this.currentCard * 10;
    },
    upActive() {
      return this.currentCard > 1;
    },
    downActive() {
      const totalKey =
        this.searchTerm && this.filteredIDs.length
          ? "tutorsTotalFilter"
          : "tutorsTotal";
      const total = localStorage.getItem(totalKey);
      return this.currentCard < +total;
    },
  },
  mounted() {
    if (!this.listTutors.length) this.fetchTutors(true);
    else this.filteredTutors = this.listTutors;
  },
  watch: {
    searchTerm() {
      if (this.searchTerm) {
        if (this.previousTerm.indexOf(this.searchTerm) === -1)
          this.filteredTutors = this.listTutors;
        const params = [this.searchTerm, this.filteredTutors].slice();
        const setSearchFunc = () => {
          const tutors = params[1].filter(
            (item) =>
              item.fullName.toLowerCase().indexOf(params[0].toLowerCase()) > -1
          );
          if (tutors) {
            this.activeSearch = tutors;
            this.setTutorFilter();
          } else {
            this.activeSearch = null;
          }
        };

        this.filterTimeOut = setTimeout(setSearchFunc.bind(this, params), 500);
      }
    },
  },
  methods: {
    async loadAreas() {
      await this.fetchAreas();
    },
    setSearch(term) {
      clearTimeout(this.filterTimeOut);
      if (!term && this.searchTerm) {
        this.activeSearch = this.listTutors;
        this.searchTerm = "";
        this.setTutorFilter();
        this.unsetFilteredState();
      } else if (term && this.searchTerm !== term) {
        this.activeSearch = [];
        this.previousTerm = this.searchTerm;
        this.searchTerm = term;
      } else this.setTutorFilter();
    },
    setFilters(data) {
      clearTimeout(this.filterTimeOut);
      this.activeFilters = data.filters;
      this.setSearch(data.searchTerm);
    },
    async fetchTutors(refresh = false, page = -1, filter) {
      this.isLoading = true;
      try {
        let storedTutors;
        //console.log("page: " + page);
        if (page > -1)
          storedTutors = await this.listPageTutors({ page, filter: filter });
        if (storedTutors && storedTutors.length) {
          for (let tutor of storedTutors) this.filteredTutors.push(tutor);
        } else if (!filter) {
          await this.$store.dispatch(
            "tutors/fetchTutors",
            {
              forceRefresh: refresh,
              page,
            },
            { root: true }
          );
          // this.filteredTutors = this.listTutors;
          if (page === -1) await this.fetchAreas();
          else this.currentCard = page * 2 - 1;
          this.setTutorFilter();
        } else {
          const filterLength = this.filteredIDs.length;
          if (filterLength > 2) page = Math.ceil(filterLength / 2);
          await this.$store.dispatch(
            "tutors/fetchFilteredTutors",
            {
              page,
              filter,
              tutorIDs: this.filteredIDs,
            },
            { root: true }
          );
          this.currentCard = page * 2 - 1;
          this.filteredTutors = this.listPageTutors({ page, filter: filter });
        }
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    unsetFilteredState() {
      const items = [
        "tutorsPreviousFilter",
        "tutorsNextFilter",
        "tutorsTotalFilter",
      ];
      for (let item of items) {
        localStorage.removeItem(item);
      }
      this.filteredIDs = [];
      this.$store.commit("tutors/unsetTutors");
    },
    async fetchAreas() {
      const idList = this.listTutors.map((tutor) => tutor.tutorId);
      await this.$store.dispatch("areas/fetchAreas", idList);
    },
    setTutorFilter() {
      let tutors;
      if (typeof this.activeSearch === "object" && !this.activeSearch) {
        this.filteredTutors = [];
      } else if (this.activeFilters.length === 0) {
        tutors = this.activeSearch.length ? this.activeSearch : this.listTutors;
        this.filteredTutors = tutors;
        this.isSearch = this.activeSearch.length ? true : false;
      } else {
        tutors = this.activeSearch.length ? this.activeSearch : this.listTutors;
        const areas = this.listAreas;
        this.isSearch = this.activeFilters.length ? true : false;
        if (areas && areas.length) {
          const tutorSet = new Set();
          let areaFilters = [];
          for (let fi of this.activeFilters.map((item) =>
            item.replace(" ", "-~")
          )) {
            areaFilters.push(areas.filter((item) => item.areas === fi)[0]);
          }
          for (let item of areaFilters) {
            tutorSet.add(item.tutorId);
          }
          const filteredTutors = tutors.filter((tutors) =>
            tutorSet.has(tutors.tutorId)
          );
          this.filteredTutors = filteredTutors;
        } else {
          this.filteredTutors = [];
        }
      }
      if (this.isSearch) {
        const totalFiltered = [];
        tutors.forEach((tutor) => totalFiltered.push(tutor.tutorId));
        const totalFilteredLength = totalFiltered.length;
        if (this.currentCard > totalFilteredLength)
          this.currentCard = totalFilteredLength;
        this.filteredIDs = totalFiltered.slice();
        // localStorage.setItem("tutorsTotalFilter", totalFilteredLength);
        this.$store.commit("tutors/setTutors", { tutors, filtered: true });
        const page =
          totalFilteredLength < 2 ? 0 : Math.ceil(totalFilteredLength / 2);
        this.fetchTutors(true, page, this.searchTerm);
      }
    },
    closeDialogue() {
      this.error = null;
    },
    changeCard(event, d) {
      event.currentTarget.style.background = "#36e965";
      const cardIdx = this.currentCard + d;
      //console.log(cardIdx);
      if (
        1 <= cardIdx &&
        cardIdx <= this.listTutors.length &&
        cardIdx !== this.currentCard
      ) {
        this.direction = cardIdx > this.currentCard;
        this.currentCard = cardIdx;
        this.hasScrolled = false;
      } else if (cardIdx < 1) {
        this.loadPage(false, false);
      } else {
        this.loadPage(true, false);
      }
    },
    onScroll(event) {
      if (
        event.target.scrollTop >= 0 &&
        event.target.scrollTop <= this.scrollY
      ) {
        const el = event.target;
        const pos = el.scrollTop / (2 * (el.scrollHeight - el.clientHeight));
        const cardIdx = Math.ceil(pos * 10) || 1;
        if (
          1 <= cardIdx &&
          cardIdx <= this.listTutors.length &&
          cardIdx !== this.currentCard
        ) {
          this.direction = cardIdx > this.currentCard;
          this.currentCard = cardIdx;
          this.hasScrolled = true;
        }
      } else if (event.target.scrollTop < 0) {
        event.target.scrollTo(0, 0);
        this.loadPage(false, true);
      } else {
        event.target.scrollTo(0, this.scrollY - 50);
        this.loadPage(true, true);
        this.currentCard = 1;
      }
    },
    async loadPage(direction, isScroll) {
      const isFiltered = this.searchTerm ? "Filter" : "";
      const lsItem = !direction ? "tutorsPrevious" : "tutorsNext";
      const page = parseInt(localStorage.getItem(`${lsItem}${isFiltered}`));
      if (page > 0) {
        this.direction = direction;
        this.hasScrolled = isScroll;
        const filter = !this.searchTerm ? false : this.searchTerm;
        await this.fetchTutors(true, page, filter);
      }
      // if (page === 0 && n < 0) {
      //   document
      //     .querySelectorAll(".arrow-up")[0]
      //     .setAttribute("disabled", "disabled");
      //   document
      //     .querySelectorAll(".arrow-down")[0]
      //     .removeAttribute("disabled");
      // } else if (page === 0 && n > 0) {
      //   document
      //     .querySelectorAll(".arrow-down")[0]
      //     .setAttribute("disabled", "disabled");
      //   document.querySelectorAll(".arrow-up")[0].removeAttribute("disabled");
      // } else {
      //   document
      //     .querySelectorAll("[class^='arrow-']")
      //     .forEach((el) => el.removeAttribute("disabled"));
      // }
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
