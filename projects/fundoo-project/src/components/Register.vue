<script>
import { registerData } from '../services/userServices.js'
import SnackBar from './SnackBar.vue'

export default {
  components: { SnackBar },
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirm: null,
    formHasErrors: false,
    show1: false,
    show2: true,
    passwordArr: null,
    snackbar: false,
    snackbarText: '',
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirm: null
    },
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      nameRules: [
        (v) => !!v || 'This Field is required',
        (v) => (v && v.length >= 3) || 'Should be more than 2 characters',
        (value) => /[^0-9]/.test(value) || 'Name cannot contain digits.'
      ],
      emailRules: [
        (v) => !!v || 'This field is required',
        (v) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) || 'Must be a valid e-mail.'
      ],
      passwordRules: [
        (v) => !!v || 'This field is required',
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
          'Must be a valid password'
      ],
      confirmRules: [(v) => !!v || 'This field is required']
    }
  }),

  computed: {
    form() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirm: this.confirm
      }
    },
    isFormValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.confirm &&
        this.rules.nameRules.every((rule) => rule(this.firstName) === true) &&
        this.rules.nameRules.every((rule) => rule(this.lastName) === true) &&
        this.rules.emailRules.every((rule) => rule(this.email) === true) &&
        this.rules.passwordRules.every((rule) => rule(this.password) === true) &&
        this.rules.confirmRules.every((rule) => rule(this.confirm) === true)
      )
    }
  },

  methods: {
    validateField(fieldName, value) {
      const rules = this.rules[`${fieldName}Rules`]
      if (Array.isArray(rules)) {
        for (let rule of rules) {
          const errorMessage = rule(value)
          if (errorMessage !== true) {
            this.errors[fieldName] = errorMessage
            return false
          }
        }
      }
      this.errors[fieldName] = null
      return true
    },

    validateForm() {
      let isValid = true
      isValid = this.validateField('firstName', this.firstName) && isValid
      isValid = this.validateField('lastName', this.lastName) && isValid
      isValid = this.validateField('email', this.email) && isValid
      isValid = this.validateField('password', this.password) && isValid
      isValid = this.validateField('confirm', this.confirm) && isValid
      return isValid
    },

    resetForm() {
      console.log(this.form)
      this.firstName = null
      this.lastName = null
      this.email = null
      this.password = null
      this.confirm = null
      this.errors = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirm: null
      }
    },
    submit() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        service: 'advance',
        email: this.email,
        password: this.password
      }

      if (this.validateForm()) {
        registerData(data)
          .then((data) => {
            this.resetForm()
            this.snackbarText = 'User Registerd successfully!'
            this.snackbar = true
            console.log('This is from server: _____>>>>>', data)
            setTimeout(() => {
              this.$router.push({ name: 'login' })
            }, 2000)
          })
          .catch((error) => {
            this.snackbarText = 'Error For Submiting Form'
            this.snackbar = true
            console.log('Error in register: _____>>>>>', error)
          })
      } else {
        this.snackbarText = 'Please correct the errors before submitting.'
        this.snackbar = true
      }
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="outerBox">
    <div class="innerBox">
      <img
        id="google-img"
        src="https://logowik.com/content/uploads/images/google-logo-2020.jpg"
        width="120px"
        alt=""
      />
      <h1>Create Your Google Account</h1>
    </div>
    <div class="box">
      <div>
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row>
              <v-col>
                <div class="inputName">
                  <v-text-field
                    label="First Name"
                    variant="outlined"
                    ref="firstName"
                    v-model="firstName"
                    :rules="rules.nameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Last Name"
                    variant="outlined"
                    v-model="lastName"
                    :rules="rules.nameRules"
                    required
                  ></v-text-field>
                </div>
                <v-text-field
                  label="Email"
                  variant="outlined"
                  v-model="email"
                  :rules="rules.emailRules"
                  required
                ></v-text-field>
                <div class="text-ib">
                  <b>You can use letters, numbers, and periods</b>
                  <p id="email-text"><b>Use my current email address instead</b></p>
                </div>
                <div class="inputName">
                  <v-text-field
                    v-model="password"
                    variant="outlined"
                    :rules="rules.passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    class="icon-eye"
                    v-model="confirm"
                    variant="outlined"
                    :rules="rules.confirmRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Confirm"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div>
                <v-checkbox
                  class="checkBox"
                  v-model="show1"
                  label="Show Password"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-checkbox>
                <div class="text-ib">
                  <b>Use 8 or more characters with a mix of letters, numbers, and symbols</b>
                </div>
                <div class="last-btns">
                  <div>
                    <router-link id="login-link" to="/login"><b>Sign in instead</b></router-link>
                  </div>
                  <div>
                    <v-btn id="btn-s" :disabled="!isFormValid" density="default" type="submit"
                      >Sign up</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col class="img-col">
                <img src="../assets/images/google_create.png" alt="" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
      <div></div>
    </div>
  </div>
  <div class="foot">
    <div>
      <select name="lang" id="lang">
        <option value="English (United States)">English (United States)</option>
        <option value="मराठी">मराठी</option>
        <option value="हिन्दी">हिन्दी</option>
        <option value="ગુજરાતી">ગુજરાતી</option>
        <option value="नेपाली">नेपाली</option>
        <option value="English (United Kingdom)">English (United Kingdom)</option>
      </select>
    </div>
    <div class="right-bottom">
      <a
        href="https://support.google.com/accounts?hl=en&visit_id=638530922477244333-1833003699&rd=2&p=account_iph#topic=3382296"
      >
        <div>Help</div>
      </a>
      <a href="https://policies.google.com/privacy?gl=IN&hl=en">
        <div>Privacy</div>
      </a>
      <a href="https://policies.google.com/terms?gl=IN&hl=en">
        <div>Terms</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
#google-img {
  margin-bottom: -3%;
}
h1 {
  letter-spacing: -1px;
  font-weight: 400;
}
input {
  height: 10px;
}
.inputClass {
  display: flex;
}
.box,
.inputName {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  padding-bottom: 4%;
  /* background-color: red; */
  /* background-image: linear-gradient(to right, red, orange, green, yellow); */
}
.outerBox {
  font-weight: bold;
  width: 110%;
  display: flex;
  flex-direction: column;
  padding: 1%;
  padding-left: 2%;
  border-radius: 15px;
  border: 1px solid rgb(184, 183, 183);
  background-color: white;
}
.innerBox {
  padding: 2%;
}
.text-ib {
  padding-bottom: 4%;
}
#email-text {
  color: rgb(77, 94, 248);
  cursor: pointer;
  padding-top: 2%;
}
.checkBox {
  margin-top: -5%;
}
.img-col {
  margin-right: -32%;
}

@media screen and (max-width: 800px) {
  .outerBox {
    width: fit-content;
    border: none;
  }
  .inputName {
    display: flex;
    flex-direction: column;
  }
  .innerBox {
    padding: 4%;
  }

  .img-col {
    display: none;
  }
  .right-bottom {
    display: flex;
    flex-wrap: wrap;
    font-size: smaller;
  }
}

.last-btns {
  display: flex;
  justify-content: space-between;
  padding-top: 4%;
}
.login-link {
  text-decoration: none;
  color: rgb(77, 94, 248);
}
#btn-s {
  background-color: rgb(92, 108, 251);
  color: white;
  text-transform: capitalize;
}
.foot {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  padding-right: 50px;
}

.right-bottom {
  display: flex;
  gap: 25%;
  font-size: smaller;
  text-decoration: none;
  color: black;
}

a:hover {
  background-color: rgb(241, 246, 251);
  cursor: pointer;
  border-radius: 6px;
}

#lang {
  background-color: transparent;
  border: none;
  padding: 5px;
  border-radius: 5px;
}

#lang:hover {
  background-color: rgb(224, 224, 224);
  padding: 5px;
}
</style>
