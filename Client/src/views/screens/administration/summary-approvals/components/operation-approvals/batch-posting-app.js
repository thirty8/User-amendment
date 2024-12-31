import React, { useState, useEffect } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import CustomTable from "../../../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import DocumentViewing from "../../../../../../components/DocumentViewing";
import Swal from "sweetalert2";
import ModalComponent from "../../../../../../components/others/Modal/modal";
import AccountBalances from "./components/batch-posting-account-balances";
const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const BatchPostingApproval = ({ batchNo, postedBy, setShowModal, accountNumber, postingDate }) => {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loading2, setLoading2] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [finalData1, setFinalData1] = useState({});
  const [totals, setTotals] = useState({});
  const [showViewDoc, setShowViewDoc] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  console.log(postedBy, "post");

  //format date
  function formatDate(dateString) {
    const originalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const monthNames = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      10: "OCT",
      11: "NOV",
      12: "DEC",
    };

    // const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    // const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    // const year = originalDate.getFullYear().toString()?.slice(-2);

    // const formattedDate = `${day}-${month}-${year}`;
    // return formattedDate.toUpperCase();
    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate.toUpperCase();
  }

  // format amount
  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num?.toString();
      const decimalIndex = numberString?.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString?.substr(0, decimalIndex);
        const decimalPart = numberString?.substr(decimalIndex);
        const formattedInteger = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  const handleViewDoc = async (doc_ref) => {
    if (doc_ref === "" || doc_ref === null) {
      return await axios
        .post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers })
        .then((response) => {
          if (response) {
            Swal.fire({
              text: response.data,
              icon: "error",
            });
          }
        })
        .catch((err) => console.log(`error is :${err}`));
    } else {
      setDocumentId(doc_ref);
      setTimeout(() => {
        setShowViewDoc(true);
      }, 100);
    }
  };

  console.log(finalData, "final ");
  const fetchDataOnPageLoad = async () => {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/batch-posting-approval",
        {
          load_data: "true",
          posted_by_v: postedBy || "",
          batch_no_v: batchNo || "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setData(response?.data);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => console.log(`error caught in loading data : ${err}`));
  };

  useEffect(() => {
    fetchDataOnPageLoad();
  }, []);

  useEffect(() => {
    const arr = [];
    let totalDebit = 0;
    let totalCredit = 0;
    data?.length > 0 &&
      data?.forEach((i, key) => {
        totalDebit += typeof i?.local_equivalent_db !== "number" ? 0 : i?.local_equivalent_db;
        totalCredit += typeof i?.local_equivalent_cr !== "number" ? 0 : i?.local_equivalent_cr;

        arr.push([
          i?.acct_link || "",
          <div className="!text-left">{i?.acct_desc || ""}</div>,
          <div className="flex space-x-3">
            <span>{i?.document_ref || ""}</span>
            <span>
              <ButtonComponent
                buttonIcon={CustomButtons?.viewDoc?.icon}
                buttonBackgroundColor={CustomButtons?.viewDoc?.bgColor}
                onClick={() => handleViewDoc(i?.document_ref)}
              />
            </span>
          </div>,
          i?.transaction_details || "",
          typeof i?.local_equivalent_db !== "number" ? "" : formatNumber(i?.local_equivalent_db),
          typeof i?.local_equivalent_cr !== "number" ? "" : formatNumber(i?.local_equivalent_cr),
          i ? formatDate(i?.value_date) : "",
          i?.branch_desc || "",
          i?.iso_code || "",
          <input
            type="checkbox"
            className="w-full flex justify-center"
            onChange={(e) => {
              if (e.target.checked) {
                setFinalData((prev) => ({
                  ...prev,
                  [key]: i,
                }));
              } else {
                setFinalData((prev) => {
                  const updatedData = { ...prev };
                  delete updatedData[key];
                  return updatedData;
                });
              }
            }}
            checked={finalData[key] ?? false}
          />,
        ]);
      });
    setTotals({ totalDebit, totalCredit });
    setShowTotal(true);
    setMainData(arr);
    // }, [mainData, finalData]);
  }, [data, finalData]);

  const handleApproveAll = () => {
    if (toggle) {
      setFinalData({});
    } else {
      const allCheckedData = {};
      data?.forEach((i, key) => {
        allCheckedData[key] = i;
      });
      setFinalData(allCheckedData);
    }
    setToggle(!toggle);
  };

  // handle submit
  const handleSubmit = () => {
    if (Object.keys(finalData)?.length !== data?.length) {
      Swal.fire({
        // text: "Please ensure every checkbox is checked before proceeding with approval",
        text: "Approval cannot proceed until all required checkboxes are selected. Please confirm all items are checked",
        icon: "error",
      });
    } else {
      Swal.fire({
        text: "Are you sure you want to authorise?",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "red",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: "Processing...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          axios
            .post(
              API_SERVER + "/api/batch-posting-approval",
              {
                okay_procedure: "true",
                batch_no_v: batchNo || "",
                debit_amount_v: Number(totals?.totalDebit?.toFixed(2)) || 0,
                credit_amount_v: Number(totals?.totalCredit?.toFixed(2)) || 0,
                username_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
                global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
                form_code_v: "MAPP",
                global_prog_v: "React",
              },
              { headers }
            )
            .then((response) => {
              if (response.data?.length > 0) {
                Swal.close();
                const res_code = response?.data[0]?.RESPONSE_CODE;
                const res_mess = response?.data[0]?.RESPONSE_MESS;
                if (res_code) {
                  Swal.fire({
                    text: res_mess,
                    icon: res_code === "999" ? "error" : res_code === "000" ? "success" : null,
                  }).then(() => {
                    if (res_code === "000") {
                      setShowModal(false);
                      // handleClear()
                    }
                  });
                } else {
                  return;
                }
              } else {
                Swal.close();
              }
            })
            .catch((err) => console.error(`error here :${err}`));
        }
      });
    }
  };

  const handleReject = () => {
    Swal.fire({
      text: "Are you sure you want to reject these transactions?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        axios
          .post(
            API_SERVER + "/api/batch-posting-approval",
            {
              reject_procedure: "true",
              batch_no_v: batchNo || "",
              credit_amount_v: Number(totals?.totalCredit?.toFixed(2)) || 0,
              username_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
              global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              form_code_v: "MAPP",
              global_prog_v: "React",
            },
            { headers }
          )
          .then((response) => {
            if (response.data?.length > 0) {
              Swal.close();
              const res_code = response?.data[0]?.RESPONSE_CODE;
              const res_mess = response?.data[0]?.RESPONSE_MESS;
              if (res_code) {
                Swal.fire({
                  text: res_mess,
                  icon: res_code === "999" ? "error" : res_code === "000" ? "success" : null,
                }).then(() => {
                  if (res_code === "000") {
                    setShowModal(false);
                  }
                });
              } else {
                return;
              }
            } else {
              Swal.close();
            }
          })
          .catch((err) => console.error(`error here :${err}`));
      }
    });
  };

  return (
    <div className="p-2">
      <div>
        <ActionButtons
          displayFetch={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayRefresh={"none"}
          displayView={"none"}
          displayHelp={"none"}
          displayDelete={"none"}
          displayNew={"none"}
          onOkClick={handleSubmit}
          onRejectClick={handleReject}
        />
      </div>
      <hr className="mt-2" />
      <div className="w-full flex justify-evenly items-center py-3">
        <span className="w-[30%]" title={postedBy || ""}>
          <InputField
            label={"Posted By"}
            labelWidth={"25%"}
            inputWidth={"60%"}
            textAlign={"center"}
            fontWeight={"bold"}
            value={postedBy?.length > 15 ? postedBy?.substring(0, 22) + "...." : postedBy}
            disabled
          />
        </span>
        <span className="w-[30%]">
          <InputField
            label={"Posting Date"}
            labelWidth={"25%"}
            inputWidth={"60%"}
            textAlign={"center"}
            fontWeight={"bold"}
            value={postingDate}
            disabled
          />
        </span>
        <span className="w-[30%]">
          <InputField
            label={"Batch No"}
            labelWidth={"25%"}
            inputWidth={"60%"}
            textAlign={"center"}
            fontWeight={"bold"}
            value={batchNo}
            disabled
          />
        </span>
      </div>
      <hr className="" />

      {/* view doc  */}

      {/* show view doc modal   */}
      {showViewDoc && (
        <div>
          <ModalComponent
            open={showViewDoc}
            onClose={() => setShowViewDoc(false)}
            width={"60%"}
            padding={0}
            content={
              <div>
                <DocumentViewing documentID={documentId || ""} />
              </div>
            }
          />
        </div>
      )}

      {Object.keys(finalData)?.length !== 0 && (
        <p className="capitalize flex justify-end px-2 text-sm font-semibold pt-1 pb-1">
          {" "}
          No of rows added : {finalData ? Object.keys(finalData)?.length : 0}
          {/* No of rows added : {mainData ? mainData?.length : 0} */}
        </p>
      )}

      <div className="flex justify-between items-center mt-2 px-2">
        <ButtonComponent
          label={"Check Account Balances"}
          buttonWidth={"200px"}
          onClick={() => setOpenModal(true)}
        />
        <ButtonComponent
          label={toggle ? "Unapprove All" : "Approve All"}
          buttonWidth={"150px"}
          buttonBackgroundColor={CustomButtons?.save?.bgColor}
          onClick={handleApproveAll}
        />
      </div>

      {/* modal to show account balances  */}
      {openModal && (
        <ModalComponent
          open={openModal}
          // loading={loading2}
          width={"50%"}
          onClose={() => setOpenModal(false)}
          content={<AccountBalances formatNumber={formatNumber} />}
        />
      )}

      <div className="px-2 mt-3" style={{ zoom: 0.95 }}>
        <CustomTable
          headers={[
            "Account No",
            "Description",
            "Doc ref",
            "Transaction Details",
            "Amount Db",
            "Amount Cr",
            "Value Date",
            "Branch",
            "Currency",
            "Check",
          ]}
          data={mainData}
          style={{ columnAlignRight: [5, 6] }}
          rowsPerPage={10}
          load={loading}
        />
      </div>

      {showTotal && (
        <div>
          <hr className="mt-2" />
          <div className="flex justify-between px-2 py-2 font-semibold text-sm">
            <div className="w-[50%]">
              <span>
                Total Count : <span>{data?.length > 0 ? data?.length : 0}</span>
              </span>
            </div>
            <div className="w-[50%] flex justify-evenly">
              <span>
                Total Debit :{" "}
                <span className="text-red-400">
                  {totals?.totalDebit ? formatNumber(totals?.totalDebit?.toFixed(2)) : "0.00"}
                </span>
              </span>
              <span>
                Total Credit :{" "}
                <span className="text-green-400">
                  {totals?.totalCredit ? formatNumber(totals?.totalCredit?.toFixed(2)) : "0.00"}
                </span>
              </span>
            </div>
          </div>
          {/* <hr className="mb-3" /> */}
        </div>
      )}
    </div>
  );
};

export default BatchPostingApproval;
