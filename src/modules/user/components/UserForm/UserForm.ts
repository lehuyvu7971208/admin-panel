// Utilities
import * as Yup from "yup";
import { useForm } from "vee-validate";

// Apis
import { createUser, findUser, patchUser, User } from "@/api/users";

export type FormValues = {
  id: number;
  email: string;
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  phoneRegion: string;
  phoneNumber: string;
  confirmPassword: string;
};

export const userUserFormContext = () => {
  const validationSchema = Yup.object({
    id: Yup.number(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),

    password: Yup.string().when("id", {
      is: (value: number | string) => !value,
      then: (schema) => schema.required(),
    }),
    confirmPassword: Yup.string().when("id", {
      is: (value: number | string) => !value,
      then: (schema) => schema.required().oneOf([Yup.ref("password")]),
    }),

    lastName: Yup.string(),
    firstName: Yup.string(),

    phoneRegion: Yup.string().required(),
    phoneNumber: Yup.string().required(),
  }).required();

  const { meta, values, errors, handleSubmit, setValues, validate, handleReset } = useForm<FormValues>({
    validationSchema,
    initialValues: {
      id: 0,
      email: "",
      username: "",
      password: "",
      lastName: "",
      firstName: "",
      phoneRegion: "",
      phoneNumber: "",
      confirmPassword: "",
    },
  });

  const reset = (): void => {
    handleReset();
  };

  const submit = handleSubmit(async (values) => {
    const user = await (async () => {
      if (values.id) {
        return await handleUpdateUser(values);
      }

      return await handleCreateUser(values);
    })();

    return user;
  });

  const handleCreateUser = async (values: FormValues): Promise<User> => {
    const response = await createUser({
      email: values.email,
      username: values.username,
      password: values.password,
      lastName: values.lastName,
      firstName: values.firstName,
      phoneRegion: values.phoneRegion,
      phoneNumber: values.phoneNumber,
    });

    return response.data.user;
  };

  const handleUpdateUser = async (values: FormValues): Promise<User> => {
    const response = await patchUser(values.id, {
      lastName: values.lastName,
      firstName: values.firstName,
      phoneRegion: values.phoneRegion,
      phoneNumber: values.phoneNumber,
    });

    return response.data.user;
  };

  const loadUser = async (id: number | string): Promise<void> => {
    const response = await findUser(id);
    const user = response.data.user;

    setValues({
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneRegion: user.phoneRegion,
      phoneNumber: user.phoneNumber,
    });
  };

  return {
    meta,
    errors,
    values,

    reset,
    submit,
    loadUser,
    validate,
  };
};
