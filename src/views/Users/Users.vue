<template>
  <page title="User Accounts">
    <v-breadcrumbs :items="['Home', 'User Accounts']"></v-breadcrumbs>

    <v-table
      fixed-header
    >
      <thead>
        <tr>
          <th class="text-left">
            Username
          </th>

          <th class="text-left">
            Full Name
          </th>
          <th class="text-left">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.username }}</td>

          <td>{{ user.firstName }} {{ user.lastName }}</td>

          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-pagination
      :value="1"
      :length="4"
      rounded="circle"
    ></v-pagination>
  </page>
</template>

<script lang="ts" setup>
// Utilities
import { onMounted } from 'vue';

// Logic
import { useUsersContext } from './Users';

// Components
import Page from '@/components/Page/Page.vue';

const { users, loadUsers } = useUsersContext();

onMounted(() => {
  loadUsers();
});
</script>