<template>
  <v-container fluid>
    <v-card elevation="0">
      <!-- Header -->
      <v-app-bar density="compact" color="primary" prominent>
        <v-btn icon variant="text" @click="goBack">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-app-bar-title>Packing</v-app-bar-title>
      </v-app-bar>

      <v-card-text>
        <v-form ref="packingForm" v-model="valid" lazy-validation>
          <!-- Retorted Batch Code -->
          <div>
            <v-label>Retorted Batch Code</v-label>
            <v-text-field
              v-model="formData.retortedBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
            />
          </div>

          <!-- Retort Date -->
          <div>
            <v-label>Retort Date</v-label>
            <v-text-field
              v-model="formData.retortDate"
              type="date"
              placeholder="Select date"
              :rules="[rules.required]"
              hide-details="auto"
            />
          </div>

          <!-- TJC Batch Code -->
          <div>
            <v-label>TJC Batch Code</v-label>
            <v-text-field
              v-model="formData.tjcBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
            />
          </div>

          <!-- Date Picker Toggle -->
          <div>
            <v-label>Date Picker</v-label>
            <v-switch v-model="formData.datePicker" />
          </div>

          <!-- Order Batch Code -->
          <div>
            <v-label>Order Batch Code</v-label>
            <v-text-field
              v-model="formData.orderBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
            />
          </div>

          <!-- Checked Switch Toggle -->
          <div>
            <v-label>Checked Switch</v-label>
            <v-switch v-model="formData.checkedSwitch" />
          </div>

          <!-- Batch Quantity -->
          <div>
            <v-label>Batch Quantity</v-label>
            <v-text-field
              v-model="formData.batchQuantity"
              placeholder="Enter quantity"
              type="number"
              :rules="[rules.required, rules.numeric]"
              hide-details="auto"
            />
          </div>

          <!-- Production and Reject Count Row -->
          <div>
            <v-row no-gutters>
              <v-col cols="6" class="pr-2">
                <v-label>Today's Production</v-label>
                <v-text-field
                  v-model="formData.todaysProduction"
                  placeholder="Enter production"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  hide-details="auto"
                />
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-label>Reject Count</v-label>
                <v-text-field
                  v-model="formData.rejectCount"
                  placeholder="Enter count"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Label Conformation Details -->
          <div>
            <v-label>Label Conformation Details</v-label>
            <v-text-field
              v-model="formData.labelConformationDetails"
              placeholder="Enter details"
              :rules="[rules.required]"
              hide-details="auto"
            />
          </div>

          <!-- Operator Buttons -->
          <div>
            <v-label>Select Operator</v-label>
            <v-row no-gutters class="operator-row">
              <v-col cols="4" class="pr-1">
                <v-btn
                  :variant="
                    formData.selectedOperator === 1 ? 'flat' : 'outlined'
                  "
                  :color="
                    formData.selectedOperator === 1 ? 'button' : 'secondary'
                  "
                  size="small"
                  block
                  @click="selectOperator(1)"
                  class="operator-btn"
                >
                  Operator 1
                </v-btn>
              </v-col>
              <v-col cols="4" class="px-1">
                <v-btn
                  :variant="
                    formData.selectedOperator === 2 ? 'flat' : 'outlined'
                  "
                  :color="
                    formData.selectedOperator === 2 ? 'button' : 'secondary'
                  "
                  size="small"
                  block
                  @click="selectOperator(2)"
                  class="operator-btn"
                >
                  Operator 2
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-1">
                <v-btn
                  :variant="
                    formData.selectedOperator === 3 ? 'flat' : 'outlined'
                  "
                  :color="
                    formData.selectedOperator === 3 ? 'button' : 'secondary'
                  "
                  size="small"
                  block
                  @click="selectOperator(3)"
                  class="operator-btn"
                >
                  Operator 3
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- Quality Check -->
          <div>
            <div class="quality-check-section">
              <v-checkbox
                v-model="formData.qualityCheck"
                color="button"
                hide-details
              >
                <template #label>
                  <span class="field-label">Quality Check</span>
                </template>
              </v-checkbox>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <v-btn
              block
              size="large"
              :loading="loading"
              :disabled="!valid"
              @click="submitForm"
              class="submit-btn"
            >
              Submit
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="400">
      <v-card>
        <v-card-title class="text-center">
          <v-icon color="success" size="large">mdi-check-circle</v-icon>
        </v-card-title>
        <v-card-text class="text-center">
          <h3>Success!</h3>
          <p>Packing data has been submitted successfully.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="success" @click="successDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title class="text-center">
          <v-icon color="error" size="large">mdi-alert-circle</v-icon>
        </v-card-title>
        <v-card-text class="text-center">
          <h3>Error!</h3>
          <p>{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="error" @click="errorDialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "@/services/firebase.js";

// Form validation
const valid = ref(false);
const packingForm = ref(null);
const loading = ref(false);
const successDialog = ref(false);
const errorDialog = ref(false);
const errorMessage = ref("");

// Form data
const formData = reactive({
  retortedBatchCode: "",
  retortDate: "",
  tjcBatchCode: "",
  datePicker: false,
  orderBatchCode: "",
  checkedSwitch: false,
  batchQuantity: "",
  todaysProduction: "",
  rejectCount: "",
  labelConformationDetails: "",
  selectedOperator: null,
  qualityCheck: false,
});

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  numeric: (value) => !isNaN(Number(value)) || "Must be a number",
};

// Methods
const goBack = () => {
  // Implement navigation back logic
  console.log("Going back...");
};

const selectOperator = (operatorNumber) => {
  formData.selectedOperator = operatorNumber;
};

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    if (typeof formData[key] === "boolean") {
      formData[key] = false;
    } else if (typeof formData[key] === "number") {
      formData[key] = null;
    } else {
      formData[key] = "";
    }
  });
  packingForm.value?.resetValidation();
};

const submitForm = async () => {
  if (!packingForm.value) return;

  const { valid: isValid } = await packingForm.value.validate();
  if (!isValid) return;

  if (!formData.selectedOperator) {
    errorMessage.value = "Please select an operator";
    errorDialog.value = true;
    return;
  }

  loading.value = true;

  try {
    // Prepare data for Firebase
    const packingData = {
      ...formData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    };

    // Add to Firebase Firestore
    await addDoc(collection(db, "packing"), packingData);

    // Show success dialog
    successDialog.value = true;

    // Reset form
    resetForm();

    console.log("Packing data submitted successfully:", packingData);
  } catch (error) {
    console.error("Error submitting packing data:", error);
    errorMessage.value = "Failed to submit data. Please try again.";
    errorDialog.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
