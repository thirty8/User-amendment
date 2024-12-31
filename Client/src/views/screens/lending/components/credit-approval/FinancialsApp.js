import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

const FinancialsApp = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 0.6 }}>
          <div>
            {/* <DataTable
                  columns={[
                    "Income Details (Individual)",
                    "Income Amount",
                    "Amount to Consider",
                  ]}
                /> */}
            <CustomTable
              headers={[
                "Income Details (Individual)",
                "Income Amount",
                "Amount to Consider",
              ]}
            />
            {/* <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                padding: "10px",
                borderRadius: "3px",
                color: "white",
                background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
              }}
            >
              <div style={{ flex: 0.47 }}>INCOME DETAILS (INDIVIDUAL)</div>
              <div style={{ flex: 0.25 }}>INCOME AMOUNT</div>
              <div style={{ flex: 0.25 }}>AMOUNT TO CONSIDER</div>
            </div> */}
            {/* <div style={{ display: "flex" }}>
              <div style={{ flex: 0.3 }}>
                <ListOfValue inputWidth={"300px"} />
              </div>
              <div style={{ flex: 0.25 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div> */}
            {/* <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.4 }}>
                <ListOfValue inputWidth={"300px"} />
              </div>
              <div style={{ flex: 0.25 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div> */}
            {/* <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.4 }}>
                <ListOfValue inputWidth={"300px"} />
              </div>
              <div style={{ flex: 0.25 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div> */}
            {/* <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.9 }}></div>
              <div>
                <InputField
                  label={"Total Income"}
                  labelWidth={"53%"}
                  inputWidth={"252px"}
                  disabled
                />
              </div>
            </div> */}
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <div>
            {/* <DataTable
                  columns={["Asset Details (Individuals)", "Amount"]}
                /> */}
            <CustomTable headers={["Asset Details (Individuals)", "Amount"]} />
            {/* <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                padding: "10px",
                borderRadius: "3px",
                color: "white",
                background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
              }}
            >
              <div style={{ flex: 0.72 }}>ASSET DETAILS (INDIVIDUAL)</div>
              <div style={{ flex: 0.25 }}>AMOUNT</div>
            </div> */}
            {/* <div style={{ display: "flex" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-25px", display: "flex" }}>
              <div style={{ flex: 0.4 }}></div>
              <div style={{ flex: 0.6 }}>
                <InputField
                  disabled
                  label={"Total Asset"}
                  labelWidth={"34%"}
                  inputWidth={"150px"}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 0.6 }}>
          <div>
            {/* <DataTable
                  columns={[
                    "Expenditure and Other Contributions (Individual)",
                    "Amount",
                  ]}
                /> */}
            <CustomTable
              headers={[
                "Expenditure and Other Contributions (Individual)",
                "Amount",
              ]}
            />

            {/* <div style={{ display: "flex" }}>
              <div style={{ flex: 0.65 }}>
                <ListOfValue inputWidth={"530px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.65 }}>
                <ListOfValue inputWidth={"530px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.65 }}>
                <ListOfValue inputWidth={"530px"} />
              </div>
              <div style={{ flex: 0.3 }}>
                <InputField inputWidth={"200px"} />
              </div>
              <div style={{ marginTop: "14px", flex: 0.05 }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div style={{ flex: 0.9 }}></div>
              <div>
                <InputField
                  label={"Total Expenditure"}
                  labelWidth={"53%"}
                  inputWidth={"252px"}
                  disabled
                />
              </div>
            </div> */}
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <div>
            {/* <DataTable
                  columns={["Liability Details (Individuals)", "Amount"]}
                /> */}
            <CustomTable
              headers={["Liability Details (Individuals)", "Amount"]}
            />
            {/* <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                padding: "10px",
                borderRadius: "3px",
                color: "white",
                background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
              }}
            >
              <div style={{ flex: 0.72 }}>LIABILITY DETAILS (INDIVIDUAL)</div>
              <div style={{ flex: 0.25 }}>AMOUNT</div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-25px" }}>
              <div>
                <ListOfValue inputWidth={"280px"} />
              </div>
              <div>
                <InputField inputWidth={"150px"} />
              </div>
              <div style={{ marginTop: "14px" }}>
                <ButtonComponent
                  label={"x"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ marginTop: "-25px", display: "flex" }}>
              <div style={{ flex: 0.4 }}></div>
              <div style={{ flex: 0.6 }}>
                <InputField
                  disabled
                  label={"Total Liability:"}
                  labelWidth={"34%"}
                  inputWidth={"150px"}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 0.6 }}>
          <div>
            <HeaderComponent
              title={"Existing Facilities (This Bank)"}
              height={"35px"}
            />
          </div>
          <CustomTable
            headers={[
              "Facility Type",
              "Amount Number",
              "CCY",
              "Facility Amount",
              "Installment",
              "Expiry Date",
            ]}
          />
          {/* <div
            style={{
              height: "40px",
              marginTop: "5px",
              width: "100%",
              display: "flex",
              padding: "10px",
              borderRadius: "3px",
              color: "white",
              background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
            }}
          >
            <div style={{ flex: 0.19 }}>FACILITY TYPE</div>
            <div style={{ flex: 0.2 }}>AMOUNT NUMBER</div>
            <div style={{ flex: 0.09 }}>CCY</div>
            <div style={{ flex: 0.2 }}>FACILITY AMOUNT</div>
            <div style={{ flex: 0.15 }}>INSTALLMENT</div>
            <div style={{ flex: 0.15 }}>EXPIRY DATE</div>
          </div> */}
          {/* <div style={{ display: "flex" }}>
            <div style={{ flex: 0.15 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"150px"} />
            </div>
            <div style={{ flex: 0.1, marginLeft: "-12px" }}>
              <InputField inputWidth={"50px"} />
            </div>
            <div style={{ flex: 0.2, marginLeft: "-5px" }}>
              <InputField inputWidth={"130px"} />
            </div>
            <div style={{ flex: 0.2 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={">"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"40px"}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-25px" }}>
            <div style={{ flex: 0.15 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"150px"} />
            </div>
            <div style={{ flex: 0.1, marginLeft: "-12px" }}>
              <InputField inputWidth={"50px"} />
            </div>
            <div style={{ flex: 0.2, marginLeft: "-5px" }}>
              <InputField inputWidth={"130px"} />
            </div>
            <div style={{ flex: 0.2 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={">"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"40px"}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-25px" }}>
            <div style={{ flex: 0.15 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"150px"} />
            </div>
            <div style={{ flex: 0.1, marginLeft: "-12px" }}>
              <InputField inputWidth={"50px"} />
            </div>
            <div style={{ flex: 0.2, marginLeft: "-5px" }}>
              <InputField inputWidth={"130px"} />
            </div>
            <div style={{ flex: 0.2 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ flex: 0.1 }}>
              <InputField inputWidth={"100px"} />
            </div>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={">"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"40px"}
              />
            </div>
          </div>
          <div style={{ marginTop: "-20px", display: "flex" }}>
            <div style={{ flex: 0.4 }}></div>
            <div style={{ flex: 0.6 }}>
              <InputField
                disabled
                label={"Total Monthly Installment:"}
                labelWidth={"43%"}
                inputWidth={"150px"}
              />
            </div>
          </div> */}
        </div>
        <div style={{ flex: 0.4 }}>
          <div>
            <HeaderComponent
              title={"Existing Facilities (Other Banks)"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div>
            <CustomTable
              headers={[
                "Bank Code",
                "Amount Granted",
                "Monthly Amount",
                "Date Granted",
              ]}
            />
          </div>
          {/* <div
            style={{
              height: "40px",
              marginTop: "5px",
              width: "100%",
              display: "flex",
              padding: "10px",
              borderRadius: "3px",
              justifyContent: "space-between",
              color: "white",
              background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
            }}
          >
            <div></div>
            <div>BANK CODE</div>
            <div>AMOUNT GRANTED</div>
            <div>MONTHLY AMOUNT</div>
            <div>DATE GRANTED</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={"+"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"30px"}
              />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div style={{ marginLeft: "-10px" }}>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField type={"date"} inputWidth={"100px"} />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-25px" }}>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={"+"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"30px"}
              />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div style={{ marginLeft: "-10px" }}>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField type={"date"} inputWidth={"100px"} />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "-25px" }}>
            <div style={{ marginTop: "14px" }}>
              <ButtonComponent
                label={"+"}
                buttonBackgroundColor={"white"}
                buttonColor={"white"}
                buttonHeight={"27px"}
                buttonWidth={"30px"}
              />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div style={{ marginLeft: "-10px" }}>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField inputWidth={"90px"} />
            </div>
            <div>
              <InputField type={"date"} inputWidth={"100px"} />
            </div>
          </div>
          <div style={{ marginTop: "-20px", display: "flex" }}>
            <div style={{ flex: 0.2 }}></div>
            <div style={{ flex: 0.8 }}>
              <InputField
                disabled
                label={"Total Monthly Installment:"}
                labelWidth={"43%"}
                inputWidth={"150px"}
              />
            </div>
          </div> */}
        </div>
      </div>
      <div
        style={{
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "white",
          width: "35%",
        }}
      >
        <div>
          <InputField
            label={"Total Monthly Income"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
          />
        </div>
        <div>
          <InputField
            label={"Requested Loan Installment"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
          />
        </div>
        <div>
          <InputField
            label={"Total Monthly Expenditure"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialsApp;
