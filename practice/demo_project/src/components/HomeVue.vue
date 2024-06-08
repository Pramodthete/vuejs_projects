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

    <h3>Technology</h3>
    <label for="java">Java</label>
    <input type="checkbox" value="java" v-model="technology" id="java"/>

    <label for="php">PHP</label>
    <input type="checkbox" value="php" v-model="technology" id="php"/>

    <label for="javascript">JavaScript</label>
    <input type="checkbox" value="javascript" v-model="technology" id="javascript"/>

    <label for="python">Python</label>
    <input type="checkbox" value="python" v-model="technology" id="python"/>
    <h4>Selected Technology: {{ technology }}</h4>
    <br><br>

    <h3>Who I am</h3>
    <label for="developer">Developer</label>
    <input type="radio" value="Developer" name="who" v-model="who" id="developer"/>
    <label for="engineer">Engineer</label>
    <input type="radio" value="Engineer" name="who" v-model="who" id="engineer"/>
    <h4>I am {{ who }}</h4>
    <br>
    <br>

    <h1 v-if="show">If Condition</h1>
    <h1 v-else>Else Condition</h1>
    <button v-on:click="show=!show">Toggle</button>
    <br><br>

    <h3>For loop in Vue js</h3>
    <h4 style="color:blue;" >select Upper checkboxes to show technologies in list</h4>
    <ul>
        <li v-for="item in technology" :key="item">
            {{ item }}
        </li>
    </ul>
    <br><br>

    <h3>for loop for iterate user object</h3>
    <ul>
        <li v-for="item in users" :key="item.email">
            My name is {{ item.name }} and email is {{ item.email }}.
        </li>
    </ul>



</template>

<script>
    export default {
        name:'HomeVue',
        data(){
            return {
                email:null,
                password:null,
                count:0,
                technology:[],
                who:null,
                show:true,
                
                users:[{
                    name:'Pramod',
                    email:'prm@gmail.com'
                },
                {
                    name:'vaibhav',
                    email:'v@gmail.com'
                },{
                    name:'Prajwal',
                    email:'prj@gmail.com'
                },
                {
                    name:'Pratik',
                    email:'prt@gmail.com'
                },{
                    name:'Pranav',
                    email:'prn@gmail.com'
                },
                {
                    name:'Suraj',
                    email:'su@gmail.com'
                },{
                    name:'Raj',
                    email:'rj@gmail.com'
                },
                {
                    name:'Mayur',
                    email:'m@gmail.com'
                }]
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