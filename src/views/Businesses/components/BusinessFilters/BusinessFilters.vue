<template>
  <v-expansion-panels>
    <v-expansion-panel elevation="10">
      <v-expansion-panel-title color="white" class="text-h6" static>
        <v-icon icon="mdi-filter-variant" class="mr-3" /> Filter
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <form class="py-2" @submit.prevent="handleFormSubmit">
          <v-row>
            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Name</v-label>
              <v-text-validate-field name="name" hide-details="auto" placeholder="Etc: Adidas shop" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Owner</v-label>
              <v-text-validate-field name="owner" hide-details="auto" placeholder="Etc: David" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">User</v-label>
              <v-text-validate-field name="userId" hide-details="auto" placeholder="Etc: David" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Type</v-label>
              <v-select-validate name="type" :items="BUSINESS_TYPE_OPTIONS" hide-details="auto" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">State</v-label>
              <v-select-validate name="state" :items="BUSINESS_STATE_OPTIONS" hide-details="auto" />
            </v-col>

            <v-col sm="12">
              <v-switch-validate name="includeDeleted" color="primary" label="Include deleted" />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-right">
              <v-btn flat class="bg-lighterror text-error" @click="handleReset">Reset</v-btn>

              <v-btn flat class="ml-4" type="submit" color="secondary">Apply</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <slot name="filtered" />
</template>

<script lang="ts" setup>
// Utilities
import * as Yup from "yup";
import { watch } from "vue";
import { useForm } from "vee-validate";

// Apis
import { FindAllBusinessesParamsData } from "@/modules/businesses/api/businesses";

// Remote Components
import VSwitchValidate from "frontend/VSwitchValidate.vue";
import VSelectValidate from "frontend/VSelectValidate.vue";
import VTextValidateField from "frontend/VTextValidateField.vue";

// Constants
import { BUSINESS_STATE_OPTIONS, BUSINESS_TYPE_OPTIONS } from "@/modules/businesses/constant";

export type BusinessFiltersProps = {
  filters: FindAllBusinessesParamsData;
};

const props = defineProps<BusinessFiltersProps>();

const validationSchema = Yup.object({
  type: Yup.string().default(""),
  state: Yup.string().default(""),
  userId: Yup.string().default(""),
  name: Yup.string().optional().default(""),
  owner: Yup.string().optional().default(""),
  includeDeleted: Yup.boolean().optional().default(false),
});

export type BusinessFiltersEvents = {
  (event: "submit", data: FindAllBusinessesParamsData): void;
};

const emit = defineEmits<BusinessFiltersEvents>();

const { handleSubmit, setValues, handleReset } = useForm<FindAllBusinessesParamsData>({
  validationSchema,
  initialValues: {
    name: "",
    type: "",
    owner: "",
    state: "",
    userId: "",
    includeDeleted: false,
  },
});

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});

watch(
  () => props.filters,
  (filters) => {
    setValues(filters, false);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
