import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../../../components/others/customtable";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import { API_SERVER } from "../../../../../../config/constant";

function GlApproveAccountModal({ details, closeGLamendment, getGlApproval }) {
  const [glCode, setGlCode] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [chartGroup, setChartGroup] = useState("");
  const [chartGroupDescrp, setChartGroupDescrp] = useState("");
  const [statusDescrp, setStatusDescrp] = useState("");
  const [levelDescrp, setLevelDescrp] = useState("");
  const [autoReconcileDescrp, setAutoReconcileDescrp] = useState("");
  const [accountRestrictionDescrp, setAccountRestrictionDescrp] = useState("");
  const [accountClassDescrp, setAccountClassDescrp] = useState("");
  const [clearToCode, setClearToCode] = useState("");
  const [clearToCodeDescrp, setClearToCodeDescrp] = useState("");
  const [accountOrder, setAccountOrder] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [level, setLevel] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [postingRestriction, setPostingRestriction] = useState("");
  const [accountRestriction, setAccountRestriction] = useState("");
  const [viewRestriction, setViewRestriction] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [accountClass, setAccountClass] = useState("");
  const [reportingLineCode, setReportingLineCode] = useState("");
  const [reportingLineDesc, setReportingLineDesc] = useState("");

  const [clearToCodeLOV, setClearToCodeLOV] = useState([]);
  const [accountClassLOV, setAccountClassLOV] = useState([]);
  const [autoReconcile, setAutoReconcile] = useState("");
  const [reconcileType, setReconcileType] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function formatDate(startDate) {
    // Parse the input date
    const sDate = new Date(startDate);

    // // Add 1 day to the date
    // sDate.setDate(sDate.getDate() + 1);

    // Create an array of month abbreviations
    const monthAbbreviations = [
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

    // Format the date in "dd-MMM-yyyy" format with lowercase month abbreviation
    const day = String(sDate.getDate()).padStart(2, "0");
    const month = monthAbbreviations[sDate.getMonth()].toLowerCase();
    const year = sDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const clearData = () => {
    setGlCode("");
    // document.getElementById("glCode").value = "";
    setAccountDescription("");
    // document.getElementById("accountDescription").value = "";
    setAccountStatus("");
    // document.getElementById("accountStatus").value = "";
    setAccountNumber("");
    // document.getElementById("accountNumber").value = "";
    setChartGroup("");
    // document.getElementById("chartGroup").value = " ";
    setClearToCode("");
    // document.getElementById("clearToCode").value = "";
    setAccountOrder("");
    // document.getElementById("accountOrder").value = "";
    setCustomerID("");
    // document.getElementById("customerID").value = "";
    setLevel("");
    // document.getElementById("level").value = "";
    setCurrencyCode("");
    setCurrency("");
    // document.getElementById("currency").value = "";
    setPostingRestriction("");
    // document.getElementById("postingRestriction").value = "";
    // document.getElementById("Deactivate").value = "";
    setAccountRestriction("");
    // document.getElementById("accountRestriction").value = "";
    setViewRestriction("");
    // document.getElementById("customerID").value = ''
    // document.getElementById("customerID").value = ''
    setBranchCode("");
    setBranch("");
    // document.getElementById("branch").value = "";
    setStatus("");
    // document.getElementById("status").value = "";
    setAccountClass("");
    // document.getElementById("accountClass").value = "";
    setReportingLineCode("");
    setReportingLineDesc("");
    // document.getElementById("reportingLineCode").value = "";
    setAutoReconcile("");
    // document.getElementById("autoReconcile").value = "";
    setReconcileType("");
    // document.getElementById("ReconcileType").value = "";
  };

  useEffect(() => {
    let curr = [];
    axios
      .post(
        API_SERVER + "/api/get-clear-to-code",
        { chartCode: details.chart_code },
        { headers }
      )
      .then((response) => {
        const results = response.data;
        results.map((i) => {
          curr.push({
            label: i.account_code + "  -  " + i.account_descrp,
            value: i.account_code,
          });
        });
        console.log(curr, "djd");
        setClearToCodeLOV(curr);
        //   setClearToCode(curr[0].value);
        //   setDatatableData(array);
        // console.log(stateLOV, "mmm");
      })
      .catch((error) => {
        console.log(error);
      });

    const getAccountClass = () => {
      let curr = [];
      axios
        .post(
          API_SERVER + "/api/get-account-class",
          { chartGroup: details.chart_code },
          { headers }
        )
        .then((response) => {
          const results = response.data;
          results.map((i) => {
            curr.push({
              label: i.actual_code + "   -   " + i.description,
              value: i.actual_code,
            });
          });
          setAccountClassLOV(curr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAccountClass();

    if (details) {
      setGlCode(details.account_code);
      setAccountDescription(details.account_descrp);
      setAccountStatus(details.accountStatus);
      setAccountNumber(details.accountNumber);
      setChartGroup(details.chart_code);
      setClearToCode(details.clear_to_code);
      setAccountOrder(details.ordering);
      setCustomerID(details.cust_no);
      setLevel(details.level_id);
      setCurrencyCode(details.currency_code);
      setCurrency(details.currency);
      setPostingRestriction(details.posting_restriction);
      setAccountRestriction(details.account_restriction);
      setViewRestriction(details.viewRestriction);
      setBranchCode(details.branchCode);
      setBranch(details.branch);
      setStatus(details.status);
      setAccountClass(details.accountClass);
      setReportingLineCode(details.reportingLineCode);
      setReportingLineDesc(details.reportingLineDesc);
      setClearToCodeDescrp(details.clearToCodeDescrp);
    }
  }, [details]);

  const ApproveGlAccount = () => {
    console.log(
      postingRestriction,
      accountRestriction,
      viewRestriction,
      "glCode"
    );

    if (
      glCode === " " ||
      accountDescription === " " ||
      accountStatus === " " ||
      accountNumber === " " ||
      chartGroup === " " ||
      clearToCode === " " ||
      accountOrder === " " ||
      customerID === " " ||
      level === " " ||
      currency === " " ||
      postingRestriction === " " ||
      accountRestriction === " " ||
      viewRestriction === " " ||
      branch === " " ||
      status === " " ||
      accountClass === " " ||
      reportingLineCode === " "
    ) {
      swal({
        title: "ERR - 00103",
        text: "Fill All Mandatory Fields",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
    } else {
      axios
        .post(
          API_SERVER + "/api/create-gl-account",
          {
            chartGroup: chartGroup,
            clearToCode: clearToCode,
            accountDescription: accountDescription,
            level: level,
            currency: currencyCode,
            state: postingRestriction,
            accountRestriction: accountRestriction,
            viewRestriction: viewRestriction,
            branch: branchCode,
            status: status,
            accountClass: accountClass,
            bspl: "BS",
            bpCode: reportingLineCode,
            approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
            approvedDate: formatDate(details.postingDate),
            flag: "Y",
            flagMessage: "Approved",
            chkprim: "0",
            accountCode: glCode,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success == "Y") {
            swal({
              icon: "success",
              title: "INF - 01410 : Record Approved Successfully",
              text: "",
            }).then(() => {
              clearData();
              closeGLamendment();
              getGlApproval();
            });
          } else {
            swal({
              icon: "error",
              title: response.data.message,
              text: "",
            });
          }
        })
        .catch((error) => {
          console.log(error, "hillbilly");
        });
    }
  };

  const RejectGlApproval = () => {
    console.log(
      postingRestriction,
      accountRestriction,
      viewRestriction,
      "glCode"
    );

    if (
      glCode === " " ||
      accountDescription === " " ||
      accountStatus === " " ||
      accountNumber === " " ||
      chartGroup === " " ||
      clearToCode === " " ||
      accountOrder === " " ||
      customerID === " " ||
      level === " " ||
      currency === " " ||
      postingRestriction === " " ||
      accountRestriction === " " ||
      viewRestriction === " " ||
      branch === " " ||
      status === " " ||
      accountClass === " " ||
      reportingLineCode === " "
    ) {
      swal({
        title: "ERR - 00103",
        text: "Fill All Mandatory Fields",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      });
    } else {
      Swal.fire({
        title: "Rejection of GL Code " + glCode,
        text: "Are You Sure You Want To Perform This Operation?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        dangerMode: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              API_SERVER + "/api/create-gl-account",
              {
                chartGroup: chartGroup,
                clearToCode: clearToCode,
                accountDescription: accountDescription,
                level: level,
                currency: currencyCode,
                state: postingRestriction,
                accountRestriction: accountRestriction,
                viewRestriction: viewRestriction,
                branch: branchCode,
                status: status,
                accountClass: accountClass,
                bspl: "BS",
                bpCode: reportingLineCode,
                approvedBy: JSON.parse(localStorage.getItem("userInfo")).id,
                approvedDate: formatDate(details.postingDate),
                flag: "R",
                flagMessage: "Rejected",
                chkprim: "0",
                accountCode: glCode,
              },
              { headers }
            )
            .then((response) => {
              console.log(response, "responseresponse");
              if (response.data.success == "Y") {
                swal({
                  icon: "success",
                  title: response.data.message,
                  text: "",
                }).then(() => {
                  clearData();
                  closeGLamendment();
                  getGlApproval();
                });
              } else {
                swal({
                  icon: "error",
                  title: response.data.message,
                  text: "",
                });
              }
            })
            .catch((error) => {
              console.log(error, "hillbilly");
            });
        }
      });
    }
  };

  const ChartDesc = [
    { value: "00000", label: "MEMO" },
    { value: "10000", label: "ASSET" },
    { value: "20000", label: "LIABILITY" },
    { value: "30000", label: "INCOME" },
    { value: "40000", label: "EXPENSE" },
    { value: "50000", label: "CAPITAL" },
    { value: "60000", label: "CONTINGENT ASSET" },
    { value: "70000", label: "CONTINGENT LIABILITY" },
    { value: "80000", label: "POSITION" },
    { value: "90000", label: "POSITION CONTRA" },
  ];

  const statusArray = [
    { label: "NORMAL", value: "N" },
    { label: "DEBIT BLOCK", value: "DR" },
    { label: "CREDIT BLOCK", value: "CR" },
    { label: "TOTAL BLOCKAGE", value: "BO" },
  ];

  const levelsArray = [
    { label: "DETAIL ACCOUNT", value: "D" },
    { label: "TOTAL ACCOUNT", value: "T" },
    { label: "CONTROL ACCOUNT", value: "C" },
  ];

  const autoReconcileArray = [
    { value: "N", label: "NOT APPLICABLE" },
    { value: "A", label: "AUTOMATIC" },
    { value: "M", label: "MANUAL" },
  ];

  const accountRestrictionArray = [
    { value: "G", label: "GLOBAL" },
    { value: "HO", label: "HEAD OFFICE" },
    { value: "BR", label: "BRANCH" },
  ];

  useEffect(() => {
    if (chartGroup) {
      ChartDesc.map((i) => {
        i.value === chartGroup
          ? setChartGroupDescrp(i.label)
          : console.log(i, "i");
      });
    }
  }, [chartGroup]);

  useEffect(() => {
    if (status) {
      statusArray.map((i) => {
        i.value === status ? setStatusDescrp(i.label) : console.log(i, "i");
      });
    }
  }, [status]);

  useEffect(() => {
    if (level) {
      levelsArray.map((i) => {
        i.value === level ? setLevelDescrp(i.label) : console.log(i, "i");
      });
    }
  }, [level]);

  useEffect(() => {
    if (autoReconcile) {
      autoReconcileArray.map((i) => {
        i.value === autoReconcile
          ? setAutoReconcileDescrp(i.label)
          : console.log(i, "i");
      });
    }
  }, [autoReconcile]);

  useEffect(() => {
    if (level) {
      levelsArray.map((i) => {
        i.value === level ? setLevelDescrp(i.label) : console.log(i, "i");
      });
    }
  }, [level]);

  useEffect(() => {
    if (accountRestriction) {
      accountRestrictionArray.map((i) => {
        i.value === accountRestriction
          ? setAccountRestrictionDescrp(i.label)
          : console.log(i, "i");
      });
    }
  }, [accountRestriction]);

  useEffect(() => {

    const getAccountClass = () => {
      let curr = [];
      axios
        .post(
          API_SERVER + "/api/get-account-class",
          { chartGroup: chartGroup },
          { headers }
        )
        .then((response) => {
          console.log(response,"fiji")
          const results = response.data;
          results.map((i) => {
            curr.push({
              value: i.actual_code,
              label: i.description,
            });
          })
          curr.map((i)=>{
            i.value === accountClass ? setAccountClassDescrp(i.label) : console.log(i, "i");
          })
          // setAccountClassLOV(curr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAccountClass();
  }, [accountClass]);

  console.log(accountClassDescrp, "accountClassDescrp");

  return (
    <div style={{zoom:0.92}}>
      <ActionButtons
        displayFetch={"none"}
        displayOk={"none"}
        displayRefresh={"none"}
        displayNew={"none"}
        displayCancel={"none"}
        displayView={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        onExitClick={closeGLamendment}
        onAuthoriseClick={ApproveGlAccount}
        onRejectClick={RejectGlApproval}
      />
      <div style={{ padding: "20px 15px" }}>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            paddingBottom: "5px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
          }}
        >
          <Header title={"ACCOUNT DETAILS"} headerShade={true} />
          <br />
          <div style={{ display: "flex", gap: "7px", paddingBottom: "15px" }}>
            <div style={{ flex: 0.05 }}></div>
            <div style={{ flex: 0.9 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "50px",
                  rowGap: "20px",
                  padding: "10px 15px 0px 15px",
                }}
              >
                <InputField
                  label={"GL Code"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  id={"glCode"}
                  value={glCode}
                  disabled
                />
                <InputField
                  label={"Account Description"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"accountDescription"}
                  value={accountDescription}
                  disabled
                />
                <InputField
                  label={"Account Status"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  id={"accountStatus"}
                  required={true}
                  value={accountStatus}
                  disabled
                />
                <InputField
                  label={"Account Number"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"accountNumber"}
                  value={accountNumber}
                  disabled
                />
                <InputField
                  label={"Chart Group"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  id={"chartGroup"}
                  //  data={[{value:"00000",label:"00000   -   MEMO"},{value:"10000",label:"10000   -   ASSET"},{value:"20000",label:"20000   -   LIABILITY"},{value:"30000",label:"30000   -   INCOME"},{value:"40000",label:"40000   -   EXPENSE"},{value:"50000",label:"50000   -   CAPITAL"},{value:"60000",label:"60000   -   CONTINGENT ASSET"},{value:"70000",label:"70000   -   CONTINGENT LIABILITY"},{value:"80000",label:"80000   -   POSITION"},{value:"90000",label:"90000   -   POSITION CONTRA"}]}
                  value={chartGroup ? chartGroup + "   -   " + chartGroupDescrp : ""}
                  disabled
                />
                <InputField
                  label={"Clear to Code"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  id={"clearToCode"}
                  required={true}
                  value={clearToCode  + "   -   " + clearToCodeDescrp}
                  disabled
                />
                <InputField
                  label={"Account Order"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  id={"accountOrder"}
                  value={accountOrder}
                  disabled
                />
                <InputField
                  label={"Customer ID"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"customerID"}
                  value={customerID}
                  disabled
                />
                <InputField
                  label={"Level"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  id={"level"}
                  //    onChange={(e)=>{setLevel(e)}}
                  disabled
                  value={level + "   -   " + levelDescrp}
                />
                <InputField
                  label={"Currency"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"currency"}
                  value={currencyCode + "   -   " + currency}
                  disabled
                />
                <RadioButtons
                  display={true}
                  display2={true}
                  display3={false}
                  label={"Posting Restriction"}
                  labelWidth={"30%"}
                  // name={"postingRestriction"}
                  radioLabel={"Activate"}
                  id={"postingRestriction"}
                  value={"A"}
                  checked={postingRestriction === "A"}
                  radioLabel2={"Deactivate"}
                  id2={"Deactivate"}
                  checked2={postingRestriction === "N"}
                  value2={"N"}
                  radioButtonsWidth={"45%"}
                  //  onChange={(e)=>{
                  //      setPostingRestriction(e.target.value)
                  //     }}
                  required
                />
                {/* <RadioButtons label={""} labelWidth={""}  radioLabel={""} radioLabel2={""} display={true} display2={true} display3={false} required  id={"postingRestriction"}/> */}
                <InputField
                  label={"Account Restriction"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  disabled
                  value={accountRestrictionDescrp}
                  id={"accountRestriction"}
                />
                <RadioButtons
                  label={"View Restriction"}
                  labelWidth={"30%"}
                  radioButtonsWidth={"45%"}
                  radioLabel={"Allow"}
                  value={"A"}
                  checked={viewRestriction === "A"}
                  radioLabel2={"Block"}
                  value2={"B"}
                  checked2={viewRestriction === "B"}
                  display={true}
                  display2={true}
                  display3={false}
                  required
                  id={"viewRestriction"}
                />
                <InputField
                  label={"Branch"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"branch"}
                  //    onChange={(e)=>{setBranch(e.target.value)}}
                  value={branchCode + "   -   " + branch}
                  disabled
                />
                <InputField
                  label={"Status"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  value={status + "   -   " + statusDescrp}
                  id={"status"}
                  disabled
                />
                <InputField
                  label={"Account Class"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required={true}
                  id={"accountClass"}
                  value={accountClass + "   -   " + accountClassDescrp}
                  disabled
                />
                <InputField
                  label={"Reporting Line Code"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  //    onChange={(e)=>{setReportingLineCode(e.target.value)}}
                  id={"reportingLineCode"}
                  value={
                    level !== "T"
                      ? reportingLineCode + "   -   " + reportingLineDesc
                      : "  "
                  }
                  disabled
                />
              </div>
              <div style={{ margin: "15px 0px 0px 0px" }}>
                <Header greenShade={true} title={"Auto Reconciliation"} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "50px",
                  rowGap: "20px",
                  padding: "10px 15px 0px 15px",
                }}
              >
                <InputField
                  label={"Auto Reconcile"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  textAlign={"right"}
                  paddingRight={"5px"}
                  value={
                    autoReconcile
                      ? autoReconcile + "   -   " + autoReconcileDescrp
                      : " "
                  }
                  disabled
                />
                <RadioButtons
                  label={"Recon. Type"}
                  labelWidth={"29%"}
                  radioButtonsWidth={"45%"}
                  radioLabel={"Credit"}
                  checked={reconcileType === "C"}
                  value={"C"}
                  radioLabel2={"Debit"}
                  value2={"D"}
                  checked2={reconcileType === "D"}
                  display={true}
                  display2={true}
                  display3={false}
                  id={"ReconcileType"}
                />
              </div>
            </div>
            <div style={{ flex: 0.05 }}></div>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "15px" }}
        >
          <div style={{ marginRight: "10px" }}>
            <ButtonComponent label={"Back"} buttonWidth={"50px"} />
          </div>
          <div>
            <ButtonComponent label={"Next"} buttonWidth={"50px"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlApproveAccountModal;
