import React, { useEffect, useState } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import Swal from "sweetalert2";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import SearchModal from "../../../../components/others/SearchModal";
import AccountSummary from "../../../../components/others/AccountSummary";
import CustomButtons from "../../../../components/others/CustomButtons";
import TextAreaField from "../../../../components/others/Fields/TextArea";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function LienCreation() {
  const [lienType, setLienType] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    async function getLienTypes() {
      await axios
        .post(
          API_SERVER + "/api/get-code-details",
          { code: "LIE" },
          {
            headers,
          }
        )
        .then((res) => {
          if (res.data.length > 0) {
            setLienType(res.data);
          }
        })
        .catch((err) => console.log("error caught:" + err));
    }
    getLienTypes();
  }, []);

  function handleNew() {
    setFormData("");
    setAccountDetails([]);
  }

  // handle on change on input fields
  const handleOnChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // convert date to yy/mm/dd
  function formatDateToYMD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  async function handleAccountNoKeyDown(e) {
    setFormData((prev) => ({
      ...prev,
      // charge_account: "",
      account_no_on_entered: e.target.value,
    }));
  }

  function handleSelected(value) {
    setFormData((prev) => ({
      ...prev,
      account_no: value?.accountNumber,
      account_no_on_entered: value?.accountNumber,
      account_name: value?.accountName,
    }));
    setShowModal(false);
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

  const handleSubmit = async () => {
    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await axios.post(
        API_SERVER + "/api/lien-creation",
        {
          okay_procedure: "true",
          account_number: formData?.account_no_on_entered || "",
          lien_type: formData?.lien_type || "",
          amount: isNaN(parseFloat(formData?.lien_amount))
            ? 0
            : Number(parseFloat(formData?.lien_amount).toFixed(2)),
          effective_date: formData?.effective_date ? formatDate(formData?.effective_date) : "",
          expiry_date: formData?.expiry_date ? formatDate(formData?.expiry_date) : "",
          next_review_date: formData?.next_review_date
            ? formatDate(formData?.next_review_date)
            : "",
          comments: formData?.comments || "",
          posted_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
          global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
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
            setTimeout(() => {
              setFormData("");
              setAccountDetails([]);
            }, 100);
          }
        }
      }
    } catch (err) {
      console.error(`Error here: ${err}`);
    } finally {
      Swal.close();
    }
  };

  // handle errors to fetch all errors
  const fetchErrors = async (error_code, field, clear) => {
    return await axios
      .post(API_SERVER + "/api/get-error-message", { code: error_code }, { headers })
      .then((response) => {
        if (response?.data?.length > 0) {
          const mess = response?.data;
          Swal.fire({
            text: mess,
            icon: "error",
          }).then(() => {
            if (clear) {
              setFormData((prev) => ({
                ...prev,
                account_no: "",
                account_no_on_entered: "",
                account_name: "",
              }));
              setAccountDetails([]);
            }

            const input = document.getElementById(field);
            setTimeout(() => {
              input?.focus();
            }, 300);
          });
        }
      });
  };
  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      const data = accountDetails?.summary[0];
      if (data.status_indicator?.includes("CLOS")) {
        fetchErrors("00150", "account_no", true);
      } else {
        setFormData((prev) => ({
          ...prev,
          account_name: accountDetails?.summary[0]?.account_name,
        }));
        const input = document.getElementById("lien_amount");
        input?.focus();
      }
    } else if (accountDetails && accountDetails?.summary?.length === 0) {
      fetchErrors("00354", "account_no", true);
    } else {
      return;
    }
  }, [accountDetails]);

  return (
    <div>
      <ActionButtons
        displayAuthorise={"none"}
        displayView={"none"}
        displayFetch={"none"}
        displayCancel={"none"}
        displayRefresh={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        onNewClick={handleNew}
        onOkClick={handleSubmit}
      />
      <hr className="mt-1" />

      <div className="flex w-full space-x-3 mt-3">
        {/* left  */}
        <div className="w-[71%] border-2 rounded p-2 space-y-5">
          <div className="w-full pt-2 pb-1">
            <ListOfValue
              label={"Lien Type"}
              labelWidth={"17.8%"}
              inputWidth={"78.5%"}
              required
              onChange={(value) => handleOnChange("lien_type", value)}
              value={formData?.lien_type || ""}
              data={lienType}
            />
          </div>

          <hr />

          {/* account no  */}
          <div className="flex items-center space-x-3">
            <div className="w-[45%]">
              <InputField
                label={"Account No"}
                id={"account_no"}
                type={"number"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                required
                value={formData?.account_no || ""}
                onChange={(e) => {
                  handleOnChange("account_no", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAccountNoKeyDown(e, false, null);
                  }
                }}
              />
            </div>
            <div className="w-[8%]">
              <ButtonComponent
                onClick={() => {
                  setShowModal(true);
                }}
                label="Search"
                buttonWidth="100%"
                buttonHeight="27px"
                buttonColor="white"
              />
            </div>

            <SearchModal
              setShowModal={setShowModal}
              showModal={showModal}
              handleSelected={handleSelected}
            />
            <div className="w-[43%]">
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
                    onChange={(e) => handleOnChange("lien_amount", e.target.value)}
                    value={formData?.lien_amount || ""}
                    textAlign={"right"}
                    required
                    onBlur={() => {
                      handleOnChange(
                        "effective_date",
                        formatDateToYMD(JSON.parse(localStorage.getItem("userInfo"))?.postingDate)
                      );
                      // chequeNoValidation(e);
                    }}
                    type={"number"}
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
                    labelWidth={"36%"}
                    inputWidth={"64%"}
                    disabled
                    // onChange={(e) => handleOnChange("effective_date", e.target.value)}
                    value={formData?.effective_date || ""}
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
                    required
                    type={"date"}
                    onChange={(e) => handleOnChange("next_review_date", e.target.value)}
                    value={formData?.next_review_date || ""}
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
                    required
                    labelWidth={"36%"}
                    inputWidth={"64%"}
                    type={"date"}
                    onChange={(e) => handleOnChange("expiry_date", e.target.value)}
                    value={formData?.expiry_date || ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full pb-2">
            <TextAreaField
              label={"Comments"}
              labelWidth={"17.8%"}
              // required
              inputWidth={"78.5%"}
              onChange={(e) => handleOnChange("comments", e.target.value?.toUpperCase())}
              value={formData?.comments || ""}
            />
          </div>
        </div>
        {/* right */}
        <div className="w-[29%] rounded">
          <AccountSummary
            accountNumber={formData?.account_no_on_entered || ""}
            setAccountDetails={setAccountDetails}
          />
        </div>
      </div>
    </div>
  );
}
