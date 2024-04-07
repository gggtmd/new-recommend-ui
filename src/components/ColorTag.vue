<template>
  <span class="tag" :style="{backgroundColor: colorName}">
    <slot></slot>
  </span>
</template>

<script>
export default{
  props: {
    colorName: {
      type: String,
      default: '#4095E5',
    },
  },
}
</script>

<style scoped>
.tag{
  padding: 2.5px 5px;
  border-radius: 4px;
}
</style>