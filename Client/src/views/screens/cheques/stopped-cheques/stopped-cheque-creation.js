import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import SearchModal from "../../../../components/others/SearchModal";
import Swal from "sweetalert2";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import AccountSummary from "../../../../components/others/AccountSummary";
import CustomButtons from "../../../../components/others/CustomButtons";
const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const StoppedChequeCreation = () => {
  const [myObj, setMyObj] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);
  const [chargeAccounts, setChargeAccounts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storedStoppedReason, setStoredStoppedReason] = useState([]);

  // handle on change on input fields
  const handleOnChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
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

  // const dates = new Date(JSON.parse(localStorage.getItem("userInfo"))?.postingDate);

  // format date to dd-mm-yyyy
  function formatDate(new_date) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const date = new Date(new_date);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return "";
    }

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  // get batch number and all currencies
  useEffect(() => {
    async function getBatchNumber() {
      return await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
    }
    async function getStoppedReason() {
      return await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CHS" },
        {
          headers,
        }
      );
    }

    Promise.all([getBatchNumber(), getStoppedReason()]).then((response) => {
      handleOnChange("batch_no", response[0]?.data[0]?.unique_ref);
      setStoredStoppedReason(response[1]?.data);
    });
  }, []);

  // getting new batch bumber
  const getNewBatchNumber = async () => {
    await axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers,
      })
      .then((response) => {
        if (response?.data?.length > 0) {
          handleOnChange("batch_no", response?.data[0]?.unique_ref);
        }
      })
      .catch((err) => console.log(`error in batch number: ${err}`));
  };

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

  const validateAccountNo = async (e, lov, value) => {
    try {
      setLoading(true);
      await axios
        .post(
          API_SERVER + "/api/stopped-cheque-creation",
          {
            account_number_validation: "true",
            acct_link_v: lov === true ? value : e.target.value,
            trans_code_v: "STCHG",
            batch_no_v: myObj?.batch_no || "",
            username_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
            global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
            form_code_v: "SDSC",
          },
          { headers }
        )
        .then((res) => {
          if (res?.data.length > 0) {
            if (res?.data[0]?.RESPONSE_CODE === "999") {
              Swal.fire({
                text: res?.data[0]?.RESPONSE_MESS,
                icon: "error",
              }).then(() => {
                setMyObj((prev) => ({
                  ...prev,
                  account_name: "",
                  account_no: "",
                  account_no_on_entered: "",
                }));
                setAccountDetails([]);
                setChargeAccounts([]);
              });
            }
          }
        });
    } catch (err) {
      console.log("error caught:" + err);
    } finally {
      setLoading(false);
    }
  };

  async function handleAccountNoKeyDown(e) {
    setMyObj((prev) => ({
      ...prev,
      charge_account: "",
      account_no_on_entered: e.target.value,
    }));
    validateAccountNo(e, false, null);
  }

  function handleSelected(value) {
    setMyObj((prev) => ({
      ...prev,
      account_no: value?.accountNumber,
      account_no_on_entered: value?.accountNumber,
      account_name: value?.accountName,
    }));
    validateAccountNo(null, true, value?.accountNumber);
    setShowModal(false);
  }

  const fetchTableData = async () => {
    let sum = 0;
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/stopped-cheque-creation",
        { fetch_fees: "true", batch_no_v: myObj?.batch_no || "" },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.forEach((i) => {
            sum += i?.credit_amount;
            arr.push([
              "STCHG",
              i?.acct_link,
              i?.account_name,
              i?.transaction_details,
              formatNumber(i?.credit_amount),
              i?.currency,
            ]);
          });

          arr.push([
            "",
            "",
            "",
            <span className="font-semibold text-right">Total</span>,
            <span className="font-semibold">{formatNumber(sum)}</span>,
            "",
          ]);

          handleOnChange("total_fee", sum);
        }

        setTableData(arr);
      })
      .catch((err) => console.log("error in fees:" + err));
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        fetchTableData();
      }, 400);
    }
  }, [loading]);
  //   fetch charge account numbers
  const fetchAllAccountNumbers = async (customer_no) => {
    await axios
      .post(
        API_SERVER + "/api/stopped-cheque-creation",
        {
          get_all_customer_numbers: "true",
          customer_no,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setChargeAccounts(response?.data);
        }
      })
      .catch((err) => console.log(`error caught in debit bban: ${err}`));
  };

  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      setMyObj((prev) => ({
        ...prev,
        stop_date: formatDateToYMD(JSON.parse(localStorage.getItem("userInfo"))?.postingDate),
        account_name: accountDetails?.summary[0]?.account_name,
      }));
      const input = document.getElementById("cheque_no");
      input?.focus();

      fetchAllAccountNumbers(accountDetails?.summary[0]?.customer_no);
    }
  }, [accountDetails]);

  //   cheque no validation
  const chequeNoValidation = async (e) => {
    await axios
      .post(
        API_SERVER + "/api/stopped-cheque-creation",
        {
          cheque_no_validation: "true",
          acct_link_v: myObj?.account_no_on_entered || "",
          cheque_no_v: e.target.value,
        },
        { headers }
      )
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          if (data[0]?.RESPONSE_CODE === "999") {
            Swal.fire({
              text: data[0]?.RESPONSE_MESS,
              icon: "error",
            }).then(() => {
              handleOnChange("cheque_no", "");
              const input = document.getElementById("cheque_no");
              input?.focus();
            });
          } else {
            const input = document.getElementById("cheque_no_end");
            input?.focus();
          }
        }
      })
      .catch((err) => console.log(`error caught in debit bban: ${err}`));
  };

  const handleNewClick = () => {
    setTimeout(() => {
      setMyObj("");
      setTableData([]);
      getNewBatchNumber();
      setAccountDetails([]);
      setChargeAccounts([]);
    }, 100);
  };

  const handleSubmit = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await axios.post(
        API_SERVER + "/api/stopped-cheque-creation",
        {
          okay_procedure: "true",
          acct_link_v: myObj?.account_no_on_entered || "",
          charge_acct_link_v: myObj?.charge_account_no || "",
          batch_no_v: myObj?.batch_no || "",
          cheque_no_v: isNaN(parseFloat(myObj?.cheque_no))
            ? 0
            : Number(parseFloat(myObj?.cheque_no)),
          cheque_no_end_v: isNaN(parseFloat(myObj?.cheque_no_end))
            ? 0
            : Number(parseFloat(myObj?.cheque_no_end)),
          amount_on_cheque_v: isNaN(parseFloat(myObj?.cheque_amount))
            ? 0
            : Number(parseFloat(myObj?.cheque_amount).toFixed(2)),
          reason_code_v: myObj?.stop_reason || "",
          payee_details_v: myObj?.payee_information || "",
          date_on_cheque_v: formatDate(myObj?.date_on_cheque) || "",
          date_stopped_v: formatDate(myObj?.stop_date) || "",
          username_v: userInfo?.id,
          global_branch_v: userInfo?.branchCode,
          form_code_v: "SDSC",
          global_prog_v: "React",
          total_v: isNaN(parseFloat(myObj?.total_fee))
            ? 0
            : Number(parseFloat(myObj?.total_fee).toFixed(2)),
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
              setMyObj("");
              setTableData([]);
              getNewBatchNumber();
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
        onNewClick={handleNewClick}
        onOkClick={handleSubmit}
      />
      <hr className="mt-1" />

      <div className="flex justify-end py-3">
        <div>
          <InputField
            label={"Batch No"}
            labelWidth={"30%"}
            inputWidth={"61%"}
            textAlign={"center"}
            value={myObj?.batch_no || ""}
            disabled
          />
        </div>
      </div>
      <hr />

      <div className="flex w-full space-x-3 mt-2">
        {/* left  */}
        <div className="w-[71%] border-2 rounded p-2 space-y-3">
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
                value={myObj?.account_no || ""}
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
                value={myObj?.account_name || ""}
              />
            </div>
          </div>

          {/* cheque no and cheque no end  */}
          <div className="flex items-center space-x-3">
            <div className="w-[54.2%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[80%]">
                  <InputField
                    label={"Cheque No"}
                    labelWidth={"42.3%"}
                    inputWidth={"50%"}
                    id={"cheque_no"}
                    onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                    value={myObj?.cheque_no || ""}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        chequeNoValidation(e);
                      }
                    }}
                    required
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
                    label={"Cheque No End"}
                    id={"cheque_no_end"}
                    labelWidth={"36%"}
                    inputWidth={"64%"}
                    onChange={(e) => handleOnChange("cheque_no_end", e.target.value)}
                    value={myObj?.cheque_no_end || ""}
                    type={"number"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* cheque amount and date on cheque   */}
          <div className="flex items-center space-x-3">
            <div className="w-[54.2%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[80%]">
                  <InputField
                    label={"Cheque Amount"}
                    labelWidth={"42.3%"}
                    inputWidth={"50%"}
                    onChange={(e) => handleOnChange("cheque_amount", e.target.value)}
                    value={myObj?.cheque_amount || ""}
                    onBlur={(e) => {
                      const currentDate = new Date();
                      const formattedTime = currentDate.toLocaleTimeString("en-GB", {
                        hour12: false,
                      });
                      handleOnChange("time_reported", formattedTime);
                      handleOnChange(
                        "date_on_cheque",
                        formatDateToYMD(JSON.parse(localStorage.getItem("userInfo"))?.postingDate)
                      );
                      chequeNoValidation(e);
                    }}
                    type={"number"}
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
                    label={"Date on Cheque"}
                    labelWidth={"36%"}
                    inputWidth={"64%"}
                    onChange={(e) => handleOnChange("date_on_cheque", e.target.value)}
                    value={myObj?.date_on_cheque || ""}
                    type={"date"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* time reported  and stop date   */}
          <div className="flex items-center space-x-3">
            <div className="w-[54.2%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[80%]">
                  <InputField
                    label={"Time Reported"}
                    labelWidth={"42.3%"}
                    inputWidth={"50%"}
                    onChange={(e) => handleOnChange("time_reported", e.target.value)}
                    value={myObj?.time_reported || ""}
                    disabled
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
                    label={"Stop Date"}
                    labelWidth={"36%"}
                    inputWidth={"64%"}
                    type={"date"}
                    value={myObj?.stop_date || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <InputField
              label={"Payee Information"}
              labelWidth={"17.8%"}
              inputWidth={"78.5%"}
              onChange={(e) => handleOnChange("payee_information", e.target.value?.toUpperCase())}
              value={myObj?.payee_information || ""}
            />
          </div>

          <div className="w-[65%] pt-1">
            <ListOfValue
              label={"Stop Reason"}
              labelWidth={"27.5%"}
              inputWidth={"52%"}
              onChange={(value) => {
                const label = storedStoppedReason
                  ?.find((i) => i?.value === value)
                  ?.label?.split("-")[1]
                  ?.trim();
                handleOnChange("stop_reason", value);
                handleOnChange("stop_reason_desc", label);
              }}
              value={myObj?.stop_reason || ""}
              data={storedStoppedReason}
              required
            />
          </div>
          {/* 
          <div className="w-[65%]">
            <ListOfValue
              label={"Mode Of Communication"}
              labelWidth={"27.5%"}
              inputWidth={"52%"}
              onChange={(value) => handleOnChange("mode_of_com", value)}
              value={myObj?.mode_of_com || ""}
              data={storedModeOfCom}
              required
            />
          </div> */}

          <hr className="mt-1" />

          <div className="w-[98%] pb-1">
            <ListOfValue
              label={"Charge Account"}
              labelWidth={"18.2%"}
              inputWidth={"80%"}
              onChange={(value) => {
                const myVar = value?.split("*");
                handleOnChange("charge_account_no", myVar[0]?.trim());
                handleOnChange("charge_account_balance", myVar[2]?.trim());
                handleOnChange("charge_account", value);
              }}
              value={myObj?.charge_account || ""}
              data={chargeAccounts}
              required
            />
          </div>
        </div>
        {/* right */}
        <div className="w-[29%] rounded">
          <AccountSummary
            accountNumber={myObj?.account_no_on_entered || ""}
            setAccountDetails={setAccountDetails}
          />
        </div>
      </div>

      <div className="mt-4">
        <CustomTable
          headers={[
            "Chg Code",
            "Fee Account",
            "Fee Account Description",
            "Fee Description",
            "Fee Amount Per Book",
            "Currency",
          ]}
          style={{ columnAlignRight: [5] }}
          data={tableData}
          rowsPerPage={6}
          load={loading}
        />
      </div>
    </div>
  );
};

export default StoppedChequeCreation;
