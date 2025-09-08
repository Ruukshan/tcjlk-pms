<template>
  <div class="navbar">
    <button class="back-btn" @click="goBack">
      ←
    </button>
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String,
      default: "Material Receipt"
    }
  },
  methods: {
    goBack() {
      // Go back to previous page
      window.history.back();
    }
  }
};
</script>