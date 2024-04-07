<template>
  <div class="nav">
    <div class="nav-box" ref="navBox" :style="{
      '--itemWidth': `${itemWidth}px`,
      '--itemLeft': `${itemLeft}px`
      }">
      <div class="nav-item" ref="navItem" v-for="(item,index) in sliderData" @click="changeActive(index, item)">{{ item }}</div>
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
    }
  },
  data() {
    return {
      itemWidth: 0,
      itemLeft: 0,
      preIndex: null
    }
  },
  created() {
    // this.sliderData = JSON.parse(this.$route.params.sliderData);
  },
  mounted() {
    this.$refs.navBox.style.height = this.height + 'px';
    this.$refs.navBox.style.lineHeight = this.height + 'px';
    this.itemWidth = this.$refs.navItem[0].clientWidth;
    const resizeObserver = new ResizeObserver(() => {
      this.itemWidth = this.$refs.navItem[0].clientWidth;
    })
    resizeObserver.observe(document.body);
    this.changeActive(0, this.sliderData[0])
  },
  methods: {
    changeActive(index,item){
      if(this.preIndex !== null){
        this.$refs.navItem[this.preIndex].style.color = '#7a7a7c';
        this.$refs.navItem[this.preIndex].style.fontSize = '16px';
      }
      this.$refs.navItem[index].style.color = '#000';
      this.$refs.navItem[index].style.fontSize = '17px';
      this.itemLeft = this.$refs.navItem[index].getBoundingClientRect().x - this.$refs.navBox.getBoundingClientRect().x;
      this.preIndex = index;
      this.$emit('changeStyleScoreSlider', index ,item);
    },
  },
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
}
</style>