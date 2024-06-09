<script>
import { forgotPassData } from '../services/userServices.js'
import SnackBar from './SnackBar.vue'
export default {
  data: () => ({
    email: null,
    snackbar: false,
    snackbarText: '',

    rules: {
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
        email: this.email
      }
    },
    isFormValid() {
      return this.email && this.rules.email.every((rule) => rule(this.email) === true)
    }
  },

  methods: {
    resetForm() {
      this.email = null
    },
    toPassword() {
      const data = { email: this.email }
      if (
        this.form.email != null &&
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(this.email) == true
      ) {
        forgotPassData(data)
          .then((data) => {
            this.snackbarText = 'Successfully Send Varification Mail to your email address'
            this.snackbar = true
            this.resetForm()
            console.log(data)
            setTimeout(() => {
              this.$router.push({ name: 'resetPassword' })
            }, 2000)
          })
          .catch((error) => {
            this.snackbarText = 'Error in Forgot Password'
            this.snackbar = true
            console.log(error)
          })
      } else {
        this.snackbarText = 'Invalid email'
        this.snackbar = true
        console.log('Invalid email')
      }
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="outerDiv">
    <div class="innerDiv">
      <img
        id="google-img"
        src="https://logowik.com/content/uploads/images/google-logo-2020.jpg"
        width="120px"
        alt=""
      />
      <h1>Account Recovery</h1>
      <h2>Recover your google account</h2>
    </div>

    <div class="box">
      <v-form ref="form" @submit.prevent="toPassword">
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
              <div class="box">
                <div class="link-box">
                  <router-link id="register-link1" to="/register">Email Recovery</router-link>
                </div>

                <v-col cols="auto">
                  <v-btn
                    id="btn-login"
                    :disabled="!isFormValid"
                    density="default"
                    type="submit"
                    @click="toPassword()"
                    >Next</v-btn
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
.input {
  width: 460px;
}

@media screen and (max-width: 1000px) {
  .outerDiv {
    width: fit-content;
    border: none;
  }
  .box {
    width: fit-content;
  }
  .input {
    width: initial;
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
  background-color: rgb(70, 70, 243);
  color: white;
}
.link-box {
  display: flex;
  flex-direction: column;
}
</style>
