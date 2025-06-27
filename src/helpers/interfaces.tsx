import { ReactNode } from "react";
// import { ColumnDef } from '@tanstack/react-table';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TabProps {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  value: string;
  content?: ReactNode;
}
interface RouteTabProps {
  label: string | ReactNode;
  // label: string | JSX.Element
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  value: string;
}

// type CustomColumnDef = ColumnDef<any, any>;

export type { TabProps, RouteTabProps };
// export type { TabProps,RouteTabProps, CustomColumnDef };
