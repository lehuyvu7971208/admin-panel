import * as Yup from "yup";

// Constants
import { ADMIN_ROLE } from "@/modules/admins/constant";

export const createAdminValidationSchema = Yup.object({
  id: Yup.number(),

  password: Yup.string().required(),
  username: Yup.string().required(),

  type: Yup.string().oneOf(Object.values(ADMIN_ROLE)).required(),
});
