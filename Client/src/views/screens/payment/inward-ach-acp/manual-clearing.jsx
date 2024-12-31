import React, {useState} from "react";
import {
    Row,
    Col,
    Button,
    Container,
    Form,
    Modal,
    Card,
  } from "react-bootstrap";

import axios from 'axios'
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ModalComponent from "./components/ModalComponent";
import SearchModal from "./components/SearchModal";
import { MDBIcon } from "mdb-react-ui-kit";
import { IoMdSearch } from "react-icons/io";
import AccountSummary from "../../../../../components/others/AccountSummary";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
function ManualClearing(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const headers = {
        "x-api-key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      };
      return (
        <div>
            <div className="" style={{zoom: "75%"}}>
            <div>
          <ActionButtons />
    
          </div>
          <hr />
          {/* MAIN BODY */}
          <div style={{ display: "flex", backgroundColor: "", marginTop: "15px" }}>
            {/* left space */}
            <div style={{ flex: 0.025, backgroundColor: "" }}></div>
            {/* middle container */}
            <div style={{ display: "", flex: 0.95, backgroundColor: "" }}>
              {/* container with terminal ID, branch and the others */}
              <div  style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-around",
              marginTop: "10px",
            }}>
                <div>
              <InputField
                label={"Terminal ID"}
                labelWidth={"33%"}
                inputWidth={"67%"}
              
                disabled={"disabled"}
              />
            </div>
            <div>
              <InputField
                label={"User ID"}
                labelWidth={"30%"}
                inputWidth={"65%"}
                type={"text"}
                disabled={"disabled"}
              />
            </div>
            <div>
              <InputField
                label={"Trans Branch"}
                labelWidth={"38%"}
                inputWidth={"60%"}
                type={"text"}
                buttonType={"button"}
                disabled={"disabled"}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <InputField
                  label={"Select Batch No"}
                  labelWidth={"38%"}
                  inputWidth={"60%"}
                  type={"text"}
                  buttonType={"button"}
                  disabled={"disabled"}
                />
              </div>
              <div>
                <ModalComponent
                  textColor={"white"}
                  buttonBackgroundColor={"rgb(21 163 183)"}
                  buttonWidth={"80%"}
                  text={<IoMdSearch size={20} />}
                  modalBody={<SearchModal header={"Search Batch Number"} />}
                />
              </div>
            </div>
            </div>
            </div>
           
          </div>
          <hr />
                {/* left and right div  */}
                <div
            style={{
              display: "flex",
              flex: 1,
              backgroundColor: "",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {/* left container */}
            <div
              style={{ flex: 0.7, backgroundColor: "", padding: "15px 10px" }}
              className="my-card"
            >
           {/* trans type and Sign Ver Button */}
           <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.46, background: "" }}>
                  <ListOfValue
                    label={"Trans Type"}
                    labelWidth={"30%"}
                    inputWidth={"68%"}
                    required={true}
                    id={"transTypeID"}
                  />
                </div>
                <div style={{ flex: 0.2 }}></div>
                <div style={{ flex: 0.2 }}></div>
               {/* Sign Ver button */}
               <div
                  style={{
                    display: "flex",
                    flex: 0.2,
                    justifyContent: "",
                    backgroundColor: "",
                  }}
                >
                  <ButtonComponent
                    buttonColor={"white"}
                    label={"Sign. Ver"}
                    buttonWidth={"80%"}

                    buttonHeight={"25px"}
                  />
                </div>
              </div>

               {/* effective date and doc ref */}
               <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.46, background: "" }}>
               
                   <InputField
                    label={"Effective Date"}
                    labelWidth={"28%"}
                    inputWidth={"59%"}
                    // type={"date"}
                    disabled={true}
                    // value={date}
                  />
                </div>
                <div style={{ flex: 0.2 }}></div>
                <div style={{ display: "", flex: 0.34, backgroundColor: "" }}>
                  <InputField
                    label={"Document Ref"}
                    labelWidth={"35%"}
                    inputWidth={"59%"}
                 
                  />
                </div>
              </div>
              {/* Principal BBAN and Name */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.45 }}>
                  <InputField
                  id={'PrincipalBBAN'}
                    label={"Principal BBAN"}
                    labelWidth={"27.3%"}
                    inputWidth={"73%"}
                    required={true}
                    
                  />
                </div>
                <div style={{ flex: 0.025 }}></div>
                <div style={{ display: "", flex: 0.525, background: "" }}>
                  <InputField
                    inputWidth={"95.5%"}
                    // type={"date"}
                    disabled={true}
                    // value={date}
                  />
                </div>
              </div>
              {/*  narration */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <TextAreaField
                    label={"Narration"}
                    labelWidth={"12.3%"}
                    inputWidth={"85%"}
                    required={true}
                  />
                </div>
              </div>

              
            </div>

            {/* right div */}
            <div
              style={{
                display: "flex",
                flex: 0.29,
                justifyContent: "center",
                backgroundColor: "",
                //   padding:"15px 10px"
              }}
              className=""
            >
              <div >
                <AccountSummary/>
              </div>


      
            </div>
          </div>
          <hr />
                     {/* left and right div  */}
                     <div
            style={{
              display: "flex",
              flex: 1,
              backgroundColor: "",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {/* left container */}
            <div
              style={{ flex: 0.7, backgroundColor: "", padding: "15px 10px" }}
              className="my-card"
            >
         
              {/* Account Number and Name */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.45 }}>
                  <InputField
                  id={'Account No'}
                    label={"Account No"}
                    labelWidth={"27.3%"}
                    inputWidth={"73%"}
                    required={true}
                    
                  />
                </div>
                <div style={{ flex: 0.025 }}></div>
                <div style={{ display: "", flex: 0.525, background: "" }}>
                  <InputField
                    inputWidth={"95.5%"}
                    // type={"date"}
                    disabled={true}
                    // value={date}
                  />
                </div>
              </div>
                {/* amount and trans type C/D */}
                <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ flex: 0.45, backgroundColor: "" }}>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label={"Amount"}
                      labelWidth={"27.3%"}
                      inputWidth={"73%"}
                      // onKeyDown={handleKeyDown}
                   
                      disabled={false}
                      required={true}

                      // onChange={handleChange}
                      // value={accountNumber}
                    />
                  </div>
                </div>
                <div style={{ flex: 0.025 }}></div>
                {/* trans type C/D and disbaled field */}
                <div
                  style={{
                    display: "",
                    flex: 0.525,
                    justifyContent: "",
                    backgroundColor: "",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "",
                      backgroundColor: "",
                    }}
                  >
                    <div
                      style={{ display: "flex", background: "", flex: 0.56 }}
                    >
                      <div style={{ flex: 1 }}>
                        <InputField
                          label={"Trans.Type (C/D)"}
                          labelWidth={"55%"}
                          inputWidth={"25%"}
                          // onKeyDown={handleKeyDown}
                        
                          disabled={false}
                          required={true}
                        
                          // onChange={handleChange}
                          // value={accountNumber}
                        />
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", background: "", flex: 0.44 }}
                    >
                      <div style={{ flex: 1 }}>
                        <InputField
                          inputWidth={"90%"}
                        
                          disabled={true}
                          // onChange={handleChange}
                          // value={accountNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Document Ref and Sign Ver Button */}
           <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.46, background: "" }}>
                  <InputField
                    label={"Document Ref"}
                    labelWidth={"28%"}
                    inputWidth={"68%"}
                    required={true}
                    
                  />
                </div>
                <div style={{ flex: 0.2 }}></div>
                <div style={{ flex: 0.2 }}></div>
               {/* Sign Ver button */}
               <div
                  style={{
                    display: "flex",
                    flex: 0.2,
                    justifyContent: "",
                    backgroundColor: "",
                  }}
                >
                  <ButtonComponent
                    buttonColor={"white"}
                    label={"Sign. Ver"}
                    buttonWidth={"80%"}

                    buttonHeight={"25px"}
                  />
                </div>
              </div>
               {/* value date */}
               <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "", flex: 0.5 }}>
                  <InputField
                    label={"Value Date"}
                    labelWidth={"24.5%"}
                    inputWidth={"40%"}
                    type={"date"}
                    disabled={false}
                    required={true}
                    // value={date}
                  />
                </div>
              </div>
              {/*  narration 1 */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <TextAreaField
                    label={"Narration 1"}
                    labelWidth={"12.3%"}
                    inputWidth={"85%"}
                    required={true}
                  />
                </div>
              </div>
    {/*  narration 2 */}
    <div
                style={{
                  display: "flex",
                  flex: 1,
                  backgroundColor: "",
                  marginTop: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <TextAreaField
                    label={"Narration 2"}
                    labelWidth={"12.3%"}
                    inputWidth={"85%"}
                    required={true}
                  />
                </div>
              </div>
              
            </div>

            {/* right div */}
            <div
              style={{
                display: "flex",
                flex: 0.29,
                justifyContent: "center",
                backgroundColor: "",
                //   padding:"15px 10px"
              }}
              className=""
            >
              <div >
                <AccountSummary/>
              </div>


      
            </div>
          </div>
          <hr />
           {/* insert, remove all*/}
           <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-evenly",
              marginTop: "20px",
              backgroundColor: "",
            }}
          >
            <div>
              <ButtonComponent
              
                label={"Insert"}
                buttonWidth={"100%"}
                buttonHeight={"30px"}
              />
            </div>
            <div>
              <ButtonComponent
                
                label={"Remove All"}
                buttonWidth={"100%"}
                buttonHeight={"30px"}
              />
            </div>
            {/* dummy div for space */}
            <div> </div>
          </div>
           {/* DATATABLE */}
      <div style={{ display: "flex", flex: 1, marginTop: "13px" }}>
        <div style={{ flex: 0.025 }}></div>
        <div style={{ flex: 0.95 }}>
          <div style={{ flex: 1 }}>
            <DataTable
              columns={[
                "",
                "Account No",
                "Name",
                "Ref No",
                "Narration",
                "Amount Dr",
                "Amount Cr",
                "Branch",
                "Trn Number",
              ]}
            />
          </div>
        </div>
        <div style={{ flex: 0.025 }}></div>
      </div>
            </div>
        </div>
      );
}
export default ManualClearing;