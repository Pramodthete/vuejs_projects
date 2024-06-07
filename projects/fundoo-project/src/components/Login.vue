<script>
export default {
  data: () => ({
    email: null,
    password: null,
    formHasErrors: false,
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
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) {
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

  //   watch: {
  //     name() {
  //       this.errorMessages = ''
  //     }
  //   },

  methods: {
    addressCheck() {
      this.errorMessages = this.eamil && !this.password ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    submit() {
      alert('User Login Successfully')
    }
  }
}
</script>

<template>
  <div class="outerDiv">
    <div class="innerDiv">
      <img
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
              <div>
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
.outerDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1%;
  border-radius: 15px;
  border: 1px solid rgb(206, 205, 205);
  background-color: white;
  width: fit-content;
}
.innerDiv {
  padding: 2%;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
