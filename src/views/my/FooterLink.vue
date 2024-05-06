<script setup>
import {ref} from "vue";

const linkList = ref(
  new Array(3).fill(
    new Array(3).fill(
      {
        name: 'link-name',
        url: 'http://www.baidu.com'
      }
    )
  )
)
</script>

<template>
  <div class="footer-link">
    <div class="about-wrapper">
      <ul v-for="list in linkList" class="link-wrapper">
        <li class="link-item" v-for="link in list">
          <a class="link-a" :href="link.url" target="_blank">{{link.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.footer-link {
  box-sizing: border-box;
  padding: 20px 20px 60px;
}
.about-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.link-wrapper {
  list-style: none;
  padding: 0;
}
.link-item {
  margin-bottom: 30px;
  cursor: pointer;
}
.link-item:last-child {
  margin-bottom: 0;
}
.link-a {
  color: white;
}
.link-a:hover {
  color: #4293fd;
}
</style>