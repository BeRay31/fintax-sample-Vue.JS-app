<template>
  <div>
    <div v-if="isNotWhitelistRoute" class="nav">
      <div class="nav__left">
        <router-link to="/dashboard" tag="div" class="title">
          <div class="title__text">
            <p>Ray's Employee</p>
            <p>Management</p>
          </div>
          <div class="title__img">
            <img src="@/assets/main-icon.jpg" alt>
          </div>
        </router-link>
      </div>
      <div class="nav__right">
        <router-link to="/dashboard" tag="div" class="link">
          Dashboard
        </router-link>
        <router-link to="/employees" tag="div" class="link">
          List Employee
        </router-link>
      </div>
    </div>
    <div class="hidden-nav"></div>
  </div>
</template>
<script>
export default {
  name: 'navBar',
  computed: {
    isNotWhitelistRoute() {
      const whiteListed = ['Login']
      return !whiteListed.includes(this.$route.name)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>