<template>
  <v-row class="my-0 justify-center">
    <v-col sm="8">
      <v-card elevation="0">
        <v-card-text>
          <v-row class="align-center">
            <v-col sm="9">
              <h4 class="text-h6 mb-3">
                {{ business.user.firstName }} {{ business.user.lastName }}
                <small>({{ business.user.username }})</small>
              </h4>

              <div>
                <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                  <phone-icon size="16" class="mr-2" />
                  (+{{ business.user.phoneRegion }}) {{ business.user.phoneNumber }}
                </span>

                <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                  <mail-icon size="16" class="mr-2" />
                  {{ business.user.email }}
                </span>
              </div>
            </v-col>

            <v-col sm="3" class="text-right">
              <user-action :value="user" ref="userActionRef" @submit="handleUserActionSubmit">
                <template #activator>
                  <v-btn variant="outlined" icon color="primary" @click="handleUserEdit">
                    <pencil-icon stroke-width="1.5" size="22" />
                  </v-btn>
                </template>
              </user-action>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card elevation="0">
        <v-card-text class="py-0">
          <v-divider :thickness="4"></v-divider>
        </v-card-text>
      </v-card>

      <business-form-detail :value="business" @submit="handleDetailFormSubmit">
        <template #actions>
          <v-card-text>
            <v-row>
              <v-col sm="12" class="text-right">
                <v-btn flat class="bg-lighterror text-error" @click="$emit('cancel')">Cancel</v-btn>

                <v-btn flat type="submit" color="secondary" class="ml-4">Submit</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </template>
      </business-form-detail>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
// Utilities
import { ref, computed } from "vue";

// Models
import User from "@/models/user";
import Business from "@/models/business";

// Components
import BusinessFormDetail from "../BusinessFormDetail/BusinessFormDetail.vue";
import UserAction, { UserFormExpose } from "@/views/Users/components/UserAction/UserAction.vue";

// Store
import { useBusinessActionStore } from "../../store/businessAction";

const userActionRef = ref<UserFormExpose>();
const businessActionStore = useBusinessActionStore();

const user = computed<User>(() => businessActionStore.user);
const business = computed<Business>(() => businessActionStore.business);

export type BusinessFormEditEvents = {
  (event: "cancel"): void;
  (event: "submit", values: any): void;
};

const emit = defineEmits<BusinessFormEditEvents>();

const handleUserEdit = async () => {
  await businessActionStore.getUserById(business.value.user.id);

  userActionRef.value?.show();
};

const handleUserActionSubmit = async (data: any) => {
  const user = User.build(data) as User;
  await businessActionStore.setUser(user);

  await businessActionStore.updateUser();

  await businessActionStore.getBusinessById(business.value.id);

  userActionRef.value?.hide();
};

const handleDetailFormSubmit = async (values: any) => {
  emit("submit", values);
};
</script>
