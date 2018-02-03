<template>
  <div id="app">
    <gradient-box @colorValues="x => colorValues = x"/>
    <div class="colorInfo">
      <p :style="{ background: `hsl(${colorValues.hsl.join()})` }" >
        hsl({{ colorValues.hsl.join() }})
      </p>
      <pre>{{ colorValues }}</pre>
    </div>
    <div class="colors"></div>
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
      }
    }
  },
  methods: {},
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

</style>
