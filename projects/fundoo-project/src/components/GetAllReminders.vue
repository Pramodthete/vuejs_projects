<script>
import DisplayNote from './DisplayNote.vue'
import CreateNote from './DisplayNote.vue'
import { getReminders } from '@/services/noteServices'

export default {
  data: () => ({
    remindersNotes: [],
    snackbar: false,
    snackbarText: '',
    showPinR: false
  }),
  components: {
    DisplayNote,
    CreateNote
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      const token = localStorage.getItem('loginToken')
      getReminders(token)
        .then((res) => {
          console.log(res.data.data.data)
          this.remindersNotes = res.data.data.data.reverse()
          this.snackbarText = 'Trash Data Fetched'
          this.snackbar = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateColor() {
      this.dataChange()
    }
  }
}
</script>

<template>
  <div>
    <CreateNote />
    <div style="margin-top: -7%">
      <DisplayNote
        :showPinR="false"
        @updateColor="updateColor"
        :totalNotes="remindersNotes"
      />
    </div>
  </div>
</template>

<style></style>
