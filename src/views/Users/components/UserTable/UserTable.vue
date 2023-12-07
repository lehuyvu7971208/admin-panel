<template>
  <v-table class="mb-3" density="comfortable">
    <thead>
      <tr>
        <th class="text-subtitle-1 font-weight-semibold">Id</th>
        <th class="text-subtitle-1 font-weight-semibold">Username</th>
        <th class="text-subtitle-1 font-weight-semibold">State</th>
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

        <td>
          <v-chip variant="tonal" :color="getStateColor(user.state)">{{ getStateText(user.state) }}</v-chip>
        </td>

        <td class="text-subtitle-1">(+{{ user.phoneRegion }}) {{ user.phoneNumber }}</td>

        <td class="text-subtitle-1">
          {{ formatCreatedDate(user.createdDate) }}
        </td>

        <td class="text-right">
          <div class="d-flex align-center justify-end">
            <v-tooltip text="Edit">
              <template v-slot:activator="{ props }">
                <v-btn icon flat v-bind="props" @click="$emit('edit', user.id)">
                  <PencilIcon size="20" stroke-width="1.5" class="text-primary" />
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Delete">
              <template v-slot:activator="{ props }">
                <v-btn icon flat v-bind="props" @click="$emit('delete', user.id)">
                  <TrashIcon size="20" stroke-width="1.5" class="text-error" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
// Utilities
import moment from "moment";

// Constants
import { USER_STATE } from "@/modules/users/constant";

// Models
import User, { UserState } from "@/modules/users/models/user";

export type UserTableProps = {
  users: Array<User>;
};

export type UserTableEvents = {
  (event: "edit", id: number | string): void;
  (event: "delete", id: number | string): void;
};

defineProps<UserTableProps>();

defineEmits<UserTableEvents>();

const formatCreatedDate = (createdDate: Date | null) => {
  return moment(createdDate).format("DD/MM/YYYY HH:mm");
};

const getStateText = (state: UserState) => {
  if (state === USER_STATE.ACTIVE) {
    return "Active";
  }
  return "Un-active";
};

const getStateColor = (state: UserState) => {
  if (state === USER_STATE.ACTIVE) {
    return "success";
  }

  return "error";
};
</script>
