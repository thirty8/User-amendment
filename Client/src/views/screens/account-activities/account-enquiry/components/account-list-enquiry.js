import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
// import { AiOutlineEye size={20}} from "react-icons/fi";
import { AiOutlineEye} from "react-icons/ai";
import { GiClick } from "react-icons/gi";


import { API_SERVER } from "../../../../../config/constant";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/customtable";
import InputField from "../../../../../components/others/Fields/InputField";
import { Modal, Group, Button } from "@mantine/core";

// import AccountDetails from "./customer-search-modals/account-details";
import CustomerOtherDetails from "./account-list-enquiry-modals/customer-other-details";
import AccountBalanceEnquiry from "./account-balance-enquiry";
import swal from "sweetalert";
import CustomerSearchByName from "./customer-search-by-name";
import Header from "../../../../../components/others/Header/Header";

import "../../account-enquiry/customer-search.css";
import CustomerSearchByNameModal from "./customer-search-modals/customerSearch-search-modal";

function AccountListEnquiry({ headerImage, customerID, Dataa,matrix}) {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCategory, setCustomerCategory] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [ARM, setARM] = useState("");
  const [showMemberDetails, setShowMemberDetails] = useState(false);

  const [rowFromCustomerSearchByName, setRowFromCustomerSearchByName] = useState('')

  const [searchByName,setSearchByName]= useState(false);

  console.log(rowFromCustomerSearchByName, "i am in account list enquir")

  //CASA
  const [data, setData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [tradeData, setTradeData] = useState([]);
  const [govData, setGovData] = useState([]);
  const [uniqueTuple, setUniqueTuple] = useState([]);
  const [memberDataStat,setMemberDataStats] = useState("");

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
  let yo = [];
  let bigresults = [];
  let results = [];
  let resultss = [];
  let loanResults = [];
  let loanResponse = [];
  let investmentResults = [];
  let investmentResponse = [];
  let tradeResults = [];
  let tradeResponse = [];
  let govResults = [];
  let govResponse = [];

  let guarantors = [];
  const [state, setState] = useState({});
  const [guaranteedLoans, setGuaranteedLoans] = useState([]);
  const [balanceEnquiry, setBalanceEnquiry] = useState(false);
  const openBalanceEnquiry = () => {
    setBalanceEnquiry(true);
  };
  const closeBalanceEnquiry = () => {
    setBalanceEnquiry(false);
  };

  const [tab1, setTab1] = useState("gallery");
  const handleTabChange = (newValue) => {
    setTab1(newValue);
  };


  function formattedNumber(num) {
    if (num === undefined || num === " " || num === "" || isNaN(num) || num === "0.00" || num === ".00") {
      return "1.00";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf('.');
  
      if (decimalIndex === -1  ) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

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
            customerNumber: customerNumber,
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
              i.contact,
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


const handleGo = () =>{
  handleInput(customerNumber)
}

  const handleInput = (value) => {
console.log(value,"value")
    axios
      .post(
        API_SERVER + "/api/getByCustomerNumber",
        {
          customerNumber: value,
        },
        { headers }
      )
      .then((response) => {
        setMemberDataStats(response.data.memberResponse[0]?.status)
        results = response.data.response;
        loanResponse = response.data.loanResponse;
        investmentResponse = response.data.investmentResponse;
        tradeResponse = response.data.tradeResponse;
        govResponse = response.data.govResponse;
        const codeDescriptions = response.data.response2[0];
        setShowMemberDetails(true)

        results.map((i, key) => {
          yo.push([
            i.acct_link,
            <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            <div style={{textAlign:"left"}}>{i.product}</div>,
            i.currency,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.cleared_balance)}</div>,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.local_equivalent)}</div>,
            <div style={{display:"flex",justifyContent:"center"}}>
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({accountNumber:i?.acct_link});
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>
            </div>,
          ]);
        });
        setData(yo);

        setState((prevState) => ({
          ...prevState,
          customerName: results[0]?.customer_name,
          customerType: codeDescriptions?.customertypedescription,
          customerCategory: codeDescriptions?.customercategorydescription,
          address1: results[0]?.ph_address2,
          address2: results[0]?.ph_address3,
          armCode:codeDescriptions?.arm_name,
        }));
        setAccountNumber(results[0].acct_link);

        loanResponse.map((i, key) => {
          loanResults.push([
            i.acct_link,
            <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            i.description,
            i.curr_iso_code,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.shadow_balance_today)}</div>,
            i.facility_no,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: loanResponse[key].acct_link });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setLoanData(loanResults);

        investmentResponse.map((i, key) => {
          investmentResults.push([
            i.account_number,
            <div style={{textAlign:"left"}}>{i.account_description}</div>,
            i.product,
            i.currency,
            <div style={{ textAlign: "right" }}>{formattedNumber( i.balance)}</div>,
            i.deal_number,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({
                  accountNumber: investmentResponse[key].account_number,
                });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setInvestmentData(investmentResults);

        tradeResponse.map((i, key) => {
          tradeResults.push([
            i.cust_name,
            <div style={{textAlign:"left"}}>{i.description}</div>,
            i.expiry_date,
            i.currency,
            i.deal_number,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.contingent_amt)}</div>,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: tradeResponse[key].cust_name });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setTradeData(tradeResults);

        govResponse.map((i, key) => {
          govResults.push([
            i.invest_id,
            <div style={{textAlign:"left"}}>{i.product}</div>,
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
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setGovData(govResults);

        axios
        .post(
          API_SERVER + "/api/get-guarantor-info",
          {
            member_id: customerNumber,
          },
          { headers }
        ).then((response)=>{
          results = response.data;
          results.map((i,key)=>{
            guarantors.push([i.account_no,<div style={{textAlign:"left"}}>{i.member_name}</div>,i.no_of_guaranty,i.tin,i.mobile,i.address,<div style={{textAlign:"right"}}>{formattedNumber(i.saving_av_bal)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.guaranted_amount)}</div>,<div style={{textAlign:"right"}}>{formattedNumber(i.av_amount_grant)}</div>,<ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: results[key].account_no });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>])
            setGuaranteedLoans(guarantors)
          })
        })

      }).catch((error) => {
        swal({
          title: "Invalid Member Number",
          text: "The member number could not be found in our records..",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((response)=>{setShowMemberDetails(false)})
      });
  };



  

  const handleInputFromCustomerSearch = () => {
    console.log(Dataa?.customerNumber, "ID");
    axios
      .post(
        API_SERVER + "/api/getByCustomerNumber",
        {
          customerNumber: Dataa?.customerNumber,
        },
        { headers }
      )
      .then((response) => {
        results = response.data.response;
        loanResponse = response.data.loanResponse;
        investmentResponse = response.data.investmentResponse;
        tradeResponse = response.data.tradeResponse;
        govResponse = response.data.govResponse;
        const codeDescriptions = response.data.response2[0];

        results.map((i, key) => {
          yo.push([
            i.acct_link,
            <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            <div style={{textAlign:"left"}}>{i.product}</div>,
            i.currency,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.cleared_balance)}</div>,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.local_equivalent)}</div>,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: results[key].acct_link });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>
            ]);
        });
        setData(yo);

        setState((prevState) => ({
          ...prevState,
          customerNumber: results[0]?.customer_number,
          customerName: results[0]?.customer_name,
          customerType: codeDescriptions?.customertypedescription,
          customerCategory: codeDescriptions?.customercategorydescription,

          address1: results[0]?.ph_address2,
          address2: results[0]?.ph_address3,
        }));
        setAccountNumber(results[0].acct_link);

        loanResponse.map((i, key) => {
          loanResults.push([
            i.acct_link,
         <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            i.description,
            i.curr_iso_code,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.shadow_balance_today)}</div>,
            i.facility_no,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: loanResponse[key].acct_link });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setLoanData(loanResults);

        investmentResponse.map((i, key) => {
          investmentResults.push([
            i.account_number,
           <div style={{textAlign:"left"}}>{i.account_description}</div>,
            i.product,
            i.currency,
            <div style={{ textAlign: "right" }}>{formattedNumber(i.balance)}</div>,
            i.deal_number,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({
                  accountNumber: investmentResponse[key].account_number,
                });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setInvestmentData(investmentResults);

        tradeResponse.map((i, key) => {
          tradeResults.push([
            i.cust_name,
           <div style={{textAlign:"left"}}>{i.description}</div>,
            i.expiry_date,
            i.currency,
            i.deal_number,
            <div style={{ textAlign: "right" }}>{formattedNumber( i.contingent_amt)}</div>,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: tradeResponse[key].cust_name });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setTradeData(tradeResults);

        govResponse.map((i, key) => {
          govResults.push([
            i.invest_id,
            <div style={{textAlign:"left"}}>{i.product}</div>,
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
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setGovData(govResults);
      })
      .catch((err) => console.log(err));
  };

  const handleInputFromGeneralEnquiry = () => {
    console.log(customerID, "ID");
    axios
      .post(
        API_SERVER + "/api/getByCustomerNumber",
        {
          customerNumber: customerID,
        },
        { headers }
      )
      .then((response) => {
        results = response.data.response;
        loanResponse = response.data.loanResponse;
        investmentResponse = response.data.investmentResponse;
        tradeResponse = response.data.tradeResponse;
        govResponse = response.data.govResponse;
        const codeDescriptions = response.data.response2[0];

        results.map((i, key) => {
          yo.push([
            i.acct_link,
             <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            <div style={{textAlign:"left"}}>{i.product}</div>,
            i.currency,
            <div style={{ textAlign: "right" }}>{i.cleared_balance}</div>,
            <div style={{ textAlign: "right" }}>{i.local_equivalent}</div>,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: i.acct_link });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>
            ]);
        });
        setData(yo);

        setState((prevState) => ({
          ...prevState,
          customerNumber: results[0]?.customer_number,
          customerName: results[0]?.customer_name,
          customerType: codeDescriptions?.customertypedescription,
          customerCategory: codeDescriptions?.customercategorydescription,

          address1: results[0]?.ph_address2,
          address2: results[0]?.ph_address3,
        }));
        setAccountNumber(results[0].acct_link);

        loanResponse.map((i, key) => {
          loanResults.push([
            i.acct_link,
            <div style={{textAlign:"left"}}>{i.account_descrp}</div>,
            i.description,
            i.curr_iso_code,
            <div style={{ textAlign: "right" }}>{i.shadow_balance_today}</div>,
            i.facility_no,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: loanResponse[key].acct_link });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setLoanData(loanResults);

        investmentResponse.map((i, key) => {
          investmentResults.push([
            i.account_number,
            <div style={{textAlign:"left"}}>{i.account_description}</div>,
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
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setInvestmentData(investmentResults);

        tradeResponse.map((i, key) => {
          tradeResults.push([
            i.cust_name,
           <div style={{textAlign:"left"}}>{i.description}</div>,
            i.expiry_date,
            i.currency,
            i.deal_number,
            i.contingent_amt,
            <ButtonComponent
              onClick={() => {
                setUniqueTuple({ accountNumber: tradeResponse[key].cust_name });
                openBalanceEnquiry();
              }}
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setTradeData(tradeResults);

        govResponse.map((i, key) => {
          govResults.push([
            i.invest_id,
           <div style={{textAlign:"left"}}>{i.product}</div>,
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
              buttonIcon={<AiOutlineEye size={20}/>}
            ></ButtonComponent>,
          ]);
        });
        setGovData(govResults);
      })
      .catch((err) => console.log(err));
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleInput(e.target.value);
    }
  };

  const clearFields = () => {
    setState((prevState) => ({
      ...prevState,
      customerName: "",
      customerType: "",
      customerCategory: "",
      address1: "",
      address2: "",
      armCode:""
    }));
    setData([]);
    setLoanData([]);
    setInvestmentData([]);
    setTradeData([]);
    setGovData([]);
    setGuaranteedLoans([]);
    setMemberDataStats("")
  };

  useEffect(() => {
    if (customerNumber !== 6) {
      clearFields();
    }
  }, [customerNumber]);

  useEffect(() => {
    handleInputFromCustomerSearch();
    handleInputFromGeneralEnquiry();
  }, []);

  // const handleDetails = () => {
  //   // setData([]);
  //   axios.post(API_SERVER + "/getBalance", {
  //       accountNumber: accountNumber,
  //     })
  //     .then((response) => {
  //       console.log(response, "response");
  //         let data = response.data[0];

  //         setAccountName(data.account_descrp);
  //         setProduct(data.product_descrp);
  //         setBranch(data.branch_descrp);
  //         setCurrency(data.currency_name);
  //         setAccountStatus(data.status_descrp);
  //         setUnclearedBalance(data.shadow_uncleared);
  //         setLedgerBalance(data.post_bookbal);
  //         setClearedBalance(data.shadow_balance_today);
  //         setAvailableBalance(data.post_av_bal);
  //         setCrAccruedInterest(data.cumulative_interest);
  //         setCrAccruedInterestRate(data.cr_int_rate);
  //         setDbAccruedInterest(data.od_interest_amount);
  //         setDbAccruedInterestRate(data.od_int_rate);
  //         setDbAccruedPenalty(data.cot_amount);
  //         setDbAccruedPenaltyRate(data.cot_rate);
  //         setInterestIntSuspense(data.od_intin_susp);
  //         setPenaltyIntSuspense(data.pen_intin_susp);
  //         setTotalArrears(data.total_arrears);
  //         setArrearsInterest(data.arrears_int);
  //         setArrearsInterestRate(data.arrears_int_rate);
  //         setArrearsIntSuspense(data.arrears_intin_susp);
  //         setDebitLimit(data.overdrawn_limit);
  //         setCreditLimit(data.lien_amount);
  //         setBlockedAmount(data.unapp_debit);
  //         setDateOpened(data.date_opened);
  //         setLastActivityDate(data.date_of_last_activity);
  //         setDateAcClosed(data.date_account_closed);
  //         setDormantDate(data.date_of_dormancy);

  //     })

  //     .catch((error) => {
  //       console.log(error);
  //   })
  // };

  const runCustomerID = () =>{
    setCustomerNumber(rowFromCustomerSearchByName);
  }

  useEffect(() => {
    if (rowFromCustomerSearchByName){
      runCustomerID();
    }
  }, [rowFromCustomerSearchByName]);

  console.log(rowFromCustomerSearchByName,"utan utan")
  console.log(matrix,"utan baton")


  useEffect(()=>{
if (matrix){
  setCustomerNumber(matrix);
  handleInput(matrix);
}
  },[matrix])

  return (
    <div style={{zoom:0.9}}>
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
                columnGap: "80px",
                rowGap: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div style={{ flex: 0.48}}>
                  <InputField
                    label={"Member Number"}
                    labelWidth={"55.5%"}
                    inputWidth={"42.5%"}
                    onChange={(e) => {
                      setCustomerNumber(e.target.value);
                    }}
                    onKeyDown={onEnter}
                    value={customerNumber}
                    type={"number"}
                  />
                </div>
                <div style={{flex:0.07}}>
                      <ButtonComponent
                        label={"GO"}
                        buttonColor={"white"}
                        buttonWidth={"100%"}
                        buttonHeight={"27px"}
                        onClick={handleGo}
                        buttonBackgroundColor={"green"}
                      />
                    </div>
                <div style={{flex:0.1}}>
                  <ButtonComponent
                    // label={"Find"}
                    label={"Search"}
                    buttonWidth={"100%"}
                    buttonHeight={"27px"}
                    onClick={openSearchByName}
                    buttonColor={"white"}
                  />
                </div>
              </div>
              {showMemberDetails && <>
              <InputField
                label={"Member Status :"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                value={memberDataStat.toUpperCase()}
                readOnly
                id={"description"}
              />
              <InputField
                label={"Member Name :"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                value={state.customerName}
                readOnly
                id={"description"}
              />
               <InputField
                label={"Member Type :"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                value={state.customerType}
                readOnly
                id={"description"}
              />
                <InputField
                label={"Address 1 :"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                value={state.address1}
                readOnly
                id={"description"}
              />
              <InputField
                label={"Member Category :"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                value={state.customerCategory}
                readOnly
                id={"description"}
              />
               <InputField
                label={"Address 2 :"}
                labelWidth={"25%"}
                inputWidth={"55%"}
                value={state.address2}
                readOnly
                id={"description"}
              />
              <InputField
                label={"ARM :"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                value={state.armCode}
                readOnly
                id={"description"}
              />
              <div></div>
             
              <div style={{ paddingLeft:"75%"}}>
                <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
                <ButtonComponent
                  label={"Other Details"}
                  buttonWidth={"100%"}
                  buttonHeight={"27px"}
                  onClick={handleOpen}
                  buttonColor={"white"}
                />
                </div>
              </div>
              </> }
            </div>
          </div>
          <div style={{ flex: 0.05 }}></div>
        </div>
      </div>
      <br></br>
      {showMemberDetails && <>
      <Header headerShade={true} title={"CURRENT / SAVING ACCOUNT (CASA) LISTING"} />
      <div style={{ zoom: 0.95}}>
        <DataTable
          rowsPerPage={5}
          data={data}
          // title={""}
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
    </>}
    {showMemberDetails && <>
      <Tabs variant="pills" onTabChange={handleTabChange} value={tab1}>
        <Tabs.List  style={{borderTop:'1px solid lightgrey',borderBottom:'1px solid lightgrey',padding:"1px 0px 1px 0px"}}>
          <Tabs.Tab value="gallery" style={{backgroundColor: tab1 === "gallery" ? '#228BE6' : '#007BE626',color: tab1 === "gallery" ? "whitesmoke" : "black"}} >LOANS</Tabs.Tab>
          <Tabs.Tab value="messages" style={{backgroundColor: tab1 === "messages" ? '#228BE6' : '#007BE626',color: tab1 === "messages" ? "whitesmoke" : "black"}}>INVESTMENTS</Tabs.Tab>
          <Tabs.Tab value="laterr" style={{backgroundColor: tab1 === "laterr" ? '#228BE6' : '#007BE626',color: tab1 === "laterr" ? "whitesmoke" : "black"}}>TRADE FINANCE</Tabs.Tab>
          <Tabs.Tab value="former" style={{backgroundColor: tab1 === "former" ? '#228BE6' : '#007BE626',color: tab1 === "former" ? "whitesmoke" : "black"}}>GOVERNMENT SECURITIES</Tabs.Tab>
          <Tabs.Tab value="lastOne" style={{backgroundColor: tab1 === "lastOne" ? '#228BE6' : '#007BE626',color: tab1 === "lastOne" ? "whitesmoke" : "black"}}>GUARANTEED LOANS</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="gallery" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              data={loanData}
              rowsPerPage={5}
              headers={[
                "Account Number",
                "Account Description",
                "Product",
                "Currency",
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
              rowsPerPage={5}
              data={investmentData}
              headers={[
                "Account Number",
                "Account Description",
                "Product",
                "Currency",
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
              rowsPerPage={5}
              data={tradeData}
              headers={[
                "Contact Ref Number",
                "Cust Name",
                "Product",
                "Expiry Date",
                "Currency",
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
              rowsPerPage={5}
              data={govData}
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
        <Tabs.Panel value="lastOne" pt="xs">
          <div style={{ zoom: 0.95}}>
            <DataTable
              rowsPerPage={5}
              data={guaranteedLoans}
              headers={[
                "Account No.",
                "Member Name",
                "No. Of Guaranty",
                "TIN",
                "Mobile No.",
                "Address",
                "Saving Avai. Balance",
                "Guaranteed Amount",
                "Avai. Amount Granted",
                " ",
              ]}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
    </>}
      <Modal
        opened={open}
        size="50%"
        withCloseButton={false}
      >
                  <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Customer Other Details
          </div>

          <svg
            onClick={handleClose}
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
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 " style={{marginTop:"20px"}}>
      <CustomerOtherDetails otherDetails={otherDetails} />
 </div>
        </div>
      </div>
    
      </Modal>
      <Modal
        size="95%"
        opened={balanceEnquiry}
        withCloseButton={false}
      >
             <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Account Balance Enquiry
          </div>

          <svg
            onClick={closeBalanceEnquiry}
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
      <AccountBalanceEnquiry state={uniqueTuple} />
 </div>
        </div>
      </div>
</Modal>
      <Modal size="63%" opened={searchByName} withCloseButton={false}>
      <div className="text-gray-700" style={{ marginTop: "-20px",  marginBottom: "-15px", marginLeft: "-17px", marginRight: "-16px",overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Customer Search
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
        <CustomerSearchByNameModal row1={setRowFromCustomerSearchByName} closeSearchByName={closeSearchByName} customerNumber={customerNumber}/>
 </div>
        </div>
      </div>
      </Modal>
    </div>
  );
}

export default AccountListEnquiry;
