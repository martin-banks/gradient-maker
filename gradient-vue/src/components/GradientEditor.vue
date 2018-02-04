<template>
  <div 
      class="editor"
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
</template>


<script>
  export default {
    name: 'GradientEditor',
    props: [],
    data () {
      return {
        name: 'GradientEditor',
        handles: [],
        preview: {},
        editorPreview: {},

      }
    },
    methods: {
      clickHandle (i) {
        this.activeHandle = i
        this.setPreviewGradient()
        this.$emit('activeHandle', i)
      },
    }
  }
</script>


<style scoped lang="sass">

.editor
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
