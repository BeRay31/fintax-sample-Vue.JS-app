<template>
  <div class="dashboard">
    <div class="welcome card">
      <div class="welcome__text">
        <h2>Welcome to Ray's Employee Management !!</h2>
        <h3>Your Human Resource Specialist</h3>
        <h4>“I am convinced that nothing we do is more important than hiring and developing people.</h4>
        <h4>At the end of the day, you bet on people, not on strategies.” – Lawrence Bossidy </h4>
      </div>
      <div class="welcome__image">
        <img src="@/assets/main-icon.jpg" alt="">
      </div>
    </div>
    <div class="employee-of-the-month card">
      <h2>Employee Of The Month</h2>
      <div class="employees-layout">
        <div class="card" v-for="(en, index) in bestEmployee" :key="en.id" @click="redirectToProfile(en.id)">
          <div class="avatar-container">
            <div class="rank-container">
              {{ index + 1 }}
            </div>
            <img :src="en.avatar">
          </div>
          
          <div class="desc-container">
            <div class="name">{{ `${en.first_name} ${en.last_name}` }}</div>
            <div class="score">{{ Math.floor(en.r * 1000) + 1 }}</div>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" @click="redirectToEmployeeList">Go To Employee List</button>
      </div>
    </div>
  </div>
</template>

<script>
import Users from '@/api/user';
export default {
  name: 'Dashboard',
  data() {
    return {
      collections: []
    }
  },
  async mounted() {
    await this.getUsers();
  },
  computed: {
    bestEmployee() {
      if(this.collections && this.collections.length> 0) { // select 5 random employee
        return this.collections
          .map(x => ({ x, r: Math.random() }))
          .sort((a, b) => b.r - a.r)
          .map(a => ({...a.x, r: a.r}))
          .slice(0, 6);
      }
    }
  },
  methods: {
    async getUsers() {
      const resp = await Users.getUsers();
      this.collections = resp.data.data;
    },
    redirectToEmployeeList() {
      this.$router.push({ name: 'EmployeeList' })
    },
    redirectToProfile(id) {
      this.$router.push({ name: 'EmployeeProfile', params: { id }, query: { best: true } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>