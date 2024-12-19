import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const PaginationComponent = ({
  currentPage,
  totalItems,
  pageLimit,
  onPaginationChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageLimit);
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(pageLimit);
  const handlePageChange = (newPage) => setPage(newPage);
  const handleLimitChange = (e) => setLimit(Number(e.target.value));

  useEffect(() => {
    onPaginationChange?.({ page, limit });
  }, [page, limit]);

  return (
    <div className="w-full flex justify-between items-center mt-4">
      {/* Showing X of Y */}
      <div className="flex gap-4 items-center">
        <span className="text-gray-400"> Showing</span>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="border p-2 rounded-md"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span className="text-gray-400"> of {totalItems}</span>
      </div>

      {/* Page Navigation */}
      <div className="flex gap-2">
        <button
          //   onClick={handlePreviousPage}
          disabled={page === 1}
          className="border p-2 rounded-md"
        >
          <Icon icon="ic:round-chevron-left" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`border p-2 rounded-md ${
              page === index + 1 ? "bg-red-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          //   onClick={handleNextPage}
          disabled={page === totalPages}
          className="border p-2 rounded-md"
        >
          <Icon icon="ic:round-chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
