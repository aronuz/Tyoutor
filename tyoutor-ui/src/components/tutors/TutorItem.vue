<template>
  <div
    class="li"
    :id="`t-card-${index}`"
    :style="{ zIndex: zIndex, top: cTop + 'px', left: cLeft, width: cWidth }"
  >
    <div class="card-owner">
      <div>
        <h3>{{ fullName }}</h3>
      </div>
      <div class="index" v-text="index"></div>
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
    "direction",
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
      return this.index === this.currentCard;
    },
    zIndex() {
      const div = Math.abs(this.currentCard - this.index);
      return !this.isCardIndex ? this.total - div : this.total;
    },
    cTop() {
      let offSet =
        this.index === 1
          ? -10 * this.currentCard
          : -20 * ((this.index - 1) * 10 + this.index - 1);
      if (this.currentCard > 1 && this.index > 1)
        if (this.index >= this.currentCard)
          offSet -= (this.currentCard - 2) * 10;
        else offSet -= (this.currentCard - 2) * 20;
      return offSet;
    },
    cLeft() {
      // const ix = this.index;
      // const n =
      //   this.currentCard > ix ? this.currentCard - ix : ix - this.currentCard;
      // return !this.isCardIndex ? `${n}%` : "0%";
      const div = Math.abs(this.currentCard - this.index);
      return `${div}%`;
    },
    cWidth() {
      const div = Math.abs(this.currentCard - this.index);
      const divi = Math.abs(this.currentCard - this.index);
      return !this.isCardIndex ? `${92 - divi - div}%` : "92%";
    },
  },
  watch: {
    isCardIndex() {
      console.log("index: " + this.isCardIndex);
      const cardEl = document.getElementById(`t-card-${this.index}`);
      if (this.isCardIndex) {
        const dirSuffix = this.direction ? "up" : "down";
        cardEl.classList.add("move-" + dirSuffix);
      } else {
        cardEl.classList.remove("move-up");
        cardEl.classList.remove("move-down");
      }
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

.li * {
  cursor: default;
}

.move-down {
  animation-name: move-down;
  animation-duration: 0.3s;
  animation-timing-function: linear;
}

@keyframes move-down {
  0% {
    transform: translateY(-35px) scale(0.9);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-25px) scale(0.925);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-15px) scale(0.95);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-5px) scale(0.975);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
}

.move-up {
  animation-name: move-up;
  animation-duration: 0.3s;
  animation-timing-function: linear;
}

@keyframes move-up {
  0% {
    transform: translateY(40px) scale(0.9);
    opacity: 0.2;
  }
  25% {
    transform: translateY(20px) scale(0.925);
    opacity: 0.4;
  }
  50% {
    transform: translateY(10px) scale(0.95);
    opacity: 0.6;
  }
  75% {
    transform: translateY(5px) scale(0.975);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
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
