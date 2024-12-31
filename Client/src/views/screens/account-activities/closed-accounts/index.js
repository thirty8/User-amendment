import React, { useState, useEffect } from "react";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../components/others/AccountSummary";
import InputField from "../../../../components/others/Fields/InputField";
import SelectField from "../../../../components/others/Fields/SelectField";
import InnerCards from "./cards/inner-cards";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";

import { MDBIcon } from "mdbreact";
import { API_SERVER } from "../../../../config/constant";
import Cards from "./cards/Cards";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";

import swal from "sweetalert";
import axios from "axios";
import DocumentViewing from "../../../../components/others/DocumentViewing";
import { Modal } from "react-bootstrap";

function CloseAccount(){
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [accountnumber, setAccountNumber] = useState("");
  const [accountnumberEnter, setAccountNumberEnter] = useState("");
  const [accountname, setAccountName] = useState("");
  const [accountName2, setAccountName2] = useState("");
  const [getdata, setData] = useState({});
  const [messageData, setMessageData] = useState("");
  const [getdata2, setData2] = useState({});
  const [accountnumber2, setAccountNumber2] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [getToken, setToken] = useState("");
  const [transAcct, setTransAcct] = useState("");
  const [closureReason, setClosureReason] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [currency, setCurrency] = useState("");
  const [product, setProduct] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [dateOpened, setdateOpened] = useState("");
  const [dateOl, setdateOl] = useState("");
  const [level, setLevel] = useState("");
  const [reason, setReason] = useState([]);
  const [sreason, setSreason] = useState("");
  const [clsType, setclsType] = useState("");
  const [ip, setIP] = useState("");


  const [showInputField, setShowInputField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(localStorage.getItem("ipAddress"), "ippppppppppppppp");


  useEffect(() => {
    async function getipData() {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data);
      setIP(res.data.ip);

    
    };
  
    getipData();
  }, []);


  useEffect(() => {
    async function getReason() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        {
          code: "CLO",
        },
        {
          headers,
        }
      );
      setReason(response.data);
      console.log(response.data);
    }
    getReason();
  }, []);

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


//this is to get the proceedure behind the okay button
  async function clsacct(e) {
    console.log(accountnumber, "biggggg");

    if (
      // acct_link
      accountnumber === undefined) {
            swal({
              title: "Invalid Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            })
          } else {


    const response = await axios
      .post(
        "http://10.203.14.195:3320/api/clsacct",
        {
          acct_link: "004004300426330222",
          cls_type: "C",
          // CloseType,
          mandate: "T",
          // Mandate,
          document_no: "2023444656767",
          //  DocumentNo,
          transf_acct: "004004300426320231",
          // TransferAcc,
          currency_code:  "001",
          // accountDetails?.summary[0]?.currency
          // CurrencyCode,
          naration: sreason,
          // Narration,
          global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
          // GlobalBra,
          terminal: "552",
          // Terminal,
          username:  JSON.parse(localStorage.getItem("userInfo"))?.id,
          // Username,
          date:JSON.parse(localStorage.getItem("userInfo"))?.postingDate,
          //  date,
          frmcode: "SCLA",
          // FormCode,
          sess_id:  localStorage.getItem("ipAddress"),
          //  SessionID,
          machine_ip: localStorage.getItem("ipAddress"),
          global_prog: "TESTGLOB",
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log(response.data,JSON.parse(localStorage.getItem("userInfo"))?.postingDate, "here");
        setMessageData(response.data);

        if (!messageData.includes("INF - 06682")) {
          swal({
            title: "  Fail",
            text: messageData,
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Success",
            text: messageData,
            icon: "success",
            buttons: "OK",
            dangerMode: false,


          });
        }
      });
    }
  }
    console.log(accountDetails, "account deets")

//this is to get the details of the transfer account , specifically the name
  async function Transfer_account_name(e) {
    e.persist();
    if (e.key == "Enter") {
      // console.log(accountnumber2);
      axios
        .post(
          API_SERVER + "/api/get-closed-account",
          { accountNumber: e.target.value },
          { headers }
        )
        .then((response) => {
          console.log(response);

          let data = response.data[0];

          if (data === undefined) {
            swal({
              title: "Invalid Transfer Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            });
          } else {
            console.log(response.data);
            setAccountName2(response.data[0]?.account_descrp);
          }
        })
        .catch((err) => {
          console.log("hdh");
        });
    }
  }
  
  //ths function is responsible for the population of the values in the following disabled fields fields
  async function clsedAccount(e) {
    try {
      e.persist();

      if (e.key == "Enter") {
        // console.log( accountnumber,"biggggg")
        setAccountNumberEnter(e.target.value);
        axios
          .post(
            "http://10.203.14.195:3320/api/getBalance",
            {
              accountNumber: e.target.value,
            },
            { headers }
          )
          .then((response) => {
            let data = response.data[0];

            if (data === undefined) {
              swal({
                title: "Invalid Account Number",
                text: "The account number could not be found in our records..",
                icon: "warning",
                buttons: "OK",
                dangerMode: true,
              }).then((result) => {
                if (result) {
                  var input = document.getElementById("accountNumber");
                  input.focus();
                  setAccountName("");
                  setCurrency("");
                  setProduct("");
                  setBranch("");
                  setStatus("");
                  setdateOpened("");
                  setdateOl("");
                  setLevel("");
                }
              });
            } else {
              switchFocus(e, "transferType");
              const input = document.getElementById("transferType");
              input.focus();
              setAccountNumberEnter(e.target.value);

              let response = axios
                .post(
                  API_SERVER + "/api/get-closed-account",
                  {
                    accountNumber: accountnumber,
                  },
                  {
                    headers,
                  }
                )
                .then((response) => {
                  setData(response.data);
                  console.log(response.data, "justtttt");
                  console.log(getdata);
                });
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // clsedAccount()
  // }, [accountnumber]);
  // console.log(getdata)

  function DocumentViewModal() {
    // setSweetAlertConfirmed(true)
    if (getToken === "") {
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

  console.log({ accountDetails });
  const handleSelectChange = (value) => {
    setAccountNumber2("");
    setAccountName2("");
    setSelectedOption(value);
    if (value === "C") {
      setShowInputField(true);
      setclsType(value);
      axios
        .post(
          API_SERVER + "/api/clsacct",
          {
            choosenType: value,
            currency_code: accountDetails?.summary[0]?.currency ,
          },
          {
            headers,
          }
        )
        .then((response) => {
          
          setTransAcct(response.data);
          setAccountNumber2(response.data?.accountNumber)
          setAccountName2(response.data?.accountName)
          console.log(response.data, "justtghanattt");
          
          // console.log(getdata);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTransAcct("");
      setclsType(value);

      setShowInputField(false);
    }
  };

  const handleInputChange = (event) => {
    // Handle input change
  };

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  //   function clearData(accountnumber) {
  //     if (accountnumber === "") {
  //       value = 0;
  //     }
  //   }
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value.slice(0, 22);
    // remove any non-numeris characters
    const numericValue = inputValue?.replace(/\D/g, "");
    setAccountNumber(numericValue);
  };

  useEffect(() => {
    setAccountName(
      accountDetails.summary?.length > 0
        ? accountDetails?.summary[0]?.account_name
        : ""
    );
    setCurrency(
      accountDetails.summary?.length > 0
        ? accountDetails?.summary[0]?.currency
        : ""
    );
    setProduct(
      accountDetails.summary?.length > 0
        ? accountDetails?.summary[0]?.product
        : ""
    );
    setBranch(
      accountDetails.summary?.length > 0
        ? accountDetails?.summary[0]?.account_branch
        : ""
    );
    setStatus(
      accountDetails.summary?.length > 0
        ? accountDetails?.summary[0]?.account_status
        : ""
    );
    setdateOpened(getdata[0]?.date_opened);
    setdateOl(getdata[0]?.date_opened);
    setLevel(getdata[0]?.level_identifier);
  }, [accountDetails]);

  // Transfer_account_name()

  // console.log (getdata2)

  //   console.log(sreason);
console.log(accountnumber2);
console.log(clsType);
console.log(sreason);

  return (
    <div>
      <div>
        <ActionButtons
          onOkClick={clsacct}
          onExitClick={handleExitClick}
          onNewClick={() => {
          
                      console.log("the new button");
            setAccountNumber("");
            setToken("");
            setReason("");
            setSreason("");
            setData({
              account_descrp: "",
              date_opened: " ",
              date_of_last_activity: "",
              level_identifier: "",
            });
          }}
        />
      </div>

      {/* <HeaderComponent title={"Close Accounts"} /> */}

      <Cards
        div1={
          <div style={{ display: "flex" }}>
            <div style={{ flex: "0.7", marginRight: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label={"Account Number"}
                  id={"accountNumber"}
                  type={"number"}
                  labelWidth={"20%"}
                  required={true}
                  inputWidth="29.5%"
                  disabled={false}
                  value={accountnumber}
                  maxLength={22}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    handlePhoneNumberChange(e);
                  }}
                  onKeyDown={clsedAccount}
                  onKeyPress={(e) => {
          
        
                  switchFocus(e, "transferType");
                  }}
                />
              </div>

              {/* <div style={{ marginBottom: "15px", marginLeft: "10px" }}>
                


                </div> */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "15px",
                  marginLeft: "2px",
                }}
              >
                <div style={{ flex: "0.6" }}>
                  <SelectField
                    label={"Transfer Type"}
                    labelWidth={"33.1%"}
                    inputWidth={"50%"}
                    id={"transferType"}
                    onKeyPress={(e) => {
                      switchFocus(e, "TransferAcct");
                    }}
                    onChange={(value) => {
                      handleSelectChange(value);
                    }}
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
                        disabled={true}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label={"Account Name"}
                  labelWidth={"20%"}
                  required={false}
                  inputWidth="70%"
                  disabled={true}
                  // value={getdata[0]?.account_descrp}
                  value={accountname}
                  clearData
                />
              </div>

              {/* <InnerCards
                innercarddiv={
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label={"Account Name"}
                        labelWidth={"19.1%"}
                        required={false}
                        inputWidth="70%"
                        disabled={true}
                        // value={getdata[0]?.account_descrp}
                        value={accountname}
                        clearData
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label={"Currency"}
                        labelWidth={"20%"}
                        required={false}
                        inputWidth="20%"
                        disabled={true}
                        // value={getdata[0]?.curr_desc}
                        value={currency}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label={"Product"}
                        labelWidth={"20%"}
                        required={false}
                        inputWidth="30%"
                        disabled={true}
                        // value={getdata[0]?.description}
                        value={product}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label={"Branch"}
                        labelWidth={"20%"}
                        required={false}
                        inputWidth="70%"
                        disabled={true}
                        // value={getdata[0]?.branch_descrp}
                        value={branch}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label={"Account Status"}
                        labelWidth={"20%"}
                        required={false}
                        inputWidth="30%"
                        disabled={true}
                        // value={getdata[0]?.account_status}
                        value={status}
                      />
                    </div>
                  </div>
                }
              /> */}
              <div style={{ marginBottom: "15px", marginTop: "15px" }}>
                <InnerCards
                  innercarddiv={
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: "0.4" }}>
                        <InputField
                          label={"Date Opened "}
                          labelWidth={"47.8%"}
                          required={false}
                          inputWidth="45%"
                          disabled={true}
                          // type={"date"}
                          value={dateOpened}
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
                          value={dateOl}
                        />
                      </div>
                      <div style={{ flex: "0.2" }}>
                        <InputField
                          label={"Level"}
                          labelWidth={"40%"}
                          required={false}
                          inputWidth="60%"
                          disabled={true}
                          value={level}
                        />
                      </div>
                    </div>
                  }
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ flex: "0.45" }}>
                    <InputField
                      id={"TransferAcct"}
                      label={"Transfer Account Number"}
                      labelWidth={"42.6%"}
                      type={"number"}
                      inputWidth="50%"
                      disabled={transAcct ? true : false}
                      value={ accountnumber2}
                      onKeyDown={Transfer_account_name}
                      // onKeyPress={(e) => {
                      //   switchFocus(e, "Creason");
                      // }}
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
                      value={accountName2}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <ListOfValue
                    id={"Creason"}
                    label={" Reason"}
                    labelWidth={"19.4%"}
                    required={true}
                    inputWidth="60%"
                    disabled={false}
                    data={reason}
                    onChange={(value) => {
                      if (value === "999") {
                        setClosureReason(true);
                      } else {
                        setClosureReason(false);
                        setSreason(value);

                      }
                    }}
                    onKeyPress={(e) => {
                      switchFocus(e, "reason");
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <InputField
                    id={"reason"}
                    label={"Closure Reason"}
                    labelWidth={"19.4%"}
                    required={true}
                    inputWidth="75%"
                    disabled={closureReason ? false : true}
                    onKeyPress={(e) => {
                      switchFocus(e, "sourceDoc");
                    }}
                    onChange={(e) => {
                      if (closureReason === true) {
                        setSreason(e.target.value);
                      }
                    }}
                    // {}
                  />
                </div>

                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <div style={{ flex: "35%" }}>
                    <InputField
                      id={"sourceDoc"}
                      label={"Source Document"}
                      labelWidth={"40.8%"}
                      inputWidth={"52%"}
                      onChange={(e) => {
                        setToken(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ flex: "40%" }}>
                    <ButtonComponent
                      onClick={DocumentViewModal}
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
              <InnerCards
                innercarddiv={
                  <div style={{ marginLeft: "2%" }}>
                    <AccountSummary
                      accountNumber={accountnumberEnter}
                      setAccountDetails={setAccountDetails}
                    />
                    {/* <HeaderComponent title={"Balance"} />
                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Customer Status"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Accrued Interest"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        // inputWidth={"50%"}
                      />
                    </div> 

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Accrued OverDraft Amount "}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Commision on TurnOver"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Accrued Fees"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Current Balance"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Available  Balance"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <InputField
                        label={"Total Charges"}
                        disabled={"true"}
                        labelWidth={"45%"}
                        inputWidth={"50%"}
                      />
                    </div> */}
                  </div>
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default CloseAccount;



















































// oldddddddddddddddddddddd
// import React, { useState, useEffect } from "react";
// import ListOfValue from "../../../../components/others/Fields/ListOfValue";

// import AccountSummary from "../../../../components/others/AccountSummary";
// import InputField from "../../../../components/others/Fields/InputField";
// import SelectField from "../../../../components/others/Fields/SelectField";
// import InnerCards from "./cards/inner-cards";
// import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";

// import { MDBIcon } from "mdbreact";
// import { API_SERVER } from "../../../../config/constant";
// import Cards from "./cards/Cards";
// import ButtonComponent from "../../../../components/others/Button/ButtonComponent";

// import swal from "sweetalert";
// import axios from "axios";
// import DocumentViewing from "../../../../components/others/DocumentViewing";
// import { Modal } from "react-bootstrap";

// function CloseAccount() {
//   const headers = {
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );
//   const [accountnumber, setAccountNumber] = useState("");
//   const [accountnumberEnter, setAccountNumberEnter] = useState("");
//   const [accountname, setAccountName] = useState("");
//   const [accountName2, setAccountName2] = useState("");
//   const [getdata, setData] = useState({});
//   const [messageData, setMessageData] = useState("");
//   const [getdata2, setData2] = useState({});
//   const [accountnumber2, setAccountNumber2] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [getToken, setToken] = useState("");
//   const [transAcct, setTransAcct] = useState("");
//   const [closureReason, setClosureReason] = useState(false);
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [product, setProduct] = useState("");
//   const [branch, setBranch] = useState("");
//   const [status, setStatus] = useState("");
//   const [dateOpened, setdateOpened] = useState("");
//   const [dateOl, setdateOl] = useState("");
//   const [level, setLevel] = useState("");
//   const [reason, setReason] = useState([]);
//   const [sreason, setSreason] = useState("");
//   const [clsType, setclsType] = useState("");
//   const [ip, setIP] = useState("");
//   const [macAddress, setMacAddress] = useState("")



//   const [showInputField, setShowInputField] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");
//   console.log(localStorage.getItem("ipAddress"), "ippppppppppppppp");



//   useEffect(() => {
//     async function getipData() {
//       const res = await axios.get("https://api.ipify.org/?format=json");
//       console.log(res.data);
//       setIP(res.data.ip);

    
//     };
  
//     getipData();
//   }, []);

//   useEffect(() => {
//     async function getReason() {
//       let response = await axios.post(
//         API_SERVER + "/api/get-code-details",
//         {
//           code: "CLO",
//         },
//         {
//           headers,
//         }
//       );
//       setReason(response.data);
//       console.log(response.data);
//     }
//     getReason();
//   }, []);

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

//   async function clsacct(e) {
//     console.log(accountnumber, "biggggg");

//     // if (acct_link === undefined) {
//     //         swal({
//     //           title: "Invalid Account Number",
//     //           text: "The account number could not be found in our records..",
//     //           icon: "warning",
//     //           buttons: "OK",
//     //           dangerMode: true,
//     //         })
//     //       }

//     const response = await axios
//       .post(
//         "http://10.203.14.195:3320/api/clsacct",
//         {
//           acct_link: accountnumber,
//           cls_type: clsType,
//           // CloseType,
//           mandate: "T",
//           // Mandate,
//           document_no: getToken,
//           //  DocumentNo,
//           transf_acct: accountnumber2,
//           // TransferAcc,
//           currency_code:  accountDetails?.summary[0]?.currency,
//           // CurrencyCode,
//           naration:sreason,
//           // Narration,
//           global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branch_code,
//           // GlobalBra,
//           terminal: "552",
//           // Terminal,
//           username:  JSON.parse(localStorage.getItem("userInfo"))?.id,
//           // Username,
//           date:  JSON.parse(localStorage.getItem("userInfo"))?.postingDate,
//           //  date,
//           frmcode: "SCLA",
//           // FormCode,
//           sess_id: localStorage.getItem("ipAddress"),
//           //  SessionID,
//           machine_ip: localStorage.getItem("ipAddress"),
          
//           global_prog: "TESTGLOB",
//         },
//         {
//           headers,
//         }
//       )
//       .then(function (response) {
//         console.log(response.data, "here");
//         setMessageData(response.data);

//         if (!messageData.includes("INF - 06682")) {
//           swal({
//             title: "  Fail",
//             text: messageData,
//             icon: "warning",
//             buttons: "OK",
//             dangerMode: true,
//           });
//         } else {
//           swal({
//             title: "Success",
//             text: messageData,
//             icon: "success",
//             buttons: "OK",
//             dangerMode: false,
//           });
//         }
//       });
//   }
//   //   console.log(accountDetails, "account deets")

//   async function Transfer_account_name(e) {
//     e.persist();
//     if (e.key == "Enter") {
//       // console.log(accountnumber2);
//       axios
//         .post(
//           API_SERVER + "/api/get-closed-account",
//           { accountNumber: e.target.value },
//           { headers }
//         )
//         .then((response) => {
//           console.log(response);

//           let data = response.data[0];

//           if (data === undefined) {
//             swal({
//               title: "Invalid Transfer Account Number",
//               text: "The account number could not be found in our records..",
//               icon: "warning",
//               buttons: "OK",
//               dangerMode: true,
//             });
//           } else {
//             console.log(response.data);
//             setAccountName2(response.data[0]?.account_descrp);
//           }
//         })
//         .catch((err) => {
//           console.log("hdh");
//         });
//     }
//   }

//   async function clsedAccount(e) {
//     try {
//       e.persist();

//       if (e.key == "Enter") {
//         // console.log( accountnumber,"biggggg")
//         setAccountNumberEnter(e.target.value);
//         axios
//           .post(
//             "http://10.203.14.195:3320/api/getBalance",
//             {
//               accountNumber: e.target.value,
//             },
//             { headers }
//           )
//           .then((response) => {
//             let data = response.data[0];

//             if (data === undefined) {
//               swal({
//                 title: "Invalid Account Number",
//                 text: "The account number could not be found in our records..",
//                 icon: "warning",
//                 buttons: "OK",
//                 dangerMode: true,
//               }).then((result) => {
//                 if (result) {
//                   var input = document.getElementById("accountNumber");
//                   input.focus();
//                   setAccountName("");
//                   setCurrency("");
//                   setProduct("");
//                   setBranch("");
//                   setStatus("");
//                   setdateOpened("");
//                   setdateOl("");
//                   setLevel("");
//                 }
//               });
//             } else {
//               switchFocus(e, "transferType");
//               const input = document.getElementById("transferType");
//               input.focus();
//               setAccountNumberEnter(e.target.value);

//               let response = axios
//                 .post(
//                   API_SERVER + "/api/get-closed-account",
//                   {
//                     accountNumber: accountnumber,
//                   },
//                   {
//                     headers,
//                   }
//                 )
//                 .then((response) => {
//                   setData(response.data);
//                   console.log(response.data, "justtttt");
//                   console.log(getdata);
//                 });
//             }
//           });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // clsedAccount()
//   // }, [accountnumber]);
//   // console.log(getdata)

//   function DocumentViewModal() {
//     // setSweetAlertConfirmed(true)
//     if (getToken === "") {
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

//   console.log({ accountDetails });
//   const handleSelectChange = (value) => {
//     setAccountNumber2("");
//     setAccountName2("");
//     setSelectedOption(value);
//     if (value === "C") {
//       setShowInputField(true);
//       setclsType(value);
//       axios
//         .post(
//           API_SERVER + "/api/clsacct",
//           {
//             choosenType: value,
//             currency_code: accountDetails?.summary[0]?.currency,
//           },
//           {
//             headers,
//           }
//         )
//         .then((response) => {
          
//           setTransAcct(response.data);
//           setAccountNumber2(response.data?.accountNumber)
//           setAccountName2(response.data?.accountName)
//           // console.log(getdata);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       setclsType(value);
//       setTransAcct("");

//       setShowInputField(false);
//     }
//   };

//   const handleInputChange = (event) => {
//     // Handle input change
//   };

//   function switchFocus(e, nextFieldId) {
//     if (e.key === "Enter") {
//       document.getElementById(nextFieldId).focus();
//       console.log(document.getElementById(nextFieldId), "component");
//     }
//   }

//   //   function clearData(accountnumber) {
//   //     if (accountnumber === "") {
//   //       value = 0;
//   //     }
//   //   }
//   const handlePhoneNumberChange = (e) => {
//     const inputValue = e.target.value.slice(0, 22);
//     // remove any non-numeris characters
//     const numericValue = inputValue?.replace(/\D/g, "");
//     setAccountNumber(numericValue);
//   };

//   useEffect(() => {
//     setAccountName(
//       accountDetails.summary?.length > 0
//         ? accountDetails?.summary[0]?.account_name
//         : ""
//     );
//     setCurrency(
//       accountDetails.summary?.length > 0
//         ? accountDetails?.summary[0]?.currency
//       : ""
//     );
//     setProduct(
//       accountDetails.summary?.length > 0
//         ? accountDetails?.summary[0]?.product
//         : ""
//     );
//     setBranch(
//       accountDetails.summary?.length > 0
//         ? accountDetails?.summary[0]?.account_branch
//         : ""
//     );
//     setStatus(
//       accountDetails.summary?.length > 0
//         ? accountDetails?.summary[0]?.account_status
//         : ""
//     );
//     setdateOpened(getdata[0]?.date_opened);
//     setdateOl(getdata[0]?.date_opened);
//     setLevel(getdata[0]?.level_identifier);
//   }, [accountDetails]);

//   // Transfer_account_name()

//   // console.log (getdata2)

//   //   console.log(sreason);
// console.log(accountnumber2);
// console.log(clsType);
// console.log(sreason);
// console.log(ip);

//   return (
//     <div>
//       <div>
//         <ActionButtons
//           onOkClick={clsacct}
//           onExitClick={handleExitClick}
//           onNewClick={() => {
          
//                       console.log("the new button");
//             setAccountNumber("");
//             setToken("");
//             setReason("");
//             setSreason("");
//             setData({
//               account_descrp: "",
//               date_opened: " ",
//               date_of_last_activity: "",
//               level_identifier: "",
//             });
//           }}
//         />
//       </div>

//       {/* <HeaderComponent title={"Close Accounts"} /> */}

//       <Cards
//         div1={
//           <div style={{ display: "flex" }}>
//             <div style={{ flex: "0.7", marginRight: "10px" }}>
//               <div style={{ marginBottom: "15px" }}>
//                 <InputField
//                   label={"Account Number"}
//                   id={"accountNumber"}
//                   type={"number"}
//                   labelWidth={"20%"}
//                   required={true}
//                   inputWidth="29.5%"
//                   disabled={false}
//                   value={accountnumber}
//                   maxLength={22}
//                   onChange={(e) => {
//                     setAccountNumber(e.target.value);
//                     handlePhoneNumberChange(e);
//                   }}
//                   onKeyDown={clsedAccount}
//                   onKeyPress={(e) => {
          
        
//                   switchFocus(e, "transferType");
//                   }}
//                 />
//               </div>

//               {/* <div style={{ marginBottom: "15px", marginLeft: "10px" }}>
                


//                 </div> */}
//               <div
//                 style={{
//                   display: "flex",
//                   marginBottom: "15px",
//                   marginLeft: "2px",
//                 }}
//               >
//                 <div style={{ flex: "0.6" }}>
//                   <SelectField
//                     label={"Transfer Type"}
//                     labelWidth={"33.1%"}
//                     inputWidth={"50%"}
//                     id={"transferType"}
//                     onKeyPress={(e) => {
//                       switchFocus(e, "TransferAcct");
//                     }}
//                     onChange={(value) => {
//                       handleSelectChange(value);
//                     }}
//                     data={[
//                       { label: "Cash", value: "C" },
//                       { label: "Account", value: "A" },
//                     ]}
//                   />
//                 </div>

//                 <div style={{ flex: "0.4" }}>
//                   {showInputField && (
//                     <div>
//                       <InputField
//                         label={"Reference Number"}
//                         labelWidth={"40%"}
//                         inputWidth={"60%"}
//                         disabled={true}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <InputField
//                   label={"Account Name"}
//                   labelWidth={"20%"}
//                   required={false}
//                   inputWidth="70%"
//                   disabled={true}
//                   // value={getdata[0]?.account_descrp}
//                   value={accountname}
//                   clearData
//                 />
//               </div>

//               {/* <InnerCards
//                 innercarddiv={
//                   <div>
//                     <div style={{ marginBottom: "10px" }}>
//                       <InputField
//                         label={"Account Name"}
//                         labelWidth={"19.1%"}
//                         required={false}
//                         inputWidth="70%"
//                         disabled={true}
//                         // value={getdata[0]?.account_descrp}
//                         value={accountname}
//                         clearData
//                       />
//                     </div>

//                     <div style={{ marginBottom: "10px" }}>
//                       <InputField
//                         label={"Currency"}
//                         labelWidth={"20%"}
//                         required={false}
//                         inputWidth="20%"
//                         disabled={true}
//                         // value={getdata[0]?.curr_desc}
//                         value={currency}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "10px" }}>
//                       <InputField
//                         label={"Product"}
//                         labelWidth={"20%"}
//                         required={false}
//                         inputWidth="30%"
//                         disabled={true}
//                         // value={getdata[0]?.description}
//                         value={product}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "10px" }}>
//                       <InputField
//                         label={"Branch"}
//                         labelWidth={"20%"}
//                         required={false}
//                         inputWidth="70%"
//                         disabled={true}
//                         // value={getdata[0]?.branch_descrp}
//                         value={branch}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "10px" }}>
//                       <InputField
//                         label={"Account Status"}
//                         labelWidth={"20%"}
//                         required={false}
//                         inputWidth="30%"
//                         disabled={true}
//                         // value={getdata[0]?.account_status}
//                         value={status}
//                       />
//                     </div>
//                   </div>
//                 }
//               /> */}
//               <div style={{ marginBottom: "15px", marginTop: "15px" }}>
//                 <InnerCards
//                   innercarddiv={
//                     <div style={{ display: "flex" }}>
//                       <div style={{ flex: "0.4" }}>
//                         <InputField
//                           label={"Date Opened "}
//                           labelWidth={"47.8%"}
//                           required={false}
//                           inputWidth="45%"
//                           disabled={true}
//                           // type={"date"}
//                           value={dateOpened}
//                         />
//                       </div>
//                       <div style={{ flex: "0.4" }}>
//                         <InputField
//                           label={"Date Of Last Activity"}
//                           labelWidth={"45%"}
//                           required={false}
//                           inputWidth="50%"
//                           disabled={true}
//                           // type={"date"}
//                           value={dateOl}
//                         />
//                       </div>
//                       <div style={{ flex: "0.2" }}>
//                         <InputField
//                           label={"Level"}
//                           labelWidth={"40%"}
//                           required={false}
//                           inputWidth="60%"
//                           disabled={true}
//                           value={level}
//                         />
//                       </div>
//                     </div>
//                   }
//                 />
//               </div>
//               <div style={{ marginLeft: "10px" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     marginBottom: "15px",
//                     marginTop: "10px",
//                   }}
//                 >
//                   <div style={{ flex: "0.45" }}>
//                     <InputField
//                       id={"TransferAcct"}
//                       label={"Transfer Account Number"}
//                       labelWidth={"42.6%"}
//                       type={"number"}
//                       inputWidth="50%"
//                       disabled={transAcct ? true : false}
//                       value={ accountnumber2}
//                       onKeyDown={Transfer_account_name}
//                       // onKeyPress={(e) => {
//                       //   switchFocus(e, "Creason");
//                       // }}
//                       onChange={(e) => {
//                         setAccountNumber2(e.target.value);

//                       }}
//                     />
//                   </div>
//                   <div style={{ flex: "0.55" }}>
//                     <InputField
//                       label={"Account Name"}
//                       labelWidth={"23%"}
//                       inputWidth="77%"
//                       disabled={true}
//                       value={accountName2}
//                     />
//                   </div>
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <ListOfValue
//                     id={"Creason"}
//                     label={" Reason"}
//                     labelWidth={"19.4%"}
//                     required={true}
//                     inputWidth="60%"
//                     disabled={false}
//                     data={reason}
//                     onChange={(value) => {
//                       if (value === "999") {
//                         setClosureReason(true)
                      
//                       } else {
//                         setClosureReason(false);
//                         setSreason(value);
//                       }
//                     }}
//                     onKeyPress={(e) => {
//                       switchFocus(e, "reason");
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <InputField
//                     id={"reason"}
//                     label={"Closure Reason"}
//                     labelWidth={"19.4%"}
//                     required={true}
//                     inputWidth="75%"
//                     disabled={closureReason ? false : true}
//                     onKeyPress={(e) => {
//                       switchFocus(e, "sourceDoc");
//                     }}
//                     onChange={(e) => {
//                       if (closureReason == true) {
//                         setSreason(e.target.value);
//                       }
//                     }}
//                     // {}
//                   />
//                 </div>

//                 <div style={{ display: "flex", marginBottom: "15px" }}>
//                   <div style={{ flex: "35%" }}>
//                     <InputField
//                       id={"sourceDoc"}
//                       label={"Source Document"}
//                       labelWidth={"40.8%"}
//                       inputWidth={"52%"}
//                       onChange={(e) => {
//                         setToken(e.target.value);
//                       }}
//                     />
//                   </div>
//                   <div style={{ flex: "40%" }}>
//                     <ButtonComponent
//                       onClick={DocumentViewModal}
//                       label={"View Doc."}
//                       buttonHeight={"26px"}
//                       buttonColor={"white"}
//                       buttonBackgroundColor="rgb(21 163 183)"
//                       inputWidth={""}
//                     />
//                   </div>
//                 </div>
//                 {sweetAlertConfirmed && (
//                   <Modal
//                     show={sweetAlertConfirmed}
//                     size="lg"
//                     centered
//                     style={{ height: "100%" }}
//                     className="shadow-md shadow-black"
//                   >
//                     <div className="flex items-center justify-between mx-2 p-2">
//                       <div className="font-extrabold text-black">
//                         View Document
//                       </div>
//                       <div
//                         className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
//                         onClick={() => setSweetAlertConfirmed(false)}
//                       >
//                         x
//                       </div>
//                     </div>
//                     <Modal.Body>
//                       {/* <ImageVerification accountNumber={imageAccount} /> */}
//                       <DocumentViewing documentID={getToken} />
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//             <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
//           </Modal.Footer> */}
//                   </Modal>
//                   // 1683042691
//                 )}
//               </div>
//             </div>
//             <div style={{ flex: "0.3" }}>
//               <InnerCards
//                 innercarddiv={
//                   <div style={{ marginLeft: "2%" }}>
//                     <AccountSummary
//                       accountNumber={accountnumberEnter}
//                       setAccountDetails={setAccountDetails}
//                     />
//                     {/* <HeaderComponent title={"Balance"} />
//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Customer Status"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Accrued Interest"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         // inputWidth={"50%"}
//                       />
//                     </div> 

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Accrued OverDraft Amount "}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Commision on TurnOver"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Accrued Fees"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Current Balance"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Available  Balance"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div>
//                     <div style={{ marginBottom: "15px" }}>
//                       <InputField
//                         label={"Total Charges"}
//                         disabled={"true"}
//                         labelWidth={"45%"}
//                         inputWidth={"50%"}
//                       />
//                     </div> */}
//                   </div>
//                 }
//               />
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// }

// export default CloseAccount;
