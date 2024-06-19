
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
            },
            data:''
        }
    },
    methods:{
        childMethod(note){
            this.data=note
            console.log("\nchild method note======>",note);
        }
    }
}
</script>

<template>
    <h2>Parent Component {{this.data  }}</h2>
    <ChildCom @childMethod="childMethod" :user="user"/>
</template>

