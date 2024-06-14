<script>
import SnackBar from './SnackBar.vue'
import IconButtons from './IconButtons.vue' // Correctly import IconButtons
import { addNotes } from '@/services/noteServices'

export default {
  components: {
    SnackBar,
    IconButtons
  },
  data: () => ({
    show1: false,
    menu: false,
    snackbar: false,
    snackbarText: '',
    title: '',
    description: '',
    pin: false,
    icons: [
      { icon: 'mdi-checkbox-outline', action: () => console.log('checked clicked') },
      { icon: 'mdi-brush-outline', action: () => console.log('Brush clicked') },
      { icon: 'mdi-image-outline', action: () => console.log('Images clicked') }
    ],
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Brush clicked') }
  }),
  emits: ['updateNotes'],
  methods: {
    close() {
      const token = localStorage.getItem('loginToken')
      const data = { title: this.title, description: this.description }
      console.log('---------------------->', token)
      if (this.title != '' || this.description != '') {
        addNotes(data, token)
          .then((res) => {
            this.snackbarText = 'Add Notes Successfully!!'
            this.snackbar = true
            console.log(res)
            this.title = null
            this.description = null
            this.show1 = false
            this.$emit('updateNotes')
          })
          .catch((error) => {
            this.snackbarText = 'Something Went Wrong'
            this.snackbar = true
            console.log(error)
          })
      } else {
        this.show1 = false
        console.log('Both properties are null')
      }
    }
  },
  computed: {
    form() {
      return {
        title: this.title,
        title: this.description
      }
    },
    isFormValid() {
      return (
        this.title &&
        this.password &&
        this.rules.title.every((rule) => rule(this.title) === true) &&
        this.rules.description.every((rule) => rule(this.description) === true)
      )
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="fit">
    <div class="inputs">
      <v-textarea
        class="inputBox"
        placeholder="Title"
        density="compact"
        variant="plain"
        row-height="15"
        auto-grow
        rows="1"
        v-if="show1"
        v-model="title"
      >
        <template v-slot:append-inner>
          <v-icon v-if="!pin" @click="pin = !pin">
            {{ oneIcon.icon }}
          </v-icon>
          <v-icon v-if="pin" @click="pin = !pin">
            {{ twoIcon.icon }}
          </v-icon>
        </template>
      </v-textarea>
      <v-textarea
        class="inputBox"
        placeholder="Take a Note ..."
        density="compact"
        variant="plain"
        row-height="15"
        auto-grow
        rows="1"
        v-model="description"
        @click="show1 = true"
      >
        <template v-slot:append-inner>
          <v-icon
            :class="['input-inner-icon', `icon-${index}`]"
            v-for="(item, index) in !show1 ? icons : ''"
            :key="index"
          >
            {{ item.icon }}
          </v-icon>
        </template>
      </v-textarea>

      <div style="display: flex; justify-content: space-between">
        <IconButtons :show1="show1" />
        <v-btn id="close" variant="text" v-if="show1" @click="close">Close</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fit {
  width: fit-content;
  padding-left: 0%;
  padding-top: 2%;
}
.inputs {
  width: 100%;
  min-width: 400px;
  position: relative;
  height: fit-content;
  box-shadow: 0px 1px 4px 1px gray;
  background-color: white;
  padding: 1%;
  border-radius: 5px;
  padding-top: -4px;
  margin-left: 200px;
}

.inputBox {
  height: 39px;
  /* height: min-content; */
}
#close {
  text-transform: capitalize;
}

:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
}
</style>
