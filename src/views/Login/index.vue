<template>
  <div class="login">
    <div class="image-container desktop">
      <img src="@/assets/main-icon.jpg">
    </div>
    <div class="card-container card">
      <header>
        <div class="title">Welcome to Employee Management App!</div>
        <div class="subtitle">Please log-in to continue</div>
      </header>
      <div class="image-container mobile">
        <img src="@/assets/main-icon.jpg">
      </div>
      <div class="form-container">
        <MDInput type="text" v-model="formData.email" required>Email</MDInput>
        <MDInput type="password" v-model="formData.password" required>Password</MDInput>
      </div>
      <div class="btn-group">
        <button :class="['btn', isFormValid ? 'btn-primary' : 'btn-primary--alt']" @click="login">Log-In</button>
      </div>
    </div>

  </div>
</template>

<script>
// TODO:: SOLVED -> Task Class and Style Binding on login button, 
// parent child comm, 
// Create Nested Component
// Test API using https://reqres.in/
// Use browser storage (cookie/ local/ session) -> save token
import MDInput from '@/components/MDinput';

import Authorization from '@/api/auth.js';
export default {
  name: 'Login',
  components: {
    MDInput
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
        fetchLoading: false
      }
    }
  },
  computed: {
    isFormValid() {
      return this.isEmailValid(this.formData.email) && this.isPasswordValid(this.formData.password)
    }
  },
  methods: {
    isEmailValid(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isPasswordValid(password) {
      return password.length > 5
    },
    async login() {
      if(!this.fetchLoading && this.isFormValid) {
        this.fetchLoading = true;
        try {
          const resp = await Authorization.loginSuccess(this.formData);
          console.log(resp)
          localStorage.setItem('fintax-token', resp.data.token)
          this.$router.push({ name: 'Dashboard' })
        } catch(e) {
          alert(e);
        }
        this.fetchLoading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>