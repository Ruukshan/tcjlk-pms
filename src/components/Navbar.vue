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
