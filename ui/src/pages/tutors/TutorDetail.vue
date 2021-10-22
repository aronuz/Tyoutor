<template>
  <section>
    <ui-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hr</h3>
    </ui-card>
  </section>
  <section>
    <ui-card>
      <header>
        <h2>Send a message</h2>
        <ui-button link :to="contactLink">Contact</ui-button>
      </header>
      <router-view></router-view>
    </ui-card>
  </section>
  <section>
    <ui-card>
      <ui-badge v-for="area in areas" :key="area" :type="area" :title="area">
      </ui-badge>
      <p>{{ description }}</p>
    </ui-card>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedTutor: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedTutor.firstName} ${this.selectedTutor.lastName}`;
    },
    areas() {
      return this.selectedTutor.areas;
    },
    rate() {
      return this.selectedTutor.hourlyRate;
    },
    description() {
      return this.selectedTutor.description;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
  },
  created() {
    this.selectedTutor = this.$store.getters["tutors/tutors"].find(
      (tutor) => tutor.id === this.id
    );
  },
};
</script>