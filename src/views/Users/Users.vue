<template>
  <base-breadcrumb title="Contacts" :breadcrumbs="breadcrumbs"></base-breadcrumb>

  <v-card elevation="10">
    <v-card-text>
      <v-row class="justify-end">
        <v-col class="mb-6 text-right" sm="6">
          <user-form ref="userFormRef" @added="handleUserAdded" @updated="handleUserUpdated" />
        </v-col>
      </v-row>

      <v-table>
        <thead>
          <tr>
            <th class="text-subtitle-1 font-weight-semibold">Id</th>
            <th class="text-subtitle-1 font-weight-semibold">Username</th>
            <th class="text-subtitle-1 font-weight-semibold">Phone</th>
            <th class="text-subtitle-1 font-weight-semibold">Created Date</th>
            <th class="text-subtitle-1 font-weight-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="`row_${user.id}`">
            <td class="text-subtitle-1">#{{ user.id }}</td>

            <td>
              <div class="py-4">
                <h4 class="text-h6">
                  {{ user.firstName }} {{ user.lastName }}
                  <small>({{ user.username }})</small>
                </h4>
                <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ user.email }}</span>
              </div>
            </td>

            <td class="text-subtitle-1">(+{{ user.phoneRegion }}) {{ user.phoneNumber }}</td>

            <td class="text-subtitle-1">
              {{ user.createdDate }}
            </td>

            <td class="text-right">
              <div class="d-flex align-center justify-end">
                <v-tooltip text="Edit">
                  <template v-slot:activator="{ props }">
                    <v-btn icon flat v-bind="props" @click="handleEditClick(user.id)">
                      <PencilIcon size="20" stroke-width="1.5" class="text-primary" />
                    </v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Delete">
                  <template v-slot:activator="{ props }">
                    <v-btn icon flat v-bind="props" @click="handleDeleteClick(user.id)">
                      <TrashIcon size="20" stroke-width="1.5" class="text-error" />
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
// Utilities
import { ref, onMounted } from "vue";
import { useDialog } from "@/modules/dialog/utils";
import { useSnackbar } from "@/modules/snackbar/utils";

// Components
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UserForm, { UserFormExpose } from "@/modules/user/components/UserForm/UserForm.vue";

// Logic
import { useUsersContext } from "./Users";

const userFormRef = ref<UserFormExpose>();

const dialog = useDialog();
const snackbar = useSnackbar();

const { users, loadUsers } = useUsersContext();

const breadcrumbs = ref([
  {
    href: "#",
    disabled: false,
    text: "Dashboard",
  },
  {
    href: "#",
    disabled: true,
    text: "Contact",
  },
]);

onMounted(() => {
  loadUsers();
});

const handleUserAdded = (): void => {
  loadUsers();

  snackbar.addSuccessSnackbar("Add user contact success!!");
};

const handleUserUpdated = (): void => {
  loadUsers();

  snackbar.addSuccessSnackbar("Update user contact success!!");
};

const handleEditClick = (id: number | string): void => {
  if (!userFormRef.value) return;

  userFormRef.value.show(id);
};

const handleDeleteClick = (id: number | string): void => {
  dialog.addDialogConfirm({
    title: "Warning",
    text: "Are you sure to delete the contact? This action can not be restored.",

    onAgree: () => {
      console.log("id", id);
    },
  });
};
</script>
