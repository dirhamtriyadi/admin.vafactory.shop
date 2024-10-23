import React, { useState } from 'react';

interface Column {
  key: string;
  label: string;
  searchable?: boolean;
  sortable?: boolean;
}

interface Action {
  label: string;
  className: string;
  onClick: (id: string) => void;
}

interface TableProps {
  data: any[];
  columns: Column[];
  actions?: Action[];
}

const Table: React.FC<TableProps> = ({ data, columns, actions = [] }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ column: "", direction: "" });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [searchFields, setSearchFields] = useState(columns.reduce((acc, column) => {
    acc[column.key] = column.searchable !== false; // Default to true if not specified
    return acc;
  }, {} as Record<string, boolean>));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (column: string) => {
    const direction = sort.direction === "asc" ? "desc" : "asc";
    setSort({ column, direction });
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToPage = () => {
    const page = Number(goToPage);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchFieldChange = (field: string) => {
    setSearchFields(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const filteredData = data
    .filter((item: any) =>
      columns.some(column => column.searchable !== false && searchFields[column.key] && item[column.key].toString().toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (sort.column) {
        const column = columns.find(col => col.key === sort.column);
        if (column && column.sortable) {
          const aValue = a[sort.column];
          const bValue = b[sort.column];
          if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
          return 0;
        }
      }
      return 0;
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfPageNumbersToShow);
    let endPage = Math.min(totalPages, currentPage + halfPageNumbersToShow);

    if (currentPage <= halfPageNumbersToShow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    }

    if (currentPage + halfPageNumbersToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`border p-2 ${currentPage === i ? "bg-gray-300 dark:text-black" : ""}`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`border p-2 ${currentPage === 1 ? "bg-gray-300 dark:text-black" : ""}`}
            >
              1
            </button>
            {startPage > 2 && <span className="p-2">...</span>}
          </>
        )}
        {pageNumbers}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="p-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`border p-2 ${currentPage === totalPages ? "bg-gray-300 dark:text-black" : ""}`}
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border p-2 dark:bg-boxdark"
        />
        <select value={itemsPerPage} onChange={handleItemsPerPage} className="border p-2 dark:bg-boxdark">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap">
        {columns.map(column => (
          column.key !== "actions" && column.searchable !== false && (
            <label key={column.key} className="mr-4">
              <input
                type="checkbox"
                checked={searchFields[column.key]}
                onChange={() => handleSearchFieldChange(column.key)}
                className="mr-2"
              />
              {column.label}
            </label>
          )
        ))}
      </div>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          scope="col"
                          className={`px-6 py-4 cursor-pointer ${sort.column === column.key ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                          onClick={() => column.sortable !== false && handleSort(column.key)}
                        >
                          {column.label}
                          {column.sortable && (
                            <span className="ml-2">
                              {sort.column === column.key ? (
                                sort.direction === "asc" ? "↑" : "↓"
                              ) : (
                                "↕"
                              )}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, index) => (
                        <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          {columns.map((column) => (
                            column.key === "actions" && actions.length > 0 ? (
                              <td key={column.key} className="whitespace-nowrap px-6 py-4">
                                {actions.map((action, index) => (
                                  <button
                                    key={index}
                                    onClick={() => action.onClick(item.id)}
                                    className={`mr-2 ${action.className} text-white px-2 py-1 rounded-sm`}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </td>
                            ) : (
                              <td key={column.key} className="whitespace-nowrap px-6 py-4">{item[column.key]}</td>
                            )
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length + 1} className="px-6 py-4 text-center">No data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border p-2"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {renderPageNumbers()}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border p-2"
        >
          Next
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="border p-2 w-16 dark:bg-boxdark"
            min="1"
            max={totalPages}
          />
          <button onClick={handleGoToPage} className="border p-2">
            Go
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;