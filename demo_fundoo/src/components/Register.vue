<script>
export default {
    data: () => ({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        formHasErrors: false
    }),

    computed: {
        form() {
            return {
                firstName: this.firstName,
                lastName: this.lastName,
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
            this.errorMessages = this.eamil && !this.firstName && !this.lastName && !this.password
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
                    alert('Form Submited Successfully');
                }

                resetForm();
            })
        },
    },
}
</script>

<template>
    <h1>Register Page</h1>
    <div class="box">
        <v-form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field label="First Name" variant="outlined" style="width: 500px;" ref="firstName"
                            v-model="firstName" :error-messages="errorMessages"
                            :rules="[() => !!firstName || 'This field is required']" hint="e.g: Pramod"
                            required></v-text-field><br>
                        <v-text-field label="Last Name" variant="outlined" style="width: 500px;" v-model="lastName"
                            :error-messages="errorMessages" :rules="[() => !!lastName || 'This field is required']"
                            hint="e.g: Thete" required></v-text-field><br>
                        <v-text-field label="Email" variant="outlined" style="width: 500px;" v-model="email"
                            :error-messages="errorMessages" :rules="[() => !!email || 'This field is required']"
                            hint="e.g: pthete31@gmail.com" required></v-text-field><br>
                        <v-text-field label="Password" variant="outlined" style="width: 500px;" v-model="password"
                            :error-messages="errorMessages" :rules="[() => !!password || 'This field is required']"
                            hint="e.g: hello@123" required></v-text-field><br>
                        <v-col cols="auto">
                            <v-btn density="default" type="submit" @click="submit">Register</v-btn>
                        </v-col>
                        <router-link to="/login">Go to Login</router-link>
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
    /* background-color: red; */
    /* background-image: linear-gradient(to right, red, orange, green, yellow); */
}
</style>