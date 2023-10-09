<script setup lang="ts">
import { ref, watch } from 'vue';

import { Menu2Icon, ShoppingCartIcon } from 'vue-tabler-icons';

// Components
import ProfileDD from './ProfileDD.vue';
import Searchbar from './Searchbar.vue';
import LanguageDD from './LanguageDD.vue';
// import MessagesDD from './MessagesDD.vue';
import NotificationDD from './NotificationDD.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';
// import LogoIcon from '../logo/LogoIcon.vue'

// Stores
import { useCustomizerStore } from '@/store/customizer';

const customizer = useCustomizerStore();

const priority = ref(0);
const appsdrawer = ref(false);

watch(priority, (newPriority) => {
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="64" color="background" id="top">
    <v-btn
      icon
      variant="text"
      color="primary"
      class="hidden-md-and-down" 
      @click.stop="customizer.setMiniSidebar(!customizer.miniSidebar)"
    >
      <Menu2Icon size="25" />
    </v-btn>

    <v-btn
      icon
      size="small"
      variant="text"
      class="hidden-lg-and-up"
      @click.stop="customizer.setSidebarDrawer"
    >
      <Menu2Icon size="25" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Search part --> <!-- ---------------------------------------------- -->

    <Searchbar />


    <!---/Search part -->

    <!-- ---------------------------------------------- -->
    <!-- Mega menu -->
    <!-- ---------------------------------------------- -->
    <!-- <div class="hidden-md-and-down">
            <Navigations />
        </div> -->
    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->

    <LanguageDD />

    <!-- ---------------------------------------------- -->
    <!-- ShoppingCart -->
    <!-- ---------------------------------------------- -->
    <v-btn icon variant="text" color="primary" to="">
      <v-badge color="error" :content="0">
        <ShoppingCartIcon stroke-width="1.5" size="24" />
      </v-badge>
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- MessagesDD -->
    <!-- ---------------------------------------------- -->
    <!-- <MessagesDD /> -->
    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <div class="ml-2">
      <ProfileDD />
    </div>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
