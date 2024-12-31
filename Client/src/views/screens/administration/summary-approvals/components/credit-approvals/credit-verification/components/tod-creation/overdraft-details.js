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
import { API_SERVER } from "../../../../../../../../../config/constant";
import AccountSummary from "../../../../../components/others/AccountSummary";

const OverdraftDetails = () => {
  return (
    <div style={{}}>
      <div style={{ padding: "10px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 0.7 }}>
            <div>
              <div
                style={{
                  padding: "5px",
                  border: "0.5px solid #d6d7d9",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  display: "flex",
                }}
              >
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Facility Limit Number"}
                    labelWidth={"41%"}
                    disabled
                    required
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Batch Number"}
                    labelWidth={"30%"}
                    disabled
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Account Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <ListOfValue
                  label={"Account Number"}
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Product Type"}
                  labelWidth={"20%"}
                  inputWidth={"40%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Currency"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  disabled
                />
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Overdraft Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
                display: "flex",
              }}
            >
              <div style={{ flex: 0.65 }}>
                <div>
                  <InputField
                    label={"Tenor (In Days)"}
                    labelWidth={"30%"}
                    inputWidth={"50%"}
                    required
                  />
                </div>
                <div>
                  <InputField
                    label={"Requested Amount"}
                    labelWidth={"30%"}
                    inputWidth={"30%"}
                    required
                  />
                </div>
                <div style={{ display: "flex", marginTop: "-15px" }}>
                  <div style={{ flex: 0.5 }}>
                    <InputField
                      label={"Requested Amount"}
                      labelWidth={"66%"}
                      inputWidth={"30%"}
                      disabled
                      required
                    />
                  </div>
                  <div style={{ marginTop: "15px", marginRight: "4px" }}>+</div>
                  <div style={{ flex: 0.2 }}>
                    <InputField inputWidth={"95%"} />
                  </div>
                  <div style={{ marginTop: "15px" }}>=</div>
                  <div style={{ flex: 0.2 }}>
                    <InputField inputWidth={"95%"} disabled />
                  </div>
                </div>
              </div>
              <div style={{ flex: 0.35 }}>
                <div>
                  <InputField
                    label={"Posting Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    type={"date"}
                    required
                  />
                </div>
                <div>
                  <InputField
                    label={"Expiry Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    disabled
                  />
                </div>
                <div>
                  <InputField
                    label={"Utilization Date"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    type={"date"}
                    required
                  />
                </div>
              </div>
            </div>
            <br />
            <div>
              <HeaderComponent title={"Other Details"} height={"35px"} />
            </div>
            <div
              style={{
                padding: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <ListOfValue
                  label={"Purpose Code"}
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Source of Payment"}
                  labelWidth={"20%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Comment"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                />
              </div>
              <div>
                <InputField
                  label={"Monthly Income (Salary)"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                />
              </div>
              <div>
                <InputField
                  label={"TOD Charges"}
                  labelWidth={"20%"}
                  inputWidth={"20%"}
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.3 }}>
            <div>
              <AccountSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdraftDetails;
