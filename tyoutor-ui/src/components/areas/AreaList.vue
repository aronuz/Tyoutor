<template>
  <div v-if="part === 'all'">
    <slot>
      <div class="ml-md-16 ml-xs-1 area-list">
        <div class="area-info">
          <ui-card
            class="area-card"
            width="100%"
            :style="{ boxShadow: `1px -2px 18px 0px ${shadowColor}` }"
            v-html="allAreasInfo"
          >
          </ui-card>
        </div>
      </div>
    </slot>
  </div>
  <div v-if="part === 'tutor'">
    <slot name="tutor-areas">
      <ui-card width="100vw" class="mx-auto card-row area-row" color="#fff">
        <div class="tutor-area-info">
          <div class="area-card" width="100%">
            {{ tutorAreasInfo }}
          </div>
        </div>
      </ui-card>
    </slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AreaList",
  props: {
    tutorId: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    this.emitter.on("remove-area", (data) => {
      this.$store.dispatch("areas/removeArea", data);
    });
  },
  computed: {
    ...mapGetters({
      listAreas: "areas/getAreas",
      tutorAreas: "areas/getTutorAreas",
    }),
    allAreasInfo() {
      if (this.part !== "all") return "";
      const areas = this.listAreas[0];
      if (areas && areas.length && this.tutorId) {
        let area;
        const infoStr = [];
        const tutorItems = areas.filter((el) => el.tutorId === this.tutorId);
        for (let i in areas) {
          area = tutorItems.includes(areas[i])
            ? `<span style="color: #d1d1d1;">${areas[i].areas}</span>`
            : areas[i].areas;
          infoStr.push(area);
        }
        return infoStr.join(", ");
      } else {
        return "";
      }
    },
    tutorAreasInfo() {
      if (this.part !== "tutor") return "";
      const areas = this.tutorAreas(this.tutorId);
      if (areas.length) {
        const infoStr = [];
        for (let i in areas) {
          infoStr.push(areas[i].areas);
        }
        return infoStr.length ? infoStr.join(", ") : "";
      } else {
        return "";
      }
    },
    shadowColor() {
      return this.allAreasInfo.includes("#d1d1d1") ? "#d1d1d1" : "#0000009e";
    },
  },
  methods: {},
};
</script>

<style scoped>
.area-card {
  background-color: #2ba4d300;
  font-size: 0.7em;
  font-family: "Times New Roman", Times, serif;
  color: black;
}

.area-card h1 {
  position: relative;
  min-width: 100%;
  height: 100%;
  white-space: pre-wrap;
  margin: 0;
  text-align: center;
  color: #000;
}

.area-list {
  display: inline-block;
  position: relative;
}

.area-info {
  display: inline-block;
  font-family: "Times New Roman", Times, serif;
  background-color: lightgrey;
  position: relative;
  width: 100%;
  background-color: #00000017;
}

@media (max-width: 344px) {
  .area-card {
    font-size: 0.8em !important;
    line-height: 1.2;
    transform: translateY(-5px) translateX(-15px) rotate(90deg);
    -webkit-transform: translateY(-5px) translateX(-15px) rotate(90deg);
    -ms-transform: translateY(-5px) translateX(-15px) rotate(90deg);
  }
  .area-list {
    position: relative;
    left: 30vw;
    top: -30px;
  }
}
@media (min-width: 345px) and (max-width: 600px) {
  .area-card {
    margin-right: 10px;
    width: 20vw;
  }
}
@media (max-width: 600px) {
  .area-card {
    margin-right: 10px;
    width: 20vw;
  }
  .area-list {
    padding: 0px !important;
    width: 40vw;
  }
}
@media (min-width: 601px) and (max-width: 959px) {
  .area-card {
    margin-right: 10px;
    width: 20vw;
    background-color: #ececec;
  }
  .area-list {
    display: block;
    width: 40vw;
  }
  .area-list {
    padding: 0px !important;
    width: 100%;
  }
}
@media (max-width: 959px) {
  .area-card {
    display: none;
  }
  .area-sub-row {
    float: left;
    position: relative;
    top: 35px;
  }
  .area-info {
    display: none;
  }
  .area-list {
    top: 0px;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .area-sub-row {
    width: 95%;
  }
  .area-list {
    width: 100%;
    height: 100%;
  }
  .area-list {
    padding: 0 0 0 15% !important;
    width: 90%;
  }
  .area-card {
    font-size: 1.8rem;
    line-height: 1.13;
  }
}
@media (min-width: 1024px) {
  .area-list {
    width: 100%;
  }
  .area-info {
    height: 100%;
  }
  .area-preview {
    width: 350px !important;
    height: 500px;
    margin: 10px 0 0 20px !important;
  }
  .area-content {
    padding: 10px;
    text-align: center;
    position: relative;
    top: 200px;
  }
  .area-thumbnail {
    width: 200%;
  }
  .area-content {
    width: 200%;
  }
  .area-content h1 {
    font-size: 2.5em;
    font-weight: 200;
  }
  .area-card {
    font-size: 1.9em;
    height: 10vh;
  }

  .tutor-area-info .area-card {
    margin: auto;
    text-align: center;
  }
}
</style>
