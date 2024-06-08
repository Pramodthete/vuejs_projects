<script>
import { loginData } from '../services/userServices.js'
export default {
  data: () => ({
    email: null,
    password: null,
    show1: false,
    rules: {
      required: [
        (v) => !!v || 'This field is required',
        (v) => {
          if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v)) {
            return true
          } else {
            return 'Must be Valid Password'
          }
        }
      ],
      email: [
        (v) => !!v || 'This field is required',
        (v) => {
          if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v)) {
            return true
          } else {
            return 'Must be a valid e-mail.'
          }
        }
      ]
    }
  }),

  computed: {
    form() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },

  methods: {
    resetForm() {
      console.log(this.form)
      ;(this.form.email = null), (this.form.password = null)
    },
    handleLogin() {
      const data = { email: this.eamil, password: this.password }
      loginData(data)
    },
    submit() {
      if (this.form.email != null && this.form.password != null) {
        const data = { email: this.form.email, password: this.form.password }
        console.log('This is from server: _____>>>>>', loginData(data))
        loginData(data)
          .then((response) => {
            console.log('This is from server: _____>>>>>', response.data)
          })
          .catch((error) => {
            console.error('Error logging in:', error)
          })
        this.resetForm()
        this.$router.push({ name: 'signup' })
        alert('User Login Successfully')
      }
    }
  }
}
</script>

<template>
  <div class="outerDiv">
    <div class="innerDiv">
      <img
        id="google-img"
        src="https://logowik.com/content/uploads/images/google-logo-2020.jpg"
        width="120px"
        alt=""
      />
      <h1>Sign in</h1>
      <h2>Use your google account</h2>
    </div>

    <div class="box">
      <v-form>
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
              ></v-text-field
              ><br />
              <v-text-field
                class="input"
                label="Password"
                variant="outlined"
                :type="show1 ? show1 : 'password'"
                hint="At least 8 characters"
                v-model="password"
                :rules="rules.required"
                required
              ></v-text-field>
              <div class="bottom-text">
                Not your Computer? Use a Private browsing window to sign in.
                <a href="">Learn more</a>
              </div>
              <div class="box">
                <div class="link-box">
                  <router-link id="register-link1" to="/register">Create Account</router-link>
                  <router-link id="register-link2" to="/forgotPassword"
                    >Forgot Password?</router-link
                  >
                </div>

                <v-col cols="auto">
                  <v-btn id="btn-login" density="default" type="submit" @click="submit"
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
