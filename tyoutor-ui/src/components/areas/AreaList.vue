<template>
  <ui-card class="area-card">
    <h1>{{ areas }}</h1>
  </ui-card>
</template>

<script>
export default {
  name: "AreaList",
  props: {
    areasList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      areas: "",
    };
  },
  created() {
    this.areas = this.areasList.slice(0, 10).join(", ");
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.area-card {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  font-size: 0.7em;
  font-family: "Times New Roman", Times, serif;
  color: black;
  background-image: linear-gradient(
    to bottom right,
    rgb(218, 184, 72) 15%,
    rgba(103, 194, 255, 0.452) 75%
  );
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

@media (max-width: 344px) {
  .area-card {
    font-size: 0.8em !important;
    line-height: 1.2;
    transform: translateY(-5px) translateX(-15px) rotate(90deg);
    -webkit-transform: translateY(-5px) translateX(-15px) rotate(90deg);
    -ms-transform: translateY(-5px) translateX(-15px) rotate(90deg);
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
}
@media (min-width: 601px) and (max-width: 959px) {
  .area-card {
    margin-right: 10px;
    width: 20vw;
    background-color: #ececec;
  }
}
@media (max-width: 959px) {
}
@media (min-width: 960px) and (max-width: 1023px) {
}
@media (min-width: 1024px) {
}
</style>
