
<script>
import ParentCom from './components/ParentCom.vue'
import ChildCom from './components/ChildCom.vue'

export default {
  name: 'App',
  components: {
    ParentCom,
    ChildCom
  }
}
</script>

<template>
  <ParentCom/>
  <ChildCom/>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
