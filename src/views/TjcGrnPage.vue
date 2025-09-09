<template>
    <v-main class="bg-primary">
        <v-container fluid>
            <v-card elevation="0">
                <Navbar title="GRN "/>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-row justify="center">
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Item" 
                                    :rules="itemRules"
                                    v-model="formData.item"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select
                                    label="Supplier"
                                    :items="suppliers" 
                                    :rules="supplierRules"
                                    v-model="formData.supplier"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Quantity" 
                                    :rules="quantityRules"
                                    v-model="formData.quantity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Quality" 
                                    :rules="qualityRules"
                                    v-model="formData.quality"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Unit"
                                    :rules="unitRules"
                                    v-model="formData.unit"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="QA Acceptance"
                                    :rules="qaAcceptanceRules"
                                    v-model="formData.qaAcceptance"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Remarks"
                                    v-model="formData.remarks"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Storage Slot"
                                    :rules="storageSlotRules"
                                    v-model="formData.storageSlot"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Invoice Ref/GRN"
                                    :rules="invoiceRefRules"
                                    v-model="formData.invoiceRef"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field 
                                    label="Stock Review Verify Date" 
                                    type="date"
                                    :rules="stockReviewVerifyDateRules"
                                    v-model="formData.stockReviewVerifyDate"
                                ></v-text-field>
                            </v-col> 
                            <v-col cols="12" md="12">
                                <v-btn 
                                    :disabled="!valid"
                                    :loading="isSubmitting" 
                                    @click="confirmSubmit"
                                >Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, computed } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// Form reference and validation state
const form = ref(null);
const valid = ref(false);
const isSubmitting = ref(false);

// Form data
const formData = ref({
    item: '',
    supplier: '',
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
        supplier: '',
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

// submit form
const confirmSubmit = async () => {
    if (!form.value.validate()) return;

    isSubmitting.value = true;
    try {
        await addDoc(collection(db, 'grn'), formData.value);
        console.log('Document written with ID: ');
        resetForm();
    } catch (e) {
        console.error('Error adding document: ', e);
    } finally {
        isSubmitting.value = false;
    }
}

</script>


<style scoped>

</style>