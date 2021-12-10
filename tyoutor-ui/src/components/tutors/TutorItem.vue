<template>
  <div
    class="li"
    :style="{ zIndex: zIndex, top: cTop + 'px', left: cLeft, width: cWidth }"
  >
    <div class="card-owner">
      <div>
        <h3>{{ fullName }}</h3>
      </div>
      <div class="index" v-text="index + 1"></div>
    </div>
    <h4>${{ rate }}/hr</h4>

    <div class="areas">
      <ui-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :is-own-area="isOwnArea"
      >
      </ui-badge>
    </div>
    <div class="actions">
      <ui-button mode="outline" link :to="tutorContactLink">
        Contact
      </ui-button>
      <ui-button link :to="tutorDetailsLink"> View Details </ui-button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "fullName",
    "description",
    "rate",
    "areas",
    "index",
    "currentCard",
    "total",
    "isScroll",
  ],
  computed: {
    tutorContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // /tutors/c1/contact
    },
    tutorDetailsLink() {
      return `${this.$route.path}/${this.id}`; // /tutors/c1
    },
    isOwnArea() {
      return this.$store.getters["tutors/currentUser"](this.id);
    },
    isCardIndex() {
      return this.index === this.currentCard - 1;
    },
    zIndex() {
      return !this.isCardIndex ? this.total - this.currentCard : this.total;
    },
    cTop() {
      const m = this.isScroll ? 0 : 15;
      const n = this.isScroll ? 0 : 85;
      const offSet =
        this.index > 0
          ? (!this.isCardIndex ? -185 - m : -150 - n) + this.index * 10
          : this.currentCard === 1 || !n
          ? 10
          : -10;
      return offSet;
    },
    cLeft() {
      const ix = this.index + 1;
      const n =
        this.currentCard > ix ? this.currentCard - ix : ix - this.currentCard;
      return !this.isCardIndex ? `${n}%` : "0%";
    },
    cWidth() {
      return !this.isCardIndex
        ? `${90 - this.currentCard - this.index}%`
        : "91%";
    },
  },
};
</script>

<style scoped>
.li {
  position: relative;
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  background-color: #d7d7d7;
  box-shadow: 1px 2px 0px 0px;
}

.card-owner {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.index {
  border: 1px solid black;
  border-radius: 50px;
  padding: 1px 5px 0 5px;
}

.areas {
  border: solid black;
  border-width: 2px 0;
  padding: 3px 0;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
