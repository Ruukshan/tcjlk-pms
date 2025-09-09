<template>
  <v-dialog
    :model-value="modelValue"
    :max-width="maxWidth"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-center">
        <v-icon :color="iconColor" size="large">{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text class="text-center">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn block :color="iconColor" @click="$emit('close')"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  icon: {
    type: String,
    default: "mdi-information",
  },
  iconColor: {
    type: String,
    default: "primary",
  },
  maxWidth: {
    type: [String, Number],
    default: 400,
  },
});
const emit = defineEmits(["update:modelValue", "close"]);
</script>
