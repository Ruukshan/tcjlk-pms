<template>
  <v-container fluid class="packing-container">
    <v-card class="packing-card" elevation="0">
      <!-- Header -->
      <v-app-bar
        density="compact"
        class="packing-header"
        color="primary"
        prominent
      >
        <v-btn icon variant="text" @click="goBack">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-app-bar-title class="header-title">Packing</v-app-bar-title>
      </v-app-bar>

      <v-card-text class="packing-form">
        <v-form ref="packingForm" v-model="valid" lazy-validation>
          <!-- Retorted Batch Code -->
          <div class="form-section">
            <v-label class="field-label">Retorted Batch Code</v-label>
            <v-text-field
              v-model="formData.retortedBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- Retort Date -->
          <div class="form-section">
            <v-label class="field-label">Retort Date</v-label>
            <v-text-field
              v-model="formData.retortDate"
              type="date"
              placeholder="Select date"
              :rules="[rules.required]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- TJC Batch Code -->
          <div class="form-section">
            <v-label class="field-label">TJC Batch Code</v-label>
            <v-text-field
              v-model="formData.tjcBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- Date Picker Toggle -->
          <div class="form-section">
            <div class="toggle-section">
              <v-label class="field-label">Date Picker</v-label>
              <v-switch
                v-model="formData.datePicker"
                color="button"
                hide-details
                inset
              />
            </div>
          </div>

          <!-- Order Batch Code -->
          <div class="form-section">
            <v-label class="field-label">Order Batch Code</v-label>
            <v-text-field
              v-model="formData.orderBatchCode"
              placeholder="Enter code"
              :rules="[rules.required]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- Checked Switch Toggle -->
          <div class="form-section">
            <div class="toggle-section">
              <v-label class="field-label">Checked Switch</v-label>
              <v-switch
                v-model="formData.checkedSwitch"
                color="button"
                hide-details
                inset
              />
            </div>
          </div>

          <!-- Batch Quantity -->
          <div class="form-section">
            <v-label class="field-label">Batch Quantity</v-label>
            <v-text-field
              v-model="formData.batchQuantity"
              placeholder="Enter quantity"
              type="number"
              :rules="[rules.required, rules.numeric]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- Production and Reject Count Row -->
          <div class="form-section">
            <v-row no-gutters>
              <v-col cols="6" class="pr-2">
                <v-label class="field-label">Today's Production</v-label>
                <v-text-field
                  v-model="formData.todaysProduction"
                  placeholder="Enter production"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  hide-details="auto"
                  class="custom-field"
                />
              </v-col>
              <v-col cols="6" class="pl-2">
                <v-label class="field-label">Reject Count</v-label>
                <v-text-field
                  v-model="formData.rejectCount"
                  placeholder="Enter count"
                  type="number"
                  :rules="[rules.required, rules.numeric]"
                  hide-details="auto"
                  class="custom-field"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Label Conformation Details -->
          <div class="form-section">
            <v-label class="field-label">Label Conformation Details</v-label>
            <v-text-field
              v-model="formData.labelConformationDetails"
              placeholder="Enter details"
              :rules="[rules.required]"
              hide-details="auto"
              class="custom-field"
            />
          </div>

          <!-- Operator Buttons -->
          <div class="form-section">
            <v-label class="field-label">Select Operator</v-label>
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
          <div class="form-section">
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
          <div class="form-section submit-section">
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

<style scoped>
.packing-container {
  background-color: #241f0f;
  min-height: 100vh;
  padding: 0;
}

.packing-card {
  background-color: #241f0f !important;
  border-radius: 0;
  height: 100vh;
}

.packing-header {
  background-color: #241f0f !important;
  border-bottom: 1px solid #362e17;
}

.header-title {
  color: white !important;
  font-weight: bold;
  font-size: 18px;
}

.packing-form {
  padding: 16px;
  background-color: #241f0f;
}

.form-section {
  margin-bottom: 20px;
}

.field-label {
  color: white !important;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

.custom-field :deep(.v-field) {
  background-color: #362e17 !important;
  border-radius: 8px;
}

.custom-field :deep(.v-field__input) {
  color: white !important;
  padding: 12px 16px;
}

.custom-field :deep(.v-field__outline) {
  border-color: #4a4a4a !important;
}

.custom-field :deep(.v-field--focused .v-field__outline) {
  border-color: #fac738 !important;
}

.custom-field :deep(::placeholder) {
  color: #888 !important;
  opacity: 1;
}

.toggle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.operator-row {
  margin-top: 8px;
}

.operator-btn {
  font-size: 12px;
  text-transform: none;
  height: 36px;
}

.quality-check-section {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.quality-check-section :deep(.v-selection-control) {
  align-items: center;
}

.quality-check-section :deep(.v-label) {
  color: white !important;
  font-size: 14px;
}

.submit-section {
  margin-top: 32px;
  margin-bottom: 16px;
}

.submit-btn {
  background-color: #fac738 !important;
  color: #241f0f !important;
  font-weight: bold;
  font-size: 16px;
  height: 48px;
  text-transform: none;
}

.submit-btn:hover {
  background-color: #e5b332 !important;
}

/* Switch styling */
:deep(.v-switch .v-selection-control__wrapper) {
  height: 24px;
}

:deep(.v-switch .v-switch__thumb) {
  background-color: white;
}

:deep(.v-switch--inset .v-selection-control__input) {
  background-color: #4a4a4a;
}

:deep(.v-switch--inset.v-switch--indeterminate .v-selection-control__input),
:deep(.v-switch--inset .v-switch__track) {
  background-color: #fac738;
}

/* Checkbox styling */
:deep(.v-checkbox .v-selection-control__input) {
  border-color: #4a4a4a;
}

:deep(.v-checkbox--checked .v-selection-control__input) {
  background-color: #fac738;
  border-color: #fac738;
}

/* Date input styling */
.custom-field :deep(input[type="date"]) {
  color: white !important;
}

.custom-field :deep(input[type="date"]::-webkit-calendar-picker-indicator) {
  filter: invert(1);
  cursor: pointer;
}

/* Number input styling */
.custom-field :deep(input[type="number"]) {
  color: white !important;
}

/* Dialog styling */
:deep(.v-dialog .v-card) {
  background-color: white;
}

:deep(.v-dialog .v-card-title) {
  padding: 24px 24px 8px;
}

:deep(.v-dialog .v-card-text) {
  padding: 8px 24px;
}

:deep(.v-dialog .v-card-actions) {
  padding: 16px 24px 24px;
}
</style>
