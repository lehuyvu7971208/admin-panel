export const BUSINESS_STATE = {
  ACTIVE: "active",
  UNACTIVE: "unActive",
};

export const BUSINESS_STATE_OPTIONS = [
  { title: "None", value: "" },
  { title: "Active", value: BUSINESS_STATE.ACTIVE },
  { title: "Un-active", value: BUSINESS_STATE.UNACTIVE },
];

export const BUSINESS_TYPE = {
  PET: "pet",
  SPA: "spa",
  NONE: "none",
  HAIR: "hair",
  NAIL: "nail",
};

export const BUSINESS_TYPE_OPTIONS = [
  { title: "All", value: "" },
  { title: "None", value: BUSINESS_TYPE.NONE },
  { title: "Pet", value: BUSINESS_TYPE.PET },
  { title: "Spa", value: BUSINESS_TYPE.SPA },
  { title: "Hair", value: BUSINESS_TYPE.HAIR },
  { title: "Nail", value: BUSINESS_TYPE.NAIL },
];
