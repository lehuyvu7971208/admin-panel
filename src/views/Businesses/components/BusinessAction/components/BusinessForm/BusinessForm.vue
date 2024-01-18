<template>
  <div class="business-form">
    <v-stepper ref="stepperRef" model-value="1" elevation="0" class="mb-6">
      <v-stepper-header>
        <v-stepper-item title="User information" value="1"></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item title="Business information" value="2"></v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item value="1">
          <v-row class="justify-center">
            <v-col sm="8">
              <business-form-user :value="user" @cancel="$emit('cancel')" @submit="handleUserFormSubmit" />
            </v-col>
          </v-row>
        </v-stepper-window-item>

        <v-stepper-window-item value="2">
          <v-row class="justify-center">
            <v-col sm="8">
              <business-form-detail @cancel="$emit('cancel')" @back="handleBackClick" @submit="handleDetailFormSubmit" />
            </v-col>
          </v-row>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>

<script lang="ts" setup>
// Utilities
import * as Yup from "yup";
import { ref, computed } from "vue";
import { useForm } from "vee-validate";

// Components
import BusinessFormUser, { FormValues as UserFormValues } from "../BusinessFormUser/BusinessFormUser.vue";
import BusinessFormDetail, { FormValues as DetailFormValues } from "../BusinessFormDetail/BusinessFormDetail.vue";

// Validation
import { createUserValidationSchema } from "@/libs/validation/user";
import { createBusinessValidationSchema } from "@/libs/validation/business";

// Constant
import { USER_STATE } from "@/modules/users/constant";
import { BUSINESS_STATE, BUSINESS_TYPE } from "@/modules/businesses/constant";

const stepperRef = ref();

export type FormValues = DetailFormValues & {
  user: UserFormValues;
};

const validationSchema = Yup.object({
  user: createUserValidationSchema,
}).concat(createBusinessValidationSchema);

const { values, handleSubmit, setValues } = useForm<FormValues>({
  validationSchema,
  initialValues: {
    id: 0,
    name: "",
    owner: "",
    type: BUSINESS_TYPE.NONE,
    state: BUSINESS_STATE.ACTIVE,

    user: {
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
  },
});

const user = computed<UserFormValues>(() => values.user);

export type BusinessFormEvents = {
  (event: "cancel"): void;
  (event: "submit", values: FormValues): void;
};

const emit = defineEmits<BusinessFormEvents>();

const handleBackClick = () => {
  stepperRef.value?.prev();
};

const handleUserFormSubmit = (values: UserFormValues) => {
  stepperRef.value?.next();
  setValues({ user: values });
};

const handleDetailFormSubmit = (values: DetailFormValues) => {
  setValues({
    ...values,
  });

  handleFormSubmit();
};

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>

<style lang="scss" scoped>
@import "./BusinessForm.scss";
</style>
