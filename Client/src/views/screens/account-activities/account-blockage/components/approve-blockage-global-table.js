
import React, { useState } from "react";
import ScreenBase from "./ScreenBase"
// import InputField from "../components/fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";

import { FaUserTimes } from "react-icons/fa/index.esm";
// import ListOfValue from "../components-updated/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
// import { margin } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Modal from "./Modal";
import clsx from "clsx";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import Index_approval from "./index_approval";

function UnnaprovedBlockageGlobal() {
  const [showModal, setShowModal] = useState(false);
  
  const data = [
    [
      "00233",
      "hehll",
      "748894",
      "karen",
      "pending",
      "naa",
      "hercules",
      " dont know",
      <button
        onClick={() => setShowModal(true)}
        className="bg-cyan-400 rounded-sm px-3 py-1 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>,
      
    ],
  ];

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} srrn={<Index_approval/>}/>
      <ScreenBase
        // header_title={"ACCOUNT BLOCKAGE"}
        // header_icon={<FaUserTimes />}
        card_div1a={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              
            }}
          >

            <ListOfValue
            label={"Select Branch"}
            inputWidth={"40%"}
            labelWidth={"10%"}

            
            />


        
            <ButtonComponent
              label={"Save"}
              buttonColor={"white"}
              buttonBackgroundColor="rgb(21 163 183)"
              // onClick={handleClick}
            />
          </div>
        }
        card_div2a={
          <div>
            <DataTable
              title={"UNNAPROVED ACCOUNT BLOCKAGE"}
              columns={[
                "Account Number",
                "Account Description",
                "Branch",
                "Customer Name",
                "Blockage Status",
                "Authoriser",
                "Created By",
                "Reason",
                "Click",
              ]}
              data={data}
            />
          </div>
        }
      />
    </div>
  );
}

export default UnnaprovedBlockageGlobal;
