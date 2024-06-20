<script>
import DisplayNote from './DisplayNote.vue'
import { getArchivedNotes } from '@/services/noteServices'

export default {
  data: () => ({
    archivedNotes: [],
    snackbar: false,
    snackbarText: '',
    showPin: false,
    archived: false
  }),
  components: {
    DisplayNote
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      const token = localStorage.getItem('loginToken')
      getArchivedNotes(token)
        .then((res) => {
          console.log(res.data.data.data)
          this.archivedNotes = res.data.data.data.reverse()
          this.snackbarText = 'Trash Data Fetched'
          this.snackbar = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateNotesInArchived() {
      this.dataChange()
    },
    deleted() {
      this.dataChange()
    }
  }
}
</script>

<template>
  <div style="margin-top: -7%">
    <DisplayNote
      :showPinA="false"
      :archived="archived"
      @updateNotesInArchived="updateNotesInArchived"
      @updateNotes="updateNotesInArchived"
      @updateColor="updateNotesInArchived"
      :totalNotes="archivedNotes"
    />
  </div>
</template>

<style></style>
