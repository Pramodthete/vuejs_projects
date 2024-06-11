<script>
export default {
  data() {
    return {
      name: 'Hooks'
    }
  },
  beforeCreate() {
    console.log('Before Create')
  },
  created() {
    console.log('Created')
  },
  beforeMount() {
    console.log('Before Mount')
  },
  mounted() {
    console.log('Mounted')
  },
  beforeUnmount() {
    console.log('Before Unmount')
  },
  unmounted() {
    console.log('Unmounted')
  },
  beforeUpdate() {
    console.log('Before Update')
  },
  updated() {
    console.log('Updated')
  }
}
</script>

<template>
  <div>
    <h1>Demo vue</h1>
    <div class="box"></div>
    <br />
    <div class="box"></div>
    <a href="/hooks">Hooks with anchor</a><br /><br />
    <router-link id="register-link1" to="/hooks">Hooks with routerlink</router-link>
  </div>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(174, 144, 98);
  border: 3px solid rgb(45, 188, 16);
}
</style>
