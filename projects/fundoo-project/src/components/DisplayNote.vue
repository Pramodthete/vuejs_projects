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
    componentKey: 0,
    menuCard: null,
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin-outline clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
  }),
  emits: ['updateData', 'dialogbox'],
  methods: {
    openDialog(id) {
      console.log(id)
      this.$emit('dialogbox', id)
    },
    updateNotes(data) {
      this.$emit('updateData', data)
    },
    changeState(noteId, isVisible) {
      this.hoverIndex = null
      this.menuCard = isVisible ? noteId : null
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <div class="flex">
    <v-card
      class="note-card"
      v-for="item in totalNotes"
      :key="item.id"
      @click="openDialog(item.id)"
      @mouseover="hoverIndex = item.id"
      @mouseleave="hoverIndex = null"
      outlined
      hover
    >
      <div style="display: flex; justify-content: space-between">
        <v-card-title class="title"> {{ item.title }} </v-card-title>
        <div class="pin-icon">
          <v-icon v-if="hoverIndex === item.id || menuCard === item.id">
            {{ oneIcon.icon + ' ' }}
          </v-icon>
        </div>
      </div>
      <div class="check-card">
        <v-icon v-if="hoverIndex === item.id || menuCard === item.id"> mdi-check-circle </v-icon>
      </div>
      <v-card-text>{{ item.description }}</v-card-text>
      <div v-if="hoverIndex === item.id || menuCard === item.id">
        <IconButtons
          @menuStateChanged="changeState(item.id, $event)"
          @updateNotes="updateNotes"
          :show1="true"
          :hoverIndex="item.id"
          :totalNotes="this.totalNotes"
        />
      </div>
      <div style="height: 48px" v-else></div>
    </v-card>
  </div>
</template>

<style>
.check-card {
  position: absolute;
  left: -10px;
  top: -10px;
  z-index: 1;
  overflow: visible;
}

.icon-buttons {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none;
}

.note-card {
  width: 230px;
  min-height: 150px;
  border: 1px solid rgb(223, 221, 221);
  border-radius: 10px;
  overflow: visible !important;
}
/* 
.note-card:hover .icon-buttons {
  display: inline;
}
.note-card:hover {
  box-shadow: 1px 3px 10px rgb(223, 221, 221);
} */

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 3%;
  width: fit-content;
}

.pin-icon {
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
}

.pin-icon.show {
  display: inline;
}
.v-input--plain-underlined.v-text-field .v-input__details {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none !important;
  border: 1px solid rgb(206, 206, 206) !important;
}
.v-card .v-card-text {
  min-height: 30px;
}
</style>
