<template>
  <v-expansion-panels>
    <v-expansion-panel elevation="10">
      <v-expansion-panel-title color="white" class="text-h6"> <v-icon icon="mdi-filter-variant" class="mr-3" /> Filter </v-expansion-panel-title>

      <v-expansion-panel-text>
        <form class="py-2" @submit="handleFormSumit">
          <v-row>
            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Username</v-label>
              <v-text-validate-field name="username" hide-details="auto" placeholder="Etc: admin" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Type</v-label>
              <v-select-validate name="type" :items="ADMIN_ROLE_OPTIONS" hide-details="auto" />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">State</v-label>
              <v-select-validate name="state" :items="ADMIN_STATE_OPTIONS" hide-details="auto" />
            </v-col>

            <v-col sm="4">
              <v-switch-validate name="includeDeleted" color="primary" label="Include deleted" />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-right">
              <v-btn flat class="bg-lighterror text-error">Reset</v-btn>

              <v-btn flat class="ml-4" type="submit" color="secondary">Apply</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
// Utilities
import * as Yup from "yup";
import { watch } from "vue";
import { useForm } from "vee-validate";

// Components Shared
import VSwitchValidate from "@/components/shared/VSwitchValidate/VSwitchValidate.vue";
import VSelectValidate from "@/components/shared/VSelectValidate/VSelectValidate.vue";
import VTextValidateField from "@/components/shared/VTextValidateField/VTextValidateField.vue";

// Apis
import { FindAllAdminsParamsData } from "@/modules/admins/api/admins";

// Constants
import { ADMIN_ROLE_OPTIONS, ADMIN_STATE_OPTIONS } from "@/modules/admins/constant";

type AdminFiltersProps = {
  filters: FindAllAdminsParamsData;
};

const props = defineProps<AdminFiltersProps>();

const validationSchema = Yup.object({
  type: Yup.string().default(""),
  state: Yup.string().default(""),
  username: Yup.string().optional().default(""),
  includeDeleted: Yup.boolean().optional().default(false),
}).optional();

type AdminFiltersEvent = {
  (event: "submit", data: FindAllAdminsParamsData): void;
};

const emit = defineEmits<AdminFiltersEvent>();

const { handleSubmit, setValues } = useForm<FindAllAdminsParamsData>({
  validationSchema,
  initialValues: {
    type: "",
    state: "",
    username: "",
  },
});

const handleFormSumit = handleSubmit((values) => {
  emit("submit", values);
});

watch(
  () => props.filters,
  () => {
    setValues({
      type: props.filters?.type,
      state: props.filters?.state,
      username: props.filters?.username,
    });
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
@import "./AdminFilters.scss";
</style>
