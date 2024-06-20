<script>
import SnackBar from './SnackBar.vue'
import EditLabelDialog from './EditLabelDialog.vue'
import { getAllLabels } from '../services/labelService'

export default {
  components: { SnackBar, EditLabelDialog },

  data: () => ({
    drawer: true,
    show1: false,
    openRail: true,
    menu: false,
    snackbar: false,
    snackbarText: '',
    flex: false,
    back: true,
    selectedIndex: 0,
    clickIndex: false,
    trashNotes: [],
    flag: { name: '', noteFlag: false },
    localDialog: false,
    note: '',
    labelsList: [],
    items: [
      { title: 'Notes', value: 'notes', icon: 'mdi-lightbulb-outline' },
      { title: 'Reminders', value: 'reminders', icon: 'mdi-bell-outline' },
      { title: 'Edit labels', value: 'labels', icon: 'mdi-pencil-outline' },
      { title: 'Archive', value: 'archived', icon: 'mdi-archive-arrow-down-outline' },
      { title: 'Trash', value: 'trash', icon: 'mdi-trash-can-outline' }
    ]
  }),

  methods: {
    onRail() {
      this.openRail = !this.openRail
    },
    dataChange(item, index) {
      this.selectedIndex = index
      this.clickIndex = false
      if (item === 'trash') {
        this.$router.push({ name: 'getAllTrashNotes' })
      } else if (item === 'notes') {
        this.$router.push({ name: 'getAllNotes' })
      } else if (item === 'archived') {
        this.$router.push({ name: 'getAllArchivedNotes' })
      } else if (item === 'labels') {
        this.openDialog(item)
      } else if (item === 'reminders') {
        this.$router.push({ name: 'getAllReminders' })
      } else {
        console.log('in label')
      }
    },
    onflexNotes() {
      this.flex = !this.flex
      console.log(this.flex)
    },
    openDialog(item) {
      this.note = item.note || ''
      this.localDialog = true
    },
    updateNotes(updatedNote) {
      this.note = updatedNote
    },
    dialogC(close) {
      this.localDialog = close
    },
    updateLabels(labelsList) {
      console.log('-------', labelsList)
      this.items = [
        { title: 'Notes', value: 'notes', icon: 'mdi-lightbulb-outline' },
        { title: 'Reminders', value: 'reminders', icon: 'mdi-bell-outline' },
        { title: 'Edit labels', value: 'labels', icon: 'mdi-pencil-outline' },
        { title: 'Archive', value: 'archived', icon: 'mdi-archive-arrow-down-outline' },
        { title: 'Trash', value: 'trash', icon: 'mdi-trash-can-outline' }
      ]

      this.items.splice(
        2,
        0,
        ...labelsList.map((label) => ({
          title: label.label,
          value: label.id,
          icon: 'mdi-label-outline'
        }))
      )
      console.log(this.items)
    },
    getLabels() {
      const token = localStorage.getItem('loginToken')
      getAllLabels(token)
        .then((res) => {
          this.labelsList = res.data.data.details.reverse()
          console.log(this.labelsList)
          this.updateLabels(this.labelsList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateLabelsData() {
      this.getLabels()
    }
  },
  mounted() {
    this.getLabels()
  }
}
</script>

<template>
  <SnackBar :snackbar.sync="snackbar" :text="snackbarText" @update:snackbar="snackbar = $event" />

  <v-card>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon style="color: gray" variant="text" @click="onRail"></v-app-bar-nav-icon>

        <img
          class="gb_Oc gb_Pd"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          srcset="
            https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
            https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
          "
          alt=""
          aria-hidden="true"
          role="presentation"
          style="width: 40px; height: 40px"
        />
        <v-toolbar-title id="title">Fundoo</v-toolbar-title>

        <v-card-text>
          <v-text-field
            class="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            density="comfortable"
            variant="plain-filled"
            hide-details
            single-line
          ></v-text-field>
        </v-card-text>

        <v-spacer></v-spacer>

        <div class="btn-3">
          <v-btn icon="mdi-refresh" variant="text"></v-btn>
          <v-btn icon="mdi-view-agenda-outline" @click="onflexNotes" variant="text"></v-btn>
          <v-btn icon="mdi-cog-outline" variant="text"></v-btn>
        </div>

        <div class="btn-avatar">
          <v-btn icon="mdi-apps" variant="text"></v-btn>
          <v-avatar>
            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
        </div>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : 'left'"
        expand-on-hover
        :rail="openRail"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :id="index"
            :key="index"
            :title="item.title || item.label"
            :value="item.value"
            :class="[
              { 'back-color': selectedIndex === index && !clickIndex },
              { clickChange: clickIndex && openRail && drawer && selectedIndex === index }
            ]"
            @mouseover="clickIndex = true"
            @mouseleave="clickIndex = false"
            @click="dataChange(item.value, index)"
          >
            <template v-slot:prepend>
              <v-icon v-if="item.icon" :icon="item.icon" variant="text"></v-icon>
              <v-icon v-else variant="text">mdi-label</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <div class="default" :class="{ 'drawer-open noteinput': !openRail }">
      <RouterView :trashNotes="trashNotes" :flag="flag" />
    </div>

    <!-- Dialog box outside of the v-navigation-drawer to avoid multiple instances -->
    <v-dialog v-model="localDialog" max-width="300">
      <EditLabelDialog
        :note="note"
        @dialogC="dialogC"
        @updateNotes="updateNotes"
        @updateLabels="updateLabelsData"
        :labelsList="labelsList"
      />
    </v-dialog>
  </v-card>
</template>

<style scoped>
.default {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
}
.drawer-open {
  margin-left: 230px;
}
.noteinput {
  max-width: fit-content;
  min-width: 50px;
}
.v-card--variant-elevated {
  box-shadow: none;
  border: none !important;
  display: flex;
  justify-content: end;
  margin-top: 5px;
  margin-left: 20px;
  position: relative;
  background-color: transparent;
  padding-left: 20px;
}

.v-input__control {
  padding-bottom: -12px;
}

@media screen and (max-width: 600px) {
  .drawer-open {
    margin-left: 0px;
  }
  .noteinput {
    margin-left: 0px;
  }
  .search {
    width: 50px;
  }
}

.search {
  width: 700px;
  border-radius: 5px;
  border: none;
  background-color: rgb(243, 242, 242);
  box-shadow: none;
}

#title {
  font-size: large;
  margin-left: 1px;
  color: gray;
}

.btn-3 {
  margin-right: 1.7%;
  color: gray;
}
.btn-avatar {
  color: gray;
}
.back-color {
  background-color: #feefc3 !important;
  border-radius: 40px !important;
}
.clickChange {
  background-color: #feefc3 !important;
  border-radius: 0 !important;
  border-top-right-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
}

#close {
  text-transform: capitalize;
}

.Bet {
  display: flex;
  justify-content: space-between;
  color: rgb(71, 70, 70);
}
.font {
  font-size: smaller;
}
.innerBet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pick {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  z-index: 1;
}
.bell-plus {
  color: rgb(71, 70, 70) !important;
}
.font-menu {
  font-size: 50;
}
.note-card {
  margin: 8px;
  padding: 16px;
  width: 100%;
}
.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
  box-shadow: none;
  border-bottom: 1px solid rgb(218, 217, 217);
}
.v-navigation-drawer--temporary.v-navigation-drawer--active {
  box-shadow: none;
}
details,
main {
  margin-left: 10px;
  display: block;
  margin-top: 60px;
  width: 1300px;
}
.v-input__control {
  padding-bottom: 10px;
}
.v-input--plain-underlined.v-text-field.v-input__details {
  display: none;
}
.v-messages {
  display: none;
}
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline: 16px;
}

.v-navigation-drawer__conten::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.scroll {
  display: inline-block;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid;
  height: 50;
}
</style>
