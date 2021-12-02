<template>
  <div>
    <ui-dialog :show="!!error" title="Error" @close="closeDialogue">
      <p>{{ error }}</p>
    </ui-dialog>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <div class="home-page">
      <div class="child_1">
        <section class="main-list">
          <ui-card class="request-card">
            <header>
              <h2>Incoming messages</h2>
            </header>
            <div class="controls">
              <ui-button mode="outline" @click="loadRequests(true)">
                Refresh
              </ui-button>
            </div>
            <ul v-if="hasRequests">
              <request-item
                v-for="req in receivedRequests"
                :key="req.id"
                :email="req.userEmail"
                :message="req.message"
              >
              </request-item>
            </ul>
            <h3 v-else>There are no new messages.</h3>
          </ui-card>
        </section>
      </div>
    </div>
  </div>
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

.main-list {
  overflow-y: scroll;
  height: 92.5vh;
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
.request-card {
  margin-top: 4rem !important;
  height: 100%;
}

header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
