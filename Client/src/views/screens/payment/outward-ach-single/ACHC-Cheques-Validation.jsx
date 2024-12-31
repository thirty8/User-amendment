import React, {useEffect, useState} from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Card,
} from "react-bootstrap";

import "../index.css"
import { useTranslation } from 'react-i18next';
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from 'axios'
import { API_SERVER } from "../../../../../config/constant";
import AccountSummary from "../../../../../components/others/AccountSummary.js";
import DocumentViewing from "../../../../../components/DocumentViewing";
import ImageVerification from "../../../../../components/ImageVerification";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import swal from "sweetalert";
import { Notifications } from '@mantine/notifications';
import { FiXCircle } from "react-icons/fi";
import notify from "../notification";

function ACHCHEQUES(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const headers = {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
      };
        // signature verification states
        const [showSignatureverification, setShowSignatureVerfication] = useState(false)
    
        //signature verfication fucntion
        const handleShowSignatureVerification = () => {
          setShowSignatureVerfication(true)
        }
        // attach document state
      const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
      const [documentNumber, setDocumentNumber] = useState('')
       // attach/ view doc function
       function handleClick() {
        if (documentNumber === "") {
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
    
    // receiving banks 
    var receivingbankslovs = []
    axios.get(API_SERVER + "/api/ach/receivingbanks", {
      headers: headers
    }) .then(function (response){
      for (var i = 0; i < response.data.length; i++) {
        receivingbankslovs.push({ "label": response.data[i].label, "value": response.data[i].value })
        // console.log(response.data, "the res data")
        //  console.log(receivingbankslovs, "pushing into arr")
      }
    }).catch((err) => {
      console.log(err)
    })
    // States
    const [generalState, setGeneralState] = useState();
    const [amount, setAmount] = useState("");
    const [debitAmount, setdebitAmount] = useState("");
    const [rate, setRate] = useState('')
    const [beneficiaryNumber, setBeneficiaryNumber] = useState('')
    const [accountDetails, setAccountDetails] = useState({});
    const [accountName, setAccountName] = useState("");
    const [ACHLimit, setACHLimit] = useState("");
    const [show, setShow] = useState(false);
    const [accNum, setAccNum] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [sourceAccountDefaultValue, setSourceAccountDefaultValue] = useState("");
    useEffect(()=>{
    setAccountName(accountDetails?.account_name)
   
    },[accountDetails])
    
    const onAccountNumberEnter = async (e) => {
      if(e.keyCode === 13){
      await axios
        .post(
          API_SERVER + "/api/ach/maxLimit",
          {
            ottCurrency: accountDetails?.currency,
          },
          {
            headers: headers,
          }
        )
        .then(function (response) {
          // console.log(response.data[0], "achhere")
          setACHLimit(response.data?.ACH_max_limit);
          // console.log(response.data?.ACH_max_limit, "here ach")
        })
        .catch((err) => {
          console.log(err);
        });
  
  
        if(accountDetails?.currency == "KES"){
          setRate("1.000")
        }
      }
    };
    const handleOnBeneficiaryEnter = (e) =>{
      if(e.keyCode === 13) {
        if (beneficiaryNumber === generalState?.accountNumber) {
       
          notify.error({
            title: "ERROR",
            message: "Beneficiary Account cannot be the same as Payer Account",
            id: "Account Number can't be the same",
          });
        }
  
        axios.post(API_SERVER + "/api/ach/validateBBAN", {
          accountNumber: beneficiaryNumber
        }, {headers: headers}).then(function(response){
          if(response.data === 'N'){
            notify.error({
              title: "ERROR",
              message: "Invalid Account",
              id: "Invalid Account Number",
            });
          }else{
            // switchFocus(e, 'BeneficiaryName')
            document.getElementById('BeneficiaryName')?.focus()
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
     // focus on next input field
     function switchFocus(e, nextFieldId) {
      if (e.key === "Enter") {
        document.getElementById(nextFieldId).focus();
        console.log(document.getElementById(nextFieldId), "component");
      }
    }
    //Get the current date
    const today = new Date();
    const handleBalanceCheck = (e) => {
      if (e.keyCode === 13) {
        var amountInFigures = parseInt(amount);
        console.log(ACHLimit, "limit");
  
        
        if (amountInFigures > ACHLimit) {
          notify.error({
            title: "ERROR",
            message: "Amount Can't be more than ACH Limit",
            id: "Amount more than  ACH Limit",
          });
        }
        if(amountInFigures > parseInt(accountDetails?.available_balance)){
          notify.error({
            title: "ERROR",
            message: "Insufficient Balance",
            id: "Insufficient Balance",
          });
        }
  
        if(!(amountInFigures > ACHLimit && amountInFigures > parseInt(accountDetails?.available_balance))){
            document.getElementById('PurposeTransfer')?.focus()
        }
        setdebitAmount(amount)
      }
    };
    // Format the date as yyyy-mm-dd
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = yyyy + '-' + mm + '-' + dd
      //const { t } = useTranslation();
    
      // const swal = require('sweetalert');
    
      // function closeModal(formName) {
      //     let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
      //     var closedModalName = t(formName.toLowerCase().replace(/\s/g, ''));
    
      //     if (userInfo.lang.toLowerCase().slice(0, 2) === 'en') {
      //         swal({
      //             title: 'Are you sure?',
      //             text: "You're about to close the '" + closedModalName + "' form",
      //             icon: 'warning',
      //             buttons: ['Cancel', 'Yes, Close Form'],
      //             dangerMode: true
      //         }).then((result) => {
      //             if (result) {
      //                 var minimizedModals = [];
      //                 var formName = localStorage.getItem('formName');
      //                 if (localStorage.getItem('namesOfMinimizedModals')) {
      //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
      //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
      //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
      //                 }
      //                 document.getElementById('globalModalCloseBtn').click();
      //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
      //             }
      //         });
      //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'fr') {
      //         swal({
      //             title: 'Es-tu Sûr?',
      //             text: "Vous êtes sur le point de fermer le '" + closedModalName + "' formulaire",
      //             icon: 'warning',
      //             buttons: ['Annuler', 'Oui, Fermer Le Formulaire'],
      //             dangerMode: true
      //         }).then((result) => {
      //             if (result) {
      //                 var minimizedModals = [];
      //                 var formName = localStorage.getItem('formName');
      //                 if (localStorage.getItem('namesOfMinimizedModals')) {
      //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
      //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
      //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
      //                 }
      //                 document.getElementById('globalModalCloseBtn').click();
      //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
      //             }
      //         });
      //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'sp') {
      //         swal({
      //             title: 'Estas Seguro?',
      //             text: "Estás a punto de cerrar '" + closedModalName + "' forma",
      //             icon: 'warning',
      //             buttons: ['Cancelar', 'Sí, Cerrar Formulario'],
      //             dangerMode: true
      //         }).then((result) => {
      //             if (result) {
      //                 var minimizedModals = [];
      //                 var formName = localStorage.getItem('formName');
      //                 if (localStorage.getItem('namesOfMinimizedModals')) {
      //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
      //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
      //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
      //                 }
      //                 document.getElementById('globalModalCloseBtn').click();
      //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
      //             }
      //         });
      //     }
      // }
      return (
        <div>
          <Notifications position={"top-center"} zIndex={99999999999999999999} limit={5}/>
          <div className="zoom2">
       
              <div>
          <ActionButtons />
    
          </div>
            <hr />
            <header
                    className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                    style={{
                      background:
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`,
                      marginLeft: "-20px",
                      marginRight: "-20px",
    
                     
                    textAlign: "center"
                    }}
                  >
                    ACH Credit Entry
                  </header>
                  
            <Row className="g-2">
              <Row>
                <Col md={8}>
                  <br />
                  <Card
                    className="bg-light"
                    border="light"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                  >
                    <Card.Body >
                      <div style={{width:"",background: "" }}>
                        <div className=" align-items center " >
                          <InputField
                            label={"Deal No (Except Rate)"}
                            type="number"
                            labelWidth={"20%"}
                            inputWidth={"22%"}
                            onKeyDown={(e) => { switchFocus(e, "accountNumber") }}
                          />
                        </div>
                        <br />
                        <div className="achc--payers" style={{background: ""}}>
                          <div className="payer--fields" style={{background: ""}}>
                            <div className="flex--1">
                              <div style={{flex: 0.8}}>
                              <InputField
                              id={"accountNumber"}
                              label={"Payer Account"}
                              labelWidth={"35.5%"}
                              inputWidth={"40%"}
                              type="number"
                              required={true}
                              value={generalState?.accountNumber}
                              onChange={(e) => {
                                setGeneralState({
                                  accountNumber: e.target.value,
                                });
                              }}
                              onFocus={() => {
                                setAccountNumber(generalState?.accountNumber);
                                setAccNum(generalState?.accountNumber);
                                setSourceAccountDefaultValue(
                                  generalState?.accountNumber
                                );
                              }}
                              onKeyDown={
                              onAccountNumberEnter
                              // switchFocus(e, "receivingBanks");
                              }
                            />
                              </div>
                           
                            {/* &nbsp; */}
                            <div style={{flex: 0.2}}>
                            {/* <InputField disabled={true} inputWidth={"100%"} /> */}
                            </div>
                            
                            </div>
                           
                          </div>
                          
                          <div className="payer--btn" style={{background: ""}}>
                          <ButtonComponent
                              label="Sign Ver"
                              buttonBackgroundColor="rgb(21 163 183)"
                              buttonWidth="50%"
                              buttonHeight="25px"
                              buttonColor="white"
                              onClick={() => setShowSignatureVerfication(true)}
                            />
                                                {showSignatureverification && (
    
    <Modal
      show={showSignatureverification}
      size="lg"
      centered
      style={{ height: "100%" }}
      className="shadow-md shadow-black"
    >
      <div className="flex items-center justify-between mx-2 p-2">
        <div className="font-extrabold text-black">View Document</div>
        <div
          className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
          onClick={() => setShowSignatureVerfication(false)}
        >
          x
        </div>
      </div>
      <Modal.Body>
        {/* <ImageVerification accountNumber={imageAccount} /> */}
        <ImageVerification accountNumber={accountNumber} />
      </Modal.Body>
    </Modal>
    // 1683042691
    )}
                          </div>
                        </div>
                        <br />
    
                        <div className="achc--payer"style={{background: ""}}>
                          <div className="account-name" style={{background: ""}}>
                            <InputField
                            id = {'accountName'}
                              label={"Account Name"}
                              labelWidth={"28%"}
                              inputWidth={"72%"}
                              value={accountName}
                              disabled = {true}
                            />
                          </div>
                        
                        </div>
                        {/* <br />
                        <div className="achc--payer">
                          <div className="account-name">
                            <InputField
                              label={"Product"}
                              labelWidth={"28%"}
                              inputWidth={"48%"}
                              type="text"
                              disabled={true}
                            />
                          </div>
                          
                        </div> */}
                     
                        <hr/>
                        <div className="achc--payer" >
                          <div className="account-name">
                          <ListOfValue
                        id={'receivingBanks'}
                          label={"Receiving Bank"}
                          labelWidth={"28%"}
                          inputWidth={"48%"}
                          required={true}
                          data={receivingbankslovs}
                          onKeyDown={(e) => {
                                
                          
                            switchFocus(e, "BBAN");
                            }}
                        />
                          </div>
                         
                        </div>
                        <br />
                        <div className="achc--payer" style={{background: ""}}>
                          <div className="beneficiary-account" style={{background: ""}}>
                          <InputField
                        id={'BBAN'}
                          label={"Beneficiary Account"}
                          labelWidth={"36%"}
                          inputWidth={"40%"}
                          type="number"
                          required={true}
                          // onKeyDown={
                          //   handleOnBeneficiaryEnter
                           
                            
                          // }
                          onKeyDown={                                 
                            handleOnBeneficiaryEnter
                            // switchFocus(e, "BeneficiaryName");
                          }
                          onChange={(e)=>setBeneficiaryNumber(e.target.value)}
                        />
                          </div>
                          <div className="space"></div>
                          <div className="date--flex" style={{background: ""}}>
                            <InputField
                            id={'Date'}
                              label={"Value Date"}
                              type="date"
                              required={true}
                              labelWidth={"35%"}
                              inputWidth={"65%"}
                              value = {formattedDate}
                            />
                          </div>
                        </div>
                        <br />
                        <div className="achc--payer">
                          <div className="account-name">
                          <InputField
                        id={'BeneficiaryName'}
                          label={"Beneficiary Name"}
                          labelWidth={"28%"}
                          inputWidth={"72%"}
                          type="text"
                          required={true}
                          onKeyDown={(e) => {
                                
                           
                            switchFocus(e, 'currencyLov');
                            }}
                        />
                          </div>
                          
                        </div>
                     
                        <hr />
                        <div className="achc--payer" style={{ background: "" }}>
                      <div className="currency" style={{ background: "" }}>
                      <SelectField
                        id={'currencyLov'}
                          label={"Currency"}
                          labelWidth={"49%"}
                          inputWidth={"52%"}
                          data={[{ label: "KES", value: "010" }]}
                          onKeyPress={(e) => {
                            switchFocus(e, 'amount');
                            }}
                            defaultValue={'010'}

                        />
                      </div>
                      <div className="space"></div>
                      <div className="space"></div>
                      <div className="space_sm"></div>
                      {/* <div className="space"></div> */}

                      <div className="doc-numbers" style={{ background: "" }}>
                        {/* <div className="achc--payer"> */}
                          {/* <div className="account-name"> */}
                          <InputField
                        id={'amount'}
                          label={"Amount"}
                          labelWidth={"55%"}
                          inputWidth={"40%"}
                          type="number"
                          textAlign={"right"}
                          required={true}
                          onKeyDown={                                 
                            handleBalanceCheck
                            // switchFocus(e, "BeneficiaryName");
                          }
                         
                          onChange={(e) => setAmount(e.target.value)}
                        />
                          {/* </div> */}
                          {/* <div className="space"></div> */}
                          {/* <div className="amount-disabled">
                        <InputField disabled={true} inputWidth={"100%"} />
                        </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                        <br />
                        <div className="achc--payer" style={{background: ""}}>
                          <div className="beneficiary-account" style={{background: ""}}>
                          <InputField
                          label={"Rate"}
                          labelWidth={"36.3%"}
                          inputWidth={"38%"}
                          type="text"
                          textAlign={'right'}
                          required={true}
                          disabled={true}
                          value={rate}
                        />
                          </div>
                          <div className="space"></div>
                          <div className="date--flex" style={{background: ""}}>
                          <InputField
                          label={"Debit Amount"}
                         
                          required={true}
                          labelWidth={"75%"}
                          inputWidth={"50%"}
                          value={debitAmount}
                          textAlign={'right'}
                          disabled={true}
                        />
                          </div>
                        </div>
                        <hr />
                        <div className="achc--payer">
                          <div className="account-name">
                          <TextAreaField
                        id={'PurposeTransfer'}
                          label={"Purpose of Transfer"}
                          labelWidth={"28%"}
                          inputWidth={"68%"}
                          type="text"
                          required={true}
                          onKeyDown={(e) => {
                                
                         
                           switchFocus(e, 'ScanDoc');
                           }}
                        />
                          </div>
                          
                        </div>
                        
                       <br />
                        <div className="achc--payer" style={{background: ""}}>
                        <div className="account-name" style={{background: ""}}>
                            <div className="achc--payer" style={{background: ""}}>
                            <div className="account-name"style={{background: ""}}>
                            <InputField
                            id={'ScanDoc'}
                              label={"Scan Document Number"}
                              labelWidth={"40%"}
                              inputWidth={"60%"}
                              onChange={(e) =>
                                setDocumentNumber(e.target.value)
                              }
                              onKeyDown={(e) => {
                                
                         
                                switchFocus(e, 'DocRef');
                                }}
                              required={true}
                            />
                            </div>
                            <div className="small-space"></div>
                            <div className="amount-disabled" style={{background: ""}}>
                            <div onClick={() => handleShowDocumentModal()}>
    
    <ButtonComponent label={'View Document.'} onClick={() => handleClick()} />
    
    {/**modal section */}
    {sweetAlertConfirmed && (
    
      <Modal
        show={sweetAlertConfirmed}
        size="lg"
        centered
        style={{ height: "100%" }}
        className="shadow-md shadow-black"
      >
        <div className="flex items-center justify-between mx-2 p-2">
          <div className="font-extrabold text-black">View Document</div>
          <div
            className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
            onClick={() => setSweetAlertConfirmed(false)}
          >
            x
          </div>
        </div>
        <Modal.Body>
          {/* <ImageVerification accountNumber={imageAccount} /> */}
          <DocumentViewing documentID={documentNumber} />
        </Modal.Body>
      </Modal>
      // 1683042691
    )}
    </div>
            </div>
            </div>
          </div>
                          
                        
                          <div className="doc-number" style={{background: ""}}>
                          <InputField
                          id={'DocRef'}
                              label={"Cheque Number"}
                              labelWidth={"58%"}
                              inputWidth={"42%"}
                              required = {true}
                            />
                          </div>
                        </div>
                        
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Right Card */}
                <Col md={4}>
                 <br />
                  <AccountSummary accountNumber={generalState?.accountNumber} setAccountDetails={setAccountDetails}/>
                  <br />
                  <Card
                    className="bg-light"
                    border="light"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                  >
                    <Card.Body>
                      <div
                        className="read-only-section"
    
                        // style={{ flex: 0.3 }}
                      >
    
                        {/* <header
                    className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                    style={{
                      background:
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`,
                     textAlign: "center",
                     marginLeft: '-25px',
                     marginRight: '-25px',
                     marginTop: '-30px'
                    }}
                  >
                    Balance Before
                  </header> 
    
                        <br /> */}
                        {/* <InputField
                          label={"Avaialable Balance"}
                          type="number"
                          labelWidth={"70%"}
                          inputWidth={"70%"}
                          disabled={true}
                        />
                        <br />
                        <InputField
                          label={"Ledger Balance"}
                          type="number"
                          labelWidth={"70%"}
                          inputWidth={"70%"}
                          disabled={true}
                        /> */}
                       
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
                    marginLeft: '-25px',
                    marginRight: '-25px',
                    marginTop: '-30px'
                    }}
                  >
                    ACH Maximum Limit
                  </header> 
                  
                  <br />
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                          <div></div>
                          <div>
                            <InputField
                            // type="number"
                            disabled={true}
                            inputWidth={"100%"}
                             textAlign={'right'}
                             value={ACHLimit}
                          />
                          </div>
                          
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Row>
          </div>
        </div>
      );
}

export default ACHCHEQUES;