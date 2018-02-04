<template>
  <div 
    class="preview" 
    :style="previewStyle"
  />

</template>


<script>
  export default {
    name: 'GradientPreview',
    props: ['previewStyle'],
    data () {
      return {
        previewBackground: this.previewStyle
      }
    },
    methods: {}
  }
</script>

<style scoped lang="sass">
.preview
  width: 200px
  height: 200px
</style>
