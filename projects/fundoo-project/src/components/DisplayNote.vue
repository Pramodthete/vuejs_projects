<script>
import IconButtons from './IconButtons.vue'
import SnackBar from './SnackBar.vue'
import { getNotesList } from '@/services/noteServices'

export default {
  components: { SnackBar, IconButtons },
  data: () => ({
    show1: false,
    picker: null,
    pickColor: false,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    pin: false,
    totalNotes: [],
    componentKey: 0, // Add componentKey here
    reminders: [
      { title: 'Tomorrow', time: '8:00 PM', icon: '', c: false },
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
      { title: 'Copy to Google Docs', action: () => console.log('clicked') },
      { title: 'Version history', action: () => console.log('clicked') }
    ]
  }),
  mounted() {
    this.responseData()
  },
  methods: {
    responseData() {
      const token = localStorage.getItem('loginToken')
      getNotesList(token)
        .then((res) => {
          this.totalNotes = res.data.data.data
          this.snackbarText = 'Get All Notes Successfully!!'
          this.snackbar = true
          this.componentKey++ // Increment the componentKey to force re-render
          console.log(this.totalNotes)
        })
        .catch((error) => {
          this.snackbarText = 'Error in Axios req-res!!'
          this.snackbar = true
          console.log(error)
        })
    },
    increaseCount() {
      this.$emit('increaseCount')
    },
    deleteNote(id) {
      this.$emit('delete-note', id)
    }
  }
}
</script>

<template>
  <SnackBar />
  <div class="flex" :key="componentKey">
    <!-- Bind componentKey here -->
    <v-card class="note-card" v-for="(item, index) in totalNotes" :key="index" outlined>
      <v-card-title>
        {{ item.title }}
        <v-icon style="float: right">mdi-pin-outline</v-icon>
      </v-card-title>
      <v-card-text>{{ item.description }}</v-card-text>
      <v-card-actions>
        <IconButtons
          :componentKey="componentKey"
          :show1="true"
          :open="false"
          class="icon-buttons"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 5%;
  width: fit-content;
}
.icon-buttons {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none;
  border: 1px solid gray;
}

.note-card {
  width: 300px;
}

.note-card:hover .icon-buttons {
  display: block;
}
</style>
