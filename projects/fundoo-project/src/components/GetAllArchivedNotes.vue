<script>
import DisplayNote from './DisplayNote.vue'
import { getArchivedNotes } from '@/services/noteServices'

export default {
  data: () => ({
    archivedNotes: [],
    snackbar: false,
    snackbarText: ''
  }),
  components: {
    DisplayNote
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      getArchivedNotes()
        .then((res) => {
          console.log(res.data.data.data)
          this.archivedNotes = res.data.data.data.reverse()
          this.snackbarText = 'Trash Data Fetched'
          this.snackbar = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <DisplayNote :totalNotes="archivedNotes" />
</template>

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
  margin-left: 5%;
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
  border: 1px solid rgb(206, 206, 206) !important;
}
.v-card .v-card-text {
  min-height: 30px;
}
.v-overlay__scrim {
  background-color: none !important;
}
</style>
