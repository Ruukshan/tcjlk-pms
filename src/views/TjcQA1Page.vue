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
                                    v-model="approvalStatus"
                                    :rules="approvalStatusRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>General Ceanliness Production Area</v-label>
                                <v-text-field
                                    placeholder="Enter cleanliness status"
                                    v-model="cleanlinessProduciton"
                                    :rules="cleanlinessProducitonRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Hygine Random</v-label>
                                <v-text-field
                                    placeholder="Enter hygine status"
                                    v-model="hygineStatus"
                                    :rules="hygineStatusRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Exhaust Temprature</v-label>
                                <v-text-field
                                    placeholder="Enter tempreture"
                                    v-model="exhaustTemprature"
                                    :rules="exhaustTempratureRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seaming Body Length</v-label>
                                <v-text-field
                                    placeholder="Enter body length"
                                    v-model="bodyLength"
                                    :rules="bodyLengthRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seaming Hook Length</v-label>
                                <v-text-field
                                    placeholder="Enter hook lenght"
                                    v-model="hookLength"
                                    :rules="hookLengthRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Overlap</v-label>
                                <v-text-field
                                    placeholder="Enter overlap percentage"
                                    v-model="overlapPercentage"
                                    :rules="overlapPercentageRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label>Seamer Condition</v-label>
                                <v-select
                                    placeholder="Select condition"
                                    v-model="seamerCondition"
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
        </v-container>
    </v-main>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';


const form = ref(null);
const valid = ref(false);

// Form data
const formData = ref({
    approvalStatus: '',
    cleanlinessProduciton: '',
    hygineStatus: '',
    exhaustTemprature: '',
    bodyLength: '',
    hookLength: '',
    overlapPercentage: '',
    seamerCondition: '',
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
];
const bodyLengthRules = [
    v => !!v || 'Body length is required',
];
const hookLengthRules = [
    v => !!v || 'Hook length is required',
];
const overlapPercentageRules = [
    v => !!v || 'Overlap percentage is required',
];
const seamerConditionRules = [
    v => !!v || 'Seamer condition is required',
];


</script>

<style scoped>
</style>