// import React, { useState, useEffect } from "react";
// import CustomTable from "../../../../../components/others/customtable";
// import ScreenBase3 from "../../m/SreenBase3";
// import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
// import Cards from "../cards/Cards";
// import InputField from "../../../../../components/others/Fields/InputField";
// import SelectField from "../../../../../components/others/Fields/SelectField";
// import InnerCards from "../cards/inner-cards";
// import AccountSummary from "../../../../../components/others/AccountSummary";
// import { API_SERVER } from "../../../../../config/constant";
// import DocumentViewing from "../../../../../components/others/DocumentViewing";
// import axios from "axios";
// import swal from "sweetalert";
// import { MDBIcon } from "mdbreact";
// import { Modal } from "react-bootstrap";
// import ButtonType from "../../../../../components/others/Button/ButtonType";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
// import DataTable from "../../../../../components/others/Datatable/DataTable";
// import { Input } from "antd";

// function CloseAccountApproval() {
//   const headers = {
//     "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };
//   const [messageData, setMessageData] = useState([]);
//   const [isChecked, setIsChecked] = useState(true);
//   const [isChecked2, setIsChecked2] = useState(false);

//   const [accountnumber, setAccountNumber] = useState("");
//   const [accountnumberEnter, setAccountNumberEnter] = useState("");
//   const [accountname, setAccountName] = useState("");
//   const [getdata, setData] = useState({});

//   const [getdata2, setData2] = useState({});
//   const [accountnumber2, setAccountNumber2] = useState("");
//   const [accountDetails, setAccountDetails] = useState({});
//   const [getToken, setToken] = useState("");
//   const [transAcct, setTransAcct] = useState("");
//   const [closureReason, setClosureReason] = useState("");
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
//   const [showMyApprovalLimit, setMyApprovalLimit] = useState(true);
//   const [showOk, setShowOk] = useState(false);
//   const [clsdata, setclsdata] = useState(false);



//   const [showInputField, setShowInputField] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");

//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );

//   // console.log("hiii");
//   useEffect(() => {
//     async function clsapproval() {
//       try {
//         let response = await axios.get(
//           API_SERVER + "/api/get-closed-account-approval",
//           { headers }
//         ).then((response) => {
//           setMessageData(response.data);
//         }).catch((err) => console.log(`error is : ${err}`));

//       } catch (error) {
//         console.log(error);
//       }
//     }
//     clsapproval();
//   }, []);

//   var msgData = messageData?.map((i) => {
//     return [
//       <div>{i?.ACCOUNT_NUMBER}</div>,
//       <div>{i?.ACCOUNT_DESC}</div>,
//       <div>{i?.APP_STATUS}</div>,
//       <div>{i?.POSTED_BY}</div>,
//       <div>{i?.POSTED_DATE}</div>,
//       <div>{i?.APP_FLAG}</div>,


//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <input
//           type="checkbox"
//           onChange={(e) => {
//             if (e.target.checked === true) {
//               console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
//               setIsChecked(false);

//               axios
//                 .post(
//                   API_SERVER + "/api/get-closed-account",
//                   {
//                     accountNumber: i.ACCOUNT_NUMBER,
//                   },
//                   {
//                     headers,
//                   }
//                 )
//                 .then((response) => {
//                   setclsdata(response.data[0]);
//                   console.log(response.data, "i am a weasel");
//                   console.log(clsdata);
//                   // dormantAccountFeeRow();
//                 });


//             }
//           }}
//         // id={i?.ACCT_LINK}
//         // onClick={() => {
//         //   // acTransLowerSectionCall();
//         //   // swiftLowerSectionCall();
//         // }}
//         />
//       </div>,
//     ];

//   })

//   console.log(clsdata, "you we littt")
//   console.log(messageData, "karen");
//   return (
//     <div>
//       {isChecked ? (
//         <div>


//           {/* <span style={{ paddingLeft: 5, paddingRight: 5 }}>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => document.getElementById("closeModalBTN").click()}
//                 style={{
//                   background:
//                     `url(` +
//                     window.location.origin +
//                     `/assets/images/headerBackground/` +
//                     getTheme.theme.headerImage +
//                     `)`,
//                   }*/}


//           <ScreenBase3
//             card_div1a={
//               <div>

//                 {/* <ActionButtons/> */}




//                 <div>


//                   <CustomTable

//                     headers={["Account Number", "Account Name", "Request ID", "Posted By", "Posted Date", "Approval Flag", ""]}

//                     data={msgData}



//                   />
//                 </div>

//               </div>
//             }
//           />
//         </div>
//       ) : (
//         <div>
//           <div>


//             {isChecked2 === true ? (
//               <ActionButtons
//                 onAuthoriseClick={() => {

//                 }}
//                 displayFetch={"none"}
//                 displayNew={"none"}

//                 displayView={"none"}
//                 displayOk={"none"}
//                 displayCancel={"none"}
//                 onExitClick={() => setIsChecked(!isChecked)}






//               />
//             ) : (
//               <div>

//                 <ActionButtons

//                   displayFetch={"none"}
//                   displayNew={"none"}
//                   displayAuthorise={"none"}
//                   displayView={"none"}
//                   displayOk={"none"}
//                   displayCancel={"none"}

//                   onExitClick={() => setIsChecked(!isChecked)}




//                 />

//                 {console.log("faraway")}</div>
//             )}









//             <Cards
//               div1={
//                 <div style={{ display: "flex" }}>
//                   <div style={{ flex: "0.7", marginRight: "10px" }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         marginBottom: "15px",
//                         marginLeft: "2px",
//                       }}
//                     >
//                       <div style={{ flex: "0.85" }}>
//                         <InputField
//                           label={"Account Number"}
//                           type={"number"}
//                           labelWidth={"25.6%"}
//                           required={true}
//                           inputWidth="30%"
//                           disabled={true}
//                           value={clsdata.acct_link}
//                           onChange={(e) => {
//                             setAccountNumber(e.target.value);
//                           }}
//                         // onKeyDown={clsedAccount}
//                         />
//                       </div>

//                       <div style={{ flex: "0.15" }}>
//                         <div>
//                           <ButtonComponent
//                             // onClick={DocumentViewModal}
//                             label={"View Fees Transaction."}
//                             buttonHeight={"26px"}
//                             buttonColor={"white"}
//                             buttonBackgroundColor="rgb(21 163 183)"
//                             inputWidth={""}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       style={{
//                         display: "flex",
//                         marginBottom: "15px",
//                         marginLeft: "2px",
//                       }}
//                     >
//                       <div style={{ flex: "0.6" }}>
//                         <InputField
//                           label={"Transfer Type"}
//                           labelWidth={"35.3%"}
//                           inputWidth={"41.5%"}
//                           disabled={true}
//                           // onChange={(value) => {
//                           //   handleSelectChange(value);
//                           // }}
//                           data={[
//                             { label: "Cash", value: "C" },
//                             { label: "Account", value: "A" },
//                           ]}
//                         />
//                       </div>

//                       <div style={{ flex: "0.4" }}>
//                         {showInputField && (
//                           <div>
//                             <InputField
//                               label={"Reference Number"}
//                               labelWidth={"40%"}
//                               inputWidth={"60%"}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <InnerCards
//                       innercarddiv={
//                         <div>
//                           <div style={{ marginBottom: "10px" }}>
//                             <InputField
//                               label={"Account Name"}
//                               labelWidth={"20.4%"}
//                               required={false}
//                               inputWidth="50%"
//                               disabled={true}
//                               // value={getdata[0]?.account_descrp}
//                               value={clsdata.account_descrp}
//                             />
//                           </div>

//                           <div style={{ marginBottom: "10px" }}>
//                             <InputField
//                               label={"Currency"}
//                               labelWidth={"20.4%"}
//                               required={false}
//                               inputWidth="20%"
//                               disabled={true}
//                               // value={getdata[0]?.curr_desc}
//                               value={clsdata.curr_desc}
//                             />
//                           </div>

//                           <div style={{ marginBottom: "10px" }}>
//                             <InputField
//                               label={"Product"}
//                               labelWidth={"20.4%"}
//                               required={false}
//                               inputWidth="40%"
//                               disabled={true}
//                               // value={getdata[0]?.description}
//                               value={clsdata.description}
//                             />
//                           </div>

//                           <div style={{ marginBottom: "10px" }}>
//                             <InputField
//                               label={"Branch"}
//                               labelWidth={"20.4%"}
//                               required={false}
//                               inputWidth="30%"
//                               disabled={true}
//                               // value={getdata[0]?.branch_descrp}
//                               value={clsdata.branch_descrp}
//                             />
//                           </div>

//                           <div style={{ marginBottom: "10px" }}>
//                             <InputField
//                               label={"Account Status"}
//                               labelWidth={"20.4%"}
//                               required={false}
//                               inputWidth="20%"
//                               disabled={true}
//                               // value={getdata[0]?.account_status}
//                               value={clsdata.account_status
//                               }
//                             />
//                           </div>
//                         </div>
//                       }
//                     />
//                     <div style={{ marginBottom: "10px", marginTop: "15px" }}>
//                       <InnerCards
//                         innercarddiv={
//                           <div style={{ display: "flex" }}>
//                             <div style={{ flex: "0.4" }}>
//                               <InputField
//                                 label={"Date Opened "}
//                                 labelWidth={"51.5%"}
//                                 required={false}
//                                 inputWidth="45%"
//                                 disabled={true}
//                                 // type={"date"}
//                                 value={clsdata.date_opened}
//                               />
//                             </div>
//                             <div style={{ flex: "0.4" }}>
//                               <InputField
//                                 label={"Date Of Last Activity"}
//                                 labelWidth={"45%"}
//                                 required={false}
//                                 inputWidth="50%"
//                                 disabled={true}
//                                 // type={"date"}
//                                 value={clsdata.date_of_last_activity
//                                 }
//                               />
//                             </div>
//                             <div style={{ flex: "0.2" }}>
//                               <InputField
//                                 label={"Level"}
//                                 labelWidth={"40%"}
//                                 required={false}
//                                 inputWidth="60%"
//                                 disabled={true}
//                                 value={clsdata.level_identifier}
//                               />
//                             </div>
//                           </div>
//                         }
//                       />
//                     </div>
//                     <div style={{ marginLeft: "10px" }}>
//                       <div style={{ display: "flex", marginBottom: "15px" }}>
//                         <div style={{ flex: "0.45" }}>
//                           <InputField
//                             label={"Transfer Account Number"}
//                             labelWidth={"45%"}
//                             type={"number"}
//                             inputWidth="50.5%"
//                             disabled={transAcct ? true : false}
//                             value={transAcct ? transAcct : accountnumber2}
//                             // onKeyDown={Transfer_account_name}
//                             onChange={(e) => {
//                               setAccountNumber2(e.target.value);
//                             }}
//                           />
//                         </div>
//                         <div style={{ flex: "0.55" }}>
//                           <InputField
//                             label={"Account Name"}
//                             labelWidth={"23%"}
//                             inputWidth="77%"
//                             disabled={true}
//                             value={getdata2[0]?.account_descrp}
//                           />
//                         </div>
//                       </div>
//                       <div style={{ marginBottom: "15px" }}>
//                         <InputField
//                           label={"Closure Reason"}
//                           labelWidth={"20.3%"}
//                           required={true}
//                           inputWidth="70%"
//                           disabled={false}
//                           onChange={(e) => {
//                             setClosureReason(e.target.value);
//                           }}
//                         />
//                       </div>

//                       <div style={{ display: "flex", marginBottom: "15px" }}>
//                         <div style={{ flex: "35%" }}>
//                           <InputField
//                             label={"Source Document"}
//                             labelWidth={"42.7%"}
//                             inputWidth={"40%"}
//                             onChange={(e) => {
//                               setToken(e.target.value);
//                             }}
//                           />
//                         </div>
//                         <div style={{ flex: "40%" }}>
//                           <ButtonComponent
//                             // onClick={DocumentViewModal}
//                             label={"View Doc."}
//                             buttonHeight={"26px"}
//                             buttonColor={"white"}
//                             buttonBackgroundColor="rgb(21 163 183)"
//                             inputWidth={""}
//                           />
//                         </div>
//                       </div>
//                       {sweetAlertConfirmed && (
//                         <Modal
//                           show={sweetAlertConfirmed}
//                           size="lg"
//                           centered
//                           style={{ height: "100%" }}
//                           className="shadow-md shadow-black"
//                         >
//                           <div className="flex items-center justify-between mx-2 p-2">
//                             <div className="font-extrabold text-black">
//                               View Document
//                             </div>
//                             <div
//                               className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
//                               onClick={() => setSweetAlertConfirmed(false)}
//                             >
//                               x
//                             </div>
//                           </div>
//                           <Modal.Body>
//                             {/* <ImageVerification accountNumber={imageAccount} /> */}
//                             <DocumentViewing documentID={getToken} />
//                           </Modal.Body>
//                           {/* <Modal.Footer>
//             <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
//           </Modal.Footer> */}
//                         </Modal>
//                         // 1683042691
//                       )}
//                     </div>
//                   </div>

//                   <div style={{ flex: "0.3" }}>
//                     <ButtonType
//                       type={"checkbox"}
//                       label={"Check To Approve"}
//                       onChange={() => setIsChecked2(!isChecked2)}
//                     />

//                     <InnerCards
//                       innercarddiv={
//                         <div style={{ marginLeft: "2%" }}>
//                           <AccountSummary
//                             accountNumber={accountnumberEnter}
//                             setAccountDetails={setAccountDetails}
//                           />
//                         </div>
//                       }
//                     />
//                   </div>
//                 </div>
//               }
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CloseAccountApproval;

import React, { useState, useEffect } from "react";
import CustomTable from "../../../../../components/others/customtable";
import ScreenBase3 from "../../m/SreenBase3";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Cards from "../cards/Cards";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import InnerCards from "../cards/inner-cards";
import AccountSummary from "../../../../../components/others/AccountSummary";
import { API_SERVER } from "../../../../../config/constant";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import axios from "axios";
import swal from "sweetalert";
import { MDBIcon } from "mdbreact";
import { Modal } from "react-bootstrap";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import { Input } from "antd";

function CloseAccountApproval() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [messageData, setMessageData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
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
  const [showMyApprovalLimit, setMyApprovalLimit] = useState(true);
  const [showOk, setShowOk] = useState(false);
  const [clsdata, setclsdata] = useState(false);



  const [showInputField, setShowInputField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

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

  //this is the view for the main table
  // useEffect(() => {
  //   async function clsapproval() {
  //     try {
  //       let response = await axios.get(
  //         API_SERVER + "/api/get-closed-account-approval",
  //         { headers }
  //       ).then((response) => {
  //         setMessageData(response.data);
  //       }).catch((err) => console.log(`error is : ${err}`));

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   clsapproval();
  // }, []);

  var msgData = messageData?.map((i) => {
    return [
      <div>{i?.ACCOUNT_NUMBER}</div>,
      <div>{i?.ACCOUNT_DESC}</div>,
      <div>{i?.APP_STATUS}</div>,
      <div>{i?.POSTED_BY}</div>,
      <div>{i?.POSTED_DATE}</div>,
      <div>{i?.APP_FLAG}</div>,


      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked === true) {
              console.log(i, "weeeeeeeeeeeeeeeeeeeeeeeeeeee");
              setIsChecked(false);

              axios
                .post(
                  // this view is used to obtain the details of the row selected form the approval table
                  API_SERVER + "/api/get-closed-account",
                  {
                    accountNumber: i.ACCOUNT_NUMBER,
                  },
                  {
                    headers,
                  }
                )
                .then((response) => {
                  setclsdata(response.data[0]);
                  console.log(response.data, "i am a weasel");
                  console.log(clsdata);
                  // dormantAccountFeeRow();
                });


            }
          }}
        // id={i?.ACCT_LINK}
        // onClick={() => {
        //   // acTransLowerSectionCall();
        //   // swiftLowerSectionCall();
        // }}
        />
      </div>,
    ];

  })

  console.log(clsdata, "you we littt")
  console.log(messageData, "karen");
  return (
    <div>
      {isChecked ? (
        <div>


          {/* <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("closeModalBTN").click()}
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                  }*/}


          <ScreenBase3
            card_div1a={
              <div>

                <ActionButtons
                onExitClick={handleExitClick}
                displayFetch={"none"}
                displayNew={"none"}
                displayRefresh={"none"}
                 displayDelete={"none"}
                 displayAuthorise= {"none"}
                 displayView={"none"}
                 displayOk={"none"}
                 displayCancel={"none"}
                 displayReject={"none"}
                 displayHelp={"none"}


            


    
                
                />




                <div>


                  <CustomTable

                    headers={["Account Number", "Account Name", "Request ID", "Posted By", "Posted Date", "Approval Flag", ""]}

                    data={msgData}



                  />
                </div>

              </div>
            }
          />
        </div>
      ) : (
        <div>
          <div>


            {isChecked2 === true ? (
              <ActionButtons
                onAuthoriseClick={() => {

                }}
                displayFetch={"none"}
                displayNew={"none"}

                displayView={"none"}
                displayOk={"none"}
                displayCancel={"none"}
                onExitClick={() => setIsChecked(!isChecked)}






              />
            ) : (
              <div>

                <ActionButtons

                  displayFetch={"none"}
                  displayNew={"none"}
                  displayAuthorise={"none"}
                  displayView={"none"}
                  displayOk={"none"}
                  displayCancel={"none"}

                  onExitClick={() => setIsChecked(!isChecked)}




                />

                {console.log("faraway")}</div>
            )}









            <Cards
              div1={
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "0.7", marginRight: "10px" }}>
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
                          value={clsdata.acct_link}
                          onChange={(e) => {
                            setAccountNumber(e.target.value);
                          }}
                        // onKeyDown={clsedAccount}
                        />
                      </div>

                      <div style={{ flex: "0.15" }}>
                        <div>
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
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginBottom: "15px",
                        marginLeft: "2px",
                      }}
                    >
                      <div style={{ flex: "0.6" }}>
                        <InputField
                          label={"Transfer Type"}
                          labelWidth={"35.3%"}
                          inputWidth={"41.5%"}
                          disabled={true}
                          // onChange={(value) => {
                          //   handleSelectChange(value);
                          // }}
                          data={[
                            { label: "Cash", value: "C" },
                            { label: "Account", value: "A" },
                          ]}
                        />
                      </div>

                      <div style={{ flex: "0.4" }}>
                        {showInputField && (
                          <div>
                            <InputField
                              label={"Reference Number"}
                              labelWidth={"40%"}
                              inputWidth={"60%"}
                            />
                          </div>
                        )}
                      </div>
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
                              value={clsdata.account_descrp}
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
                              value={clsdata.curr_desc}
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
                              value={clsdata.description}
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
                              value={clsdata.branch_descrp}
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
                              value={clsdata.account_status
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
                                value={clsdata.date_opened}
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
                                value={clsdata.date_of_last_activity
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
                                value={clsdata.level_identifier}
                              />
                            </div>
                          </div>
                        }
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div style={{ flex: "0.45" }}>
                          <InputField
                            label={"Transfer Account Number"}
                            labelWidth={"45%"}
                            type={"number"}
                            inputWidth="50.5%"
                            disabled={transAcct ? true : false}
                            value={transAcct ? transAcct : accountnumber2}
                            // onKeyDown={Transfer_account_name}
                            onChange={(e) => {
                              setAccountNumber2(e.target.value);
                            }}
                          />
                        </div>
                        <div style={{ flex: "0.55" }}>
                          <InputField
                            label={"Account Name"}
                            labelWidth={"23%"}
                            inputWidth="77%"
                            disabled={true}
                            value={getdata2[0]?.account_descrp}
                          />
                        </div>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <InputField
                          label={"Closure Reason"}
                          labelWidth={"20.3%"}
                          required={true}
                          inputWidth="70%"
                          disabled={false}
                          onChange={(e) => {
                            setClosureReason(e.target.value);
                          }}
                        />
                      </div>

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
                              onClick={() => setSweetAlertConfirmed(false)}
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

                  <div style={{ flex: "0.3" }}>
                    <ButtonType
                      type={"checkbox"}
                      label={"Check To Approve"}
                      onChange={() => setIsChecked2(!isChecked2)}
                    />

                    <InnerCards
                      innercarddiv={
                        <div style={{ marginLeft: "2%" }}>
                          <AccountSummary
                            accountNumber={accountnumberEnter}
                            setAccountDetails={setAccountDetails}
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CloseAccountApproval;
