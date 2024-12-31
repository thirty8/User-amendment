import {React,useState,useEffect} from 'react';
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { API_SERVER } from "../../../../../config/constant";

import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../components/others/Header/Header";
import SearchModal from "../../../teller-ops/components/Modal";

// import Headerr from '../../others/Header/Header';
import swal from "sweetalert";

import { Modal, Group, Button } from "@mantine/core";

import AccountBalanceEnquiry from './account-balance-enquiry';
import AccountListEnquiry from './account-list-enquiry';
import TransactionAnalyzer from './transaction-analyzer';

import "../../account-enquiry/customer-search.css";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function AccountGeneralEnquiry ({headerImage}) {

  const [findById, setFindById] = useState(false);
  const openFindByIDmodal = () => {
    setFindById(true);
  };

    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );

  const [customerNumber, setCustomerNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [accountNumber, setAccountNumber] = useState([]);
  const [ACnumber, setACnumber] = useState("");
  
  const [accountName, setAccountName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [date, setDate] = useState("");
  const [out, setOuts] = useState([]);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [showww, setShowww] = useState(false);
  const handleShut = () => setShow(false);
  const handleOpen = () => setShow(true);
  const handleClosee = () => setShow(false);
  const handleShoww = () => setShoww(true);
  const handleCloseee = () => setShoww(false);
  const handleShowww = () => setShowww(true);
  const handleCloseeee = () => setShowww(false);
  const [stateLOV, setStateLOV] = useState([]);

  //other details
  const [product, setProduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [branch, setBranch] = useState("");
  const [accountStatus, setAccountStatus] = useState("");

  //balance
  const [unclearedBalance, setUnclearedBalance] = useState("");
  const [clearedBalance, setClearedBalance] = useState("");
  const [ledgerBalance, setLedgerBalance] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [craccruedInterest, setCrAccruedInterest] = useState("");
  const [dbaccruedInterest, setDbAccruedInterest] = useState("");
  const [dbaccruedPenalty, setDbAccruedPenalty] = useState("");
  const [arrearsInterest, setArrearsInterest] = useState("");
  const [craccruedInterestRate, setCrAccruedInterestRate] = useState("");
  const [dbaccruedInterestRate, setDbAccruedInterestRate] = useState("");
  const [dbaccruedPenaltyRate, setDbAccruedPenaltyRate] = useState("");
  const [arrearsInterestRate, setArrearsInterestRate] = useState("");
  const [interestIntSuspense, setInterestIntSuspense] = useState("");
  const [penaltyIntSuspense, setPenaltyIntSuspense] = useState("");
  const [arrearsIntSuspense, setArrearsIntSuspense] = useState("");

  //limits
  const [debitLimit, setDebitLimit] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [blockedAmount, setBlockedAmount] = useState("");
  const [totalArrears, setTotalArrears] = useState("");

  //activity
  const [dateOpened,setDateOpened] = useState();
  const [lastActivityDate,setLastActivityDate] = useState();
  const [dateAcClosed,setDateAcClosed] = useState();
  const [dormantDate,setDormantDate] = useState();
  
  //modals
  const [balanceModal,setBalanceModal] = useState(false);
  const handleBalanceModal = () => {setBalanceModal(true)}
  const closeBalanceModal = () => {setBalanceModal(false)}
  const [accountListModal,setAccountListModal] = useState(false);
  const handleAccountListModal = () => {setAccountListModal(true)}
  const closeAccountListModal = () => {setAccountListModal(false)}
  const [transactionAnalyserModal,setTransactionAnalyserModal] = useState(false);
  const openTransactionAnalyserModal = () => {setTransactionAnalyserModal(true)}
  const closeTransactionAnalyserModal = () => {setTransactionAnalyserModal(false)}

  
  const [uniqueTuple,setUniqueTuple] = useState([]);
  let curr = [];
  let output = [];
  const [masterState,setMasterState] = useState({});
  
  console.log(customerNumber);

  const handleInput = (e) => {
        if (e.key === "Enter") {
    axios.post(API_SERVER + "/api/getGeneralAccountDetails", {
      customerNumber: customerNumber,
    },{headers})
    .then((response) => {
        let results = response.data;
        results.map((i)=> {
          curr.push(i.account_number)
        })
        setAccountNumber(curr);
        // console.log(curr, "yolooooo");
        // console.log(results[0].customer_name)
        setCustomerName(results[0].customer_name)
      
      }).catch((error) => {
        swal({
            title: "Invalid Customer Number",
            text: "The customer number could not be found in our records..",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          })
      });
    }
  };
  function handleSelected(value) {
    // setCreditAccount(value.accountNumber);
    // setCreditAccountChange(value.accountNumber);
    setCustomerNumber(value.customer_number);
    document.getElementById("accountNumber").focus();
    setFindById(false);
  }

//   useEffect(() => {
//     handleInput()
//   }, [customerNumber]);

  console.log(ACnumber) 

  const handleDetails = () => {
    // setData([]);
    axios.post(API_SERVER + "/api/getBalance", {
        accountNumber: ACnumber,
      },{headers})
      .then((response) => {
        console.log(response, "response");
          let data = response.data[0];

          setAccountName(data.account_descrp);

          setMasterState((prevState) => ({
            ...prevState,
            product: data?.product_descrp,
            riskCode: data?.risk_code,
            branch: data?.branch_descrp,
            currency: data?.currency_name,
            accountStatus: data?.status_descrp,
            UnclearedBalance:data?.shadow_uncleared,
            ledgerBalance:data?.post_bookbal,  
            clearedBalance:data?.shadow_balance_today,
            availableBalance:data?.post_av_bal,
            CrAccruedInterest:data?.cumulative_interest,
            CrAccruedInterestRate:data?.cr_int_rate,
            DbAccruedInterest:data?.od_interest_amount,
            DbAccruedInterestRate:data?.od_int_rate,
            DbAccruedPenalty:data?.cot_amount,
            DbAccruedPenaltyRate:data?.cot_rate,
            InterestIntSuspense:data?.od_intin_susp,
            PenaltyIntSuspense:data?.pen_intin_susp,
            TotalArrears:data?.total_arrear,
            ArrearsInterest:data?.arrears_int,
            ArrearsInterestRate:data?.arrears_int_rate,
            ArrearsIntSuspense:data?.arrears_intin_susp,
            DebitLimit:data?.overdrawn_limit,
            CreditLimit:data?.lien_amount,
            BlockedAmount:data?.unapp_debit,
            DateOpened:data?.date_opened,
            LastActivityDate:data?.date_of_last_activity,
            LastDbTransDate:data?.last_db_trans_date,
            LastCrTransDate:data?.last_cr_trans_date,
            DateAcClosed:data?.date_account_closed,
            DormantDate:data?.date_of_dormancy,
            NoOfHolders:data?.acct_holder,
            NoOfDeposits:data?.no_of_deposits,
            NoOfWithdrawals:data?.no_of_withdrawals,
          }));
      }) .catch((error) => {
        console.log(error);
        if (axios.isCancel(error)) {
          return false;
      }})
  };

  useEffect(() => {
    handleDetails()
  }, [ACnumber]); 

  function formatNumber(num) {
    if (num === undefined || num === "") {
      return " ";
    } else {
      const formatted =
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
      return formatted;
    }
  }


  {
return (
    <div>
    <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"20px",paddingBottom:"7px"}}>
              <div style={{display:"flex",marginBottom:"20px"}}>
                <div style={{flex:0.07}}></div>
                <div style={{flex:0.86}}>
                  <div style={{display:"grid",gridTemplateColumns:"auto auto",rowGap:"10px"}}>
                  <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.56}}>
                          <InputField label={"Customer Number"} labelWidth={"43%"} inputWidth={"57%"} onChange={(e) => {setCustomerNumber(e.target.value)}} onKeyDown={handleInput} min={false.toString()}  type={"number"}/>
                        </div>
                        <div style={{flex:0.08}}>
                          <ButtonComponent label={"Find"}
                        buttonHeight={"25px"}
                        buttonWidth={"75px"}
                        onClick={openFindByIDmodal}/>
                        </div>
                  </div>
                    <InputField  label={"Customer Name"} labelWidth={"20%"} inputWidth={"80%"} disabled value={customerName}/>
                    <ListOfValue id="accountNumber" label={"Account Number"} labelWidth={"21%"} inputWidth={"40%"} data={accountNumber} onChange={(e) => {setACnumber(e)}}  type={"number"}/>
                    <InputField  label={"Account Name "} labelWidth={"20%"} inputWidth={"80%"} value={accountName} disabled/>
                  </div>
                </div>
                <div style={{flex:0.07}}></div>
              </div>
              <div className="genEnq-Buttons" style={{display:"flex"}}>
                <div style={{flex:0.76}}></div>
                <div style={{display:"flex",justifyContent:"flex-end",flex:0.17}}>
              {/* <ButtonComponent label={"Fetch"} buttonWidth={"90px"} buttonHeight={"30px"} buttonColor={"white"}/> */}
              <ButtonComponent label={"Refresh"} buttonWidth={"69px"} buttonHeight={"30px"} buttonColor={"white"}/>
              </div>
              <div style={{flex:0.07}}></div>
            </div>  
          </div>
          <div style={{display:"flex",marginBottom:"15px",marginTop:"15px"}}>
                <div style={{flex:0.05}}></div>
                <div style={{flex:0.9}}>
                  <div style={{display:"grid",gridTemplateColumns:"auto auto auto auto auto auto",columnGap:"15px",rowGap:"10px"}}>
                    <ButtonComponent label={"Account Balances"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"} onClick={handleBalanceModal}/>
                    <ButtonComponent label={"Relations"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Services"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Statistics"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"E-Banking Services"} buttonWidth={"180px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Block Details"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Account Transactions"} buttonWidth={"180px"} buttonHeight={"28px"} buttonColor={"white"} onClick={openTransactionAnalyserModal}/>
                    <ButtonComponent label={"Linked Accounts"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"} onClick={handleAccountListModal}/>
                    <ButtonComponent label={"Cheques"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Account Notes"} buttonWidth={"170px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Standing Instructions"} buttonWidth={"180px"} buttonHeight={"28px"} buttonColor={"white"}/>
                    <ButtonComponent label={"Signature Verification"} buttonWidth={"180px"} buttonHeight={"28px"} buttonColor={"white"}/>
                   </div>
                </div>  
                <div style={{flex:0.05}}></div>
          </div>
          <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"14px",paddingBottom:"14px"}}>
              <div style={{display:"flex",gap:"10px"}}>
                <div style={{flex:0.5,marginLeft:"10px"}}>
                  <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"10px",paddingBottom:"5px"}}>
                    <div style={{marginBottom:"8px"}}>
                    <Header headerShade={true} title={"Other Details"} />
                    </div>
                    <div style={{display:"flex",marginBottom:"20px"}}>
                      <div style={{flex:0.005}}></div>
                      <div style={{flex:0.96}}>
                      <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",columnGap:"20px",rowGap:"10px",paddingTop:"10px"}}>
                    <InputField label={"Product"} labelWidth={"33%"} inputWidth={"58%"} value={masterState?.product} disabled/>
                    <InputField label={"Risk Code"} labelWidth={"33%"} inputWidth={"60%"} value={masterState?.riskCode} disabled/>
                    <InputField label={"Branch"} labelWidth={"33%"} inputWidth={"58%"} value={masterState?.branch} disabled/>
                    <InputField label={"Sector"} labelWidth={"33%"} inputWidth={"60%"} disabled/>
                    <InputField label={"Currency"} labelWidth={"33%"} inputWidth={"58%"} value={masterState?.currency} disabled/>
                    <InputField label={"Sub Sector"} labelWidth={"33%"} inputWidth={"60%"} disabled/>
                    <InputField label={"Account Status"} labelWidth={"33%"} inputWidth={"58%"} value={masterState?.accountStatus} disabled/>
                    <InputField label={"Segment"} labelWidth={"33%"} inputWidth={"60%"} disabled/>
                    <InputField label={"No. Of Holders"} labelWidth={"33%"} inputWidth={"58%"} value={masterState?.NoOfHolders} disabled/>
                    <InputField label={"Sub-Segment"} labelWidth={"33%"} inputWidth={"60%"} disabled/>
                    </div>
                      </div>
                      <div style={{flex:0.02}}></div>
                    </div>
                   
                  </div>
                  <br></br>
                  <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"10px",paddingBottom:"5px"}}>
                    <div style={{marginBottom:"8px"}}>
                    <Header headerShade={true} title={"Activity"} />
                    </div>
                    <div style={{display:"flex"}}>
                      <div style={{flex:0.005}}></div>
                      <div style={{flex:0.96}}>
                      <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",columnGap:"30px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                    <InputField label={"Foreign A/C Category"} labelWidth={"35%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Last DB. Trans. Date"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} value={masterState?.LastDbTransDate} disabled/>
                    <InputField label={"A/C Classification"} labelWidth={"35%"} inputWidth={"55%"} disabled/>
                    <InputField label={"Last CR. Trans. Date"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} value={masterState?.LastCrTransDate} disabled/>
                    <InputField label={"A/C Opened Date"} labelWidth={"35%"} inputWidth={"32%"} type={"date"} value={masterState?.DateOpened} disabled/>
                    <InputField label={"Date in DB"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} disabled/>
                    <InputField label={"Last Activity Date"} labelWidth={"35%"} inputWidth={"32%"} type={"date"} value={masterState?.LastActivityDate} disabled/>
                    <InputField label={"Date in CR"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} disabled/>
                    <InputField label={"No. Of Deposits"} labelWidth={"35%"} inputWidth={"32%"} value={masterState?.NoOfDeposits} disabled/>  
                    <InputField label={"Date A/C Closed"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} value={masterState?.DateAcClosed} disabled/>
                    <InputField label={"No. Of Withdrawals"} labelWidth={"35%"} inputWidth={"32%"} value={masterState?.NoOfWithdrawals} disabled/>
                    <InputField label={"Dormant Date"} labelWidth={"45%"} inputWidth={"38%"} type={"date"} value={masterState?.DormantDate} disabled/>
                    </div>
                      </div>
                      <div style={{flex:0.02}}></div>
                    </div>
                   
                  </div>
                </div>
                <div style={{flex:0.5,marginRight:"10px"}}>
                  <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"10px",paddingBottom:"15px"}}>
                  <div style={{marginBottom:"8px"}}>
                  <Header headerShade={true} title={"Balance"} />
                  </div>
                  <div style={{display:"flex"}}>
                    <div style={{flex:0.002}}></div>
                    <div style={{flex:0.96}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"25px",rowGap:"10px",paddingLeft:"5px",paddingRight:"5px",paddingTop:"10px"}}>
                         <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.86}}>
                          <InputField
                            label={"Uncleared"}
                            labelWidth={"40%"}
                            inputWidth={"60%"}
                            disabled
                            value={formatNumber(masterState?.UnclearedBalance)}
                            textAlign={"right"}
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{flex:0.09}}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="white" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                          />
                        </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"flex-start",gap:"10px"}}>
                        <div style={{flex:0.84}}>
                          <InputField
                            label={"CR Accrued Interest"}
                            labelWidth={"57%"}
                            inputWidth={"43%"}
                            value={formatNumber(masterState?.CrAccruedInterest)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{flex:0.16}}>
                          <InputField
                            inputWidth={"100%"}
                            value={formatNumber(masterState?.CrAccruedInterestRate)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                            noMarginRight
                          />
                        </div>
                      </div>
                      <InputField label={"Ledger"} labelWidth={"30.7%"} inputWidth={"58%"} value={formatNumber(masterState?.ledgerBalance)} textAlign={"right"} paddingRight={"5px"} disabled/>
                      <div style={{display:"flex",justifyContent:"flex-start",gap:"10px"}}>
                        <div style={{flex:0.84}}>
                          <InputField
                            label={"DB Accrued Interest"}
                            labelWidth={"57%"}
                            inputWidth={"43%"}
                            value={formatNumber(masterState?.DbAccruedInterest)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                           
                          />
                        </div>
                        <div style={{flex:0.16}}>
                          <InputField
                            inputWidth={"100%"}
                            value={formatNumber(masterState?.DbAccruedInterestRate)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                            noMarginRight
                          />
                        </div>
                      </div>
                        <InputField label={"Cleared"} labelWidth={"30.7%"} inputWidth={"58%"} value={formatNumber(masterState?.clearedBalance)} textAlign={"right"} paddingRight={"5px"} disabled/>
                        <div style={{display:"flex",justifyContent:"flex-start",gap:"10px"}}>
                        <div style={{flex:0.84}}>
                          <InputField
                            label={"DB Accrued Penalty"}
                            labelWidth={"57%"}
                            inputWidth={"43%"}
                            value={formatNumber(masterState?.DbAccruedPenalty)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{flex:0.16}}>
                          <InputField
                            inputWidth={"100%"}
                            value={formatNumber(masterState?.DbAccruedPenaltyRate)}
                            disabled
                            textAlign={"right"}
                            paddingRight={"5px"}
                            noMarginRight
                          />
                        </div>
                      </div>
                      <InputField label={"Available"} labelWidth={"30.7%"} inputWidth={"58%"}  value={formatNumber(masterState?.availableBalance)} textAlign={"right"} paddingRight={"5px"} required disabled/>
                      <InputField label={"Interest In Suspense"} labelWidth={"45%"} inputWidth={"55%"} value={formatNumber(masterState?.InterestIntSuspense)} textAlign={"right"} paddingRight={"5px"} disabled/>
                      <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.86}}>
                          <InputField
                            label={"Total Arrears"}
                            labelWidth={"40%"}
                            inputWidth={"60%"}
                            disabled
                            value={formatNumber(masterState?.TotalArrears)}

                            textAlign={"right"} paddingRight={"5px"}
                          />
                        </div>
                        <div style={{flex:0.09}}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="white" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                          />
                        </div>
                        </div>
                    <InputField label={"Penalty In Suspense"} labelWidth={"45%"} inputWidth={"55%"} value={formatNumber(masterState?.PenaltyIntSuspense)} textAlign={"right"} paddingRight={"5px"} disabled/>
                    <div></div>
                   
                    </div>
                    </div>
                    <div style={{flex:0.02}}></div>
                    </div>
                  </div>
                  <br></br>
                  <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"10px",paddingBottom:"10px"}}>
                  <div style={{marginBottom:"15px"}}>
                  <Header headerShade={true} title={"Limits"} />
                  </div>
                  <div style={{display:"flex"}}>
                    <div style={{flex:0.02}}></div>
                    <div style={{flex:0.96}}>
                       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"25px",rowGap:"10px",paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px",paddingTop:"10px"}}>
                    <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.86}}>
                          <InputField
                            label={"Debit Limit"}
                            labelWidth={"41%"}
                            inputWidth={"63%"}
                            disabled
                            value={formatNumber(masterState?.DebitLimit)}
                            textAlign={"right"} 
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{ flex: 0.09 }}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="white" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                          />
                        </div>
                        </div>
                        <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.89}}>
                          <InputField
                            label={"Credit Limit"}
                            labelWidth={"45.5%"}
                            inputWidth={"54.5%"}
                            disabled
                            value={formatNumber(masterState?.CreditLimit)}
                            textAlign={"right"} 
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{ flex: 0.09 }}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="white" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                          />
                        </div>
                        </div>
                        <div style={{display:"flex",gap:"5px",alignItems:"center",justifyContent:"flex-start"}}>
                        <div style={{flex:0.86}}>
                          <InputField
                            label={"Blocked Amount"}
                            labelWidth={"36.2%"}
                            inputWidth={"63%"}
                            disabled
                            value={masterState.BlockedAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            textAlign={"right"} 
                            paddingRight={"5px"}
                          />
                        </div>
                        <div style={{ flex: 0.09 }}>
                          <ButtonComponent
                            buttonIcon={<BiSearchAlt color="white" />}
                            buttonWidth={"28.5px"}
                            buttonHeight={"25px"}
                            buttonColor={"white"}
                          />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div style={{flex:0.02}}></div>
                    </div>
                  </div>

                </div>
              </div> 
          </div>
          <Modal
        size="100%"
        opened={balanceModal}
        onClose={closeBalanceModal}
        title="Account Balance Enquiry"
      >
         <AccountBalanceEnquiry ACnumber={ACnumber}/>
      </Modal>
      <Modal
        size="100%"
        opened={accountListModal}
        onClose={closeAccountListModal}
        title="Account List Enquiry"
      >
         <AccountListEnquiry customerID={customerNumber}/>
      </Modal>
      <Modal
        size="100%"
        opened={transactionAnalyserModal}
        onClose={closeTransactionAnalyserModal}
        title="Transaction Analyzer"
      >
          <TransactionAnalyzer/>
      </Modal>
      <SearchModal
        showModal={findById}
        setShowModal={setFindById}
        handleSelected={handleSelected}
      />
         
 </div>
   );
}
}
export default AccountGeneralEnquiry;
 