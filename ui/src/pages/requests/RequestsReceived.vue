<template>
  <ui-dialog :show="!!error" title="Error" @close="handleError">
    <p>{{ error }}</p>
  </ui-dialog>
  <section>
    <ui-card>
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
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests(refresh = false) {
      try {
        await this.$store.dispatch("requests/fetchRequests", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message;
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
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