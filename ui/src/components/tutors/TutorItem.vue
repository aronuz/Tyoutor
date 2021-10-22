<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hr</h4>
    <div>
      <ui-badge v-for="area in areas" :key="area" :type="area" :title="area">
      </ui-badge>
    </div>
    <div class="actions">
      <ui-button mode="outline" link :to="tutorContactLink">Contact</ui-button>
      <ui-button link :to="tutorDetailsLink">View Details</ui-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas"],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    tutorContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // /tutors/c1/contact
    },
    tutorDetailsLink() {
      return `${this.$route.path}/${this.id}`; // /tutors/c1
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
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