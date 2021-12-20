<template>
  <ui-card>
    <h2>Find a Tutor</h2>
    <div class="filter-block">
      <input type="text" ref="filter-input" />
      <ui-button @click="submitFilters">Search</ui-button>
    </div>
  </ui-card>
</template>

<script>
export default {
  emits: ["set-filter"],
  props: ["listAreas"],
  data() {
    return {
      filters: [],
    };
  },
  mounted() {
    this.buildFilters();
  },
  methods: {
    buildFilters() {
      let areas = this.listAreas;
      let setLS = false,
        lsItems = [],
        isFromLS = false;
      if (!areas || areas.length === 0) {
        areas = localStorage.getItem("areas").split(",");
        isFromLS = true;
      } else {
        setLS = true;
      }
      if (!areas || areas.length === 0) return;
      document
        .querySelectorAll(".filter-block")[0]
        .insertAdjacentHTML(
          "beforeend",
          "<div class='filter-head' style='font-weight: 600'>Filter by:</div>"
        );
      const areaSet = new Set();
      for (let item of areas) {
        areaSet.add(isFromLS ? item : item.areas);
      }
      areaSet.forEach((el) => {
        const filterId = el.replace(" ", "-~");
        if (setLS) lsItems.push(el);
        const spanEl = document.createElement("span");
        spanEl.classList.add("filter-option");
        document
          .querySelectorAll(".filter-block")[0]
          .insertAdjacentElement("beforeend", spanEl);
        const filter = `
      <input type="checkbox" id="${filterId}" @change="setFilter" />
      <label for="${filterId}">${el}</label>`;
        spanEl.insertAdjacentHTML("afterbegin", filter);
      });
      if (setLS && lsItems) {
        const lsString = lsItems.join(",");
        localStorage.setItem("areas", lsString);
      }
    },
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      if (isActive) {
        this.filters.push(inputId);
      } else {
        const ix = this.filters.indexOf(inputId);
        this.filters.splice(ix, 1);
      }
    },
    submitFilters() {
      this.$emit("set-filter", this.filters);
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
