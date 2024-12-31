import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/others/customtable";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import swal from "sweetalert";
const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function ViewCharges({batchNumber}) {
  const [insertArray, setInsertArray] = useState([]);
  console.log({batchNumber});
  useEffect(() =>{
    // setTableLoader(true);
    axios.post(
      API_SERVER + "/api/counter_cheque_req",
      {
       key: "viewCharges",
       batchNo: batchNumber,
      },{ headers }
    ).then(function (response){
      console.log({response})
      if (response.data?.responseCode === "000"){
        setInsertArray(response.data?.data);
      
      }else {
        swal({
          title: "Error",
          text: response.data?.responseMessage,
          icon: "error",
          buttons: "OK",
        });
       
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() =>{
      // setTableLoader(false);
    })



},[batchNumber]);
  return (
    <div className="scale-[0.90] -mx-10 my-2">
      <div className=" p-3 bg-gray-200 rounded">
        <CustomTable
          headers={[
            "Chg. Code",
            "Document Reference",
            "Fee Description",
            "Fee Charge"
          ]}
          data={insertArray}
          backgroundColor={"#0580c0"}
          style={{
            columnAlignRight: [3],  
            columnFormat: [2],
          }}
        />
      </div>
    </div>
  );
}
