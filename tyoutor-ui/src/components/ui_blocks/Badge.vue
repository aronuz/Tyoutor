<template>
  <span class="badge" :class="[getClass]">
    {{ text }}
  </span>
  <ui-button
    v-if="isOwnArea"
    :class="{ 'remove-area': isOwnArea }"
    @click="removeArea()"
  >
    &#215;
  </ui-button>
</template>

<script>
export default {
  props: ["type", "isOwnArea"],
  data() {
    return {
      classes: {
        "a-f": /^[a-fA-F]/,
        "g-m": /^[g-mG-M]/,
        "n-t": /^[n-tN-T]/,
        "u-z": /^[u-zU-Z]/,
      },
    };
  },
  computed: {
    getClass() {
      const obj = this.classes;
      const area = this.type;
      let badgeClass = "other";
      for (let key in obj) {
        if (obj[key].test(area)) {
          badgeClass = key;
        }
      }
      return badgeClass;
    },
    text() {
      return this.type.toUpperCase();
    },
  },
  methods: {
    removeArea() {
      this.emitter.emit("remove-area", { area: this.type });
    },
  },
};
</script>

<style scoped>
.badge {
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  cursor: default;
}

.other {
  background-color: rgb(65, 57, 57);
  color: white;
}

.a-f {
  background-color: #b46000;
  color: white;
}

.g-m {
  background-color: #f1b900;
  color: #9d0000;
}

.n-t {
  background-color: #788d00;
  color: #140909;
}

.u-z {
  background-color: #04af98;
  color: #140909;
}

.remove-area {
  padding: 0.1rem 0.45rem;
  position: relative;
  margin-right: -22px;
  left: -31px;
  bottom: 0.05rem;
  border: none;
  box-shadow: 0px 0px 0px 1px #685e5e;
  background-image: linear-gradient(180deg, #ed4f56, #2c0e10 90%);
}
</style>
