<template>
  <ui-card class="filter-card">
    <div class="page-title">
      <h2>Tutors</h2>
    </div>
    <ui-card class="card search-card">
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
      <div>
        <div class="filter-div">Filter by:</div>
        <div
          v-if="getAreas"
          class="filter-div filter-head"
          @click="setFilter($event)"
        ></div>
        <div class="filter-div">
          <ui-button class="load-more" @click="loadMore">More</ui-button>
        </div>
      </div>
    </ui-card>
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
  watch: {
    getAreas() {
      if (this.getAreas) this.buildFilters();
    },
  },
  methods: {
    buildFilters() {
      if (this.getAreas) {
        const filterBlock = document.querySelectorAll(".filter-head")[0];
        filterBlock.innerHTML = "";
        let areaSection = document.createElement("div");
        areaSection.classList.add("area-section");
        filterBlock.insertAdjacentElement("beforeend", areaSection);
        let filterId, spanEl, filter;
        let sections = 0;
        let lastSection = document.querySelectorAll(".area-section")[0];
        Array.from(this.getAreas).forEach((el, ix) => {
          if (ix > 3 && ix % 3 === 1) {
            areaSection = document.createElement("div");
            areaSection.classList.add("area-section");
            filterBlock.insertAdjacentElement("beforeend", areaSection);
            sections += 1;
            lastSection = document.querySelectorAll(".area-section")[sections];
          }
          filterId = el.replace(" ", "-~");
          spanEl = document.createElement("span");
          spanEl.classList.add("filter-option");
          lastSection.insertAdjacentElement("beforeend", spanEl);
          filter = `
      <input type="checkbox" id="${filterId}" />
      <label for="${filterId}">${el}</label>`;
          spanEl.insertAdjacentHTML("afterbegin", filter);
        });
      }
    },
    loadMore() {
      this.$emit("load-areas");
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
/* h2 {
  margin: 0.5rem 0;
} */
.filter-card {
  padding: 1.5rem 1rem !important;
  width: 100%;
  height: 100%;
  min-width: 35vw;
  text-align: center;
  margin-right: 0 !important;
}

.page-title {
  float: left;
}

.search-card {
  margin: 0 !important;
  padding: 0 0 1rem 0 !important;
  box-shadow: -3px 0px 2px rgb(0 0 0 / 26%) !important;
}

.page-title,
.search-card {
  display: inline-block;
}
.filter-block {
  position: relative;
  bottom: 15px;
}

#search-input {
  margin-left: 10px;
}

.filter-div {
  display: inline-block;
  vertical-align: top;
}

.filter-head {
  height: 50px;
  max-height: 50px;
  overflow-y: auto;
  padding: 0 10px 5px;
  margin: 0 0 0 5px;
  background-color: #fff;
  border: 0.1em solid #767676;
}

#search-input,
.filter-div,
.filter-head {
  font-weight: 600;
}

/* .filter-div:last-of-type {
  position: relative;
  top: 5px;
} */

.load-more {
  margin-left: 0;
  padding: 10px 5px;
  border-width: 0.5px;
  border-radius: 0 30px 30px 0;
  box-shadow: 2px 0px 0px 1px #685e5e;
  height: 50px;
  font-weight: 400;
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
  margin-left: 20px;
  padding: 0.35rem 0.5rem !important;
  font-size: 0.8rem !important;
}
</style>
