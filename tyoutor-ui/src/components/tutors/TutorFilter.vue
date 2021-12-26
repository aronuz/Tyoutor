<template>
  <ui-card>
    <h2>Find a Tutor</h2>
    <div class="filter-block">
      <label for="search-input" style="font-weight: 600">Search: </label>
      <input
        type="search"
        @input="setSearch"
        id="search-input"
        ref="search-input"
      />
      <ui-button @click="submitFilters">Search</ui-button>
    </div>
    <div
      v-if="getAreas"
      class="filter-head"
      @click="setFilter($event)"
      style="font-weight: 600"
    >
      Filter by:
    </div>
  </ui-card>
</template>

<script>
export default {
  emits: ["set-search", "set-filter"],
  props: ["listAreas"],
  data() {
    return {
      filters: [],
    };
  },
  mounted() {
    this.buildFilters();
  },
  computed: {
    getAreas() {
      let areas,
        islistAreas = !!this.listAreas.length;
      if (!islistAreas && localStorage.getItem("areas")) {
        areas = localStorage.getItem("areas").split(",");
      } else {
        areas = this.listAreas;
      }
      if (!areas) return;
      const areaSet = new Set();
      for (let item of areas) {
        areaSet.add(item.areas || item);
      }
      if (islistAreas) {
        const areaList = Array.from(areaSet).map((item) =>
          item.replace("-~", " ")
        );
        localStorage.setItem("areas", areaList.join(","));
        return areaList;
      }
      return areaSet;
    },
  },
  methods: {
    buildFilters() {
      if (this.getAreas) {
        this.getAreas.forEach((el) => {
          const filterId = el.replace(" ", "-~");
          const spanEl = document.createElement("span");
          spanEl.classList.add("filter-option");
          document
            .querySelectorAll(".filter-head")[0]
            .insertAdjacentElement("beforeend", spanEl);
          const filter = `
      <input type="checkbox" id="${filterId}" />
      <label for="${filterId}">${el}</label>`;
          spanEl.insertAdjacentHTML("afterbegin", filter);
        });
      }
    },
    setFilter(event) {
      const target = event.target;
      if (target.type === "checkbox") {
        const inputId = target.id;
        const isActive = target.checked;
        if (isActive) {
          this.filters.push(inputId);
        } else {
          const ix = this.filters.indexOf(inputId);
          this.filters.splice(ix, 1);
        }
      }
    },
    setSearch(event) {
      this.$emit("set-search", event.target.value);
    },
    submitFilters() {
      const searchTerm = this.$refs["search-input"].value;
      this.$emit("set-filter", { searchTerm, filters: this.filters });
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-block {
  position: relative;
  bottom: 15px;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

button {
  margin-left: 40px;
}
</style>
