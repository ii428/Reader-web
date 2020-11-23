<template>
  <div class="home-container">
      <!-- 选择文件 -->
      <select-book 
        v-if="!isSelectBook"
        @select-book="selectedBook" />

      <!-- 电子书渲染 -->
      <e-book v-else :book="book" />
  </div>
</template>

<script>
import EBook from '../EBook'
import SelectBook from '../SelectBook'

export default {
    data() {
        return {
            book: null, // 电子书文件
            isSelectBook: false,    //是否有选择电子书
        }
    },
    components: {
        EBook,
        SelectBook,
    },
    methods: {
        selectedBook(data) {
            this.isSelectBook = true;
            this.book = data;
        },

        jumpToSelectBook() {
            this.isSelectBook = false;
        },
    },
}
</script>

<style>

</style>