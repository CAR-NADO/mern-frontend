/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment, ReactNode } from "react";
import { BoltIcon, EditIcon, Ellipsis, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CheckboxInput from "../CheckboxInput";

const actionsIcon = {
  add: <PlusIcon className="w-4 h-4" />,
  edit: <EditIcon className="w-4 h-4" />,
  delete: <TrashIcon className="w-4 h-4" />,
  view: <EyeIcon className="w-4 h-4" />,
  setting: <BoltIcon className="w-4 h-4" />,
};

type ActionProps = {
  id?: string;
  cb?: (rowData: any) => void;
  access?: (rowData: any) => boolean;
  icon?: ReactNode;
  disabled?: (rowData: any) => boolean;
  title?: string;
  text?: (rowData: any) => string;
  isDownloading?: (rowData: any) => boolean;
};

type TableActionsProps = {
  rowData: any;
  actions?: ActionProps[];
};

export const TableActions: React.FC<TableActionsProps> = ({ rowData, actions = [] }) => {
  return (
    <div className=" h-full flex items-center justify-center rounded-full max-w-8 min-h-8 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-none shadow-none flex items-center max-h-10 max-w-10">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Ellipsis className="text-blue" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actions?.length > 0 &&
            actions.map(({ id = "", cb = () => {}, access = () => true, disabled = () => false, title = "" }, index) => {
              if (!access(rowData)) return <Fragment key={index}></Fragment>;
              const isDisabled = disabled(rowData);
              //   const icon = id in actionsIcon ? actionsIcon[id as keyof typeof actionsIcon] : null;
              //   console.log("🚀 ~ actions.map ~ icon:", icon)

              return (
                <DropdownMenuCheckboxItem
                  key={index}
                  className={`flex gap-1 pl-2 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} text-primary`}
                  onClick={() => !isDisabled && cb(rowData)}
                >
                  {actionsIcon[id]} {title}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const tableSelectionColumn = () => ({
  accessorKey: "select",
  header: ({ table }) => (
    <CheckboxInput
      type="checkbox"
      className="peer h-4 w-4 shrink-0 rounded-sm border border-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue data-[state=checked]:text-white"
      checked={
        table.getIsAllPageRowsSelected() ||(table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
  ),
  cell: ({ row }) => (
    <CheckboxInput
      type="checkbox"
      className="peer h-4 w-4 shrink-0 rounded-sm border border-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue data-[state=checked]:text-white"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
  ),
});
