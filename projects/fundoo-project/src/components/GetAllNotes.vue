<script>
import CreateNote from './CreateNote.vue'
import DisplayNote from './DisplayNote.vue'
import { getNotesList } from '@/services/noteServices'
export default {
  data: () => ({
    totalNotes: []
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
      getNotesList()
        .then((res) => {
          this.totalNotes = res.data.data.data.reverse()
          this.snackbarText = 'Get All Notes Successfully!!'
          this.snackbar = true
          console.log(this.totalNotes)
        })
        .catch((error) => {
          this.snackbarText = 'Error in Axios req-res!!'
          this.snackbar = true
          console.log(error)
        })
    },
    updateNotes() {
      this.responseData()
    },
    filteredData(data) {
      this.totalNotes = data
    }
  }
}
// call api
// parent to child data sharing for display note
</script>

<template>
  <CreateNote @updateNotes="updateNotes" />
  <DisplayNote :totalNotes="totalNotes" @updateData="filteredData" @updateNotes="updateNotes" />
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
