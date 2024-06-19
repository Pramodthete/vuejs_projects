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
      const token = localStorage.getItem('loginToken')
      getTrashNotes(token)
        .then((res) => {
          console.log(res.data.data.data)
          this.deletedNotes = res.data.data.data.reverse()
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
  <div style="margin-top: -5%">
    <DisplayNote
      :showPinT="false"
      @achived="updateColor"
      @updateColor="updateColor"
      @deleted="updateColor"
      :totalNotes="deletedNotes"
    />
  </div>
</template>

<style>
.default[data-v-fedac4b6] {
  width: 100%;
}
</style>
