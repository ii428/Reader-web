<template>
  <div class="home-container">
      <h1 class="title">ReadBook</h1>
      <div class="input-wrap">
        <label class="label-text">Select file</label>
        <input type="file" @change="selectFile($event)">
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        selectFile(e) {
            const book = e.target.files[0]; 
            // console.log(book);
            this.$emit('select-book', book);
        }
    }
}
</script>

<style scoped>
    .home-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }
    .title {
        padding: var(--split-size);
    }
    .input-wrap {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4.8rem;
        height: 1rem;
        border-radius: calc(4.8rem / 2);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, .15);
        background-color: var(--main-color);
        transition: filter .3s;
    }
    .input-wrap:hover {
        filter: brightness(80%);
    }
    .label-text {
        font-size: .6rem;
        color: #fff;
    }
    input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
</style>