<template>
        <v-main>
        <v-container fluid>
            <v-card elevation="0">
                <Navbar title="Quality Control 1 "/>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-label>MR Issue Approval</v-label>
                                <v-text-field
                                    placeholder="Enter approval status"
                                    v-model="formData.approvalStatus"
                                    :rules="approvalStatusRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>General Ceanliness Production Area</v-label>
                                <v-text-field
                                    placeholder="Enter cleanliness status"
                                    v-model="formData.cleanlinessProduciton"
                                    :rules="cleanlinessProducitonRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Hygine Random</v-label>
                                <v-text-field
                                    placeholder="Enter hygine status"
                                    v-model="formData.hygineStatus"
                                    :rules="hygineStatusRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Exhaust Temprature</v-label>
                                <v-text-field
                                    placeholder="Enter tempreture"
                                    v-model="formData.exhaustTemprature"
                                    :rules="exhaustTempratureRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seaming Body Length</v-label>
                                <v-text-field
                                    placeholder="Enter body length"
                                    v-model="formData.bodyLength"
                                    :rules="bodyLengthRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seaming Hook Length</v-label>
                                <v-text-field
                                    placeholder="Enter hook lenght"
                                    v-model="formData.hookLength"
                                    :rules="hookLengthRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Overlap</v-label>
                                <v-text-field
                                    placeholder="Enter overlap percentage"
                                    v-model="formData.overlapPercentage"
                                    :rules="overlapPercentageRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seamer Condition</v-label>
                                <v-select
                                    placeholder="Select condition"
                                    v-model="formData.seamerCondition"
                                    :items="conditions"
                                    :rules="seamerConditionRules"
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                    color="button"
                                    block
                                    size="large"
                                    :disabled="!valid"
                                    :loading="isSubmitting"
                                    @click="submit"
                                >
                                    Submit
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
            <!-- Success Dialog -->
            <AppDialog
                v-model="successDialog"
                title="Success!"
                message="QA1 data has been submitted successfully."
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
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebase';
import AppDialog from '../helper/utils/AppDialog.vue';


const form = ref(null);
const valid = ref(false);
const isSubmitting = ref(false);
const successDialog = ref(false);
const errorDialog = ref(false);
const errorMessage = ref('');

// Form data
const formData = ref({
    approvalStatus: '',
    cleanlinessProduciton: '',
    hygineStatus: '',
    exhaustTemprature: '',
    bodyLength: '',
    hookLength: '',
    overlapPercentage: '',
    seamerCondition: null,
})

// Sample select data
const conditions = ['Good', 'Bad', 'Average'];

// Validation Rules
const approvalStatusRules = [
    v => !!v || 'Approval status is required',
];
const cleanlinessProducitonRules = [
    v => !!v || 'Cleanliness production is required',
];
const hygineStatusRules = [
    v => !!v || 'Hygine status is required',
];
const exhaustTempratureRules = [
    v => !!v || 'Exhaust temprature is required',
    v => (v && /[CF]$/.test(v)) || 'Exhaust temprature must end with C or F',
];
const bodyLengthRules = [
    v => !!v || 'Body length is required',
];
const hookLengthRules = [
    v => !!v || 'Hook length is required',
];
const overlapPercentageRules = [
    v => !!v || 'Overlap percentage is required',
    v=> (v && /^[0-9]+(\.[0-9]+)?%$/.test(v)) || 'Overlap percentage must be a number followed by %',
];
const seamerConditionRules = [
    v => !!v || 'Seamer condition is required',
];

// reset form data
const resetForm = () => {
    formData.value = {
        approvalStatus: '',
        cleanlinessProduciton: '',
        hygineStatus: '',
        exhaustTemprature: '',
        bodyLength: '',
        hookLength: '',
        overlapPercentage: '',
        seamerCondition: null,
    };
    form.value.resetValidation();
};

// Handle dialog close
const handleClose = () => {
    successDialog.value = false;
    resetForm();
}

// Submit document
const submit = async () => {
    isSubmitting.value = true;
    try {
        await addDoc(collection(db, "QA1"), formData.value);
        console.log("Document written with ID: ");
        successDialog.value=true;
        resetForm();
    } catch (error) {
        console.error("Error adding document: ${e.message}");
        errorMessage.value = "An error occurred while submitting the form. Please try again.";
        errorDialog.value = true;
    } finally {
        isSubmitting.value = false;
    }
};

</script>

<style scoped>
</style>