import { object } from "yup";
import { email, password } from "@/helpers/yupConstants";

export interface ILogin {
  email: string;
  password: string;
}
export const loginDef: ILogin = {
  email: "",
  password: "",
};

export const loginSchema = object({
  email: email({ fieldName: "email" }),
  password: password({ fieldName: "password" }),
});
