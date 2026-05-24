import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants/pagination";

export function usePagination<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const getRowNumber = (index: number) => (page - 1) * pageSize + index + 1;

  return {
    page,
    setPage,
    totalPages,
    paginatedItems,
    pageSize,
    totalItems: items.length,
    getRowNumber,
  };
}
