import React, { useState, useEffect } from "react";
import Header from "../../../../components/others/Header/Header";
import InputField from "../../../../components/others/Fields/InputField";
import { FiX } from "react-icons/fi";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../control-setups/components/CustomTable";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";

function Collateral({ handleClose, data }) {
  // headers
  const collateralHeader = [
    <div>Sr. No</div>,
    <div>Collateral Type</div>,
    <div>Collateral Amount</div>,
    <div>Loan Amount</div>,
    <div>Loan % Covered</div>,
    <div>Amount utilized</div>,
    <div>Action</div>,
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [loading, setLoading] = useState(false);
  const [collateralNumberData, setCollateralNumberData] = useState([]);

  //   effect
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-collateral-no",
        { customer_number: data?.customer_number },
        { headers: headers }
      )
      .then(function (response) {
        setCollateralNumberData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ zoom: 0.85 }}>
      <Header
        title={"Collateral"}
        headerShade
        handleClose={handleClose}
        closeIcon={<FiX />}
      />

      <div
        className="space-y-4"
        style={{
          border: "1px solid #d9dadb",
          padding: "20px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Customer No"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled
              value={data?.customer_number}
            />
          </div>
          <div style={{ width: "50%" }}>
            <ListOfValue
              label={"Collateral No"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              //   data={collateralNumberData}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Total Amount"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              textAlign={"right"}
              disabled
            />
          </div>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Collateral Amount"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              textAlign={"right"}
              disabled
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Amount available to use"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              textAlign={"right"}
              disabled
            />
          </div>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Amount utitilized"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              textAlign={"right"}
              disabled
            />
          </div>
        </div>
      </div>

      <br />

      <div
        className="space-y-4"
        style={{
          border: "1px solid #d9dadb",
          padding: "20px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Loan Percentage Covered (%)"}
              required
              labelWidth={"55%"}
              textAlign={"right"}
              inputWidth={"40%"}
              disabled
            />
          </div>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Amount to be utitilized"}
              required
              labelWidth={"55%"}
              textAlign={"right"}
              inputWidth={"40%"}
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label={"Amount available"}
              required
              disabled
              labelWidth={"55%"}
              textAlign={"right"}
              inputWidth={"40%"}
            />
          </div>
        </div>
      </div>

      <br />

      <div
        className="space-y-4"
        style={{
          border: "1px solid #d9dadb",
          padding: "20px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", zoom: 0.8 }}>
          <div style={{ width: "50%" }}>
            <ButtonComponent
              label={"Add Comments"}
              buttonHeight={"35px"}
              buttonWidth={"90%"}
            />
          </div>
          <div style={{ width: "50%" }}>
            <ButtonComponent
              label={"Attach Other Documents"}
              buttonHeight={"35px"}
              buttonWidth={"90%"}
            />
          </div>

          <div style={{ width: "50%" }}>
            <ButtonComponent
              label={"Save"}
              buttonHeight={"35px"}
              buttonWidth={"90%"}
            />
          </div>

          <div style={{ width: "50%" }}>
            <ButtonComponent
              label={"Clear Record"}
              buttonHeight={"35px"}
              buttonWidth={"90%"}
            />
          </div>
        </div>
      </div>

      <br />
      <div style={{ zoom: 0.85 }}>
        <Header title={"Collateral"} headerShade />
        <CustomTable headers={collateralHeader} load={loading} data={[]} />
      </div>
    </div>
  );
}

export default Collateral;
