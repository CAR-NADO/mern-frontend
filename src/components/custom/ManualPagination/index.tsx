/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { RefreshCcw } from "lucide-react"

const ManualPagination = ({
  totalRecords,
  refetch,
  rowsPerPage = 10,
  currentPage,
  setCurrentPage,
  columns,
}: {
  totalRecords: number
  rowsPerPage?: number
  columns?: {
    accessorKey?: string
    header?: string | (() => string)
    cell?: (context: any) => React.ReactNode
  }[]
  currentPage: number
  refetch?: any
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const totalPages = Math.ceil(totalRecords / rowsPerPage)
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }
  const start = (currentPage - 1) * rowsPerPage + 1
  const end = Math.min(currentPage * rowsPerPage, totalRecords)
  console.log("totalRecords", totalRecords)

  return (
    <Table>
      {totalRecords > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns?.length ?? 8}>
              <div className="w-full flex justify-between items-center p-1">
                {totalPages > 0 && (
                  <div className="w-full flex gap-2 items-center text-xs text-grey-600">
                    {refetch && (
                      <Button variant={"ghost"} className="w-2 h-2" onClick={() => refetch()}>
                        <RefreshCcw size={12} />
                      </Button>
                    )}
                    <div>
                      Showing {start}-{end} of {totalRecords}
                    </div>
                  </div>
                )}
                <Pagination className="w-full m-0 flex justify-end text-xs text-gray-500">
                  <PaginationContent>
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-1">
                        <PaginationItem>
                          <PaginationPrevious className="cursor-pointer" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                        {getPageNumbers().map((page) => (
                          <PaginationItem
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            // className={`h-6 w-6 text-sm border rounded flex items-center cursor-pointer justify-center ${
                            //   currentPage === page ? "bg-blue text-white border-blue" : "bg-white hover:bg-gray-200"
                            // }`}
                            className={`border border-transparent h-6 w-6 p-0 flex items-center justify-center cursor-pointer rounded-sm hover:bg-blue hover:text-white ${currentPage === page ? "border border-contrast text-blue" : "text--white"}`}
                          >
                            {page}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext className="cursor-pointer" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                        </PaginationItem>
                      </div>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}
export default ManualPagination
