import React, { useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import { Modal } from "@mantine/core";
import CustomButtons from "../../../../components/others/CustomButtons";
import DocumentViewing from "../../../../components/DocumentViewing";
import Swal from "sweetalert2";
import TextAreaField from "../../../../components/others/Fields/TextArea";
import axios from "axios";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
export default function ClosedAccountReinstatement() {
  const [myObj, setMyObj] = useState({ source_document: "" });
  const [showViewDoc, setShowViewDoc] = useState(false);

  // on key down
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      axios
        .post(
          API_SERVER + "/api/closed-account-reinstatement",
          { fetch: "true", acct_link: e.target.value },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            const data = response?.data[0];
            setMyObj((prev) => ({ ...prev, ...data }));
            const input = document.getElementById("source_document");
            input?.focus();
          } else if (response?.data?.length === 0) {
            axios
              .post(
                API_SERVER + "/api/get-error-message",
                { code: "07721" },
                { headers }
              )
              .then((response) => {
                if (response) {
                  Swal.fire({
                    text: response?.data,
                    icon: "error",
                  }).then(() => {
                    setMyObj({});
                    const input = document.getElementById("account_number");
                    input?.focus();
                  });
                }
              })
              .catch((err) => console.log(`error is :${err}`));
          } else {
            return false;
          }
        });
    }
  };

  // handle submit
  const handleSubmit = async () => {
    await axios
      .post(
        API_SERVER + "/api/closed-account-reinstatement",
        {
          procedure: "submit",
          acct_link: myObj ? myObj?.account_number : "",
          document_no: myObj ? myObj?.source_document : "",
          reason_v: myObj ? myObj?.reason : "",
          posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
          hostname_v: localStorage.getItem("ipAddress"),
          machine_ip: localStorage.getItem("ipAddress"),
          global_prog: "REACT",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const response_code = response?.data[0]?.RESPONSE_CODE;
          const response_mess = response?.data[0]?.RESPONSE_MESS;
          Swal.fire({
            text: response_mess,
            icon:
              response_code === "0"
                ? "error"
                : response_code === "1"
                ? "success"
                : "",
          }).then(() => {
            if (response_code === "1") {
              handleClear();
            }
          });
        } else {
          return false;
        }
      });
  };

  // handle clear on new button click
  const handleClear = () => {
    setMyObj({});
    setShowViewDoc(false);
  };

  // format date
  // function formatDate(dateString) {
  //   const originalDate = new Date(dateString);

  //   // Check if the date is valid
  //   if (isNaN(originalDate?.getTime())) {
  //     return ""; // Return empty string for invalid dates
  //   }

  //   const monthNames = {
  //     "01": "JAN",
  //     "02": "FEB",
  //     "03": "MAR",
  //     "04": "APR",
  //     "05": "MAY",
  //     "06": "JUN",
  //     "07": "JUL",
  //     "08": "AUG",
  //     "09": "SEP",
  //     10: "OCT",
  //     11: "NOV",
  //     12: "DEC",
  //   };

  //   const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
  //   const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
  //   const year = originalDate.getFullYear().toString()?.slice(-2);

  //   const formattedDate = `${day}-${month}-${year}`;
  //   return formattedDate.toUpperCase();
  // }
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

  // console.log(formatDate("2024-07-20")); // Output: 20-JUL-2024

  return (
    <div>
      <div>
        <ActionButtons
          displayFetch={"none"}
          displayRefresh={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayDelete={"none"}
          displayReject={"none"}
          onNewClick={handleClear}
          onOkClick={handleSubmit}
        />
      </div>
      <hr className="border border-1 mt-4 mb-4"></hr>

      <div className="p-3 flex justify-center">
        <div className="w-[80%] border rounded space-y-5">
          <div className="flex pt-5 space-x-5">
            <div className="w-[45%]">
              <InputField
                label={"Account No"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                required={true}
                name={"account_number"}
                onChange={(e) =>
                  setMyObj((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                value={myObj ? myObj?.account_number : ""}
                onKeyDown={handleOnKeyDown}
              />
            </div>
            <div className="w-[5%] invisible">
              <InputField
                label={"Account No"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                required={true}
              />
            </div>
            <div className="w-[45%] flex ">
              <span className="w-[65%]">
                <InputField
                  label={"Attach Document"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                  name={"source_document"}
                  id={"source_document"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.source_document : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const input = document.getElementById("reason");
                      input?.focus();
                    }
                  }}
                />
              </span>
              <span className="w-[25%]">
                <ButtonComponent
                  label={"View Doc"}
                  buttonHeight={"26px"}
                  buttonIcon={CustomButtons["viewDoc"]?.icon}
                  buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                  onClick={() => {
                    if (
                      myObj?.source_document === "" ||
                      myObj?.source_document === " " ||
                      myObj?.source_document === null
                    ) {
                      axios
                        .post(
                          API_SERVER + "/api/get-error-message",
                          { code: "01346" },
                          { headers }
                        )
                        .then((response) => {
                          if (response) {
                            Swal.fire({
                              text: response?.data,
                              icon: "error",
                            }).then(() => {
                              const input =
                                document.getElementById("source_document");
                              input?.focus();
                              setMyObj((prev) => ({
                                ...prev,
                                ["source_document"]: "",
                              }));
                            });
                          }
                        })
                        .catch((err) => console.log(`error is :${err}`));
                    } else {
                      setShowViewDoc(true);
                    }
                  }}
                />
              </span>

              {/* show view doc modal   */}
              {showViewDoc && (
                <div>
                  <Modal
                    opened={showViewDoc}
                    onClose={() => setShowViewDoc(false)}
                    trapFocus={false}
                    size={"100%"}
                    padding={0}
                  >
                    <DocumentViewing
                      documentID={myObj ? myObj?.source_document : ""}
                    />
                  </Modal>
                </div>
              )}
            </div>
          </div>

          {/* account name */}
          <div className="">
            <InputField
              label={"Account Name"}
              labelWidth={"18%"}
              inputWidth={"62%"}
              disabled={true}
              value={myObj ? myObj?.account_descrp : ""}
            />
          </div>

          {/* product */}
          <div>
            <InputField
              label={"Product"}
              labelWidth={"18%"}
              inputWidth={"62%"}
              disabled={true}
              value={myObj ? myObj?.product_desc : ""}
            />
          </div>

          {/* currency */}
          <div>
            <InputField
              label={"Currency"}
              labelWidth={"18%"}
              inputWidth={"62%"}
              disabled={true}
              value={myObj ? myObj?.currency_desc : ""}
            />
          </div>

          {/* branch */}
          <div>
            <InputField
              label={"Branch "}
              labelWidth={"18%"}
              inputWidth={"62%"}
              disabled={true}
              value={myObj ? myObj?.branch_desc : ""}
            />
          </div>

          {/* date closed */}
          <div>
            <InputField
              label={"Date Closed "}
              labelWidth={"18%"}
              inputWidth={"22%"}
              disabled={true}
              value={myObj ? formatDate(myObj?.date_account_closed) : ""}
            />
          </div>

          {/* reason */}
          <div className="pb-5">
            <TextAreaField
              label={"Reason"}
              labelWidth={"18%"}
              inputWidth={"62%"}
              required={true}
              cols={2}
              name={"reason"}
              id={"reason"}
              onChange={(e) =>
                setMyObj((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={myObj ? myObj?.reason : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
