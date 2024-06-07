<template >
    <h1 v-on:mousemove="getConsole('mouse moved')">Home Component</h1>
    <h1>Email : {{ email }}</h1>
    <h1>Mobile : {{ mobile = 9999 }}</h1>

    <h1>Name: {{ getName('Pramod Thete') }}</h1>
    <h2></h2>

    <button v-on:click="getAlert('Alert Message')">Click Me</button>
    <button v-on:dblclick="getAlert('Alert Message')">Double Click Me</button>
    <button v-on:click="getData()">Count</button>
    <input type="number" v-model="count"/>
    <h2>{{ count }}</h2>
    <br><br>
    <input type="email" name="email" id="email" placeholder="Enter Email" v-model="email">
    <br>
    <input type="password" name="password" id="pass" placeholder="Enter Password" v-model="password">
    <br>
    <button v-on:click="getValues()">Get Values</button>
</template>

<script>
    export default {
        name:'HomeVue',
        data(){
            return {
                email:null,
                password:null,
                count:0
            }
        },
        methods:{
            getName(name){
                return name;
            },
            getData(){
                this.count++;
            },
            getAlert(name){
                alert(name)
            },
            getConsole(data){
                console.warn(data);
            },
            getValues(){
                console.log('Email: ', this.email,'Password: ', this.password)
            }
        }
    }
</script>

<style scoped>
h1{
    color:orange;
}
</style>