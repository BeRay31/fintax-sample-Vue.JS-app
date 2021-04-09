<template>
  <div class="employee-profile">
    <div class="card profile" v-if="userData">
      <div class="profile-container">
        <div class="profile__left">
          <div class="avatar-container card" :class="[$route.query.best ? 'best' : '']">
            <img :src="userData.avatar" alt="">
          </div>
          <div class="name">{{ `${userData.first_name} ${userData.last_name}` }}</div>
        </div>
        <div class="profile__right">
          <MDInput :value="userData.email" disabled>Email</MDInput>
          <MDInput :value="dummy.role" disabled>Role</MDInput>
          <MDInput :value="dummy.joined" disabled>Joined Date</MDInput>
          <MDInput :value="dummy.salary" disabled>Salary</MDInput>
          <MDInput :value="dummy.department" disabled>Department</MDInput>
          <MDInput :value="dummy.supervisor" disabled>Supervisor</MDInput>
          <MDInput :value="dummy.birthday" disabled>Joined Date</MDInput>
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
import MDInput from '@/components/MDinput';

export default {
  name: 'EmployeeProfile',
  components: {
    MDInput
  },
  data() {
    return {
      userData: null,
      userId: this.$route.params.id,
      dummy: {
        role: 'Manager',
        joined: '10 May 2016',
        salary: 50000000,
        department: 'IT Department',
        supervisor: 'John Doe',
        birthday: '10 June'

      }
    }
  },
  async mounted() {
    await this.getUserData();
  },
  methods: {
    async getUserData() {
      const respUser = await Users.getById(this.userId);
      this.userData = respUser.data.data
    },
    redirectToEmployeeList() {
      this.$router.push({ name: 'EmployeeList' })
    },
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>