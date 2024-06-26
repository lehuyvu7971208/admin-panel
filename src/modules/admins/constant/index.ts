export const ADMIN_STATE = {
  ACTIVE: "active",
  INACTIVE: "inActive",
};

export const ADMIN_STATE_OPTIONS = [
  { title: "None", value: "" },
  { title: "Active", value: ADMIN_STATE.ACTIVE },
  { title: "Inactive", value: ADMIN_STATE.INACTIVE },
];

export const ADMIN_ROLE = {
  ADMIN: "admin",
  SYSTEM: "system",
  MANAGER: "manager",
};

export const ADMIN_ROLE_OPTIONS = [
  { title: "None", value: "" },
  { title: "Admin", value: ADMIN_ROLE.ADMIN },
  { title: "System", value: ADMIN_ROLE.SYSTEM },
  { title: "Manager", value: ADMIN_ROLE.MANAGER },
];

export const DEFAULT_ADMIN_ROLE = ADMIN_ROLE.MANAGER;
