<script>
export default{
    name:'ChildCom',
    ChildName:'ChildName',
    props:{
        user:Object
    },
    data:()=>({
        note:'This is note in Child'
    }),
    methods:{
        callMethod(){
            console.log('In child method');
            this.$emit('childMethod',this.note)
        }
    }
    
}
</script>

<template>
    <h2>This is child component </h2> 
    <h3>Parent data from props:{{ this.$props.user }}</h3>
    <button @click="callMethod">Child called</button>
    
</template>


