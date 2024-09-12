<template>
  <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="changeLanguage">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <router-view class="root" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      value: 'ch',
      options: [
        {
          value: 'ch',
          label: '中文'
        },
        {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.value
    }
  },
}
</script>

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

.root {
  max-width: 1124px;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 5rem;
  padding-top: 5rem
}
</style>
