<template>
  <layout-default>
    <v-container class="fill-height">
      <v-row justify="center">
        <v-sheet width="100%" max-width="350px">
          <v-form>
            <v-container>
              <v-row class="mb-3">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"

                  color="blue"
                  label="Username"
                  prepend-inner-icon="mdi-account"
                  placeholder="Enter your username"
                />
              </v-row>

              <v-row class="mb-3">
                <v-text-field
                  v-model="password"
                  
                  :type="passwordType"
                  :rules="passwordRules"
                  :append-inner-icon="passwordToggleIcon"

                  color="blue"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  placeholder="Enter your password"

                  @click:append-inner="togglePasswordShow"
                />
              </v-row>

              <v-row justify="space-between">
                <v-btn
                  color="blue"
                  variant="plain"
                >
                  Forgot password?
                </v-btn>

                <v-btn
                  color="blue"
                  variant="elevated"
                >
                  Login
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-sheet>
      </v-row>
    </v-container>
  </layout-default>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Components
import LayoutDefault from '@/layouts/default/Default.vue';

const username = ref<string>('');
const usernameRules = ref<Array<any>>([
  (value: string) => !!value || 'Username is required',
]);

const password = ref<string>('');
const passwordRules = ref<Array<any>>([
  (value: string) => !!value || 'Password is required',
]);

const isPasswordShow = ref<Boolean>(false);

const passwordType = computed<string>(() => {
  if (isPasswordShow.value) return 'text';

  return 'password';
});

const passwordToggleIcon = computed<string>(() => {
  if (isPasswordShow.value) return 'mdi-eye-off';

  return 'mdi-eye';
});

const togglePasswordShow = () : void => {
  isPasswordShow.value = !isPasswordShow.value;
};
</script>

