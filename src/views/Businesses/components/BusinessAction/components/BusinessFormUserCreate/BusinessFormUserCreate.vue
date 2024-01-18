<template>
  <form autocomplete="off" @submit="handleFormSubmit">
    <v-card elevation="0">
      <v-card-text>
        <h6 class="text-h6 mb-6">User Detail</h6>

        <v-row>
          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Username</v-label>
            <v-text-validate-field type="text" name="username" color="primary" variant="outlined" placeholder="johndeo" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Email</v-label>
            <v-text-validate-field name="email" color="primary" variant="outlined" placeholder="john.deo" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Password</v-label>
            <v-password-validate-field name="password" color="primary" variant="outlined" placeholder="john.deo" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <h6 class="text-h6 mb-6">User Information</h6>

        <v-row>
          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">First Name</v-label>
            <v-text-validate-field name="firstName" type="text" color="primary" variant="outlined" placeholder="John" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Last Name</v-label>
            <v-text-validate-field name="lastName" type="text" color="primary" placeholder="Deo" variant="outlined" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Phone Number</v-label>
            <v-row>
              <v-col cols="3">
                <v-select-validate name="phoneRegion" :items="SUPPORTED_REGIONS" />
              </v-col>
              <v-col cols="9">
                <v-text-validate-field type="text" color="primary" name="phoneNumber" variant="outlined" placeholder="0900000000" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col sm="6" class="text-left">
            <v-btn flat class="bg-lighterror text-error" @click="$emit('cancel')">Cancel</v-btn>
          </v-col>

          <v-col sm="6" class="text-right">
            <v-btn flat type="submit" color="secondary" class="ml-4">Next</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </form>
</template>

<script lang="ts" setup>
// Utilities
import { useForm } from "vee-validate";

// Components
import VSelectValidate from "@/components/shared/VSelectValidate/VSelectValidate.vue";
import VTextValidateField from "@/components/shared/VTextValidateField/VTextValidateField.vue";
import VPasswordValidateField from "@/components/shared/VPasswordValidateField/VPasswordValidateField.vue";

// Validation
import { createUserValidationSchema } from "@/libs/validation/user";

// Constants
import { SUPPORTED_REGIONS } from "@/libs/constant";
import { USER_STATE } from "@/modules/users/constant";

export type FormValues = {
  id: number;
  email: string;
  state: string;
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  phoneRegion: string;
  phoneNumber: string;
  confirmPassword: string;
};

const { handleSubmit } = useForm<FormValues>({
  initialValues: {
    id: 0,
    email: "",
    username: "",
    password: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    phoneRegion: "84",
    state: USER_STATE.ACTIVE,
  },
  validationSchema: createUserValidationSchema,
});

export type BusinessFormUserEvents = {
  (event: "cancel"): void;
  (event: "submit", values: FormValues): void;
};

const emit = defineEmits<BusinessFormUserEvents>();

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
