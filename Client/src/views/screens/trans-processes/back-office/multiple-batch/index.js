import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
// import { Tabs } from "@mantine/core";
import swal from "sweetalert";

import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
import { AiOutlineDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import Header from "../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../../components/others/AccountSummary";
// import ImageVerification from "../../../../components/ImageVerification";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import ImageVerification from "../../../../../components/others/ImageVerification";
import SearchModal from "../../../teller-ops/components/CustomModal";
import CustomTable from"../../../teller-ops/components/CustomTable";
import CustomButtons from "../../../../../components/others/CustomButtons";
// import ListOfValue from "../../../components/others/ListOfValue";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function MultipleBatchPayment () {
  const [showSignatureVerification, setShowSignatureVerification] =
    useState(false);
  const openSignatureVerification = () => {
    setShowSignatureVerification(true);
  };
  const closeSignatureVerification = () => {
    setShowSignatureVerification(false);
  };

  const [findById, setFindById] = useState(false);
  const openFindByIDmodal = () => {
    setFindById(true);
  };

  const [creditAccount, setCreditAccount] = useState("");
  const [creditAccountChange, setCreditAccountChange] = useState("");
  const [creditAccountName, setCreditAccountName] = useState("");
  const [debitAccountName, setDebitAccountName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [debitNarration, setDebitNarration] = useState("");
  const [creditNarration, setCreditNarration] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [numberOfCheques, setNumberOfCheques] = useState("");

  const [selectedChequeCategory, setSelectedChequeCategory] = useState("");
  const [chequeCategory, setChequeCategory] = useState([]);
  const [selectedIssuingBankCode, setSelectedIssuingBankCode] = useState("");
  const [issuingBankCode, setIssuingBankCode] = useState([]);
  const [clearingAccount, setClearingAccount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [voucherDate, setVoucherDate] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [orderingBBAN, setOrderingBBAN] = useState("");
  const [sharesAmount, setSharesAmount] = useState("");
  const [orderingNarration, setOrderingNarration] = useState("");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
  const [debitAccount, setDebitAccount] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [transactionChoice, setTransactionChoice] = useState("");
  
  const [orderingAccountName, setOrderingAccountName] = useState("");

  const [formData, setFormData] = useState({});
  const [insertRow, setInsertRow] = useState([]);

  let array = [];
  const [transactionType,setTransactionType] = useState([]);
  const [chequeData, setChequeData] = useState([]);
  const [body, setBody] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [transType, setTransType] = useState("");
  const [DebitAccountCurrency, setDebitAccountCurrency] = useState("");
  const [DebitProduct, setDebitProduct] = useState("");
  const [payersAccount, setPayersAccount] = useState("");
  const [CreditAccountCurrency, setCreditAccountCurrency] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [CreditProduct, setCreditProduct] = useState("");

  const [debitAmount, setDebitAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [transTypeLOV, setTransTypeLOV] = useState([]);

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [ViewDocument, setViewDocument] = useState(false);
  const openViewDocument = () => {
    setViewDocument(true);
  };
  const closeViewDocument = () => {
    setViewDocument(false);
  };

  const switchFocus = (e, nextFieldId) => {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId)?.focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  };

  let testing = chequeData.length;
  let chqAmnt = [];
  const [chequeAmount, setChequeAmount] = useState([]);

  const sum = chequeAmount.reduce((accumulator, subarray) => {
    const number = Number(subarray[0]);
    if (!isNaN(number)) {
      return accumulator + number;
    }
    return accumulator;
  }, 0);

  //   console.log(sum,"sum")
    console.log(numberOfCheques,"eah yeah yeah")
    console.log(testing,"oleee")

//   const childFunction = () => {
//     if(chequeData.length == numberOfCheques){
//     axios
//       .post(
//         API_SERVER + "/api/applyChequeDepositForm",
//         {
//           creditAccount: creditAccount,
//           chequeNumber: chequeNumber,
//           totalAmount: totalAmount.replaceAll(",", ""),
//           chequeAmount: sum.toString(),
//           gridCount: testing.toString(),
//           batchNumber: batchNo,
//           username: "WELBECK",
//           hostname: "0000",
//           formCode: "OCHD",
//         },
//         { headers }
//       )
//       .then((response) => {
//         const results = response.data.message;
//         if (response.data.success === "000") {
//           swal({
//             title: "Success",
//             text: results,
//             icon: "success",
//             buttons: "OK",
//             dangerMode: true,
//           }).then(() => {
//             setClearingAccount("");
//             document.getElementById("creditAccount").value = " ";
//             setCreditAccountName("");
//             setTotalAmount("");
//             document.getElementById("totalAmount").value = " ";
//             setNumberOfCheques("");
//             document.getElementById("numberOfCheques").value = " ";
//             setSelectedChequeCategory("");
//             setSelectedIssuingBankCode("");
//             setVoucherDate("");
//             document.getElementById("voucherDate").value = " ";
//             setClearingAccount("");
//             document.getElementById("clearingAccount").value = " ";
//             setAccountName("");
//             document.getElementById("clearingAccountName").value = " ";
//             setChequeNumber("");
//             document.getElementById("chequeNumber").value = " ";
//             setPayersAccount("");
//             document.getElementById("payersAccount").value = " ";
//             setCreditNarration("");
//             setAmount("");
//             document.getElementById("amount").value = " ";
//             document.getElementById("creditNarration").value = " ";
//             setDebitNarration("");
//             document.getElementById("debitNarration").value = " ";

//             setChequeData([]);
//           });
//         } else {
//           swal({
//             title: "Error",
//             text: response.data.message,
//             icon: "warning",
//             buttons: "OK",
//             dangerMode: true,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }else{
//       swal({
//         title: "Error",
//         text: "Check number of cheques",
//         icon: "warning",
//         buttons: "OK",
//         dangerMode: true,
//       });
//     }
//   };

//   React.useImperativeHandle(ref, () => ({
//     childFunction: childFunction,
//   }));

  useEffect(() => {
    const getValueDate = () => {
      axios
        .get(API_SERVER + "/api/get-effective-date", { headers })
        .then((response) => {
          const results = response.data[0].effective_date;
          console.log(results, "sponse");

          const sDate = new Date(results);
          const year = sDate.getFullYear();
          const month = String(sDate.getMonth() + 1).padStart(2, "0");
          const day = String(sDate.getDate()).padStart(2, "0");
          setEffectiveDate(`${year}-${month}-${day}`);
          setValueDate(`${year}-${month}-${day}`);
          setVoucherDate(`${year}-${month}-${day}`);
          // return formattedPostingDate;
          // console.log(formattedPostingDate);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getValueDate();

    const getTransactionType = () => {
      axios
        .get(API_SERVER + "/api/getBatchTransactionType", { headers })
        .then((response) => {
          const results = response.data;
          results.map((i)=>{array.push({label: i.actual_code + "  -  " + i.description ,value:i.actual_code})})
          setTransactionType(array);

        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTransactionType();
  }, []);

  // useEffect(() => {
  //   const loadBatchNumber = () => {
  //     axios
  //       .get(API_SERVER + "/api/get-unique-ref", { headers })
  //       .then((response) => {
  //         const results = response.data[0].unique_ref;
  //         console.log(results, "sponse");

  //         // results.map((i)=>{array.push({label: i.actual_code + "  -  " + i.description ,value:i.actual_code})})
  //         // setTransactionType(array);
  //         setBatchNumber(results)

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   loadBatchNumber();
  // }, []);

  function formatNumber(num, id) {
    if (num === undefined || num === " " || num === "NaN") {
      return " ";
    } else {
      const regex = /[a-zA-Z]/;
      if (regex.test(num) == true) {
        swal(
          "Error",
          "kindly ensure amount entered doesn't contain any letters",
          "warning"
        ).then((result) => {
          id.focus();
          id.select();
        });
      } else {
        const numericInput = String(num).replace(/[^0-9.]/g, "");
        // Convert the input to a number and check if it's valid
        const number = parseFloat(numericInput);

        const formatted = number.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        });
        // console.log({ formatted }, amount);

        return formatted;
      }
    }
  }

  useEffect(() => {
    const getBatchNumber = () => {
      if (transactionChoice){
      axios
        .get(API_SERVER + "/api/get-unique-ref", { headers })
        .then((response) => {
          // console.log(response,'sponse eeee')
          const results = response.data[0]?.unique_ref;
          setBatchNumber(results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  getBatchNumber();
}, [transactionChoice]);

  const onenter = (e) => {
    if (e.key === "Enter") {
      setCreditAccountChange(e.target.value);
      // console.log(debitAccount,"wo y3 bi3")
      axios
        .post(
          API_SERVER + "/api/getBalance",
          {
            accountNumber: debitAccount,
          },
          { headers }
        )
        .then((response) => {
          let results = response.data[0];
          console.log(results, "sults");

          if (results === undefined) {
            swal({
              title: "Invalid Account Number",
              text: "The account number could not be found in our records..",
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            }).then((result) => {
              if (result) {
                setDebitAccount("");
                setCreditAccountName("");
                var input = document.getElementById("debitAccount");
                input.focus();
              }
            });
          } else {
            setDebitAccountName(results?.account_descrp);
            var input = document.getElementById("documentRef");
            input.focus();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onCreditEnter = (e) => {
    if (e.key === "Enter") {
            if (debitAccount !== creditAccount) {
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
                                var input =  document.getElementById("creditAccount");
                                input.focus();
                                setCreditAccountName("");
                                }
                              });
                           } else {
                            setCreditAccountName(results?.account_descrp)
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
      console.log("on enter", DebitAccountCurrency, CreditAccountCurrency);

      if (DebitAccountCurrency !== CreditAccountCurrency) {
        setCreditProduct("");
        setCreditAccountCurrency("");
        setCreditAccountName("");
        swal({
          title: "ERR-01822: Currency Mismatch",
          text: "Credit And Debit Account Should Be Of The Same Currency. Please Check",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        });
      }
    }
  }, [DebitAccountCurrency, CreditAccountCurrency]);

  useEffect(() => {
    if (accountDetails) {
      if (accountDetails.summary?.length > 0) {
        setOrderingAccountName(accountDetails?.summary[0]?.account_name);
        document.getElementById("document")?.focus();
      }
      console.log("ghanaaa", accountDetails.message);
      if (accountDetails.message) {
        console.log("togo", accountDetails.message);

        // setShowMessage(true);
      }
    }
  }, [accountDetails]);

  useEffect(() => {
    setFormData({
      transactionType,
      debitAccount,
      documentNumber,
      debitNarration,
      creditAccount,
      creditAccountName,
      valueDate,
      amount,
      creditNarration,
      batchNumber
    });
  }, [
    transactionType,
    debitAccount,
    documentNumber,
    debitNarration,
    creditAccount,
    creditAccountName,
    valueDate,
    amount,
    creditNarration,
    batchNumber
  ]);

  console.log(formData,"heaa");

  function handleRemove(index) {
    setChequeData((prev) => prev.filter((_, i) => i !== index));
  }

  const handleRemoveAll = () => {
    if (chequeData.length !== 0) {
      swal({
        title: "Are you sure?",
        text: "This action will delete all records from the table",
        icon: "warning",
        buttons: ["Cancel", "OK"],
        dangerMode: true,
      }).then((result) => {
        if (result) {
          setChequeData([]);
        }
      });
    }
  };

  const handleDocumentNumber = () => {
    if (documentNumber === "") {
      //   console.log("being clicked");
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      });
    } else {
      openViewDocument();
    }
  };

  const handleInsert = () =>
  {
     if (
      transactionType === "" ||
      debitAccount === "" ||
      documentNumber === "" || 
      debitNarration === "" || 
      creditAccount === "" ||
      valueDate === "" ||
      creditNarration === "" ||
      batchNumber === "" ||
      amount === "" 
     ) {
       swal({
         title: "Empty Fields",
         text: "Please Fill all form Data",
         icon: "warning",
         buttons: "OK",
       })
     }else {
       const [a,b,c,d,e,f,g,h,i,j] = Object.values(formData);
       setInsertRow((prev) => [
         ...prev,
         [ e,
           creditAccountName,
           c,
           i,
           h,
           h,
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
      //  setOrderingBBAN("");
      //  setOrderingAccountName("");
      //  setSharesAmount("");
      //  setDocumentNumber("");
      //  setBeneficiaryName("");
      //  setOrderingNarration("");
      //  setBeneficiaryAccount("");
      //  setNarration1("");
      //  setNarration2("");
      //  setValueDate("");
      //  document.getElementById("amount").value= " "
      //  document.getElementById("document").value= " "
      //  document.getElementById("orderingNarration").value= " "
      //  document.getElementById("narrationOne").value= " "
      //  document.getElementById("narrationTwo").value= " "

      //  setLeavesArray([]);
      //  setCharges(0);
      //  setCount((prev) => prev + 1);
     }
   }

  function handleSelected(value) {
    setCreditAccount(value.accountNumber);
    setCreditAccountChange(value.accountNumber);
    setCreditAccountName(value.accountName);
    document.getElementById("totalAmount").focus();
    setFindById(false);
  }

  function handleAmountBlur() {
    setTotalAmount(formatNumber(totalAmount, numberOfCheques));
    setAmount(formatNumber(amount, creditNarration));
  }

  useEffect(() => {
    axios
      .post(API_SERVER + "/api/cheque-deposit", { payload: "" }, { headers })
      .then((response) => {
        setIssuingBankCode(response.data?.issuingBankCode);
        setChequeCategory(response.data?.chequeCategory);
      });
  }, []);

 
//     if (
//       creditAccount === "" ||
//       voucherDate === "" ||
//       totalAmount === "" ||
//       chequeNumber === "" ||
//       selectedChequeCategory === "" ||
//       creditNarration === "" ||
//       amount === "" ||
//       selectedIssuingBankCode === "" ||
//       clearingAccount === ""
//       // numberOfCheques === "" ||
//       // debitNarration === "" ||
//     ) {
//       swal({
//         title: "Empty Fields",
//         text: "Please Fill all form Data",
//         icon: "warning",
//         buttons: "OK",
//       });
//     } else {
//       const vDate = new Date(voucherDate);
//       const voucher_date = vDate
//         .toLocaleDateString("en-GB", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         })
//         .replace(/ /g, "-");

//       const valDate = new Date(valueDate);
//       const val_Date = valDate
//         .toLocaleDateString("en-GB", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         })
//         .replace(/ /g, "-");
//       axios
//         .post(
//           API_SERVER + "/api/postChequeDepositForm",
//           {
//             creditAccount: creditAccount,
//             voucherDate: voucher_date,
//             totalAmount: totalAmount.replaceAll(",", ""),
//             chequeAmount: amount.replaceAll(",", ""),
//             chequeNumber: chequeNumber,
//             chequeCategory: selectedChequeCategory,
//             narration1: creditNarration,
//             clearingAccount: clearingAccount,
//             issuingBankCode: selectedIssuingBankCode,
//             formCode: "OCHD",
//             username: JSON.parse(localStorage.getItem("userInfo")).id,
//             hostname: "0000",
//             batchNumber: batchNo,
//             valueDate: val_Date,

//             // numberOfCheques:numberOfCheques,
//             // hostname:"123454556",
//           },
//           { headers }
//         )
//         .then((response) => {
//           let results = response.data;
//           console.log(results, "sults");
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       if (chequeData.length < numberOfCheques) {
//         setTimeout(() => {
//           axios
//             .post(
//               API_SERVER + "/api/getChequeDepositData",
//               {
//                 batchNumber: batchNo,
//               },
//               { headers }
//             )
//             .then((response) => {
//               console.log(response, "Rows");
//               let results = response.data;
//               console.log(results, "chequeRows");

//               results.map((i) => {
//                 array.push([
//                   i.seq_no,
//                   i.value_date,
//                   i.cheque_no,
//                   i.cheque_type,
//                   i.bank_code,
//                   i.cheque_amount,
//                   i.narration1,
//                   <ButtonComponent
//                     id="miniModalButton"
//                     onClick={() => handleRemove(chequeData.length)}
//                     label={<AiOutlineDelete />}
//                     buttonHeight={"25px"}
//                     buttonWidth={"100%"}
//                   />,
//                 ]);
//               });
//               setChequeData(array);

//               setSelectedChequeCategory("");
//               setSelectedIssuingBankCode("");
//               setChequeNumber("");
//               document.getElementById("chequeNumber").value = " ";
//               setAmount("");
//               document.getElementById("amount").value = " ";
//               setCreditNarration("");
//               document.getElementById("creditNarration").value = " ";
//               setDebitNarration("");
//               document.getElementById("debitNarration").value = " ";
//               setVoucherDate("");
//               document.getElementById("voucherDate").value = " ";
//               setClearingAccount("");
//               setAccountName("");
//               document.getElementById("clearingAccountName").value = " ";
//               setPayersAccount("");
//               document.getElementById("payersAccount").value = " ";

//               results.map((i) => {
//                 chqAmnt.push([i.cheque_amount]);
//               });
//               setChequeAmount(chqAmnt);
//               console.log(chqAmnt, "test10");
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }, 1000);
//       } else {
//         swal({
//           title: "Error",
//           text: "Check number of cheques",
//           icon: "warning",
//           buttons: "OK",
//           dangerMode: true,
//         });
//       }
//     }
//   };

  const clearFields = () => {
    setClearingAccount("");
    document.getElementById("creditAccount").value = " ";
    setCreditAccountName("");
    setTotalAmount("");
    document.getElementById("totalAmount").value = " ";
    setNumberOfCheques("");
    document.getElementById("numberOfCheques").value = " ";
    setSelectedChequeCategory("");
    setSelectedIssuingBankCode("");
    setVoucherDate("");
    document.getElementById("voucherDate").value = " ";
    setClearingAccount("");
    document.getElementById("clearingAccount").value = " ";
    setAccountName("");
    document.getElementById("clearingAccountName").value = " ";
    setChequeNumber("");
    document.getElementById("chequeNumber").value = " ";
    setPayersAccount("");
    document.getElementById("payersAccount").value = " ";
    setCreditNarration("");
    setAmount("");
    document.getElementById("amount").value = " ";
    document.getElementById("creditNarration").value = " ";
    setDebitNarration("");
    document.getElementById("debitNarration").value = " ";
    setChequeData([]);
  };

  useEffect(() => {
    if (selectedIssuingBankCode === "002") {
      setClearingAccount("111220000001");
      setAccountName("ROKEL COMMERCIAL BANK");
    }
    if (selectedIssuingBankCode === "003") {
      setClearingAccount("111220000003");
      setAccountName("SIERRA LEONE COMMERCIAL BANK");
    }
    if (selectedIssuingBankCode === "005") {
      setClearingAccount("111220000005");
      setAccountName("GUARANTY TRUST BANK");
    }
    if (selectedIssuingBankCode === "006") {
      setClearingAccount("111220000006");
      setAccountName("FIBANK");
    }
    if (selectedIssuingBankCode === "007") {
      setClearingAccount("111220000007");
      setAccountName("FBN BANK");
    }
    if (selectedIssuingBankCode === "008") {
      setClearingAccount("111220000008");
      setAccountName("ECOBANK");
    }
    if (selectedIssuingBankCode === "009") {
      setClearingAccount("111220000010");
      setAccountName("ACCESS BANK");
    }
    if (selectedIssuingBankCode === "010") {
      setClearingAccount("111220000011");
      setAccountName("UNITED BANK FOR AFRICA(UBA)");
    }
    if (selectedIssuingBankCode === "011") {
      setClearingAccount("111220000012");
      setAccountName("SKYE BANK");
    }
    if (selectedIssuingBankCode === "012") {
      setClearingAccount("111220000013");
      setAccountName("ZENITH BANK");
    }
    if (selectedIssuingBankCode === "013") {
      setClearingAccount("111220000014");
      setAccountName("PHB BANK");
    }
    if (selectedIssuingBankCode === "014") {
      setClearingAccount("111220000016");
      setAccountName("COMMERCE AND MORTGAGE BANK PLC");
    }
    if (selectedIssuingBankCode === "015") {
      setClearingAccount("111220000015");
      setAccountName("APEX BANK (SL) LIMITED");
    }
  }, [selectedIssuingBankCode]);

  const compareFields = (e) => {
    if (e.key === "Enter") {
      if (creditAccount === clearingAccount) {
        swal({
          title: "Error",
          text: "Payer's and Payee's Account Number are the same!",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            var input = document.getElementById("clearingAccount");
            input.focus();
          }
          // setSharesAmount("");
        });
      }
    }
  };

  return (
    <div>
        <div style={{marginBottom:"10px"}}>
        <ActionButtons/>
        </div>
      <div
        style={{
          display: "flex",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "white",
          padding: "10px 0px 10px 0px",
        }}
      >
        <div style={{ flex: 0.005 }}></div>
        <div style={{ flex: 0.99 }}>
        <div style={{display:"flex",marginBottom:"15px"}}>
                <div style={{flex:0.3,padding:"0px 0px 0px 5px"}}>
                     <ListOfValue
                        label={"Transaction Type"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        onChange={(e) => {
                          setTimeout(() => {
                            const input =
                              document.getElementById("debitAccount");
                            input.focus();
                          }, 0);
                          ;setTransactionChoice(e);
                        }}
                        // onKeyDown={(e) => {
                        //   onenter(e);
                        // }}
                        // id={"creditAccount"}
                        data={transactionType}
                        // value={creditAccount}
                        required
                      /> </div>
                <div style={{flex:0.4}}> </div>
                <div style={{flex:0.3,paddingRight:"2px"}}> <InputField
                        label={"Batch Number"}
                        labelWidth={"60%"}
                        inputWidth={"40%"}
                        id={"batchNumber"}
                        value={batchNumber}
                        disabled
                        // onChange={(e) => {
                        //   setCreditAccount(e.target.value);
                        // }}
                        // onKeyDown={(e) => {
                        //   onenter(e);
                        // }}
                      /> </div>
            </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "0px 5px 15px 5px",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            
           
            <div style={{ flex: 0.75 }}>
              <div
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "15px 0px 14px 10px",
                  borderRadius: "5px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.35fr 0.65fr",
                    marginTop: "15px",
                    marginBottom:"15px",
                  }}
                >
                    <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <div style={{flex:0.55}}>
                      <InputField
                        label={"Principal Account"}
                        labelWidth={"40.5%"}
                        inputWidth={"59.5%"}
                        onChange={(e) => {
                          setDebitAccount(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          onenter(e);
                        }}
                        id={"debitAccount"}
                        value={debitAccount}
                        required
                      />
                    </div>
                    <div style={{ flex: 0.195}}>
                      <ButtonComponent
                        label={"Search"}
                        buttonHeight={"25px"}
                        buttonWidth={"75px"}
                        onClick={openFindByIDmodal}
                      />
                    </div>
                  </div>

                  <InputField
                    label={"Effective Date"}
                    labelWidth={"30%"}
                    inputWidth={"37%"}
                    id={"numberOfCheques"}
                    onKeyDown={(e) => {
                      switchFocus(e, "chequeCategory");
                    }}
                    onChange={(e) => {
                      setNumberOfCheques(e.target.value);
                    }}
                    type={"date"}
                    value={effectiveDate}
                    disabled
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    rowGap: "15px"
                  }}
                >
                     <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"      
                                 }}
                  >
                    <div style={{flex:0.51}}>
                  <InputField
                    label={"Account Name"}
                    labelWidth={"29.5%"}
                    inputWidth={"70.5%"}
                    value={debitAccountName}
                    id={"creditAccountName"}
                    disabled
                  />
                  </div>
                  <div style={{flex:0.09}}>
                  <ButtonComponent
                        label={"Sign. Ver"}
                        buttonHeight={"25px"}
                        buttonWidth={"100%"}
                        buttonIcon={CustomButtons["sigVer"].icon}
                        buttonBackgroundColor={CustomButtons["sigVer"].bgColor}
                        // onClick={openFindByIDmodal}
                      />
                </div>
                </div>
                <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"      
                                 }}
                  >
                    <div style={{flex:0.38}}>
                  <InputField
                    label={"Document Ref."}
                    labelWidth={"41.8%"}
                    inputWidth={"58.2%"}
                    onChange={(e)=>{setDocumentNumber(e.target.value)}}
                    id={"documentRef"}
                    onKeyDown={(e) => {
                      switchFocus(e, "narration");
                    }}
                    required
                  />
                  </div>
                  <div style={{flex:0.09}}>
                  <ButtonComponent
                        label={"View Doc."}
                        buttonHeight={"25px"}
                        buttonWidth={"100%"}
                        buttonIcon={CustomButtons["viewDoc"].icon}
                        buttonBackgroundColor={CustomButtons["viewDoc"].bgColor}
                        // onClick={openFindByIDmodal}
                      />
                </div>
                </div>
                <InputField
                    label={"Narration"}
                    labelWidth={"14%"}
                    inputWidth={"75%"}
                    id={"narration"}
                    onChange={(e) => {
                      setDebitNarration(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "creditAccount");
                    }}
                    required
                  />
                </div>
               
              </div>
              <div
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "18px 0px 10px 10px",
                  borderRadius: "5px",
                }}
              >
                  <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.35fr 0.65fr",
                    marginTop: "15px",
                    marginBottom:"15px",
                  }}
                >
                    <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <div style={{flex:0.55}}>
                      <InputField
                        label={"Credit Account"}
                        labelWidth={"40.5%"}
                        inputWidth={"59.5%"}
                        onChange={(e) => {
                          setCreditAccount(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          onCreditEnter(e);
                        }}
                        id={"creditAccount"}
                        value={creditAccount}
                        required
                      />
                    </div>
                    <div style={{ flex: 0.195}}>
                      <ButtonComponent
                        label={"Search"}
                        buttonHeight={"25px"}
                        buttonWidth={"75px"}
                        onClick={openFindByIDmodal}
                      />
                    </div>
                  </div>

                  <InputField
                    label={"Value Date"}
                    labelWidth={"30%"}
                    inputWidth={"37%"}
                    id={"valueDate"}
                    onKeyDown={(e) => {
                      switchFocus(e, "amount");
                    }}
                    onChange={(e) => {
                      setValueDate(e.target.value);
                    }}
                    type={"date"}
                    required
                                      />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    rowGap: "15px"
                  }}
                >
                         {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"      
                                 }}
                  >
                    <div style={{flex:0.37}}>
                  <InputField
                    label={"Credit Account"}
                    labelWidth={"40.5%"}
                    inputWidth={"59.5%"}
                    value={creditAccountName}
                    id={"creditAccountName"}
                    required
                  />
                  </div>
                  <div style={{flex:0.08}}>
                  <ButtonComponent
                        label={"Search"}
                        buttonHeight={"25px"}
                        buttonWidth={"100%"}
                      />
                </div>
                </div> */}
                     <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"      
                                 }}
                  >
                    <div style={{flex:0.49}}>
                  <InputField
                    label={"Account Name"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    value={creditAccountName}
                    id={"creditAccountName"}
                    disabled
                  />
                  </div>
                </div>
                <InputField
                    label={"Amount"}
                    labelWidth={"14.1%"}
                    inputWidth={"20.5%"}
                    id={"amount"}
                    onKeyDown={(e) => {
                      switchFocus(e, "creditNarration");
                    }}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    textAlign={"right"}
                    paddingRight={"5px"}
                    required
                    // value={formatNumber(amount)}
                  />
                <InputField
                    label={"Narration"}
                    labelWidth={"14.1%"}
                    inputWidth={"75%"}
                    id={"creditNarration"}
                    onKeyDown={(e) => {
                      switchFocus(e, "creditNarration2");
                    }}
                    onChange={(e) => {
                      setCreditNarration(e.target.value);
                    }}
                    required
                  />
                   <InputField
                    label={"Narration 2"}
                    labelWidth={"14.1%"}
                    inputWidth={"75%"}
                    id={"creditNarration2"}
                    // onKeyDown={(e) => {
                    //   switchFocus(e, "debitNarration");
                    // }}
                    onChange={(e) => {
                      setCreditNarration(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ flex: 0.25 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr",
                  rowGap: "15.5px",
                  paddingTop: "2px",
                }}
              >
                <AccountSummary
                  accountNumber={creditAccountChange}
                  setAccountDetails={setAccountDetails}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", margin: "10px 0px 10px 0px" }}>
            <div style={{ flex: 0.25 }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 0.42,
              }}
            >
              <ButtonComponent
                label={"Clear"}
                buttonWidth={"20%"}
                type={"button"}
                buttonHeight={"30px"}
                onClick={clearFields}
              />
              <ButtonComponent
                label={"Insert"}
                buttonWidth={"20%"}
                type={"button"}
                buttonHeight={"30px"}
                onClick={handleInsert}
                buttonIcon={<BiAddToQueue />}
              />
              <ButtonComponent
                label={"Remove All"}
                buttonWidth={"22%"}
                type={"button"}
                buttonHeight={"30px"}
                buttonIcon={<AiOutlineDelete />}
                onClick={handleRemoveAll}
              />
            </div>
            <div style={{ flex: 0.33 }}></div>
          </div>
          <CustomTable
            headers={[
              "Account No.",
              "Account Name",
              "Ref. Number",
              "Narration",
              "DR. Amount",
              "CR. Amount",
              "Branch",
              "Tin Number",
              " "
            ]}
            data={insertRow}
          />
        </div>
        <hr className="my-[3px] mt-3" />
        <div style={{ flex: 0.005 }}></div>
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
      <SearchModal
        showModal={findById}
        setShowModal={setFindById}
        handleSelected={handleSelected}
      />
      {/* <SearchModal showModal={findById2} setShowModal={setFindById2} handleSelected={handleSelected2}/> */}
    </div>
  );
}

export default MultipleBatchPayment;
