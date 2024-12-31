import React, { useState, useEffect, useRef } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";

const Burrower = ({
  setOtherDetailsModal,
  loanAppNo,
  relation,
  sector,
  subSector,
  introSource,
  dealer,
}) => {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [data, setData] = useState([]);

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const getFees = () => {
    axios
      .post(
        API_SERVER + "/api/get-fees-fid",
        { loan_app_no: loanAppNo },
        { headers }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFees();
  }, []);

  const fee = data.map((i) => {
    // console.log(item, "stoff");

    return [
      <div>{i.fee_desc}</div>,
      <div className="font-bold text-center">
        {i.fee_rate != "null" ? formatNumber(parseFloat(i.fee_rate)) : ""}
      </div>,
      <div className="font-bold text-right">
        {i.fee_amount != "null" ? formatNumber(parseFloat(i.fee_amount)) : ""}
      </div>,
    ];
  });

  return (
    <div style={{ zoom: 0.9 }}>
      <div>
        <HeaderComponent
          title={"Burrower Details"}
          height={"35px"}
          backgroundColor={"#0063d1"}
          color={"white"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <ButtonComponent
          label={"Return"}
          // buttonIcon={<HiViewfinderCircle size={20} />}
          buttonWidth={"90px"}
          buttonHeight={"33px"}
          buttonBackgroundColor={"red"}
          onClick={() => {
            setOtherDetailsModal(false);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "2.5px solid #d6d7d9",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div style={{ flex: 0.5 }}>
          <div>
            <HeaderComponent title={"Other Details"} height={"35px"} />
          </div>
          <div>
            <InputField
              label={"Intro Source"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={introSource}
            />
          </div>
          <div>
            <InputField
              label={"Dealer Code"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={dealer}
            />
          </div>
          <div>
            <InputField
              label={"Sector"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={sector}
            />
          </div>
          <div>
            <InputField
              label={"Sub Sector"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={subSector}
            />
          </div>
          <div>
            <InputField
              label={"Relation Officer"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={relation}
            />
          </div>
        </div>
        <div style={{ flex: 0.5 }}>
          <div>
            <HeaderComponent title={"Loan Charges"} height={"35px"} />
          </div>
          <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            <CustomTable headers={["Charges", "%", "Fee Amount"]} data={fee} />
          </div>
        </div>
      </div>
      <br />
      <div>
        <HeaderComponent title={"Employment Details"} height={"35px"} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "10px",
        }}
      >
        <div style={{ flex: 0.5 }}>
          <div>
            <InputField
              label={"Employment Category"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Employment Type"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Employer Name"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Employee No"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Start Date"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Position Held"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Employed Since"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Address 1"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Phone 1"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
        </div>
        <div style={{ flex: 0.5 }}>
          <div>
            <InputField
              label={"Phone 2"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Location"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"City"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Landmark"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"End Date"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Employment No"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Department"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Fax No"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
          <div>
            <InputField
              label={"Address 2"}
              inputWidth={"50%"}
              labelWidth={"30%"}
              disabled
              value={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burrower;
