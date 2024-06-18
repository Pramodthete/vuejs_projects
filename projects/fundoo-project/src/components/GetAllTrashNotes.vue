<script>
import DisplayNote from './DisplayNote.vue'
import { getTrashNotes } from '@/services/noteServices'

export default {
  data: () => ({
    deletedNotes: [],
    snackbar: false,
    snackbarText: '',
    showPin: false
  }),
  components: {
    DisplayNote
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      getTrashNotes()
        .then((res) => {
          console.log(res.data.data.data)
          this.deletedNotes = res.data.data.data.reverse()
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
  <DisplayNote :showPinT="false" :totalNotes="deletedNotes" />
</template>

<style>
.default[data-v-fedac4b6] {
  width: 100%;
}
</style>
