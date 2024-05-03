<template>
  <div class="nav" ref="navRef">
    <div class="nav-box" ref="navBox" :style="{
      '--itemWidth': `${itemWidth}px`,
      '--itemLeft': `${itemLeft}px`
      }">
      <div
        class="nav-item"
        ref="navItem"
        v-for="(item,index) in sliderData"
        @click="changeActive(index, item)"
        :class="{'selected-item': index === preIndex || index === preIndex - 1}"
      >{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    height:{
      type:[Number, String],
      default:35
    },
    sliderData:{
      type:Array,
      default:[]
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      itemWidth: 0,
      itemLeft: 0,
      preIndex: null
    }
  },
  mounted() {
    this.$refs.navBox.style.height = this.height + 'px';
    this.$refs.navBox.style.lineHeight = this.height + 'px';
  },
  methods: {
    changeActive(index,item){
      if(this.preIndex === index || this.disabled){
        return;
      }
      if(this.preIndex !== null){
        this.$refs.navItem[this.preIndex].style.color = '#7a7a7c';
        this.$refs.navItem[this.preIndex].style.fontSize = '16px';
      }
      this.$refs.navItem[index].style.color = '#000';
      this.$refs.navItem[index].style.fontSize = '17px';
      const navItemClient = this.$refs.navItem[index].getBoundingClientRect()
      const navBoxClient = this.$refs.navBox.getBoundingClientRect()
      this.itemLeft = navItemClient.x - navBoxClient.x;
      this.preIndex = index;
      console.log(navItemClient, navBoxClient)
      // if(navItemClient.right > navBoxClient.right) {
        this.$refs.navRef.scrollTo({
          left: navItemClient.width * (this.preIndex - 1),
          behavior: 'smooth'
        })
      // }
      this.$emit('selectSlider', index ,item);
    },
  },
  watch: {
    //在组件mounted之后，数据加载到来时，更新UI
    sliderData:{
      immediate: true,
      handler(newVal, oldVal){
        if(newVal.length > 0){
          this.$nextTick(() => {
            this.itemWidth = this.$refs.navItem[0].clientWidth;
            const resizeObserver = new ResizeObserver(() => {
              this.$refs.navItem[0]&&(this.itemWidth = this.$refs.navItem[0].clientWidth);
            })
            resizeObserver.observe(document.body);
            this.changeActive(0, this.sliderData[0])
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.nav{
  width: 100%;
  border-radius: 8px;
  background: #EaEaEb;
  box-sizing: border-box;
  padding: 3px;
  overflow-x: scroll;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
}
.nav::-webkit-scrollbar{
  display: none;
}
.nav-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: 0.4s;
}
.nav-box::before{
  content: '';
  position: absolute;
  height: 100%;
  background: #fff;
  border-radius: 6px;
  transition:all 0.4s;
  width: var(--itemWidth);
  left: var(--itemLeft);
}
.nav-item{
  height: 100%;
  flex: 1;
  text-align: center;
  color: #7a7a7c;
  min-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  transition: 0.4s;
  transition-delay: 0.2s;
  cursor: pointer;
    border-right: 1px solid var(--el-border-color-darker);
}
.nav-item:last-child{
  border: none;
}
.selected-item {
  border-color: transparent;
}
</style>