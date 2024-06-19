<script>
import IconButtons from './IconButtons.vue'
import { addLabels } from '../services/labelService'

export default {
  data() {
    return {
      dialog: false,
      pin: true,
      noteTitle: this.note?.title,
      noteDescription: this.note?.description,
      noteId: this.note?.id,
      noteColor: this.note?.color,
      snackbar: false,
      snackbarText: '',
      label: '',
      oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin outline clicked') },
      twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
    }
  },
  props: {
    note: Object
  },
  components: {
    IconButtons
  },
  methods: {
    close() {
      this.dialog = false

      this.$emit('dialogC', this.dialog)
    },
    saveLabel() {
      const userId = localStorage.getItem('userId')
      console.log('save label in')

      const data = {
        label: this.label,
        isDeleted: true,
        userId: userId
      }
      addLabels(data)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <v-card class="card">
    <h4 style="font-weight: bold; color: black">Edit Labels</h4>

    <v-text-field
      prepend-icon=""
      placeholder="Create new label"
      variant="underlined"
      v-model="label"
      @click="pin = false"
    >
      <template v-slot:append>
        <v-icon v-if="!pin" @click="saveLabel"> mdi-check </v-icon>
      </template>
      <template v-slot:prepend>
        <v-icon v-if="!pin" @click="pin = true"> mdi-close </v-icon>
        <v-icon v-else>mdi-plus-circle-outline</v-icon>
      </template>
    </v-text-field>
    <br />
    <v-divider></v-divider>
    <div></div>
    <div style="display: flex; justify-content: space-between">
      <v-card-actions class="right-done">
        <v-btn text="Done" id="done" variant="plain" @click="close()">Done</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped>
#done {
  margin-left: 300%;
}

#done {
  text-transform: capitalize;
  float: right;
}
.card {
  border: 1px solid rgb(231, 231, 231);
  border-radius: 200px;
  padding-left: 12px !important;
  padding-right: 12px !important;
  padding: 2%;
}
</style>
