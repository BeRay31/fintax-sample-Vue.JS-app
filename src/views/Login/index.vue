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
        <button :class="['btn', isFormValid ? 'btn-primary' : 'btn-primary--alt']">Log-In</button>
      </div>
    </div>

  </div>
</template>

<script>
// TODO:: SOLVED -> Task Class and Style Binding on login button, 
// parent child comm, 
// Create Nested Component
// Test API using https://reqres.in/
// Use browser storage (cookie/ local/ session)
import MDInput from '@/components/MDinput';

export default {
  name: 'Login',
  components: {
    MDInput
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
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
    login() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>