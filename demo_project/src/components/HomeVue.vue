<template >
    <h1 v-on:mousemove="getConsole('mouse moved')">Home Component</h1>
    <h1>Email : {{ email }}</h1>
    <h1>Mobile : {{ mobile = 9999 }}</h1>

    <h1>Name: {{ getName('Pramod Thete') }}</h1>
    <h2></h2>

    <button v-on:click="getAlert('Alert Message')">Click Me</button>
    <button v-on:dblclick="getAlert('Alert Message')">Double Click Me</button>
    <button v-on:click="getData()">Count</button>
    <h2>{{ count }}</h2>
</template>

<script>
    export default {
        name:'HomeVue',
        data(){
            return {count:0}
        },
        methods:{
            getName(name){
                return name;
            },
            getData(){
                this.count+=10;
            },
            getAlert(name){
                alert(name)
            },
            getConsole(data){
                console.warn(data);
            }
        }
    }
</script>

<style scoped>
h1{
    color:orange;
}
</style>