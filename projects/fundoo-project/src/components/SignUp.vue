<script>
export default {
  methods: {}
}
</script>

<template>
  <v-card class="mx-auto" width="650">
    <v-img :aspect-ratio="16 / 9" src="https://cdn.vuetifyjs.com/images/cards/house.jpg" cover>
    </v-img>
    <v-card-title class="flex-column align-start">
      <div class="text-h4 mb-2">Welcome Home...</div>
      <div class="text-h6 font-weight-regular text-grey">Monday, 12:30 PM, Mostly Sunny</div>
      <div class="d-flex align-center">
        <v-avatar class="me-4" size="24">
          <v-img src="https://cdn.vuetifyjs.com/images/weather/part-cloud-48px.png" contain></v-img>
        </v-avatar>

        <span class="text-body-2 text-grey">81° / 62°</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<style scoped></style>
