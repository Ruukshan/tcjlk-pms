<template>
  <v-app-bar app density="compact" color="primary" prominent>
    <v-btn icon variant="text" @click="goBack">
      <v-icon color="white">mdi-arrow-left</v-icon>
    </v-btn>
    <v-app-bar-title class="centered-title">{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String,
      default: "Material Receipt",
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
.centered-title {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>

