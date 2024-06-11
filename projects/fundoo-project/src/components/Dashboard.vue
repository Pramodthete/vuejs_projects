<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    show1: false,
    items: [
      { title: 'Notes', value: 'foo', icon: 'mdi-lightbulb-outline' },
      { title: 'Reminders', value: 'bar', icon: 'mdi-bell-outline' },
      { title: 'Edit lables', value: 'fizz', icon: 'mdi-pencil-outline' },
      { title: 'Archive', value: 'buzz', icon: 'mdi-archive-arrow-down-outline' },
      { title: 'Trash', value: 'tuzz', icon: 'mdi-trash-can-outline' }
    ],
    icons: [
      {
        icon: 'mdi-checkbox-outline',
        action: () => console.log('checked clicked')
      },
      { icon: 'mdi-brush-outline', action: () => console.log('Brush clicked') },
      { icon: 'mdi-image-outline', action: () => console.log('Images clicked') }
    ],
    oneIcon: [{ icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') }]
  }),

  watch: {
    group() {
      this.drawer = true
    }
  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon
          style="color: gray"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

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

        <!-- <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template> -->
        <div class="btn-3">
          <v-btn icon="mdi-refresh" variant="text"></v-btn>

          <!-- <v-btn icon="mdi-view-grid-outline" variant="text"></v-btn> -->
          <v-btn icon="mdi-view-agenda-outline" variant="text"></v-btn>
          <v-btn icon="mdi-cog-outline" variant="text"></v-btn>
        </div>

        <!-- <img src="../assets/svgs/apps.svg" alt="" /> -->
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
        rail
        permanent
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

      <v-main class="box">
        <v-card-text>
          <div class="inputs">
            <v-text-field
              id="title"
              placeholder="Title"
              density="default"
              variant="solo"
              v-on:click="show1 = !show1"
            >
              <template v-slot:append-inner>
                <v-icon
                  :class="['input-inner-icon', `icon-${index}`]"
                  v-for="(item, index) in !show1 ? icons : oneIcon"
                  :key="index"
                  @click="item.action"
                >
                  {{ item.icon }}
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              id="note"
              placeholder="Take a Note ..."
              density="default"
              variant="solo"
              v-if="show1"
            ></v-text-field>
            <div class="Bet" v-if="show1">
              <div>
                <v-btn icon="mdi-bell-plus-outline" variant="text"></v-btn>
                <v-btn icon="mdi-account-plus" variant="text"></v-btn>
                <v-btn icon="mdi-palette-outline" variant="text"></v-btn>
                <v-btn icon="mdi-image-outline" variant="text"></v-btn>
                <v-btn icon="mdi-archive-arrow-down-outline" variant="text"></v-btn>
                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
              </div>
              <div>
                <b><v-btn title="Close" variant="text"></v-btn></b>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-main>
    </v-layout>
    <div class="flex">
      <div class="size">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a! Rem excepturi provident
        quibusdam animi vel eius qui obcaecati in nihil doloribus, rerum quis repudiandae nulla
        corporis laboriosam, id expedita!
      </div>
      <div class="size">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo pariatur iste earum adipisci
        optio consequatur nihil cumque fugiat accusamus odio nobis, aut corrupti veniam blanditiis
        nemo molestias quis quas eaque.
      </div>
      <div class="size">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quia obcaecati atque dolor
        blanditiis sit iste nulla aut, modi officiis quo velit reiciendis doloribus dolores delectus
        minus natus ducimus cumque?
      </div>
    </div>
  </v-card>
</template>

<style scoped>
/* .all {
  color: gray;
} */
.flex {
  display: flex;
  justify-content: space-evenly;

  margin-top: -290px;
}

.size {
  width: 200px;
  height: 150px;
  box-shadow: 0px 5px 5px;
  padding: 1%;
}

.search {
  width: 700px;
  border-radius: 5px;
  border: none;
  background-color: rgb(243, 242, 242);
  box-shadow: none;
}
.search:focus {
  background-color: white;
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
.box {
  display: flex;
  justify-content: start;
  align-items: center;
  height: fit-content;
}
.inputs {
  width: 600px;
  height: 500px;
}
:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
}
#title,
#note {
}
.Bet {
  display: flex;
  justify-content: space-between;
  color: gray;
}
</style>
