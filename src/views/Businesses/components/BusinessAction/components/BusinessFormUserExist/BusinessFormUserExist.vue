<template>
  <form autocomplete="off" @submit="handleFormSubmit">
    <v-card elevation="0">
      <v-card-text>
        <v-row class="align-center">
          <v-col sm="3">
            <v-label>Search</v-label>
          </v-col>

          <v-col sm="9">
            <v-text-field v-model:model-value="keyword" hide-details placeholder="Username, First name, Phone number ...." />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-table class="mb-3" density="comfortable">
          <thead>
            <tr>
              <th class="text-subtitle-1 font-weight-semibold">Id</th>
              <th class="text-subtitle-1 font-weight-semibold">Username</th>
              <th class="text-subtitle-1 font-weight-semibold">Information</th>
            </tr>
          </thead>

          <tbody>
            <template v-if="hasSearchedUsers">
              <tr v-for="user in searchUsers" :key="`row_${user.id}`" @click="handleUserClick(user)">
                <td>
                  <v-radio v-model="selectedUser" :true-value="user.id">
                    <template #label>#{{ user.id }}</template>
                  </v-radio>
                </td>

                <td>
                  <div class="py-4">
                    <h4 class="text-h6">
                      {{ user.firstName }} {{ user.lastName }}
                      <small>({{ user.username }})</small>
                    </h4>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ user.email }}</span>
                  </div>
                </td>

                <td>
                  <div class="py-4">
                    <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                      <phone-icon size="16" class="mr-2" />
                      (+{{ user.phoneRegion }}) {{ user.phoneNumber }}
                    </span>

                    <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                      <mail-icon size="16" class="mr-2" />
                      {{ user.email }}
                    </span>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="3" class="text-center text-subtitle-1">No data</td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-card-text>

      <slot name="actions">
        <v-card-text>
          <v-row>
            <v-col sm="6" class="text-left">
              <v-btn flat class="bg-lighterror text-error" @click="$emit('cancel')">Cancel</v-btn>
            </v-col>

            <v-col sm="6" class="text-right">
              <v-btn flat type="submit" color="secondary" class="ml-4" :disabled="!selectedUser">Next</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </slot>
    </v-card>
  </form>
</template>

<script lang="ts" setup>
// Utilities
import { ref, watch, computed } from "vue";

// Remote Utilities
import Dialog from "frontend/Modules/Dialog.js";
import Loading from "frontend/Modules/Loading.js";

// Components
import { MailIcon, PhoneIcon } from "vue-tabler-icons";

// Store
import { useBusinessActionStore } from "../../store/businessAction";

const dialog = Dialog.useDialog();
const loading = Loading.useLoading();

export type BusinessFormUserExistEvents = {
  (event: "cancel"): void;
  (event: "submit", id: number): void;
};

const emit = defineEmits<BusinessFormUserExistEvents>();

const selectedUser = ref<number>(0);
const businessActionStore = useBusinessActionStore();

const keyword = computed<string>({
  get() {
    return businessActionStore.searchKeyword;
  },
  set(keyword: string) {
    businessActionStore.setSearchKeyword(keyword);
  },
});

const searchUsers = computed<Array<any>>(() => {
  return businessActionStore.searchedUsers;
});

const hasSearchedUsers = computed<boolean>(() => {
  return searchUsers.value.length > 0;
});

const handleUserClick = (user: any) => {
  selectedUser.value = user.id;
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  emit("submit", selectedUser.value);
};

const loadSearchUsers = async () => {
  try {
    loading(true);

    await businessActionStore.getSearchUsers();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

let loadUserTimeout: any = null;
watch(
  () => keyword.value,
  (keyword: string) => {
    if (!keyword) return;

    clearTimeout(loadUserTimeout);
    loadUserTimeout = setTimeout(async () => loadSearchUsers(), 600);
  }
);
</script>
