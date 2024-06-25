<script>
import IconButtons from './IconButtons.vue'
import SnackBar from './SnackBar.vue'
import DialogBox from './DialogBox.vue'
import { pinedUnpinednotes } from '@/services/noteServices'
import { removeLabelsOnNote } from '@/services/labelServices'

export default {
  components: { SnackBar, IconButtons, DialogBox },
  props: {
    totalNotes: Array,
    pinedNotes: Array,
    labelsList: Array,
    showPinA: {
      type: Boolean,
      default: true
    },
    flex: {
      type: Boolean,
      default: false
    },
    showPinT: {
      type: Boolean,
      default: true
    },
    showPinR: {
      type: Boolean,
      default: true
    },
    archived: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    show1: false,
    overIndex: '',
    menu: false,
    snackbar: false,
    snackbarText: '',
    pin: false,
    hoverIndex: null,
    updatedColor: '#FFFFFF',
    clickedIndex: null,
    componentKey: 0,
    menuCard: null,
    localDialog: false,
    pinedNotes: [],
    list: [],
    showPin: true,
    note: {},
    check: false,
    description: '',
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Pin-outline clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Pin clicked') }
  }),
  emits: [
    'updateData',
    'closeDialog',
    'updateNotesInArchived',
    'deleted',
    'removeLabel',
    'addLabelToNote'
  ],
  watch: {
    dialog(newVal) {
      this.localDialog = newVal
    }
  },
  methods: {
    openDialog(item) {
      console.log(this.localDialog)
      this.localDialog = true
      this.note = {
        id: item.id,
        title: item.title,
        description: item.description,
        color: item.color,
        labels: item.noteLabels
      }
      console.log(this.note)
      console.log(this.localDialog)
    },
    updateNotes() {
      this.localDialog = false
      this.$emit('updateNotes')
      this.$emit('deleted')
    },
    changeState(noteId, isVisible) {
      this.list = this.$props.labelsList
      this.hoverIndex = null
      this.menuCard = isVisible ? noteId : null
    },
    closeDialog(data) {
      this.localDialog = false
      console.log(data)
    },
    onclickCheck(id) {
      console.log(id)
      this.check = true
      this.clickedIndex = id
    },
    updateColor(item) {
      this.clickedIndex = item.noteIdList[0]
      this.updatedColor = item.color
      this.$emit('updateColor')
    },
    deleted() {
      this.$emit('deleted')
    },
    pinned(item) {
      let pinValue = !item.isPined
      const pinedData = { noteIdList: [item.id], isPined: pinValue }
      pinedUnpinednotes(pinedData)
        .then((data) => {
          this.$emit('updateNotes')
          this.$emit('updateNotesInArchived')
          if (this.$props.pinedNotes === 0) {
            this.showPin = false
          } else {
            this.showPin = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addLabelToNote() {
      this.$emit('addLabelToNote')
    },
    removeLabel(labelId, noteId) {
      console.log(noteId + ' n=======l ' + labelId)
      removeLabelsOnNote(labelId, noteId)
        .then((res) => {
          console.log(res)
          this.$emit('removeLabel')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  mounted() {
    this.list = this.$props.labelsList
    if (this.$props.pinedNotes === 0) {
      this.showPin = false
    } else {
      this.showPin = true
    }
  }
}
</script>

<template>
  <br />
  <div v-if="showPinT && showPinA && showPinR" class="h-text">PINNED</div>
  <div class="flex" v-if="showPinT && showPinA && showPinR">
    <v-dialog v-model="localDialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-card
          class="note-card"
          v-for="item in pinedNotes"
          :key="item.id"
          @mouseover="hoverIndex = item.id"
          @mouseleave="hoverIndex = null"
          outlined
          hover
          :style="{ backgroundColor: item.color }"
          :class="{
            flexClass: this.$props.flex,
            borderCheck: check
          }"
        >
          <div class="pin-icon">
            <v-icon @click="pinned(item)" v-if="hoverIndex === item.id || menuCard === item.id">
              {{ twoIcon.icon }}
            </v-icon>
          </div>
          <div class="check-card">
            <v-icon v-if="hoverIndex === item.id || menuCard === item.id" @click="check = !check">
              mdi-check-circle
            </v-icon>
          </div>
          <div v-bind="activatorProps" @click="openDialog(item)">
            <div>
              <v-card-text>
                <pre class="title">{{ item.title }}</pre>
              </v-card-text>
            </div>

            <v-card-text>
              <pre class="desc">{{ item.description }}</pre>
            </v-card-text>
          </div>
          <span
            @mouseover="overIndex = l.id"
            @mouseleave="overIndex = null"
            v-for="l in item.noteLabels"
            style="
              background: rgba(0, 0, 0, 0.1);
              margin-left: 10px;
              padding: 5px;
              font-size: small;
              border-radius: 20px;
              position: relative;
              overflow: hidden;
            "
            >{{ l.label
            }}<v-icon
              class="remove"
              v-if="overIndex == l.id && hoverIndex == item.id"
              @click="removeLabel(l.id, item.id)"
              >mdi-close</v-icon
            ></span
          >

          <div v-if="hoverIndex === item.id || menuCard === item.id">
            <IconButtons
              @menuStateChanged="changeState(item.id, $event)"
              @changeStateLabel="changeState(item.id, $event)"
              @updateNotes="updateNotes"
              @updateColor="updateColor"
              @deleted="deleted"
              @addLabelToNote="addLabelToNote"
              :show1="true"
              :hoverIndex="item.id"
              :totalNotes="this.totalNotes"
              :labelsLists="this.list"
              :noteLabels="item.noteLabels"
            />
          </div>
          <div style="height: 48px" v-else></div>
        </v-card>
      </template>
      <DialogBox :pin="pin" @removeLabel="removeLabel" :note="note" @updateNotes="updateNotes" />
    </v-dialog>
  </div>

  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />
  <br /><br />
  <div v-if="showPinT && showPinA && showPinR" class="h-text">OTHERS</div>
  <div class="flex">
    <v-dialog v-model="localDialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-card
          class="note-card"
          v-for="item in totalNotes"
          :key="item.id"
          @mouseover="hoverIndex = item.id"
          @mouseleave="hoverIndex = null"
          outlined
          :style="{ backgroundColor: item.color }"
          :class="{ check: clickedIndex === hoverIndex, flexClass: this.$props.flex }"
        >
          <div class="pin-icon">
            <v-icon @click="pinned(item)" v-if="hoverIndex === item.id || menuCard === item.id">
              {{ oneIcon.icon }}
            </v-icon>
          </div>
          <div class="check-card">
            <v-icon
              v-if="hoverIndex === item.id || menuCard === item.id"
              @click="onclickCheck(item.id)"
            >
              mdi-check-circle
            </v-icon>
          </div>
          <div v-bind="activatorProps" @click="openDialog(item)">
            <div>
              <v-card-text>
                <pre class="title">{{ item.title }}</pre>
              </v-card-text>
            </div>

            <v-card-text>
              <pre class="desc">{{ item.description }}</pre>
            </v-card-text>
          </div>
          <span
            v-for="l in item.noteLabels"
            @mouseover="overIndex = l.id"
            @mouseleave="overIndex = null"
            style="
              background: rgba(0, 0, 0, 0.1);
              margin-left: 10px;
              padding: 5px;
              font-size: small;
              border-radius: 20px;
              position: relative;
              overflow: hidden;
            "
            >{{ l.label }}
            <v-icon
              class="remove"
              v-if="overIndex == l.id && hoverIndex == item.id"
              @click="removeLabel(l.id, item.id)"
              >mdi-close</v-icon
            ></span
          >

          <div v-if="hoverIndex === item.id || menuCard === item.id">
            <IconButtons
              @menuStateChanged="changeState(item.id, $event)"
              @changeStateLabels="changeStateLabels(item.id, $event)"
              @updateNotes="updateNotes"
              @updateColor="updateColor"
              @addLabelToNote="addLabelToNote"
              :archived="this.archived"
              :show1="true"
              :hoverIndex="item.id"
              :totalNotes="this.totalNotes"
              :labelsLists="this.list"
              :noteLabels="item.noteLabels"
            />
          </div>
          <div style="height: 48px" v-else></div>
        </v-card>
      </template>
      <DialogBox
        :pin="pin"
        @removeLabel="removeLabel"
        :note="note"
        @dialogC="dialogC"
        @updateNotes="updateNotes"
      />
    </v-dialog>
  </div>
</template>

<style>
.flexClass {
  min-width: 100% !important;
  height: fit-content !important;
  border-radius: 20px !important;
  margin-left: 500px !important;
}
code,
kbd,
pre,
samp {
  font-family: sans-serif !important;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Show only 3 lines */
  overflow: hidden;
  max-height: calc(1.3em * 3); /* Adjust the value to match your line height and number of lines */
  margin-bottom: -25px;
  font-size: larger;
}

.h-text {
  font-size: smaller;
  font-weight: bold;
  color: gray;
  margin-left: 1%;
  margin-bottom: -2%;
}

.check-card {
  position: absolute;
  left: -10px;
  top: -10px;
  z-index: 1;
  overflow: visible;
}
.borderCheck {
  border: 3px solid black !important;
}

.icon-buttons {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none;
}

.note-card {
  width: 230px;
  height: fit-content;
  border: 1px solid rgb(223, 221, 221);
  border-radius: 10px;
  overflow: visible !important;
}

.remove {
  position: absolute !important;
  left: 70%;
  top: 15%;
  background-color: rgba(234, 234, 234);
  border-radius: 20px;
}
/*
.note-card:hover .icon-buttons {
  display: inline;
}*/
/* .note-card:hover {
  box-shadow: 0px 1px 5px 0px rgb(144, 144, 144);
} */

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 3%;
  width: fit-content;
}

.pin-icon {
  float: right;
}

.pin-icon.show {
  display: inline;
}
.v-input--plain-underlined.v-text-field .v-input__details {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none !important;
  margin-left: 0px !important;
  padding-left: 0px !important;
  border: 1px solid rgb(206, 206, 206) !important;
}
.v-card .v-card-text {
  min-height: 30px;
}
.v-overlay__scrim {
  background-color: none !important;
}
/* details,
main {
  display: block;
  width: 1300px;
} */
</style>
