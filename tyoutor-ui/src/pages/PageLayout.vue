<template>
  <div>
    <ui-dialog :show="!!error" title="Error" @close="$parent.closeDialogue">
      <p>{{ error }}</p>
    </ui-dialog>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <div class="home-page">
      <div class="child_1">
        <section class="page-top">
          <slot></slot>
        </section>
        <section class="main-list">
          <ui-card
            :class="{ 'home-card': homeStyle, 'requests-card': requestsStyle }"
          >
            <div class="controls">
              <slot name="controls"></slot>
            </div>
            <div
              v-if="hasItems"
              class="item-cards"
              :style="{ display: !homeStyle ? 'flex' : 'block' }"
            >
              <slot name="cards"></slot>
              <div v-if="!homeStyle" class="card-arrows">
                <div
                  class="arrow-up"
                  @click.stop="$parent.changeCard($event, -1)"
                  @mouseup="resetButton($event)"
                  v-show="upActive"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-circle-up']"
                    size="2x"
                  />
                </div>
                <div
                  class="arrow-down"
                  @click.stop="$parent.changeCard($event, 1)"
                  @mouseup="resetButton($event)"
                  v-show="downActive"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-circle-down']"
                    size="2x"
                  />
                </div>
              </div>
            </div>
          </ui-card>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasItems: {
      type: Boolean,
      required: true,
      default: false,
    },
    homeStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
    requestsStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
    upActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    downActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
  },
  methods: {
    resetButton(event) {
      let el = event.target.parentNode;
      if (
        !(
          event.target.parentNode.classList.contains("arrow-up") ||
          event.target.parentNode.classList.contains("arrow-down")
        )
      ) {
        el = el.parentNode;
      }
      setTimeout(() => {
        el.style.background = "#39d704";
      }, 250);
    },
  },
};
</script>

<style scoped>
.home-page {
  position: fixed;
  top: 2rem;
  z-index: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow-y: hidden;
}

.child_1 {
  position: relative;
  bottom: 0;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.page-top {
  background-image: linear-gradient(
    140deg,
    #10bbfd 15%,
    #43465c8a 70%,
    #ffffffab 90%,
    #ffa386 99%
  );
}

.controls {
  display: flex;
  justify-content: space-between;
}

.main-list {
  overflow-y: hidden;
  height: 65vh;
  margin-top: -2rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.main-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.main-list .card {
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.home-card {
  padding: 2rem 0 !important;
}

.requests-card {
  margin-top: 4rem !important;
  height: 100%;
}

h3 {
  text-align: center;
}

.item-cards {
  position: relative;
  height: 50vh;
  margin: 0;
  padding: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: stretch;
}

.card-arrows {
  display: inline-block;
}

.card-arrows {
  position: relative;
  bottom: 4.5vh;
  right: 5vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
}

.card-arrows div {
  border-radius: 50px;
  background: #39d704;
  box-shadow: 0px 0px 0px 2px #3e3e3e;
  cursor: pointer;
}
</style>
