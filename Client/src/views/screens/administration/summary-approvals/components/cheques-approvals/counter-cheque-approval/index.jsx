import React,{useState,useEffect, useMemo} from 'react'
import axios from 'axios';
import AccountSummary from '../../../../../../../components/others/AccountSummary';
import InputField from '../../../../../../../components/others/Fields/InputField';
import ButtonComponent from '../../../../../../../components/others/Button/ButtonComponent';
// import SearchModal from "../../../../cheques/book-request/cheque-book-requisition/components/SearchModal"
import ActionButtons from '../../../../../../../components/others/action-buttons/ActionButtons';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import CustomModal from "../../../../../cheques/counter-cheques/component/customModal"
import { API_SERVER } from '../../../../../../../config/constant';
import TextAreaField from '../../../../../../../components/others/Fields/TextArea';

function CounterChequeApproval({batchNo,setShowModal}){

    // States 
    const [amount, setAmount] = useState("");
    const [chequeNumber, setChequeNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountDetails, setAccountDetails] = useState({});
    const [documentNo, setDocumentNo] = useState("");
    const [dateOpened, setDateOpened] = useState("");
    const [dateOfLastAct, setDateOfLastAct] = useState("");
    const [comment, setComment] = useState("");
    const [requestedBy, setRequestedBy] = useState("");
    const [form, setForm] = useState("");
    const [showModal1, setShowModal1] = useState(false);
    const [batchNu, setBatchNo] = useState(0);


    const headers = useMemo(() => {
        return {
          // 'x-api-key': process.env.REACT_APP_API_KEY,
          'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          'Content-Type': 'application/json'
        };
      }, []);
    
       // format numbers
       function formatNumber(num) {
        const formatted = Number(num).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        });
        return formatted;
      }

      function Notify({ title, icon, confirmButtonText, text }) {
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: confirmButtonText,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }

      function handleDocumentNo() {
        if (documentNo === "") {
          Notify({
            title: "ERR - 01346",
            text: "A Valid Document ID is required",
            icon: "warning",
            confirmButtonText: "OK",
          });
    
          // notify.warn({
          //   title: "ERR - 01346",
          //   id: "No Document ID",
          //   message: "A Valid Document ID is required",
          // });
        } else {
          setShowModal1(true);
          setForm("View Document");
        }
      }

      function formatDate(inputDate) {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
    
        // Parse the input date
        const dateObj = new Date(inputDate);
        // Extract the day, month, and year from the date object
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        // Format the date in the desired format "M/D/YYYY"
        const formattedDate = `${month + 1}/${day}/${year}`;
        return formattedDate;
      }

      useEffect(() => {
        async function getChequeDetails(){
            await axios.post(API_SERVER + "/api/getCounterChequeApprovalDetails",{
                batchNumber: batchNo,
            },{headers}).then((response) => {
                if (response.data.length>0){
                    setAccountNumber(response.data[0]?.acct_link)
                    setAmount(response.data[0]?.amount)
                    setChequeNumber(response.data[0]?.cheque_no)
                    setComment(response.data[0]?.comments)
                    setDocumentNo(response.data[0]?.scandoc_id)
                    setRequestedBy(response.data[0]?.requested_by)
                    setBatchNo(response.data[0]?.requisition_no)
                }
            })
        }
        getChequeDetails()
      },[batchNo, headers])

      useEffect(() => {
        if (accountDetails) {
          if (accountDetails.summary?.length > 0) {
            setAccountName(accountDetails?.summary[0]?.account_name);
            setDateOpened(formatDate(accountDetails?.summary[0]?.date_opened));
            setDateOfLastAct(
              formatDate(accountDetails?.summary[0]?.date_of_last_activity)
            );
            // setTimeout(() => {
            //   var input = document.getElementById("Cheque Number");
            //   input.focus();
            // }, 0);
          } else if (Object.keys(accountDetails).length === 0) {
            setAccountName("");
            setDateOfLastAct("");
            setDateOpened("");
           
          }
        }
      }, [accountDetails]);

      function AuthoriseCounterCheque(){

      }

    return (
        <div style={{ zoom: 0.97 }}>
          {/* <Notifications position="top-center" zIndex={2077} limit={5} /> */}
    
          {/* // 1683042691  */}
          <div>
          <ActionButtons onAuthoriseClick={AuthoriseCounterCheque} displayView={"none"} displayRefresh={"none"} displayOk={"none"} displayNew={"none"} displayHelp={"none"} displayFetch={"none"} displayDelete={"none"} displayCancel={"none"} onExitClick={()=>setShowModal(false)} />
          </div>
    
          <hr className="my-[3px] mt-3" />
          {/* start of body  */}
          <div className=" bg-white flex justify-end py-[10px] px-4 mb-2">
       
            <div>
              <InputField
                label={"Request ID"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled={true}
                value={batchNu}
              />
            </div>
          </div>
          {/* </div> */}
          <hr className="my-[3px]" />
    
          <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
            <div
              style={{ width: "100%" }}
              className="wrapper rounded border-2  md:flex"
            >
              {/* left side  */}
              <div className="md:w-[65%] rounded py-2 px-1 md:mr-2 md:mb-0 first">
                <div className=" w-full   mt-1">
                  <div
                    className="w-[58%] flex items-center"
                    style={{ marginBottom: "13px" }}
                  >
                    <InputField
                      label={"Account Number"}
                      labelWidth={"31%"}
                      inputWidth={"55%"}
                      required={true}
                      type={"number"}
                      id={"accountNumber"}
                      name={"accountNumber"}
                      value={accountNumber}
                      disabled={true}
                    //   onBlur={onBlur}
                    //   onChange={onAccountNumberChange}
                    //   onKeyPress={(e) => {
                    //     onKeyPress(e);
                    //   }}
                    />
                  <div className='invisible'>
                  <ButtonComponent
                    //   onClick={() => {
                    //     setShowModal(true);
                    //   }}
                      label="Search"
                    //   buttonBackgroundImage={
                    //     `url(` +
                    //     window.location.origin +
                    //     `/assets/images/headerBackground/` +
                    //     getTheme.theme.headerImage +
                    //     `)`
                    //   }
                      buttonBackgroundColor={"#0580c0"}
                      buttonWidth="20%"
                      buttonHeight="27px"
                      buttonColor="white"
                    />
                  </div>
                    {/* <SearchModal
                      setShowModal={setShowModal}
                      showModal={showModal}
                      handleSelected={handleSelected}
                     
                    /> */}
                  </div>
    
                  <div
                    className="flex items-center w-[100%]"
                    style={{ marginBottom: "13px" }}
                  >
                    <div className="w-[100%] ">
                      <InputField
                        label={"Account Name"}
                        labelWidth={"16.1%"}
                        inputWidth={"68.9%"}
                        disabled={true}
                        name={"accountName"}
                        value={accountName}
                       
                      />
                    </div>
                  </div>
                </div>
              
    
                <div
                  className="flex space-x-6 items-center w-[100%]"
                  style={{ marginBottom: "13px" }}
                >
                  <InputField
                    label={"Date Opened"}
                    id={"Date Opened"}
                    disabled={true}
                    labelWidth={"33%"}
                    inputWidth={"55%"}
                    value={dateOpened}
                  />
    
                  <InputField
                    label={"Date of Last Activity"}
                    labelWidth={"27%"}
                    inputWidth={"42%"}
                 
                    disabled={true}
                    value={dateOfLastAct}
                  />
                </div>
    
                <div
                  className="flex space-x-6 items-center justify-between w-[100%]"
                  style={{ marginBottom: "13px" }}
                >
                  <InputField
                    label={"Cheque Number"}
                    id={"Cheque Number"}
                    labelWidth={"33.2%"}
                    required={true}
                    inputWidth={"55%"}
                    type={"number"}
                    disabled={true}
                   
                  
                    value={chequeNumber}
                
                  />
    
                  <InputField
                    label={"Amount"}
                    id={"Amount"}
                    labelWidth={"27%"}
                 
                    inputWidth={"42%"}
                    textAlign={"right"}
                    disabled={true}
                 
                   
                    // onBlur={(e) => {
                    //   if (!amount.includes(",")) {
                    //     if (!(amount === "")) {
                    //       setAmount(formatNumber(parseFloat(e.target.value)));
                    //     }
                    //   }
                    // }}
                    required={true}
                    value={formatNumber(parseFloat(amount))}
                  />
                </div>

                {/* new one heree  */}
                {/* <div
                  className="flex  items-center w-[100%]"
                  style={{ marginBottom: "13px" }}
                >
                    <span className='flex space-x-5'>
                    <InputField
                      id={"Document Number"}
                      label={"Document Number"}
                    //   onChange={(e) => setDocumentNo(e.target.value)}
                      labelWidth={"40%"}
                      inputWidth={"55%"}
                      type={"number"}
                      value={documentNo}
                      disabled={true}                  
                    />
                    
                    <ButtonComponent
                      label={"View Doc"}
                      buttonWidth={"20%"}                 
                      type={"button"}
                      buttonHeight={"27px"}
                      buttonColor={"white"}
                      buttonBackgroundColor={"#0580c0"}
                    
                      onClick={handleDocumentNo}
    
                    
                    />
                    </span>
    
                 <span className=''>
                       <ButtonComponent
                      onClick={() => {
                        setShowModal1(true);
    
                        setForm("View Charges");
                      }}
                      label="View Charges"
                   
                      buttonBackgroundColor={"green"}
                      buttonWidth="100%"
                      buttonHeight="27px"
                      buttonColor="white"
                    />
                    <CustomModal
                      showModal1={showModal1}
                      setShowModal1={setShowModal1}
                      form={form}
                      setForm={setForm}
                      documentNo={documentNo}
                      batchNumber={batchNu}
                    />
                 </span>
                </div> */}


                <div className="flex space-x-44 items-center w-[100%]">
                  <div
                    className="w-[58%] flex items-center"
             
                  >
                    <InputField
                      id={"Document Number"}
                      label={"Document Number"}
                    //   onChange={(e) => setDocumentNo(e.target.value)}
                      labelWidth={"33.3%"}
                      inputWidth={"55.5%"}
                      type={"number"}
                      value={documentNo}
                      disabled={true}
                    //   onKeyPress={(e) => {
                    //     if (e.key === "Enter") {
                    //       e.preventDefault();
                    //       handleDocumentNo();
                        
                    //     }
                    //   }}
                     
                    />
                    <ButtonComponent
                      label={"View Doc"}
                      buttonWidth={"20%"}
                  
                      type={"button"}
                      buttonHeight={"27px"}
                      buttonColor={"white"}
                      buttonBackgroundColor={"#0580c0"}
                    
                      onClick={handleDocumentNo}
    
                    
                    />
                  </div>
                  <div className=" w-[16%]">
                    {/* <ButtonComponent
                      onClick={() => {
                        setShowModal1(true);
    
                        setForm("View Charges");
                      }}
                      label="View Charges"
                   
                      buttonBackgroundColor={"green"}
                      buttonWidth="71%"
                      buttonHeight="27px"
                      buttonColor="white"
                    /> */}
                    <CustomModal
                      showModal1={showModal1}
                      setShowModal1={setShowModal1}
                      form={form}
                      setForm={setForm}
                      documentNo={documentNo}
                      batchNumber={batchNo}
                    />
                  </div>
                </div>
              </div>
              {/* right side  */}
              <div className=" md:w-[35%] py-2 rounded px-4 ">
                <AccountSummary
                  accountNumber={accountNumber}
                  setAccountDetails={setAccountDetails}
                  backgroundColor={"#0580c0"}
                />
              </div>
            </div>
            <div className="space-y-2  py-3 border-2 rounded mt-2">
              <div
                className="w-[70%] flex items-center"
                style={{ marginBottom: "13px" }}
              >
                <div className="w-[82.4%] ">
                  <InputField
                    id={"Requested By"}
                    labelWidth={"18%"}
                    inputWidth={"76.5%"}
                    label={"Requested By"}
                    required={true}
                    disabled={true}
                    value={requestedBy}
                  
    
                  />
                </div>
              </div>
    
              <div style={{ marginBottom: "13px" }}>
                <TextAreaField
                  label={"Comment"}
                  id={"Comment"}
                  labelWidth={"10.32%"}
                  inputWidth={"44.3%"}
                  disabled={true}
                  value={comment}
              
                />
              </div>
            </div>
          </div>
    
        </div>
      );


}

export default CounterChequeApproval