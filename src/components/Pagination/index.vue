<template>
  <div v-show="totalPage" class="pagination">
    <div class="arrow arrow--left" @click="goToIndex(currentPage - 1)">
      <img src="@/assets/svg/chevron-right.svg" alt>
      <img src="@/assets/svg/chevron-right.svg" alt>
    </div>
    <ul class="pagination__content">
      <li v-for="(value, i) in pageShown" :key="value">
        <div v-if="isApart(i)" class="buffer">...</div>
        <div
          :class="['pagination__item', currentPage === value ? 'active': '']"
          @click="goToIndex(value)"
        >{{ value }}</div>
      </li>
    </ul>
    <div class="arrow arrow--right" @click="goToIndex(currentPage + 1)">
      <img src="@/assets/svg/chevron-right.svg" alt>
      <img src="@/assets/svg/chevron-right.svg" alt>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pageShown() {
      const ascendingCompare = (firstElement, secondElement) =>
        firstElement - secondElement;

      const shown = [1, this.totalPage];

      if (this.totalPage > 2) {
        // second index and second last index
        shown.push(2);
        shown.push(this.totalPage - 1);

        // current page and surrounding page
        if (
          this.totalPage > 4 &&
          this.currentPage > 1 &&
          this.currentPage < this.totalPage
        ) {
          shown.push(this.currentPage);
          shown.push(this.currentPage - 1);
          shown.push(this.currentPage + 1);
        }
      }

      return this.uniqueArray(shown).sort(ascendingCompare);
    }
  },
  methods: {
    goToIndex(index) {
      if (index >= 1 && index <= this.totalPage) {
        this.$emit('pageChange', index);
      }
    },
    uniqueArray(array) {
      return [...new Set(array)];
    },
    isApart(index) {
      return index && this.pageShown[index] - this.pageShown[index - 1] > 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
