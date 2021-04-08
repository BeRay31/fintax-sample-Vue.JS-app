<template>
  <div id="app">
    <div v-if="isNotWhitelistRoute" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    isNotWhitelistRoute() {
      const whiteListed = ['Login']
      return !whiteListed.includes(this.$route.name)
    }
  }
}
</script>
<style lang="scss">
@import './style/index.scss';

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
