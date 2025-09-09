<template>
  <v-container>
    <v-card color="primary" class="pa-4">
      <v-card-title>
        <NavBar title="Material Receipt" />
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-text-field
                  label="MR Code"
                  :rules="mrCodeRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                  label="Item"
                  :items="items"
                  :rules="itemRules"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Quantity"
                  :rules="quantityRules"
                  type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Quality"
                  :rules="qualityRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="For Final Product"
                  :rules="finalProductRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-textarea
                  label="Remarks"
                  auto-grow
                  rows="2"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Storage Slot"
                  :rules="storageSlotRules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Unit Weight"
                  :rules="unitWeightRules"
                  type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-btn block @click="submit">Production Received</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import NavBar from "../components/Navbar.vue";
import { ref } from "vue";

const form = ref(null);

// Dropdown options
const items = ["Item 1", "Item 2", "Item 3"];

// Validation rules
const mrCodeRules = [v => !!v || "MR Code is required"];
const itemRules = [v => !!v || "Item is required"];
const quantityRules = [v => !!v || "Quantity is required"];
const qualityRules = [v => !!v || "Quality is required"];
const finalProductRules = [v => !!v || "Final Product is required"];
const storageSlotRules = [v => !!v || "Storage Slot is required"];
const unitWeightRules = [v => !!v || "Unit Weight is required"];

const submit = () => {
  if (form.value.validate()) {
    console.log("Form submitted");

  }
};
</script>
