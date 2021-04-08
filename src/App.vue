<template>
  <div id="app">
    <nav-bar />
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar';
export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>
<style lang="scss">
@import './style/index.scss';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
  
}
</style>
