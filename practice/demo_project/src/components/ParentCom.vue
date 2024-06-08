<template>
    <h2>Parent Component</h2>
    <ChildCom name="Pramod" :user="user" :getDetails="getData"/>
</template>

<script>
import ChildCom from './ChildCom.vue'
export default{
    name:'ParentCom',
    components:{
        ChildCom
    },
    data(){
        return{
            user:{
                name:'Pramod',
                email:'p@gmail.com'
            }
        }
    },
    methods:{
        getData(){
            console.log('Parent Function called');
        }
    }
}
</script>