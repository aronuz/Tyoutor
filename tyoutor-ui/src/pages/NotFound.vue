<template>
  <section>
    <ui-card>
      <h2>404 - Page not found</h2>
      <p>This page could not be found.</p>
      <router-link to="/tutors">To All Tutors</router-link>.
    </ui-card>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    337deg,
    #41c1d0 0%,
    #d5d9db 52%,
    #00b8ff 100%
  );
  background-position: top;
  background-size: cover;
}
</style>
