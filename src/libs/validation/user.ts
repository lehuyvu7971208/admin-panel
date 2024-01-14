import * as Yup from "yup";

export const createUserValidationSchema = Yup.object({
  id: Yup.number(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),

  password: Yup.string().when("id", {
    is: (value: number | string) => !value,
    then: (schema) => schema.required(),
  }),

  lastName: Yup.string(),
  firstName: Yup.string(),

  phoneNumber: Yup.string().required(),
  phoneRegion: Yup.string().required(),
}).required();
