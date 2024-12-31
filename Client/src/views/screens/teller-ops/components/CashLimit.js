import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { headers } from "../teller/teller-activities";
function CashLimit({ selectedCurrency, setNav, type }) {
  const [data, setData] = useState([[]]);
  const [data2, setData2] = useState([[]]);

  useEffect(() => {
    if (type === "T") {
      axios
        .post(
          API_SERVER + "/api/cash-limit",
          { username: JSON.parse(localStorage.getItem("userInfo")).id },
          { headers }
        )
        .then((response) => {
          setData(response.data.main);
          setData2(response.data.exceptional);
        });
    } else {
      axios
        .post(
          API_SERVER + "/api/vault-activities",
          {
            username: JSON.parse(localStorage.getItem("userInfo")).id,
            key: "Cash Limit",
          },
          { headers }
        )
        .then((response) => {
          setData(response.data.main);
          setData2(response.data.exceptional);
        });
    }
  }, []);

  console.log({ data, data2 });

  return (
    <div className="bg-white p-2">
      <div className="flex justify-end">
        <ButtonComponent
          label={"Back"}
          buttonHeight={"30px"}
          buttonWidth={"10%"}
          onClick={() => {
            setNav("Main");
          }}
        />
      </div>
      <div className=" flex justify-center">
        <div className="w-[65%]">
          <div className="font-semibold mb-2 bg-[#daecfe] text-gray-600 uppercase py-2 px-2">
            Main Limit
          </div>
          <div className=" mb-4">
            <CustomTable
              headers={[
                "Currency",
                "Max Credit",
                "Max Debit",
                "Max Floor Limit",
                "Min Floor Limit",
              ]}
              style={{
                columnFormat: [2, 4, 3, 5],
                columnAlignRight: [2, 4, 3, 5],
              }}
              data={data}
            />
          </div>
          <div className="font-semibold mb-2 bg-[#daecfe] text-gray-600 uppercase py-2 px-2">
            Exceptional Limit
          </div>

          <div className="">
            <CustomTable
              headers={[
                "Currency ",
                "Max Credit",
                "Max Debit",
                "Max Floor Limit",
                "Min Floor Limit",
              ]}
              style={{
                columnFormat: [2, 4, 3, 5],
                columnAlignRight: [2, 4, 3, 5],
              }}
              data={data2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashLimit;
