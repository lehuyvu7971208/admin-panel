<template>
  <v-card elevation="0">
    <v-card-text class="py-0">
      <v-radio-group v-model:model-value="userType" hide-details>
        <v-row>
          <v-col sm="6">
            <v-radio :value="SELECT_USER_TYPE.CREATE" label="Create a new user" color="primary"></v-radio>
          </v-col>

          <v-col sm="6">
            <v-radio :value="SELECT_USER_TYPE.EXIST" label="Use a exsited user" color="primary"></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-card-text>
  </v-card>

  <component :is="userFormComponent" @cancel="$emit('cancel')" @submit="handleUserFormSubmit" />
</template>

<script lang="ts" setup>
// Utilities
import { ref, computed } from "vue";

// Components
import BusinessFormUserExist from "../BusinessFormUserExist/BusinessFormUserExist.vue";
import BusinessFormUserCreate, { FormValues as CreateUserFormValue } from "../BusinessFormUserCreate/BusinessFormUserCreate.vue";

// Store
import { useBusinessActionStore } from "../../store/businessAction";

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

// Constants
const SELECT_USER_TYPE = {
  EXIST: "EXIST",
  CREATE: "CREATE",
};

const businessActionStore = useBusinessActionStore();
const userType = ref<string>(SELECT_USER_TYPE.CREATE);

const userFormComponent = computed(() => {
  if (userType.value === SELECT_USER_TYPE.CREATE) {
    return BusinessFormUserCreate;
  }

  if (userType.value === SELECT_USER_TYPE.EXIST) {
    return BusinessFormUserExist;
  }
  return null;
});

export type BusinessFormUserEvents = {
  (event: "cancel"): void;
  (event: "submit", values: any): void;
};

const emit = defineEmits<BusinessFormUserEvents>();

const handleUserFormSubmit = (data: any) => {
  if (userType.value === SELECT_USER_TYPE.EXIST) {
    handleExistUserFormSubmit(data);
  } else if (userType.value === SELECT_USER_TYPE.CREATE) {
    handleCreateUserFormSubmit(data);
  }
};

const handleExistUserFormSubmit = async (id: number) => {
  const user = await businessActionStore.getSearchedUser(id);

  emit("submit", user);
};

const handleCreateUserFormSubmit = (data: CreateUserFormValue) => {
  emit("submit", data);
};
</script>
