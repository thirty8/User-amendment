import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "@mantine/core";
import swal from "sweetalert";
import { BiSearchAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import {Modal} from "@mantine/core";

import { API_SERVER } from "../../../../../../../config/constant";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../../../components/others/customtable";
import InputField from "../../../../../../../components/others/Fields/InputField";

// import AccountDetails from "./customer-search-modals/account-details";
import CustomerOtherDetails from "../../account-list-enquiry-modals/customer-other-details";
import AccountBalanceEnquiry from "../../account-balance-enquiry";
import CustomerSearchByName from "../../customer-search-by-name";

function MemberSearchByNumber({ headerImage, memberID, Dataa }) {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCategory, setCustomerCategory] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [ARM, setARM] = useState("");

  //CASA
  const [data, setData] = useState([]);
  const [loanData, setLoanData] = useState([]);
 
  const [investmentData, setInvestmentData] = useState([]);
  const [tradeData, setTradeData] = useState([]);
  const [govData, setGovData] = useState([]);
  const [uniqueTuple, setUniqueTuple] = useState([]);

  const [searchByName,setSearchByName]= useState(false);

  const openSearchByName = () => {
    setSearchByName(true);
  }

  const closeSearchByName = () => {
    setSearchByName(false);
  }

  const [accountNumber, setAccountNumber] = useState("");
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  // const [loanAccountNumber,setLoanAccountNumber] = useState("");
  const [currency, setCurrency] = useState("");
  let bigresults = [];

  const [results,setResults] = useState([]);
  let yo = [];
  const [loanResponse,setLoanResponse] = useState([]);
  let loanResults = [];
  const [investmentResponse,setInvestmentResponse] = useState([]);
  let investmentResults = [];
  const [tradeResponse,setTradeResponse] = useState([]);
  let tradeResults = [];
  const [govResponse,setGovResponse] = useState([]);
  let govResults = [];
  let resultss = [];

  const [state, setState] = useState({});
  const [balanceEnquiry, setBalanceEnquiry] = useState(false);
  const openBalanceEnquiry = () => {
    setBalanceEnquiry(true);
  };
  const closeBalanceEnquiry = () => {
    setBalanceEnquiry(false);
  };

  let details = [];
  const [otherDetails, setOtherDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const runOtherDetails = () => {
      console.log(accountNumber, "dikdmkod");
      axios
        .post(
          API_SERVER + "/getOtherDetails",
          {
            customerNumber: memberID,
          },
          { headers }
        )
        .then((response) => {
          let results = response?.data;
          results.map((i) => {
            details.push([
              i.relation_no,
              i.relation_name,
              i.building_name,
              i.street_name,
              i.location,
              null,
            ]);
          });
          setOtherDetails(details);
        });
    };
    runOtherDetails();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );




  console.log(loanData,"loan Data")

  const clearFields = () => {
    setState((prevState) => ({
      ...prevState,
      customerName: "",
      customerType: "",
      customerCategory: "",
      address1: "",
      address2: "",
    }));
    setData([]);
    setLoanData([]);
    setInvestmentData([]);
    setTradeData([]);
    setGovData([]);
  };

  useEffect(() => {
    if (customerNumber !== 6) {
      clearFields();
    }
  }, [customerNumber]);

  useEffect(() => {
    if(memberID.length === 6 ){
    axios
    .post(
      API_SERVER + "/api/getByCustomerNumber",
      {
        customerNumber: memberID,
      },
      { headers }
    )
    .then((response) => {
      let res = response.data.response
      setResults(response.data.response);
      setLoanResponse(response.data.loanResponse);
      setInvestmentResponse(response.data.investmentResponse);
      setTradeResponse(response.data.tradeResponse);
      setGovResponse(response.data.govResponse);
      const codeDescriptions = response.data.response2[0];

      setState((prevState) => ({
        ...prevState,
        customerName: res[0]?.customer_name,
        address1: res[0]?.ph_address2,
        address2: res[0]?.ph_address3,
        customerType: codeDescriptions?.customertypedescription,
        customerCategory: codeDescriptions?.customercategorydescription,

      }));
      setAccountNumber(res[0]?.acct_link);
})
    .catch((error) => {
      throw(error)
    });
  }}, [memberID]);

  //CASA
  results.map((i, key) => {
    yo.push([
      i.acct_link,
      i.account_descrp,
      i.product,
      i.currency,
      <div style={{ textAlign: "right" }}>{i.cleared_balance}</div>,
      <div style={{ textAlign: "right" }}>{i.local_equivalent}</div>,
      <ButtonComponent
        onClick={() => {
          setUniqueTuple({ accountNumber: results[key].acct_link });
          openBalanceEnquiry();
        }}
        buttonIcon={<FiChevronRight />}
      ></ButtonComponent>,
    ]);
  });

  //LOAN
   loanResponse.map((i, key) => {
        loanResults.push([
          i.acct_link,
          i.account_descrp,
          i.description,
          i.curr_iso_code,
          <div style={{ textAlign: "right" }}>{i.shadow_balance_today}</div>,
          i.facility_no,
          <ButtonComponent
            onClick={() => {
              setUniqueTuple({ accountNumber: loanResponse[key].acct_link });
              openBalanceEnquiry();
            }}
            buttonIcon={<FiChevronRight />}
          ></ButtonComponent>,
        ]);
      });

    //INVESTMENT  
      investmentResponse.map((i, key) => {
        investmentResults.push([
          i.account_number,
          i.account_description,
          i.product,
          i.currency,
          i.balance,
          i.deal_number,
          <ButtonComponent
            onClick={() => {
              setUniqueTuple({
                accountNumber: investmentResponse[key].account_number,
              });
              openBalanceEnquiry();
            }}
            buttonIcon={<FiChevronRight />}
          ></ButtonComponent>,
        ]);
      });

       //TRADE  
      tradeResponse.map((i, key) => {
        tradeResults.push([
          i.cust_name,
          i.description,
          i.expiry_date,
          i.currency,
          i.deal_number,
          i.contingent_amt,
          <ButtonComponent
            onClick={() => {
              setUniqueTuple({ accountNumber: tradeResponse[key].cust_name });
              openBalanceEnquiry();
            }}
            buttonIcon={<FiChevronRight />}
          ></ButtonComponent>,
        ]);
      });
      // setTradeData(tradeResults);

      //GOVERNMENT
      govResponse.map((i, key) => {
        govResults.push([
          i.invest_id,
          i.product,
          i.face_value,
          i.cost_price,
          i.unearn_discount,
          i.amortised,
          i.unamortised,
          i.effective_date,
          i.maturity_date,
          i.tenor_remain,
          <ButtonComponent
            onClick={() => {
              setUniqueTuple({ accountNumber: govResponse[key].invest_id });
              openBalanceEnquiry();
            }}
            buttonIcon={<FiChevronRight />}
          ></ButtonComponent>,
        ]);
      });

      console.log(results,"aeee")

  return (
    <div style={{ zoom: 0.95}}>
      <div
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 0.05 }}></div>
          <div style={{ flex: 0.9 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                columnGap: "70px",
                rowGap: "10px",
                paddingTop: "15px",
                paddingBottom: "10px",
              }}
            >
                <InputField
                  label={"Member Name"}
                  labelWidth={"25%"}
                  inputWidth={"55%"}
                  disabled
                  value={state.customerName}
                />
              <InputField
                label={"Member Type"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled
                value={state.customerType}
              />
              <InputField
                label={"Member Category"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                disabled
                value={state.customerCategory}
              />
              <InputField
                label={"Address 1"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled
                value={state.address1}
              />
              <InputField
                label={"ARM"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                disabled
                value={state.ARM}
              />
              <InputField
                label={"Address 2"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled
                value={state.address2}
              />
              <div></div>
              <div style={{ paddingLeft:"76%"}}>
                <ButtonComponent
                  label={"Other Details"}
                  buttonWidth={"120px"}
                  buttonHeight={"27px"}
                  onClick={handleOpen}
                  buttonColor={"white"}
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div style={{ zoom: 0.95}}>
        <DataTable
          rowsPerPage={5}
          data={yo}
          // title={"CURRENT/ SAVING ACCOUNT (CASA) LISTING"}
          headers={[
            "Account No.",
            "Account Description",
            "Product",
            "Currency",
            "Cleared Balance",
            "Local Equivalent",
            " ",
          ]}
        />
      </div>
      <br></br>
      <br></br>
      <Tabs defaultValue="gallery" variant="pills">
        <Tabs.List>
          <Tabs.Tab value="gallery">LOANS</Tabs.Tab>
          <Tabs.Tab value="messages">INVESTMENTS</Tabs.Tab>
          <Tabs.Tab value="laterr">TRADE FINANCE</Tabs.Tab>
          <Tabs.Tab value="former">GOVERNMENT SECURITIES</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="gallery" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              data={loanResults}
              rowsPerPage={3}
              headers={[
                "Account Number",
                "Account Description",
                "Product",
                "CCY",
                "Principal Balance",
                "Facility Number",
                " ",
              ]}
            />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="messages" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              rowsPerPage={3}
              data={investmentResults}
              headers={[
                "Account Number",
                "Account Description",
                "Product",
                "CCY",
                "Investment Balance",
                "Deal Number",
                " ",
              ]}
            />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="laterr" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              rowsPerPage={3}
              data={tradeResults}
              headers={[
                "Contact Ref Number",
                "Cust Name",
                "Product",
                "Expiry Date",
                "CCY",
                "Contract Amount",
                "O/S Contingent Amount",
                " ",
              ]}
            />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="former" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              rowsPerPage={3}
              data={govResults}
              headers={[
                "Investment ID",
                "Product",
                "Face Value",
                "Cost Price",
                "Unearned Discount",
                "Amortised",
                "Unamortised",
                "Effective Date",
                "Maturity Date",
                "Tenor Left",
                " ",
              ]}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
      <Modal
        opened={open}
        size="80%"
        onClose={handleClose}
        title={"Customer Other Details"}
      >
        <CustomerOtherDetails otherDetails={otherDetails} />
      </Modal>
      <Modal size="90%" opened={searchByName} withCloseButton={false}>
      <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#48c1d8",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Search By Name
          </div>

          <svg
            onClick={closeSearchByName}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 ">
        <CustomerSearchByName/>
 </div>
        </div>
      </div>
      </Modal>
      <Modal  size="100%"  opened={balanceEnquiry} withCloseButton={false}>
        <div
            className="text-gray-700"
            style={{
              marginBottom: "-30px",
              marginLeft: "-17px",
              marginRight: "-16px",
              marginTop: "-20px",
              overflowY: "none",
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "#0369A1",
                }}
                className="w-full shadow"
              >
                <div className=" flex justify-between py-[6px] px-2 items-center ">
                  <div
                    style={{ fontSize: "14px" }}
                    className="text-white font-semibold"
                  >
                  Account Balance Enquiry
                  </div>
  
                  <svg
                    onClick={closeBalanceEnquiry}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    // style={{ padding: "10px" }}
                    viewBox="0 0 24 24"
                    // strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-b ">
              <div
                className="bg-white shadow rounded px-0 pt-1 pb-8 "
                style={{ marginBottom: "-25px" }}
              >
              <AccountBalanceEnquiry state={uniqueTuple} />
              </div>
            </div>
          </div>
         
        </Modal>
    </div>
  );
}

export default MemberSearchByNumber;
