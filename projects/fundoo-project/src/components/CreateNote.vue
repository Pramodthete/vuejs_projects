<script>
import SnackBar from './SnackBar.vue'
import IconButtons from './IconButtons.vue' // Correctly import IconButtons

export default {
  components: {
    SnackBar,
    IconButtons // Register IconButtons component
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show1: false,
    picker: null,
    pickColor: false,
    menu: false,
    file: null,
    imageUrl: null,
    snackbar: false,
    snackbarText: '',
    title: '',
    description: '',
    pin: false,
    icons: [
      { icon: 'mdi-checkbox-outline', action: () => console.log('checked clicked') },
      { icon: 'mdi-brush-outline', action: () => console.log('Brush clicked') },
      { icon: 'mdi-image-outline', action: () => console.log('Images clicked') }
    ],
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Brush clicked') }
  }),
  methods: {
    updateShow1(newValue) {
      this.title = null
      this.description = null
      this.show1 = newValue
    }
  },
  computed: {
    form() {
      return {
        title: this.title,
        title: this.description
      }
    },
    isFormValid() {
      return (
        this.title &&
        this.password &&
        this.rules.title.every((rule) => rule(this.title) === true) &&
        this.rules.description.every((rule) => rule(this.description) === true)
      )
    }
  }
}
</script>

<template>
  <div class="fit">
    <div class="inputs">
      <v-text-field
        class="inputBox"
        placeholder="Title"
        density="compact"
        variant="plain"
        v-if="show1"
        v-model="title"
      >
        <template v-slot:append-inner>
          <v-icon v-if="!pin" @click="pin = !pin">
            {{ oneIcon.icon }}
          </v-icon>
          <v-icon v-if="pin" @click="pin = !pin">
            {{ twoIcon.icon }}
          </v-icon>
        </template>
      </v-text-field>
      <v-textarea
        class="inputBox"
        placeholder="Take a Note ..."
        density="compact"
        variant="plain"
        row-height="15"
        auto-grow
        rows="1"
        v-model="description"
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
        </template>
      </v-textarea>
      <IconButtons
        :show1="show1"
        @update:show1="updateShow1"
        :title="title"
        :description="description"
      />
    </div>
    <div>
      <div class="d-flex justify-space-around" v-if="menu"></div>
    </div>
  </div>
</template>

<style scoped>
.fit {
  width: fit-content;
  padding-left: 0%;
  padding-top: 2%;
}
.inputs {
  width: 100%;
  min-width: 500px;
  position: relative;
  height: fit-content;
  box-shadow: 0px 1px 4px 1px gray;
  background-color: white;
  padding: 1%;
  border-radius: 5px;
  padding-top: -4px;
}

.inputBox {
  height: 33px;
}

:deep(.input-inner-icon) {
  cursor: pointer;
  margin-left: 30px;
}
</style>
