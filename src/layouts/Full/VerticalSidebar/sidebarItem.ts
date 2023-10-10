import {
  BoxIcon,
} from 'vue-tabler-icons';

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
  { header: 'Apps' },
  {
    chip: '2',
    to: '/users',
    icon: BoxIcon,
    title: 'Contacts',
    chipColor: 'surface',
    chipBgColor: 'primary'
  },
];

export default sidebarItem;
