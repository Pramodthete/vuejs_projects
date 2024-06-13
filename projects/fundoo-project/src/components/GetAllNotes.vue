<script setup>
import CreateNote from './CreateNote.vue'
import DisplayNote from './DisplayNote.vue'
</script>

<template>
  <CreateNote class="media" />
  <DisplayNote />
</template>

<style>
@media screen and (max-width: 750px) {
  .media {
    width: 200px;
  }
}
</style>
