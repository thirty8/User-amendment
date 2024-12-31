import React, { useState, useEffect, useMemo, useCallback } from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import { TbListSearch, TbUserSearch } from "react-icons/tb";
import InputField from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import { CiCircleList } from "react-icons/ci";
import CustomTable from "../components/data-table/CustomTable";
import ButtonComponent from "../components/button/ButtonComponent";
import { IoMdAddCircle } from "react-icons/io";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, ScrollArea } from "@mantine/core";
import CreditOrigination from "./lending-origin";
import LoanGeneralEnquiry from "../facility-enquiry/loan-general-enquiry";
import NewLoanGeneralEnquiry from "../facility-enquiry/new-loan-general-enquiry";
import ViewAllLoans from "../facility-enquiry/view-all-loans";
import { ConfigProvider, Drawer, Space } from "antd";
import Findby from "../components/search/Findby";
import { MdManageSearch } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";

const CreditOriginationNew = () => {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [pepStatus, setPepStatus] = useState();
  const [riskStatus, setRiskStatus] = useState();
  const [name, setName] = useState("");
  const [accountName, setAccountName] = useState([]);
  const [lovFacilityServiceAccount, setLovFacilityServiceAccount] = useState(
    []
  );
  const [facilityServiceAccount, setFacilityServiceAccount] = useState();
  const [facilityType, setFacilityType] = useState("16");
  const [lovFacilityType, setLovFacilityType] = useState([]);

  const [lovCustomerType, setLovCustomerType] = useState([]);
  const [customerType, setCustomerType] = useState("I");
  const [currencyCode, setCurrencyCode] = useState("");
  const [customer_Number, setCustomer_Number] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [curDesc, setCurDesc] = useState("");
  const [currency, setCurrency] = useState();
  const [acctType, setAcctType] = useState();
  const [dateOpened, setDateOpened] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [branch, setBranch] = useState();
  const [originationModal, setOriginationModal] = useState(false);
  const [loanDetailsModal, setLoanDetailsModal] = useState(false);
  const [viewLoansModal, setViewLoansModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [acctCheck, setAcctCheck] = useState(false);
  const [dat, setDat] = useState([]);
  const [facilityNo, setFacilityNo] = useState("");
  const [searchAccountNo, setSearchAccountNo] = useState("");
  const [member, setMember] = useState("");
  // const [facilityServiceAccount, setFacilityServiceAccount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [toggle, setToggle] = useState(false);

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        // cancelable: true,
        // view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  console.log({});

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // Pad the day with a leading zero if it's a single digit
    var day = inputDate.getDate();
    var paddedDay = day < 10 ? "0" + day : day;

    return (
      paddedDay +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const handleClear = () => {
    setAccountName("");
    setName("");
    setCustomerNumber("");
    setDateOpened("");
    setAcctType("");
    setBranch("");
    setAddress("");
    setEmail("");
    setMobile("");
    setDat([]);
  };

  const generateGrid = () => {
    setLoad(true);
    axios
      .post(
        API_SERVER + "/api/get-facilities-grid",
        {
          customer_no_v: customerNumber ? customerNumber : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          setLoad(false);
          let arr = [];
          res.data.map((i, index) => {
            arr.push([
              i.facility_no === "null" ? "" : i.facility_no,
              i.repayment_account === "null" ? "" : i.repayment_account,
              i.facility_type == "LN"
                ? "LOAN"
                : i.facility_type == "OD"
                ? "OVERDRAFT"
                : "",
              i.description === "null" ? "" : i.description,
              <div>{formatNumber(parseFloat(i.amount_granted))}</div>,
              i.interest_rate != "null"
                ? formatNumber(parseFloat(i.interest_rate))
                : "",
              i.interest_type,
              i.tenor,
              <div style={{ textAlign: "center" }}>
                {formatDate(i.effective_date)}
              </div>,
              <div style={{ textAlign: "center" }}>
                {formatDate(i.expiry_date)}
              </div>,
              <div
                onClick={() => {
                  setLoanDetailsModal(true);
                  setSelectedCustomer(i);
                }}
                className="bg-[#87d4d579] rounded py-1  w-[35px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-cyan-300 fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>,
            ]);
          });
          setDat(arr);
          console.log(arr, "arrrrrrrr");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/get-facility-service-account",
  //       {
  //         facilityType,
  //         customerType,
  //       },
  //       { headers }
  //     )
  //     .then((res) => {
  //       // console.log({ vvvzzzz: res.data });

  //       setLovFacilityServiceAccount(res.data);
  //     });
  // }, [facilityType, customerType]);

  // useEffect(() => {
  //   async function getCustomerType() {
  //     let response = await axios.post(
  //       API_SERVER + "/api/get-code-details",
  //       { code: "CTP" },
  //       {
  //         headers,
  //       }
  //     );
  //     // response = await response();
  //     //  console.log(response);
  //     setLovCustomerType(response.data);
  //   }

  //   async function getFacilityType() {
  //     let response = await axios.post(
  //       API_SERVER + "/api/get-code-details",
  //       { code: "FTP" },
  //       {
  //         headers,
  //       }
  //     );
  //     // response = await response();
  //     //  console.log(response);
  //     setLovFacilityType(response.data);
  //   }

  //   Promise.all([getFacilityType(), getCustomerType()]);

  //   // getFacilityServiceAccount();
  // }, []);

  const selected = (row) => {
    setMember(`${row?.customer_number} - ${row?.account_descrp}`);
    setSearchAccountNo(row?.acct_link);
    setCurDesc(row?.currency);
    setCurrency(row?.currency_code);
    console.log(row);
    searchAcct(row?.acct_link);
    setToggle(false);
  };

  // console.log(searchAccountNo, "searchhhhhhh");

  const searchAcct = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-facility-service-account-new",
        {
          acct_link: value,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log({ response });
        if (response.data.length <= 0) {
          Swal.fire({
            icon: "warning",
            title: `INF - Account Number does not Exist`,
          }).then((result) => {});
        } else {
          axios
            .post(
              API_SERVER + "/api/get-risk-status",
              {
                customerNumber: response.data[0]?.customer_number,
              },
              { headers }
            )
            .then((res) => {
              console.log(res, "riskkkkk");
              setPepStatus(res.data.pep_status);
              setRiskStatus(res.data.risk_status);
            });
          setDateOpened(
            response.data[0]?.date_opened
              ? formatDate(response.data[0]?.date_opened)
              : ""
          );
          setAcctType(response.data[0]?.description);
          setEmail(
            response.data[0]?.email != "null" ? response.data[0]?.email : ""
          );
          setBranch(response.data[0]?.branch ? response.data[0]?.branch : "");
          setAddress(
            response.data[0]?.address != "null" ? response.data[0]?.address : ""
          );
          setMobile(
            response.data[0]?.mobile != "null" ? response.data[0]?.mobile : ""
          );
          setCustomerNumber(
            response.data[0]?.customer_number != "null"
              ? response.data[0]?.customer_number
              : ""
          );
          setAccountName(
            response.data[0]?.account_descrp != "null"
              ? response.data[0]?.account_descrp
              : ""
          );
        }
      });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgContainer: "blue",
          },
        },
      }}
    >
      <div className="">
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayOk={"none"}
          displayRefresh={"none"}
          displayReject={"none"}
          displayView={"none"}
          onExitClick={handleExitClick}
          onNewClick={handleClear}
        />
        <br />
        <HeaderComponent title={"Search"} icon={<TbListSearch size={20} />} />
        <div
          className="mt-1"
          style={{
            padding: "10px",
            border: "2px solid #dfdce6",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          {/* <div style={{ marginTop: "-5px" }}>
          {name ? (
            <InputField
              label={"Member Account"}
              inputWidth={"30%"}
              value={name}
              required
              id={"memberIDInput"}
              onFocus={() => {
                setName("");
                setAccountName([]);
                setDat([]);
                setPepStatus("");
                setRiskStatus("");
                setDateOpened("");
                setEmail("");
                setMobile("");
                setAddress("");
                setBranch("");
                setAcctType("");
                setCustomerNumber("");
                setTimeout(() => {
                  document.getElementById("memberFocus")?.focus();
                }, 100);
              }}
            />
          ) : (
            <ListOfValue
              id={"memberFocus"}
              label={"Member"}
              inputWidth={"30%"}
              required
              value={name}
              lovdata={lovFacilityServiceAccount}
              onChange={(value) => {
                // console.log(
                //   lovFacilityServiceAccount
                //     .filter((i) => i.value === value)[0]
                //     .label.split("-")[1],
                //   "value"
                // );
                axios
                  .post(
                    API_SERVER + "/api/get-facility-service-account-new",
                    {
                      facilityType,
                      customerType,
                      cus: value?.split("-")[1],
                    },
                    {
                      headers: headers,
                    }
                  )
                  .then(function (response) {
                    setDateOpened(
                      response.data[0]?.date_opened
                        ? formatDate(response.data[0]?.date_opened)
                        : ""
                    );
                    setAcctType(response.data[0]?.description);
                    setEmail(
                      response.data[0]?.email != "null"
                        ? response.data[0]?.email
                        : ""
                    );
                    setBranch(
                      response.data[0]?.branch ? response.data[0]?.branch : ""
                    );
                    setAddress(
                      response.data[0]?.address != "null"
                        ? response.data[0]?.address
                        : ""
                    );
                    setMobile(
                      response.data[0]?.mobile != "null"
                        ? response.data[0]?.mobile
                        : ""
                    );
                  });

                setName(
                  lovFacilityServiceAccount
                    .filter((i) => i.value === value)[0]
                    ?.label.split("-")[0]
                );
                setFacilityServiceAccount(value);

                axios
                  .post(
                    API_SERVER + "/api/get-risk-status",
                    {
                      customerNumber: value?.split("-")[1],
                    },
                    { headers }
                  )
                  .then((res) => {
                    // console.log(res, "riskkkkk");
                    setPepStatus(res.data.pep_status);
                    setRiskStatus(res.data.risk_status);
                  });

                setAccountName(value?.split("-")[3]);
                setCurDesc(value?.split("-")[4]);
                setCurrency(value?.split("-")[2]);
                setCurrencyCode(value?.split("-")[2]);
                setCustomer_Number(value?.split("-")[1]);
                setCustomerNumber(value?.split("-")[1]);
                // setAcctType(value?.split("-")[7]);
                // setWithInt(true);
              }}
            />
          )}
        </div> */}
          <div className="flex">
            <div style={{ flex: 0.4 }}>
              <InputField
                label={"Member"}
                // type={"number"}
                value={member}
                onChange={(e) => {
                  setMember(e.target.value);
                  if (e.target.value == "") {
                    setCustomerNumber("");
                    setAcctType("");
                    setEmail("");
                    setMobile("");
                    setBranch("");
                    setDateOpened("");
                    setAddress("");
                    setAccountName("");
                    setPepStatus("");
                    setRiskStatus("");
                    setDat([]);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    searchAcct(e.target.value);
                  }
                }}
              />
            </div>
            <div className="pt-3 -ml-8">
              <ButtonComponent
                // label={"Search"}
                // buttonIcon={<TbUserSearch size={20} color="blue" />}
                buttonIcon={<RiUserSearchFill size={20} color="#013281" />}
                buttonWidth={"35px"}
                buttonHeight={"30px"}
                buttonBackgroundColor={"#d4e2ff"}
                onClick={() => {
                  setToggle(true);
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <HeaderComponent
          title={"Member Details"}
          icon={<CiCircleList size={20} />}
        />
        <div
          className="mt-1"
          style={{
            padding: "15px",
            border: "2px solid #dfdce6",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", flex: 0.4 }}>
              <div className="pr-2">
                <FaUserCircle size={70} color="gray" />
              </div>
              <div className="p-2">
                <div
                  className="font-bold text-gray-500 text-xl pl-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {accountName}
                </div>
                <div className="flex">
                  <div style={{ textAlign: "right", width: "150px" }}>
                    <span
                      className=" text-gray-500 pr-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Member No :
                    </span>
                  </div>
                  <span className="text-gray-500 font-bold">
                    {customerNumber}
                  </span>
                </div>
                <div className="flex">
                  <div style={{ textAlign: "right", width: "150px" }}>
                    <span
                      className=" text-gray-500 pr-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Account Type :
                    </span>
                  </div>
                  <span className="text-gray-500 font-bold">{acctType}</span>
                </div>
                <div className="flex">
                  <div style={{ textAlign: "right", width: "150px" }}>
                    <span
                      className=" text-gray-500 pr-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Date Opened :
                    </span>
                  </div>
                  <span className="text-gray-500 font-bold">{dateOpened}</span>
                </div>
              </div>
            </div>
            <div className="flex-[0.3] pt-1.5">
              <div className="flex">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Branch :
                  </span>
                </div>
                <span className="text-gray-500 font-bold">{branch}</span>
              </div>
              <div className="flex">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-red-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    PEP Status :
                  </span>
                </div>
                <span className="text-red-400 font-bold">{pepStatus}</span>
              </div>
              <div className="flex">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-red-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Risk Status :
                  </span>
                </div>
                <span className="text-red-400 font-bold">{riskStatus}</span>
              </div>
              <div className="flex w-[95%]">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Address :
                  </span>
                </div>
                <span className="text-gray-500 font-bold">{address}</span>
              </div>
            </div>
            <div className="flex-[0.3] pt-1.5">
              <div className="flex">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Email :
                  </span>
                </div>
                <span className="text-gray-500 font-bold">{email}</span>
              </div>
              <div className="pt-1 pb-2 flex justify-end">
                <ButtonComponent
                  label={"Send Email"}
                  buttonWidth={"120px"}
                  buttonHeight={"30px"}
                  buttonBackgroundColor={email ? "#292368" : "#ccc"}
                />
              </div>
              <div className="flex pt-2">
                <div style={{ textAlign: "right", width: "120px" }}>
                  <span
                    className=" text-gray-500 pr-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Phone :
                  </span>
                </div>
                <span className="text-gray-500 font-bold">{mobile}</span>
              </div>
              <div className="pt-1 pb-2 flex justify-end">
                <ButtonComponent
                  label={"Send SMS"}
                  buttonWidth={"110px"}
                  buttonHeight={"30px"}
                  buttonBackgroundColor={mobile ? "#292368" : "#ccc"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <div className="flex gap-3">
              <div>
                <ButtonComponent
                  label={"Add Facility"}
                  buttonIcon={<IoMdAddCircle size={20} />}
                  buttonWidth={"150px"}
                  buttonHeight={"33px"}
                  buttonBackgroundColor={"#45b38b"}
                  onClick={() => {
                    if (customerNumber) {
                      setAcctCheck(true);
                      setOriginationModal(true);
                    } else {
                      Swal.fire({
                        icon: "warning",
                        title: `INF - Select Member to Add Facility`,
                      }).then((result) => {});
                    }
                  }}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"View All Facilities"}
                  buttonWidth={"170px"}
                  buttonHeight={"33px"}
                  buttonBackgroundColor={customerNumber ? "#292368" : "#ccc"}
                  onClick={() => {
                    if (customerNumber) {
                      // setViewLoansModal(true);
                      generateGrid();
                    } else {
                      console.log("no customer number");
                    }
                  }}
                />
              </div>
            </div>
            <div>
              {/* <ButtonComponent
              label={"Create Loan"}
              buttonIcon={<IoMdAddCircle size={20} />}
              buttonWidth={"160px"}
              buttonHeight={"33px"}
              buttonBackgroundColor={"#0063d1"}
              // onClick={() => {
              //   setDisbursementDetailsModal(false);
              // }}
            /> */}
            </div>
          </div>
        </div>
        <br />
        <HeaderComponent
          title={"Facility Summary Grid"}
          icon={<CiCircleList size={20} />}
        />
        <div
          style={{ zoom: 0.88, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
        >
          <CustomTable
            rowsPerPage={4}
            theadBackground={"#3b82f6"}
            headers={[
              "Facility Number",
              "Repayment Account",
              "Facility Type",
              "Product Type",
              "Facility Amount",
              "Interest Rate",
              "Interest Type",
              "Tenor",
              "Effective Date",
              "Expiry Date",
              "",
            ]}
            data={dat}
            loading={{
              status: load,
              message: "GENERATING RECORDS ...",
            }}
            style={{
              columnAlignCenter: [9, 8, 10],
              columnAlignRight: [5, 6],
              headerAlignLeft: [1, 2, 3, 4, 7],
              headerAlignRight: [5, 6],
            }}
          />
        </div>
        <br />
        {/* <div className="flex justify-end">
        <ButtonComponent
          label={"Create Loan"}
          buttonIcon={<IoMdAddCircle size={20} />}
          buttonWidth={"160px"}
          buttonHeight={"33px"}
          buttonBackgroundColor={"#0063d1"}
          onClick={() => {
            setAcctCheck(false);
            setOriginationModal(true);
          }}
        />
      </div> */}
        {/* <Modal
        opened={originationModal}
        size={"95%"}
        padding={"10px"}
        withCloseButton={false}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => {
          setOriginationModal(false);
        }}
        style={{ backgroundColor: "red" }}
      >
        <HeaderComponent
          title={"CREDIT OVERDRAFT ORIGINATION"}
          backgroundColor={"#0063d1"}
          color={"white"}
        />
        <div style={{ zoom: 0.9 }}>
          <CreditOrigination
            setOriginationModal={setOriginationModal}
            acct={acctCheck ? name : null}
          />
        </div>
      </Modal> */}
        <Modal
          opened={loanDetailsModal}
          size={"80%"}
          padding={"10px"}
          withCloseButton={false}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
          onClose={() => {
            setLoanDetailsModal(false);
          }}
          style={{ backgroundColor: "red" }}
        >
          {/* <HeaderComponent
          title={"CREDIT OVERDRAFT ORIGINATION"}
          backgroundColor={"#0063d1"}
          color={"white"}
        /> */}
          <div style={{ zoom: 0.9 }}>
            <NewLoanGeneralEnquiry
              selectedCustomer={selectedCustomer}
              facilityDetails={selectedCustomer}
              closeModal={() => {
                setLoanDetailsModal(false);
              }}
            />
          </div>
        </Modal>
        <Modal
          opened={viewLoansModal}
          size={"60%"}
          padding={"10px"}
          withCloseButton={false}
          trapFocus={false}
          scrollAreaComponent={ScrollArea.Autosize}
          onClose={() => {
            setViewLoansModal(false);
          }}
        >
          {/* <HeaderComponent
          title={"CREDIT OVERDRAFT ORIGINATION"}
          backgroundColor={"#0063d1"}
          color={"white"}
        /> */}
          <div style={{ zoom: 0.9 }}>
            <ViewAllLoans
              customer_number={customerNumber}
              closeLoansModal={() => {
                setViewLoansModal(false);
              }}
            />
          </div>
        </Modal>
        <Drawer
          title={`LOAN / OVERDRAFT ORIGINATION`}
          placement="right"
          size={"large"}
          onClose={() => {
            setOriginationModal(false);
          }}
          open={originationModal}
          width={850}
          destroyOnClose={true}
          closable={false}
        >
          <div style={{}}>
            <CreditOrigination
              setOriginationModal={setOriginationModal}
              originationModal={originationModal}
              acct={acctCheck ? searchAccountNo : null}
              cusNo={acctCheck ? customerNumber : null}
              acctCheck={acctCheck}
              currencyDescription={curDesc}
              curCode={currency}
            />
            {/* 1 : {acctCheck} 2: {searchAccountNo} 3:{curDesc} 4:{currency} */}
          </div>
        </Drawer>
        <Findby
          showModal={toggle}
          facilityType={facilityType}
          customerType={customerType}
          setShowModal={setToggle}
          determinant={"all"}
          handleSelected={selected}
        />
      </div>
    </ConfigProvider>
  );
};

export default CreditOriginationNew;
