import React from "react";
import { Icon } from "@iconify/react";
import "./Table.css";
import PaginationComponent from "./PaginationComponent";
import ErrorComponent from "../NoDataFound/ErrorComponent";
import NoDataFound from "../NoDataFound/NoDataFound";
import Loading from "../Loading/Loading";

const Table = ({
  tableTitle = "Table Title",
  data = [],
  columnData = [],
  loading = false,
  checked = false,
  onClickRow = () => {},
  error = null,
  currentPage = 1,
  pageLimit = 10,
  totalItems = 0,
  onPaginationChange = () => {},
}) => {
  const renderTableRow = (item) => (
    <tr
      key={item.id}
      onClick={() => onClickRow(item)}
      className="text-center cursor-pointer hover:bg-gray-300 transition-all delay-200 ease-in-out"
    >
      <TableCheckComponent checked={checked} />
      {columnData.map((column, index) => (
        <td
          key={index}
          className="text-gray-700 p-4 font-light text-sm text-left"
        >
          {renderCellContent(column, item)}
        </td>
      ))}
    </tr>
  );

  const renderCellContent = (column, item) => {
    const value = column.value;
    // if (value === "status" || value === "online") {
    //   return <StatusComponent value={item[value]} />;
    // }
    // if (value === "full_name" || value === "user") {
    //   return <UserLogo user={item?.user ?? item} />;
    // }
    return item[value] ?? "-";
  };

  return (
    <div className="bg-white rounded-lg pt-4">
      {error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <h1 className="font-normal text-black text-left text-xl uppercase">
            {tableTitle}
          </h1>
          <div className="flex justify-between mb-4 items-center">
            <PaginationComponent
              currentPage={currentPage}
              totalItems={totalItems}
              pageLimit={pageLimit}
              onPaginationChange={onPaginationChange}
            />
          </div>
          <table className="table w-full">
            <thead className="bg-gray-100 text-center">
              <tr>
                <th>
                  <Icon
                    icon="material-symbols:indeterminate-check-box-outline"
                    className="text-blue-300 text-4xl my-2"
                  />
                </th>
                {columnData.map((column, index) => (
                  <TableHeadItem key={index} item={column} />
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && data.map((item) => renderTableRow(item))}
            </tbody>
          </table>
          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            data?.length === 0 && <NoDataFound />
          )}
        </>
      )}
    </div>
  );
};

const TableHeadItem = ({ item }) => (
  <th className="p-3 text-left font-light text-sm text-gray-700 uppercase">
    {item.heading}
  </th>
);

const TableCheckComponent = ({ checked }) => (
  <td className="text-left">
    <Icon
      icon={`material-symbols:check-box-outline-${
        checked ? "rounded" : "blank"
      }`}
      className="text-blue-300 text-4xl"
    />
  </td>
);

export default Table;
