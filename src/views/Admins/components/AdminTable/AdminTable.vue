<template>
  <v-table class="mb-3" density="comfortable">
    <thead>
      <tr>
        <th class="text-subtitle-1 font-weight-semibold">Id</th>
        <th class="text-subtitle-1 font-weight-semibold">Username</th>
        <th class="text-subtitle-1 font-weight-semibold">Role</th>
        <th class="text-subtitle-1 font-weight-semibold">State</th>
        <th class="text-subtitle-1 font-weight-semibold">Created Date</th>
        <th class="text-subtitle-1 font-weight-semibold text-right">Actions</th>
      </tr>
    </thead>

    <tbody>
      <template v-if="hasAdmins">
        <tr v-for="admin in admins" :key="`row_${admin.id}`">
          <td class="text-subtitle-1">#{{ admin.id }}</td>

          <td class="text-subtitle-1 py-5">{{ admin.username }}</td>

          <td>
            <v-chip variant="tonal" :color="getRoleColor(admin.type)">{{ getRoleText(admin.type) }}</v-chip>
          </td>

          <td>
            <v-chip variant="tonal" :color="getStateColor(admin.state)">{{ getStateText(admin.state) }}</v-chip>
          </td>

          <td class="text-subtitle-1">
            {{ formatCreatedDate(admin.createdDate) }}
          </td>

          <td class="text-right">
            <div class="d-flex align-center justify-end">
              <v-tooltip text="Edit">
                <template v-slot:activator="{ props }">
                  <v-btn icon flat v-bind="props" @click="$emit('edit', admin.id)">
                    <PencilIcon size="20" stroke-width="1.5" class="text-primary" />
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Delete">
                <template v-slot:activator="{ props }">
                  <v-btn icon flat v-bind="props" @click="$emit('delete', admin.id)">
                    <TrashIcon size="20" stroke-width="1.5" class="text-error" />
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
// Utilities
import moment from "moment";
import { computed } from "vue";

// Models
import Admin, { AdminRole, AdminState } from "@/modules/admins/models/admin";

// Constants
import { ADMIN_STATE, ADMIN_ROLE_OPTIONS } from "@/modules/admins/constant";

type AdminTableProps = {
  admins: Array<Admin>;
};

const props = defineProps<AdminTableProps>();

type AdminTableEvents = {
  (event: "edit", id: number): void;
  (event: "delete", id: number): void;
};

defineEmits<AdminTableEvents>();

const hasAdmins = computed<boolean>(() => {
  return props.admins.length > 0;
});

const getRoleText = (role: AdminRole) => {
  const option = ADMIN_ROLE_OPTIONS.find((option) => {
    return option.value === role;
  });

  return option?.title ?? "";
};

const getRoleColor = (role: AdminRole) => {
  if (role === "system") {
    return "success";
  }

  return "warning";
};

const getStateText = (state: AdminState) => {
  if (state === ADMIN_STATE.ACTIVE) {
    return "Active";
  }
  return "Un-active";
};

const getStateColor = (state: AdminState) => {
  if (state === ADMIN_STATE.ACTIVE) {
    return "success";
  }

  return "error";
};

const formatCreatedDate = (createdDate: Date | null) => {
  return moment(createdDate).format("DD/MM/YYYY HH:mm");
};
</script>
