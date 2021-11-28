<template>
  <ui-card>
    <h2>Find a Tutor</h2>
    <ui-button @click="submitFilters">Apply</ui-button>
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
      const areas = this.listAreas;
      if (areas && areas.length) {
        const areaSet = new Set();
        for (let item of areas) {
          areaSet.add(item.areas);
        }
        areaSet.forEach((el) => {
          const filterId = el.replace(" ", "-~");
          const spanEl = document.createElement("span");
          spanEl.classList.add("filter-option");
          document
            .querySelectorAll(".card")[0]
            .insertAdjacentElement("beforeend", spanEl);
          const filter = `
      <input type="checkbox" id="${filterId}" @change="setFilter" />
      <label for="${filterId}">${el}</label>`;
          spanEl.insertAdjacentHTML("beforeend", filter);
        });
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

.filter-option {
  margin-right: 1rem;
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
</style>
