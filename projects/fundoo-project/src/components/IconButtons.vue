<script>
import SnackBar from './SnackBar.vue'
import { updateArchivedNotes, updateColorNotes, deleteNote } from '@/services/noteServices'

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
    },
    archived: {
      type: Boolean,
      default: true
    },
    colorNote: {
      type: String,
      default: '#FFFFF'
    }
  },
  data: () => ({
    showMenu: false,
    showCheckboxMenu: false,
    checkboxes: [
      { label: 'Checkbox 1', checked: false },
      { label: 'Checkbox 2', checked: false },
      { label: 'Checkbox 3', checked: false },
      { label: 'Checkbox 1', checked: false },
      { label: 'Checkbox 2', checked: false },
      { label: 'Checkbox 3', checked: false }
    ],

    pick: true,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    pin: false,
    index: null,
    subMenu: false,
    mainMenu: false,
    submenuOffset: { x: 0, y: 0 },
    reminders: [
      { title: 'Tomorrow', time: '8:00 PM', icon: '', c: false },
      { title: 'Next week', time: 'Mon, 8:00 PM', icon: '', c: false },
      { title: 'Home', time: 'Pune', icon: '', c: false },
      { title: 'Work', time: 'Govandi, Mumbai', icon: '', c: false },
      { title: 'Pick a date & time', time: '', icon: 'mdi-clock-outline', c: true },
      { title: 'Pick a place', time: '', icon: 'mdi-map-marker', c: true }
    ],
    colors: [
      { name: 'Coral', color: '#F48FB1' },
      { name: 'Mint', color: '#A5D6A7' },
      { name: 'Peach', color: '#EF9A9A' },
      { name: 'Sage', color: '#B0BEC5' },
      { name: 'Sand', color: '#FFF59D' },
      { name: 'Fog', color: '#C5E1A5' },
      { name: 'Storm', color: '#80DEEA' },
      { name: 'Dusk', color: '#E1BEE7' },
      { name: 'Blossum', color: '#FFCDD2' },
      { name: 'Clay', color: '#F9FBE7' },
      { name: 'Chalk', color: '#FAFAFA' }
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
  emits: ['menuStateChanged', 'updateNotes'],
  methods: {
    toggleCheckboxMenu(event) {
      this.showCheckboxMenu = !this.showCheckboxMenu
      // this.$emit('changeStateLabels', this.showCheckboxMenu)
      event.stopPropagation()
    },
    changeColor(color) {
      const data = { noteIdList: [this.$props.hoverIndex], color: color.color }

      updateColorNotes(data)
        .then((res) => {
          this.$emit('updateColor', data)
          this.snackbarText = 'Color Aplied to the card'
          this.snackbar = true
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    moveToArchived() {
      let ar = this.$props.archived
      const data = {
        noteIdList: [this.$props.hoverIndex],
        isArchived: ar
      }
      updateArchivedNotes(data)
        .then((res) => {
          console.log(res)
          this.snackbarText = 'note archived'
          this.snackbar = true
          this.$emit('updateNotes')
        })
        .catch((error) => {
          this.snackbarText = 'Error in archived'
          this.snackbar = true
          console.log(error)
        })
    },
    handleMenuClick(item, event) {
      if (item.title === 'Add Label') {
        console.log('Selected:', item.title)
        this.showCheckboxMenu = true
        this.showMenu = false
        this.$emit('changeStateLabels', this.showCheckboxMenu)
        event.stopPropagation()
      } else {
        this.delete(item.title)
        this.mainMenu = false
      }
    },
    delete(title) {
      if (title === 'Delete Note') {
        const data = { noteIdList: [this.hoverIndex], isDeleted: true }
        console.log('Data being sent to deleteNote:', data)

        deleteNote(data)
          .then((response) => {
            if (response.data.data.success === true) {
              this.$emit('updateNotes')
              this.$emit('deleted')
              this.snackbarText = 'Note Deleted !!'
              this.snackbar = true
            } else {
              console.warn('Unexpected response:', response)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    toggleMenu(event) {
      this.showMenu = !this.showMenu
      this.menu = !this.menu
      this.$emit('menuStateChanged', this.menu)
      event.stopPropagation()
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
              style="font-size: smaller; margin-left: -8px"
              icon="mdi-bell-plus-outline"
              variant="text"
              v-bind="props"
              @click.stop="toggleMenu"
            >
            </v-btn>
          </template>
          <v-list>
            <label style="margin-left: 5%" for="Reminder">Reminder:</label>
            <v-list-item
              style="min-width: 300px; font-size: smaller"
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
          style="font-size: smaller; margin-left: -8px"
          icon="mdi-account-plus"
          variant="text"
        ></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              style="font-size: smaller; margin-left: -8px"
              icon="mdi-palette-outline"
              variant="text"
              v-bind="props"
              @click.stop="toggleMenu"
            >
            </v-btn>
          </template>
          <v-list style="display: flex; background-color: white">
            <v-list-item v-for="color in colors" :key="color.name" :value="color.color">
              <div
                :style="{
                  backgroundColor: color.color,
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
                }"
                @click.stop="changeColor(color)"
              ></div>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          style="font-size: smaller; margin-left: -8px"
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
          style="font-size: smaller; margin-left: -8px"
          @click="moveToArchived"
          icon="mdi-archive-arrow-down-outline"
          variant="text"
        ></v-btn>
        <v-menu v-if="!showCheckboxMenu">
          <template v-slot:activator="{ props }">
            <v-btn
              style="font-size: smaller; margin-left: -8px"
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
              @click.stop="toggleMenu"
            >
            </v-btn>
          </template>
          <v-list v-if="showMenu">
            <v-list-item
              style="width: 200px"
              v-for="(item, index) in notesOptions"
              :key="index"
              :value="index"
              @click.stop="handleMenuClick(item, $event)"
            >
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-model="showCheckboxMenu">
          <template v-slot:activator="{ props }">
            <v-btn
              style="font-size: smaller; margin-left: -8px"
              variant="text"
              v-bind="props"
              @click.stop="toggleCheckboxMenu"
            >
            </v-btn>
          </template>
          <v-list style="width: 200px">
            <div>Label Note</div>
            <v-text-field placeholder="Enter Label Name" variant="plain">
              <template v-slot:append>
                <v-icon> mdi-magnify </v-icon>
              </template>
            </v-text-field>
            <v-list-item v-for="(checkbox, index) in checkboxes" :key="index">
              <v-checkbox
                class="check-box-label"
                v-model="checkbox.checked"
                :label="checkbox.label"
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  font-size: xx-small;
}

.innerBet {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-left: -3px;
}

.pick {
  position: inherit;
  background-color: white;
  border-radius: 50%;
  z-index: 1;
  margin-top: 400px;
}
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline: 3px;
}
.v-checkbox .v-selection-control {
  height: 20px;
}
.v-input__details {
  display: none;
}
.check-box-label {
  height: 37px !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
