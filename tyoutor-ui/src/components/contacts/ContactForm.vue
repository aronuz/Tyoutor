<template>
  <ui-dialog :show="!!error" :title="title" @close="closeDialogue">
    <p>{{ error }}</p>
  </ui-dialog>
  <div v-if="isLoading">
    <ui-spinner></ui-spinner>
  </div>
  <div id="contact-form" class="contact-form">
    <div>
      <h1 class="contact-form_title">Message Us</h1>

      <div v-if="isLoading" class="loading">Sending...</div>

      <form class="form" @submit.prevent="onSubmit">
        <label>Your Name</label>
        <input
          required
          name="user_name"
          placeholder="Name"
          type="text"
          autocomplete="off"
        />
        <label>Your Email</label>
        <input
          required
          name="user_email"
          placeholder="E-mail"
          type="email"
          autocomplete="off"
        />
        <label>Message Subject</label>
        <input
          required
          name="subject"
          placeholder="Subject"
          type="text"
          autocomplete="off"
        />
        <label>Your Message</label>
        <textarea name="message" rows="4" placeholder="Message"></textarea>
        <input class="button" type="submit" value="Send" />
      </form>
    </div>
    <button class="message-button" @click="goToContacts">Message Us</button>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "ContactForm",
  props: {},
  data() {
    return {
      isLoading: false,
      error: null,
      title: "",
    };
  },
  mounted() {
    this.emitter.emit("button");
  },
  beforeUnmount() {
    this.emitter.emit("button");
  },
  methods: {
    onSubmit(e) {
      this.isLoading = true;
      emailjs
        .sendForm(
          "default_service",
          "template_bMPpHtUC_clone",
          e.target,
          "user_H4AMEKE0JhXyWM4ihYZ47"
        )
        .then(
          (result) => {
            this.isLoading = false;
            this.title = "Success";
            this.error = `Your message has been sent!\n${result}`;
          },
          (error) => {
            this.isLoading = false;
            this.title = "Error";
            this.error = `Sorry, we could not send your message. Please, try again later. \n${error}`;
          }
        );
    },
    goToContacts() {
      this.$router.push("/contact#message-form");
    },
    closeDialogue() {
      this.error = null;
    },
  },
};
</script>

<style>
.contact-form {
  font-family: "Dancing Script" !important;
  font-size: 1.5em;
  margin: 0 auto;
  background-color: #ffffffa1;
}

.contact-form .form {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

.contact-form_title {
  color: #333;
  text-align: center;
  font-size: 1.55em;
}

.message-button {
  background-color: #247ba0cb;
  border-radius: 50px;
  color: black;
  font-size: 1em;
}

@media (max-width: 959px) {
  .contact-form label {
    width: 100%;
  }
  .contact-form label {
    font-size: 0.8em;
    font-family: "Times New Roman", Times, serif !important;
  }
  .contact-form_title {
    font-size: 1em;
  }
  .contact-form .form {
    max-width: 95vw;
  }
  .message-button {
    width: 50vw;
    margin-left: 5vw;
  }
}
@media (min-width: 960px) and (max-width: 1023px) {
  .contact-form {
    font-family: Dancing Script !important;
    font-size: 2em;
    margin: 0 auto;
    background-color: transparent;
    width: 400px;
  }
  .message-button {
    width: 100%;
    margin-left: 5vw;
    background-color: rgb(36 123 160 / 53%);
    font-weight: 600;
    font-variant: small-caps;
  }
}
@media (min-width: 1024px) {
  .contact-form {
    font-size: 1.5em;
    width: 600px;
  }
  .contact-form_title {
    font-size: 1.55em;
  }
  .contact-form .form {
    max-width: 600px;
  }
  .contact-form label {
    font-weight: 800;
  }
  .message-button {
    width: 400px;
    margin-left: 100px;
  }
}
.contact-form input {
  width: 100%;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea {
  border: solid 1px #201c1c;
  font-family: "Times New Roman", Times, serif !important;
  padding: 5px 5px;
  margin-bottom: 10px;
  outline: none;
}

.contact-form textarea {
  resize: none;
}

.contact-form label {
  color: black;
}
.contact-form .button {
  background: #da552f;
  border: solid 1px #da552f;
  color: white;
  cursor: pointer;
  padding: 10px 50px;
  text-align: center;
  text-transform: uppercase;
}

.contact-form .button:hover {
  background: #ea532a;
  border: solid 1px #ea532a;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
.contact-form .button {
  font-size: 0.9em;
  border-radius: 3px;
}
</style>
