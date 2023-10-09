<template>
  <v-layout full-height>
    <v-navigation-drawer v-model="isDrawerShow" theme="dark">
      <v-list>
        <v-list-item
          title="Admin"
          subtitle="System"
          :prepend-avatar="avatar"
        />
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/users" prepend-icon="mdi-account-multiple" title="User Accounts"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="blue">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Reserve Solution - Admin panel</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>  
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
// Utilities
import { ref } from 'vue';

// Assets
import avatar from '@/assets/avatar.png';

const isDrawerShow = ref<boolean>(true);

const toggleDrawer = (): void => {
  isDrawerShow.value = !isDrawerShow.value;
};
</script>