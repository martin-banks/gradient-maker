<template>
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
      <input id="width" type="number" v-model="tileWidth" @change="sendValues"/>

      <label for="height">Height</label>
      <input id="height" type="number" v-model="tileHeight" @change="sendValues"/>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'GradientTile',
    data () {
      return {
        isTiled: false,
        tileHeight: 0,
        tileWidth: 0,
      }
    },
    methods: {
      toggle () {
        this.isTiled = !this.isTiled
        this.$emit('tiled', this.isTiled)
      },
      // toggleSize ({ metric, value }) {
      //   this[metric] = this
      // },
      sendValues () {
        const sizes = { width: parseInt(this.tileWidth, 10), height: parseInt(this.tileHeight, 10) }
        this.$emit('tileSizes', sizes)
      }
    }
  }
</script>

<style scoped lang="sass">
.tiles 
  padding: 24px

</style>
