<template>
  <div id="app">
    <gradient-box @colorValues="saveColor"/>
    <div class="colorInfo">
      <p :style="{ background: `hsl(${colorValues.hsl.join()})` }" >
        hsl({{ colorValues.hsl.join() }})
      </p>
      <pre>{{ colorValues }}</pre>
    </div>
    <div class="colors"></div>
    <div 
      class="preview"
      :style="preview"
    >
      <span 
        v-if="handles.length"
        v-for="(handle, i) in (handles.length)"
        :key="i"
        :class="{ handle: true, handle__active: i === activeHandle}"
        :style="{ left: `${(i / (handles.length - 1)) * 100}%` }"
        @click="clickHandle(i)"
      >{{ i }}</span>
    </div>
    <button @click="addHandle">Add handle</button>
    <button @click="removeHandle">Remove handle</button>
  </div>
</template>

<script>
import GradientBox from '@/components/GradientBox'

export default {
  name: 'app',
  components: {
    'gradient-box': GradientBox,
  },
  data () {
    return {
      colorValues: {
        hsl: [0,0,0]
      },
      selectedColor: '',
      preview: {},
      previewValues: [
        // 'hsl(0,0%,0%)'
      ],
      previewKey: 0,
      activeHandle: 0,
      handles: [],
      previewType: 'background',
      gradientType: 'linear-gradient'
    }
  },
  methods: {
    saveColor (newColor) {
      this.selectedColor = `hsl(${newColor.hsl.join()})`
      this.handles[this.activeHandle] = `hsl(${newColor.hsl.join()})`
      this.setGradient(this.selectedColor)
    },
    setGradient (val) {
      this.previewValues[this.previewKey] = val
      this.setPreviewGradient()
    },
    makeGradient () {
      if (this.handles.length > 1) {
        const gradient = `${this.gradientType}(90deg, ${this.handles.join()})`
        return gradient
      } else {
        return this.handles.join('')
      }
    },
    setPreviewGradient () {
      this.preview = {
        [this.previewType]: this.makeGradient()
      }
    },
    clickHandle (i) {
      this.activeHandle = i
    },
    addHandle (i) {
      this.handles.push(this.selectedColor)
      this.activeHandle = this.handles.length - 1
    },
    removeHandle () {
      this.handles.splice(this.activeHandle, 1)
      this.preview = {
        [this.previewType]: this.makeGradient()
      }
    }
  },
  created () {
  }
}


</script>

<style scoped lang="sass">
body
  margin: 0
  padding: 0

body *
  font-family: sans-serif

.preview
  position: relative
  height: 100px
  border: solid 1px

.handle
  position: absolute
  width: 20px
  height: 40px
  border: solid 1px
  padding: 10px
  background: rgba(255,255,255, 0.5)
  transform: translateX(-50%)
  text-align: center
  &__active
    background: rgba(0,0,0, 0.8)
    color: white
</style>
