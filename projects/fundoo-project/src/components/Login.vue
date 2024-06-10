<script>
import { loginData } from '../services/userServices.js'
import SnackBar from './SnackBar.vue'

export default {
  components: { SnackBar },
  data: () => ({
    email: null,
    password: null,
    show1: false,
    snackbar: false,
    snackbarText: '',
    rules: {
      email: [
        (v) => !!v || 'This field is required',
        (v) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) || 'Must be a valid e-mail.'
      ],
      password: [
        (v) => !!v || 'This field is required'
        // (v) =>
        //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
        //   'Must be a valid password'
      ]
    }
  }),

  computed: {
    form() {
      return {
        email: this.email,
        password: this.password
      }
    },
    isFormValid() {
      return (
        this.email &&
        this.password &&
        this.rules.email.every((rule) => rule(this.email) === true) &&
        this.rules.password.every((rule) => rule(this.password) === true)
      )
    }
  },

  methods: {
    resetForm() {
      this.email = null
      this.password = null
    },
    handleLogin() {
      const data = { email: this.email, password: this.password }
      loginData(data)
        .then((data) => {
          this.snackbarText = 'User logged in successfully!'
          this.snackbar = true
          this.resetForm()
          // this.$router.push({ name: 'signup' })
          localStorage.setItem('loginToken', data.data.id)
          console.log('Stored token:', localStorage.getItem('loginToken'))
          console.log('login token------->>>>>>', data.data.id)
          console.log('This is from server: _____>>>>>', data)
          setTimeout(() => {
            this.$router.push({ name: 'resetPassword' })
          }, 2000)
        })
        .catch((error) => {
          this.snackbarText = 'Error logging in. Please try again.'
          this.snackbar = true
          console.log('Error logging in:', error)
          console.log('Error message:', error.message)
          console.log('Error response data:', error.response ? error.response.data : null)
          console.log('Error response status:', error.response ? error.response.status : null)
        })
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    submit() {
      this.validateForm().then((isValid) => {
        if (isValid) {
          this.handleLogin()
        } else {
          this.snackbarText = 'Please correct the errors before submitting.'
          this.snackbar = true
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />

    <div class="outerDiv">
      <div class="innerDiv">
        <img
          id="google-img"
          src="https://logowik.com/content/uploads/images/google-logo-2020.jpg"
          width="120px"
          alt=""
        />
        <h1>Sign in</h1>
        <h2>Use your Google account</h2>
      </div>

      <div class="box">
        <v-form ref="form" @submit.prevent="submit">
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field
                  class="input"
                  label="Email"
                  variant="outlined"
                  hint="e.g : demo11@example.com"
                  ref="email"
                  v-model="email"
                  :rules="rules.email"
                  required
                ></v-text-field>
                <br />
                <v-text-field
                  class="input"
                  label="Password"
                  variant="outlined"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  v-model="password"
                  :rules="rules.password"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-checkbox
                  class="checkBox"
                  v-model="show1"
                  label="Show Password"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-checkbox>
                <div class="bottom-text">
                  Not your computer? Use a private browsing window to sign in.
                  <a href="">Learn more</a>
                </div>
                <div class="box">
                  <div class="link-box">
                    <router-link id="register-link1" to="/register">Create account</router-link>
                    <router-link id="register-link2" to="/forgotPassword"
                      >Forgot password?</router-link
                    >
                  </div>

                  <v-col cols="auto">
                    <v-btn id="btn-login" :disabled="!isFormValid" density="default" type="submit"
                      >Login</v-btn
                    >
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#google-img {
  margin-bottom: -9%;
}
.outerDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
  border-radius: 15px;
  border: 1px solid rgb(206, 205, 205);
  background-color: white;
  width: fit-content;
}
.innerDiv {
  padding: 2%;
  text-align: center;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2%;
}

.bottom-text {
  margin-top: 2%;
}

@media screen and (max-width: 1000px) {
  .outerDiv {
    width: fit-content;
    border: none;
  }
  .box {
    width: fit-content;
  }
}
#register-link1 {
  margin-top: 2%;
  font-size: larger;
}
#register-link2 {
  margin-top: 2%;
}
#btn-login {
  background-color: rgb(77, 94, 248);
  color: white;
}
.link-box {
  display: flex;
  flex-direction: column;
}
</style>
