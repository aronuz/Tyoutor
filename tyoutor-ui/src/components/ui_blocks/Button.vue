<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  box-shadow: 0px 0px 0px 3px #685e5e;
  background-image: linear-gradient(180deg, #6c63ed, #0a1116 90%);
}

a:hover,
button:hover {
  background-color: #270041;
  border-color: #270041;
}

a:active,
button:active {
  background-image: linear-gradient(360deg, #6c63ed 30%, #0a1116);
  box-shadow: 0px 0px 2px 2px #544a4a inset;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-image: linear-gradient(180deg, #0071ff, #0a1116 90%);
  border-color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover {
  background-color: #edd2ff;
}

.outline:active {
  background-image: linear-gradient(360deg, #0071ff 30%, #0a1116) !important;
}
</style>
