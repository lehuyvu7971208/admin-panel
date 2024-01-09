import { BoxIcon, UserCogIcon } from "vue-tabler-icons";

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
    chip: "2",
    icon: BoxIcon,
    title: "Contacts",
    chipColor: "surface",
    chipBgColor: "primary",
    to: "/user/management",
  },
];

export default sidebarItem;
