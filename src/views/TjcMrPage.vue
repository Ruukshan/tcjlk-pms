<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="0">
        <Navbar title="Material Recipt " />

        <v-card-text>
          <v-form ref="form" class="pb-10">
            <v-row>
              <v-col cols="12">
                <v-label>MR Code</v-label>
                <v-text-field
                    v-model="receipt.mrCode"
                    placeholder="Enter mr code"
                    :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Item</v-label>
                <v-select
                    v-model="receipt.item"
                    :items="items"
                    :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Quantity</v-label>
                <v-text-field
                    v-model="receipt.quantity"
                    placeholder="Enter quantity"
                    type="number"
                    :rules="[rules.required, rules.number]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Quality</v-label>
                <v-text-field
                    v-model="receipt.quality"
                    placeholder="Enter quality"
                    :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>For Final Product</v-label>
                <v-text-field
                    v-model="receipt.finalProduct"
                    placeholder="Enter final product"
                    :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Remarks</v-label>
                <v-textarea
                    v-model="receipt.remarks"
                    placeholder="Enter remarks"
                    auto-grow
                    rows="2"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Storage Slot</v-label>
                <v-text-field
                    v-model="receipt.storageSlot"
                    placeholder="Enter storage slot"
                    :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Unit Weight</v-label>
                <v-text-field
                    v-model="receipt.unitWeight"
                    placeholder="Enter unit weight"
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
  </v-main>
</template>

<script setup>
import { ref, reactive } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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

const resetForm = () => {
  Object.keys(receipt).forEach(key => (receipt[key] = ""));
  form.value.resetValidation();
};

const submit = async () => {
  loading.value = true;

  const { valid } = await form.value.validate();
  if (!valid) {
    loading.value = false;
    return;
  }

  try {
    await addDoc(collection(db, "materialReceipts"), {
      ...receipt,
      quantity: Number(receipt.quantity),
      unitWeight: Number(receipt.unitWeight),
      createdAt: serverTimestamp()
    });

    dialogTitle.value = "Success";
    dialogMessage.value = "Quality Control record saved successfully!";
    dialogIcon.value = "mdi-check-circle";
    dialogColor.value = "green";
    dialog.value = true;

    resetForm();
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

