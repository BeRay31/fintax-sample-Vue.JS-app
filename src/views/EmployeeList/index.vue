<template>
  <div class="employee-list">
    <div class="card">
      <header>
        <h2>List of Employees</h2>
        <MDInput type="number" v-model="showedLength" min="1" max="12">Row Count</MDInput>
      </header>
      <table>
        <tr>
          <th class="clickable">
            <div class="sortable">
              <div
                class="name"
                @click="setSort(sortType === 'id asc' ? 'id desc' : 'id asc')"
              >ID</div>
              <div class="sorting-indicator">
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'id asc' ? 'active' : '']"
                  @click="setSort('id asc')"
                >
                  <polygon points="0,50 100,50 50,0" />Sorry, your browser does not support inline SVG.
                </svg>
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'id desc' ? 'active' : '']"
                  @click="setSort('id desc')"
                >
                  <polygon points="0,0 100,0 50,50" />Sorry, your browser does not support inline SVG.
                </svg>
              </div>
            </div>
          </th>
          <th class="clickable">
            <div class="sortable">
              <div
                class="name"
                @click="setSort(sortType === 'email asc' ? 'email desc' : 'email asc')"
              >Email</div>
              <div class="sorting-indicator">
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'email asc' ? 'active' : '']"
                  @click="setSort('email asc')"
                >
                  <polygon points="0,50 100,50 50,0" />Sorry, your browser does not support inline SVG.
                </svg>
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'email desc' ? 'active' : '']"
                  @click="setSort('email desc')"
                >
                  <polygon points="0,0 100,0 50,50" />Sorry, your browser does not support inline SVG.
                </svg>
              </div>
            </div>
          </th>
          <th class="clickable">
            <div class="sortable">
              <div
                class="name"
                @click="setSort(sortType === 'first_name asc' ? 'first_name desc' : 'first_name asc')"
              >First Name</div>
              <div class="sorting-indicator">
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'first_name asc' ? 'active' : '']"
                  @click="setSort('first_name asc')"
                >
                  <polygon points="0,50 100,50 50,0" />Sorry, your browser does not support inline SVG.
                </svg>
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'first_name desc' ? 'active' : '']"
                  @click="setSort('first_name desc')"
                >
                  <polygon points="0,0 100,0 50,50" />Sorry, your browser does not support inline SVG.
                </svg>
              </div>
            </div>
          </th>
          <th class="clickable">
            <div class="sortable">
              <div
                class="name"
                @click="setSort(sortType === 'last_name asc' ? 'last_name desc' : 'last_name asc')"
              >Last Name</div>
              <div class="sorting-indicator">
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'last_name asc' ? 'active' : '']"
                  @click="setSort('last_name asc')"
                >
                  <polygon points="0,50 100,50 50,0" />Sorry, your browser does not support inline SVG.
                </svg>
                <svg
                  viewBox="0 0 100 50"
                  :class="[sortType === 'last_name desc' ? 'active' : '']"
                  @click="setSort('last_name desc')"
                >
                  <polygon points="0,0 100,0 50,50" />Sorry, your browser does not support inline SVG.
                </svg>
              </div>
            </div>
          </th>
          <th>Profil</th>
        </tr>
        <tr v-for="en in showedCollections" :key="en.id" @click="redirectToProfile(en.id)">
          <td>{{ en.id }}</td>
          <td>{{ en.email }}</td>
          <td>{{ en.first_name }}</td>
          <td>{{ en.last_name }}</td>
          <td class="avatar">
            <img :src="en.avatar" alt="@/assets/logo.png">
          </td>
        </tr>
      </table>
      <pagination 
        :current-page="page"
        :total-page="totalPage"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import MDInput from '@/components/MDinput';
import Pagination from '@/components/Pagination/index.vue';
import Users from '@/api/user';

export default {
  name: 'EmployeeList',
  components: {
    Pagination,
    MDInput
  },
  data() {
    return {
      collections: [],
      page: 1,
      showedLength: 5,
      sortType: ''
    }
  },
  computed: {
    totalPage() {
      if (this.collections && this.collections.length) {
        return Math.ceil(this.collections.length/this.showedLength);
      } else {
        return null;
      }
    },
    sortedCollections() {
      if(!!this.sortType) {
        return this.collections.sort(this.sortFunct(this.sortType));
      } else {
        return this.collections;
      }
    },
    showedCollections() {
      if (this.sortedCollections && this.sortedCollections.length > 0 && this.page) {
        let firstIndex = (this.page - 1) * this.showedLength;
        let lastIndex = firstIndex + this.showedLength;
        if (lastIndex > this.sortedCollections.length) {
          lastIndex = this.sortedCollections.length
        }
        return this.sortedCollections.slice(firstIndex, lastIndex);
      }
    }
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      const resp = await Users.getUsers();
      this.collections = resp.data.data;
    }, 
    handlePageChange(index) {
      this.page = index;
    },
    setSort(sortType) {
      if (this.sortType.includes(sortType)) {
        this.sortType = '';
      } else {
        this.sortType = sortType;
      }
    },
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
    },
    redirectToProfile(id) {
      this.$router.push({ name: 'EmployeeProfile', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>