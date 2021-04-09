# Fintax Interview Task
This repository is dedicated for interview project from Fintax

# How To Run
1. Make sure you have node installed on your computer in order to use npm
2. Open Terminal in project directory
3. type `npm install` to install all project dependencies
4. type `npm run serve`
5. Wait the project ready to open on your local browser
6. Open the project (Click link on the terminal)
7. Enjoy :)

## Project Goal
1. Class and Style Bindings
2. Do routing using path variable, query, and navigation guard
3. Create Nested Component
4. Create Child and parent component communication
5. Do Event Handling by create simple math calculator ( 2 inputs, 1 operational)
6. Create Table with filter asc, desc, total record (3,5,10,all)
7. Test API using https://reqres.in/ , http://dummy.restapiexample.com/
8. Use browser storage (cookie/ local/ session)

### App Flow and Goal Related Explanation
1. First of all you need to log in, fill the login form with this user
`usernname: eve.holt@reqres.in`
`password: cityslicka`
**THIS IS THE ONLY ONE VALID ACCOUNT MAKE SURE ITS THE SAME :-> PROVIDED BY reqres.in**
![image](https://user-images.githubusercontent.com/53457819/114139973-e0490700-9939-11eb-9dbf-d256fd03079f.png)
`EXPLANATION ABOUT THE CODE`
```
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
```
That is the HTML of Login Page

This page Accomplish:

* **GOAL 1 : Class Binding**   `I Don't use the style binding cuz its ugly and not the best practice. (Avoiding inline styling)`
    
* **GOAL 4: Parent Child Communication && GOAL 3: Nested Component**  `In login page I used my custom component called MDInput, basically its a beutiful custom input based on Material Design` - Basically the page itself is a component then it used `MDInput` component the conclusion is the MDInput is the child of the login page (nesting)
  ```
  <input
    v-if="type === 'text'"
    v-model="currentValue"
    :name="name"
    :placeholder="fillPlaceHolder"
    :readonly="readonly"
    :disabled="disabled"
    :autocomplete="autoComplete"
    :minlength="minlength"
    :maxlength="maxlength"
    :required="required"
    type="text"
    class="material-input"
    @focus="handleMdFocus"
    @blur="handleMdBlur"
    @input="handleModelInput"
  >
  ```
  This is the part of the code, its implemented custom `v-model`, bind the value and emit the value to parent
  ```
  handleModelInput(event) {
    const value = event.target.value;
    this.$emit("input", value);
    this.$emit("change", value);
  }
  ```
  This is representing Parent and child communication where the parent sent props to child and child emit changes

* ** GOAL 5: Event Handling** `The event handling implemented when i built custom directive v-model where it should emit to parent and parent handle the event` PS: I dont implement the calculator cuz i dont know where should it to be implemented, cuz it will break the context off the app, sounds like `built-in` calculator but don't have any purposes and functionality based on the app context

* **GOAL 7: Using Test API** `I used reqres.in`
  First of all I created my own custom axios(im using axios)
  ```
  import axios from "axios";
  const service = axios.create({
    baseURL: 'https://reqres.in/',
    timeout: 5000 // request timeout
  });
  service.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log("error");
      console.log({...error}); // for debug
      return Promise.reject(error);
    }
  );
  export default service;
  ```
  and then i use this to define API's
  for example in `@/api/user.js`
  ```
  import service from '@/util/reqResService.js';
  export default class User {
    static baseGroupURL = `api`;

    static async getUsers() {
      const resp = await service.get(`${this.baseGroupURL}/users?per_page=12`);
      return resp;
    }

    static async getById(id) {
      const resp = await service.get(`${this.baseGroupURL}/users/${id}`);
      return resp;
    }
  }
  ```
  
* **GOAL 8 : Using Local Storage**  `I'm using local storage to store token responses from 'reqres.in'`
```
async login() {
  if(!this.fetchLoading && this.isFormValid) {
    this.fetchLoading = true;
    try {
      const resp = await Authorization.loginSuccess(this.formData);
      console.log(resp)
      localStorage.setItem('fintax-token', resp.data.token)
    } catch(e) {
      alert(e);
    }
    this.fetchLoading = false;
  }
}
```
* ** GOAL 2 : Router Guards** `Using ./permission.js`

```
router.beforeEach(async(to, from, next) => {
  // check user token
  const hasToken = getToken();
  const whiteList = ['Login']
  if(!!hasToken || whiteList.includes(to.name)) {
    if(whiteList.includes(to.name) && !!hasToken) {
      next({name: 'Dashboard'})
    }
    next();
  } else {
    next({name: 'Login'})
  }
})
```
basically the code get the user token from localStorage if there is token then the user authenticated, if there isn't redirect user to login page, so it technically guarded the other routes.

2. After you logged in you will redirected to `Dashboard` page

![image](https://user-images.githubusercontent.com/53457819/114142370-11770680-993d-11eb-8381-5551b2e0540d.png)
in this page you can see the employee of the month (ofc this is dummy and randomized, the data fetched from resreq.in)
there are little button u can click and redirect you to the next page
also the employee card is clickable and redirect you to employee profile
```
<div class="card" v-for="(en, index) in bestEmployee" :key="en.id" @click="redirectToProfile(en.id)">
`...`
<button class="btn btn-primary" @click="redirectToEmployeeList">Go To Employee List</button>
```
below and the methods are
```
redirectToEmployeeList() {
  this.$router.push({ name: 'EmployeeList' })
},
redirectToProfile(id) {
  this.$router.push({ name: 'EmployeeProfile', params: { id }, query: { best: true } })
}
```

3. Employee List Page `This page where the table things implemented`
![image](https://user-images.githubusercontent.com/53457819/114143636-957dbe00-993e-11eb-8c3c-e4d8560bc8a4.png)

This page accomplish :

* **GOAL 6: Filter Table**

as you see the header of the table has some icon (sorting purposes) its clickable and it will decide the context of the sort, sort by what attribute and how the orientation
Im implemented the custom compareFunction
```
sortFunct(sortType) {
  const [atr, orientation] = sortType.split(" ");
  let compareFunction;
  if(atr == "id") {
    if(orientation == "desc") {
      compareFunction = (a, b) => (b[atr] - a[atr]);
    } else {
      compareFunction = (a, b) => (a[atr] - b[atr]);
    }
  } else {
    if(orientation == "desc") {
      compareFunction = (a, b) => ((b[`${atr}`] + '').localeCompare(a[`${atr}`]));
    } else {
      compareFunction = (a, b) => ((a[`${atr}`] + '').localeCompare(b[`${atr}`]));
    }
  }
  return compareFunction;
}
```
Also it has RowCount field, you can play with it to resize the table size per page

* **GOAL 5: Event Handling**

I created new component called `Pagination` basically its just pagination, but it emit an event when the number got clicked
so this accomplish event handling Goals

* **GOAL 4 : Parent Child Comm & GOAL 3 : Nested Component**

The parent (`Employee List` page) give its state `page` to its childern (`Pagination`) component and the childern emit an event that tells its parent that the page changed,
this event called pageChange
```
<pagination 
  :current-page="page"
  :total-page="totalPage"
  @pageChange="handlePageChange"
/>
```

Nested component cuz its nested

app\
--employeeList\
----pagination


4. Employee Profile Page `this page contains the information of the employee`
![image](https://user-images.githubusercontent.com/53457819/114144863-fbb71080-993f-11eb-928d-143eab46e5ce.png)
there are 2 type in this page,\
the one without ?best=true
and the one with ?best=true

This page accomplised:

* **GOAL 2 : Do routing using path variable, query**
the template routes are `/employees/:id?best=true`
so its has both variable and query
