import * as Yup from "yup";
import { BUSINESS_STATE, BUSINESS_TYPE } from "@/modules/businesses/constant";

export const createBusinessValidationSchema = Yup.object({
  name: Yup.string().required(),
  owner: Yup.string().required(),
  type: Yup.string().oneOf(Object.values(BUSINESS_TYPE)).required(),
  state: Yup.string().oneOf(Object.values(BUSINESS_STATE)).required(),
});
