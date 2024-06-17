<script>
import IconButtons from './IconButtons.vue'
import SnackBar from './SnackBar.vue'
import DialogBox from './DialogBox.vue'

export default {
  components: { SnackBar, IconButtons, DialogBox },
  props: {
    totalNotes: Array
  },
  data: () => ({
    show1: false,
    menu: false,
    snackbar: false,
    snackbarText: '',
    pin: true,
    hoverIndex: null,
    updatedColor: '#FFFFFF',
    clickedIndex: null,
    componentKey: 0,
    menuCard: null,
    localDialog: false,
    commonNotes: [],
    note: {},
    description: '',
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin-outline clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
  }),
  emits: ['updateData', 'closeDialog'],
  watch: {
    dialog(newVal) {
      this.localDialog = newVal
    }
  },
  methods: {
    openDialog(item) {
      console.log(this.localDialog)
      this.localDialog = true
      this.note = { id: item.id, title: item.title, description: item.description }
      console.log(this.note)
      console.log(this.localDialog)
    },
    updateNotes() {
      this.localDialog = false
      this.$emit('updateNotes')
    },
    changeState(noteId, isVisible) {
      this.hoverIndex = null
      this.menuCard = isVisible ? noteId : null
    },
    closeDialog(data) {
      this.localDialog = false
      console.log(data)
    },
    onclickCheck(id) {
      console.log(id)
      this.clickedIndex = id
    },
    updateColor(item) {
      console.log(item.noteIdList[0])
      console.log(this.clickedIndex)
      this.clickedIndex = item.noteIdList[0]
      this.updatedColor = item.color
      this.$emit('updateData')
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="flex">
    <v-dialog v-model="localDialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-card
          class="note-card"
          v-for="item in totalNotes"
          :key="item.id"
          @mouseover="hoverIndex = item.id"
          @mouseleave="hoverIndex = null"
          outlined
          hover
          :style="{ backgroundColor: item.color }"
          :class="{ check: clickedIndex === hoverIndex }"
        >
          <div class="pin-icon">
            <v-icon v-if="hoverIndex === item.id || menuCard === item.id">
              {{ oneIcon.icon + ' ' }}
            </v-icon>
          </div>
          <div class="check-card">
            <v-icon
              v-if="hoverIndex === item.id || menuCard === item.id"
              @click="onclickCheck(item.id)"
            >
              mdi-check-circle
            </v-icon>
          </div>
          <div v-bind="activatorProps" @click="openDialog(item)">
            <div>
              <v-card-text class="title"> {{ item.title }} </v-card-text>
            </div>

            <v-card-text>{{ item.description }}</v-card-text>
          </div>

          <div v-if="hoverIndex === item.id || menuCard === item.id">
            <IconButtons
              @menuStateChanged="changeState(item.id, $event)"
              @updateNotes="updateNotes"
              @updateColor="updateColor"
              :show1="true"
              :hoverIndex="item.id"
              :totalNotes="this.totalNotes"
            />
          </div>
          <div style="height: 48px" v-else></div>
        </v-card>
      </template>
      <DialogBox :note="note" @updateNotes="updateNotes" />
    </v-dialog>
  </div>
</template>

<!-- <template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />

  <div class="flex">
    <v-card class="note-card" v-for="(item, index) in 15" :key="index" :value="item" outlined hover>
      <v-dialog v-model="localDialog" max-width="500" min-height="200">
        <template v-slot:activator="{ props: activatorProps }">
          <div class="pin-icon">
            <v-icon> mdi-pin-outline </v-icon>
          </div>
          <div
            style="display: flex; justify-content: space-between"
            v-bind="activatorProps"
            @click="openDialog(item, index)"
          >
            <v-card-title class="title"> {{ item }}</v-card-title>
          </div>
          <div class="check-card">
            <v-icon> mdi-check-circle </v-icon>
          </div>
          <v-card-text>{{ index }}</v-card-text>
        </template>
        <DialogBox :note="item" :id="index" :description="index" @closeDialog="closeDialog" />
      </v-dialog>
      <div>
        <IconButtons
          @menuStateChanged="changeState(index, $event)"
          @updateNotes="updateNotes"
          :show1="true"
          :hoverIndex="index"
          :totalNotes="this.totalNotes"
        />
      </div>
      <div style="height: 48px"></div>
    </v-card>
  </div>
</template> -->

<style>
.title {
  font-weight: 600 !important;
}
.check-card {
  position: absolute;
  left: -10px;
  top: -10px;
  z-index: 1;
  overflow: visible;
}
.check {
  border: 3px solid black !important;
}

.icon-buttons {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none;
}

.note-card {
  width: 230px;
  height: fit-content;
  border: 1px solid rgb(223, 221, 221);
  border-radius: 10px;
  overflow: visible !important;
}
/* 
.note-card:hover .icon-buttons {
  display: inline;
}*/
/* .note-card:hover {
  box-shadow: 0px 1px 5px 0px rgb(144, 144, 144);
} */

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 3%;
  width: fit-content;
}

.pin-icon {
  float: right;
}

.pin-icon.show {
  display: inline;
}
.v-input--plain-underlined.v-text-field .v-input__details {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none !important;
  margin-left: 0px !important;
  padding-left: 0px !important;
  border: 1px solid rgb(206, 206, 206) !important;
}
.v-card .v-card-text {
  min-height: 30px;
}
.v-overlay__scrim {
  background-color: none !important;
}
</style>
