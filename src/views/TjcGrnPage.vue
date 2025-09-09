<template>
    <v-container>
        <v-card color="primary">
            <v-card-title>
                <NavBar title="GRN "/>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Item" 
                                :rules="itemRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                label="Supplier"
                                :items="suppliers" 
                                :rules="supplierRules"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Quantity" 
                                :rules="quantityRules"
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
                                label="Unit"
                                :rules="unitRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="QA Acceptance"
                                :rules="qaAcceptanceRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Remarks"
                            ></v-text-field>
                        </v-col> 
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Storage Slot"
                                :rules="storageSlotRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Invoice Ref/GRN"
                                :rules="invoiceRefRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Stock Review Verify Date" 
                                type="date"
                                :rules="stockReviewVerifyDateRules"
                            ></v-text-field>
                        </v-col> 
                        <v-col cols="12" md="6">
                            <v-btn @click="submit">Submit</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>  
    </v-container>
</template>

<script setup>
import NavBar from "../components/Navbar.vue";
import { ref } from 'vue';

// 
const form = ref(null);

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

const submit = () => {
    if (form.value.validate()) {
        // Submit form data
    }
}
</script>

<style scoped>
</style>