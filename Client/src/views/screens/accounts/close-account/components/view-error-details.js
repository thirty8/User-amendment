import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import ModalLoader from "../../../../../components/others/ModalLoader";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import ModalComponent from "../../../../../components/others/Modal/modal";
// import Swal from "sweetalert2";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const ViewErrorDetails = ({ showModal, handleClose, acct_link, code }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function run() {
      setLoading(true);
      await axios
        .post(
          API_SERVER + "/api/close-account",
          {
            get_details: "true",
            acct_link: acct_link,
            code_value: code,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setData(response?.data);
          }
          setLoading(false);
        })
        .catch((err) => console.log("error in fetching details:", +err));
    }

    run();
  }, [showModal]);

  // format date
  function formatDate(dateString) {
    const originalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const monthNames = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      10: "OCT",
      11: "NOV",
      12: "DEC",
    };

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate?.toUpperCase();
  }

  return (
    <div>
      <ModalComponent
        open={showModal}
        onClose={handleClose}
        width={"40%"}
        content={
          loading ? (
            <div className="w-full flex justify-center pt-[100px] pb-[100px]">
              <ModalLoader />
            </div>
          ) : (
            <div>
              <h4 className="text-[16px] font-semibold text-slate-700 mt-3 mb-2">
                Account Information
              </h4>
              <table className="w-full">
                <tr
                  className="bg-white text-center px-2 py-1  cursor-pointer bg-[#0580c0] text-white"
                  style={{ whiteSpace: "nowrap", background: "#0580c0" }}
                >
                  <th className="border border-gray-100 uppercase w-[80%] text-sm">
                    {code === "06116"
                      ? "Lien Account(s)"
                      : code === "06117"
                      ? "Pending Transaction On Account(s)"
                      : code === "06118"
                      ? "Fixed Deposit On Account(s)"
                      : code === "06119"
                      ? "Loan Account(s)"
                      : code === "06120"
                      ? "Internet Banking Account(s)"
                      : code === "06121"
                      ? "Pan Account(s)"
                      : code === "06122"
                      ? "Standing Order On Account(s)"
                      : ""}
                  </th>
                </tr>
                <tbody className="">
                  {/* [#f9f9f9] */}

                  {data?.length > 0 &&
                    data?.map((i, key) => (
                      <tr
                        key={key}
                        className={`text-left border border-gray-100  h-8 border-spacing-2 border border-gray-100 hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
                        style={{ whiteSpace: "wrap" }}
                      >
                        {/* <td className="capitalize text-center border border-gray-300 ps-2">
                            {key + 1}
                          </td> */}
                        {/* uppercase */}
                        {Object.keys(i)?.map((a) => (
                          <tr className="flex items-center ">
                            <td className="capitalize font-semibold border-r text-sm  ps-2 w-[25%]">
                              {a?.replace(/_/g, " ")}
                            </td>

                            <td className="capitalize  text-gray-500 font-semibold text-sm ps-4 w-[75%]">
                              {a?.replace(/_/g, " ")?.includes("date") ? formatDate(i[a]) : i[a]}
                            </td>
                          </tr>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        }
      />
    </div>
  );
};

export default ViewErrorDetails;
