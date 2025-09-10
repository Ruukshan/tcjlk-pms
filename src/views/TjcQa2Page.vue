<template>
  <v-main>
    <v-container fluid>
      <v-card elevation="0">
        <Navbar title="Quality Control 2" back-route="TJCQA1" />

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row dense>
              <v-col cols="12">
                <v-label>Retort Pressure</v-label>
                <v-text-field
                    placeholder="Enter retorted batch code"
                    v-model="qc.retortPressure"
                    :rules="[rules.required, rules.number]"
                    type="number"
                />
              </v-col>

              <v-col cols="12" class="text-white">
                <strong>Retort Temperatures & Times</strong>
              </v-col>



              <v-col cols="6">
                <v-label>Temperature 1</v-label>
                <v-text-field
                    placeholder="Enter temperature 1"
                    v-model="qc.temperature1"
                    :rules="[rules.required,rules.temperature]"
                    
                />
              </v-col>
              <v-col cols="6">
                <v-label>Time 1</v-label>
                <v-text-field
                    v-model="qc.time1"
                    type="time"
                    placeholder="Select time 1"
                    :rules="[rules.required]"
                    hide-details="auto"
                />
              </v-col>

              <v-col cols="6">
                <v-label>Temperature 2</v-label>
                <v-text-field
                    placeholder="Enter temperature 2"
                    v-model="qc.temperature2"
                    :rules="[rules.required,rules.temperature]"
                     
                />
              </v-col>
              <v-col cols="6">
                <v-label>Time 2</v-label>
                <v-text-field
                  v-model="qc.time2"
                  type="time"
                  placeholder="Select time 2"
                  :rules="[rules.required]"
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="6">
                <v-label>Temperature 3</v-label>
                <v-text-field
                    placeholder="Enter temperature 3"
                    v-model="qc.temperature3"
                    :rules="[rules.required,rules.temperature]"
                    
                />
              </v-col>
              <v-col cols="6">
                <v-label>Time 3</v-label>
                <v-text-field
                    v-model="qc.time3"
                    type="time"
                    placeholder="Select time 3"
                    :rules="[rules.required]"
                    hide-details="auto"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Batch Quantity</v-label>
                <v-text-field
                    placeholder="Enter batch quantity"
                    v-model="qc.batchQuantity"
                    :rules="[rules.required, rules.number]"
                   
                />
              </v-col>

              <v-col cols="12">
                <v-label>Reject Items</v-label>
                <v-text-field
                    placeholder="Enter reject items"
                    v-model="qc.rejectItems"
                    :rules="[rules.number]"
                    type="number"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Reject Reason</v-label>
                <v-textarea
                    v-model="qc.rejectReason"
                    placeholder="Enter reject reason"
                    auto-grow
                    rows="2"
                />
              </v-col>

              <v-col cols="12">
                <v-btn
                    block
                    size="large"
                    :loading="loading"
                    :disabled="!valid"
                    @click="submit"
                    class="submit-btn"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <DialogBox
          v-model="dialog"
          :title="dialogTitle"
          :message="dialogMessage"
          :icon="dialogIcon"
          :icon-color="dialogColor"
          @close="dialog = false"
      />
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "@/components/Navbar.vue";
import DialogBox from "@/helper/utils/AppDialog.vue";
import { useRouter } from 'vue-router';


const router = useRouter();

const form = ref(null);
const valid = ref(false);
const loading = ref(false);

const dialog = ref(false);
const dialogTitle = ref("");
const dialogMessage = ref("");
const dialogIcon = ref("mdi-information");
const dialogColor = ref("primary");

const qc = ref({
  retortPressure: "",
  temperature1: "",
  time1: "",
  temperature2: "",
  time2: "",
  temperature3: "",
  time3: "",
  batchQuantity: "",
  rejectItems: "",
  rejectReason: "",
});

const rules = {
  required: (v) => !!v || "This field is required",
  number: (v) => (!isNaN(v) && v >= 0) || "Must be a valid number",
  temperature: (v) =>
    /^(?:-?\d+(?:\.\d+)?)(?:°?\s?[CF])$/i.test(v) ||
    "Temperature must include °C or °F (e.g., 80°C or 176°F)",
};

const submit = async () => {
  loading.value = true;
  const { valid: isValid } = await form.value.validate();

  if (!isValid) {
    loading.value = false;
    return;
  }

  try {
    await addDoc(collection(db, "qualityControl2"), {
      ...qc.value,
      retortPressure: Number(qc.value.retortPressure),
      temperature1: Number(qc.value.temperature1),
      temperature2: Number(qc.value.temperature2),
      temperature3: Number(qc.value.temperature3),
      batchQuantity: Number(qc.value.batchQuantity),
      rejectItems: qc.value.rejectItems
          ? Number(qc.value.rejectItems)
          : 0,
    });

    dialogTitle.value = "Success";
    dialogMessage.value = "Quality Control record saved successfully!";
    dialogIcon.value = "mdi-check-circle";
    dialogColor.value = "green";
    dialog.value = true;

    form.value?.reset();
    valid.value = false;
    router.push({ name: 'TJCPACKING' }); 


  } catch (error) {
    console.error("Error saving data: ", error);
    dialogTitle.value = "Error";
    dialogMessage.value = "There was a problem saving the data.";
    dialogIcon.value = "mdi-alert-circle";
    dialogColor.value = "red";
    dialog.value = true;
  } finally {
    loading.value = false;
  }
};
</script>



