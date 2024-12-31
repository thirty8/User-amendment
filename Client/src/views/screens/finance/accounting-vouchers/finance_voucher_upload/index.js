import React, { useEffect, useMemo, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { MdOutlineFileUpload } from "react-icons/md";
import { read, utils } from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import CustomTable from "../../../teller-ops/components/CustomTable";
import { AiOutlineEye } from "react-icons/ai";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import Swal from "sweetalert2";
import {
  formatNumber1,
  formatNumber2dp,
  handleExitClick,
  NumberWithoutCommas,
  switchFocus,
} from "../../components/helpers";
import { FcDocument } from "react-icons/fc";
import SkeletonInput from "antd/es/skeleton/Input";
import OverlayLoader from "../../../../../components/others/OverlayLoader";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../../components/DocumentViewing";
import CustomButtons from "../../../../../components/others/CustomButtons";
import CurrencyMismatchTable from "./components/currencyMismatchComponent";
import InvalidAcctsTable from "./components/invalidAcctsComponent";
// import excelFileTemplate from "./components/Finance_Voucher_Upload_Excel.xlsx";
import excelFileTemplate from "./components/excelfiles/Finance_Voucher_Upload_Excel.xlsx";
import { BiDownload } from "react-icons/bi";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function FinanceVoucherUpload() {
  const [data, setData] = useState([]);
  const [excelTable, setExcelTable] = useState([]);
  const [validatedAccounts, setValidatedAccounts] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [currencylovData, setCurrencylovData] = useState([]);
  const [credit_accts_p, setCredit_accts_p] = useState([]);
  const [debit_accts_p, setDebit_accts_p] = useState([]);
  const [invalidAccountsData, setInvalidAccountsData] = useState([]);
  const [dataUpload, setDataUpload] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [summaryShow, setSummaryShow] = useState(false);
  const [invalidAccounts, setInvalidAccounts] = useState("");
  const [totalDebit_amt, setTotalDebit_amt] = useState("");
  const [totalCredit_amt, setTotalCredit_amt] = useState("");
  const [currencyMismatchAcctsNum, setCurrencyMismatchAcctsNum] = useState("");
  const [lovCurrency, setLovCurrency] = useState("");
  const [scanDocumentId, setScanDocumentId] = useState("");
  const [docReference, setDocReference] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [currencyMismatchAccts, setCurrencyMismatchAccts] = useState([]);
  const [componentToShow, setComponentToShow] = useState(null);

  useEffect(() => {
    async function getCurrency() {
      try {
        let response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "CUR" },
          { headers }
        );
        setCurrencylovData(response.data);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }
    getCurrency();
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  const openFileExplorer = () => {
    if (
      lovCurrency === "" ||
      scanDocumentId === "" ||
      docReference === "" ||
      transactionDetails === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Mandatory fields are required before file upload.",
      });
      return;
    }
    // Create an input element of type "file"
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    // Set the accept attribute to only allow Excel files
    fileInput.accept = ".xlsx, .xls, .csv";
    // Add an event listener for file selection
    fileInput.addEventListener("change", handleFileSelect);
    // Simulate a click event on the file input element
    fileInput.click();
  };

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const workbook = read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const newData = utils.sheet_to_json(worksheet);
      setData(newData);
      if (newData.length > 0) setDataUpload((prev) => !prev);
      // console.log(newData, "jsoonnnnn");
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  useEffect(() => {
    if (data.length > 0) {
      validateAccounts();
    }
  }, [dataUpload]);

  async function validateAccounts() {
    try {
      let arr = [];
      // if (data.length > 0) {
      setFetchData(true);
      axios
        .post(
          API_SERVER + "/api/check_fin_voucher_acct_validation",
          {
            excel_details: data,
            currency: lovCurrency,
            document_ref: docReference,
            scan_doc_id: scanDocumentId,
            transaction_details: transactionDetails,
          },
          {
            headers,
          }
        )
        .then((res) => {
          if (res.data?.success === "Y") {
            res.data?.err_array.map((i) => {
              setAccountsData(res.data?.err_array);
              arr.push([
                i.p_debit_acct ?? i.p_credit_acct,
                i.account_description,
                i.currency_desc,
                i.p_debit_nrtn ?? i.p_credit_nrtn,
                i.branch_desc,
                formatNumber2dp(i.p_credit_amt),
                formatNumber2dp(i.p_debit_amt),
                <div>
                  {i.error || i.currency !== lovCurrency ? (
                    <div className="animate-pulse flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 13.75c-.41 0-.75-.34-.75-.75V7.75c0-.41.34-.75.75-.75s.75.34.75.75V13c0 .41-.34.75-.75.75ZM12 17.25a.99.99 0 0 1-.71-.29c-.09-.1-.16-.21-.22-.33a.986.986 0 0 1-.07-.38c0-.26.11-.52.29-.71.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .13-.03.26-.08.38s-.12.23-.21.33a.99.99 0 0 1-.71.29Z"
                          fill="#c93737"
                        ></path>
                        <path
                          d="M12 22.751c-.67 0-1.35-.17-1.95-.52l-5.94-3.43c-1.2-.7-1.95-1.99-1.95-3.38v-6.84c0-1.39.75-2.68 1.95-3.38l5.94-3.43c1.2-.7 2.69-.7 3.9 0l5.94 3.43c1.2.7 1.95 1.99 1.95 3.38v6.84c0 1.39-.75 2.68-1.95 3.38l-5.94 3.43c-.6.35-1.28.52-1.95.52Zm0-20c-.41 0-.83.11-1.2.32l-5.94 3.43c-.74.43-1.2 1.22-1.2 2.08v6.84c0 .85.46 1.65 1.2 2.08l5.94 3.43c.74.43 1.66.43 2.39 0l5.94-3.43c.74-.43 1.2-1.22 1.2-2.08v-6.84c0-.85-.46-1.65-1.2-2.08l-5.94-3.43c-.36-.21-.78-.32-1.19-.32Z"
                          fill="#c93737"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11.998 22.761c-1.09 0-2.17-.32-3.02-.95l-4.3-3.21c-1.14-.85-2.03-2.63-2.03-4.04v-7.44c0-1.54 1.13-3.18 2.58-3.72l4.99-1.87c.99-.37 2.55-.37 3.54 0l4.99 1.87c1.45.54 2.58 2.18 2.58 3.72v7.43c0 1.42-.89 3.19-2.03 4.04l-4.3 3.21c-.83.64-1.91.96-3 .96Zm-1.25-19.82-4.99 1.87c-.85.32-1.6 1.4-1.6 2.32v7.43c0 .95.67 2.28 1.42 2.84l4.3 3.21c1.15.86 3.09.86 4.25 0l4.3-3.21c.76-.57 1.42-1.89 1.42-2.84v-7.44c0-.91-.75-1.99-1.6-2.32l-4.99-1.87c-.68-.24-1.84-.24-2.51.01Z"
                          fill="#12C892"
                        ></path>
                        <path
                          d="M10.658 14.231c-.19 0-.38-.07-.53-.22l-1.61-1.61a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l1.08 1.08 3.77-3.77c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-4.3 4.3c-.15.15-.34.22-.53.22Z"
                          fill="#12C892"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>,
              ]);
            });
            setExcelTable(arr);
            setFetchData(false);
            AccountsData(res.data?.err_array);
            setValidatedAccounts(res.data?.array);
            setSummaryShow(true);
            Swal.fire({
              title: "Success",
              text: res.data?.message,
              icon: "success",
            });
          } else {
            setFetchData(false);
            Swal.fire({
              title: "Error",
              text: res.data?.message ?? res.data,
              icon: "error",
            });
          }
        });
      // }
    } catch (error) {
      setFetchData(false);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  }

  function AccountsData(arrData) {
    try {
      setLoading(true);
      let credit_accts = [];
      let debit_accts = [];
      let t_debit = 0;
      let t_credit = 0;
      let arr_cur = [];
      [arrData].map((arr) => {
        let invalid = arr.filter((i) => i.hasOwnProperty("error"));
        arr.map((d) => {
          if (d.currency !== lovCurrency) {
            arr_cur.push(d);
          }
          if (NumberWithoutCommas(formatNumber2dp(d.p_debit_amt)) > 0) {
            t_debit += NumberWithoutCommas(formatNumber2dp(d.p_debit_amt));
            debit_accts.push(d);
          } else if (NumberWithoutCommas(formatNumber2dp(d.p_credit_amt)) > 0) {
            t_credit += NumberWithoutCommas(formatNumber2dp(d.p_credit_amt));
            credit_accts.push(d);
          }
        });
        setInvalidAccounts(invalid.length);
        setInvalidAccountsData(invalid);
        setTotalDebit_amt(t_debit);
        setTotalCredit_amt(t_credit);
        setCurrencyMismatchAccts(arr_cur);
        setCurrencyMismatchAcctsNum(arr_cur.length);
        setCredit_accts_p(credit_accts);
        setDebit_accts_p(debit_accts);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: error.message,
        title: "Error",
      });
    }
  }

  function PostUpload() {
    setPostLoader(true);
    try {
      if (currencyMismatchAccts.length > 0) {
        setPostLoader(false);
        Swal.fire({
          icon: "error",
          title: "ERR - 01336",
          text: "Some accounts currency do not match the selected transaction currency.",
        });
        return;
      }

      if (invalidAccounts.length > 0) {
        setPostLoader(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid accounts found, please check.",
        });
        return;
      }

      if (
        NumberWithoutCommas(formatNumber1(totalDebit_amt)) !==
        NumberWithoutCommas(formatNumber1(totalCredit_amt))
      ) {
        setPostLoader(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          html: "Total <b>Debit</b> and <b>Credit</b> amount <b>Mismatch !!</b> ",
        });
        return;
      }

      // const currencyChange = validatedAccounts.find((i)=>{
      //   i.currency !== lovCurrency
      // })

      // if(currencyChange){

      // }else{}

      axios
        .post(
          API_SERVER + "/api/post_prc_receipt_payment_journal_backvalue",
          {
            r_trans_type: "GL-UPD",
            currency: lovCurrency,
            p_user: JSON.parse(localStorage.getItem("userInfo")).id,
            valueDate: todayDate,
            branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
            p_destination: "P",
            post_channel: "BRA",
            module: "prc_fin_act_vcr_rt",
            p_credit_acs: credit_accts_p,
            p_debit_acs: debit_accts_p,
            // batch_number: batch_numberSuspend,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success === "Y") {
            setPostLoader(false);
            Swal.fire({
              title: "Success",
              text: response.data.message,
              icon: "success",
            });
            ClearData();
          } else {
            setPostLoader(false);
            Swal.fire({
              title: "Error",
              text: response.data.message,
              icon: "error",
            });
          }
        });
    } catch (error) {
      setPostLoader(false);
      Swal.fire({
        icon: "error",
        text: error.message,
        title: "Error",
      });
    }
  }

  // generate excel file template
  const downloadExcelFile = () => {
    // alert("here");
    const link = document.createElement("a");
    link.href = excelFileTemplate;
    link.download = "voucherUploadTemplate.xlsx";
    link.click();
  };

  function ClearData() {
    setPostLoader(true);
    setExcelTable([]);
    setLovCurrency("");
    setTransactionDetails("");
    setScanDocumentId("");
    setDocReference("");
    setCurrencyMismatchAccts([]);
    setCurrencyMismatchAcctsNum("");
    setInvalidAccounts("");
    setInvalidAccountsData([]);
    setTotalCredit_amt("");
    setTotalDebit_amt("");
    setPostLoader(false);
    setSummaryShow(false);
  }

  function clearAllData() {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      text: "All data entered and uploaded will be cleared.",
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        ClearData();
      }
    });
  }

  function handleClick1() {
    if (scanDocumentId === "") {
      Swal.fire({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        // buttons: "OK",
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  // function ValidAccounts(array) {
  //   array.filter(i);
  // }
  return (
    <div>
      <OverlayLoader
        postLoader={postLoader || fetchData}
        // color={"#0580c0"}
        textColor={true}
        displayText={postLoader ? "Loading..." : "Processing Data..."}
      />
      <div>
        {/* <ActionButtons
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayCancel={"none"}
          displayReject={"none"}
          displayRefresh={"none"}
          displayAuthorise={"none"}
          displayFetch={"none"}
        /> */}
      </div>
      {sweetAlertConfirmed && (
        <Modal
          className="p-0 m-0"
          opened={sweetAlertConfirmed}
          size="75%"
          padding={0}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={() => sweetAlertConfirmed(false)}
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
          {/* <ImageVerification accountNumber={imageAccount} /> */}
          {/* <DocumentCapture documentID={p_credit_scan_doc_id} /> */}
          <DocumentViewing documentID={scanDocumentId} />
          {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )}
      <div>
        <div className="flex gap-4 ">
          <div className="w-full">
            <Header headerShade={true} title={"Transaction Details"} />
            <div
              className="rounded-sm px-4 pt-4 pb-2 mt-1"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-[50%]">
                  <ListOfValue
                    label={"Currency"}
                    inputWidth={"50%"}
                    labelWidth={"25%"}
                    required={true}
                    onChange={(value) => {
                      setLovCurrency(value);
                      setTimeout(() => {
                        const input = document.getElementById("scandocID");
                        input.focus();
                      }, 0);
                    }}
                    data={currencylovData}
                    value={lovCurrency}
                  />
                </div>
                <div className="flex-[50%]">
                  <div style={{ display: "flex", flex: 1 }} className="gap-1">
                    <div style={{ flex: 0.9 }}>
                      <InputField
                        label={"Scan Document ID"}
                        labelWidth={"45%"}
                        required={true}
                        onChange={(e) => setScanDocumentId(e.target.value)}
                        value={scanDocumentId}
                        inputWidth={"51%"}
                        id={"scandocID"}
                        onKeyDown={(e) => {
                          switchFocus(e, "trans_details");
                        }}
                      />
                    </div>
                    <div style={{ flex: 0.1 }}>
                      <ButtonComponent
                        label={""}
                        buttonHeight={"25px"}
                        buttonWidth={"30px"}
                        buttonBackgroundColor={"#0580c0"}
                        onClick={handleClick1}
                        buttonIcon={<FcDocument />}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex-[50%]">
                  {/* <InputField
                    label={"Posting Date"}
                    inputWidth={"50%"}
                    labelWidth={"25%"}
                    disabled={true}
                    value={todayDate}
                  /> */}
                  <InputField
                    label={"Transaction Details"}
                    inputWidth={"60%"}
                    labelWidth={"25%"}
                    required={true}
                    value={transactionDetails}
                    id={"trans_details"}
                    onKeyDown={(e) => {
                      switchFocus(e, "docReference");
                    }}
                    onChange={(e) => setTransactionDetails(e.target.value)}
                  />
                </div>
                <div className="flex-[50%]">
                  <InputField
                    labelWidth={"40%"}
                    inputWidth={"46%"}
                    required={true}
                    label={"Document Reference"}
                    id={"docReference"}
                    onChange={(e) => setDocReference(e.target.value)}
                    value={docReference}
                    // onKeyDown={(e) => {
                    //   switchFocus(e, "trans_details");
                    // }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex-[50%]">
                  {/* <InputField
                    label={"Transaction Details"}
                    inputWidth={"60%"}
                    labelWidth={"25%"}
                    required={true}
                    value={transactionDetails}
                    id={"trans_details"}
                    onChange={(e) => setTransactionDetails(e.target.value)}
                  /> */}
                </div>
                <div className="flex-[50%]"></div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <Modal
            className="p-0 m-0"
            opened={showModal}
            size="75%"
            padding={0}
            withCloseButton={false}
            transitionProps={"mounted"}
            onClose={() => setShowModal(false)}
            closeOnClickOutside={false}
          >
            {componentToShow}
          </Modal>
        )}
        <div className="flex items-center justify-between">
          <div>
            <ButtonComponent
              label={"Generate Template"}
              buttonBackgroundColor={"green"}
              buttonWidth={"195px"}
              buttonIcon={<BiDownload size={18} />}
              // buttonIcon={<MdOutlineFileUpload size={23} />}
              onClick={downloadExcelFile}
              buttonHeight={"30px"}
            />
          </div>
          <div className="flex justify-end items-center mt-3 gap-2 pr-4 pb-4">
            <ButtonComponent
              label={"Upload Excel"}
              buttonBackgroundColor={"green"}
              buttonWidth={"145px"}
              buttonIcon={<SiMicrosoftexcel size={18} />}
              // buttonIcon={<MdOutlineFileUpload size={23} />}
              onClick={openFileExplorer}
              buttonHeight={"30px"}
            />
            <ButtonComponent
              label={"Clear"}
              buttonWidth={"50px"}
              onClick={clearAllData}
              buttonHeight={"30px"}
            />
            <ButtonComponent
              label={"Post"}
              buttonWidth={"50px"}
              onClick={PostUpload}
              buttonHeight={"30px"}
            />
            <ButtonComponent
              label={"Exit"}
              buttonWidth={"50px"}
              onClick={handleExitClick}
              buttonHeight={"30px"}
            />
          </div>
        </div>

        <div>
          <div>
            <Header title={"Excel Details"} headerShade={true} />
          </div>
          <div>
            <CustomTable
              headers={[
                "Account Number",
                "Account Description",
                "Currency",
                "Narration",
                "Branch Name",
                "Credit Amount",
                "Debit Amount",
                "Status",
              ]}
              data={excelTable}
              style={{ columnAlignRight: [6, 7] }}
              rowsPerPage={8}
            />
          </div>
          {/* <hr /> */}
          {summaryShow && (
            <div className="w-full mt-2">
              {/* <Header headerShade={true} title={"Excel Summary"} /> */}
              <div
                className="rounded-lg p-2 mt-1  flex  flex-grow-0 border-2 border-black-100 gap-2"
                // className="rounded-sm p-2 mt-1  flex  space-x-3"
              >
                <p className="flex gap-2 items-center w-full">
                  <span className=" text-right text-orange-300 font-medium text-md ">
                    Invalid Accounts :{" "}
                  </span>{" "}
                  <span className="flex text-gray-600 font-medium ">
                    {/* {invalidAccounts} */}
                    {loading ? (
                      <SkeletonInput size="small" active />
                    ) : (
                      <span className={`flex gap-2 items-center`}>
                        {`${invalidAccounts}`}
                        <span
                          className={`${
                            invalidAccountsData?.length > 0 ? "" : "hidden "
                          }`}
                        >
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              stroke="#FF8A65"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M13 11l8.2-8.2M22 6.8V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                            ></path>
                          </svg> */}
                          <ButtonComponent
                            buttonIcon={
                              <AiOutlineEye size={18} color={"white"} />
                            }
                            buttonHeight={"23px"}
                            onClick={() => {
                              setShowModal(true);
                              setComponentToShow(
                                <InvalidAcctsTable
                                  invalidAccountsData={invalidAccountsData}
                                  setShowModal={setShowModal}
                                />
                              );
                            }}
                          />
                        </span>
                      </span>
                    )}
                  </span>
                </p>
                <p className="flex gap-2  text-right items-center w-full">
                  <span className="text-right text-orange-300 font-medium text-md ">
                    Currency Mismatch :{" "}
                  </span>{" "}
                  <span className="flex text-gray-600 font-medium ">
                    {loading ? (
                      <SkeletonInput size="small" active />
                    ) : (
                      <span className={`flex gap-2`}>
                        {`${currencyMismatchAcctsNum}`}
                        <span
                          className={` ${
                            currencyMismatchAccts?.length > 0 ? "" : "hidden"
                          }`}
                        >
                          <ButtonComponent
                            buttonIcon={
                              <AiOutlineEye size={18} color={"white"} />
                            }
                            buttonHeight={"23px"}
                            onClick={() => {
                              setShowModal(true);
                              setComponentToShow(
                                <CurrencyMismatchTable
                                  currencyMismatchAccts={currencyMismatchAccts}
                                  setShowModal={setShowModal}
                                />
                              );
                            }}
                          />
                        </span>
                      </span>
                    )}
                    {/* {currencyMismatchAcctsNum} */}
                  </span>
                </p>
                <p className="flex gap-2 items-center w-full">
                  <span className=" text-right text-orange-300 font-medium text-md ">
                    Total Debit Amount :{" "}
                  </span>{" "}
                  <span className="flex text-gray-600 font-medium ">
                    {loading ? (
                      <SkeletonInput size="small" active />
                    ) : (
                      `${formatNumber1(totalDebit_amt)}`
                    )}
                    {/* {formatNumber1(totalDebit_amt)} */}
                  </span>
                </p>
                <p className="flex gap-2 items-center w-full">
                  <span className=" text-right text-orange-300 font-medium text-md ">
                    Total Credit Amount :{" "}
                  </span>{" "}
                  <span className="flex text-gray-600 font-medium ">
                    {loading ? (
                      <SkeletonInput size="small" active />
                    ) : (
                      `${formatNumber1(totalCredit_amt)}`
                    )}
                    {/* {formatNumber1(totalCredit_amt)} */}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinanceVoucherUpload;
