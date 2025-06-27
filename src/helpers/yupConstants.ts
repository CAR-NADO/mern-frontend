import { ref, string, StringSchema } from "yup";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import { capitalizeFirstLetter } from "./functions";

interface FieldValidationParams {
  fieldName?: string;
  message?: string;
  isRequired?: boolean;
  min?: number;
  max?: number;
  regex?: RegExp;
  referenceField?: string;
}

export const requiredField = ({ fieldName = "", message }: FieldValidationParams): StringSchema => {
  return string().required(message ?? `${capitalizeFirstLetter(fieldName)} is required`);
};

export const email = ({ fieldName = "", message = "Invalid email", isRequired = true }: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName }).email(message);
  } else {
    return string().email(message);
  }
};

export const name = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 50,
  regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s\-_.(){}[\]\\/]+$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(
        regex,
        `${capitalizeFirstLetter(fieldName)} contains either alphabetic or alpha numeric characters eg. ${capitalizeFirstLetter(
          fieldName
        )}123`
      )
      .test("not-only-spaces", `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`, (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`,
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const username = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 50,
  regex = /^[a-zA-Z0-9\s\-_.(){}[\]\\/'":]+$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(
        regex,
        `Spaces are not allowed, ${capitalizeFirstLetter(
          fieldName
        )} contains either alphabetic or alpha numeric characters eg. ${capitalizeFirstLetter(fieldName)}123.`
      )
      .test("not-only-spaces", `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`, (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`,
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const password = ({
  fieldName = "",
  min = 12,
  message = "Must Contain 12 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
  regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!_*]).{12,}$/,
  isRequired = true,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName }).matches(regex, message).min(min, `Too short, minimum length is ${min} characters`);
  } else {
    return string().matches(regex, message);
  }
};

export const confirmPassword = ({
  fieldName = "",
  referenceField = "password",
  message = "Passwords must match",
  isRequired = true,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName }).oneOf([ref(referenceField), undefined], message);
  } else {
    return string().oneOf([ref(referenceField), undefined], message);
  }
};

export const phone = ({
  fieldName = "",
  message = "Must be valid phone number",
  isRequired = true,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName }).test({
      message,
      test: (value) => {
        if (value === undefined || value === null) {
          return false;
        }
        return isPossiblePhoneNumber(value) && isValidPhoneNumber(value);
      },
    });
  } else {
    return string().notRequired().nullable() as StringSchema<string | undefined>;
  }
};

export const zipcode = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 6,
  max = 8,
  regex = /^[a-zA-Z0-9\s]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, "Pincode contains either numeric or alphanumeric e.g. 123456 or ZIP123")
      .test("not-only-spaces", "Pincode cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "Pincode cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const company = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 50,
  regex = /^[a-zA-Z0-9\s]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, "Company name contains either alphabetic or alphanumeric eg. Company123")
      .test("not-only-spaces", "Company name cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "Company name cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const address = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 100,
  regex = /^[a-zA-Z0-9,.\-\s/\\]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, "Address can contain only letters, numbers, commas, hyphens, and periods")
      .test("not-only-spaces", "Address cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "Address cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const fax = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 10,
  regex = /^[0-9+\-().\s]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, "Fax can contain only number, Plus Sign, Hyphen, parenthesis and period")
      .test("not-only-spaces", "Fax cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "Fax cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const macAddress = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 10,
  regex = /^[0-9+\-().\s]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, "MAC Address can contain only number, Plus Sign, Hyphen, parenthesis and period")
      .test("not-only-spaces", "MAC Address cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "MAC Address cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const ipAddress = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 7,
  max = 15,
  regex = /^[0-9.-]*$/,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .matches(regex, `${fieldName} can contain only numbers, dots (.), and hyphens (-)`)
      .test("not-only-spaces", `${fieldName} cannot consist only of spaces`, (value) => {
        return value !== undefined && value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      `${fieldName} cannot consist only of spaces`,
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const url = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 18,
  max = 100,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .url("Must be a valid URL")
      .test("not-only-spaces", `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`, (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      `${capitalizeFirstLetter(fieldName)} cannot consist only of spaces`,
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};

export const common = ({
  fieldName = "",
  // message = '',
  isRequired = true,
  min = 2,
  max = 50,
}: FieldValidationParams): StringSchema => {
  if (isRequired) {
    return requiredField({ fieldName })
      .min(min, `Too short, minimum length is ${min} characters`)
      .max(max, `Too long, maximum length is ${max} characters`)
      .test("not-only-spaces", "Cannot consist only of spaces", (value) => {
        if (value === undefined) {
          return false;
        }
        return value?.trim().length > 0;
      });
  } else {
    return string().test(
      "not-only-spaces",
      "Cannot consist only of spaces",
      (value) => value === undefined || value === "" || value?.trim().length > 0
    );
  }
};
