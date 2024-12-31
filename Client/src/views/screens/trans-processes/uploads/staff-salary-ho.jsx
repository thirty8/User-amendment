import React, {useEffect, useState} from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Card,
} from "react-bootstrap";
import {AiOutlineEye} from "react-icons/ai";
import {BiUpload} from "react-icons/bi";
import {BiDownload} from "react-icons/bi";
import ActionButtons from "../../../components/others/action-buttons/ActionButtons";
import ButtonComponent from "../../../components/others/Button/ButtonComponent";
import InputField from "../../../components/others/Fields/InputField";
import ButtonType from "../../../components/others/Button/ButtonType";
import ButtonWColor from "./components/button";

import DataTable from "../../../components/others/Datatable/DataTable";

function StaffSalaryUpload(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const headers = {
        'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        'Content-Type': 'application/json'
      };
    return(
        <div>
            <div>
                <div>
                    <ActionButtons />
                </div>
              {/* Batch, Trans, Currency and View Exceptions */}
              <div className= "bg-white flex w-full mt-10 px-4 py-[10px] mb-2">
                {/* Batch, Trans Desc and Currency */}
              <div style={{flex: 0.8}}>
              <div className="flex w-full space-x-2">
                  {/* Batch Number */}
                  <div className="w-[35%]">
                    <InputField 
                    id={'batchNo'}
                    labelWidth={"35%"}
                    inputWidth={"40%"}
                    label={'Batch Number'}
                    disabled={true}
                    />
                  </div>
                  {/* Trans Desc */}
                  <div className="w-[40%]">
                    <InputField 
                    id={'TransDescription'}
                    labelWidth={"35%"}
                    inputWidth={"65%"}
                    label={'Trans Description'}
                    value={'SAL-SALARY TRANSACTIONS'}
                    disabled={true}
                    />
                  </div>
                  <div className="w-[5%]"></div>
                  {/* Currency */}
                   <div className="w-[35%]">
                    <InputField 
                    id={'Currency'}
                    labelWidth={"25%"}
                    inputWidth={"50%"}
                    label={'Currency'}
                    value={'KES-Kenya Shillings'}
                    disabled={true}
                    />
                  </div>
                </div>
              </div>
             
               <div className="" style={{flex:0.2, backgroundColor: ""}}>
               <div className= "flex  justify-end">
                <div>
                  
                  {/* <button className="button" style={{backgroundColor: "#d8392b", height:"25px"}}>View Exceptions</button> */}
                  <ButtonWColor
                  buttonIcon={<AiOutlineEye />}
                  buttonColor={"white"}
                  label={"View Exceptions"}
                  buttonHeight={"25px"}
                  buttonBackgroundColor={"#d8392b"}
                  // onClick={downloadExcelFile}
                  // buttonColor={"green"}
                />
              </div>
                </div>
               </div>
              </div>

               <br />
                <div 
                className=
                " h-auto pb-2 pt-2 px-2 mb-16 bg-white space-x-2"

                style={{
                  display:"flex",
                  flex: 1
                }}
                >
                  <div style={{width: "60%", height:"60%"}} className=" pb-2 pt-2 px-2 mb-16 wrapper rounded border-2">
                    {/* Debit  Account Details */}
                    <div  
                    style={{
                    display: "flex",
                   
                    backgroundColor: ""
                   }}>
                    <div className="w-full">
                    <header
          className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,

            textAlign: "center",
             marginLeft: "-9px",
             marginRight: "-9px",
             marginTop: '-8px'
            
          }}
        >
          Debit Account Details
        </header>
        &nbsp;
                        {/* Debit Account */}
                       <div className=" mb-2 flex items-center">
                        <InputField 
                        id={"DebitAccount"}
                        label={"Debit Account"}
                        required={true}
                        labelWidth={"20%"}
                    inputWidth={"80%"}
                        />
                       </div>
                       {/* Contra Description */}
                       <div className="w-full mb-2 flex items-center">
                        <InputField 
                        id={"ContraDescription"}
                        label={"Contra Description"}
                        labelWidth={"19.4%"}
                        inputWidth={"80%"}
                        disabled={true}
                        />
                       </div>
                       {/* Available Balance */}
                       <div className="w-full mb-2 flex items-center">
                        <InputField 
                        id={"AvailableBalance"}
                        label={"Available Balance"}
                        labelWidth={"20%"}
                        inputWidth={"80%"}
                        disabled={true}
                        />
                       </div>
                       {/* Scan Doc & View Doc Button */}
                       <div className="w-full mb-2 flex items-center space-x-2">
                       <div className="w-[70%]">
                          <InputField 
                          id={"ScanDoc"}
                          label={"Scan Document"}
                          labelWidth={"29%"}
                          inputWidth={"70%"}
                          />
                        </div>
                        <div className="w-[30%]" >
                          <ButtonComponent 
                          buttonColor={"white"}
                          buttonWidth={"100%"}
                          label={"View Document"}
                          />
                        </div>
                       </div>
                       {/* Debit Narration */}
                       <div className="w-full mb-2 flex items-center">
                        <InputField
                        id={"DebitNarration"}
                        label={"Debit Narration"}
                        labelWidth={"20%"}
                    inputWidth={"80%"}
                        />
                       </div>
                    </div>
                   </div>
                  
                  </div>
                  <div style={{width: "100%", marginLeft: 10, marginRight:10}} className="h-auto  pb-2 px- 2 wrapper rounded border-2">
                     {/* Excel  */}
                   <div  style={{
                   
                    
                   }}>
                   
                    <div style={{display:"flex", flex:1,marginTop: "10px"}} className="space-x-2 ml-2 mr-2">
                    <div style={{width: "50%",}} className="h-auto  pb-2 pt-2 px-2 mb-16 wrapper rounded border-2">
                      {/* Summary */}
                      <div style={{
                        display:"flex",
                     

                      }}>
                      <div className="w-full">
                      <header
          className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,

            textAlign: "center",
             marginLeft: "-9px",
             marginRight: "-9px",
             marginTop: '-8px'
            
          }}
        >
          Summary
        </header>
        &nbsp;
        {/* Valid & Invalid Accounts*/}
        <div className="mb-2 flex items-center">
         
          <InputField 
          label={"Valid Accounts"}
          labelWidth={"27%"}
          inputWidth={"73%"}
          disabled={true}
          />
         
          

        </div>
        {/* Invalid Accounts */}

        <div className="mb-2 flex items-center space-x-2">
        <div className="w-[95%]">
            <InputField 
            label={"Invalid Accounts"}
            disabled={true}
            labelWidth={"30%"}
                            inputWidth={"73%"}
            />
          </div>
          <div className="w-[5%]">
            <ButtonComponent 
            buttonIcon={<AiOutlineEye />}
            buttonHeight={"25px"}
            buttonWidth={"100%"}
            />
          </div>

        </div>
        {/* Currency mismatch */}
        <div className="mb-2 flex items-center  space-x-2">
        <div className="w-[95%]">
            <InputField 
            label={"Currency Mismatches"}
            disabled={true}
            labelWidth={"28%"}
            inputWidth={"70%"}
            />
          </div>
          <div className="w-[5%]">
            <ButtonComponent 
            buttonWidth={"100%"}
            buttonIcon={<AiOutlineEye />}
            buttonColor={"white"}
            buttonHeight={"25px"}
            />
          </div>

        </div>



                      </div>
                      </div>

                    </div>
                     
                    {/* Confirm Transaction */}
                    <div style={{width: "50%", }} className="h-auto  pb-2 pt-2 px-2 mb-16  wrapper rounded border-2">
                      <div style={{display:"flex"}}>
                        <div className="w-full">
                        <header
          className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,

            textAlign: "center",
             marginLeft: "-9px",
             marginRight: "-9px",
             marginTop: '-8px'
            
          }}
        >
          Confirm Transactions
        </header>
        &nbsp;
        <div className="mb-2 flex items-center space-x-2">
        <div className="w-[5%]">
            <ButtonType 
            id={"NoOfTransactions"}
            type={"checkbox"}
            />
          </div>
          {/* No of Transactions */}
          <div className="w-[95%]">
            <InputField 
            id={"NoTransactions"}
            disabled={true}
            label={"No of Transactions"}
            labelWidth={"30%"}
            inputWidth={"70%"}
            />
          </div>
        </div>
        <div className="mb-2 flex items-center space-x-2">
        <div className="w-[5%]">
            <ButtonType 
            id={"TransactionAmount"}
            type={"checkbox"}
            />
          </div>
          {/* Transaction Amount */}
          <div className="w-[95%]">
            <InputField 
            id={"TransAmount"}
            disabled={true}
            label={"Transaction Amount"}
            labelWidth={"30%"}
            inputWidth={"70%"}
            />
          </div>
        </div>
        <div className="w-[100%]">
          <InputField 
          label={"Credit Narration"}
          labelWidth={"36%"}
          inputWidth={"67%"}
          />
        </div>

                        </div>
                      </div>

                    </div>
                    </div>
                    {/* Personnel */}
                    <div style={{display:"flex", flex:1, marginTop:"10px"}}className="space-x-2 ml-2 mr-2">
                    <div style={{width: "50%",}} className="h-auto  pb-2 pt-2 px-2 mb-16 wrapper rounded border-2">
                    <div style={{
                        display:"flex",
                     

                      }}>
                        <div className="w-full">
                        <header
          className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,

            textAlign: "center",
             marginLeft: "-9px",
             marginRight: "-9px",
             marginTop: '-8px'
            
          }}
        >
          Personnel
        </header>
        &nbsp;
        {/* Invalid Staff Number */}
        <div className="mb-2 flex items-center space-x-2">
        <div className="w-[95%]">
            <InputField 
            label={"Invalid Staff Number"}
            disabled={true}
            labelWidth={"28%"}
            inputWidth={"70%"}
            />
          </div>
          <div className="w-[5%]">
            <ButtonComponent 
            buttonWidth={"100%"}
            buttonIcon={<AiOutlineEye />}
            buttonColor={"white"}
            buttonHeight={"25px"}
            />
          </div>

        </div>
        {/* Invalid Cost Center */}
        <div className="mb-2 flex items-center space-x-2">
        <div className="w-[95%]">
            <InputField 
            label={"Invalid Staff Number"}
            disabled={true}
            labelWidth={"28%"}
            inputWidth={"70%"}
            />
          </div>
          <div className="w-[5%]">
            <ButtonComponent 
           buttonWidth={"100%"}
           buttonIcon={<AiOutlineEye />}
           buttonColor={"white"}
           buttonHeight={"25px"}
            />
          </div>

        </div>

                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Upload & Generate Excel */}
                    <div style={{flex:1, display: "flex", justifyContent:"space-between", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}}>
                      <ButtonComponent 
                      label={"Upload Excel"}
                  buttonColor={"white"}
                  buttonIcon={<BiUpload />}
                  buttonHeight={"25px"}
                      />
                      <ButtonWColor 
                     buttonIcon={<BiDownload />}
                     buttonColor={"white"}
                     label={"Generate Template"}
                     buttonHeight={"25px"}
                     buttonBackgroundColor={"green"}
                      // buttonColor={"green"}
                       
                      />
                     
                    </div>
      
                   </div>

                  </div>
                  
                </div>
                <br />
                <DataTable
                title={"Excel Transactions"}
                 search={true}
                 filter={true}
                 download={true}
                columns={["Pin", "Account Number","Account Description","Credit Amount", "Branch"]}
                />
            </div>
        </div>
    );
}
export default StaffSalaryUpload;