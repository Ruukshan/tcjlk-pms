<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="0">
    
        <Navbar title="Processing" />
        <v-card-text>
          <!-- Processing form -->
          <v-form ref="processingForm" v-model="valid" lazy-validation>
            <!-- MR Code input -->
            <div>
              <v-label>MR Code</v-label>
              <v-text-field
                v-model="formData.MRCode"
                placeholder="Enter MRCode"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Final Product Ref -->
            <div>
              <v-label>Final Product Ref</v-label>
              <v-text-field
                v-model="formData.ProductRef"
                placeholder="Enter ProductRef"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Quantity Pineapple Juice Received -->
            <div>
              <v-label>Quantity Pineapple Juice Received</v-label>
              <v-text-field
                v-model="formData.Quantity"
                placeholder="Enter Quantity"
                :rules="[rules.required, rules.numeric]"
                hide-details="auto"
              />
            </div>
            <!-- PH input -->
            <div>
              <v-label>PH</v-label>
              <v-text-field
                v-model="formData.PH"
                placeholder="Enter PH"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Filled Cans -->
            <div>
              <v-label>Filled Cans</v-label>
              <v-text-field
                v-model="formData.FilledCans"
                placeholder="Enter FilledCans"
                :rules="[rules.required, rules.numeric]"
                hide-details="auto"
              />
            </div>
            <!-- Chunk Volume -->
            <div>
              <v-label>Chunk Volume</v-label>
              <v-text-field
                v-model="formData.ChunkVolume"
                placeholder="Enter ChunkVolume"
                :rules="[rules.required, rules.numeric]"
                hide-details="auto"
              />
            </div>
            <!-- Exhaust Time Start -->
            <div>
              <v-label>Exhaust Time Start</v-label>
              <v-text-field
                v-model="formData.ExhaustStartTime"
                placeholder="Enter StartTime"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Exhaust Time End -->
            <div>
              <v-label>Exhaust Time End</v-label>
              <v-text-field
                v-model="formData.ExhaustEndTime"
                placeholder="Enter EndTime"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Seaming Batch Start Time -->
            <div>
              <v-label>Seaming Batch Start Time</v-label>
              <v-text-field
                v-model="formData.SeamingStartTime"
                placeholder="Enter StartTime"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Seaming Batch End Time -->
            <div>
              <v-label>Seaming Batch End Time</v-label>
              <v-text-field
                v-model="formData.SeamingEndTime"
                placeholder="Enter EndTime"
                :rules="[rules.required]"
                hide-details="auto"
              />
            </div>
            <!-- Item Quantity for Retort -->
            <div>
              <v-label>Item Quantity for Retort</v-label>
              <v-text-field
                v-model="formData.ItemQuantity"
                placeholder="Enter Quantity"
                :rules="[rules.required, rules.numeric]"
                hide-details="auto"
              />
            </div>
            <!-- Submit button -->
            <div>
              <v-btn
                block
                size="large"
                :loading="loading"
                :disabled="!valid"
                @click="submitForm"
                color="button"
                style="color: white"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
      <!-- Success dialog -->
      <AppDialog
        v-model="successDialog"
        title="Success!"
        message="Processing data has been submitted successfully."
        icon="mdi-check-circle"
        iconColor="success"
        @close="successDialog = false"
      />
      <!-- Error dialog -->
      <AppDialog
        v-model="errorDialog"
        title="Error!"
        :message="errorMessage"
        icon="mdi-alert-circle"
        iconColor="error"
        @close="errorDialog = false"
      />
    </v-container>
  </v-main>
</template>

<script setup>
// Vue and Firebase imports
import { ref, reactive } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase.js";
import Navbar from "@/components/Navbar.vue";
import AppDialog from "@/helper/utils/AppDialog.vue";

// Form validation state
const valid = ref(false);
const processingForm = ref(null);
const loading = ref(false);
const successDialog = ref(false);
const errorDialog = ref(false);
const errorMessage = ref("");

// Form data model
const formData = reactive({
  MRCode: "",
  ProductRef: "",
  Quantity: "",
  PH: "",
  FilledCans: "",
  ChunkVolume: "",
  ExhaustStartTime: "",
  ExhaustEndTime: "",
  SeamingStartTime: "",
  SeamingEndTime: "",
  ItemQuantity: "",
});

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  numeric: (value) => !isNaN(Number(value)) || "Must be a number",
};

// Reset form fields and validation
const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
  processingForm.value?.resetValidation();
};

// Submit form data to Firebase
const submitForm = async () => {
  if (!processingForm.value) return;
  const { valid: isValid } = await processingForm.value.validate();
  if (!isValid) return;
  loading.value = true;
  try {
    const processingData = {
      ...formData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, "processing"), processingData);
    successDialog.value = true;
    resetForm();
    console.log("Processing data submitted successfully:", processingData);
  } catch (error) {
    console.error("Error submitting processing data:", error);
    errorMessage.value = "Failed to submit data. Please try again.";
    errorDialog.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add spacing between form sections */
div {
  margin-bottom: 18px;
}
</style>