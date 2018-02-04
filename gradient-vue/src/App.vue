<template>
  <div id="app">
    <gradient-box @colorValues="saveColor"/>
    <gradient-preview :previewStyle="preview"/>

    <angle-dial @degrees="updateAngle"/>

    <div class="tiles">
    <label for="useTiles">Use tiles</label>
    <input 
      id="useTiles" 
      type="checkbox" 
      :value="isTiled" 
      @click="toggle"
    />

    <div class="options" v-if="isTiled">
      <label for="width">Width</label>
      <input id="width" type="number" v-model="tileWidth"/>

      <label for="height">Height</label>
      <input id="height" type="number" v-model="tileHeight"/>
      <button @click="setPreviewGradient">Set tile</button>
    </div>
  </div>
    <div 
      class="preview"
      :style="editorPreview"
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
import AngleDial from '@/components/AngleDial'
import GradientPreview from '@/components/GradientPreview'
// import GradientTile from '@/components/GradientTile'

export default {
  name: 'app',
  components: {
    'gradient-box': GradientBox,
    'angle-dial': AngleDial,
    'gradient-preview': GradientPreview,
    // 'gradient-tile': GradientTile,
  },
  data () {
    return {
      colorValues: {
        hsl: [0,0,0]
      },
      selectedColor: '',
      preview: {},
      editorPreview: {},
      previewValues: [
        // 'hsl(0,0%,0%)'
      ],
      previewKey: 0,
      activeHandle: 0,
      handles: [],
      gradientAngle: 0,
      previewType: 'background',
      gradientType: 'linear-gradient',
      // tiled: false,
      // sizes: {
      //   width: 100,
      //   height: 100,
      // },
      isTiled: false,
      tileHeight: '100',
      tileWidth: '100',
    }
  },
  methods: {
    saveColor (newColor) {
      this.selectedColor = `hsl(${newColor.hsl.join()})`
      this.handles[this.activeHandle] = `hsl(${newColor.hsl.join()})`
      this.previewValues[this.previewKey] = this.selectedColor
      this.setPreviewGradient()
    },
    makeGradient ({ angle }) {
      if (this.handles.length > 1) {
        const gradient = `${this.gradientType}(${angle ? this.gradientAngle : 90}deg, ${this.handles.join()})`
        return gradient
      } else {
        return this.handles.join('')
      }
    },
    setPreviewGradient () {
      this.preview = {
        [this.previewType]: this.makeGradient({ angle: true }),
        backgroundRepeat: this.isTiled ? 'repeat' : 'no-repeat',
        backgroundSize: this.isTiled ? `${this.tileHeight}px ${this.tileWidth}px` : '',
      }
      this.editorPreview = {
        [this.previewType]: this.makeGradient({ angle: false }),
      }
      console.log('seeting gradient', this.preview)
    },
    clickHandle (i) {
      this.activeHandle = i
      this.setPreviewGradient()
    },
    addHandle (i) {
      this.handles.push(this.selectedColor)
      this.activeHandle = this.handles.length - 1
      this.setPreviewGradient()
    },
    removeHandle () {
      this.handles.splice(this.activeHandle, 1)
      this.setPreviewGradient()
    },
    updateAngle (val) {
      this.gradientAngle = val
      this.setPreviewGradient()
    },
    setTiled (tiled) {
      this.tiled = tiled
      this.setPreviewGradient()
    },
    // setTileSizes (sizes) {
    //   this.sizes = sizes
    //   this.setPreviewGradient()
    // },
    toggle () {
      // toggle tile
      this.isTiled = !this.isTiled
      // this.$emit('tiled', this.isTiled)
    },
    setTileSize () {
      this.setPreviewGradient()
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

.tiles 
  padding: 24px

</style>
