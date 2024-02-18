import {
  UserCogIcon,
  UserSearchIcon,
  BuildingStoreIcon,
} from "vue-tabler-icons";

export interface menu {
  icon?: any;
  to?: string;
  chip?: string;
  type?: string;
  title?: string;
  header?: string;
  chipIcon?: string;
  children?: menu[];
  chipColor?: string;
  disabled?: boolean;
  subCaption?: string;
  chipBgColor?: string;
  chipVariant?: string;
}

const sidebarItem: menu[] = [
  { header: "System" },
  {
    title: "Admin",
    icon: UserCogIcon,
    to: "/admin/management",
  },

  { header: "Apps" },

  {
    title: "Users",
    icon: UserSearchIcon,
    to: "/user/management",
  },

  {
    title: "Businesses",
    icon: BuildingStoreIcon,
    to: "/business/management",
  },
];

export default sidebarItem;
