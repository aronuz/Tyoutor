<template>
  <layout
    :has-items="!!hasRequests"
    :is-loading="isLoading"
    :error="error"
    :requests-style="true"
  >
    <template v-slot:default>
      <ui-card>
        <h2>Incoming messages</h2>
      </ui-card>
    </template>
    <template v-slot:controls>
      <ui-button mode="outline" @click="loadRequests(true)">
        Refresh
      </ui-button>
    </template>
    <template v-slot:cards>
      <div
        v-if="hasRequests"
        class="card-stack"
        @scroll.prevent.stop="onScroll($event)"
      >
        <request-item
          v-for="(req, index) in receivedRequests"
          :key="req.id"
          :index="index"
          :email="req.userEmail"
          :message="req.message"
          :current-card="currentCard"
          :direction="direction"
        >
        </request-item>
      </div>
      <h3 v-else>There are no new messages.</h3>
    </template>
  </layout>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
      currentCard: 1,
      direction: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.receivedRequests.length;
    },
  },
  mounted() {
    this.loadRequests();
  },
  methods: {
    async loadRequests(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    closeDialogue() {
      this.error = null;
    },
    changeCard(event, d) {
      event.currentTarget.style.background = "#36e965";
      const cardIdx = this.currentCard + d;
      if (
        1 <= cardIdx &&
        cardIdx <= this.receivedRequests.length &&
        cardIdx !== this.currentCard
      ) {
        this.direction = cardIdx > this.currentCard;
        this.currentCard = cardIdx;
        const i = this.direction ? 128 : -128;
        document.getElementsByClassName("card-stack")[0].scrollBy(0, i);
      }
    },
    onScroll(event) {
      if (event.target.scrollTop >= 0 && event.target.scrollTop <= 100) {
        const el = event.target;
        const pos = el.scrollTop / (2 * (el.scrollHeight - el.clientHeight));
        const cardIdx = Math.ceil(pos * 10) || 1;
        if (
          1 <= cardIdx &&
          cardIdx <= this.receivedRequests.length &&
          cardIdx !== this.currentCard
        ) {
          this.direction = cardIdx > this.currentCard;
          this.currentCard = cardIdx;
        }
      } else if (event.target.scrollTop < 0) {
        event.target.scrollTo(0, 0);
      } else {
        event.target.scrollTo(0, 100);
      }
    },
  },
};
</script>

<style scoped>
.card-stack {
  overflow-y: scroll;
  list-style: none;
  margin-top: 10px;
  padding: 0;
  height: 100%;
  width: 30rem;
  margin-right: -250px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.card-stack::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.card-stack {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
