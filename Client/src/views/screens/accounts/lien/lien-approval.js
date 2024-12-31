import React, { useEffect, useState } from "react";
import CustomTable from "../../teller-ops/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "../../teller-ops/teller/teller-activities";
import { Modal } from "@mantine/core";
import LienCreation from "./lien-creation";

export function formatDate(dateTimeString, addTime) {
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

export default function LienApproval() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState({ status: false });

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/lien",
        {
          key: "lien-approval",
          subKey: "fetch-pending-approvals",
          branch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        },
        { headers: headers }
      )
      .then((res) => {
        const arr = [];
        res?.data.map((i) => {
          arr.push([
            i[0],
            i[1],
            i[2],
            i[3],
            formatDate(i[4]),
            formatDate(i[5]),

            i[6],
            <div
              onClick={() => {
                setShowModal({ req_no: i[0], status: true });
                // setContent({ transNo: i[1], batchNo: i[0] });
              }}
              className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 stroke-cyan-300 fill-gray-800"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>,
          ]);
        });
        setData(arr);
        // console.log({ res });
      });
  }, []);

  return (
    <div>
      <Modal
        size={"60%"}
        opened={showModal.status}
        onClose={() => {
          setShowModal({ status: false });
        }}
      >
        <LienCreation req_no={showModal?.req_no} />
      </Modal>
      <div>
        <CustomTable
          headers={[
            "Lien Number",
            "Account No",
            "Account Name",
            "Lien Amount",
            "Expiry Date",
            "Effective Date",
            "Comments",
            "Action",
          ]}
          style={{ columnAlignRight: [4], columnFormat: [4] }}
          data={data}
        />
      </div>
    </div>
  );
}
