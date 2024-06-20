<script>
import IconButtons from './IconButtons.vue'
import { addLabels, deleteLabels, updateLabels } from '../services/labelService'

export default {
  data() {
    return {
      dialog: false,
      pin: false,
      edit: false,
      update: false,
      snackbar: false,
      snackbarText: '',
      label: '',
      hoverIndex: null,
      clickIndex: null,
      oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin outline clicked') },
      twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
    }
  },
  props: {
    labelsList: []
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

      const data = {
        label: this.label,
        isDeleted: false,
        userId: userId
      }
      addLabels(data)
        .then((data) => {
          console.log(data)
          this.l = this.label
          this.label = null
          this.$emit('updateLabels')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateLabel(index) {
      clickIndex = index
      console.log(index)
    },
    onDelete(id) {
      deleteLabels(id)
        .then((res) => {
          console.log(res)
          this.$emit('updateLabels')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    pined() {
      this.pin = false
      console.log('++++++=====')
    },
    updateOneLabels(label, id) {
      const userId = localStorage.getItem('userId')
      const data = {
        label: label,
        isDeleted: false,
        userId: userId
      }
      updateLabels(data, id)
        .then((res) => {
          console.log(res)
          this.$emit('updateLabels')
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
    <div>
      <h4 style="font-weight: bold; color: black">Edit Labels</h4>

      <v-text-field
        prepend-icon=""
        placeholder="Create new label"
        variant="underlined"
        v-model="label"
      >
        <template v-slot:append>
          <v-icon v-if="pin == true"> mdi-check </v-icon>
        </template>
        <template v-slot:prepend>
          <v-icon v-if="pin == true" @click="pin = false"> mdi-close </v-icon>
          <v-icon v-else @click="pin = true">mdi-plus </v-icon>
        </template>
      </v-text-field>

      <v-card-text>
        <div v-for="label in labelsList">
          <div :key="label.id" :value="label" style="display: flex; justify-content: space-evenly">
            <v-text-field
              variant="plain"
              v-show="true"
              @mouseover="hoverIndex = label.id"
              @click="clickIndex = label.id"
              :model-value="label.label"
              ><template v-slot:append>
                <v-icon
                  v-show="clickIndex === label.id"
                  @click="updateOneLabels(label.label, label.id)"
                  >mdi-check
                </v-icon>
                <v-icon v-show="clickIndex !== label.id"> mdi-pencil </v-icon>
              </template>
              <template v-slot:prepend>
                <v-icon
                  v-show="hoverIndex === label.id || clickIndex === label.id"
                  @click="onDelete(label.id)"
                >
                  mdi-delete
                </v-icon>
                <v-icon v-show="hoverIndex !== label.id && clickIndex !== label.id"
                  >mdi-label
                </v-icon>
              </template>
            </v-text-field>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
    </div>
    <div style="display: flex; justify-content: space-between">
      <v-card-actions class="right-done">
        <v-btn text="Done" id="done" variant="plain" @click="close">Done</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped>
#done {
  margin-left: 300%;
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
