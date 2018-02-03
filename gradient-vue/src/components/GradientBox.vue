
<template>
  <div 
    class="gradient"
    :style="gradient"
    @mouseover="handleMouseOver"
    @mousemove="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <div class="picker" :style="pickerStyle"></div>
  </div>

</template>


<script>
  export default {
    name: 'GradientBox',
    data () {
      return {
        gradient: { 
          backgroundImage: `
            linear-gradient(rgba(0,0,0,1), rgba(255,255,255,0), rgba(255,255,255,1)),
            linear-gradient(90deg, ${[...new Array(360 / 15)]
          .map((inc, i) => `hsl(${i * 15}, 100%, 50%)`)
          .join()})` 
        },
        pickerStyle: {
          opacity: 0,
          transform: 'none'
        }
      }
    },
    methods: {
      handleMouseOut (e) {
        this.pickerStyle = {
          opacity: 0
        }
      },
      handleMouseOver (e) {
        const coords = {
          x: e.x - this.$el.offsetLeft + window.scrollX,
          y: e.y - this.$el.offsetTop + window.scrollY,
        }
        const pct  = {
          x: coords.x / this.$el.getBoundingClientRect().width,
          y: coords.y / this.$el.getBoundingClientRect().height,
        }
        const colors = {
          hsl: [
            Math.floor(pct.x * 360), 
            '100%', 
            `${Math.floor((pct.y * 100))}%`,
          ],
          rgb: `rgb()`,
        }
        const pickerSize = 20
        this.pickerStyle = {
          opacity: 1,
          width: `${pickerSize}px`,
          height: `${pickerSize}px`,
          transform: `translate(${coords.x - (pickerSize / 2)}px, ${coords.y - (pickerSize / 2)}px)`
        }
        this.$emit('colorValues', {
          hsl: [
            Math.floor(pct.x * 360), 
            '100%', 
            `${Math.floor(Math.min((pct.y * 100), 100))}%`,
          ]
        })
      }
    },
  }
</script>


<style scoped lang="sass">

.gradient
  position: relative
  width: 600px
  height: 300px
  border: solid 1px black
  background: hsl(0, 50%, 50%)
  // top: 50%
  // left: 50%
  // transform: translate(-50%, -50%)
  
.picker
  // position: absolute
  width: 20px
  height: 20px
  border: solid 1px white
  box-shadow: 0px 0 4px rgba(0,0,0,1)
  border-radius: 20px
  opacity: 0

</style>
