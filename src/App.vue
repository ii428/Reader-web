<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}

// 取屏幕显示区域宽度的10/1作为根元素字体的大小
document.addEventListener('DOMContentLoaded', () => {
  const ohtml = document.querySelector('html');
  let fontSize = window.innerWidth / 10;

  // 限制fontSize过大
  fontSize = fontSize > 50 ? 50 : fontSize;
  ohtml.style.fontSize = fontSize + 'px';
});

</script>

<style>

</style>
