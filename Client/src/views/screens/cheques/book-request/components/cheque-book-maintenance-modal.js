import React, { useState, useEffect } from "react";
import DocumentViewing from "../../../../../components/DocumentViewing";
import CustomTable from "../../../../../components/others/customtable";
import axios from "axios";
import ModalComponent from "../../../../../components/others/Modal/modal";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import { Modal } from "@mantine/core";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ModalLoader from "../../../../../components/others/ModalLoader";
import Header from "../../../../../components/others/Header/Header";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookMaintenance({ opened, handleClose, rowData, setToggle }) {
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [myObj, setMyObj] = useState({ cheque_book_type: "" });
  const [myObj2, setMyObj2] = useState({});
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);
  const [dd, setDD] = useState([]);
  const [refetch, setRefetch] = useState(false);

  console.log({ breezy: rowData?.cheque_book_type });
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

  // check number of books to accept only number for validation
  function handleWholeNumberInput(value) {
    return /^(?!0{2,})\d+$/.test(value) ? value : "";
  }

  useEffect(() => {
    // get  details
    async function fetchData() {
      return await axios.post(
        API_SERVER + "/api/cheque-book-maintenance",
        {
          fetch_screen_two_details: "true",
          batch_number: rowData?.requisition_no,
        },
        {
          headers,
        }
      );
    }
    // get cheque range
    async function getRange() {
      return await axios.post(
        API_SERVER + "/api/cheque-book-maintenance",
        {
          fetch_cheque_range: "true",
          batch_number: rowData?.requisition_no,
          acct_link: rowData?.acct_link,
        },
        {
          headers,
        }
      );
    }
    async function gh() {
      setLoading(true);
      await Promise.all([fetchData(), getRange()]).then((response) => {
        setMyObj(response[0]?.data[0]);
        setMyData(response[1]?.data);
      });
      setLoading(false);
    }
    gh();
  }, []);

  useEffect(() => {
    const arr = [];
    myData?.map((i, key) => {
      arr.push([
        i?.request_id,
        i?.acct_link,
        <div className="flex justify-center">
          <div>
            <InputField
              noMarginRight={true}
              inputWidth={"100%"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getbookRange(key, e.target.value);
                }
              }}
              onChange={(e) => {
                setRefetch(!refetch);
                setMyObj2((prev) => ({
                  ...prev,
                  [`${key}`]: {
                    ...prev[key],
                    request_id: i?.request_id,
                    new_start_page: handleWholeNumberInput(e.target.value),
                  },
                }));
              }}
              value={myObj2 ? myObj2[key]?.new_start_page : ""}
            />
          </div>
        </div>,
        <div className="flex justify-center">
          <div>
            <InputField
              noMarginRight={true}
              inputWidth={"100%"}
              disabled={true}
              value={myObj2 ? myObj2[key]?.new_end_page : ""}
            />
          </div>
        </div>,
      ]);
    });

    setDD(arr);
  }, [myData, myObj2, refetch]);

  const getbookRange = async (key, value) => {
    let returnState = false;
    // previous value
    Object.entries(myObj2)?.map(([myKey, myValue]) => {
      const newKey = myKey - 1;
      const obj = { ...myObj2[newKey] };
      console.log(obj, "new obj");

      if (parseInt(value) < parseInt(obj["new_end_page"])) {
        returnState = true;
        return axios
          .post(API_SERVER + "/api/get-error-message", { code: "07783" }, { headers })
          .then((response) => {
            if (response?.data) {
              Swal.fire({
                text: response?.data,
                icon: "error",
              }).then((result) => {
                if (result) {
                  setMyObj2((prev) => ({
                    ...prev,
                    [`${key}`]: {
                      ...prev[key],
                      new_start_page: "",
                      new_end_page: "",
                    },
                  }));
                }
              });
            }
          })
          .catch((err) => console.log("error here:" + err));
      }
    });

    if (returnState === true) {
      return;
    }

    await axios
      .post(
        API_SERVER + "/api/cheque-book-maintenance",
        {
          cheque_range_validation: "true",
          acct_link: rowData?.acct_link,
          leaves_no: rowData?.leaves_no,
          start_no: value,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setRefetch(!refetch);
        if (response?.data?.length > 0) {
          if (response?.data[0]?.RESPONSE_CODE === "0") {
            Swal.fire({
              text: response?.data[0]?.RESPONSE_MESS,
              icon: "error",
            }).then(() =>
              setMyObj2((prev) => ({
                ...prev,
                [`${key}`]: {
                  ...prev[key],
                  new_start_page: "",
                  new_end_page: "",
                },
              }))
            );
          } else if (response?.data[0]?.RESPONSE_CODE === "1") {
            const val = response?.data[0]?.RESPONSE_MESS?.split("*");
            setMyObj2((prev) => ({
              ...prev,
              [`${key}`]: {
                ...prev[key],
                new_start_page: val[0],
                new_end_page: val[1],
              },
            }));
          } else {
            return;
          }
        }
      });
  };

  // final okay
  const handleSubmit = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // check if all ranges have been supplied
    if (Object.keys(myObj2)?.length !== parseInt(myObj?.number_of_books)) {
      return axios
        .post(API_SERVER + "/api/get-error-message", { code: "07781" }, { headers })
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            });
          }
        })
        .catch((err) => console.log("error caught in getting error message:" + err));
    }

    // loop through to obtain data
    const myData = Object.values(myObj2)?.map((i) => ({
      p_request_id_v: i?.request_id || "",
      p_start_page_no_v: parseInt(i?.new_start_page) || "",
      p_end_page_no_v: parseInt(i?.new_end_page) || "",
    }));

    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await axios
      .post(
        API_SERVER + "/api/cheque-book-maintenance",
        {
          handle_procedure: "true",
          prc_type_v: "M",
          data_v: myData,
          acct_link: rowData?.acct_link,
          global_bra_v: userInfo?.branchCode,
          global_username: userInfo?.id,
          batch_number: rowData?.requisition_no,
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
            icon: response_code !== "1" ? "error" : "success",
          }).then((result) => {
            if (result.isConfirmed && response_code === "1") {
              setMyObj("");
              setMyObj2("");
              setMyData([]);
              handleClose();
              setToggle(false);
            }
          });
        } else {
          Swal.close();
        }
      })
      .catch((err) => console.log(`error caught in account number: ${err}`));
  };

  // cancel request
  const handleCancel = async () => {
    Swal.fire({
      text: "Are you sure you want to reject this transaction?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
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
            API_SERVER + "/api/cheque-book-maintenance",
            {
              handle_procedure: "true",
              prc_type_v: "P",
              batch_number: rowData?.requisition_no,
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
                icon: response_code !== "1" ? "error" : "success",
              }).then((result) => {
                if (result.isConfirmed && response_code === "1") {
                  setMyObj("");
                  setMyObj2("");
                  setMyData([]);
                  handleClose();
                  setToggle(false);
                }
              });
            } else {
              Swal.close();
            }
          })
          .catch((err) => console.log(`error caught in canceling the request: ${err}`));
      }
    });
  };

  function handleDocumentNo() {
    if (
      myObj?.cheque_book_type === "" ||
      myObj?.cheque_book_type === null ||
      myObj?.cheque_book_type === undefined
    ) {
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers })
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then((result) => {
              if (result) {
              }
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={handleClose}
        trapFocus={false}
        withCloseButton={false}
        padding={0}
        size={"75%"}
      >
        <div style={{ zoom: 0.92 }}>
          <div>
            <Header
              title={"Cheque book maintenance"}
              closeIcon={true}
              handleClose={handleClose}
              headerShade={true}
            />
            {loading ? (
              <div className="flex justify-center pt-[100px] pb-[100px]">
                <ModalLoader />
              </div>
            ) : (
              <div>
                {sweetAlertConfirmed && (
                  <ModalComponent
                    open={sweetAlertConfirmed}
                    onClose={() => setSweetAlertConfirmed(false)}
                    width={"55%"}
                    content={
                      <div>
                        <DocumentViewing documentID={myObj ? myObj?.cheque_book_type : ""} />
                      </div>
                    }
                  />
                )}

                <div className="mt-2">
                  <ActionButtons
                    displayFetch={"none"}
                    displayAuthorise={"none"}
                    displayReject={"none"}
                    displayRefresh={"none"}
                    displayView={"none"}
                    displayHelp={"none"}
                    displayDelete={"none"}
                    displayNew={"none"}
                    onOkClick={handleSubmit}
                    onCancelClick={handleCancel}
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
                      value={myObj ? myObj?.requisition_no : ""}
                    />
                  </div>
                  <div className="me-2">
                    <InputField
                      label={"Request Date"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      disabled={true}
                      value={myObj ? formatDate(myObj?.posting_date) : ""}
                      textAlign={"center"}
                    />
                  </div>
                </div>
                {/* </div> */}
                <hr className="my-[3px] mb-3" />

                <div className="h-auto pb-2  px-2 mb-3 bg-white bg-red-400">
                  <div style={{ width: "100%" }} className="wrapper md:flex">
                    {/* here  */}
                    <div className="w-full rounded border-2 px-1">
                      <div className="w-full mt-1  pt-2">
                        <div
                          className="flex align-center w-full  pt-1"
                          style={{ marginBottom: "13px" }}
                        >
                          <div className="w-[46%]">
                            <InputField
                              label={"Account Number"}
                              labelWidth={"34.9%"}
                              inputWidth={"58.3%"}
                              disabled={true}
                              value={myObj ? myObj?.acct_link : ""}
                            />
                          </div>
                          <div className="w-[54%] ps-1">
                            <InputField
                              noMarginRight={true}
                              disabled={true}
                              inputWidth={"98.5%"}
                              value={myObj ? myObj?.account_desc : ""}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex space-x-6 items-center w-[100%]"
                        style={{ marginBottom: "13px" }}
                      >
                        {/* book style  */}
                        <div className="w-1/2">
                          <InputField
                            label={"Book Style"}
                            id={"book_style"}
                            labelWidth={"33%"}
                            disabled={true}
                            inputWidth={"55%"}
                            value={
                              Object.keys(myObj)?.length > 0 && myObj?.leaves_no === 25
                                ? "25 - SMALL"
                                : Object.keys(myObj)?.length > 0 && myObj?.leaves_no === 50
                                ? "50 - LARGE"
                                : ""
                            }
                          />
                        </div>

                        {/* number of leaves  */}
                        <div className="w-1/2">
                          <InputField
                            label={"Number of Leaves"}
                            labelWidth={"27%"}
                            inputWidth={"42.2%"}
                            id={"number_of_leaves"}
                            disabled={true}
                            value={myObj ? myObj?.leaves_no : ""}
                          />
                        </div>
                      </div>

                      <div className="" style={{ marginBottom: "13px" }}>
                        <InputField
                          label={"Number of Books"}
                          id={"number_of_books"}
                          labelWidth={"16.1%"}
                          inputWidth={"15%"}
                          disabled={true}
                          value={myObj ? myObj?.number_of_books : ""}
                        />
                      </div>

                      <div className="w-[58%] flex items-center" style={{ marginBottom: "13px" }}>
                        <div className="w-[80%] ">
                          <InputField
                            label={"Delivery Channel"}
                            labelWidth={"34.8%"}
                            inputWidth={"57.5%"}
                            disabled={true}
                            value={myObj ? myObj?.delivery_channel : ""}
                          />
                        </div>

                        <div className="w-[20%] invisible">
                          <ButtonComponent
                            // onClick={() => {
                            //   setShowModal(true);
                            // }}
                            label="Search"
                            buttonWidth="100%"
                            buttonHeight="27px"
                            buttonColor="white"
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          display: myObj?.delivery_channel === "Courrier" ? "flex" : "none",
                          alignItems: myObj?.delivery_channel === "Courrier" ? "center" : "none",
                          width: myObj?.delivery_channel === "Courrier" ? "100%" : "0",
                          marginBottom: myObj?.delivery_channel === "Courrier" ? "13px" : "0px",
                        }}
                      >
                        <div className="w-[100%]">
                          <InputField
                            label={"Address"}
                            labelWidth={"16.1%"}
                            inputWidth={"80.8%"}
                            value={myObj ? myObj?.address : ""}
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className={`space-x-6 flex`}>
                        <div
                          className={` ${
                            myObj?.delivery_channel === "Branch" ? "w-1/2" : "hidden"
                          } `}
                          style={{ marginBottom: "13px" }}
                        >
                          <InputField
                            label={"Delivery Branch"}
                            id={"delivery_branch"}
                            labelWidth={"33%"}
                            inputWidth={"55%"}
                            disabled={true}
                            value={
                              Object.keys(myObj)?.length > 0
                                ? `${myObj?.delivery_branch} - ${myObj?.branch_desc}`
                                : ""
                            }
                          />
                        </div>

                        {/* className="w-1/2 flex " */}
                        <div
                          className={` ${
                            myObj?.delivery_channel === "COURRIER"
                              ? "w-[58%] flex align-center"
                              : "w-1/2 flex"
                          } `}
                        >
                          <div
                            // w-[77%]
                            className={` ${
                              myObj?.delivery_channel === "Courrier" ? "w-[75%]" : "w-[77%]"
                            } `}
                          >
                            <InputField
                              label={"Document Number"}
                              id={"document_number"}
                              name={"document_number"}
                              labelWidth={myObj?.delivery_channel === "Courrier" ? "31%" : "37%"}
                              inputWidth={myObj?.delivery_channel === "Courrier" ? "61%" : "55%"}
                              type={"number"}
                              value={
                                myObj
                                  ? myObj?.cheque_book_type === "null"
                                    ? ""
                                    : myObj?.cheque_book_type
                                  : ""
                              }
                              disabled={true}
                            />
                          </div>

                          <div
                            className={`${
                              myObj?.delivery_channel === "Courrier" ? "w-[22%]" : "w-[25%] mb-4"
                            }`}
                          >
                            <ButtonComponent
                              label={"View Doc"}
                              buttonWidth={"95%"}
                              type={"button"}
                              buttonIcon={CustomButtons["viewDoc"]?.icon}
                              buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                              buttonHeight={"26px"}
                              buttonColor={"white"}
                              marginBottom={"20px"}
                              onClick={handleDocumentNo}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* custom table  */}
                  <div className="pt-5">
                    <CustomTable
                      headers={["S / No", "Account No", "Start Page", "End Page"]}
                      data={dd}
                      rowsPerPage={5}
                    />
                  </div>{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChequeBookMaintenance;
