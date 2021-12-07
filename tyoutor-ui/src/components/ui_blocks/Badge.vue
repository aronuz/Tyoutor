<template>
  <span class="badge" :class="[getClass]">
    {{ text }}
  </span>
  <ui-button v-if="isOwnArea" @click="removeArea()"> Remove </ui-button>
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
</style>
