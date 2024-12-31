import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import DataTable from "../../../../components/others/Datatable/DataTable";
import CustomTable from "../../../../components/others/customtable";
import ButtonType from "../../../../components/others/Button/ButtonType";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Header from "../../../../components/others/Header/Header";
export default function AlertDeactivate() {
  const [data, setData] = useState([
    [
      "034577",
      "Unionsg",
      "union@unionsg.com",
      "233528237374",
      <div className="flex space-x-4 items-center w-full justify-center">
        {/* <input type="checkbox" label="SMS" /> */}
        <ButtonType type={"checkbox"} id={"sms"} label={"SMS"} />
        <ButtonType type={"checkbox"} id={"EMAIL"} label={"EMAIL"} />
      </div>,
      <div className="w-full flex justify-center">
        <ButtonComponent label={<AiOutlineDoubleRight />} />
      </div>,
    ],
  ]);
  // useEffect(() => {
  //   setData();
  // }, []);

  return (
    <div className={"bg-gray-200 rounded scale-[0.90] -mx-20 -mt-4"}>
      <div className="w-full bg-white rounded py-2">
        <ActionButtons />
      </div>
      <hr className="my-[3px]" />

      <div className={"rounded h-auto pb-2 pt-3 px-4 bg-white"}>
        <div className="flex w-[80%] mb-3">
          <InputField
            label="Account Number"
            labelWidth="30%"
            inputWidth="65%"
            required
          />
          <InputField disabled inputWidth={"80%"} />
        </div>
        <div className="flex w-[80%] mb-6 ">
          <InputField
            disabled
            inputWidth={"65%"}
            labelWidth={"30%"}
            label={"Product"}
          />
          <InputField
            disabled
            inputWidth={"60%"}
            labelWidth={"20%"}
            label={"Currency code"}
          />
        </div>
        <hr className="my-[10px]" />

        {/* <DataTable /> */}
        <Header title="USER DETAILS" headerShade={true} />

        <CustomTable
          headers={[
            // "#",
            "Relation Number",
            "Name",
            "Email Address",
            "Phone Number",
            "E-Services",
            "Amendment",
          ]}
          // rowsPerPage={5}
          data={data}
        />
      </div>
    </div>
  );
}
