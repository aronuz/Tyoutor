<template>
  <span class="badge" :class="getClass(type)">
    {{ text | capitalize }}
  </span>
  <ui-button v-if="isOwnArea" @click="bus.$emit('remove-area', { area: type })">
    Remove
  </ui-button>
</template>

<script>
import bus from "@/bus";

export default {
  props: ["type", "isOwnArea"],
  data() {
    return {
      classes: {
        "a-f": /^a/,
        "g-m": /^g/,
        "n-t": /^n/,
        "u-z": /^u/,
      },
    };
  },
  filters: {
    capitalize: function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  computed: {
    text() {
      return this.type.toUpperCase();
    },
  },
  methods: {
    getClass(area) {
      const obj = this.classes;
      const r = Object.fromEntries(
        Object.entries(obj).filter(([key]) => obj[key].test(area))
      );
      return Object.keys(r)[0];
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.a-f {
  background-color: #b46000;
  color: white;
}

.g-m {
  background-color: #f1b900;
  color: white;
}

.n-t {
  background-color: #788d00;
  color: white;
}

.u-z {
  background-color: #04af98;
  color: white;
}
</style>