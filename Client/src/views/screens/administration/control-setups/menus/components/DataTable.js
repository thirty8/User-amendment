// import React from "react";
// import MUIDataTable from "mui-datatables";

// function DataTable({ title, data, dataProcessingInfo, columns, rowsPerPage }) {
//   const options = { selectableRows: "none", rowsPerPage: 5, textLabels: {
//     body: { noMatch: dataProcessingInfo } } };

//   return (
//     <div style={{ zoom: "0.85" }}>
//       <MUIDataTable
//         title={title}
//         data={data}
//         columns={[
//           "#",
//           "Menu Name",
//           // "Menu Groupings",
//           "Menu Permission",
//           "Bank Permitted",
//           "Action",
//         ]}
//        options={options}
//       />
//     </div>
//   );
// }

// export default DataTable;

// import React from "react";
// import { useState, useEffect } from "react";
// import { MDBIcon } from "mdb-react-ui-kit";

// export default function CustomTable({
//   headers,
//   data,
//   style,
//   rowsPerPage,
//   onRowDoubleClick,
//   onRowClick,
//   defaultMessage,
//   theadBackground,
//   // pagination,
// }) {
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );
//   const [pagination, setPagination] = useState(false);

//   function formatNumber(num) {
//     const formatted = num.toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//     });

//     return formatted;
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   // const [colSpan, setColSpan] = useState("");
//   let totalPages;
//   let startIndex;
//   let endIndex;
//   if (rowsPerPage) {
//     totalPages = Math.ceil(data?.length / rowsPerPage);
//     startIndex = (currentPage - 1) * rowsPerPage;
//     endIndex = startIndex + rowsPerPage;
//   } else {
//     totalPages = 1;
//     startIndex = 0;
//     endIndex = 0;
//   }

//   const currentData = data?.slice(startIndex, endIndex);
//   console.log({ currentData, data, totalPages });
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     rowsPerPage ? setPagination(true) : setPagination(false);
//   }, []);

//   let colspan = 0;
//   headers?.map((i) => {
//     if (parseFloat(i.split("++")[1])) {
//       colspan += parseFloat(i.split("++")[1]);
//     } else {
//       colspan += 1;
//     }
//   });
//   return (
//     <div
//       className="bg-[#f9f9f9] tableScrollBar text-[94%] w-full"
//       style={{ overflowX: "scroll" }}
//     >
//       <table className="w-full  bg-white rounded-sm text-gray-500">
//         <thead>
//           <tr
//             className="py-1 capitalize font-semibold text-white"
//             style={{
//               backgroundColor: "#0580c0",
//               background: theadBackground ? theadBackground : "#0580c0",
//             }}
//           >
//             {headers?.map((i) => {
//               return (
//                 <th
//                   colSpan={parseInt(i.split("++")[1]?.trim())}
//                   className="text-center whitespace-nowrap px-2 py-1 border border-gray-300"
//                 >
//                   {i.split("++")[0]?.trim()}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody className="">
//           {data?.length > 0 ? (
//             rowsPerPage ? (
//               currentData?.map((i, key) => (
//                 <tr
//                   onDoubleClick={() =>
//                     onRowDoubleClick ? onRowDoubleClick(i) : null
//                   }
//                   onClick={() => (onRowClick ? onRowClick(i) : null)}
//                   key={key}
//                   className={` h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
//                 >
//                   {i.map((a, key) => {
//                     return (
//                       <td
//                         key={key}
//                         className={`${
//                           style?.columnAlignRight?.includes(key + 1)
//                             ? "text-right"
//                             : ""
//                         }   capitalize px-2 py-1`}
//                       >
//                         {style?.columnFormat?.includes(key + 1)
//                           ? formatNumber(a)
//                           : a}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             ) : (
//               data?.map((i, key) => (
//                 <tr
//                   key={key}
//                   onDoubleClick={() =>
//                     onRowDoubleClick ? onRowDoubleClick(i) : null
//                   }
//                   onClick={() => (onRowClick ? onRowClick(i) : null)}
//                   className={` h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
//                 >
//                   {i.map((a, key) => {
//                     return (
//                       <td
//                         key={key}
//                         // style={{ display: "flex", justifyContent: "center" }}
//                         className={`${
//                           style?.columnAlignRight?.includes(key + 1)
//                             ? "text-right"
//                             : "text-center"
//                         }   capitalize  px-2 py-1`}
//                       >
//                         {style?.columnFormat?.includes(key + 1)
//                           ? formatNumber(a)
//                           : a}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )
//           ) : defaultMessage ? (
//             <tr>
//               <td
//                 className="text-center w-full  border hover:bg-gray-100 bg-gray-100 font-semibold py-3 "
//                 colSpan={colspan}
//               >
//                 <div className="animate-pulse">{defaultMessage}</div>
//               </td>
//             </tr>
//           ) : (
//             <tr>
//               <td
//                 className="text-center border hover:bg-gray-100 bg-gray-100 font-semibold py-3 "
//                 colSpan={colspan}
//               >
//                 <div className="animate-pulse">No Data Found ...</div>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {
//         <div className="flex justify-end mt-2 mb-2">
//           <div className="flex align-center">
//             <button
//               className={` bg-slate-600 disabled:bg-slate-400 `}
//               style={{ borderRadius: "50%", width: "25px", height: "23px" }}
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               <MDBIcon fas icon="angle-left" />
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg> */}
//             </button>
//             <div className="mx-2 whitespace-nowrap">
//               Page -{" "}
//               <span style={{ color: "black", fontWeight: "bolder" }}>
//                 {currentPage}
//               </span>{" "}
//               / {totalPages}
//             </div>
//             <button
//               // className={`px-3 h-8 bg-slate-600 disabled:bg-slate-400`}
//               className={` bg-slate-600 disabled:bg-slate-400 `}
//               style={{ borderRadius: "50%", width: "25px", height: "23px" }}
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               <MDBIcon fas icon="angle-right" />

//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg> */}
//             </button>
//           </div>
//         </div>
//       }
//     </div>
//   );
// }

import React from "react";
import { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import TableLoader from "../../../../lending/components/loader/Loader";
export default function CustomTable({
  headers,
  data,
  style,
  rowsPerPage,
  green,
  load,
}) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [pagination, setPagination] = useState(false);

  function formatNumber(num) {
    const formatted = num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  let colspan = 0;

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
  console.log({ currentData, data, totalPages });
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
      <table className="w-full  bg-white rounded-sm   even:bg-slate-300  border-spacing-2 border border-gray-100">
        <thead>
          <tr
            className="py-1 capitalize font-semibold text-white"
            style={{
              // backgroundColor: "red",
              backgroundColor: green ? "#22c55e" : "#0580c0",
            }}
          >
            {headers?.map((i) => {
              return (
                <th
                  className="text-center px-2 py-1 border border-gray-100"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {i}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="">
          {rowsPerPage
            ? currentData?.map((i, key) => (
                <tr
                  key={key}
                  className={`text-center h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-100 even:bg-gray-100 odd:bg-white`}
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
                  className={`text-center h-8 border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-100 even:bg-gray-100 odd:bg-white`}
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
            }}
          >
            No Data Found...
          </div>
        </div>
      )}

      {data?.length === 0 && load && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <TableLoader />
        </div>
      )}

      {
        <div className="flex justify-end mt-2 mb-2">
          <div className="flex align-center">
            <button
              className={` bg-slate-600 disabled:bg-slate-400 `}
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
              className={` bg-slate-600 disabled:bg-slate-400 `}
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
      }
    </div>
  );
}
