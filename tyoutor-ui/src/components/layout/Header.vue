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
        <li v-if="isTutor">
          <router-link :to="{ name: 'requests' }">Requests</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'about' }">About Tyoutor</router-link>
        </li>
        <li>
          <a
            class="btn btn-outline-secondary"
            @click="clearStorage"
            href="/accounts/logout/"
          >
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
  props: {
    isTutor: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clearStorage() {
      localStorage.removeItem("areas");
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 4rem;
  background-image: linear-gradient(34deg, #06b9fe, #66c8ee 49%, #d3d9db 60%);
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 a {
  width: 120px;
  height: 35px;
  background-image: linear-gradient(#4e3aa863 3%, #ffffff00 30%, #e5878687 97%),
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAABZCAYAAAB8ILVtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAQfSURBVHhe7dxBbtNAGIZhp4UKISFVFZygZ2DBUVizZg1XYM0ZuAJXYMEZeoKiCgmBEGkJ+RsPnUw847FjJ/Y371NFcWrPjBN//TNJnC5WaxUg6KS+BuQcvXKfPP5YLx3Gn/N31aPrX/UtKDtq5T50sM3Z9w/V7Yun9S0oY1oCWUedlsQqd2zqMPb20DKZcLcH7mq9/ed6eVtOWLuNNQ1z3OcpmdC05GV9DQxjQuH+Wl9j46q+3lisf9ANLygnKpyCrdY/6IZwT9J21UY/M/r4fb8XlHPS9C4PLyi7o3JPiIW6Kdjop7jK7cITa5O73qTG7TqO329KaswmTf1aH07Y1++7qnpyWt/472bdz6d6uXkfwnG67ucYqNyZ7ODlBvD4LIzx/bVTENzFTkXwT0cIg73p5yHYodg4UzjNgXBn8A+eVaS/y7f3y0MeQOvTXZq4cXOqYVMYXfuwfz/kjgtsU2h9beuPrahpiTsYse2b1qfa+Ac3t42JtXP89U6sr1DYNmcfnC7bOqvqebU8f3P/B2LLi+pb9r6OjcqdkDqoJlZlS2BBthCvlq/vg2yPhS3nPrscAuGO8IM9ViUatt/NPNuX6n/fP0yr1lMJcQzhHlhbtR/PRX3d3xReBA6JcEvoVrUd9WlVMeF2Bz920P31VsGcYacOY1X2/au2Iio3ZBHuwilPTYoI96GmJP6UY+jpDLqjckMW4T4gKvthEW7Ikg9321tvbetThpqrYxzFVO62wBFIPUxLJPT/zuU+z1xTV3S4h5qS5FT8cUN0ufN+dZ/zRNSevajcPXQNdshvZ33ZpWsQ+7bzufuhakbhvqxe1UtDiB3YMT6xGyJEfiUea9/VXnPMqnJ/qa/3lRu2pqf2Iaud6yv3GcD2xx+/rV1qahLej+X5+3pJx0zCvXtKpy91EF01S23TRxgsv2r6Y4VhNG37klOBY8EO29pYofCxtL5Or3/Wt7bFHvehH88xzOI7lKlgO6kq5trbNu5gh8th29SYsbFy2jRts9vfzfpyEe0vNv6D7X/FENPWT+r+OO37cjyTDXfOAxvT9ID7/bn17nepAxTuR87BbGvTtC+74gHP2YeNeMhjfdyuL2cNY6a4LwmH/f24q6pnO/8D5XBm9O334eWEG/NV7FuBBFsf73NDFuGGrCLDzZSkDFRuyCou3FTtclC5IauocFO1yyIZbguxXfxzH1ywUY4iKrcfbKp2OWQ/fg8rtYXaEOxyFH1uCbTxbglkEW7IItyQRbghi3BDFuGGLMINWYQbsgg3ZBFuyCLckEW4IYtwQxbhhizCDVmEG7IIN2QRbsgi3JBFuCGLcEMW4YYswg1ZhBuyCDdkEW7IItyQRbghi3BDFuGGLMINWYQbsgg3ZBFuyCLckEW4IYtwQxbhhqiq+geVJSXTRlJ5bAAAAABJRU5ErkJggg==) !important;
  background-size: cover;
  border-radius: 5px;
  border-width: 0px;
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

a:not(.home):hover {
  border: 1px solid #f391e3;
}

.home {
  box-shadow: 2px 3px 5px 0px #4e3aa8;
}

.home:active {
  box-shadow: 1px 1px 1px 0px #4e3aa8;
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
