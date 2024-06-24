<script>
import SnackBar from './SnackBar.vue'
import IconButtons from './IconButtons.vue'
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
    colorNote: '',
    list: [],
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
      const data = { title: this.title, description: this.description }
      if (this.title != '' || this.description != '') {
        addNotes(data)
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
  mounted() {
    console.log('labels list:', this.list)
    document.addEventListener('click', this.handleClickOutside)
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
    },
    updateColor(item) {
      this.colorNote = item.color
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="fit" :style="{ backgroundColor: colorNote }">
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
            style="margin-right: 15px"
          >
            {{ item.icon }}
          </v-icon>
        </template>
      </v-textarea>

      <div style="display: flex; justify-content: space-between">
        <IconButtons :show1="show1" :colorNote="colorNote" @updateColor="updateColor" />
        <v-btn id="close" variant="text" v-if="show1" @click="close">Close</v-btn>
      </div>
    </div>
  </div>
</template>

<style>
.fit {
  width: fit-content;
  padding-left: 0%;
  padding-top: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.inputs {
  width: 600px;
  position: relative;
  height: fit-content;
  box-shadow: 0px 1px 5px 0px rgb(144, 144, 144);
  background-color: white;
  padding: 0%;
  border-radius: 5px;
  padding-top: -4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.inputBox {
  height: fit-content;
  /* padding-bottom: 2%; */
  margin-left: 3%;
  padding-right: 2%;
  white-space: pre-wrap;
  /* height: min-content; */
}
.inputBox::-webkit-input-placeholder {
  color: blue;
  font-weight: bold;
}

#close {
  text-transform: capitalize;
}

:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
}
.v-input__control {
  padding-bottom: 10px;
}
.v-input--plain-underlined.v-text-field.v-input__details {
  display: none;
}

@media screen and (max-width: 600px) {
  .inputs {
    width: 100%;
  }
}
</style>
