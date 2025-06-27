import { boolean, object } from "yup";
import { email, name, phone, } from "@/helpers/yupConstants";

export interface ISignup {
  name?: string;
  email?: string;
  phone?: string;
  // country?: string;
  terms?: boolean;
}
export const signupDef: ISignup = {
  name: "",
  email: "",
  phone: "",
  // country: "",
  terms: false,
};

export const signupSchema = object({
  name: name({ fieldName: "full name" }),
  email: email({ fieldName: "email" }),
  phone: phone({ fieldName: "phone" }),
  // country: requiredField({ fieldName: "country" }),
  terms: boolean(),
});
