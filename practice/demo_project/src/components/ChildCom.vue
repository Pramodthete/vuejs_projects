<template>
    <h2>This is child component - name:{{ name }}</h2> 
    <h3>Parent data from props=>   {{ user }}</h3>
    <button v-on:click="getDetails">Call parent Function</button>
</template>

<script>
export default{
    name:'ChildCom',
    props:{
        name:String,
        user:Object,
        getDetails:Function
    }
}
</script>
