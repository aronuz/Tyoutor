<template>
  <div>
    <ui-dialog :show="!!error" title="Error" @close="closeDialogue">
      <p>{{ error }}</p>
    </ui-dialog>
    <div v-if="isLoading">
      <ui-spinner></ui-spinner>
    </div>
    <form id="request-form" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please check your email address and message.
      </p>
      <div class="actions">
        <ui-button>Send</ui-button>
      </div>
    </form>
  </div>
</template>

<script>
const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = emailRegEx.test(this.email) && this.message.length > 0;
      if (!this.formIsValid) return;
      this.isLoading = true;
      try {
        const tutorId = this.$route.params.id;
        await this.$store.dispatch("requests/contactTutor", {
          email: this.email,
          message: this.message,
          tutorId,
        });
        this.$router.replace("/tutors");
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },
    closeDialogue() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  position: absolute;
  z-index: 20;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  background-image: linear-gradient(
    180deg,
    rgb(17 164 221),
    #52bff5 60%,
    rgb(17 164 221) 90%
  );
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
