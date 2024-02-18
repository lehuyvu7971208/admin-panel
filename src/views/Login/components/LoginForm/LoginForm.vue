<template>
  <div class="pa-3">
    <v-row class="h-100vh mh-100 auth">
      <v-col lg="7" xl="8" cols="12" class="d-lg-flex align-center justify-center authentication position-relative">
        <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
          <div class="position-relative">
            <Logo />
          </div>
        </div>

        <div>
          <img height="450" alt="login-background" class="position-relative d-none d-lg-flex" src="@/assets/images/backgrounds/login-bg.svg" />
        </div>
      </v-col>

      <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center bg-surface">
        <div class="mt-xl-0 mt-5 px-12 w-100">
          <h2 class="text-h3 font-weight-semibold mb-2">Welcome to Flexy</h2>

          <div class="text-subtitle-1 mb-6">Your Admin Dashboard</div>

          <v-form class="mt-5" @submit.prevent="handleFormSubmit">
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Username</v-label>
            <VTextField v-model="username" :rules="usernameRules" class="mb-8" required hide-details="auto"></VTextField>

            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
            <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password" class="pwdInput"></VTextField>

            <div class="d-flex flex-wrap align-center my-3 ml-n2">
              <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" required hide-details color="primary">
                <template v-slot:label>Remeber this Device</template>
              </v-checkbox>
              <div class="ml-sm-auto">
                <RouterLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"> Forgot Password ?</RouterLink>
              </div>
            </div>
            <v-btn size="large" :loading="isSubmitting" color="primary" block type="submit" flat>Sign In</v-btn>
            <div v-if="errorMessage" class="mt-2">
              <v-alert color="error">{{ errorMessage }}</v-alert>
            </div>
          </v-form>

          <h6 class="text-h6 text-medium-emphasis d-flex align-center mt-6 font-weight-medium">
            New to Flexy?
            <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto" variant="plain">Create an account</v-btn>
          </h6>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
// Utilities
import { ref } from "vue";

// Components
import Logo from "frontend/Layout/FullLayout/Logo/LogoDark.vue";

type LoginFormProps = {
  isSubmitting: boolean;
  errorMessage: string | null;
};

type LoginFormEvents = {
  (event: "submit", username: string, password: string): void;
};

defineProps<LoginFormProps>();
const emit = defineEmits<LoginFormEvents>();

const username = ref<string>("");
const password = ref<string>("");
const checkbox = ref<boolean>(false);

const usernameRules = ref<Array<any>>([(value: string) => !!value || "Username is required"]);

const passwordRules = ref<Array<any>>([(value: string) => !!value || "Password is required"]);

const handleFormSubmit = () => {
  emit("submit", username.value, password.value);
};
</script>
