import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";
import SelectField from "../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Swal from "sweetalert2";
import Label from "../../../../../components/others/Label/Label";

function ATMRequestDetails({
  atmCardTypeValue,
  atmCardDetails,
  phoneNumberField,
  atmCardTypeChange,
  atmLimit,
  atmDescription,
  atmLimitDuration,
}) {
  const linkOtherAccountsData = [
    [
      <ListOfValue inputWidth={"100%"} />,
      <InputField disabled inputWidth={"100%"} />,
    ],
    [
      <ListOfValue inputWidth={"100%"} />,
      <InputField disabled inputWidth={"100%"} />,
    ],
    [
      <ListOfValue inputWidth={"100%"} />,
      <InputField disabled inputWidth={"100%"} />,
    ],
  ];

  // format
  // number formatter
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [branches, setBranches] = useState([]);
  const [accountDescription, setAccountDescription] = useState("");
  const [validAccountDescription, setValidAccountDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [atmCardError, setATMCardError] = useState(false);
  const [sweetAlertShown, setSweetAlertShown] = useState(false);
  const [channelId, setChannelId] = useState("");

  // constants
  var user = JSON.parse(localStorage.getItem("userInfo")).id;

  // useEffect
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/branchEnquiry/branches", { headers })
      .then(function (response) {
        setBranches(response.data);

        if (response.data === []) {
          Swal.fire(response.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      setSweetAlertShown(false); // Reset the state when the component unmounts
    };
  }, []);

  const handleAccountNumber = (e) => {
    if (e.key === "Enter") {
      // if valid
      axios
        .post(
          API_SERVER + "/api/atm-card-valid-customer-details",
          {
            account_link: accountNumber,
          },
          { headers: headers }
        )
        .then(function (response) {
          setValidAccountDescription(response.data[0]?.account_description);
          setCurrency(response.data[0]?.currency);
          setPhoneNumber(response.data[0]?.phone_number);
          console.log(response.data, "billie");

          if (response.data === []) {
            Swal.fire("A valid Account Number is required", "", "error");
          }

          if (response.data === "A valid Account Number is required") {
            Swal.fire("A valid Account Number is required", "", "error");
          }
        })
        .catch((err) => console.log(err));

      // display other details
      axios
        .post(
          API_SERVER + "/api/atm-card-customer-details",
          { account_link: accountNumber },
          { headers: headers }
        )
        .then(function (response) {
          console.log(response.data, "customer details");
          setAccountDescription(response.data[0]?.account_descrp);
        })
        .catch((err) => console.log(err));

      // get available balance
      axios
        .post(
          API_SERVER + "/api/get-atm-available-balance",
          { account_link: accountNumber },
          { headers: headers }
        )
        .then(function (response) {
          setAccountBalance(response.data[0]?.post_av_bal);
        })
        .catch((err) => console.log(err));

      // validation 1
      axios
        .post(
          API_SERVER + "/api/atm-account-number-validation-1",
          { account_link: accountNumber, atm_card_type: atmCardTypeValue },
          { headers: headers }
        )
        .then(function (response) {
          console.log(response.data[0].count1, "customer");
          if (!sweetAlertShown) {
            if (response.data[0].count1 > 0) {
              Swal.fire(
                "ATM Card Type is already activated for this Customer",
                "",
                "question"
              );
              setAccountDescription("");
              setATMCardError(true);
            }
          }
        })
        .catch((err) => console.log(err));

      // validation 2
      axios
        .post(
          API_SERVER + "/api/atm-account-number-validation-2",
          { account_link: accountNumber, atm_card_type: atmCardTypeValue },
          { headers: headers }
        )
        .then(function (response) {
          console.log(response.data, "customer");

          if (response.data[0].count2 > 0) {
            Swal.fire(
              "ATM Card Has Already being Requested For this Customer, Pending Approval",
              "",
              "question"
            );
            setAccountDescription("");
            setATMCardError(false);
          }
        })
        .catch((err) => console.log(err));

      // get channel id
      axios
        .post(
          API_SERVER + "/api/get-channel-id",
          { username: user },
          { headers: headers }
        )
        .then(function (response) {
          setChannelId(response.data[0]?.user);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      {/* left side */}
      <div style={{ flex: 0.5, marginRight: "15px" }} className="space-y-4">
        <Header title="Card Detail" headerShade />

        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Account Number"}
              id={"account_link"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
              onKeyDown={handleAccountNumber}
              value={accountNumber}
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              inputWidth={"90%"}
              textAlign={"center"}
              disabled
              value={accountDescription}
            />
          </div>
        </div>

        <hr />

        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Currency"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              disabled
              value={currency}
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label={"A/C Balance"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={accountBalance}
              textAlign={"right"}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"ATM Card Limit"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              disabled
              textAlign={"right"}
              color={"red"}
              value={
                formatNumber(parseFloat(atmLimit)) === "NaN"
                  ? ""
                  : formatNumber(parseFloat(atmLimit))
              }
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label={"Limit Duration"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={atmDescription}
              onFocus={() => {
                if (atmCardError !== false) {
                  Swal.fire(
                    "ATM Card Type is already activated for this Customer",
                    "",
                    "question"
                  );
                  document.getElementById("account_link").focus();
                }
              }}
            />
          </div>
        </div>

        <InputField
          label="Card Display Name"
          required
          labelWidth={"20%"}
          inputWidth={"67.5%"}
          value={validAccountDescription}
          onChange={(e) => setValidAccountDescription(e.target.value)}
        />

        {/*phone number*/}
        {phoneNumberField && (
          <div>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}></div>

              <div style={{ width: "50%" }}>
                <InputField
                  label={"Phone No."}
                  required
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  value={phoneNumber}
                />
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}></div>

              <div style={{ width: "50%" }}>
                <Label
                  label={"[233299999999]"}
                  color={"gold"}
                  fontSize={"98%"}
                  textAlign={"center"}
                  labelWidth={"50%"}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* right section */}
      <div style={{ flex: 0.5 }}>
        <div>
          <Header title="Supplementary Accounts" headerShade />
          <Header title="Link Other Accounts" backgroundColor={"#a4e7bd"} />
          <CustomTable
            headers={["Account Number", "Account Name"]}
            data={linkOtherAccountsData}
            green
          />
        </div>

        <div
          className="space-y-4"
          style={{
            paddingBottom: "35px",
          }}
        >
          <Header title="Delivery" headerShade />

          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <SelectField
                label={"Delivery Channel"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                data={[
                  { value: "BRANCH", label: "Branch" },
                  { value: "COURRIER", label: "Courrier" },
                ]}
              />
            </div>

            <div style={{ width: "50%", marginRight: "5px" }}>
              <InputField
                label={"Channel ID"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                value={channelId}
              />
            </div>
          </div>

          <div>
            <ListOfValue
              label={"Collection Branch"}
              labelWidth={"15%"}
              inputWidth={"50%"}
              data={branches}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ATMRequestDetails;
