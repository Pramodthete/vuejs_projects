<script>
import IconButtons from './IconButtons.vue'
import SnackBar from './SnackBar.vue'

export default {
  components: { SnackBar, IconButtons },
  props: {
    totalNotes: Array
  },
  data: () => ({
    show1: false,
    menu: false,
    snackbar: false,
    snackbarText: '',
    pin: true,
    hoverIndex: null,
    componentKey: 0,
    oneIcon: { icon: 'mdi-pin-outline', action: () => console.log('Brush clicked') },
    twoIcon: { icon: 'mdi-pin', action: () => console.log('Brush clicked') }
  }),
  emits: ['updateData', 'dialogbox'],
  methods: {
    openDialog(id) {
      console.log(id)
      this.$emit('dialogbox', id)
      console.log('-----------')
    },
    updateNotes(data) {
      console.log('In Update+====>', data)
      this.$emit('updateData', data)
    }
  }
}
</script>

<template>
  <SnackBar />
  <div class="flex">
    <v-card
      class="note-card"
      v-for="item in totalNotes"
      :key="item.id"
      @mouseover="hoverIndex = item.id"
      @mouseleave="hoverIndex = null"
      @click="openDialog(item.id)"
      outlined
    >
      <v-card-title>
        {{ item.title }}
        <v-icon class="pin-icon" v-if="hoverIndex === item.id && pin" @click="pin = !pin">
          {{ oneIcon.icon + ' ' }}
        </v-icon>
        <v-icon class="pin-icon" v-else-if="!pin && hoverIndex === item.id" @click="pin = !pin">
          {{ twoIcon.icon }}
        </v-icon>
      </v-card-title>
      <v-card-text>{{ item.description }}</v-card-text>
      <v-card-actions style="height: 30px">
        <IconButtons
          @updateNotes="updateNotes"
          :show1="hoverIndex === item.id"
          :hoverIndex="item.id"
          :totalNotes="this.totalNotes"
          class="icon-buttons"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 5%;
  width: fit-content;
}
.icon-buttons {
  display: none;
}
.v-card--variant-elevated {
  box-shadow: none;
}

.note-card {
  width: 300px;
  min-height: 150px;
  border: 1px solid rgb(223, 221, 221);
  border-radius: 10px;
}

.note-card:hover .icon-buttons {
  display: inline;
}
.note-card:hover {
  box-shadow: 1px 3px 10px rgb(223, 221, 221);
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 5%;
  width: fit-content;
}

.pin-icon {
  float: right;
  display: none;
}

.pin-icon.show {
  display: inline;
}
</style>
