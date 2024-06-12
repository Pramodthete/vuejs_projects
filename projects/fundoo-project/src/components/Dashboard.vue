<script>
import SnackBar from './SnackBar.vue'
export default {
  components: { SnackBar },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    show1: false,
    openRail: true,
    picker: null,
    pickColor: false,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    pin: false,
    items: [
      { title: 'Notes', value: 'foo', icon: 'mdi-lightbulb-outline' },
      { title: 'Reminders', value: 'bar', icon: 'mdi-bell-outline' },
      { title: 'Edit lables', value: 'fizz', icon: 'mdi-pencil-outline' },
      { title: 'Archive', value: 'buzz', icon: 'mdi-archive-arrow-down-outline' },
      { title: 'Trash', value: 'tuzz', icon: 'mdi-trash-can-outline' }
    ],
    reminders: [
      { title: 'Tommarow', time: '8:00 PM', icon: '', c: false },
      { title: 'Next week', time: 'Mon, 8:00 PM', icon: '', c: false },
      { title: 'Home', time: 'Pune', icon: '', c: false },
      { title: 'Work', time: 'Govandi, Mumbai', icon: '', c: false },
      { title: 'Pick a date & time', time: '', icon: 'mdi-clock-outline', c: true },
      { title: 'Pick a place', time: '', icon: 'mdi-map-marker', c: true }
    ],
    notesOptions: [
      { title: 'Delete Note', action: () => console.log('clicked') },
      { title: 'Add Label', action: () => console.log('clicked') },
      { title: 'Add Drawing', action: () => console.log('clicked') },
      { title: 'Make a copy', action: () => console.log('clicked') },
      { title: 'Show Checkboxes', action: () => console.log('clicked') },
      { title: 'Copy to google docs', action: () => console.log('clicked') },
      { title: 'Version history', action: () => console.log('clicked') }
    ],
    icons: [
      {
        icon: 'mdi-checkbox-outline',
        action: () => console.log('checked clicked')
      },
      { icon: 'mdi-brush-outline', action: () => console.log('Brush clicked') },
      { icon: 'mdi-image-outline', action: () => console.log('Images clicked') }
    ],
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Brush clicked') }
  }),
  methods: {
    onRail() {
      this.openRail = !this.openRail
      // @click.stop="drawer = !drawer"
    },
    close() {
      this.show1 = !this.show1
    },
    clickOutside() {
      this.show1 = false
    },
    previewImage() {
      const file = this.file
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageUrl = e.target.result
        }
        this.$refs.fileInput.click()
        reader.readAsDataURL(file)
      }
    },
    snackMsg() {
      this.snackbarText = 'note achived'
      this.snackbar = true
    },
    editNote(id) {
      this.$emit('edit-note', id)
    },
    deleteNote(id) {
      this.$emit('delete-note', id)
    }
  },

  watch: {
    group() {
      this.drawer = true
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
          <v-btn icon="mdi-view-agenda-outline" variant="text"></v-btn>
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
        v-model="onRail"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        expand-on-hover
        :rail="openRail"
      >
        <v-list class="back-color">
          <v-list-item
            v-for="(item, index) in items"
            :id="index"
            :key="index"
            :title="item.title"
            :value="item.value"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" variant="text"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="">
        <div class="inputs">
          <v-text-field
            class="inputBox"
            placeholder="Title"
            density="compact"
            variant="plain"
            v-if="show1"
            ><template v-slot:append-inner>
              <v-icon v-if="!pin" @click="pin = !pin">
                {{ oneIcon.icon }}
              </v-icon>
              <v-icon v-if="pin" @click="pin = !pin">
                {{ twoIcon.icon }}
              </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            class="inputBox"
            placeholder="Take a Note ..."
            density="compact"
            variant="plain"
            @click="show1 = true"
          >
            <template v-slot:append-inner>
              <v-icon
                :class="['input-inner-icon', `icon-${index}`]"
                v-for="(item, index) in !show1 ? icons : ''"
                :key="index"
                @click=""
              >
                {{ item.icon }}
              </v-icon>
            </template></v-text-field
          >
          <div class="Bet" v-if="show1">
            <div class="innerBet">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="font"
                    @click="menu = !menu"
                    icon="mdi-bell-plus-outline"
                    variant="text"
                    v-bind="props"
                  >
                  </v-btn>
                </template>
                <v-list>
                  <label style="margin-left: 5%" for="Reminder">Reminder:</label>
                  <v-list-item
                    style="width: 300px"
                    v-for="(item, index) in reminders"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title class="font-menu">
                      <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                      <p style="float: right">{{ item.time }}</p></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn class="font" icon="mdi-account-plus" variant="text"></v-btn>
              <v-btn
                class="font"
                icon="mdi-palette-outline"
                v-on:click="pickColor = !pickColor"
                variant="text"
              >
              </v-btn>
              <v-btn class="font" icon="mdi-image-outline" variant="text">
                <v-file-input
                  v-model="file"
                  label="Upload Image"
                  prepend-icon="mdi-image-outline"
                  accept="image/*"
                  @change="previewImage"
                  hide-input
                ></v-file-input>
              </v-btn>
              <v-btn
                class="font"
                @click="snackMsg"
                icon="mdi-archive-arrow-down-outline"
                variant="text"
              ></v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="font bell-plus"
                    @click="menu = !menu"
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  >
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    style="width: 200px"
                    v-for="(item, index) in notesOptions"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title class="font-menu">
                      <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon>{{ ' ' + item.title }}
                      <p style="float: right">{{ item.time }}</p></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div>
              <v-btn id="close" variant="text" @click="close">Close</v-btn>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex justify-space-around pick" v-if="pickColor">
            <v-color-picker v-model="picker" elevation="0"></v-color-picker>
          </div>

          <div class="d-flex justify-space-around" v-if="menu"></div>
        </div>

        <div class="flex">
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <div class="Bet">
                  <div class="innerBet">
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          class="font"
                          @click="menu = !menu"
                          icon="mdi-bell-plus-outline"
                          variant="text"
                          v-bind="props"
                        >
                        </v-btn>
                      </template>
                      <v-list>
                        <label style="margin-left: 5%" for="Reminder">Reminder:</label>
                        <v-list-item
                          style="width: 300px"
                          v-for="(item, index) in reminders"
                          :key="index"
                          :value="index"
                        >
                          <v-list-item-title class="font-menu">
                            <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon
                            >{{ ' ' + item.title }}
                            <p style="float: right">{{ item.time }}</p></v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-btn class="font" icon="mdi-account-plus" variant="text"></v-btn>
                    <v-btn
                      class="font"
                      icon="mdi-palette-outline"
                      v-on:click="pickColor = !pickColor"
                      variant="text"
                    >
                    </v-btn>
                    <v-btn class="font" icon="mdi-image-outline" variant="text">
                      <v-file-input
                        v-model="file"
                        label="Upload Image"
                        prepend-icon="mdi-image-outline"
                        accept="image/*"
                        @change="previewImage"
                        hide-input
                      ></v-file-input>
                    </v-btn>
                    <v-btn
                      class="font"
                      @click="snackMsg"
                      icon="mdi-archive-arrow-down-outline"
                      variant="text"
                    ></v-btn>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          class="font bell-plus"
                          @click="menu = !menu"
                          icon="mdi-dots-vertical"
                          variant="text"
                          v-bind="props"
                        >
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          style="width: 200px"
                          v-for="(item, index) in notesOptions"
                          :key="index"
                          :value="index"
                        >
                          <v-list-item-title class="font-menu">
                            <v-icon v-show="item.c"> {{ item.icon + ' ' }} </v-icon
                            >{{ ' ' + item.title }}
                            <p style="float: right">{{ item.time }}</p></v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <div>
                    <v-btn id="close" variant="text" @click="close">Close</v-btn>
                  </div>
                </div>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ipsum nam
                aliquam esse, similique perspiciatis at, voluptatem animi repudiandae quaerat
                voluptate veniam ea veritatis quo deserunt repellendus. Porro, eum
                ipsam?</v-card-title
              >
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo hi bye bye</v-card-title>
              <v-card-text
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus voluptas,
                aspernatur deserunt excepturi harum asperiores laudantium, pariatur beatae incidunt
                molestias optio aperiam tenetur voluptatem explicabo, sint at ut! Sapiente,
                repudiandae?</v-card-text
              >
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eveniet similique
                alias, consequatur libero sit culpa velit laboriosam nam minima, corrupti modi in
                repellendus quis veniam. Fuga omnis maiores incidunt.</v-card-text
              >
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="size">
            <v-card class="note-card" outlined>
              <v-card-title>Helo</v-card-title>
              <v-card-text>Boy</v-card-text>
              <v-card-actions>
                <v-btn icon="mdi-pencil" @click="editNote(note.id)"></v-btn>
                <v-btn icon="mdi-delete" @click="deleteNote(note.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </v-layout>
  </v-card>
</template>

<style scoped>
/* .all {
  color: gray;
} */

.size {
  width: 250px;
  height: fit-content;
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
.back-color :active {
  background-color: rgb(249, 231, 181);
}
.back-color :focus {
  background-color: rgb(249, 231, 181);
}

.inputs {
  width: 600px;
  height: fit-content;
  position: fixed;
  left: 34%;
  top: 13%;
  box-shadow: 0px 1px 4px 1px gray;
  background-color: white;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 5px;
  z-index: 1;
}
.inputBox {
  border: none;
  box-shadow: none;
  height: 40px;
}
:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
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
  font-size: small;
}
.innerBet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  row-gap: 7px;
  justify-content: space-evenly;
  position: fixed;
  left: 10%;
  top: 32%;
  margin-right: 6%;
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
</style>
