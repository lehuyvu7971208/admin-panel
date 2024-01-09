<template>
  <v-dialog max-width="500" persistent v-model="isDialogShown">
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props" flat> <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Admin </v-btn>
    </template>

    <v-card>
      <v-card-title class="pa-4 bg-secondary">
        <span class="title text-white">{{ dialogTitle }}</span>
      </v-card-title>

      <form autocomplete="off" @submit="handleFormSubmit">
        <v-card-text>
          <h6 class="text-h6 mb-6">Admin Detail</h6>

          <v-row>
            <v-col cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Username</v-label>
              <v-text-validate-field name="username" placeholder="johndeo" :readonly="isFieldReadonly" />
            </v-col>

            <v-col v-if="!values.id" cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Password</v-label>
              <v-password-validate-field name="password" placeholder="Admin password" />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-label class="font-weight-medium mb-2">Roles</v-label>
              <v-select-validate name="type" :items="adminRoleOptions" placeholder="Admin roles" />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-switch color="primary" v-model="isAdminActive" label="Active" hide-details />
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
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { ref, watch, computed } from "vue";

// Models
import Admin from "@/modules/admins/models/admin";

// Components shared
import VSelectValidate from "@/components/shared/VSelectValidate/VSelectValidate.vue";
import VTextValidateField from "@/components/shared/VTextValidateField/VTextValidateField.vue";
import VPasswordValidateField from "@/components/shared/VPasswordValidateField/VPasswordValidateField.vue";

// Constants
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS, ADMIN_STATE, DEFAULT_ADMIN_ROLE } from "@/modules/admins/constant";

const isDialogShown = ref<boolean>(false);

const validationSchema = Yup.object({
  id: Yup.number(),

  password: Yup.string().required(),
  username: Yup.string().required(),

  type: Yup.string().oneOf(Object.values(ADMIN_ROLE)).required(),
});

export type FormValues = {
  id?: number;
  type: string;
  state: string;
  username: string;
  password: string;
};

export type AdminActionProps = {
  value?: Admin;
};

const props = defineProps<AdminActionProps>();

export type AdminActionEvents = {
  (event: "show"): void;
  (event: "hide"): void;
  (event: "submit", user?: FormValues): void;
};

const emit = defineEmits<AdminActionEvents>();

const { values, handleSubmit, handleReset, setValues } = useForm<FormValues>({
  validationSchema,

  initialValues: {
    id: 0,
    username: "",
    password: "",
    type: "manager",
    state: ADMIN_STATE.UNACTIVE,
  },
}); 

const dialogTitle = computed<string>(() => {
  return values.id ? "Edit Admin" : "Add Admin";
});

const isFieldReadonly = computed<boolean>(() => {
  return !!values.id;
});

const isAdminActive = computed<boolean>({
  get() {
    return values.state === ADMIN_STATE.ACTIVE;
  },

  set(isAdminActive) {
    setValues({
      state: isAdminActive ? ADMIN_STATE.ACTIVE : ADMIN_STATE.UNACTIVE,
    });
  },
});

const adminRoleOptions = computed(() => {
  return ADMIN_ROLE_OPTIONS.filter(({ value }) => !!value);
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
      id: props.value?.id,
      state: props.value?.state,
      username: props.value?.username,
      password: props.value?.password,
      type: props.value?.type ?? DEFAULT_ADMIN_ROLE,
    });

    emit("show");
  } else {
    emit("hide");
    handleReset();
  }
});

export type AdminActionExpose = {
  hide(): void;
  show(): void;
};

defineExpose<AdminActionExpose>({
  show: () => (isDialogShown.value = true),
  hide: () => (isDialogShown.value = false),
});
</script>
