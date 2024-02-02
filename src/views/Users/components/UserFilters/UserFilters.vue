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
              <v-label class="font-weight-medium mb-2">Username</v-label>
              <v-text-field
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                name="username"
                hide-details="auto"
                placeholder="Etc: johnDoe"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">First name</v-label>
              <v-text-field
                v-model="firstName.value.value"
                :error-messages="firstName.errorMessage.value"
                name="firstName"
                hide-details="auto"
                placeholder="Etc: John"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Last name</v-label>
              <v-text-field
                v-model="lastName.value.value"
                :error-messages="lastName.errorMessage.value"
                name="lastName"
                hide-details="auto"
                placeholder="Etc: Doe"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Email</v-label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                name="email"
                hide-details="auto"
                placeholder="Etc: johnDoe@gmail.com"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Phone number</v-label>
              <v-text-field
                v-model="phoneNumber.value.value"
                :error-messages="phoneNumber.errorMessage.value"
                name="phoneNumber"
                hide-details="auto"
                placeholder="Etc: 0900000000"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Created date</v-label>
              <v-text-field
                v-model="createdDate.value.value"
                :error-messages="createdDate.errorMessage.value"
                name="createdDate"
                hide-details="auto"
                placeholder="Etc: 10/10/2023"
              />
            </v-col>

            <v-col sm="4">
              <v-switch v-model="includeDeleted.value.value" name="includeDeleted" color="primary" label="Include deleted"></v-switch>
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
import { useForm, useField } from "vee-validate";

// Apis
import { FindAllUsersParamsData } from "@/modules/users/api/users";

type UserFiltersProps = {
  filters: FindAllUsersParamsData;
};

type UserFiltersEvents = {
  (event: "submit", filters: FindAllUsersParamsData): void;
};

const validationSchema = Yup.object({
  email: Yup.string().optional().default(""),

  username: Yup.string().optional().default(""),
  lastName: Yup.string().optional().default(""),
  firstName: Yup.string().optional().default(""),

  phoneNumber: Yup.string().optional().default(""),
  createdDate: Yup.string().optional().default(""),
  includeDeleted: Yup.boolean().optional().default(false),
}).optional();

const emit = defineEmits<UserFiltersEvents>();

const props = defineProps<UserFiltersProps>();

const { handleSubmit, setValues, handleReset } = useForm<FindAllUsersParamsData>({
  validationSchema,
  initialValues: {
    email: "",
    username: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    createdDate: "",
    includeDeleted: false,
  },
});

const email = useField<string>("email");
const username = useField<string>("username");
const lastName = useField<string>("lastName");
const firstName = useField<string>("firstName");
const phoneNumber = useField<string>("phoneNumber");
const createdDate = useField<string>("createdDate");
const includeDeleted = useField<boolean>("includeDeleted");

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});

watch(
  () => props.filters,
  (filters) => setValues(filters, false),
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
@import "./UserFilters.scss";
</style>
