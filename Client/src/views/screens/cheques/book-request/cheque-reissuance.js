import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import InputField from "../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import AccountSummary from "../../../../components/others/AccountSummary";
import SelectField2 from "../../../../components/others/Fields/SelectField";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookIssuance() {
  const [accountDetails, setAccountDetails] = useState([]);
  const [myObj, setMyObj] = useState({ acct_link: "", no_of_leaves: "", start_no: "" });

  const handleChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
  };

  const getNewBatchNumber = async () => {
    await axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers,
      })
      .then((response) => {
        if (response?.data?.length > 0) {
          handleChange("request_id", response?.data[0]?.unique_ref);
        }
      })
      .catch((err) => console.log(`error in batch number: ${err}`));
  };

  useEffect(() => {
    getNewBatchNumber();
  }, []);

  const fetchData = async (e) => {
    handleChange("acct_link_on_enter", e.target.value);

    await axios
      .post(
        API_SERVER + "/api/cheque-reissuance",
        {
          validation: "true",
          acct_link: myObj ? myObj?.acct_link : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const data = response?.data[0];
          handleChange("account_descrp", data?.account_descrp);
          const input = document.getElementById("no_of_leaves");
          input?.focus();
        } else {
          axios
            .post(API_SERVER + "/api/get-error-message", { code: "06710" }, { headers })
            .then((response) => {
              if (response) {
                Swal.fire({
                  text: response.data,
                  icon: "error",
                }).then(() => {
                  handleChange("acct_link", "");
                  handleChange("account_descrp", "");
                });
              }
            })
            .catch((err) => console.log(`error is :${err}`));
        }
      });
  };

  const getBookRange = async (e) => {
    if (e.target.value === "") {
      await axios
        .post(API_SERVER + "/api/get-error-message", { code: "01311" }, { headers })
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
      await axios
        .post(
          API_SERVER + "/api/cheque-reissuance",
          {
            cheque_range_validation: "true",
            acct_link: myObj ? myObj?.acct_link : "",
            leaves_no: myObj ? parseInt(myObj?.no_of_leaves) : "",
            start_no: e.target.value,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            if (response?.data[0]?.RESPONSE_CODE === "0") {
              Swal.fire({
                text: response?.data[0]?.RESPONSE_MESS,
                icon: "error",
              }).then(() => {
                handleChange("start_no", "");
                handleChange("end_page", "");
              });
            } else if (response?.data[0]?.RESPONSE_CODE === "1") {
              const val = response?.data[0]?.RESPONSE_MESS?.split("*");
              handleChange("start_no", val[0]);
              handleChange("end_page", val[1]);
            } else {
              return;
            }
          }
        });
    }
  };

  // final okay
  const handleSubmit = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await axios
      .post(
        API_SERVER + "/api/cheque-reissuance",
        {
          okay_procedure: "true",
          acct_link: myObj ? myObj?.acct_link : "",
          request_id_v: myObj ? myObj?.request_id : "",
          leaves_no: myObj ? parseInt(myObj?.no_of_leaves) : "",
          start_no: myObj ? myObj?.start_no : "",
          end_page_v: myObj ? myObj?.end_page : "",
          global_username: userInfo?.id,
          // machine_ip_v: localStorage.getItem("ipAddress"),
          global_prog_v: "React",
          form_code: "SDIQ",
          // hostname_v: localStorage.getItem("ipAddress"),
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          Swal.close();
          const response_code = response?.data[0]?.RESPONSE_CODE;
          const response_mess = response?.data[0]?.RESPONSE_MESS;
          Swal.fire({
            text: response_mess,
            icon: response_code === "000" ? "error" : "success",
          }).then((result) => {
            if (result.isConfirmed && response_code === "999") {
              setMyObj("");
              setAccountDetails("");
              getNewBatchNumber();
            }
          });
        } else {
          Swal.close();
        }
      })
      .catch((err) => console.log(`error caught in account number: ${err}`));
  };

  //  clear to start a new request
  const handleClear = () => {
    setMyObj({ acct_link: "", no_of_leaves: "", start_no: "" });
    setAccountDetails("");
    getNewBatchNumber();
  };

  return (
    <div>
      <div>
        <div className="mx-4">
          <div className="p-1">
            <ActionButtons
              displayFetch={"none"}
              displayAuthorise={"none"}
              displayCancel={"none"}
              displayRefresh={"none"}
              displayView={"none"}
              displayHelp={"none"}
              displayDelete={"none"}
              displayReject={"none"}
              onOkClick={handleSubmit}
              onNewClick={handleClear}
            />
          </div>
          <hr className="my-[3px] mt-3" />
          {/* start of body  */}
          <div className="bg-white flex justify-end py-[10px] px-4 mb-2">
            <div>
              <InputField
                label={"Request ID"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled={true}
                textAlign={"center"}
                value={myObj ? myObj?.request_id : ""}
              />
            </div>
          </div>
          <hr className="my-[3px] mb-3" />
          <div className="flex space-x-3">
            <div className="w-[70%]">
              <div className="w-full rounded border-2 px-1 p-4">
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div className="">
                    <InputField
                      label={"Account Number"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchData(e);
                        }
                      }}
                      onChange={(e) => handleChange("acct_link", e.target.value)}
                      value={myObj ? myObj?.acct_link : ""}
                    />
                  </div>
                  <div className="">
                    <InputField
                      noMarginRight={true}
                      disabled={true}
                      inputWidth={"98.5%"}
                      value={myObj ? myObj?.account_descrp : ""}
                    />
                  </div>
                  {/* row 2  */}
                  <div className="">
                    <SelectField2
                      label={"Number of leaves"}
                      id={"no_of_leaves"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      required={true}
                      data={[
                        { value: 25, label: "25" },
                        { value: 50, label: "50" },
                        { value: 100, label: "100" },
                        { value: 150, label: "150" },
                        { value: 200, label: "200" },
                      ]}
                      onChange={(value) => {
                        handleChange("no_of_leaves", value);
                        const input = document.getElementById("start_no");
                        input?.focus();
                      }}
                      value={myObj ? myObj?.no_of_leaves : ""}
                    />
                  </div>
                  <div className="invisible">
                    <InputField
                      label={"Number of Leaves 2"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      id={"number_of_leaves"}
                      disabled={true}
                      value={myObj ? myObj?.leaves_no : ""}
                    />
                  </div>

                  {/* third row  */}
                  <div className="mb-4">
                    <InputField
                      label={"Start No"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      id={"start_no"}
                      required={true}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          getBookRange(e);
                        }
                      }}
                      onChange={(e) => handleChange("start_no", e.target.value)}
                      value={myObj ? myObj?.start_no : ""}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label={"End Page"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      disabled={true}
                      value={myObj ? myObj?.end_page : ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* account summary  */}
            <div className="w-[30%] ps-4">
              <AccountSummary
                accountNumber={myObj ? myObj?.acct_link_on_enter : ""}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChequeBookIssuance;
