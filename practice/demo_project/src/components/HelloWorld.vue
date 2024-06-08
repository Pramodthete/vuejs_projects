<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ParentCom/>
  </div>
</template>

<script>
import ParentCom from "./ParentCom.vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    ParentCom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color:red;
}
</style>
