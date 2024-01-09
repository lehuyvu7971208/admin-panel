<script setup lang="ts">
// Utilities
import { shallowRef } from "vue";
import sidebarItems from "./sidebarItem";

// Components
import Logo from "../logo/Logo.vue";
import NavItem from "./NavItem/index.vue";
import NavGroup from "./NavGroup/NavGroup.vue";
import NavCollapse from "./NavCollapse/NavCollapse.vue";

// Store
import { useCustomizerStore } from "@/store/customizer";

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
</script>

<template>
  <v-navigation-drawer
    app
    left
    width="256"
    elevation="0"
    rail-width="75"
    expand-on-hover
    class="leftSidebar"
    :mobile-breakpoint="960"
    :rail="customizer.miniSidebar"
    v-model="customizer.sidebarDrawer"
  >
    <div class="pa-5 pl-4">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="py-6 px-4">
        <!---Menu Loop -->
        <template v-for="item in sidebarMenu">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---If Has Child -->
          <NavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" :key="`has_child_${item.title}`" />
          <!---Single Item-->
          <NavItem v-else :key="`single_item_${item.title}`" :item="item" class="leftPadding" />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
