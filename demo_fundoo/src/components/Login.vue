<script>
export default {
    data: () => ({
        email: null,
        password: null,
        formHasErrors: false
    }),

    computed: {
        form() {
            return {
                email: this.email,
                password: this.password,
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        addressCheck() {
            this.errorMessages = this.eamil && !this.password
                ? `Hey! I'm required`
                : ''

            return true
        },
        resetForm() {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                this.$refs[f].reset()
            })
        },
        submit() {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true
                this.$refs[f].validate(true)

                if (this.formHasErrors == false) {
                    alert('Login Successfully');
                }
                resetForm();
            })
        },
    },
}
</script>

<template>
    <h1>Login Page</h1>
    <div class="box">
        <v-form>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-text-field label="Email" variant="outlined" hint="e.g : demo11@example.com" ref="email"
                            style="width: 460px;" v-model="email" :error-messages="errorMessages"
                            :rules="[() => !!email || 'This field is required']" required></v-text-field><br>
                        <v-text-field style="width: 460px;" label="Password" variant="outlined"
                            :type="show1 ? show1 : 'password'" hint="At least 8 characters" v-model="password"
                            :error-messages="errorMessages" :rules="[() => !!password || 'This field is required']"
                            required></v-text-field>
                        <v-col cols="auto">
                            <v-btn density="default" type="submit" @click="submit">Login</v-btn>
                        </v-col>
                        <router-link to="/register">Go to Register</router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>


<style scoped>
.box {
    padding: 1%;
    border-radius: 15px;
    border: 1px solid rgb(231, 229, 229);
    box-shadow: 0px 5px 5px;
}
</style>