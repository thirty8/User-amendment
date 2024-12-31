import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
// import SearchModal from "../../teller-ops/teller/components/Modal";
import SearchModal from "./components/Modal";
import CashScreen from "./components/cash";
import Insuarance from "./components/insurance";
import Property from "./components/property";
import SharesStocksSecurity from "./components/shares-stocks-security";
import Gurantee from "./components/gurantee";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import swal from "sweetalert";

import Swal from "sweetalert2";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
export default function CollateralCreation() {
  const [body, setBody] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [customerNumber, setCustomerNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [collateraltype, setCollateralType] = useState("");
  const [storedCollateral, setStoredCollateral] = useState([]);
  const [additionalAccount, setAdditionalAccount] = useState([]);
  const [batchNo, setBatchNo] = useState("");
  const [formData, setFormData] = useState({});

  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  function handleTransChange(value) {
    // localStorage.setItem("cash", JSON.stringify(value));
    setBody(value);
    // setVaryModalSize(true);
  }
  useEffect(() => {
    async function getBatchNumber() {
      const response = await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
      // console.log(localStorage.getItem("ipAddress"), "IpAdders");
      setBatchNo(response.data[0]["unique_ref"]);
    }
    getBatchNumber();
  }, []);
  function Notify({ title, icon, confirmButtonText }) {
    Swal.fire({
      title: title,
      icon: icon,
      //   showCancelButton: true,
      confirmButtonText: confirmButtonText,
      //   cancelButtonText:"No",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  // useEffect(() => {
  //   const errorAcc = axios.post(API_SERVER + "/api/get-error-message", { code: "02084" }, { headers });
  //   errorAcc.then((response) => {
  //     setInvalidAccountNumberErrorMessage(response.data);
  //   });
  //   errorAcc.catch((err) => {
  //     throw err;
  //   })

  //   const fundsError = axios.post(API_SERVER + "/api/get-error-message", { code: "07298" }, { headers });
  //   fundsError.then((response) => {
  //     setInsufficientFundsErrorMessage(response.data);
  //   });
  //   fundsError.catch((err) => {
  //     throw err;
  //   })

  //   const invalidDocID = axios.post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers });
  //   invalidDocID.then((response) => {
  //     setDocumentIDErrorMessage(response.data);
  //   });
  //   invalidDocID.catch((err) => {
  //     throw err;
  //   })

  // }, [])

  async function handleSubmit(body) {
    if (customerNumber === "") {
      swal({
        title: "Customer Number is required",
        text: "All Fields with asterisk are required",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // setShowModal(false);
          var input = document.getElementById("Customer Number");
          input.focus();
        }
      });
    } else if (body === "") {
      swal({
        title: "Collateral Type is required",
        text: "All Fields with asterisk are required",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // setShowModal(false);
          var input = document.getElementById("Customer Number");
          input.focus();
        }
      });
    } else if (body === "C01") {
      const {
        nextReview,
        collateralAmount,
        currency,
        accountLink,
        comment,
        expiry,
      } = formData;
      if (nextReview === "" || collateralAmount === "" || accountLink === "") {
        swal({
          title: "Kindly Fill all required fields",
          text: "Kindly fill all required fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      } else {
        axios
          .post(
            API_SERVER + "/api/collateral-creation",
            {
              collateral_no: batchNo,
              collateral_type: collateraltype,
              currency: currency,
              ac_desc: accountName,
              amount: collateralAmount.replace(",", ""),
              amount_considered: "",
              posted_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
              posting_terminal: localStorage.getItem("ipAddress"),
              review_date: nextReview,
              exp_date: expiry,
              comments: comment,
              customer_number: customerNumber,
              collateral_desc: "cash collaterals",
              account_number: accountLink,
              amount_avail: "",
              branch_code: JSON.parse(localStorage.getItem("userInfo"))
                ?.branchCode,
            },
            { headers }
          )
          .then((response) => {
            console.log(response?.data);
            return Notify({
              title: response?.data.responseMessage,
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // if (collateralAmount === "") {
      //   swal({
      //     title: "Collateral Amount is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Next Review Date");
      //       input.focus();
      //     }
      //   });
      // }
    } else if (body === "C02") {
      const {
        accountNumber,
        insuranceCompany,
        insuranceCode,
        policyType,
        policyNumber,
        sumAssured,
        amountConsidered,
        nextReview,
        expiry,
      } = formData;
      if (
        accountNumber === "" ||
        nextReview === "" ||
        insuranceCompany === "" ||
        insuranceCode === "" ||
        policyType === "" ||
        policyNumber === "" ||
        amountConsidered === "" ||
        sumAssured === ""
      ) {
        swal({
          title: "Kindly Fill all required fields",
          text: "Kindly fill all required fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      } else {
      }
      // if (nextReview === "") {
      //   swal({
      //     title: "Review Date is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Next Review Date");
      //       input.focus();
      //     }
      //   });
      // } else if (insuranceCompany === "") {
      //   swal({
      //     title: "Insurance Company is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Insurance Company");
      //       input.focus();
      //     }
      //   });
      // } else if (insuranceCode === "") {
      //   swal({
      //     title: "Insurance Code is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Insurance Code");
      //       input.focus();
      //     }
      //   });
      // } else if (policyType === "") {
      //   swal({
      //     title: "Policy Type is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Policy Type");
      //       input.focus();
      //     }
      //   });
      // } else if (policyNumber === "") {
      //   swal({
      //     title: "Policy Number is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Policy Number");
      //       input.focus();
      //     }
      //   });
      // } else if (amountConsidered === "") {
      //   swal({
      //     title: "Collateral Amount is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Amount Considered");
      //       input.focus();
      //     }
      //   });
      // } else if (sumAssured === "") {
      //   swal({
      //     title: "Sum Assured is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Sum Assured");
      //       input.focus();
      //     }
      //   });
      // }
    } else if (body === "C03") {
      const {
        accountNumber,
        propertyType,
        subPropertyType,
        ownershipName,
        location,
        valuerName,
        valuerContact,
        marketValue,
        forcedSaleValue,
        amountConsidered,
        nextReview,
        expiry,
        valuation,
      } = formData;

      if (
        accountNumber === "" ||
        propertyType === "" ||
        subPropertyType === "" ||
        ownershipName === "" ||
        location === "" ||
        valuerName === "" ||
        valuerContact === "" ||
        marketValue === "" ||
        forcedSaleValue === "" ||
        amountConsidered === "" ||
        nextReview === "" ||
        expiry === "" ||
        valuation === ""
      ) {
        swal({
          title: "Kindly Fill all required fields",
          text: "Kindly fill all required fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      } else {
      }
      // if (propertyType === "") {
      //   swal({
      //     title: "Property Type is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Property Type");
      //       input.focus();
      //     }
      //   });
      // } else if (subPropertyType === "") {
      //   swal({
      //     title: "Sub Property Type is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Sub Property Type");
      //       input.focus();
      //     }
      //   });
      // } else if (ownershipName === "") {
      //   swal({
      //     title: "Ownership Name is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Ownership Name");
      //       input.focus();
      //     }
      //   });
      // } else if (location === "") {
      //   swal({
      //     title: "Property Location is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Location");
      //       input.focus();
      //     }
      //   });
      // } else if (valuerName === "") {
      //   swal({
      //     title: "Valuer Name is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Valuer Name");
      //       input.focus();
      //     }
      //   });
      // } else if (valuerContact === "") {
      //   swal({
      //     title: "Valuer Contact is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Valuer Contact Number");
      //       input.focus();
      //     }
      //   });
      // } else if (marketValue === "") {
      //   swal({
      //     title: "Market Value is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Market Value");
      //       input.focus();
      //     }
      //   });
      // } else if (forcedSaleValue === "") {
      //   swal({
      //     title: "Forced Sale Value is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Forced Sale Value");
      //       input.focus();
      //     }
      //   });
      // } else if (amountConsidered === "") {
      //   swal({
      //     title: "Collateral Amount is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Amount Considered");
      //       input.focus();
      //     }
      //   });
      // } else if (nextReview === "") {
      //   swal({
      //     title: "Next Review Date is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Next Review Date");
      //       input.focus();
      //     }
      //   });
      // } else if (expiry === "") {
      //   swal({
      //     title: "Expiry Date is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Expiry Date");
      //       input.focus();
      //     }
      //   });
      // } else if (valuation === "") {
      //   swal({
      //     title: "Valuation Date is required",
      //     text: "All Fields with asterisk are required",
      //     icon: "warning",
      //     buttons: "OK",
      //     dangerMode: true,
      //   }).then((result) => {
      //     if (result) {
      //       var input = document.getElementById("Valuation Date");
      //       input.focus();
      //     }
      //   });
      // }
    } else if (body === "C04") {
      const {
        accountNumber,
        financialInstitution,
        currency,
        depositType,
        branch,
        collateralType,
        interestRate,
        numberOfMonths,
        guranteeAmount,
        amountConsidered,
        nextReview,
        expiry,
        folioNumber,
        folioStartNumber,
        folioEndNumber,
      } = formData;

      if (
        accountNumber === "" ||
        financialInstitution === "" ||
        currency === "" ||
        depositType === "" ||
        branch === "" ||
        collateralType === "" ||
        interestRate === "" ||
        numberOfMonths === "" ||
        guranteeAmount === "" ||
        amountConsidered === "" ||
        nextReview === "" ||
        expiry === "" ||
        folioNumber === "" ||
        folioStartNumber === "" ||
        folioEndNumber === ""
      ) {
        swal({
          title: "Kindly Fill all required fields",
          text: "Kindly fill all required fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      } else {
      }
    } else if (body === "C05") {
      const {
        accountNumber,
        securityCode,
        index,
        marketValue,
        numberOfShares,
        securityAmount,
        amountConsidered,
        nextReview,
        expiry,
        folioNumber,
        folioStartNumber,
        folioEndNumber,
      } = formData;
      if (
        accountNumber === "" ||
        securityCode === "" ||
        index === "" ||
        marketValue === "" ||
        numberOfShares === "" ||
        securityAmount === "" ||
        amountConsidered === "" ||
        nextReview === "" ||
        expiry === "" ||
        folioNumber === "" ||
        folioStartNumber === "" ||
        folioEndNumber === ""
      ) {
        swal({
          title: "Kindly Fill all required fields",
          text: "Kindly fill all required fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
          }
        });
      } else {
      }
    }
  }
  useEffect(() => {
    if (body === "C01") {
      setModalBody(
        <CashScreen
          customerNumber={customerNumber}
          data={additionalAccount}
          body={body}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (body === "C02") {
      setModalBody(
        <Insuarance
          data={additionalAccount}
          body={body}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (body === "C03") {
      setModalBody(
        <Property
          data={additionalAccount}
          body={body}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (body === "C04") {
      setModalBody(
        <Gurantee
          data={additionalAccount}
          body={body}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (body === "C05") {
      setModalBody(
        <SharesStocksSecurity
          data={additionalAccount}
          body={body}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else {
      setModalBody("");
    }
  }, [body, additionalAccount]);
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }
  async function customerNumberss() {
    const response = await axios.post(
      API_SERVER + "/api/customerNumber",
      {
        customerNumber: customerNumber,
      },
      { headers }
    );
    console.log(response, "addtional accounts from api");
    if (customerNumber !== "") {
      if (response.data.length === 0) {
        swal({
          title: "Invalid Customer Number",
          text: "All Fields with asterisk are required",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
            // var input = document.getElementById("Customer Number");
            // input.focus();
            setAdditionalAccount([]);
            setAccountNumber("");
            setFormData({});
            setAccountName("");
          }
        });
      } else {
        const array = [];
        response.data.map((details) => {
          array.push({
            label: `${details.acct_link}- ${details.account_descrp}`,
            value: `${details.acct_link}- ${details.account_descrp}-${details.currency_code}-${details.closing_balance_today}`,
          });
        });
        setAdditionalAccount(array);

        var name = additionalAccount[0]?.value;
        var splited = name?.split("-")[1];
        setAccountName(splited);
        // if (additionalAccount.length !== 0) {
        //   var input = document.getElementById("Collateral Type");
        //   input.focus();
        // }
      }
    }
  }

  function handleCustomerNumber(e) {
    if (e.key === "Enter") {
      if (customerNumber === "") {
        swal({
          title: "Customer Number is required",
          text: "All Fields with asterisk are required",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            // setShowModal(false);
            var input = document.getElementById("Customer Number");
            input.focus();
          }
        });
      } else {
        customerNumberss();
        // console.log(additionalAccount, "sfdgdfshdt");
        // var name = additionalAccount[0]?.value;
        // var splited = name.split("-")[1];
        // setAccountName(splited);

        // I will work here
      }
    }
  }

  // useEffect(()=>{
  //   setAccountName()
  // },[])
  // useEffect(() => {
  //   if (customerNumber !== "") {
  //     customerNumberss();
  //   }
  // }, [customerNumber]);

  function handleSelected(value) {
    setAccountNumber(value.accountNumber);
    setCustomerNumber(value.customer_number);
    setAccountName(value.accountName);
    setShowModal(false);
  }

  useEffect(() => {
    //setting lov data
    async function collateralType() {
      await axios
        .get(API_SERVER + "/api/collateraltype", { headers })
        .then((res) => {
          console.log(res, "collateral Type");
          setStoredCollateral(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    collateralType();
  }, []);

  let collateralArray = [];
  function collateralType() {
    storedCollateral.map((collateral) => {
      collateralArray.push({
        value: collateral.actual_code,
        label: `${collateral.actual_code} - ${collateral.description}`,
      });
    });
  }
  collateralType();
  // function handleOnBlur() {
  //   customerNumberss();
  // }

  return (
    <div
      className={`bg-white rounded py-[12px] scale-[0.85]  ${
        body ? "-mx-24 -mt-12" : "-mx-20 -mt-8 "
      } `}
    >
      <ActionButtons onOkClick={() => handleSubmit(body)} className={"mb-3"} />
      <hr className="my-[3px] mt-10 mb-4" />

      <div className="bg-white py-[10px] px-4">
        <div className="w-[65%] rounded">
          <div className=" mb-4  flex items-center">
            <InputField
              label={"Account/Customer Search"}
              labelWidth={"25.6%"}
              inputWidth={"66%"}
              required={true}
              // type={"number"}
              id={"accountNumber"}
              value={accountNumber}
              name={"accountNumber"}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
              // value={accountNumber}
              // onBlur={onBlur}
              // onChange={onAccountNumberChange}
              // onKeyPress={(e) => {
              //   onKeyPress(e);
              // }}
            />

            <ButtonComponent
              onClick={() => {
                setShowModal(true);
              }}
              label="Search"
              buttonBackgroundImage={
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`
              }
              buttonWidth="20%"
              buttonHeight="27px"
              buttonColor="white"
            />
            <SearchModal
              setShowModal={setShowModal}
              showModal={showModal}
              handleSelected={handleSelected}
            />
          </div>
          <div className="mb-4  space-x-6 flex items-center">
            <InputField
              label={"Customer Number"}
              id={"Customer Number"}
              labelWidth={"43.4%"}
              inputWidth={"50%"}
              type={"number"}
              value={customerNumber}
              required={true}
              onBlur={customerNumberss}
              onKeyPress={(e) => {
                handleCustomerNumber(e);
              }}
              onChange={(e) => {
                setCustomerNumber(e.target.value);
              }}
            />
            <InputField
              disabled={true}
              inputWidth={"100%"}
              value={accountName}
            />
          </div>
          <div className="mb-4">
            <ListOfValue
              label={"Collateral Type"}
              id={"Collateral Type"}
              labelWidth={"21.4%"}
              inputWidth={"55%"}
              required={true}
              onChange={(value) => {
                handleTransChange(value);
                setCollateralType(value);
              }}
              data={collateralArray}
              value={body}
            />
          </div>
        </div>
        <hr className="my-[8px] mt-10 " />
        <div className={`flex justify-end items-center`}>
          <div className=" flex w-[60%] justify-end items-center">
            {body && (
              <div className="flex w-[70%] space-x-1">
                <InputField
                  label={"Collateral Number"}
                  labelWidth={"30%"}
                  disabled={true}
                  inputWidth={"55%"}
                  value={batchNo}
                />
                <div>
                  <ButtonComponent label={"Attach Document"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {body && <hr className="my-[3px]" />}

      {modalBody}
    </div>
  );
}
