<script setup>
import ClassCard from "@/views/class/classCard.vue";
import {ref} from "vue";

const classData = ref({
  classId: 1,
  className: "gggcskanckanvkalnvknac;asm",
  description: "lllfdlkvnvajbvlavklavklavklakvlnaklvlnaksvnlkanviksdvlisnvslllfdlkvnvajbvlavklavklavklakvlnaklvlnaksvnlkanviksdvlisnvslllfdlkvnvajbvlavklavklavklakvlnaklvlnaksvnlkanviksdvlisnvsl",
  classPicture: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
})
</script>

<template>
  <div class="class-wrapper">
    <class-card :class-data="classData"></class-card>
  </div>
</template>

<style scoped>
.class-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 150px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}
</style>