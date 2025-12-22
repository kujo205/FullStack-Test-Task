import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";

interface PaginationContainerProps<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
}

export function PaginationContainer<T>({
  items,
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  isLoading = false,
  renderItem,
  emptyState,
  loadingState,
}: PaginationContainerProps<T>) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full space-y-6">
      {/* Items Display in 2 columns */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div>
            {loadingState || (
              <div className="col-span-full flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </div>
            )}
          </div>
        ) : items.length === 0 ? (
          emptyState || (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground text-lg">No items found</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && items.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
          <div className="flex  items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isLoading}>
                  {pageSize}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {pageSizeOptions.map((size) => (
                  <DropdownMenuItem key={size} onClick={() => onPageSizeChange(size)}>
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>

          <Pagination className="w-fit m-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => canGoPrevious && !isLoading && onPageChange(currentPage - 1)}
                  aria-disabled={!canGoPrevious || isLoading}
                  className={
                    !canGoPrevious || isLoading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {pageNumbers.map((pageNum, idx) => {
                if (typeof pageNum === "string") {
                  return (
                    <PaginationItem key={`${pageNum}-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => !isLoading && onPageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className={isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => canGoNext && !isLoading && onPageChange(currentPage + 1)}
                  aria-disabled={!canGoNext || isLoading}
                  className={
                    !canGoNext || isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
