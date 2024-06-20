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
  <div class="top">
    <div class="inner-div">
      <h3>Notes in Trash are deleted after 7 days.</h3>
      <h3 style="color: blue">Empty Trash</h3>
    </div>
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
.top {
  margin-top: -2%;
}
.inner-div {
  margin-bottom: -2%;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
