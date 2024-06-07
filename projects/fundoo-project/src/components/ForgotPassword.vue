<script>
export default {
  data: () => ({
    email: null,
    formHasErrors: false,
    rules: {
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

      email = null
    },
    toPassword() {
      alert('Successfully Send Varification Mail to your email address')
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
      <h1>Account Recovery</h1>
      <h2>Recover your google account</h2>
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
              ></v-text-field>
              <!-- <div>
                <v-checkbox v-model="selected" label="" value=""></v-checkbox>
              </div> -->
              <div class="box">
                <div class="link-box">
                  <router-link id="register-link1" to="/register">Forgot Email?</router-link>
                </div>

                <v-col cols="auto">
                  <router-link to="/resetPassword"
                    ><v-btn id="btn-login" density="default" type="submit" @click="toPassword()"
                      >Next</v-btn
                    ></router-link
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
