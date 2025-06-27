/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { ACCESS_ROLE, MCM_WHOLESALE_ACCESS_TOKEN } from "./globalConstants";
import { toaster } from "@/components";

export const capitalizeFirstLetter = (str: string | null | undefined): string => {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getAccessToken = (): string | null => localStorage.getItem(MCM_WHOLESALE_ACCESS_TOKEN);
export const getAccessRole = (): string | null => localStorage.getItem(ACCESS_ROLE);

export const getObjectLength = (object: Record<string, unknown>): number => {
  try {
    return Object.keys(object).length;
  } catch {
    return 0;
  }
};

export const camelCaseToText = (str: string): string => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
};

export const stringToColour = (str: string = ""): string => {
  if (!str || str.length < 3) return "#000000";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff;
    const hex = value.toString(16).padStart(2, "0");
    color += hex;
  }
  return color;
};

export const getStringInitials = (str: string = ""): string => {
  if (!str) return "U";
  let acronym = "";
  const words = str.split(/\s+/);
  for (const word of words) {
    acronym += word[0].toUpperCase();
  }
  return acronym;
};

export const darkenColor = (hexColor: string, factor: number = 20): string => {
  if (!hexColor) return "#fff";
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const newR = Math.max(0, r - factor);
  const newG = Math.max(0, g - factor);
  const newB = Math.max(0, b - factor);
  const darkenedColor = `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB
    .toString(16)
    .padStart(2, "0")}`;
  return darkenedColor;
};

export interface FileResponse {
  url: string;
}

export const downloadFile = (
  { fileResponse, fileName = "file.csv" }:
    { fileResponse: FileResponse; fileName?: string }
): void => {
  if (fileResponse?.url) {
    const a = document.createElement("a");
    a.href = fileResponse.url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    console.error("File URL is missing");
  }
};
export const downloadFileFromURL = ({
  url = "",
  cb = () => { },
  fileName = "",
  token,
  method = "GET",
  payload,
}: {
  url?: string;
  cb?: (status: boolean) => void;
  fileName?: string;
  token: string;
  method?: "GET" | "POST";
  payload?: any;
}): void => {
  if (!url) return;
  cb(true);
  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
    },
    ...(method === "POST" && payload ? { body: JSON.stringify(payload) } : {}),
  })

    .then((response) => {
      if (response?.ok) {
        return response.blob();
      } else {
        throw new Error(`HTTP error! Status: ${response?.status}`);
      }
    })

    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    })
    .catch(() => {
      toaster.error("Failed to download the file. Please try again.");
    }).finally(() => {
      cb(false);
    })
};

export const snakeToTitleCase = (str: string): string | undefined => {
  if (!str) return;
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

let wait = false;

export const throttlingFunc = <T extends unknown[]>(cb: (...args: T) => void, delay: number): ((...args: T) => void) => {
  return (...args: T) => {
    if (wait) {
      return;
    }
    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};

interface CustomDate {
  from?: string;
  to?: string;
}

export const handleDate = (value: string, customDate: CustomDate = {}): { from: string; to: string } => {
  const todayDate = moment().format("YYYY-MM-DD");
  const yesterdayDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  switch (value) {
    case "Today":
      return { from: todayDate, to: todayDate };
    case "Yesterday":
      return { from: yesterdayDate, to: yesterdayDate };
    case "Last 7 Days":
      return { from: moment().subtract(7, "days").format("YYYY-MM-DD"), to: todayDate };
    case "Last 30 Days":
      return { from: moment().subtract(30, "days").format("YYYY-MM-DD"), to: todayDate };
    case "This Month":
      return { from: moment().startOf("month").format("YYYY-MM-DD"), to: moment().endOf("month").format("YYYY-MM-DD") };
    case "Last Month":
      return {
        from: moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      };
    case "Last 3 Months":
      return {
        from: moment().subtract(3, "month").startOf("month").format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      };
    case "Last 6 Months":
      return {
        from: moment().subtract(6, "month").startOf("month").format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      };
    case "Last 12 Months":
      return {
        from: moment().subtract(12, "month").startOf("month").format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      };
    case "Last 24 Months":
      return {
        from: moment().subtract(24, "month").startOf("month").format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      };
    case "Custom":
      return {
        from: customDate?.from ? moment(customDate.from).format("YYYY-MM-DD") : "",
        to: customDate?.to ? moment(customDate.to).format("YYYY-MM-DD") : "",
      };
    default:
      return { from: "", to: "" };
  }
};

export const getTotalCost = (arr: any[], key: string = "monthly_price"): number => {
  if (!arr?.length) return 0.0;

  const total = arr
    ?.map((val) => parseFloat(val?.[key]) * (val?.didData?.length || 1))
    .reduce((acc, curr) => acc + curr, 0);

  return parseFloat(total.toFixed(2));
};


export const mapKeyWords = (str: string | null) => {
  if (!str) return "---";

  const specialMappings: Record<string, string> = {
    "http-in": "HTTP-IN",
    "http-out": "HTTP-OUT",
    did_groups: "DID Groups",
  };

  if (specialMappings[str]) return specialMappings[str];

  return str.includes("_")
    ? str
      .split("_")
      .map((word) =>
        word.toLowerCase() === "id" ? "ID" : word.toLowerCase() === "did" ? "DID" : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
    : str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  if (!date) return null;
  try {
    return moment(date).format("YYYY/MM/DD");
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const formatDateTime = (date) => {
  if (!date) return null;
  try {
    return moment(date).format("YYYY/MM/DD h:mm A");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const minutesToTime=(decimalMinutes) =>{
  const totalSeconds = Math.floor(decimalMinutes * 60);
  const duration = moment.duration(totalSeconds, 'seconds');

  const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
export const formatDateWithAbbreviatedMonth = (date: string | Date) => {
  if (!date) return null;
  try {
    return moment(date).format("MMM DD, YYYY");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const toFormattedPrice = (value: string | number, digits = 2): string => {
  const num = parseFloat(value as string);
  return isNaN(num) ? "---" : `$${num.toFixed(digits)}`;
};

export const getRemainingTime = (createdAt: string, expiresAt: string): string => {
  const start = moment(createdAt);
  const expiration = moment(expiresAt);
  const now = moment();

  if (now.isBefore(start)) {
    return `Plan starts in ${start.fromNow()} (Total duration: ${formatDuration(expiration.diff(start))})`;
  }

  if (now.isAfter(expiration)) {
    return "0 Hours";
  }

  return formatDuration(expiration.diff(now));
};

const formatDuration = (diff: number): string => {
  const duration = moment.duration(diff);
  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours() % 24);

  if (days > 0 && hours > 0) return `${days} Day${days !== 1 ? "s" : ""} & ${hours} Hour${hours !== 1 ? "s" : ""}`;
  if (days > 0) return `${days} Day${days !== 1 ? "s" : ""}`;
  return `${hours} Hour${hours !== 1 ? "s" : ""}`;
};

export const formatLastUsedTime = (timestamp) => {
  const timeAgo = moment(timestamp).fromNow();
  return timeAgo;
};


