<template>
  <section>
    <ui-card>
      <h2>Registration</h2>
      <tutor-form></tutor-form>
    </ui-card>
  </section>
</template>

<script>
import TutorForm from "@/components/tutors/TutorForm.vue";

export default {
  components: {
    TutorForm,
  },
};
</script>