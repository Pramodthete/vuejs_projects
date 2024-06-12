<script>
import SnackBar from './SnackBar.vue'
export default {
  components: { SnackBar },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    show1: false,
    openRail: true,
    picker: null,
    pickColor: false,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    pin: false,
    items: [
      { title: 'Notes', value: 'foo', icon: 'mdi-lightbulb-outline' },
      { title: 'Reminders', value: 'bar', icon: 'mdi-bell-outline' },
      { title: 'Edit lables', value: 'fizz', icon: 'mdi-pencil-outline' },
      { title: 'Archive', value: 'buzz', icon: 'mdi-archive-arrow-down-outline' },
      { title: 'Trash', value: 'tuzz', icon: 'mdi-trash-can-outline' }
    ],
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
    ],
    icons: [
      {
        icon: 'mdi-checkbox-outline',
        action: () => console.log('checked clicked')
      },
      { icon: 'mdi-brush-outline', action: () => console.log('Brush clicked') },
      { icon: 'mdi-image-outline', action: () => console.log('Images clicked') }
    ],
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Brush clicked') }
  }),
  methods: {
    onRail() {
      this.openRail = true
      // @click.stop="drawer = !drawer"
    },
    close() {
      this.show1 = !this.show1
    },
    previewImage() {
      const file = this.file
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageUrl = e.target.result
        }
        this.$refs.fileInput.click()
        reader.readAsDataURL(file)
      }
    },
    snackMsg() {
      this.snackbarText = 'note achived'
      this.snackbar = true
    }
  }
}
</script>

<template>
  <div class="inputs">
    <v-text-field
      class="inputBox"
      placeholder="Title"
      density="compact"
      variant="plain"
      v-if="show1"
      ><template v-slot:append-inner>
        <v-icon v-if="!pin" @click="pin = !pin">
          {{ oneIcon.icon }}
        </v-icon>
        <v-icon v-if="pin" @click="pin = !pin">
          {{ twoIcon.icon }}
        </v-icon>
      </template>
    </v-text-field>
    <v-text-field
      class="inputBox"
      placeholder="Take a Note ..."
      density="compact"
      variant="plain"
      @click="show1 = true"
    >
      <template v-slot:append-inner>
        <v-icon
          :class="['input-inner-icon', `icon-${index}`]"
          v-for="(item, index) in !show1 ? icons : ''"
          :key="index"
          @click=""
        >
          {{ item.icon }}
        </v-icon>
      </template></v-text-field
    >
    <div class="Bet" v-if="show1">
      <div class="innerBet">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="font"
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
              style="width: 300px"
              v-for="(item, index) in reminders"
              :key="index"
              :value="index"
            >
              <v-list-item-title class="font-menu">
                <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                <p style="float: right">{{ item.time }}</p></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="font" icon="mdi-account-plus" variant="text"></v-btn>
        <v-btn
          class="font"
          icon="mdi-palette-outline"
          v-on:click="pickColor = !pickColor"
          variant="text"
        >
        </v-btn>
        <v-btn class="font" icon="mdi-image-outline" variant="text">
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
          class="font"
          @click="snackMsg"
          icon="mdi-archive-arrow-down-outline"
          variant="text"
        ></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="font bell-plus"
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
            >
              <v-list-item-title class="font-menu">
                <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                <p style="float: right">{{ item.time }}</p></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div>
        <v-btn id="close" variant="text" @click="close">Close</v-btn>
      </div>
    </div>
  </div>
  <div>
    <div class="d-flex justify-space-around pick" v-if="pickColor">
      <v-color-picker v-model="picker" elevation="0"></v-color-picker>
    </div>

    <div class="d-flex justify-space-around" v-if="menu"></div>
  </div>
</template>

<style>
.size {
  width: 250px;
  height: fit-content;
}
.inputs {
  width: 600px;
  height: fit-content;
  position: fixed;
  left: 34%;
  top: 13%;
  box-shadow: 0px 1px 4px 1px gray;
  background-color: white;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 5px;
  z-index: 1;
}
.inputBox {
  border: none;
  box-shadow: none;
  height: 40px;
}
:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
}
#close {
  text-transform: capitalize;
}

.Bet {
  display: flex;
  justify-content: space-between;
  color: rgb(71, 70, 70);
}
.font {
  font-size: small;
}
.innerBet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pick {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  z-index: 1;
}
</style>
