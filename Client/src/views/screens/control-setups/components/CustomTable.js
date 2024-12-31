import React from "react";
import { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { Spin } from "antd";
export default function CustomTable({
  headers,
  data,
  style,
  rowsPerPage,
  green,
  load,
  hidePagination,
}) {
  const [pagination, setPagination] = useState(false);

  function formatNumber(num) {
    const formatted = num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  const [currentPage, setCurrentPage] = useState(1);
  // const [green, setGreen] = useState(false);
  let totalPages;
  let startIndex;
  let endIndex;
  if (rowsPerPage) {
    totalPages = Math.ceil(data?.length / rowsPerPage);
    startIndex = (currentPage - 1) * rowsPerPage;
    endIndex = startIndex + rowsPerPage;
  } else {
    totalPages = 1;
    startIndex = 0;
    endIndex = 0;
  }

  const currentData = data?.slice(startIndex, endIndex);
  // console.log({ currentData, data, totalPages });
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    rowsPerPage ? setPagination(true) : setPagination(false);
  }, []);

  return (
    <div
      className="bg-[#f9f9f9] tableScrollBar"
      style={{ overflowX: "scroll" }}
    >
      <table className="w-full  bg-white rounded-sm   even:bg-slate-300  border-spacing-2 border border-gray-200">
        <thead>
          <tr
            className="py-[2px] capitalize font-semibold text-white"
            style={{
              // backgroundColor: "red",
              backgroundColor: green ? "#3b82f6" : "#3b82f6",
            }}
          >
            {headers?.map((i) => {
              return (
                <th
                  className="text-center px-2 py-[2px] border border-gray-100"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {i}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className=""
          style={{ color: "rgb(92, 92, 92)", position: "relative" }}
        >
          {data?.length !== 0 && load === true && (
            <div className="h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-70 absolute z-10">
              <div className="space-y-3 flex items-center justify-center">
                <Spin size="large" />
                <div className="ml-4">Loading Data</div>
              </div>
            </div>
          )}
          {rowsPerPage
            ? currentData?.map((i, key) => (
                <tr
                  key={key}
                  className={`text-center h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
                  // className={`text-center h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-sky-300 odd:bg-gray-100`}
                >
                  {i.map((a, key) => {
                    return (
                      <td
                        key={key}
                        className={`${
                          style?.columnAlignRight?.includes(key + 1)
                            ? "text-right"
                            : ""
                        } capitalize px-2 py-1`}
                        style={{
                          fontSize: "85%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {style?.columnFormat?.includes(key + 1)
                          ? formatNumber(a)
                          : a}
                      </td>
                    );
                  })}
                </tr>
              ))
            : data?.map((i, key) => (
                <tr
                  key={key}
                  className={`text-center h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-white-500 even:bg-gray-100 odd:bg-white`}
                >
                  {i.map((a, key) => {
                    return (
                      <td
                        key={key}
                        className={`${
                          style?.columnAlignRight?.includes(key + 1)
                            ? "text-right"
                            : ""
                        }  capitalize px-2 py-1`}
                      >
                        {style?.columnFormat?.includes(key + 1)
                          ? formatNumber(a)
                          : a}
                      </td>
                    );
                  })}
                </tr>
              ))}
        </tbody>
      </table>
      {data?.length === 0 && load === false && (
        <div
          style={{
            padding: "15px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              textAlign: "center",
              color: "rgb(92, 92, 92)",
            }}
          >
            No Data Found...
          </div>
        </div>
      )}

      {data?.length === 0 && load === true && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <Spin size="large" />
          <div className="ml-4 animate-pulse text-bold">Fetching Data...</div>
        </div>
      )}

      {hidePagination ? (
        ""
      ) : (
        <div className="flex justify-end mt-2 mb-2">
          <div className="flex align-center">
            <button
              className={` bg-white disabled:bg-slate-400 `}
              style={{ borderRadius: "50%", width: "25px", height: "23px" }}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <MDBIcon fas icon="angle-left" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <div className="mx-2 whitespace-nowrap">
              Page -{" "}
              <span style={{ color: "black", fontWeight: "bolder" }}>
                {currentPage}
              </span>{" "}
              / {totalPages}
            </div>
            <button
              // className={`px-3 h-8 bg-slate-600 disabled:bg-slate-400`}
              className={` bg-white disabled:bg-slate-400 `}
              style={{ borderRadius: "50%", width: "25px", height: "23px" }}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <MDBIcon fas icon="angle-right" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
