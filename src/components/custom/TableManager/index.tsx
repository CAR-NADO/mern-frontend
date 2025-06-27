// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FC, useCallback, useEffect, useState } from "react";
// import { flexRender, getCoreRowModel, getPaginationRowModel, Row, useReactTable } from "@tanstack/react-table";
// import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { cn } from "@/helpers/utils";
// import { ChevronDown, ChevronsUpDown, ChevronUp, Minus, Plus, RefreshCcw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { CustomColumnDef } from "@/types/interfaces";
// import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import Loader from "../Loader";
// import { getObjectLength } from "@/helpers/functions";
// import { TableActions } from "../TableAction";

// interface TableManagerProps {
//   columns: CustomColumnDef[];
//   queryFn?: (payload?: any) => any;
//   queryKey?: string;
//   select?: (response: any) => any;
//   payloadForQuery?: { [Key: string]: any };
//   queryString?: string;
//   isCustomDataSet?: boolean;
//   dataset?: { [Key: string]: any }[];
//   hasSubRows?: (row: boolean) => boolean;
//   showMoreRow?: boolean;
//   subRowsMutateKey?: string;
//   subRowsMutateFn?: (payload?: any) => any;
//   makeSubRowPayload?: (row: any) => any;
//   showPagination?: boolean;
//   isQueryEnabled?: boolean;
//   search_filters?: any;
//   globalSearch?: string;
//   actionsArray?: { [Key: string]: any }[];
//   noDataFoundText?: string;
//   noDataFoundComponent?: React.ReactNode;
//   showSorting?: boolean;
//   setTableData?: (data: any) => void;
//   sort?: { [Key: string]: any };
//   setSelectedRows?: (data: any) => void;
//   selectRowWith?: string;
//   isLoading?: boolean;
// }

// const PAGE_NUMBER_LIST_LIMIT = 5;

// const TableManager: FC<TableManagerProps> = ({
//   queryFn = () => null,
//   isLoading = false,
//   queryKey = "",
//   select = (data: any) => data?.data?.data || [],
//   columns = [],
//   payloadForQuery = {},
//   isCustomDataSet = false,
//   dataset = [],
//   hasSubRows = () => false,
//   showMoreRow = false,
//   subRowsMutateKey = "",
//   subRowsMutateFn = () => null,
//   makeSubRowPayload = () => null,
//   showPagination = true,
//   isQueryEnabled = true,
//   search_filters = [],
//   globalSearch = "",
//   actionsArray = [],
//   noDataFoundText = "No Rows Found",
//   noDataFoundComponent = null,
//   showSorting = true,
//   setTableData = () => {},
//   sort,
//   setSelectedRows = () => {},
//   selectRowWith = "id",
// }) => {
//   type SortingItem = {
//     id: string;
//     desc: boolean;
//   };
//   const [sorting, setSorting] = useState<SortingItem[]>([]);
//   const [rowSelection, setRowSelection] = useState({});
//   const [maxPageNumberListLimit, setMaxPageNumberListLimit] = useState(5);
//   const [minPageNumberListLimit, setMinPageNumberListLimit] = useState(0);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const stringPayloadForQuery = JSON.stringify(payloadForQuery);
//   const stringGlobalSearch = JSON.stringify(globalSearch);
//   const stringSearchFilter = JSON.stringify(search_filters);

//   const { pageIndex, pageSize } = pagination;

//   const payload = {
//     page: pageIndex + 1,
//     length: pageSize,
//     search_filters,
//     global_search: globalSearch?.length >= 2 ? globalSearch : "",
//     sort: sorting[0] ? { [sorting[0]["id"]]: sorting[0].desc ? "desc" : "asc" } : sort ?? null,
//     ...payloadForQuery,
//   };
//   const {
//     data: tableData,
//     isPending: isTableDataLoading,
//     refetch: fetchTableData,
//     isRefetching: isTableDataRefetching,
//     isFetching,
//   } = useQuery({
//     queryKey: [queryKey, payload],
//     queryFn: () => queryFn(payload),
//     enabled: isQueryEnabled,
//   });

//   useEffect(() => {
//     if (tableData && getObjectLength(tableData?.data) > 0) {
//       setTableData(tableData?.data);
//     }
//     setRowSelection([]);
//     setSelectedRows([]);
//   }, [isTableDataLoading, isFetching, tableData]);

//   const tableInstance = useReactTable({
//     debugAll: false,
//     data: isCustomDataSet ? dataset : tableData ? select(tableData) : [],
//     columns,
//     state: {
//       pagination,
//       rowSelection,
//       sorting,
//     },
//     manualPagination: true,
//     pageCount: isCustomDataSet ? -1 : tableData?.data?.lastPage ? tableData?.data?.lastPage : -1,
//     getCoreRowModel: getCoreRowModel(),
//     onPaginationChange: setPagination,
//     onRowSelectionChange: setRowSelection,
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//   });
//   useEffect(() => {
//     tableInstance.setPageIndex(0);
//   }, [stringPayloadForQuery, stringGlobalSearch, stringSearchFilter, tableInstance]);

//   useEffect(() => {
//     if (rowSelection && Object.keys(rowSelection).length > 0) {
//       const rowData = tableInstance.getSelectedRowModel()?.flatRows;
//       const arr = [];
//       for (const element of rowData) {
//         if (element?.original?.[selectRowWith]) arr.push(element.original[selectRowWith].toString());
//       }
//       setSelectedRows(arr);
//     }
//     return () => {
//       setSelectedRows([]);
//     };
//   }, [rowSelection, selectRowWith, setSelectedRows, tableInstance]);

//   const colsLength = (tableInstance?.getHeaderGroups().at(0)?.headers?.length ?? 0) + (showMoreRow ? 1 : 0);
//   const rowsLength = tableInstance.getRowModel().rows instanceof Array ? tableInstance.getRowModel().rows.length : 0;

//   const handleNextPage = useCallback(() => {
//     tableInstance?.nextPage();
//     if (pageIndex === tableInstance?.getPageCount() - 1) {
//       return false;
//     } else {
//       if (pageIndex + 2 > maxPageNumberListLimit) {
//         setMaxPageNumberListLimit(maxPageNumberListLimit + PAGE_NUMBER_LIST_LIMIT);
//         setMinPageNumberListLimit(minPageNumberListLimit + PAGE_NUMBER_LIST_LIMIT);
//       }
//     }
//   }, [maxPageNumberListLimit, minPageNumberListLimit, pageIndex, tableInstance]);

//   const handlePreviousPage = useCallback(() => {
//     tableInstance?.previousPage();
//     if (pageIndex === 0) {
//       return;
//     } else {
//       if (pageIndex % PAGE_NUMBER_LIST_LIMIT === 0) {
//         setMaxPageNumberListLimit(maxPageNumberListLimit - PAGE_NUMBER_LIST_LIMIT);
//         setMinPageNumberListLimit(minPageNumberListLimit - PAGE_NUMBER_LIST_LIMIT);
//       }
//     }
//   }, [maxPageNumberListLimit, minPageNumberListLimit, pageIndex, tableInstance]);
//   return (
//     <div>
//       <Table className="h-full">
//         <TableHeader>
//           {tableInstance.getHeaderGroups().map((headerGroup, headerIndex) => (
//             <TableRow key={`headerGroup-${headerIndex}`}>
//               {showMoreRow && <TableHead className="w-4"></TableHead>}
//               {headerGroup.headers.map((cell, index) => {
//                 const meta = cell.column.columnDef?.meta as { [key: string]: string };
//                 return !cell.isPlaceholder ? (
//                   <TableHead
//                     key={`cell-${index}`}
//                     className={cn(
//                       "text-justify",
//                       "text-grey-600",
//                       meta?.align && `text-${meta.align.trim()}`,
//                       meta?.className || "",
//                       meta?.width
//                     )}
//                     onClick={showSorting && meta?.isSortable ? cell.column.getToggleSortingHandler() : () => {}}
//                   >
//                     <div className="flex gap-2 items-center">
//                       {flexRender(cell.column.columnDef.header, cell.getContext())}
//                       {showSorting && meta?.isSortable && (
//                         <span className="cursor-pointer flex">
//                           {cell.column.getIsSorted() === "asc" ? (
//                             <ChevronUp width={13} />
//                           ) : cell.column.getIsSorted() === "desc" ? (
//                             <ChevronDown width={13} />
//                           ) : (
//                             <ChevronsUpDown width={13} />
//                           )}
//                         </span>
//                       )}
//                     </div>
//                     {/* {flexRender(cell.column.columnDef.header, cell.getContext())} */}
//                   </TableHead>
//                 ) : null;
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>

//         <TableBody>
//           {(isTableDataLoading || isTableDataRefetching || isLoading) && isQueryEnabled ? (
//             <TableRow>
//               <TableCell colSpan={colsLength} rowSpan={rowsLength} className="text-center py-8">
//                 <div className="flex justify-center items-center">
//                   <Loader />
//                 </div>
//               </TableCell>
//             </TableRow>
//           ) : tableInstance.getRowModel()?.rows?.length > 0 ? (
//             tableInstance
//               .getRowModel()
//               .rows.map((row) => (
//                 <TableManagerRow
//                   key={row.id}
//                   row={row}
//                   hasSubRows={hasSubRows}
//                   subRowsMutateFn={subRowsMutateFn}
//                   subRowsMutateKey={subRowsMutateKey}
//                   makeSubRowPayload={makeSubRowPayload}
//                   columns={columns}
//                   actionsArray={actionsArray}
//                   showMoreRow={showMoreRow}
//                 />
//               ))
//           ) : (
//             <TableRow>
//               <TableCell className="text-center" colSpan={colsLength}>
//                 {noDataFoundComponent ?? <h1 className="text-black-5">{noDataFoundText}</h1>}
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>

//         {showPagination && tableInstance.getRowModel()?.rows?.length > 0 ? (
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={colsLength}>
//                 <div className="w-full flex justify-between p-1">
//                   <div className="w-full flex gap-2 items-center text-xs text-grey-600">
//                     {!isCustomDataSet && (
//                       <Button variant={"ghost"} onClick={() => fetchTableData()} className="w-2 h-2">
//                         <RefreshCcw size={12} />
//                       </Button>
//                     )}
//                     <div>
//                       Showing {pageIndex * pageSize + 1}-{pageIndex * pageSize + rowsLength} of{" "}
//                       {isCustomDataSet ? rowsLength : tableData?.data?.totalRecords}
//                     </div>
//                   </div>

//                   <Pagination className="w-full m-0 flex justify-end text-xs text-gray-500">
//                     <PaginationContent>
//                       <PaginationItem>
//                         <PaginationPrevious href="#" onClick={() => handlePreviousPage()} />
//                       </PaginationItem>
//                       {tableInstance?.getPageOptions()?.map((page, index) => {
//                         const number = page + 1;
//                         if (number < maxPageNumberListLimit + 1 && number > minPageNumberListLimit) {
//                           return (
//                             <PaginationItem
//                               key={index}
//                               className={`border border-transparent h-6 w-6 p-0 flex items-center justify-center cursor-pointer rounded-sm hover:bg-blue hover:text-white ${
//                                 tableInstance?.getState()?.pagination?.pageIndex === index
//                                   ? "border border-contrast text-blue"
//                                   : "text--white"
//                               }`}
//                               onClick={() => tableInstance?.setPageIndex(index)}
//                             >
//                               {page + 1}
//                             </PaginationItem>
//                           );
//                         } else {
//                           return null;
//                         }
//                       })}

//                       <PaginationItem>
//                         <PaginationNext href="#" onClick={() => handleNextPage()} />
//                       </PaginationItem>
//                     </PaginationContent>
//                   </Pagination>
//                 </div>
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         ) : null}
//       </Table>
//     </div>
//   );
// };

// const TableManagerRow: FC<{
//   row: Row<any>;
//   hasSubRows?: (row: boolean) => boolean;
//   subRowsMutateKey?: string;
//   subRowsMutateFn?: (payload?: any) => any;
//   makeSubRowPayload?: (row: any) => any;
//   columns: CustomColumnDef[];
//   actionsArray?: { [Key: string]: any }[];
//   showMoreRow?: boolean;
// }> = ({
//   row,
//   hasSubRows = () => false,
//   subRowsMutateKey,
//   subRowsMutateFn,
//   makeSubRowPayload = () => {},
//   columns,
//   actionsArray,
//   showMoreRow = false,
// }) => {
//   const [showSubRows, setShowSubRows] = useState(false);
//   const [subrows, setSubRows] = useState<any[]>([]);

//   const { mutate: subRowsMutate, isPending: subRowsLoading } = useMutation({
//     mutationKey: [subRowsMutateFn?.name || subRowsMutateKey],
//     mutationFn: subRowsMutateFn,
//     onSuccess: (data: any) => {
//       setSubRows(data?.data?.data || []);
//     },
//   });

//   const tableInstance = useReactTable({
//     data: subrows,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const handleSubRows = () => {
//     subRowsMutate(makeSubRowPayload(row.original));
//   };
//   return (
//     <>
//       <TableRow>
//         {showMoreRow ? (
//           <TableCell className="w-10">
//             {hasSubRows(row.original) && (
//               <TableCell className="w-5">
//                 {subRowsLoading ? (
//                   <Loader width="w-5" height="h-5" />
//                 ) : showSubRows ? (
//                   <Button
//                     onClick={() => setShowSubRows(false)}
//                     className="min-w-5 min-h-5 max-h-5 max-w-5 rounded-sm flex justify-center items-center bg-blue hover:bg-blue p-0"
//                   >
//                     <Minus size={16} height={16} />
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={() => {
//                       setShowSubRows(true);
//                       handleSubRows();
//                     }}
//                     className="min-w-5 min-h-5 max-h-5 max-w-5 rounded-sm flex justify-center items-center bg-blue hover:bg-blue p-0"
//                   >
//                     <Plus size={16} height={16} />
//                   </Button>
//                 )}
//               </TableCell>
//             )}
//           </TableCell>
//         ) : null}

//         {row.getVisibleCells().map((cell: any) => {
//           const meta = cell.column.columnDef?.meta as { [key: string]: string };
//           return (
//             <TableCell
//               key={cell.id}
//               className={cn(meta?.align && `text-${meta.align.trim()}`, "text-neutral-800", meta?.className || "")}
//             >
//               {cell.column.columnDef.accessorKey === "action" ? (
//                 Array.isArray(actionsArray) && actionsArray?.length > 0 ? (
//                   <TableActions rowData={row?.original} actions={actionsArray} />
//                 ) : (
//                   flexRender(cell.column.columnDef.cell, cell.getContext())
//                 )
//               ) : (
//                 flexRender(cell.column.columnDef.cell, cell.getContext())
//               )}
//             </TableCell>
//           );
//         })}
//       </TableRow>
//       {hasSubRows(row.original) && showSubRows
//         ? tableInstance.getCoreRowModel().rows.map((rows) => {
//             return (
//               <TableRow className="bg-blue-100">
//                 <TableCell className="w-4"></TableCell>
//                 {rows.getVisibleCells().map((cell: any) => {
//                   const meta = cell.column.columnDef?.meta as { [key: string]: string };
//                   return (
//                     <TableCell key={cell.id} className={cn(meta?.align && `text-${meta.align.trim()}`, meta?.className || "")}>
//                       {cell.column.columnDef.accessorKey === "action" ? (
//                         Array.isArray(actionsArray) && actionsArray?.length > 0 ? (
//                           <TableActions rowData={rows?.original} actions={actionsArray} />
//                         ) : (
//                           flexRender(cell.column.columnDef.cell, cell.getContext())
//                         )
//                       ) : (
//                         flexRender(cell.column.columnDef.cell, cell.getContext())
//                       )}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             );
//           })
//         : null}
//     </>
//   );
// };

// export default TableManager;
