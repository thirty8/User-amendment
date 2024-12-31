import React, { useEffect, useState } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
// import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
// import InputField from "../../../../components/others/Fields/InputField";
// import CustomTable from "../../../../teller-ops/components/CustomTable";
// import CustomTable from "../../teller-ops/components/CustomTable";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import { headers } from "../../../../teller-ops/teller/teller-activities";
// import { headers } from "../../teller-ops/teller/teller-activities";
import Swal from "sweetalert2";
import { Loader, Modal } from "@mantine/core";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

export default function EndOfDay() {
  const [processes, setProcesses] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState("");
  const [runningProcIndex, setRunningProcIndex] = useState("");
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [runningProc, setRunningProc] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [procLength, setProcLength] = useState({
    no_of_processes: 0,
    processes_pending: 0,
    executed_processses: 0,
  });
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState([]);
  function formatDate(dateTimeString, addTime) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]?.toUpperCase();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    if (addTime) {
      return `${day}-${month}-${year}, ${formattedHours}:${minutes}${amPm}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  }

  useEffect(() => {
    Promise.all([
      axios
        .post(
          API_SERVER + "/api/end-of-day",
          { key: "get-processes-lov" },
          { headers: headers }
        )
        .then((res) => {
          setProcesses(res?.data);
        }),

      axios
        .post(
          API_SERVER + "/api/end-of-day",
          { key: "last_executed" },
          { headers: headers }
        )
        .then((res) => {
          setLast(res?.data);
        }),
    ]);
  }, []);

  function handleRefresh(value) {
    function handleProcessChange() {
      axios
        .post(
          API_SERVER + "/api/end-of-day",
          {
            key: "get-processes",
            process: selectedProcesses,
            username: JSON.parse(localStorage.getItem("userInfo"))?.id,
          },
          { headers: headers }
        )
        .then((res) => {
          setData(res.data?.processes);
          setDate(res.data?.date);
          setProcLength((prev) => ({
            ...prev,
            processes_pending: res.data?.processes?.filter(
              (innerArray) => innerArray.length > 2 && innerArray[3] === "N"
            )?.length,
            executed_processses: res.data?.processes?.filter(
              (innerArray) => innerArray.length > 2 && innerArray[3] !== "N"
            )?.length,
          }));
          console.log("running");
        })
        .catch((err) => {
          console.log(err, "running");
        });
    }

    axios
      .post(
        API_SERVER + "/api/end-of-day",
        {
          key: "refresh",
          process: selectedProcesses,
          username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        },
        { headers: headers }
      )
      .then((res) => {
        handleProcessChange();
      });
  }
  function findLastFailed(arr) {
    return arr.reduceRight((lastElement, currentElement) => {
      if (!lastElement && currentElement[5] === "FAILED") {
        // If the current element has the desired status and it's the first one encountered,
        // return it as the initial last element.
        return currentElement;
      }
      return lastElement;
    }, null);
  }
  console.log({ data });
  function findNextItemAfterN(arrayOfArrays) {
    function convertToDecimal(number) {
      // Check if the number is a decimal
      if (Number.isInteger(number)) {
        return number; // If it's an integer, return as is
      } else {
        return number.toFixed(1); // If it's a decimal, round to one decimal place
      }
    }
    let runLength = procLength.executed_processses;

    if (runLength < arrayOfArrays?.length) {
      if (arrayOfArrays[runLength + 1]?.length >= 3) {
        return `${convertToDecimal(arrayOfArrays[runLength][0])} - ${
          arrayOfArrays[runLength][2]
        }`;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  useEffect(() => {
    setProcLength({ no_of_processes: data?.length });
    const arr = data?.map((i, key) => {
      return [
        i[0],
        i[2],
        <div className="flex space-x-3 items-center justify-center font-semibold">
          <input type="checkbox" checked={i[3] !== "N"} />
          <span>Executed</span>
        </div>,
        <span className="font-semibold text-sm whitespace-nowrap">
          {i[4] && formatDate(i[4], true)}
        </span>,
        <span
          className={`${
            i[5] === "SUCCESS"
              ? "text-green-500"
              : i[5] === "FAILED"
              ? "text-red-500"
              : ""
          } font-semibold capitalize flex  justify-center text-sm`}
        >
          {i[5]}
        </span>,
      ];
    });
    setRunningProc(findNextItemAfterN(data));
    if (findLastFailed(data)) {
      Swal.fire({
        icon: `warning`,
        html: `<div class="font-semibold">
        Process execution failed at <span class='text-indigo-700 mx-2'>"${
          findLastFailed(data)[2]
        }"</span>Please contact technical team
        </div>`,
      });
    }

    setTableData(arr);
  }, [data]);

  async function handleProcessChange(value) {
    setSelectedProcesses(value);
    await Promise.all([
      axios
        .post(
          API_SERVER + "/api/end-of-day",
          {
            key: "validate_process",
            process: value,
            // username: JSON.parse(localStorage.getItem("userInfo"))?.id,
          },
          { headers: headers }
        )
        .then((res) => {
          // return console.log('validate' , res.data)
          if (res.data != true) {
            Swal.fire({
              icon: `error`,
              html: `<div class="font-semibold">
              ${res.data}
              </div>`,
              allowOutsideClick: false,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                setIsConfirmed(false);
                setData([]);
                setSelectedProcesses("");
                setProcLength({
                  no_of_processes: 0,
                  processes_pending: 0,
                  executed_processses: 0,
                });
              }
            });
          } else {
            axios
              .post(
                API_SERVER + "/api/end-of-day",
                {
                  key: "get-processes",
                  process: value,
                  username: JSON.parse(localStorage.getItem("userInfo"))?.id,
                },
                { headers: headers }
              )
              .then((res) => {
                // console.log({date: res.data})

                setData(res.data?.processes);
                setDate(res.data?.date);

                setProcLength((prev) => ({
                  ...prev,
                  processes_pending: res.data?.processes?.filter(
                    (innerArray) =>
                      innerArray.length > 2 && innerArray[3] === "N"
                  )?.length,
                  executed_processses: res.data?.processes?.filter(
                    (innerArray) =>
                      innerArray.length > 2 && innerArray[3] !== "N"
                  )?.length,
                }));
              })
              .catch((err) => {
                console.log({ err });
              });
          }
          console.log({ res });
        }),
      axios
        .post(
          API_SERVER + "/api/end-of-day",
          { key: "last_executed" },
          { headers: headers }
        )
        .then((res) => {
          setLast(res?.data);
        }),
    ]);
  }

  function handleEOD() {
    if (!isConfirmed) {
      Swal.fire({
        icon: `warning`,
        html: `<div class="font-semibold">
        Confirm run date is not weekend or holiday
        </div>`,
      });
      return;
    }

    if (selectedProcesses == "") {
      Swal.fire({
        allowOutsideClick: false,
        icon: `warning`,
        html: `<div class="font-semibold">
        Kindly select process
        </div>`,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsConfirmed(false);
        }
      });

      return;
    }

    setLoading(true);
    let intervalId;
    function handleProcessChange() {
      axios
        .post(
          API_SERVER + "/api/end-of-day",
          {
            key: "get-processes",
            process: selectedProcesses,
            username: JSON.parse(localStorage.getItem("userInfo"))?.id,
          },
          { headers: headers }
        )
        .then((res) => {
          setData(res.data?.processes);
          console.log(res.data?.processes, "i dey here");
          setProcLength((prev) => ({
            ...prev,
            processes_pending: res.data?.processes?.filter(
              (innerArray) => innerArray.length > 2 && innerArray[3] === "N"
            )?.length,
            executed_processses: res.data?.processes.filter(
              (innerArray) => innerArray.length > 2 && innerArray[3] !== "N"
            )?.length,
          }));
          // console.log("running");
          if (res.data?.processes.some((i) => i[3] == "F")) {
            clearInterval(intervalId);
          }
        })
        .catch((err) => {
          console.log(err, "running");
        });
    }

    intervalId = setInterval(handleProcessChange, 1500);
    axios
      .post(
        API_SERVER + "/api/end-of-day",
        {
          key: "run-eod",
          process: selectedProcesses,
          username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        },
        { headers: headers }
      )
      .then((res) => {
        console.log({ res });
        handleProcessChange();
        setLoading(false);
        clearInterval(intervalId);

        if (data?.some((i) => i[3] != "F")) {
          Swal.fire({
            allowOutsideClick: false,
            icon: `success`,
            html: `<div class="font-semibold">
          ${
            processes.find((i) => i.value == selectedProcesses)?.label
          } successfully completed
          </div>`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              setSelectedProcesses("");
              setIsConfirmed(false);
              setData([]);
            }
          });
        }
        // if (res.data?.find((i) => i[3] !== "F")?.length == 0) {
        //   Swal.fire({
        //     icon: `success`,
        //     html: `<div class="font-semibold">
        //     Process complete
        //     </div>`,
        //   });
        // }
      })
      .catch((err) => {
        setLoading(false);
        clearInterval(intervalId);
      });
  }
  return (
    <div className="pb-10">
      <Modal
        withCloseButton={false}
        opened={loading}
        centered
        closeOnClickOutside={false}
        closeButtonProps={false}
      >
        <div className="flex flex-col items-center">
          <div className="flex space-x-3 items-center">
            <Loader size={35} color="blue" />
            <div className="text-sm text-gray-600 animate-pulse">
              Running Process, Please wait
            </div>
          </div>
          <div className=" text-lg font-semibold space-y-10">
            {runningProc && (
              <div className="text-blue-500 text-center">[ {runningProc} ]</div>
            )}
          </div>
        </div>
      </Modal>
      <div className="flex my-4 space-x-2 items-center">
        <> </>
      </div>

      <div className="flex  space-x-3">
        <div className="w-[65%] h-screen">
          <CustomTable
            runningProcIndex={runningProcIndex}
            data={tableData}
            headers={[
              "S/D",
              "Process Description ++ 2",
              "Last Executed Date ",
              "Current State",
            ]}
          />
        </div>
        <div className="w-[35%] space-y-2">
          <div className="flex justify-end space-x-2 items-center">
            <label className="text-sm">Business Date</label>
            <input
              type="text"
              disabled
              value={formatDate(
                JSON.parse(localStorage.getItem("userInfo"))?.postingDate
              )}
              className="border rounded-sm bg-gray-200 py-1 px-2 text-sm font-semibold text-center"
            />
          </div>
          <div className="border-2 rounded space-y-4  py-3 px-2">
            <div>
              <ListOfValue
                required={true}
                value={selectedProcesses}
                labelWidth={"30%"}
                inputWidth={"70%"}
                label={"Select Process"}
                data={processes}
                onChange={(value) => {
                  handleProcessChange(value);
                }}
              />
            </div>
            <div>
              <InputField
                required={true}
                labelWidth={"30%"}
                inputWidth={"70%"}
                label={"Execution Date"}
                value={date && formatDate(date)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleRefresh();
                }}
                className="text-sm border flex space-x-3 rounded bg-zinc-500 py-2 px-3 font-semibold text-white"
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg> */}
                <span>Refresh</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <input
                id="check"
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => {
                  e.target.checked
                    ? setIsConfirmed(true)
                    : setIsConfirmed(false);
                }}
              />
              <label
                htmlFor="check"
                className="text-red-600 cursor-pointer text-sm font-semibold"
              >
                Check to confirm that the Execution date is not a weekend or
                Holiday
              </label>
            </div>
          </div>
          <div className=" flex justify-between my-7  space-x-2 py-2 px-2 ">
            <div className="flex flex-col w-[30%]">
              <label className="font-semibold whitespace-nowrap mb-[6px] text-gray-500">
                {" "}
                No Of Processes
              </label>
              <input
                type="text"
                value={procLength.no_of_processes}
                disabled
                className="border font-medium pl-3 text-center rounded py-1 bg-gray-200"
              />
            </div>
            <div className="flex flex-col w-[30%]">
              <label className="font-semibold text-center whitespace-nowrap mb-[6px] text-gray-500">
                {" "}
                Pending
              </label>
              <input
                type="text"
                value={procLength.processes_pending}
                disabled
                className="border pl-3 text-center font-medium rounded py-1 bg-gray-200 text-red-500"
              />
            </div>
            <div className="flex flex-col w-[30%]">
              <label className="font-semibold whitespace-nowrap mb-[6px] text-gray-500 ">
                Executed Processes
              </label>
              <input
                type="text"
                value={procLength.executed_processses}
                disabled
                className="border pl-3 text-center  font-medium rounded py-1 text-green-500 bg-gray-200"
              />
            </div>
          </div>
          <div className=" rounded   py-3 px-2">
            <span className="font-semibold text-gray-500 mb-[6px] ">
              Last Process Executed
            </span>
            <div className="flex space-x-3 mb-7 mt-2">
              <input
                type="text"
                value={last[0] && formatDate(last[0])}
                disabled
                className="border bg-gray-200 w-[40%]  font-medium text-sm px-2 py-[6px] rounded"
              />
              <input
                type="text"
                value={last[1]}
                disabled
                className="border bg-gray-200 w-[60%] font-medium text-sm px-2 py-1 rounded"
              />
            </div>
            <div className="flex justify-center ">
              <button
                onClick={handleEOD}
                className=" w-full  rounded-[7px] active:bg-slate-400 text-white  bg-blue-500 py-2 px-7 font-semibold"
              >
                Start Process Update
              </button>
            </div>

            {/* <div className="border-2 py-4 flex items-center justify-center">
              <button className="text-sm rounded border-2 border-sky-400  bg-sky-200 py-2 px-3 font-semibold">
                Balance After EOD ACCT.
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomTable({
  headers,
  data,
  style,
  rowsPerPage,
  onRowDoubleClick,
  onRowClick,
  defaultMessage,
  theadBackground,
  runningProcIndex,
  // pagination,
}) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [pagination, setPagination] = useState(false);

  function convertToDecimal(number) {
    // Check if the number is a decimal
    if (Number.isInteger(number)) {
      return number; // If it's an integer, return as is
    } else {
      return number.toFixed(1); // If it's a decimal, round to one decimal place
    }
  }

  function formatNumber(num) {
    let formatted;
    // console.log({num})
    if (num !== "" || num !== null) {
      if (parseFloat(num)) {
        formatted = num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        });
      } else {
        formatted = parseFloat(num).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        });
      }
      return formatted;
    } else {
      return "";
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  // const [colSpan, setColSpan] = useState("");
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

  let colspan = 0;
  headers?.map((i) => {
    if (parseFloat(i.split("++")[1])) {
      colspan += parseFloat(i.split("++")[1]);
    } else {
      colspan += 1;
    }
  });
  return (
    <div
      className="bg-[#f9f9f9] h-full  tableScrollBar text-[94%] w-full"
      style={{ overflowX: "scroll" }}
    >
      <table className="w-full  bg-white rounded-sm text-gray-500">
        <thead>
          <tr
            className="py-1 capitalize font-semibold text-white"
            style={{
              backgroundColor: "#0580c0",
              background: theadBackground ? theadBackground : "#0580c0",
            }}
          >
            {headers?.map((i, index) => {
              return (
                <th
                  key={index}
                  colSpan={parseInt(i.split("++")[1]?.trim())}
                  className={`whitespace-nowrap px-2 py-1 border border-gray-300 ${
                    style?.headerAlignRight?.includes(index + 1)
                      ? "text-right"
                      : style?.headerAlignLeft?.includes(index + 1)
                      ? "text-left"
                      : "text-center"
                  }`}
                >
                  {i.split("++")[0]?.trim()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          // style={{ height: "40px" }}
          className={`${rowsPerPage ? "" : " overflow-y-auto"}`}
        >
          {data?.length > 0 ? (
            data?.map((i, key) => (
              <tr
                key={key}
                onDoubleClick={() =>
                  onRowDoubleClick ? onRowDoubleClick(i) : null
                }
                onClick={() => (onRowClick ? onRowClick(i) : null)}
                className={` h-8 ${
                  runningProcIndex == key ? "bg-orange-200" : null
                }  border-spacing-2 bg-[#f9f9f9] hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
              >
                {i.map((a, key) => {
                  return (
                    <td
                      key={key}
                      // style={{ display: "flex", justifyContent: "center" }}
                      className={`${key == 0 ? "w-[30px]" : ""} ${
                        style?.columnAlignRight?.includes(key + 1)
                          ? "text-right"
                          : style?.columnAlignCenter?.includes(key + 1)
                          ? "text-center"
                          : ""
                      }   capitalize  px-2 py-1`}
                    >
                      {key == 0 ? convertToDecimal(a) : a}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : defaultMessage ? (
            <tr>
              <td
                className="text-center w-full  border hover:bg-gray-100 bg-gray-100 font-semibold py-3 "
                colSpan={colspan}
              >
                <div className="animate-pulse">{defaultMessage}</div>
              </td>
            </tr>
          ) : (
            <tr>
              <td
                className="text-center border hover:bg-gray-100 bg-gray-100 font-semibold py-3 "
                colSpan={colspan}
              >
                <div className="animate-pulse">No Data Found ...</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rowsPerPage && (
        <div className="flex justify-end mt-2 mb-2">
          <div className="flex align-center">
            <button
              className={` bg-slate-600 disabled:bg-slate-400 `}
              style={{ borderRadius: "50%", width: "25px", height: "23px" }}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <div className="flex justify-center items-center">
                <AiOutlineArrowLeft className="text-white font-bold" />
              </div>
              {/* <svg
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
              </svg> */}
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
              <div className="flex justify-center items-center">
                <AiOutlineArrowRight className="text-white font-bold" />
              </div>

              {/* <svg
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
              </svg> */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
