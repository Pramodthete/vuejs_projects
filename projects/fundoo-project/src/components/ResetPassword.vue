<script>
import { resetPassData } from '../services/userServices.js'
import SnackBar from './SnackBar.vue'
export default {
  data: () => ({
    confirm: null,
    password: null,
    formHasErrors: false,
    show1: false,
    snackbar: false,
    snackbarText: '',

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
      confirm: [
        (v) => !!v || 'This field is required',
        (v) => {
          if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v)) {
            return true
          } else {
            return 'Must be Valid Password'
          }
        }
      ]
    }
  }),

  computed: {
    form() {
      return {
        confirm: this.confirm,
        password: this.password
      }
    },
    isFormValid() {
      return (
        this.password &&
        this.confirm &&
        this.rules.confirm.every((rule) => rule(this.confirm) === true) &&
        this.rules.required.every((rule) => rule(this.password) === true)
      )
    }
  },

  methods: {
    addressCheck() {
      this.errorMessages = this.eamil && !this.password ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      this.confirm = null
      this.password = null
    },
    submit() {
      if (this.form.confirm != this.form.password) {
        this.snackbarText = 'Password and Confirm password must be same'
        this.snackbar = true
      } else {
        const token = localStorage.getItem('loginToken')
        console.log('Iam here =============>')
        console.log('token++++++>>>', token)
        const data = { newPassword: this.password }
        resetPassData(data, token)
          .then((data) => {
            this.snackbarText = 'Password Reset Successfully'
            this.snackbar = true
            this.resetForm()
            console.log(data)
            setTimeout(() => {
              this.$router.push({ name: 'login' })
            }, 2000)
          })
          .catch((error) => {
            this.snackbarText = 'Error in Reset Password'
            this.snackbar = true
            console.log(error)
            console.log('Error message:', error.message)
            console.log('Error response data:', error.response ? error.response.data : null)
            console.log('Error response status:', error.response ? error.response.status : null)
          })
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
      <h1>Reset Your Password</h1>
    </div>

    <div class="box">
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                class="input"
                label="Password"
                variant="outlined"
                ref="password"
                :type="show1 ? show1 : 'password'"
                v-model="password"
                :rules="rules.required"
                required
              ></v-text-field
              ><br />
              <v-text-field
                class="input"
                label="Confirm Password"
                variant="outlined"
                :type="show1 ? show1 : 'password'"
                hint="At least 8 characters"
                v-model="confirm"
                :rules="rules.confirm"
                counter
              ></v-text-field>
              <v-checkbox
                class="checkBox"
                v-model="show1"
                label="Show Password"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-checkbox>

              <div class="box">
                <div class="link-box">
                  <router-link id="register-link1" to="/login">Sign in instead</router-link>
                </div>

                <v-col cols="auto">
                  <v-btn
                    id="btn-login"
                    :disabled="!isFormValid"
                    density="default"
                    type="submit"
                    @click="submit"
                    >Save</v-btn
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
  margin-bottom: -8%;
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
    justify-content: center;
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
