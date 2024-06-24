<script>
import CreateNote from './CreateNote.vue'
import DisplayNote from './DisplayNote.vue'
import { getNotesList } from '@/services/noteServices'

export default {
  props: {
    trashNotes: Array,
    labelsList: Array,
    flex: Boolean
  },
  data: () => ({
    totalNotes: [],
    notes: [],
    pinedNotes: [],
    labels: [],
    snackbar: false,
    snackbarText: ''
  }),
  components: {
    CreateNote,
    DisplayNote
  },
  mounted() {
    this.responseData()
  },
  methods: {
    responseData() {
      const token = localStorage.getItem('loginToken')
      getNotesList(token)
        .then((res) => {
          this.notes = res.data.data.data.reverse()
          this.pinedNotes = this.notes.filter((note) => note.isPined)

          this.totalNotes = this.notes.filter(
            (note) => !note.isDeleted && !note.isArchived && !note.isPined
          )
          this.labels = this.$props.labelsList
          console.log('labels:', this.labels)
          this.snackbarText = 'Fetched All Notes Successfully!!'

          this.snackbar = true

          console.log(this.totalNotes)
        })
        .catch((error) => {
          console.log('Error:', error)
          this.snackbarText = 'Error in Axios request/response!!'
          this.snackbar = true
        })
    },
    updateNotes() {
      this.responseData()
    }
  }
}
</script>

<template>
  <CreateNote @updateNotes="updateNotes" />
  <DisplayNote
    :totalNotes="totalNotes"
    :labelsList="labels"
    :pinedNotes="pinedNotes"
    :flex="flex"
    @removeLabel="updateNotes"
    @updateData="updateNotes"
    @updateColor="updateNotes"
    @updateNotes="updateNotes"
    @addLabelToNote="updateNotes"
  />
</template>

<style scoped>
/* .media {
  display: flex;
  justify-content: center;
  margin-left: 20%;
}
@media screen and (max-width: 800px) {
  .media {
    margin-left: -15%;
  }
} */
/* .v-overlay__scrim {
  background: none !important;
} */
</style>
