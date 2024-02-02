<template>
  <form autocomplete="off" @submit="handleFormSubmit">
    <v-card elevation="0">
      <v-card-text>
        <h6 class="text-h6 mb-6">Business Detail</h6>

        <v-row>
          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Name</v-label>
            <v-text-validate-field type="text" name="name" color="primary" variant="outlined" placeholder="Etc: Pet shop" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Owner</v-label>
            <v-text-validate-field type="text" name="owner" color="primary" variant="outlined" placeholder="Etc: David" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">Type</v-label>
            <v-select-validate :items="BUSINESS_TYPE_OPTIONS" type="text" name="type" color="primary" variant="outlined" placeholder="Etc: David" />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-label class="font-weight-medium mb-2">State</v-label>
            <v-col cols="12" class="py-0">
              <v-switch v-model:model-value="isBusinessActive" color="primary" label="Active" hide-details />
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>

      <slot name="actions">
        <v-card-text>
          <v-row>
            <v-col sm="6" class="text-left">
              <v-btn flat class="bg-lighterror text-error" @click="handleCancelClick">Cancel</v-btn>
            </v-col>

            <v-col sm="6" class="text-right">
              <v-btn color="white" @click="handleBackClick">Back</v-btn>

              <v-btn flat type="submit" color="secondary" class="ml-4">Complete</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </slot>
    </v-card>
  </form>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";
import { useForm } from "vee-validate";

// Models
import Business from "@/models/business";

// Components shared
import VSelectValidate from "@/components/shared/VSelectValidate/VSelectValidate.vue";
import VTextValidateField from "@/components/shared/VTextValidateField/VTextValidateField.vue";

// Validation
import { createBusinessValidationSchema } from "@/libs/validation/business";

// Constants
import { BUSINESS_STATE, BUSINESS_TYPE_OPTIONS } from "@/modules/businesses/constant";

export type BusinessFormDetailProps = {
  value: Business;
};

const props = defineProps<BusinessFormDetailProps>();

export type FormValues = {
  id?: number;
  name: string;
  type: string;
  owner: string;
  state: string;
};

const { values, handleSubmit, setValues } = useForm<FormValues>({
  initialValues: {
    id: props.value.id,
    name: props.value.name,
    type: props.value.type,
    owner: props.value.owner,
    state: props.value.state,
  },
  validationSchema: createBusinessValidationSchema,
});

const isBusinessActive = computed<boolean>({
  get() {
    return values.state === BUSINESS_STATE.ACTIVE;
  },
  set(isBusinessActive) {
    setValues({
      state: isBusinessActive ? BUSINESS_STATE.ACTIVE : BUSINESS_STATE.UNACTIVE,
    });
  },
});

export type BusinessFormDetailEvents = {
  (event: "back"): void;
  (event: "cancel"): void;
  (event: "submit", values: FormValues): void;
};

const emit = defineEmits<BusinessFormDetailEvents>();

const handleBackClick = () => {
  emit("back");
};

const handleCancelClick = () => {
  emit("cancel");
};

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
