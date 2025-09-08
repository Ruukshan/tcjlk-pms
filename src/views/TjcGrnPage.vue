<template>
    <v-container>
        <v-card color="primary">
            <v-card-title>
            <NavBar title="GRN "/>
            </v-card-title>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Item" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="Supplier" 
                            bg-color="secondary"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Quantity" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Quality" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col> 
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Unit" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="QA Acceptance" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Remarks" 
                            bg-color="secondary">
                        </v-text-field>
                    </v-col> 
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Storage Slot" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Invoice Ref/GRN" 
                            bg-color="secondary"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Stock Review Verify Date" 
                            bg-color="secondary"
                            type="date"
                        ></v-text-field>
                    </v-col> 
                    <v-col cols="12" md="6">
                        <v-btn @click="submit">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        
    </v-container>
</template>

<script setup>
import NavBar from "../components/Navbar.vue";
</script>

<style scoped>
</style>