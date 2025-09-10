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
                  v-model="receipt.mrCode"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                  label="Item"
                  :items="items"
                  v-model="receipt.item"
                  :rules="[rules.required]"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Quantity"
                  v-model="receipt.quantity"
                  :rules="[rules.required, rules.number]"
                  type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Quality"
                  v-model="receipt.quality"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="For Final Product"
                  v-model="receipt.finalProduct"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-textarea
                  label="Remarks"
                  v-model="receipt.remarks"
                  auto-grow
                  rows="2"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Storage Slot"
                  v-model="receipt.storageSlot"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                  label="Unit Weight"
                  v-model="receipt.unitWeight"
                  :rules="[rules.required, rules.number]"
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
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

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


// Submit function
const submit = async () => {

  const isValid = form.value.validate();

  if (!isValid) return;

  try {
    await addDoc(collection(db, "materialReceipts"), {
      ...receipt.value,
      quantity: Number(receipt.value.quantity),
      unitWeight: Number(receipt.value.unitWeight),
      createdAt: new Date()
    });

    alert("Material receipt saved successfully!");


    Object.keys(receipt.value).forEach(key => (receipt.value[key] = ""));

    form.value.resetValidation();

  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error saving data");
  }
};

</script>
