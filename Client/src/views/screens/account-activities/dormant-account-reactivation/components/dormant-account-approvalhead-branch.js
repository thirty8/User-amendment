import React, { useState, useEffect } from "react";
// import CustomTable from "../../../teller-ops/components/CustomTable";

import ScreenBase3 from "../../m/SreenBase3";
import ScreenBase2 from "../../m/ScreenBase2";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Cards from "../../closed-accounts/cards/Cards";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import InnerCards from "../../closed-accounts/cards/inner-cards";
import AccountSummary from "../../../../../components/others/AccountSummary";
import { API_SERVER } from "../../../../../config/constant";
import DocumentViewing from "../../../../../components/DocumentViewing";
import Header from "../../../../../components/others/Header/Header";
import Swal from "sweetalert2"
import axios from "axios";
import swal from "sweetalert";
import { MDBIcon } from "mdbreact";
import { Modal } from "@mantine/core";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../../../teller-ops/components/CustomTable";
import { FiChevronRight } from "react-icons/fi";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";

import { Center } from "@mantine/core";
function DormantAccountApprovalbranch() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [messageData, setMessageData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [accountnumber, setAccountNumber] = useState("");
  const [accountnumberEnter, setAccountNumberEnter] = useState("");
  const [accountname, setAccountName] = useState("");
  const [getdata, setData] = useState({});

  const [getdata2, setData2] = useState({});
  const [accountnumber2, setAccountNumber2] = useState("");
  const [accountDetails, setAccountDetails] = useState({});
  const [getToken, setToken] = useState("");
  const [transAcct, setTransAcct] = useState("");
  const [closureReason, setClosureReason] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setdmtact, dmtact] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchCodeValue, setBranchCodeValue] = useState("");
  const [refresh, setrefresh] = useState(false);




  const [showInputField, setShowInputField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))

  );

  
  useEffect(() => {
    async function getBranchCode(){
      let response= await axios.post(  API_SERVER +"/api/get-code-details", {
              code: "BRA",
            }, 
            {
              headers,
            })
            setBranchCode(response.data)
            console.log(response.data)
          }
          getBranchCode()   
        }, []);




  // console.log("hiii");
 

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };


    async function dormantBranchTable(value) {
      setLoading(true);
      console.log(value,"jjjjjj")
      let arr=[]
      try {
        axios.post(
          API_SERVER + "/api/dormant-branch-approval-table", {
              branchCode: value,
          },
          { headers }
        ).then((result)=>{
                  if(result.data.length >0){
          result.data.map((i)=>{
            arr.push([i.ACCOUNT_DESCRP,i.ACCT_LINK,i.REASON,i.DATE_ALTERED,i.POSTED_BY,<div><ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />}
            onClick={() => {
         
              console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
              setIsChecked(true);
  
              axios
                .post(
                  // api view to provide account details on selected account
                  API_SERVER + "/api/get-dormant-account",
                  {
                    accountNumber: i.ACCT_LINK,
                  },
                  {
                    headers,
                  }
                )
                .then((response) => {
                  setData(response.data[0]);
                  console.log(response.data, "i am a weasel");
                  console.log(getdata, "getdatta");
                  // dormantAccountFeeRow();
                });
  
             
            
          }}
            /></div>])
          })
        }
        setTableData(arr)
        })
        // console.log(response.data,"kkkkkkkkk");

       
          // setTableData(response.data);
          setLoading(false);
        }
        catch(err) {
          console.log(err, "error");
          setLoading(false);
        };

      // AC TRANS LOWER SECTION
    }
    useEffect(() => {
      dormantBranchTable(branchCodeValue);
    }, [refresh]);
    
  

  console.log(tableData, "onane))");

  //FORMATTING DATE TO LOOK PRETTY
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  //CONSTANTS
  var dormantBranchTable2 = [];

  dormantBranchTable2 = tableData?.map((i) => {
    return [
      <div>{i?.ACCT_LINK}</div>,
      <div style={{ textAlign: "left" }}>{i?.ACCOUNT_DESCRP}</div>,
      <div style={{ textAlign: "left" }}>{i?.REASON}</div>,

      <div>{formatDate(i?.DATE_ALTERED)}</div>,
      <div style={{ textAlign: "left" }}>{i?.POSTED_BY}</div>,

      <div style={{ display: "flex", justifyContent: "center" }}>
      <div
       
        onClick={() => {
         
            console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
            setIsChecked(true);

            axios
              .post(
                // api view to provide account details on selected account
                API_SERVER + "/api/get-dormant-account",
                {
                  accountNumber: i.ACCT_LINK,
                },
                {
                  headers,
                }
              )
              .then((response) => {
                setData(response.data[0]);
                console.log(response.data, "i am a weasel");
                console.log(getdata, "getdatta");
                // dormantAccountFeeRow();
              });

           
          
        }}
      
        >
    <ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />} />

      </div>
    </div>,
    ];
  });
  console.log(dormantBranchTable2);



  

  async function dmtacct() {
  
     axios
    .post(
      "http://localhost:3320/api/dmtacct",
      {
        ACCT_V: getdata.acct_link,
        BATCH_V: "201810175291",
        USER_V: getdata.account_descrp,
        BRA_V: "007",
        HOST_V: "DESKTOP-TMA9USK",
        DOC_V: "671214122",
      },
      {
        headers,
      }
    )
    .then(function (response) {
      console.log(response.data, "waakye");
      
      if(response?.data?.MSG_V?.split(":")[0] === "INF - 06667"){
        swal({
        title: "Success",
        text: response.data?.MSG_V,
        buttons: "OK"
      }).then((response)=>{if(response){

        setIsChecked(!isChecked);
        setrefresh(!refresh);
        setIsChecked2(!isChecked);
        

      }})
      
    }
      else{ alert("Error")}

      // if(response.data?.MSG_CODE === 0){
      //   swal({icon: "error"})
      // }
      // Swal.fire("INF - 06667", response.data?.MSG_V?.split(":")[1], 'success')
      // setdmtact(response.data?.MSG_V)
    }).
  catch ((error) => {
    console.log(error);
    swal({
      title: "Error",
      text: error,
      buttons: "OK"
    })
  })

    
  }

  return (
    <div>
            <Modal opened={isChecked} onClose={()=>{setIsChecked(false)}} size={"70%"}>
            
        <div>
          <div>
          {isChecked2 === true ? (
            <ActionButtons
            onAuthoriseClick={ dmtacct }
            displayCancel={"none"}
              displayDelete={"none"}
              displayFetch={"none"}
              displayHelp={"none"}
              displayRefresh={"none"}
              displayReject={"none"}
              displayNew={"none"}
              onExitClick={() => setIsChecked(!isChecked)}



            />
          ) : (
            <div>
              <ActionButtons

                displayCancel={"none"}
                displayDelete={"none"}
                displayFetch={"none"}
                displayHelp={"none"}
                displayRefresh={"none"}
                displayReject={"none"}
                displayNew={"none"}
                displayAuthorise={"none"}

                onExitClick={() => setIsChecked(!isChecked)}


              />
            </div>
          )
          }
          
            <Cards
                div1={
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "1.0", marginRight: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "15px",
                          marginLeft: "2px",
                        }}
                      >
                        <div style={{ flex: "0.85" }}>
                          <InputField
                            label={"Account Number"}
                            type={"number"}
                            labelWidth={"25.6%"}
                            required={true}
                            inputWidth="30%"
                            disabled={true}
                            value={getdata.acct_link}
                            onChange={(e) => {
                              setAccountNumber(e.target.value);
                            }}
                          // onKeyDown={clsedAccount}
                          />
                        </div>
  
                        <div style={{ flex: "0.15" }}>
                          
                            <ButtonComponent
                              // onClick={DocumentViewModal}
                              label={"View Fees Transaction."}
                              buttonHeight={"26px"}
                              buttonColor={"white"}
                              buttonBackgroundColor="rgb(21 163 183)"
                              inputWidth={""}
                            />
                          
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"end"}}>
                     
                     <ButtonType
                       type={"checkbox"}
                       label={"Check To Approve"}
                       onChange={() => setIsChecked2(!isChecked2)}
                     />


                        </div>
  
                      <InnerCards
                        innercarddiv={
                          <div>
                            <div style={{ marginBottom: "10px" }}>
                              <InputField
                                label={"Account Name"}
                                labelWidth={"20.4%"}
                                required={false}
                                inputWidth="50%"
                                disabled={true}
                                // value={getdata[0]?.account_descrp}
                                value={getdata.account_descrp}
                              />
                            </div>
  
                            <div style={{ marginBottom: "10px" }}>
                              <InputField
                                label={"Currency"}
                                labelWidth={"20.4%"}
                                required={false}
                                inputWidth="20%"
                                disabled={true}
                                // value={getdata[0]?.curr_desc}
                                value={getdata.currency_desc
                                }
                              />
                            </div>
  
                            <div style={{ marginBottom: "10px" }}>
                              <InputField
                                label={"Product"}
                                labelWidth={"20.4%"}
                                required={false}
                                inputWidth="40%"
                                disabled={true}
                                // value={getdata[0]?.description}
                                value={getdata.product_desc}
                              />
                            </div>
  
                            <div style={{ marginBottom: "10px" }}>
                              <InputField
                                label={"Branch"}
                                labelWidth={"20.4%"}
                                required={false}
                                inputWidth="30%"
                                disabled={true}
                                // value={getdata[0]?.branch_descrp}
                                value={getdata.branch_desc}
                              />
                            </div>
  
                            <div style={{ marginBottom: "10px" }}>
                              <InputField
                                label={"Account Status"}
                                labelWidth={"20.4%"}
                                required={false}
                                inputWidth="20%"
                                disabled={true}
                                // value={getdata[0]?.account_status}
                                value={getdata.status_desc

                                }
                              />
                            </div>
                          </div>
                        }
                      />
                      <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                        <InnerCards
                          innercarddiv={
                            <div style={{ display: "flex" }}>
                              <div style={{ flex: "0.4" }}>
                                <InputField
                                  label={"Date Opened "}
                                  labelWidth={"51.5%"}
                                  required={false}
                                  inputWidth="45%"
                                  disabled={true}
                                  // type={"date"}
                                  value={getdata.date_opened}
                                />
                              </div>
                              <div style={{ flex: "0.4" }}>
                                <InputField
                                  label={"Date Of Last Activity"}
                                  labelWidth={"45%"}
                                  required={false}
                                  inputWidth="50%"
                                  disabled={true}
                                  // type={"date"}
                                  value={getdata.date_of_last_activity
                                  }
                                />
                              </div>
                              <div style={{ flex: "0.2" }}>
                                <InputField
                                  label={"Level"}
                                  labelWidth={"40%"}
                                  required={false}
                                  inputWidth="60%"
                                  disabled={true}
                                  value={getdata.level_identifier}
                                />
                              </div>
                            </div>
                          }
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                       
                       
  
                        <div style={{ display: "flex", marginBottom: "15px" }}>
                          <div style={{ flex: "35%" }}>
                            <InputField
                              label={"Source Document"}
                              labelWidth={"42.7%"}
                              inputWidth={"40%"}
                              onChange={(e) => {
                                setToken(e.target.value);
                              }}
                            />
                          </div>
                          <div style={{ flex: "40%" }}>
                            <ButtonComponent
                              // onClick={DocumentViewModal}
                              label={"View Doc."}
                              buttonHeight={"26px"}
                              buttonColor={"white"}
                              buttonBackgroundColor="rgb(21 163 183)"
                              inputWidth={""}
                            />
                          </div>
                        </div>
                        {sweetAlertConfirmed && (
                          <Modal
                            show={sweetAlertConfirmed}
                            size="lg"
                            centered
                            style={{ height: "100%" }}
                            className="shadow-md shadow-black"
                          >
                            <div className="flex items-center justify-between mx-2 p-2">
                              <div className="font-extrabold text-black">
                                View Document
                              </div>
                              <div
                                className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                                onClick={() => handleExitClick(false)}
                              >
                                x
                              </div>
                            </div>
                            <Modal.Body>
                              {/* <ImageVerification accountNumber={imageAccount} /> */}
                              <DocumentViewing documentID={getToken} />
                            </Modal.Body>
                            {/* <Modal.Footer>
              <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
            </Modal.Footer> */}
                          </Modal>
                          // 1683042691
                        )}
                      </div>
                    </div>
  
                
                  </div>
                }
            />
          </div>
        </div>
      
              </Modal>

      
        <div>
          <ActionButtons onExitClick={handleExitClick} 
       displayCancel={"none"}
       displayDelete={"none"}
       displayFetch={"none"}
       displayHelp={"none"}
       displayView={"none"}
       displayOk={"none"}

       displayReject={"none"}
          
          
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <hr />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",

            
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>
              <ListOfValue
                label={"Branch"}
                disabled={false}
                inputWidth={"100%"}
                data={branchCode}
                value={branchCodeValue}
                onChange={(value) => {
                  setBranchCodeValue(value);
                   dormantBranchTable(value)
                  
                }}
              />
            </div>
          </div>
       

          <Header title={"Dormant Reactivation Approval"} headerShade />

          <div>
            <CustomTable
              load={loading}
              headers={[
                // "Account Number","Account Name","Request ID","Posted By","Posted Date","Approval Flag","posted_sys_time","app_status","branch_code"
                "Account_number",
                "Account Number",
                "Reason",
                "Date",
                "Posted By",
                "Click",
                // },
              ]}
              green
              data={tableData}
              style="float:left;margin-right:20px;"
            />
          </div>
        </div>
       
    </div>
  );
}

export default DormantAccountApprovalbranch;
