<script>
import { onBeforeMount, onBeforeUnmount } from 'vue'

export default {
  data() {
    name: 'Hooks'
  },
  methods: {
    mounted: () => {
      console.log('Mounted')
    },
    onBeforeMount() {
      console.log('Before Mount')
    },
    onBeforeUnmount() {
      console.log('Before unmount')
    }
  }
}
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <div class="box"></div>
  </div>
</template>

<style scoped>
.box {
  width: 200px;
  height: 300px;
  background-color: aqua;
  border: 3px solid tomato;
}
</style>
