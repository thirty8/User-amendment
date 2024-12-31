import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
// import { Tabs } from "@mantine/core";
import swal from "sweetalert";

import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import { AiOutlineDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

import { API_SERVER } from "../../../../../config/constant";

import InputField from "../../../../../components/others/Fields/InputField";
import ImageVerification from "../../../../../components/others/ImageVerification";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import AccountSummary from "../../../../../components/others/AccountSummary";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Headerr from "../../../../../components/others/Header/Header";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../../../../../components/others/customtable";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import SearchModal from "../shares-transfer/components/SearchModal"
// import ListOfValue from "../../../components/others/ListOfValue";
const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
function SharesTransfer() {
    const [showSignatureVerification, setShowSignatureVerification] = useState(false);
    const openSignatureVerification = () => {
        setShowSignatureVerification(true);
    }
    const closeSignatureVerification = () => {
        setShowSignatureVerification(false);
    }

    const [findById, setFindById] = useState(false);
    const openFindByIDmodal = () => {
        setFindById(true);
    }
    
    const [findById2, setFindById2] = useState(false);
    const openFindByIDmodal2 = () => {
        setFindById2(true);
    }
    
    const [batchNumber, setBatchNumber] = useState("");
    const [documentNumber,setDocumentNumber] = useState("");
    const [orderingBBAN, setOrderingBBAN] = useState("");
    const [sharesAmount,setSharesAmount] = useState("");
    const [orderingNarration,setOrderingNarration] = useState("");
    const [beneficiaryAccount,setBeneficiaryAccount] = useState("");
    const [debitAccount, setDebitAccount] = useState("");
    const [Narration1,setNarration1] = useState("");
    const [Narration2,setNarration2] = useState("");
    const [effectiveDate,setEffectiveDate] = useState("");
    const [valueDate, setValueDate] = useState("");
    const [orderingAccountName, setOrderingAccountName] = useState("");

    const [formData,setFormData] = useState({});
    const [insertRow, setInsertRow] = useState([]);


    let array = []
    const [body, setBody] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [transType, setTransType] = useState("");
    const [DebitAccountCurrency, setDebitAccountCurrency] = useState("");
    const [DebitProduct, setDebitProduct] = useState("");

    const [CreditAccountCurrency, setCreditAccountCurrency] = useState("");
    const [beneficiaryName, setBeneficiaryName] = useState("");
    const [CreditProduct, setCreditProduct] = useState("");

    const [debitAmount, setDebitAmount] = useState("");
    const [accountDetails, setAccountDetails] = useState("");
    const [transTypeLOV, setTransTypeLOV] = useState([]);

    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
    );

    const [ViewDocument,setViewDocument] = useState(false);
    const openViewDocument = () => {setViewDocument(true)};
    const closeViewDocument = () => {setViewDocument(false)};

    const switchFocus = (e, nextFieldId) => {
        if (e.key === "Enter") {
            document.getElementById(nextFieldId).focus();
            console.log(document.getElementById(nextFieldId), "component");
        }
    }

    useEffect(() => {
        const getValueDate = () => {
            axios.get(API_SERVER + '/api/get-effective-date', { headers })
                .then((response) => {
                    const results = response.data[0].effective_date;
                    console.log(results, "sponse")

                    const sDate = new Date(results);
                    const year = sDate.getFullYear();
                    const month = String(sDate.getMonth() + 1).padStart(2, "0");
                    const day = String(sDate.getDate()).padStart(2, "0");
                    setEffectiveDate(`${year}-${month}-${day}`);
                    setValueDate(`${year}-${month}-${day}`);
                    // return formattedPostingDate;
                    // console.log(formattedPostingDate);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getValueDate();

    }, [])

    function formatNumber(num,id){
        if(num === undefined || num === "" ){
            return " ";
          }
        else{
        const regex = /[a-zA-Z]/;
        if(regex.test(num)==true){
          swal("Error","kindly ensure amount entered doesn't contain any letters","warning").then((result)=>{
            id.focus()
            id.select()
        })
      }else{
        const numericInput = String(num).replace(/[^0-9.]/g, '');  
            // Convert the input to a number and check if it's valid
        const number = parseFloat(numericInput);
      
          const formatted = number.toLocaleString("en-US", { minimumFractionDigits: 2 });
          // console.log({ formatted }, amount);
      
          return formatted;
    }
    }
    }

    const sharesAmountField = (e) =>{
        if (e.key === "Enter"){
        if (document.getElementById("amount").value < 25000) {
            swal({
                title: "Error",
                text: "Shares Amount inputted should be more than 25,000",
                icon: "warning",
                buttons: "OK",
                dangerMode: true,
            }).then((result) => {
                if (result) {
                var input = document.getElementById("amount");
                input.focus();
                }
                setSharesAmount("");
              });
        }else{
            var input = document.getElementById("orderingNarration");
            input.focus();
        }
    }
    }


    useEffect(() => {
        const getBatchNumber = () => {
            axios.get(API_SERVER + '/api/get-unique-ref', { headers })
                .then((response) => {
                    // console.log(response,'sponse eeee')
                    const results = response.data[0].unique_ref;
                    setBatchNumber(results)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getBatchNumber();

    }, [])


    const onenter = (e) => {
        if (e.key === "Enter") {
            setDebitAccount(e.target.value);
            // console.log(debitAccount,"wo y3 bi3")    
            axios
                .post(
                    API_SERVER + "/api/getBalance",
                    {
                        accountNumber: orderingBBAN,
                    },
                    { headers }
                )
                .then((response) => {
                    let results = response.data[0];
                    console.log(results, "sults")

                    if (results === undefined) {
                        swal({
                            title: "Invalid Account Number",
                            text: "The account number could not be found in our records..",
                            icon: "warning",
                            buttons: "OK",
                            dangerMode: true,
                        }).then((result) => {
                            if (result) {
                            setOrderingAccountName("");
                            setDebitAccount("");
                            var input = document.getElementById("orderingBBAN");
                            input.focus();
                            }
                          });
                    } else {
                        setOrderingAccountName(results?.account_descrp);
                        var input = document.getElementById("amount");
                        input.focus();
                    }
                })  
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const onEnterDown = (e) => {
        if (e.key === "Enter") {
                if (debitAccount !== beneficiaryAccount) {
                    axios
                        .post(
                            API_SERVER + "/api/getBalance",
                            {
                                accountNumber: e.target.value,
                            },
                            { headers }
                        )
                        .then((response) => {
                            let results = response.data[0];
                            console.log(results,"me wu ee")
        
                            if (results === undefined) {
                                swal({
                                    title: "Invalid Account Number",
                                    text: "The account number could not be found in our records..",
                                    icon: "warning",
                                    buttons: "OK",
                                    dangerMode: true,
                                }).then((result) => {
                                    if (result) {
                                    var input =  document.getElementById("creditaccount");
                                    input.focus();
                                    setBeneficiaryName("");
                                    }
                                  });
                               } else {
                                setBeneficiaryName(results?.account_descrp)
                                document.getElementById("valueDate")?.focus();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    swal({
                        title: "Error- 01135:",
                        text: "The Account Numbers are the same",
                        icon: "warning",
                        buttons: "OK",
                        dangerMode: true,
                    })
                }
            };
        }

    useEffect(() => {
        if (DebitAccountCurrency.length > 0 && CreditAccountCurrency.length > 0) {
            console.log("on enter", DebitAccountCurrency, CreditAccountCurrency)

            if (DebitAccountCurrency !== CreditAccountCurrency) {
                setCreditProduct("");
                setCreditAccountCurrency("");
                // setCreditAccountName("");
                swal({
                    title: "ERR-01822: Currency Mismatch",
                    text: "Credit And Debit Account Should Be Of The Same Currency. Please Check",
                    icon: "warning",
                    buttons: "OK",
                    dangerMode: true,
                });
            }
        }
    }, [DebitAccountCurrency, CreditAccountCurrency])

    useEffect(() => {
        if (accountDetails) {
          if (accountDetails.summary?.length > 0) {
            setOrderingAccountName(accountDetails?.summary[0]?.account_name);
            document.getElementById("document").focus();
          }
          console.log("ghanaaa", accountDetails.message);
          if (accountDetails.message) {
            console.log("togo", accountDetails.message);
    
            // setShowMessage(true);
          }
        }
      }, [accountDetails]);

    useEffect(()=>{
        setFormData(
            {
              orderingBBAN,
              sharesAmount,
              documentNumber,
              orderingNarration,
              beneficiaryAccount,
              valueDate,
              Narration1, 
              Narration2 
            })
    },[orderingBBAN,sharesAmount,documentNumber,orderingNarration,beneficiaryAccount,valueDate,Narration1,Narration2])

    console.log(formData,"heaa");

    function handleRemove(index) {
        setInsertRow((prev) => prev.filter((_, i) => i !== index));
      }

    const handleInsert = () =>
    {
       if (
           orderingBBAN === "" ||
           sharesAmount === "" ||
           documentNumber === "" || 
           orderingNarration === "" || 
           beneficiaryAccount === "" ||
           valueDate === "" ||
           Narration1 === "" 
       ) {
         swal({
           title: "Empty Fields",
           text: "Please Fill all form Data",
           icon: "warning",
           buttons: "OK",
         })
       }else {
         const [a,b,c,d,e,f,g,h] = Object.values(formData);
         setInsertRow((prev) => [
           ...prev,
           [ a,
             orderingAccountName,
             c,
             d,
             b,
             null,
             batchNumber,
             <ButtonComponent
               id="miniModalButton"
               onClick={() => handleRemove(insertRow.length)}
               label={<AiOutlineDelete />}
               buttonHeight={"25px"}
               buttonWidth={"100%"}
             /> 
           ],
         ]);
         setOrderingBBAN("");
         setOrderingAccountName("");
         setSharesAmount("");
         setDocumentNumber("");
         setBeneficiaryName("");
         setOrderingNarration("");
         setBeneficiaryAccount("");
         setNarration1("");
         setNarration2("");
         setValueDate("");
         document.getElementById("amount").value= " "
         document.getElementById("document").value= " "
         document.getElementById("orderingNarration").value= " "
         document.getElementById("narrationOne").value= " "
         document.getElementById("narrationTwo").value= " "

        //  setLeavesArray([]);
        //  setCharges(0);
        //  setCount((prev) => prev + 1);
       }
     }


    const handleRemoveAll = () => {
        if (insertRow.length !== 0) {
            swal({
                title: "Are you sure?",
                text: "This action will delete all records from the table",
                icon: "warning",
                buttons: ["Cancel", "OK"],
                dangerMode: true,
            }).then((result) => {
                if (result) {
                    setInsertRow([]);
                }
            });
        }
    }

    // function handleApply() {
    //     if (insertArray.length === 0) {
    //         swal({
    //             title: "No Data Found",
    //             text: "No record Inserted",
    //             icon: "warning",
    //             buttons: "OK",
    //         }).then((result) => {
    //             if (result) {
    //             }
    //         });
    //     } else {
    //         swal({
    //             title: "Submit?",
    //             text: "Are you sure you want to sumbit?",
    //             icon: "info",
    //             buttons: ["Cancel", "OK"],
    //         }).then((result) => {
    //             if (result) {
    //                 let chequeRequest;
    //                 try {
    //                     insertArray.map(async (row) => {
    //                         chequeRequest = await axios.post(
    //                             API_SERVER + "/api/cheque-book-req",
    //                             {
    //                                 accountLink: row[1],
    //                                 numberOfBooks: row[3],
    //                                 leavesNo: row[2],
    //                                 deliveryBranch: row[7],
    //                                 deliveryChannel: row[4],
    //                             },
    //                             { headers }
    //                         );
    //                         console.log(chequeRequest, "::::::cheque request in apply");
    //                     });
    //                     let responseMessage = chequeRequest?.data["responseMessage"];

    //                     swal({
    //                         title: "Success",
    //                         text: "All records sent for approval",
    //                         icon: "success",
    //                         buttons: "OK",
    //                     }).then((result) => {
    //                         if (result) {
    //                             setAccountNumber("");
    //                             setBranch("");
    //                             setLeaves("");
    //                             setChannel("");
    //                             setNumberOfBooks("");
    //                             setLeavesArray([]);
    //                             setAccountName("");
    //                             setDebitChargeAccount("");
    //                             setCharges("");
    //                             setInsertArray([]);
    //                             setShortDescription("");
    //                         }
    //                         // notify.success({
    //                         //   autoClose: checked,
    //                         //   title: "Recent",
    //                         //   message: responseMessage,
    //                         //   id: "Cheque book created",
    //                         // });
    //                         console.log(responseMessage, ":::responseMessage");
    //                     });
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //                 // let responseMessage = chequeRequest?.data["responseMessage"];
    //                 // console.log(chequeRequest, "::::::cheque request in apply");
    //                 // if (chequeRequest?.data["success"] === true) {
    //                 //   swal({
    //                 //     title: "Success",
    //                 //     text: responseMessage,
    //                 //     icon: "success",
    //                 //     buttons: "OK",
    //                 //   }).then((result) => {
    //                 //     if (result) {
    //                 //       setAccountNumber("");
    //                 //       setBranch("");
    //                 //       setLeaves("");
    //                 //       setChannel("");
    //                 //       setNumberOfBooks("");
    //                 //       setLeavesArray([]);
    //                 //       setAccountName("");
    //                 //       setDebitChargeAccount("");
    //                 //       setCharges("");
    //                 //     }
    //                 //     // notify.success({
    //                 //     //   autoClose: checked,
    //                 //     //   title: "Recent",
    //                 //     //   message: responseMessage,
    //                 //     //   id: "Cheque book created",
    //                 //     // });
    //                 //   });
    //                 // } else {
    //                 //   swal({
    //                 //     title: "Error",
    //                 //     text: responseMessage,
    //                 //     icon: "warning",
    //                 //     buttons: "OK",
    //                 //   }).then((result) => {
    //                 //     if (result) {
    //                 //     }
    //                 //   });
    //                 // }
    //             }
    //         });
    //     }
    // }

 
    const handleDocumentNumber = () => {
        if (documentNumber === "") {
        //   console.log("being clicked");
          swal({
            title: "ERR - 01346",
            text: "A Valid Document ID is required",
            icon: "warning",
            buttons: "OK",
          })
        } else {
            openViewDocument();
        }
      }

      function handleSelected(value) {
        setDebitAccount(value.accountNumber);
        setOrderingBBAN(value.accountNumber);
        document.getElementById("orderingBBAN").focus();
        setFindById(false);
    }

    function handleSelected2(value) {
        setBeneficiaryAccount(value.accountNumber);
        setBeneficiaryName(value.accountName);
        document.getElementById("creditaccount").focus();
        setFindById2(false);
    }

    function handleAmountBlur(){
        setSharesAmount(formatNumber(sharesAmount,"amount"))
    }

    return (
        <div >
                <ActionButtons />
                <div style={{ display: "flex", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", backgroundColor: "white", padding: "10px 0px 10px 0px" }}>
                    <div style={{ flex: 0.005 }}></div>
                    <div style={{ flex: 0.99}}>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <InputField
                                label={"Batch Number"}
                                labelWidth={"10%"}
                                inputWidth={"10%"}
                                value={batchNumber}
                                disabled
                            />
                        </div>
                        <hr className="my-[5px] mt-1.5" />
                        <div style={{display:"flex",justifyContent:"flex-end",paddingRight:"14px"}}>
                        <ButtonComponent label={"Signature Verification"} buttonHeight={"25px"} buttonWidth={"170px"} onClick={openSignatureVerification} />
                        </div>

                        <div style={{ display: "flex",gap:"8px",padding: "3px 12px 15px 12px",marginTop:"5px",marginBottom: "10px"}}>
                            <div style={{flex:0.75}}>
                                <div  style={{padding: "15px 0px 14px 10px",borderRadius:"5px",marginBottom:"18px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", columnGap: "70px",rowGap: "15px", marginBottom: "15px", marginTop: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{flex:0.7}}>
                                            <InputField
                                                label={"Share Account"}
                                                labelWidth={"38.5%"}
                                                inputWidth={"61.5%"}
                                                onChange={(e) => { setOrderingBBAN(e.target.value) }}
                                                onKeyDown={(e) => { onenter(e); }}
                                                id={"orderingBBAN"}
                                                value={orderingBBAN}
                                                required
                                            />
                                        </div>
                                        <div style={{flex:0.1}}>
                                            <ButtonComponent
                                                label={"Find"}
                                                buttonHeight={"25px"}
                                                buttonWidth={"100%"}
                                                onClick={openFindByIDmodal}
                                            />
                                        </div>
                                    </div>
                                            <InputField
                                                label={"Effective Date"}
                                                labelWidth={"30%"}
                                                inputWidth={"35%"}
                                                id={"effectiveDate"}
                                                type={"date"}
                                                value={effectiveDate}
                                                onChange={(e) => setEffectiveDate(e.target.value)}
                                                // onKeyDown={(e) => {
                                                //     switchFocus(e, "doc_ref_no")
                                                // }}
                                                disabled
                                            />
                                 </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "15px" }}>
                                    <InputField
                                        label={"Account Name"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"38.6%"}
                                        value={orderingAccountName}
                                        disabled
                                    />
                                    <InputField
                                        label={"Amount"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"23%"}
                                        id={"amount"}
                                        onChange={(e)=>{setSharesAmount(e.target.value)}}
                                        onKeyPress={sharesAmountField}
                                        // type={"number"}
                                        onBlur={handleAmountBlur}
                                        value={sharesAmount}
                                        textAlign={"right"}
                                        required
                                    />
                                    {/* <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{flex:0.39}}>
                                            <InputField
                                                label={"Document Ref No."}
                                                labelWidth={"39%"}
                                                inputWidth={"62%"}
                                                id={"document"}
                                                type={"number"}
                                                onChange={(e)=>{setDocumentNumber(e.target.value)}}
                                                onKeyPress={(e) => {
                                                    switchFocus(e, "orderingNarration")
                                                }}
                                                required
                                            />
                                        </div>
                                        <div style={{ flex: 0.195 }}>
                                            <ButtonComponent
                                                label={"View Doc."}
                                                buttonHeight={"25px"}
                                                buttonWidth={"80px"}
                                                onClick={handleDocumentNumber}
                                            />
                                        </div>
                                    </div> */}
                                    <InputField
                                        label={"Ordering Narration"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"72.5%"}
                                        id={"orderingNarration"}
                                        onKeyPress={(e) => {
                                            switchFocus(e, "creditaccount")
                                        }}
                                        onChange={(e)=>{setOrderingNarration(e.target.value)}}
                                        required
                                    />
                                </div>
                                </div>
                            
                                <div style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding: "15px 0px 14px 10px",borderRadius:"5px",marginBottom:"18px",marginTop: "10px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", columnGap: "70px", rowGap: "15px", marginBottom: "15px", marginTop: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{flex:0.7}}>
                                            <InputField
                                                label={"Beneficiary Share Account"}
                                                labelWidth={"38.5%"}
                                                inputWidth={"61.5%"}
                                                onChange={(e) => { setBeneficiaryAccount(e.target.value) }}
                                                onKeyDown={(e) => { onEnterDown(e);}}
                                                id={"creditaccount"}
                                                value={beneficiaryAccount}
                                                required
                                                // onKeyPress={(e) => {
                                                //     switchFocus(e, "amount")
                                                // }}
                                            />
                                        </div>
                                        <div style={{flex:0.1}}>
                                            <ButtonComponent
                                                label={"Find"}
                                                buttonHeight={"25px"}
                                                buttonWidth={"100%"}
                                                onClick={openFindByIDmodal2}
                                            />
                                        </div>
                                    </div>
                                    <InputField
                                        label={"Value Date"}
                                        labelWidth={"30%"}
                                        inputWidth={"35%"}
                                        id={"valueDate"}
                                        type={"date"}
                                        value={valueDate}
                                        onChange={(e) => setValueDate(e.target.value)}
                                        onKeyDown={(e) => {
                                            switchFocus(e,"ReferenceNumber")
                                        }}
                                        required
                                    />
                                 </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "15px" }}>
                                <InputField
                                        label={"Account Name"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"38.6%"}
                                        value={beneficiaryName}
                                        disabled
                                    />
                                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <div style={{flex:0.39}}>
                                            <InputField
                                                label={"Doc Ref No."}
                                                labelWidth={"39%"}
                                                inputWidth={"62%"}
                                                id={"ReferenceNumber"}
                                                type={"number"}
                                                // onChange={(e)=>{setDocumentNumber(e.target.value)}}
                                                onKeyPress={(e) => {
                                                    switchFocus(e, "narrationOne")
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 0.195 }}>
                                            <ButtonComponent
                                                label={"View Doc."}
                                                buttonHeight={"25px"}
                                                buttonWidth={"80px"}
                                                onClick={handleDocumentNumber}
                                            />
                                        </div>
                                    </div>
                                    <InputField
                                        label={"Narration 1"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"72.5%"}
                                        id={"narrationOne"}
                                        onKeyPress={(e) => {
                                            switchFocus(e, "narrationTwo")
                                        }}
                                        onChange={(e)=>{setNarration1(e.target.value)}}
                                        required
                                    />
                                    <InputField
                                        label={"Narration 2"}
                                        labelWidth={"14.2%"}
                                        inputWidth={"72.5%"}
                                        id={"narrationTwo"}
                                        onChange={(e)=>{setNarration2(e.target.value)}}
                                        // onKeyPress={(e) => {
                                        //     switchFocus(e, "debit_narration")
                                        // }}
                                        // required
                                    />
                                </div>
                            </div>
                            </div>
                            <div style={{ flex: 0.25 }}>
                                <div style={{ display: "grid", gridTemplateRows: "1fr", rowGap: "15.5px", paddingTop: "3px" }}>
                                    <AccountSummary accountNumber={debitAccount} setAccountDetails={setAccountDetails} />
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex",margin:"10px 0px 10px 0px"}}>
                            <div style={{flex:0.25}}></div>
                            <div style={{display:"flex",justifyContent:"space-between",flex:0.42}}>
                                    <ButtonComponent
                                        label={"Insert"}
                                        buttonWidth={"20%"}
                                        type={"button"}
                                        buttonHeight={"30px"}
                                        onClick={handleInsert}
                                        buttonIcon={<BiAddToQueue />}
                                    />
                                    <ButtonComponent
                                        label={"Apply"}
                                        buttonWidth={"20%"}
                                        type={"button"}
                                        buttonHeight={"30px"}
                                    />
                                    <ButtonComponent
                                        label={"Remove All"}
                                        buttonWidth={"22%"}
                                        type={"button"}
                                        buttonHeight={"30px"}   
                                         buttonIcon={<AiOutlineDelete/>}
                                        onClick={handleRemoveAll}
                                    />
                            </div>
                            <div style={{flex:0.33}}></div>
                        </div>
                        <CustomTable
                            headers={[
                                "Account Number",
                                "Account Name",
                                "Ref Number",
                                "Narration",
                                "Shares Amount",
                                "Branch",
                                "Tin Number",
                                ""
                            ]}
                        data={insertRow}
                        />
                    </div>
                    <hr className="my-[3px] mt-3" />
                    <div style={{ flex: 0.005}}></div>
                </div>
            <Modal size="lg" show={showSignatureVerification}>
                <Modal.Header
                    style={{
                        background:
                            `url(` +
                            window.location.origin +
                            `/assets/images/headerBackground/` +
                            getTheme.theme.headerImage +
                            `)`,
                    }}
                >
                    <div className="w-full -mb-4 flex justify-between ">
                        <Modal.Title
                            style={{
                                fontSize: "14.5px",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            <p>View Photo And Signature</p>
                        </Modal.Title>
                        <svg
                            onClick={closeSignatureVerification}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            style={{ padding: "10px" }}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ background: "white", height: "auto" }}>
                    <ImageVerification accountNumber={debitAccount} />
                </Modal.Body>
            </Modal>
            <Modal
          show={ViewDocument}
          size="lg"
          centered
          style={{ height: "100%" }}
          className="shadow-md shadow-black"
        >
          <div className="flex items-center justify-between mx-2 p-2">
            <div className="font-extrabold text-black">View Document</div>
            <div
              className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
              onClick={() => closeViewDocument}
            >
              x
            </div>
          </div>
          <Modal.Body>
            <DocumentViewing documentID={documentNumber} />
          </Modal.Body>
        </Modal>
        <SearchModal showModal={findById} setShowModal={setFindById} handleSelected={handleSelected}/>
        <SearchModal showModal={findById2} setShowModal={setFindById2} handleSelected={handleSelected2}/>
        </div>
    )
}

export default SharesTransfer;