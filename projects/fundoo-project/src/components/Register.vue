<script>
export default {
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
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      nameRules: [
        (v) => !!v || 'This Field is required',
        (v) => (v && v.length >= 3) || 'Should be more than 2 characters'
      ],
      emailRules: [
        (v) => !!v || 'This field is required'
        //   (v) => {
        //     if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) {
        //       return true
        //     } else {
        //       return 'Must be a valid e-mail.'
        //     }
        //   }
      ],
      passwordRules: [
        (v) => !!v || 'This field is required',
        (v) => {
          if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v)) {
            return true
          } else {
            return 'Must be Valid Password'
          }
        }
      ],
      confirmRules: [(value) => !!value || 'Type confirm password']
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
    }
  },

  //   watch: {
  //     name() {
  //       this.errorMessages = ''
  //     }
  //   },

  methods: {
    checkPass() {},
    addressCheck() {
      this.errorMessages =
        this.eamil && !this.firstName && !this.lastName && !this.password ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      console.log(this.form)
      ;(this.firstName = null),
        (this.lastName = null),
        (this.email = null),
        (this.password = null),
        (this.confirm = null),
        (this.formHasErrors = false)
    },
    submit() {
      this.formHasErrors = false
      if (this.form.confirm != this.form.password) {
        alert('Confirm Password must be same as Paaword')
      } else {
        this.resetForm()
        this.$router.push({ name: 'login' })
        alert('Form Submited Successfully')
      }
    }
  }
}
</script>

<template>
  <div class="outerBox">
    <div class="innerBox">
      <img
        src="https://logowik.com/content/uploads/images/google-logo-2020.jpg"
        width="120px"
        alt=""
      />
      <h1><b>Create Your Google Account</b></h1>
    </div>
    <div class="box">
      <div>
        <v-form>
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
                  label="Username"
                  suffix="@gmail.com"
                  variant="outlined"
                  v-model="email"
                  :rules="rules.emailRules"
                  required
                ></v-text-field>
                <div class="text-ib">
                  <b>You can use letters, numbers and Periods</b>
                  <p id="email-text"><b>Use my Current Email address instead</b></p>
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
                    onchange="checkPass()"
                    class="icon-eye"
                    v-model="confirm"
                    variant="outlined"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.confirmRules"
                    :type="show1 ? 'text' : 'password'"
                    label="Confirm"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div>
                <div class="text-ib">
                  <b>Use 8 or more Characters witha mix of letters,numbers and symbols</b>
                </div>
                <div class="last-btns">
                  <div>
                    <router-link id="login-link" to="/login"><b>Sign in instead</b></router-link>
                  </div>
                  <div>
                    <v-btn id="btn-s" density="default" type="submit" @click="submit">Submit</v-btn>
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
  color: rgb(70, 70, 243);
  cursor: pointer;
  padding-top: 2%;
}
.img-col {
  margin-right: -32%;
}

@media screen and (max-width: 800px) {
  .outerBox {
    width: fit-content;
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
  color: rgb(70, 70, 243);
}
#btn-s {
  background-color: rgb(70, 70, 243);
  color: white;
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
