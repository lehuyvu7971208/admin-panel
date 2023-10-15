<template>
  <v-dialog v-model="isDialogShown" max-width="650">
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props" flat class="ml-auto"> <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Contact </v-btn>
    </template>

    <v-card>
      <v-card-title class="pa-4 bg-secondary">
        <span class="title text-white">Add contact</span>
      </v-card-title>

      <v-card-text v-if="errorMessage" class="mb-6">
        <v-alert type="error" title="Error" :text="errorMessage"></v-alert>
      </v-card-text>

      <form autocomplete="off" @submit.prevent="handleFormSubmit">
        <v-card-text>
          <h6 class="text-h6 mb-6">Contact Details</h6>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Username</v-label>
                <v-text-field
                  v-model="username.value.value"
                  :readonly="isUserEdited"
                  :error-messages="username.errorMessage.value"
                  type="text"
                  color="primary"
                  variant="outlined"
                  placeholder="johndeo"
                />
              </div>
            </v-col>

            <v-col>
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Email</v-label>
                <v-text-field
                  v-model="email.value.value"
                  :readonly="isUserEdited"
                  :error-messages="email.errorMessage.value"
                  color="primary"
                  variant="outlined"
                  placeholder="john.deo"
                />
              </div>
            </v-col>
          </v-row>

          <v-row v-if="!isUserEdited">
            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Password</v-label>
                <v-text-field
                  v-model="password.value.value"
                  :type="passwordInputType"
                  :append-inner-icon="appendPasswordIcon"
                  :error-messages="password.errorMessage.value"
                  color="primary"
                  variant="outlined"
                  placeholder="john.deo"
                  @click:append-inner="togglePasswordShown"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Confirm Password</v-label>
                <v-text-field
                  v-model="confirmPassword.value.value"
                  :type="confirmPasswordInputType"
                  :append-inner-icon="appendConfirmPasswordIcon"
                  :error-messages="confirmPassword.errorMessage.value"
                  color="primary"
                  variant="outlined"
                  placeholder="john.deo"
                  @click:append-inner="toggleConfirmPasswordShown"
                />
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <h6 class="text-h6 mb-6">Contact Information</h6>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">First Name</v-label>
                <v-text-field
                  v-model="firstName.value.value"
                  :error-messages="firstName.errorMessage.value"
                  type="text"
                  color="primary"
                  variant="outlined"
                  placeholder="John"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Last Name</v-label>
                <v-text-field
                  v-model="lastName.value.value"
                  :error-messages="lastName.errorMessage.value"
                  type="text"
                  color="primary"
                  placeholder="Deo"
                  variant="outlined"
                />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Phone Region</v-label>
                <v-text-field
                  v-model="phoneRegion.value.value"
                  :error-messages="phoneRegion.errorMessage.value"
                  type="text"
                  color="primary"
                  placeholder="+84"
                  variant="outlined"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="mb-3">
                <v-label class="font-weight-medium mb-2">Phone Number</v-label>
                <v-text-field
                  v-model="phoneNumber.value.value"
                  :error-messages="phoneNumber.errorMessage.value"
                  type="text"
                  color="primary"
                  variant="outlined"
                  placeholder="0900000000"
                />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="mb-3 text-right">
                <v-btn flat class="bg-lighterror text-error" @click="handleCancelClick">Cancel</v-btn>

                <v-btn flat :loading="isSubmitting" type="submit" color="secondary" class="ml-4"> Submit </v-btn>
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
import { useField } from "vee-validate";
import { ref, computed, watch, defineExpose } from "vue";

// Logic
import { userUserFormContext } from "./UserForm";

// Apis
import { User } from "@/api/users";

export type UserFormExpose = {
  hide(): void;
  show(id: number | string): Promise<void>;
};

export type UserFormEvents = {
  (event: "added", user: User | undefined): void;
  (event: "updated", user: User | undefined): void;
};

const isDialogShown = ref<boolean>(false);

const handleCancelClick = () => {
  isDialogShown.value = false;
};

const isPasswordShown = ref<boolean>(false);

const appendPasswordIcon = computed<string>(() => {
  return isPasswordShown.value ? "mdi-eye-off" : "mdi-eye";
});

const passwordInputType = computed<string>(() => {
  return isPasswordShown.value ? "text" : "password";
});

const togglePasswordShown = (): void => {
  isPasswordShown.value = !isPasswordShown.value;
};

const isConfirmPasswordShown = ref<boolean>(false);

const appendConfirmPasswordIcon = computed<string>(() => {
  return isConfirmPasswordShown.value ? "mdi-eye-off" : "mdi-eye";
});

const confirmPasswordInputType = computed<string>(() => {
  return isConfirmPasswordShown.value ? "text" : "password";
});

const toggleConfirmPasswordShown = (): void => {
  isConfirmPasswordShown.value = !isConfirmPasswordShown.value;
};

const { values, reset, submit, loadUser, validate } = userUserFormContext();

const isUserEdited = computed(() => {
  return !!values.id;
});

const email = useField<string>("email");
const username = useField<string>("username");

const password = useField<string>("password");
const confirmPassword = useField<string>("confirmPassword");

const lastName = useField<string>("lastName");
const firstName = useField<string>("firstName");

const phoneRegion = useField<string>("phoneRegion");
const phoneNumber = useField<string>("phoneNumber");

const emit = defineEmits<UserFormEvents>();

const isSubmitting = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const handleFormSubmit = async (): Promise<void> => {
  try {
    const validation = await validate();
    if (!validation.valid) return;

    errorMessage.value = null;
    isSubmitting.value = true;

    const user = await submit();

    if (values.id) {
      emit("updated", user);
    } else {
      emit("added", user);
    }

    isDialogShown.value = false;
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
};

watch(isDialogShown, (isDialogShown) => {
  if (!isDialogShown) {
    reset();
    errorMessage.value = null;
    isSubmitting.value = false;
  }
});

const show = async (id: number | string): Promise<void> => {
  try {
    await loadUser(id);

    isDialogShown.value = true;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};

const hide = (): void => {
  isDialogShown.value = false;
};

defineExpose<UserFormExpose>({
  show,
  hide,
});
</script>
