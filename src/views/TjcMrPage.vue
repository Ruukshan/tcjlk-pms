<template>
  <v-container class="pa-4" fluid>
    <v-card class="pa-4">
      <Navbar title="Quality Control 2" />
      <v-card-text>
        <v-form ref="form" class="pb-10">
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
              <v-btn block size="large" @click="submit" :loading="loading">
                Production Received
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <DialogBox
        v-model="dialog"
        :title="dialogTitle"
        :message="dialogMessage"
        :icon="dialogIcon"
        :icon-color="dialogColor"
        @close="dialog = false"
    />
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "@/components/Navbar.vue";
import DialogBox from "@/helper/utils/AppDialog.vue";

const form = ref(null);
const loading = ref(false);
const dialog = ref(false);
const dialogTitle = ref("");
const dialogMessage = ref("");
const dialogIcon = ref("mdi-information");
const dialogColor = ref("primary");

const receipt = reactive({
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
  loading.value = true;

  const isValid = form.value.validate();
  if (!isValid) {
    loading.value = false;
    return;
  }

  try {
    await addDoc(collection(db, "materialReceipts"), {
      ...receipt,
      quantity: Number(receipt.quantity),
      unitWeight: Number(receipt.unitWeight),
      createdAt: new Date()
    });

    dialogTitle.value = "Success";
    dialogMessage.value = "Quality Control record saved successfully!";
    dialogIcon.value = "mdi-check-circle";
    dialogColor.value = "green";
    dialog.value = true;

    form.value.reset();
  } catch (error) {
    console.error("Error saving data: ", error);

    dialogTitle.value = "Error";
    dialogMessage.value = "There was a problem saving the data.";
    dialogIcon.value = "mdi-alert-circle";
    dialogColor.value = "red";
    dialog.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
