<template>
  <div 
    class="dial"
    :style="angle"
    @mousedown="startDial"
    @mousemove="turnDial"
    @mouseup="stopDial"
  >
    <div class="circle" />
    <div 
      class="marker"
    />
    <div class="center" />
  </div>
</template>

<script>
  export default {
    name: 'AngleDial',
    data () {
      return {
        angle: { transform: 'rotate(0deg)' },
        turning: false,
        crosshair: { top: 0, left: 0 },
        dial: {},
        origin: {},
      }
    },
    methods: {
      startDial () {
        this.turning = true
        this.dial = {
          x: this.$el.offsetLeft,
          y: this.$el.offsetTop,
        }
        this.origin = {
          x: this.$el.getBoundingClientRect().width / 2,
          y: this.$el.getBoundingClientRect().height / 2
        }
      },
      turnDial (e) {
        if (!this.turning) return
        const mouse = {
          x: e.x - this.dial.x,// - dial.x,
          y: e.y - this.dial.y + window.scrollY,// - dial.y,
        }
        const delta = {
          x: mouse.x - this.origin.x,
          y: mouse.y - this.origin.y,
        }
        this.crosshair = {
          left: delta.x,
          top: delta.y,
        }
        const degrees = 90 + (this.calcAngle({ deltaX: delta.x, deltaY: delta.y}))
        this.angle = { transform: `rotate(${degrees}deg)`}
        this.$emit('degrees', degrees)
      },
      stopDial () {
        this.turning = false
      },
      calcAngle ({ deltaX, deltaY}) {
        // const e = this.$el
        // var deltaX = x2 - x1;
        // var deltaY = y2 - y1;
        var radians = Math.atan2(deltaY, deltaX); // In radians
        // Then you can convert it to degrees as easy as:
        var degrees = radians * (180 / Math.PI)
        return degrees
      }
    }
  }
</script>

<style scoped lang="sass">
.dial
  position: relative
  width: 200px
  height: 200px
  // border-radius: 100%
  border: solid 1px lightgrey

.marker
  position: absolute
  top: 0
  left: 50%
  transform: translate(-50%, 0)
  width: 20px
  height: 20px
  border-radius: 100%
  background: orange
  z-index: -1

.center
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 5px
  height: 5px
  background: black
  border-radius: 100%

.circle
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  border: solid 1px grey
  border-radius: 100%


</style>
