<script>
import IconButtons from './IconButtons.vue'
import { updateNotes } from '@/services/noteServices'

export default {
  data() {
    return {
      dialog: false,
      pinD: this.pin,
      noteTitle: this.note?.title,
      noteDescription: this.note?.description,
      noteId: this.note?.id,
      noteColor: this.note?.color,
      snackbar: false,
      snackbarText: '',
      oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin outline clicked') },
      twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
    }
  },
  props: {
    note: Object,
    pin: Boolean
  },
  components: {
    IconButtons
  },
  methods: {
    close() {
      this.dialog = false
      console.log('close+++++++++++++')

      this.$emit('dialogC', this.dialog)
      const data = {
        noteId: this.noteId,
        title: this.noteTitle,
        description: this.noteDescription
      }

      if (this.noteTitle !== this.title || this.noteDescription !== this.description) {
        if (this.noteTitle !== '' || this.noteDescription !== '') {
          updateNotes(data)
            .then((res) => {
              console.log(res)
              this.$emit('updateNotes')
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.snackbarText = 'Cannot Update Empty Note ..'
          this.snackbar = true
        }
      } else {
        this.snackbarText = 'Data is not Edited ..'
        this.snackbar = true
      }
    },
    removeLabel() {
      this.$emit('removeLabel')
    }
  },
  moonted() {
    this.pinD = this.$props.pin
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <v-card class="card" :style="{ backgroundColor: noteColor }">
    <div style="display: inline; justify-content: space-between">
      <v-textarea
        class="inputBox"
        placeholder="Title"
        density="compact"
        variant="plain"
        row-height="15"
        auto-grow
        rows="1"
        v-model="noteTitle"
      >
        <template v-slot:append-inner>
          <v-icon v-if="!pinD" @click="pinD = !pinD">
            {{ oneIcon.icon }}
          </v-icon>
          <v-icon v-if="pinD" @click="pinD = !pinD">
            {{ twoIcon.icon }}
          </v-icon>
        </template>
      </v-textarea>
      <v-textarea
        class="inputBox"
        placeholder="Take a Note ..."
        density="compact"
        variant="plain"
        row-height="15"
        auto-grow
        rows="1"
        v-model="noteDescription"
        @click="show1 = true"
      ></v-textarea>
    </div>
    <span
      v-for="l in note.labels"
      style="
        background: rgba(0, 0, 0, 0.1);
        margin-left: 10px;
        padding: 5px;
        font-size: x-small;
        border-radius: 20px;
        width: fit-content;
        display: flex !important;
      "
      >{{ l.label }} <v-icon @click="removeLabel(l.id)">mdi-close</v-icon></span
    >
    <div style="display: flex; justify-content: space-between">
      <div>
        <IconButtons :show1="true" />
      </div>
      <v-card-actions>
        <v-btn text="Close" variant="plain" @click="close()">Close</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped>
.inputBox {
  white-space: pre-wrap;
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-height: 7.2em;
  word-break: break-word;
}
.card {
  border: 1px solid rgb(231, 231, 231);
  border-radius: 200px;
  padding-left: 12px;
  padding-right: 12px;
}
</style>
