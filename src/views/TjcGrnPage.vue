<template>
    <v-main>
        <v-container fluid>
            <v-card elevation="0">
                <Navbar title="GRN "/>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-label>Item</v-label>
                                <v-text-field 
                                    placeholder="Enter Item"
                                    :rules="itemRules"
                                    v-model="formData.item"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Supplier</v-label>
                                <v-select
                                    placeholder="Select Supplier"
                                    :items="suppliers" 
                                    :rules="supplierRules"
                                    v-model="formData.supplier"
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Quantity</v-label>
                                <v-text-field 
                                    placeholder="Enter Quantity"
                                    :rules="quantityRules"
                                    v-model="formData.quantity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" >
                                <v-label>Quality</v-label>
                                <v-text-field 
                                    placeholder="Enter Quality"
                                    :rules="qualityRules"
                                    v-model="formData.quality"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12">
                                <v-label>Unit</v-label>
                                <v-text-field 
                                    placeholder="Enter Unit"
                                    :rules="unitRules"
                                    v-model="formData.unit"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>QA Acceptance</v-label>
                                <v-text-field 
                                    placeholder="Enter QA Acceptance"
                                    :rules="qaAcceptanceRules"
                                    v-model="formData.qaAcceptance"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Remarks</v-label>
                                <v-text-field 
                                    placeholder="Enter Remarks"
                                    v-model="formData.remarks"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12">
                                <v-label>Storage Slot</v-label>
                                <v-text-field 
                                    placeholder="Enter Storage Slot"
                                    :rules="storageSlotRules"
                                    v-model="formData.storageSlot"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Invoice Ref/GRN</v-label>
                                <v-text-field 
                                    placeholder="Enter Invoice Ref/GRN"
                                    :rules="invoiceRefRules"
                                    v-model="formData.invoiceRef"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Stock Review Verify Date</v-label>
                                <v-text-field 
                                    placeholder="Select Date" 
                                    type="date"
                                    :rules="stockReviewVerifyDateRules"
                                    v-model="formData.stockReviewVerifyDate"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12">
                                <v-btn 
                                    block
                                    size="large"
                                    :disabled="!valid"
                                    :loading="isSubmitting" 
                                    @click="confirmSubmit"
                                >Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
            <!-- Success Dialog -->
            <AppDialog
                v-model="successDialog"
                title="Success!"
                message="GRN data has been submitted successfully."
                icon="mdi-check-circle"
                iconColor="success"
                @close="handleClose"
            />

            <!-- Error Dialog -->
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
import Navbar from "../components/Navbar.vue";
import { ref, computed } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import AppDialog from '../helper/utils/AppDialog.vue';

// Form reference and validation state
const form = ref(null);
const valid = ref(false);
const isSubmitting = ref(false);
const successDialog = ref(false);
const errorDialog = ref(false);
const errorMessage = ref('');

// Form data
const formData = ref({
    item: '',
    supplier: null,
    quantity: '',
    quality: '',
    unit: '',
    qaAcceptance: '',
    remarks: '',
    storageSlot: '',
    invoiceRef: '',
    stockReviewVerifyDate: '',
})

// sample select items
const suppliers = [
    'Supplier 1',
    'Supplier 2',
    'Supplier 3',
]
// Validation rules
const itemRules = [
    v => !!v || 'Item is required',
]

const supplierRules = [
    v => !!v || 'Supplier is required',
]

const quantityRules = [
    v => !!v || 'Quantity is required',
    v => /^[0-9]+$/.test(v) || 'Quantity must be a number',
]

const qualityRules = [
    v => !!v || 'Quality is required',
]

const unitRules = [
    v => !!v || 'Unit is required',
]

const qaAcceptanceRules = [
    v => !!v || 'QA Acceptance is required',
]

const storageSlotRules = [
    v => !!v || 'Storage Slot is required',
]

const invoiceRefRules = [
    v => !!v || 'Invoice Ref/GRN is required',
]

const stockReviewVerifyDateRules = [
    v => !!v || 'Stock Review Verify Date is required',
]

// Reset form data
const resetForm = () => {
    formData.value = {
        item: '',
        supplier: null,
        quantity: '',
        quality: '',
        unit: '',
        qaAcceptance: '',
        remarks: '',
        storageSlot: '',
        invoiceRef: '',
        stockReviewVerifyDate: '',
    };
    form.value.resetValidation();
}
// Handle dialog close
const handleClose = () => {
    successDialog.value = false;
    resetForm();
}

//  Handle Connfirmed submission
const confirmSubmit = async () => {
    isSubmitting.value = true;
    try {
        await addDoc(collection(db, 'grn'), formData.value);
        console.log('Document written with ID: ');
        successDialog.value = true;
        resetForm();
    } catch (e) {
        errorMessage.value = 'Error adding document: ${e.message}';
        errorDialog.value = true;
    } finally {
        isSubmitting.value = false;
    }
}
</script>
<style scoped>
</style>