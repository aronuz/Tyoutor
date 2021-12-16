<template>
  <div
    class="li"
    :class="{ 'check-mark': isCardIndex }"
    :id="`t-card-${index}`"
  >
    <div>
      From: <a :href="emailLink">{{ email }}</a>
    </div>
    <ui-card>{{ message }}</ui-card>
  </div>
</template>

<script>
export default {
  props: ["email", "message", "index", "currentCard", "direction"],
  computed: {
    emailLink() {
      return `mailto: ${this.email}`;
    },
    isCardIndex() {
      return this.index === this.currentCard - 1;
    },
  },
};
</script>

<style scoped>
.li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  background-color: #8ccee8;
}

a {
  color: #140527;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

.card {
  margin-bottom: 0;
  background-color: white;
  margin: 1rem auto 0.5rem !important;
}

.check-mark::before {
  content: "";
  position: absolute;
  left: 20rem;
  margin-top: 2.5em;
  height: 0.5em;
  width: 0.5em;
  transform: rotate(45deg);
  border-color: #14057e;
  border-style: solid;
  border-width: 0.15em 0.15em 0 0;
}
</style>
