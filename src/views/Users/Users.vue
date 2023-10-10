<template>
  <base-breadcrumb title="Contacts" :breadcrumbs="breadcrumbs"></base-breadcrumb>

  <v-card elevation="10">
    <v-card-text>
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
                <h4 class="text-h6">{{ user.firstName }} {{ user.lastName }} <small>({{ user.username }})</small></h4>
                <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ user.email }}</span>
              </div>
            </td>

            <td class="text-subtitle-1">
              (+{{ user.phoneRegion }}) {{ user.phoneNumber }}
            </td>

            <td class="text-subtitle-1">
              {{ user.createdDate }}
            </td>

            <td class="text-right">
              <div class="d-flex align-center justify-end">
                <v-tooltip text="Edit">
                  <template v-slot:activator="{ props }">
                    <v-btn icon flat v-bind="props">
                      <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="Delete">
                  <template v-slot:activator="{ props }">
                    <v-btn icon flat v-bind="props">
                      <TrashIcon stroke-width="1.5" size="20" class="text-error" />
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
import { ref, onMounted } from 'vue';

// Components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

// Logic
import { useUsersContext } from './Users';

// Components

const { users, loadUsers } = useUsersContext();

const breadcrumbs = ref([
  {
    text: 'Dashboard',
    disabled: false,
    href: '#'
  },
  {
    text: 'Contact',
    disabled: true,
    href: '#'
  }
]);

onMounted(() => {
  loadUsers();
});
</script>