<script>
import SnackBar from './SnackBar.vue'
import { deleteNote } from '@/services/noteServices'

export default {
  components: { SnackBar },
  props: {
    show1: {
      type: Boolean,
      default: false
    },
    hoverIndex: {
      type: String,
      default: null
    },
    totalNotes: {
      type: Array
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
      { title: 'Tomorrow', time: '8:00 PM', icon: '', c: false },
      { title: 'Next week', time: 'Mon, 8:00 PM', icon: '', c: false },
      { title: 'Home', time: 'Pune', icon: '', c: false },
      { title: 'Work', time: 'Govandi, Mumbai', icon: '', c: false },
      { title: 'Pick a date & time', time: '', icon: 'mdi-clock-outline', c: true },
      { title: 'Pick a place', time: '', icon: 'mdi-map-marker', c: true }
    ],
    notesOptions: [
      { title: 'Delete Note' },
      { title: 'Add Label' },
      { title: 'Add Drawing' },
      { title: 'Make a copy' },
      { title: 'Show Checkboxes' },
      { title: 'Copy to Google Docs' },
      { title: 'Version history' }
    ]
  }),
  emits: ['updateNotes'],
  methods: {
    handleClick() {
      console.log('Icon button clicked')
    },
    snackMsg() {
      this.snackbarText = 'note archived'
      this.snackbar = true
    },
    menus(title) {
      if (title === 'Delete Note') {
        const token = localStorage.getItem('loginToken')
        const data = { noteIdList: [this.hoverIndex], isDeleted: true }
        console.log('Data being sent to deleteNote:', data)

        deleteNote(data, token)
          .then((response) => {
            if (response.data.data.success === true) {
              const filteredData = this.totalNotes.filter((note) => note.id !== this.hoverIndex)
              console.log('Filtered data:', filteredData)
              this.$emit('updateNotes', filteredData)
            } else {
              console.warn('Unexpected response:', response)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log('-----------> select correct option')
      }
    }
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
              style="font-size: smaller; margin-left: -1px"
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
              style="width: 300px; font-size: smaller; margin-left: -1px"
              v-for="item in reminders"
              :key="item.id"
              :value="item.id"
            >
              <v-list-item-title class="font-menu">
                <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                <p style="float: right; font-size: smaller">{{ item.time }}</p></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          style="font-size: smaller; margin-left: -1px"
          icon="mdi-account-plus"
          variant="text"
        ></v-btn>
        <v-btn
          style="font-size: smaller; margin-left: -1px"
          icon="mdi-palette-outline"
          variant="text"
          ><v-icon @click="pickColor = !pickColor">mdi-palette-outline</v-icon>
          <div class="pick" v-if="pickColor">
            <v-color-picker v-model="picker"></v-color-picker>
          </div>
        </v-btn>
        <v-btn
          style="font-size: smaller; margin-left: -1px"
          icon="mdi-image-outline"
          variant="text"
        >
          <v-file-input
            v-model="file"
            label="Upload Image"
            prepend-icon="mdi-image-outline"
            accept="image/*"
            hide-input
          ></v-file-input>
        </v-btn>
        <v-btn
          style="font-size: smaller; margin-left: -1px"
          @click="snackMsg"
          icon="mdi-archive-arrow-down-outline"
          variant="text"
        ></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              style="font-size: smaller; margin-left: -1px"
              @click="menu = !menu"
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            >
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              style="width: 200px"
              v-for="(item, index) in notesOptions"
              :key="index"
              :value="index"
              @click="menus(item.title)"
            >
              {{ ' ' + item.title }}
            </v-list-item>
          </v-list>
        </v-menu>
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
  position: static;
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
