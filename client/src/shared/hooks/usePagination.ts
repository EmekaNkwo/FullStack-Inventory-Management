import { useState, useMemo } from "react";

export const usePagination = <T>(
  data: T[] | undefined,
  itemsPerPage: number = 20
) => {
  const [page, setPage] = useState(1);

  const paginatedData = useMemo(() => {
    if (!data) return [];

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  }, [data, page, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return {
    page,
    paginatedData,
    totalPages,
    handlePageChange,
  };
};
