<script>
export default {
  props: {
    snackbar: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'My timeout is set to 2000.'
    },
    timeout: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    closeSnackbar() {
      this.$emit('update:snackbar', false)
    }
  }
}
</script>

<template>
  <div class="text-center">
    <v-snackbar :model-value="snackbar" :timeout="timeout" @update:model-value="closeSnackbar">
      {{ text }}
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="closeSnackbar">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style></style>
