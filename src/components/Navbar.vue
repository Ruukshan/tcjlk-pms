<template>
  <v-app-bar app density="compact" color="primary" prominent>
    <v-btn icon variant="text" @click="goBack">
      <v-icon color="white">mdi-arrow-left</v-icon>
    </v-btn>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
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
.navbar {
  display: flex;
  align-items: center;
  background-color: #1a150d;
  color: white;
  padding: 12px 16px;
}

.back-btn {
  font-size: 20px;
  margin-right: 12px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: bold;
}
</style>

