import React from "react";
import { useState, useEffect } from "react";
import ScreenBase2 from "../m/ScreenBase2";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../teller-ops/components/CustomTable";
// import CustomTable from "../../../../components/others/customtable";
import AccountSummary from "../../../../components/others/AccountSummary";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import axios from "axios";
import { MDBIcon } from "mdbreact";
import { API_SERVER } from "../../../../config/constant";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import swal from "sweetalert";
import DocumentViewing from "../../../../components/DocumentViewing";
import ButtonType from "../../../../components/others/Button/ButtonType";
import { Modal, Group } from "@mantine/core";
import qs from "qs";

function DormantAccountReactivation() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [reason, setReason] = useState([]);
  const [reason1, setReason1] = useState([]);

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [cashEnquiry, setCashEnquiry] = useState([]);
  const [refrNumber, setRefrNumber] = useState("");
  const [clsaccount, setClsAccount] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

  const [acct_link, setAcct_link] = useState("");
  const [batch_no, setBatch_no] = useState("");
  const [posted_by, setPosted_by] = useState("");
  const [cheq_no, setCheq_no] = useState("");
  const [terminal_id, setTerminal] = useState("");
  const [branch, setBranch] = useState("");
  const [messageData, setMessageData] = useState("");
  const [charge, setCharge] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [getdata, setData] = useState([]);
  const [closureReason, setClosureReason] = useState(false);
  const [sreason, setSreason] = useState("");
  const [charges, setCharges] = useState("");
  const [totalCharge, setTotalCharge] = useState("");
  const [accountNumberEnter, setAccountNumberEnter] = useState("");
  const [scandocID, setScanDocID] = useState("");
  const [okState, setOkState] = useState(false);

  const [accountname, setAccountName] = useState("");
  const [currency, setCurrency] = useState("");
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState("");
  const [dateOpened, setdateOpened] = useState("");
  const [dateOl, setdateOl] = useState("");
  const [level, setLevel] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [rowdata, setRowData] = useState([]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [rowdata1, setRowData1] = useState([]);

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

  async function dormantAccount(e) {
    try {
      e.persist();

      if (e.key == "Enter") {
        setAccountNumberEnter(e.target.value);
        axios
          .post(
            API_SERVER + "/api/get-dormant-account",
            {
              accountNumber: accountnumber,
            },
            {
              headers,
            }
          )
          .then((response) => {
            setData(response.data[0]);
            console.log(response.data, "justtttt");
            console.log(getdata);
            dormantAccountFeeRow();
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 004005110526560136
  // 004005110526580118
  // 004004110413260112
  // 004004110413270103
  //dormant fee row
  async function dormantAccountFeeRow() {
    try {
      // e.persist();

      let response = axios
        .get(
          API_SERVER + "/api/get-dormant-fee-row",

          {
            headers,
          }
        )
        .then((response) => {
          setRowData1(response.data);

          setRowData([
            [
              "CRSA",
              response.data[0]?.fee_account,
              response.data[0]?.account_name,
              response.data[0]?.fee_description,
              response.data[0]?.fee_charge,
              response.data[0]?.cur_desc,
            ],
          ]);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axios.get(API_SERVER + "/api/get-unique-ref", { headers }).then((res) => {
      setBatch_no(res.data[0]?.unique_ref);
      console.log(res, "res");
    });
  }, [okState]);

  useEffect(() => {
    async function getReason() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        {
          code: "DOR",
        },
        {
          headers,
        }
      );
      setReason(response.data);
      // console.log(response.data);
    }
    getReason();
  }, []);

  const makeApiRequest = () => {
    // Define your data payload
    const data = qs.stringify({
      dbAccount: accountnumber,
      trans_code_v: "CRSA",
      trans_amount: "1000",
      batch_no_v: batch_no,
      posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
      cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
      dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
      channel_v: "BRA",
      rate_v: "0",
      app_flag: "N",
      destiC: "A",
      // what does this mean ;
      //d
      form_code: "DARV",
    });

    // Define your Axios configuration
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3320/api/fee-transaction",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    // Make the Axios request
    axios
      .request(config)
      .then((response) => {  
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (Object.keys(accountDetails).length < 0) {
      setAccountNumberEnter("");
    }
  }, [accountDetails]);

  function performDormantRactiv() {
    let data = qs.stringify({
      accountv: accountnumber,
      branchv: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
      batchv: batch_no,
      docv: "95834",
      feeamt: "1000",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3320/api/prc_dormant_ractiv",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        swal({
          title:
            response.data.outBinds.msg_code === "0" ? "SUCCESS" : "WARNING",
          text: JSON.stringify(response.data.outBinds.msg_v),
          icon: response.data.outBinds.msg_code === "0" ? "success" : "warning",
          buttons: "OK",
        }).then((result) => {
          if (result) {
            setAccountNumber("");
            setAccountNumberEnter("");
            setScanDocID("");
            setSreason("");
            setReason1("");
            setData({
              account_descrp: "",
              date_opened: " ",
              date_of_last_activity: "",
              level_identifier: "",
            });
            setBatch_no("");
            setScanDocID("");
            setRowData("");
            setLevel("");
            setdateOl("");
            setdateOpened("");
            setReason1("");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick1() {
    if (scandocID === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  console.log(batch_no, "batchgg");
  return (
    <div>
      <ActionButtons
         displayAuthorise={"none"}
         displayCancel={"none"}
         displayDelete={"none"}
         displayFetch={"none"}
         displayHelp={"none"}
         displayRefresh={"none"}
         displayReject={"none"}
         displayView={"none"}
        onOkClick={() => {
          setOkState(!okState);
          performDormantRactiv();
          makeApiRequest();
          console.log(okState);
        }}
        onNewClick={() => {
          setAccountNumber("");
          setScanDocID("");
          setSreason("");
          setReason1("");
          setData({
            account_descrp: "",
            date_opened: " ",
            date_of_last_activity: "",
            level_identifier: "",
          });
        }}
        onExitClick={handleExitClick}
      />

      <ScreenBase2
        card_div1a={
          <div style={{ width: "100%", placeItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginTop: "3px",
                marginBottom: "15px",
              }}
            >
              <div style={{ width: "50%", flex: "0.4" }}>
                <InputField
                  style={{}}
                  label="Account Number "
                  labelWidth={"53%"}
                  inputWidth={"47%"}
                  value={accountnumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                  }}
                  onKeyDown={(e) => dormantAccount(e)}
                />
              </div>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <InputField
                label="Account Name"
                labelWidth={"20%"}
                required={false}
                type="textarea"
                inputWidth="50%"
                value={getdata?.account_descrp}
                disabled={true}
              />
            </div>

            <hr style={{ paddingRight: "5px" }} />
            <div
              style={{
                display: "flex",
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <div style={{ width: "50%", flex: "0.4" }}>
                <InputField
                  style={{}}
                  label="Date Opened : "
                  labelWidth={"50%"}
                  inputWidth={"45%"}
                  disabled={true}
                  value={getdata?.date_opened}
                />
              </div>

              <div style={{ width: "50%", flex: "0.4" }}>
                <InputField
                  disabled={true}
                  label="Date Of Last Activity: "
                  labelWidth={"43%"}
                  inputWidth={"45%"}
                  value={getdata?.date_of_last_activity}
                />
              </div>
              <br />

              <div style={{ width: "50%", flex: "0.2" }}>
                <InputField
                  label="Level Id: "
                  disabled={true}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  value={getdata?.level_identifier}
                />
              </div>
            </div>

            <hr />
            <div style={{ marginBottom: "15px", marginTop: "10px" }}>
              <ListOfValue
                id={"Creason"}
                label={" Reason"}
                labelWidth={"20%"}
                required={true}
                inputWidth="55%"
                disabled={false}
                data={reason}
                value={reason1}
                onChange={(value) => {
                  if (value === "999") {
                    setClosureReason(true);
                  } else {
                    setClosureReason(false);
                  }
                  setReason1(value);
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <InputField
                label="Other Reason: "
                labelWidth={"20%"}
                required={false}
                type="textarea"
                inputWidth="70%"
                id={"otherreason_id"}
                disabled={closureReason ? false : true}
                onChange={(e) => {
                  if (closureReason == true) {
                    setSreason(e.target.value);
                  }
                }}
                value={sreason}
              />
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ marginBottom: "15px", flex: "0.6" }}>
                <InputField
                  label="Document ID  : "
                  labelWidth={"33.5%"}
                  required={false}
                  inputWidth="60%"
                  value={scandocID}
                  onChange={(e) => {
                    setScanDocID(e.target.value);
                  }}
                />
              </div>
              <div style={{ flex: "0.3" }}>
                <ButtonComponent
                  label={"View Document"}
                  buttonBackgroundColor={"rgb(21 163 183)"}
                  buttonColor={"white"}
                  buttonHeight={"27px"}
                  onClick={handleClick1}
                />
              </div>
              {sweetAlertConfirmed && (
                <Modal
                  className="p-0 m-0"
                  opened={sweetAlertConfirmed}
                  size="75%"
                  padding={0}
                  withCloseButton={false}
                  transitionProps={"mounted"}
                  onClose={() => sweetAlertConfirmed(false)}
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
                  <DocumentViewing documentID={scandocID} />
                </Modal>
              )}
            </div>
          </div>
        }
        card_div2a={
          <AccountSummary
            accountNumber={accountNumberEnter}
            setAccountDetails={setAccountDetails}
          />
         
        }
        card_div3a={
          <div
            style={
              {
                
              }
            }
          >
            <div
            
            >
              <CustomTable
                headers={[
                  "Charge Code",
                  "Fee Account",
                  "Fee Account Description",
                  "Fees Description",
                  "Fees Amount Per Book",
                  "Currency",
                ]}
                data={rowdata}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default DormantAccountReactivation;












// olddddd
// import React from "react";
// import { useState, useEffect } from "react";
// import ScreenBase2 from "../m/ScreenBase2";
// import InputField from "../../../../components/others/Fields/InputField";
// import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
// // import CustomTable from "../../../screens/control-setups/components/CustomTable";
// import CustomTable from "../../../../components/others/customtable";
// import AccountSummary from "../../../../components/others/AccountSummary";
// import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import axios from "axios";
// import { MDBIcon } from "mdbreact";
// import { API_SERVER } from "../../../../config/constant";
// import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
// import swal from "sweetalert";
// import DocumentViewing from "../../../../components/DocumentViewing";
// import ButtonType from "../../../../components/others/Button/ButtonType";
// import { Modal, Group } from "@mantine/core";
// import qs from "qs";

// function DormantAccountReactivation() {
//   const headers = {
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   const [reason, setReason] = useState([]);
//   const [reason1, setReason1] = useState([]);

//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );
//   const [cashEnquiry, setCashEnquiry] = useState([]);
//   const [refrNumber, setRefrNumber] = useState("");
//   const [clsaccount, setClsAccount] = useState("");
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

//   const [acct_link, setAcct_link] = useState("");
//   const [batch_no, setBatch_no] = useState("");
//   const [posted_by, setPosted_by] = useState("");
//   const [cheq_no, setCheq_no] = useState("");
//   const [terminal_id, setTerminal] = useState("");
//   const [branch, setBranch] = useState("");
//   const [messageData, setMessageData] = useState("");
//   const [charge, setCharge] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [getdata, setData] = useState([]);
//   const [closureReason, setClosureReason] = useState(false);
//   const [sreason, setSreason] = useState("");
//   const [charges, setCharges] = useState("");
//   const [totalCharge, setTotalCharge] = useState("");
//   const [accountNumberEnter, setAccountNumberEnter] = useState("");
//   const [scandocID, setScanDocID] = useState("");
//   const [okState, setOkState] = useState(false);

//   const [accountname, setAccountName] = useState("");
//   const [currency, setCurrency] = useState("");
//   const [product, setProduct] = useState("");
//   const [status, setStatus] = useState("");
//   const [dateOpened, setdateOpened] = useState("");
//   const [dateOl, setdateOl] = useState("");
//   const [level, setLevel] = useState("");
//   const [accountnumber, setAccountNumber] = useState("");
//   const [rowdata, setRowData] = useState([]);
//   const [accountDetails, setAccountDetails] = useState([]);
//   const [rowdata1, setRowData1] = useState([]);

//   const handleExitClick = () => {
//     if (document.getElementById("exitBTN1")) {
//       const exitBTN = document.getElementById("exitBTN1");
//       const clickEvent = new MouseEvent("click", {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//       });
//       exitBTN.dispatchEvent(clickEvent);
//     }
//   };

//   async function dormantAccount(e) {
//     try {
//       e.persist();

//       if (e.key == "Enter") {
//         setAccountNumberEnter(e.target.value);
//         axios
//           .post(
//             API_SERVER + "/api/get-dormant-account",
//             {
//               accountNumber: accountnumber,
//             },
//             {
//               headers,
//             }
//           )
//           .then((response) => {
//             setData(response.data[0]);
//             console.log(response.data, "justtttt");
//             console.log(getdata);
//             dormantAccountFeeRow();
//           });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   // 004005110526560136
//   // 004005110526580118
//   // 004004110413260112
//   // 004004110413270103

//   //dormant fee row
//   async function dormantAccountFeeRow() {
//     try {
//       // e.persist();

//       let response = axios
//         .get(
//           API_SERVER + "/api/get-dormant-fee-row",

//           {
//             headers,
//           }
//         )
//         .then((response) => {
//           setRowData1(response.data);

//           setRowData([
//             [
//               "CRSA",
//               response.data[0]?.fee_account,
//               response.data[0]?.account_name,
//               response.data[0]?.fee_description,
//               response.data[0]?.fee_charge,
//               response.data[0]?.cur_desc,
//             ],
//           ]);
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     axios.get(API_SERVER + "/api/get-unique-ref", { headers }).then((res) => {
//       setBatch_no(res.data[0]?.unique_ref);
//       console.log(res, "res");
//     });
//   }, [okState]);

//   useEffect(() => {
//     async function getReason() {
//       let response = await axios.post(
//         API_SERVER + "/api/get-code-details",
//         {
//           code: "DOR",
//         },
//         {
//           headers,
//         }
//       );
//       setReason(response.data);
//       // console.log(response.data);
//     }
//     getReason();
//   }, []);

//   const makeApiRequest = () => {
//     // Define your data payload
//     const data = qs.stringify({
//       dbAccount: accountnumber,
//       trans_code_v: "CRSA",
//       trans_amount: "1000",
//       batch_no_v: batch_no,
//       posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
//       cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
//       dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
//       channel_v: "BRA",
//       rate_v: "0",
//       app_flag: "N",
//       destiC: "A",
//       form_code: "DARV",
//     });

//     // Define your Axios configuration
//     const config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:3320/api/fee-transaction",
//       headers: {
//         "x-api-key":
//           "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data: data,
//     };

//     // Make the Axios request
//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (Object.keys(accountDetails).length < 0) {
//       setAccountNumberEnter("");
//     }
//   }, [accountDetails]);

//   function performDormantRactiv() {
//     let data = qs.stringify({
//       accountv: accountnumber,
//       branchv: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
//       postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
//       batchv: batch_no,
//       docv: "95834",
//       feeamt: "1000",
//     });

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:3320/api/prc_dormant_ractiv",
//       headers: {
//         "x-api-key":
//           "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         swal({
//           title:
//             response.data.outBinds.msg_code === "0" ? "SUCCESS" : "WARNING",
//           text: JSON.stringify(response.data.outBinds.msg_v),
//           icon: response.data.outBinds.msg_code === "0" ? "success" : "warning",
//           buttons: "OK",
//         }).then((result) => {
//           if (result) {
//             setAccountNumber("");
//             setAccountNumberEnter("");
//             setScanDocID("");
//             setSreason("");
//             setReason1("");
//             setData({
//               account_descrp: "",
//               date_opened: " ",
//               date_of_last_activity: "",
//               level_identifier: "",
//             });
//             setBatch_no("");
//             setScanDocID("");
//             setRowData("");
//             setLevel("");
//             setdateOl("");
//             setdateOpened("");
//             setReason1("");
//           }
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function handleClick1() {
//     if (scandocID === "") {
//       swal({
//         title: "ERR - 01346",
//         text: "A Valid Document ID is required",
//         icon: "warning",
//         buttons: "OK",
//       }).then((result) => {
//         if (result) {
//         }
//       });
//     } else {
//       setSweetAlertConfirmed(true);
//     }
//   }

//   console.log(batch_no, "batchgg");
//   return (
//     <div>
//       <ActionButtons
//         onOkClick={() => {
//           setOkState(!okState);
//           performDormantRactiv();
//           makeApiRequest();
//           console.log(okState);
//         }}
//         onNewClick={() => {
//           setAccountNumber("");
//           setScanDocID("");
//           setSreason("");
//           setReason1("");
//           setData({
//             account_descrp: "",
//             date_opened: " ",
//             date_of_last_activity: "",
//             level_identifier: "",
//           });
//         }}
//         onExitClick={handleExitClick}
//       />

//       <ScreenBase2
//         card_div1a={
//           <div style={{ width: "100%", placeItems: "center" }}>
//             <div
//               style={{
//                 display: "flex",
//                 width: "100%",
//                 marginTop: "3px",
//                 marginBottom: "15px",
//               }}
//             >
//               <div style={{ width: "50%", flex: "0.4" }}>
//                 <InputField
//                   style={{}}
//                   label="Account Number "
//                   labelWidth={"53%"}
//                   inputWidth={"47%"}
//                   value={accountnumber}
//                   onChange={(e) => {
//                     setAccountNumber(e.target.value);
//                   }}
//                   onKeyDown={(e) => dormantAccount(e)}
//                 />
//               </div>
//             </div>
//             <div style={{ marginBottom: "15px" }}>
//               <InputField
//                 label="Account Name"
//                 labelWidth={"20%"}
//                 required={false}
//                 type="textarea"
//                 inputWidth="50%"
//                 value={getdata?.account_descrp}
//                 disabled={true}
//               />
//             </div>

//             <hr style={{ paddingRight: "5px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 width: "100%",
//                 marginBottom: "10px",
//                 marginTop: "10px",
//               }}
//             >
//               <div style={{ width: "50%", flex: "0.4" }}>
//                 <InputField
//                   style={{}}
//                   label="Date Opened : "
//                   labelWidth={"50%"}
//                   inputWidth={"45%"}
//                   disabled={true}
//                   value={getdata?.date_opened}
//                 />
//               </div>

//               <div style={{ width: "50%", flex: "0.4" }}>
//                 <InputField
//                   disabled={true}
//                   label="Date Of Last Activity: "
//                   labelWidth={"43%"}
//                   inputWidth={"45%"}
//                   value={getdata?.date_of_last_activity}
//                 />
//               </div>
//               <br />

//               <div style={{ width: "50%", flex: "0.2" }}>
//                 <InputField
//                   label="Level Id: "
//                   disabled={true}
//                   labelWidth={"40%"}
//                   inputWidth={"50%"}
//                   value={getdata?.level_identifier}
//                 />
//               </div>
//             </div>

//             <hr />
//             <div style={{ marginBottom: "15px", marginTop: "10px" }}>
//               <ListOfValue
//                 id={"Creason"}
//                 label={" Reason"}
//                 labelWidth={"20%"}
//                 required={true}
//                 inputWidth="55%"
//                 disabled={false}
//                 data={reason}
//                 value={reason1}
//                 onChange={(value) => {
//                   if (value === "999") {
//                     setClosureReason(true);
//                   } else {
//                     setClosureReason(false);
//                   }
//                   setReason1(value);
//                 }}
//               />
//             </div>
//             <div style={{ marginBottom: "15px" }}>
//               <InputField
//                 label="Other Reason: "
//                 labelWidth={"20%"}
//                 required={false}
//                 type="textarea"
//                 inputWidth="70%"
//                 id={"otherreason_id"}
//                 disabled={closureReason ? false : true}
//                 onChange={(e) => {
//                   if (closureReason == true) {
//                     setSreason(e.target.value);
//                   }
//                 }}
//                 value={sreason}
//               />
//             </div>

//             <div style={{ display: "flex" }}>
//               <div style={{ marginBottom: "15px", flex: "0.6" }}>
//                 <InputField
//                   label="Document ID  : "
//                   labelWidth={"33.5%"}
//                   required={false}
//                   inputWidth="60%"
//                   value={scandocID}
//                   onChange={(e) => {
//                     setScanDocID(e.target.value);
//                   }}
//                 />
//               </div>
//               <div style={{ flex: "0.3" }}>
//                 <ButtonComponent
//                   label={"View Document"}
//                   buttonBackgroundColor={"rgb(21 163 183)"}
//                   buttonColor={"white"}
//                   buttonHeight={"27px"}
//                   onClick={handleClick1}
//                 />
//               </div>
//               {sweetAlertConfirmed && (
//                 <Modal
//                   className="p-0 m-0"
//                   opened={sweetAlertConfirmed}
//                   size="75%"
//                   padding={0}
//                   withCloseButton={false}
//                   transitionProps={"mounted"}
//                   onClose={() => sweetAlertConfirmed(false)}
//                 >
//                   <div className="flex items-center justify-between mx-2 p-2">
//                     <div className="font-extrabold text-black">
//                       View Document
//                     </div>
//                     <div
//                       className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
//                       onClick={() => setSweetAlertConfirmed(false)}
//                     >
//                       x
//                     </div>
//                   </div>
//                   <DocumentViewing documentID={scandocID} />
//                 </Modal>
//               )}
//             </div>
//           </div>
//         }
//         card_div2a={
//           <AccountSummary
//             accountNumber={accountNumberEnter}
//             setAccountDetails={setAccountDetails}
//           />
//           // <div style={{ marginLeft: "2%" }}>
//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Customer Status"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Accrued Interest"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Accrued OverDraft Amount "}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Commision on TurnOver"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Accrued Fees"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Current Balance"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>

//           //   <div style={{ marginBottom: "15px" }}>
//           //     <InputField
//           //       label={"Net Balance"}
//           //       disabled={"true"}
//           //       labelWidth={"45%"}
//           //       inputWidth={"50%"}
//           //     />
//           //   </div>
//           // </div>
//         }
//         card_div3a={
//           <div
//             style={
//               {
//                 // display: "flex",
//                 // justifyContent: "center",
//                 // alignItems: "center",
//                 // height: "100%",
//               }
//             }
//           >
//             <div
//             // style=
//             // {{ textAlign: "center" }}
//             >
//               <CustomTable
//                 headers={[
//                   "Charge Code",
//                   "Fee Account",
//                   "Fee Account Description",
//                   "Fees Description",
//                   "Fees Amount Per Book",
//                   "Currency",
//                 ]}
//                 data={rowdata}
//               />
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// }

// export default DormantAccountReactivation;
