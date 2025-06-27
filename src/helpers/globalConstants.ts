export const MCM_WHOLESALE_ACCESS_TOKEN = "mcm-wholesale-access-token";
export const SIDEBAR_COLLAPSE = "sidebar-collapse";
export const LOGOUT_USER = "logout-user";
export const ACCESS_ROLE = "access-role";

export interface EditForm {
  isEdit: boolean;
  formData: Record<string, unknown>;
}

export const editForm: EditForm = { isEdit: false, formData: {} };

export const nameLength = 50;
export const emailLength = 50;
export const passwordLength = 30;
export const urlLength = 60;
export const headlineLength = 100;
export const textAreaLength = 200;

export interface Currency {
  label: string;
  value: string;
}

export const currency: Currency[] = [
  { label: "(£) GBP", value: "gbp" },
  { label: "(€) EUR", value: "eur" },
  { label: "($) USD", value: "usd" },
];

export interface DateFilterType {
  label: string;
  value: string;
}

export const DateFilterTypes: DateFilterType[] = [
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "Last 7 Days", value: "Last 7 Days" },
  { label: "Last 30 Days", value: "Last 30 Days" },
  { label: "This Month", value: "This Month" },
  { label: "Last Month", value: "Last Month" },
  { label: "Last 3 Months", value: "Last 3 Months" },
  { label: "Last 6 Months", value: "Last 6 Months" },
  { label: "Last 12 Months", value: "Last 12 Months" },
  { label: "Last 24 Months", value: "Last 24 Months" },
  { label: "Custom", value: "Custom" },
];

export interface FilterDateDropdown {
  value: {
    from: string;
    to: string;
  };
  date_type: string;
  dateOptions: DateFilterType[];
}

export const filterDateDropdown: FilterDateDropdown = {
  value: {
    from: "",
    to: "",
  },
  date_type: "",
  dateOptions: DateFilterTypes,
};

export const monthsArray = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
