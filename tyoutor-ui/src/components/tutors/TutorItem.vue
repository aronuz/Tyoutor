<template>
  <div
    class="li"
    :style="{ zIndex: zIndex, top: cTop + 'px', left: cLeft, width: cWidth }"
  >
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hr</h4>
    <div>
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
    zIndex() {
      return this.index !== this.currentCard - 1
        ? this.total - this.currentCard
        : this.total;
    },
    cTop() {
      const offSet = this.index !== this.currentCard - 1 ? -200 : -140;
      const firstOffset = this.currentCard === 1 ? 0 : 85;
      return this.index > 0 ? offSet + this.index * 10 : firstOffset;
    },
    cLeft() {
      return this.index !== this.currentCard - 1
        ? `${this.currentCard}%`
        : "0%";
    },
    cWidth() {
      return this.index !== this.currentCard - 1
        ? `${90 - this.currentCard}%`
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
