import { boolean, object } from "yup";
import { email, name, password, phone } from "@/helpers/yupConstants";

export const API_ROUTES = {
  SIGNNUP_USER: {
    METHOD: "Post",
    URL: "v1/user/register",
  },
};
export interface ISignup {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  // country?: string;
  terms?: boolean;
}
export const signupDef: ISignup = {
  name: "",
  email: "",
  phone: "",
  password: "",
  // country: "",
  terms: false,
};

export const signupSchema = object({
  name: name({ fieldName: "full name" }),
  email: email({ fieldName: "email" }),
  phone: phone({ fieldName: "phone" }),
  password: password({ fieldName: "password" }),
  // country: requiredField({ fieldName: "country" }),
  terms: boolean(),
});
