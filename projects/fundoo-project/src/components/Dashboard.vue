<script>
import SnackBar from './SnackBar.vue'
export default {
  components: { SnackBar },

  data: () => ({
    drawer: true,
    group: null,
    show1: false,
    openRail: true,
    menu: false,
    snackbar: false,
    snackbarText: '',
    flex: false,
    back: true,
    selectedIndex: 0,
    trashNotes: [],
    flag: { name: '', noteFlag: false },
    items: [
      { title: 'Notes', value: 'notes', icon: 'mdi-lightbulb-outline' },
      { title: 'Reminders', value: 'reminders', icon: 'mdi-bell-outline' },
      { title: 'Edit lables', value: 'lables', icon: 'mdi-pencil-outline' },
      { title: 'Archive', value: 'archived', icon: 'mdi-archive-arrow-down-outline' },
      { title: 'Trash', value: 'trash', icon: 'mdi-trash-can-outline' }
    ]
  }),
  methods: {
    onRail() {
      this.openRail = !this.openRail
      // @click.stop="drawer = !drawer"
    },
    dataChange(item, index) {
      this.selectedIndex = index
      if (item === 'trash') {
        this.$router.push({ name: 'getAllTrashNotes' })
      } else if (item === 'notes') {
        this.$router.push({ name: 'getAllNotes' })
      } else if (item === 'archived') {
        this.$router.push({ name: 'getAllArchivedNotes' })
      } else {
        console.log('else')
      }
    },
    onflexNotes() {
      this.flex = !this.flex
      console.log(this.flex)
    }
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
        <v-toolbar-title id="title">Keep</v-toolbar-title>

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
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        expand-on-hover
        :rail="openRail"
      >
        <v-list class="back-color">
          <v-list-item
            class="back-color"
            v-for="(item, index) in items"
            :id="index"
            :key="index"
            :title="item.title"
            :value="item.value"
            :class="{ 'active-item': selectedIndex === index }"
            @click="dataChange(item.value, index)"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" variant="text"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <div class="default" :class="{ 'drawer-open noteinput': !openRail }">
      <RouterView :trashNotes="trashNotes" :flag="flag" />
    </div>
  </v-card>
</template>

<style scoped>
.default {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* margin-left: 100px; */
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
    /* margin-right: 200px; */
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
  font-size: x-large;
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
.active-item {
  background-color: #feefc3 !important;
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
/* .v-list-item--one-line {
  border: 1px solid black;
  border-radius: 200px;
} */
/* .v-list-item--density-default:not(.v-list-item--nav) {
  border: 1px solid black;
  border-radius: 20px;
} */
/* .v-list-item::after {
  border: 1px solid black;
  border-radius: 20px;
} */
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
</style>
