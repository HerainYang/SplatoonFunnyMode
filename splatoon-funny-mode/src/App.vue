<template>
  <router-view class="root"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.root{
    max-width: 1124px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 5rem;
    padding-top: 5rem
}
</style>
