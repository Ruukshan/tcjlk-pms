<template>
  <v-container class="pa-4" fluid>
    <v-card class="pa-4">
      <Navbar title="Quality Control 2" />
      <v-spacer></v-spacer>

      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="receipt.mrCode"
                  label="MR Code"
                  :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-select
                  v-model="receipt.item"
                  :items="items"
                  label="Item"
                  :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  v-model="receipt.quantity"
                  label="Quantity"
                  type="number"
                  :rules="[rules.required, rules.number]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  v-model="receipt.quality"
                  label="Quality"
                  :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  v-model="receipt.finalProduct"
                  label="For Final Product"
                  :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                  v-model="receipt.remarks"
                  label="Remarks"
                  auto-grow
                  rows="2"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  v-model="receipt.storageSlot"
                  label="Storage Slot"
                  :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  v-model="receipt.unitWeight"
                  label="Unit Weight"
                  type="number"
                  :rules="[rules.required, rules.number]"
              />
            </v-col>

            <v-col cols="12">
              <v-btn block size="large" @click="submit">
                Production Received
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "@/components/Navbar.vue";
import DialogBox from "@/helper/utils/AppDialog.vue"

const form = ref(null);

const receipt = ref({
  mrCode: "",
  item: "",
  quantity: "",
  quality: "",
  finalProduct: "",
  remarks: "",
  storageSlot: "",
  unitWeight: ""
});

const items = ["Item 1", "Item 2", "Item 3"];

const rules = {
  required: v => !!v || "This field is required",
  number: v => (!isNaN(v) && v > 0) || "Must be a valid number"
};

const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  try {
    await addDoc(collection(db, "materialReceipts"), {
      ...receipt.value,
      quantity: Number(receipt.value.quantity),
      unitWeight: Number(receipt.value.unitWeight),
      createdAt: new Date()
    });

    alert("Material receipt saved successfully!");

    receipt.value = {
      mrCode: "",
      item: "",
      quantity: "",
      quality: "",
      finalProduct: "",
      remarks: "",
      storageSlot: "",
      unitWeight: ""
    };
    form.value.resetValidation();
  } catch (error) {
    console.error("Error saving data: ", error);
    alert("Error saving data");
  }
};
</script>
