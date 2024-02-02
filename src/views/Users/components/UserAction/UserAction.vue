<template>
  <v-dialog max-width="600" v-model="isDialogShown" persistent class="align-start">
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }">
        <v-btn color="primary" v-bind="props" flat> <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add User</v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title class="pa-4 bg-secondary">
        <span class="title text-white">{{ dialogTitle }}</span>
      </v-card-title>

      <form autocomplete="off" @submit="handleFormSubmit">
        <v-card-text>
          <h6 class="text-h6 mb-6">User Detail</h6>

          <v-row>
            <v-col cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Username</v-label>
              <v-text-validate-field
                :readonly="isFieldReadonly"
                type="text"
                name="username"
                color="primary"
                variant="outlined"
                placeholder="johndeo"
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Email</v-label>
              <v-text-validate-field :readonly="isFieldReadonly" name="email" color="primary" variant="outlined" placeholder="john.deo" />
            </v-col>

            <v-col v-if="!values.id" cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Password</v-label>
              <v-password-validate-field name="password" color="primary" variant="outlined" placeholder="john.deo" />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-switch color="primary" v-model="isUserActived" label="Active" hide-details />
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
                  <v-select-validate name="phoneRegion" :items="SUPPORTED_REGIONS" :readonly="isFieldReadonly" />
                </v-col>
                <v-col cols="9">
                  <v-text-validate-field
                    :readonly="isFieldReadonly"
                    type="text"
                    color="primary"
                    name="phoneNumber"
                    variant="outlined"
                    placeholder="0900000000"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <div class="mb-3 text-right">
                <v-btn flat class="bg-lighterror text-error" @click="handleCancelClick">Cancel</v-btn>

                <v-btn flat type="submit" color="secondary" class="ml-4">Submit</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
// Utilities
import { useForm } from "vee-validate";
import { ref, watch, computed } from "vue";

// Models
import User from "@/models/user";

// Components
import VSelectValidate from "@/components/shared/VSelectValidate/VSelectValidate.vue";
import VTextValidateField from "@/components/shared/VTextValidateField/VTextValidateField.vue";
import VPasswordValidateField from "@/components/shared/VPasswordValidateField/VPasswordValidateField.vue";

// Validation
import { createUserValidationSchema } from "@/libs/validation/user";

// Constant
import { SUPPORTED_REGIONS } from "@/libs/constant";
import { USER_STATE } from "@/modules/users/constant";

const isDialogShown = ref<boolean>(false);

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

export type UserActionProps = {
  value?: User;
};

const props = defineProps<UserActionProps>();

export type UserActionEvents = {
  (event: "show"): void;
  (event: "hide"): void;
  (event: "submit", user?: FormValues): void;
};

const emit = defineEmits<UserActionEvents>();

const { values, handleSubmit, handleReset, setValues } = useForm<FormValues>({
  initialValues: {
    id: 0,
    email: "",
    username: "",
    password: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    phoneRegion: "84",
    state: USER_STATE.UNACTIVE,
  },
  validationSchema: createUserValidationSchema,
});

const dialogTitle = computed<string>(() => {
  return values.id ? "Edit User" : "Add User";
});

const isFieldReadonly = computed(() => {
  return !!values.id;
});

const isUserActived = computed<boolean>({
  get() {
    return values.state === USER_STATE.ACTIVE;
  },
  set(isUserActived) {
    setValues({
      state: isUserActived ? USER_STATE.ACTIVE : USER_STATE.UNACTIVE,
    });
  },
});

const handleCancelClick = () => {
  isDialogShown.value = false;
};

const handleFormSubmit = handleSubmit((values) => {
  emit("submit", values);
});

watch(isDialogShown, (isDialogShown: boolean) => {
  if (isDialogShown) {
    setValues({
      id: props.value?.id ?? 0,
      email: props.value?.email ?? "",
      username: props.value?.username ?? "",
      lastName: props.value?.lastName ?? "",
      firstName: props.value?.firstName ?? "",
      phoneNumber: props.value?.phoneNumber ?? "",
      phoneRegion: props.value?.phoneRegion ?? "84",
      state: props.value?.state ?? USER_STATE.UNACTIVE,
    });

    emit("show");
  } else {
    emit("hide");
    handleReset();
  }
});

export type UserFormExpose = {
  hide(): void;
  show(): void;
};

defineExpose<UserFormExpose>({
  show: () => (isDialogShown.value = true),
  hide: () => (isDialogShown.value = false),
});
</script>

<style lang="scss" scoped>
@import "./UserAction.scss";
</style>
