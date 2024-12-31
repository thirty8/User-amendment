import React, { useEffect, useState } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import Swal from "sweetalert2";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import AccountSummary from "../../../../../../components/others/AccountSummary";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
// import ListOfValue from "../../../../../../components/others/Fields/ListOfValue2";
import ModalLoader from "../../../../../../components/others/ModalLoader";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function LienCreation({ batchNo, setShowModal }) {
  const [accountDetails, setAccountDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // get account details
    async function fetchData() {
      setLoading(true);
      await axios
        .post(
          API_SERVER + "/api/lien-cancellation-approval",
          {
            fetch_data: "true",
            req_no_v: batchNo || "",
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setFormData(response?.data[0]);
          }
          setLoading(false);
        })
        .catch((err) => `error caught on page load: ${err}`);
    }

    fetchData();
  }, []);

  // convert date to yy/mm/dd
  function formatDateToYMD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  // format date
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

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate?.toUpperCase();
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

  const handleSubmit = async () => {
    Swal.fire({
      text: "Are you sure you want to approve this request?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const response = await axios.post(
            API_SERVER + "/api/lien-creation-approval",
            {
              okay_procedure: "true",
              prc_type_v: "A",
              req_no_v: formData?.lien_number || "",
              account_number: formData?.acct_link || "",
              amount: isNaN(parseFloat(formData?.lien_amount))
                ? 0
                : Number(parseFloat(formData?.lien_amount).toFixed(2)),
              expiry_date: null,
              posted_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
              global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              form_code_v: "SDLR",
              global_prog_v: "React",
            },
            { headers }
          );

          if (response.data?.length > 0) {
            const res_code = response?.data[0]?.RESPONSE_CODE;
            const res_mess = response?.data[0]?.RESPONSE_MESS;

            if (res_code) {
              await Swal.fire({
                text: res_mess,
                icon: res_code === "999" ? "error" : res_code === "000" ? "success" : null,
              });

              if (res_code === "000") {
                setShowModal(false);
              }
            }
          }
        } catch (err) {
          console.error(`Error here: ${err}`);
        } finally {
          Swal.close();
        }
      }
    });
  };

  const handleReject = async () => {
    Swal.fire({
      text: "Are you sure you want to reject this request?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const response = await axios.post(
            API_SERVER + "/api/lien-creation-approval",
            {
              okay_procedure: "true",
              prc_type_v: "R",
              req_no_v: formData?.lien_number || "",
              account_number: formData?.acct_link || "",
              amount: isNaN(parseFloat(formData?.lien_amount))
                ? 0
                : Number(parseFloat(formData?.lien_amount).toFixed(2)),
              expiry_date: null,
              posted_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
              global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              form_code_v: "SDLR",
              global_prog_v: "React",
            },
            { headers }
          );

          if (response.data?.length > 0) {
            const res_code = response?.data[0]?.RESPONSE_CODE;
            const res_mess = response?.data[0]?.RESPONSE_MESS;

            if (res_code) {
              await Swal.fire({
                text: res_mess,
                icon: res_code === "999" ? "error" : res_code === "000" ? "success" : null,
              });

              if (res_code === "000") {
                setShowModal(false);
              }
            }
          }
        } catch (err) {
          console.error(`Error here: ${err}`);
        } finally {
          Swal.close();
        }
      }
    });
  };

  return (
    <div style={{ zoom: 0.9 }} className="px-4">
      {loading ? (
        <div className="flex justify-center w-full pt-[100px] pb-[100px]">
          <ModalLoader />
        </div>
      ) : (
        <div>
          <div className="mt-2 mb-2">
            <ActionButtons
              displayAuthorise={"none"}
              displayView={"none"}
              displayFetch={"none"}
              displayCancel={"none"}
              displayRefresh={"none"}
              displayDelete={"none"}
              displayHelp={"none"}
              displayNew={"none"}
              onExitClick={() => setShowModal(false)}
              onRejectClick={handleReject}
              onOkClick={handleSubmit}
            />
          </div>
          <hr className="mt-1 mb-1" />

          <div className="flex justify-end py-[6px] mb-2">
            <div>
              <InputField
                label={"Lien Number"}
                labelWidth={"30%"}
                inputWidth={"62%"}
                disabled={true}
                textAlign={"center"}
                value={formData?.lien_number || ""}
              />
            </div>
          </div>
          <hr className="mt-1" />

          <div className="flex w-full space-x-3 mt-3 mb-2">
            {/* left  */}
            <div className="w-[71%] border-2 rounded p-2 space-y-5">
              {/* <div className="w-full pt-2 pb-1">
                // <ListOfValue
                  label={"Lien Type"}
                  labelWidth={"17.8%"}
                  inputWidth={"78.5%"}
                  disabled
                  value={
                    Object.keys(formData)?.length > 0 &&
                    formData?.lien_code &&
                    formData?.lien_code_desc
                      ? `${formData.lien_code} - ${formData.lien_code_desc}`
                      : ""
                  }
                  data={[]}
                />
              </div>

              <hr /> */}

              {/* account no  */}
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-[45%]">
                  <InputField
                    label={"Account No"}
                    id={"account_no"}
                    type={"number"}
                    labelWidth={"40%"}
                    inputWidth={"56%"}
                    disabled
                    value={formData?.acct_link || ""}
                  />
                </div>

                <div className="w-[52.5%]">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"100%"}
                    disabled
                    value={formData?.account_name || ""}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-[54.2%]">
                  <div className="flex w-full space-x-3 items-center">
                    <div className="w-[80%]">
                      <InputField
                        label={"Lien Amount"}
                        id={"lien_amount"}
                        labelWidth={"42.3%"}
                        inputWidth={"50%"}
                        disabled
                        value={formData ? formatNumber(formData?.lien_amount) : ""}
                        textAlign={"right"}
                      />
                    </div>
                    <div className="w-[20%] invisible">
                      <ButtonComponent
                        label={"Sign Ver"}
                        buttonWidth={"100%"}
                        buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                        buttonIcon={CustomButtons?.sigVer?.icon}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="w-[43.1%]">
                  <div className="flex justify-end w-full space-x-3 items-center">
                    <div className="w-[75%]">
                      <InputField
                        label={"Effective Date"}
                        // labelWidth={"36%"}
                        // inputWidth={"64%"}
                        labelWidth={"40%"}
                        inputWidth={"55%"}
                        disabled
                        value={formData ? formatDateToYMD(formData?.effective_date) : ""}
                        type={"date"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-[54.2%]">
                  <div className="flex w-full space-x-3 items-center">
                    <div className="w-[80%]">
                      <InputField
                        label={"Next Review Date"}
                        labelWidth={"42.3%"}
                        inputWidth={"50%"}
                        type={"date"}
                        disabled
                        value={formData ? formatDateToYMD(formData?.next_review_date) : ""}
                      />
                    </div>
                    <div className="w-[20%] invisible">
                      <ButtonComponent
                        label={"Sign Ver"}
                        buttonWidth={"100%"}
                        buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                        buttonIcon={CustomButtons?.sigVer?.icon}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="w-[43.1%]">
                  <div className="flex justify-end w-full space-x-3 items-center">
                    <div className="w-[75%]">
                      <InputField
                        label={"Expiry Date"}
                        labelWidth={"40%"}
                        inputWidth={"55%"}
                        type={"date"}
                        disabled
                        value={formData ? formatDateToYMD(formData?.expiry_date) : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full pb-2">
                <TextAreaField
                  label={"Comments"}
                  labelWidth={"17.8%"}
                  inputWidth={"78.5%"}
                  disabled
                  value={formData?.comments || ""}
                />
              </div>
            </div>
            {/* right */}
            <div className="w-[29%] rounded" style={{ zoom: 0.9 }}>
              <AccountSummary
                accountNumber={formData?.acct_link || ""}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
