<template>
  <header>
    <nav>
      <h1>
        <router-link :to="{ name: 'home' }" class="home"></router-link>
      </h1>
      <ul>
        <li>
          <router-link :to="{ name: 'tutors' }">All Tutors</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'requests' }">Requests</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'about' }">About Tyoutor</router-link>
        </li>
        <li>
          <a class="btn btn-outline-secondary" href="/accounts/logout/">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-image: linear-gradient(34deg, #06b9fe, #66c8ee 49%, #d3d9db 60%);
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 a {
  width: 200px;
  height: 50px;
  background-image: linear-gradient(#50008d4a 10%, #1929764a 30%, #cebd0a61 60%),
    url(../../assets/logo.png) !important;
  background-size: cover;
}

header a {
  background-image: linear-gradient(#0064ff 30%, #005aff 30%, #002d80 60%);
  text-decoration: none;
  color: #77e104;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

header a:not(.home):not(.router-link-active) {
  box-shadow: 2px 2px 2px 0px grey;
}

a:active:not(.home),
a.router-link-active:not(.home) {
  box-shadow: 2px 2px 8px #002d80 inset;
  background-image: linear-gradient(
    to top,
    #0064ff 30%,
    #005aff 30%,
    #002d80 60%
  ) !important;
}

a:hover {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
