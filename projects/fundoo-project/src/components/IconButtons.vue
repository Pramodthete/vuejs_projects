<script>
import { addNotes } from '@/services/noteServices'
import SnackBar from './SnackBar.vue'
export default {
  components: { SnackBar },
  props: {
    show1: {
      type: Boolean,
      default: false
    },
    componentKey: {
      type: Number,
      default: 0
    },
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    picker: null,
    pickColor: false,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    pin: false,
    reminders: [
      { title: 'Tommarow', time: '8:00 PM', icon: '', c: false },
      { title: 'Next week', time: 'Mon, 8:00 PM', icon: '', c: false },
      { title: 'Home', time: 'Pune', icon: '', c: false },
      { title: 'Work', time: 'Govandi, Mumbai', icon: '', c: false },
      { title: 'Pick a date & time', time: '', icon: 'mdi-clock-outline', c: true },
      { title: 'Pick a place', time: '', icon: 'mdi-map-marker', c: true }
    ],
    notesOptions: [
      { title: 'Delete Note', action: () => console.log('clicked') },
      { title: 'Add Label', action: () => console.log('clicked') },
      { title: 'Add Drawing', action: () => console.log('clicked') },
      { title: 'Make a copy', action: () => console.log('clicked') },
      { title: 'Show Checkboxes', action: () => console.log('clicked') },
      { title: 'Copy to google docs', action: () => console.log('clicked') },
      { title: 'Version history', action: () => console.log('clicked') }
    ]
  }),
  methods: {
    handleClick() {
      console.log('Icon button clicked')
    },
    close() {
      const token = localStorage.getItem('loginToken')
      const data = { title: this.title, description: this.description }

      addNotes(data, token)
        .then((res) => {
          this.snackbarText = 'Add Notes Successfully!!'
          this.snackbar = true
          // this.title = null
          // this.description = null
          this.componentKey++
          console.log(res)
        })
        .catch((error) => {
          this.snackbarText = 'Error in Axios req-res!!'
          this.snackbar = true
          console.log(error)
        })

      this.$emit('update:show1', false)
    },
    snackMsg() {
      this.snackbarText = 'note archieved'
      this.snackbar = true
    }
    // deleteNote(id,token)
  }
}
</script>

<template>
  <div>
    <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
    <div class="Bet" v-if="show1">
      <div class="innerBet">
        <v-menu class="flex">
          <template v-slot:activator="{ props }">
            <v-btn
              style="font-size: smaller; margin-left: 5px"
              @click="menu = !menu"
              icon="mdi-bell-plus-outline"
              variant="text"
              v-bind="props"
            >
            </v-btn>
          </template>
          <v-list>
            <label style="margin-left: 5%" for="Reminder">Reminder:</label>
            <v-list-item
              style="width: 300px; font-size: smaller; margin-left: 5px"
              v-for="(item, index) in reminders"
              :key="index"
              :value="index"
            >
              <v-list-item-title class="font-menu">
                <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                <p style="float: right; font-size: smaller">{{ item.time }}</p></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          style="font-size: smaller; margin-left: 5px"
          icon="mdi-account-plus"
          variant="text"
        ></v-btn>
        <v-btn
          style="font-size: smaller; margin-left: 5px"
          icon="mdi-palette-outline"
          variant="text"
          ><v-icon @click="pickColor = !pickColor">mdi-palette-outline</v-icon>
          <div class="pick" v-if="pickColor">
            <v-color-picker v-model="picker"></v-color-picker>
          </div>
        </v-btn>
        <v-btn style="font-size: smaller; margin-left: 5px" icon="mdi-image-outline" variant="text">
          <v-file-input
            v-model="file"
            label="Upload Image"
            prepend-icon="mdi-image-outline"
            accept="image/*"
            @change="previewImage"
            hide-input
          ></v-file-input>
        </v-btn>
        <v-btn
          style="font-size: smaller; margin-left: 5px"
          @click="snackMsg"
          icon="mdi-archive-arrow-down-outline"
          variant="text"
        ></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="bell-plus"
              style="font-size: smaller; margin-left: 5px"
              @click="menu = !menu"
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            >
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              style="width: 200px; font-size: smaller; margin-left: 5px"
              v-for="(item, index) in notesOptions"
              :key="index"
              :value="index"
            >
              <v-list-item-title class="font-menu">
                <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                <p style="float: right; font-size: smaller">{{ item.time }}</p></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div>
        <v-btn id="close" variant="text" v-if="show1" @click="close">Close</v-btn>
      </div>
    </div>
  </div>
</template>

<style>
#close {
  text-transform: capitalize;
}

.Bet {
  display: flex;
  justify-content: space-between;
  color: rgb(71, 70, 70);
}
.font {
  font-size: x-small;
}
.innerBet {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.pick {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  z-index: 1;
  margin-top: 400px;
}
</style>
