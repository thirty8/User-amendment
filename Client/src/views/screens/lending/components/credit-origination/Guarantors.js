import React, { useState, useEffect } from "react";
// import InputField from "../../../../../components/others/Fields/InputField";
// import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../fields/InputField.jsx";
import ListOfValue from "../fields/ListOfValue.jsx";
import SelectField from "../fields/SelectField.jsx";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
// import { Modal, Textarea } from "@mantine/core";
import { Modal } from "antd";
import Header from "../../../../../components/others/Header/Header";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { MdAddCircle, MdOutlineSaveAlt } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineSms } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { FaComments, FaUserCircle } from "react-icons/fa";
import { HiSave } from "react-icons/hi";
import Findgua from "../search/Findgua.js";
import { TbUserSearch } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";

const Guarantors = ({
  customerNumber,
  appNumber,
  guarantorLimit,
  guarantorBeneficiaryLimit,
  docTab,
  empTab,
}) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [guarantorModal, setGuarantorModal] = useState(false);
  const [guarantorInfoData, setGuarantorInfoData] = useState([]);
  const [guaranteesInfo, setGuaranteesInfo] = useState("");
  const [guarantorInfoDetails, setGuarantorInfoDetails] = useState([]);
  const [guaranteeAmount, setGuaranteeAmount] = useState("");
  const [memberName, setMemberName] = useState("");
  const [savings, setSavings] = useState("");
  const [noOfGuarantees, setNoOfGuarantees] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [memberID, setMemberID] = useState("");
  const [data, setData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [memberInfo, setMemberInfo] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [numberOfAcc, setNumberOfAcc] = useState("");

  ///////////////////////////////////////////////////////////////

  const [guarantorNameLov, setGuarantorNameLov] = useState([]);
  const [guarantorNumber, setGuarantorNumber] = useState("");
  const [guaRelationLov, setGuaRelationLov] = useState([]);
  const [guaRelation, setGuaRelation] = useState("");
  const [guaType, setGuaType] = useState("");
  const [guaAcct, setGuaAcct] = useState("");
  const [idType, setIdType] = useState("");
  const [idT, setIdT] = useState("");
  const [idNo, setIdNo] = useState("");
  const [idIssueDate, setIdIssueDate] = useState("");
  const [idExpiryDate, setIdExpiryDate] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [placeBirth, setPlaceBirth] = useState("");
  const [residentialAdd, setResidentialAdd] = useState("");
  const [postalAdd, setPostal] = useState("");
  const [residenceSince, setResidenceSince] = useState("");
  const [telephone, setTelePhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [employedSince, setEmployedSince] = useState("");
  const [position, setPosition] = useState("");
  const [endService, setEndService] = useState("");
  const [netIncome, setNetIncome] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [tableData, setTableData] = useState([]);

  ///////////////////////////////////////////////////////

  const [toggle, setToggle] = useState(false);
  const [gua, setGua] = useState("");
  const [guarantorName, setGuarantorName] = useState("");

  // constants
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // local storage
  var userName = JSON.parse(localStorage.getItem("userInfo")).id;

  // functions
  // function formatNumber(amount) {
  //   const formattedAmount = amount.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   });

  //   const amountWithoutCurrency = formattedAmount.replace("$", "");
  //   return amountWithoutCurrency;
  // }

  function formatNumber(num) {
    const numericInput = String(num).replace(/[^0-9.]/g, "");
    // Convert the input to a number and check if it's valid
    const number = parseFloat(numericInput);

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  const handleGuaranteeAmount = () => {
    if (parseFloat(guaranteeAmount) > parseFloat(diff)) {
      Swal.fire(
        "ERR - 1209",
        "Guarantee amount should not be greater or equal to the amount granted",
        "warning"
      );
    }
  };

  // useEffect(() => {
  //   async function getGuarantors() {
  //     let response = await axios.get(API_SERVER + "/api/get-loan-guarantors", {
  //       headers,
  //     });
  //     setGuarantorNameLov(response.data);
  //   }

  //   async function getRelation() {
  //     let response = await axios.post(
  //       API_SERVER + "/api/get-code-details",
  //       { code: "GUT" },
  //       {
  //         headers,
  //       }
  //     );
  //     // response = await response();
  //     //  console.log(response);
  //     setGuaRelationLov(response.data);
  //   }

  //   getRelation();
  //   // getGuarantors();
  // }, []);

  // useEffect(() => {
  async function getGuarantors(type1) {
    await axios
      .post(
        API_SERVER + "/api/get-guarantors",
        { type: type1, member_id: memberID },
        {
          headers,
        }
      )
      .then((response) => {
        console.log({ response });
        if (response.data) {
          setGuarantorInfoData(response.data);
          setGuarantorModal(true);
        }
      });
  }

  // getGuarantors();
  // }, []);

  const handleGenerateesInfo = () => {
    axios
      .post(
        API_SERVER + "/api/guarantees_info",
        {
          app_no: appNumber,
          ben_member_id: customerNumber,
          guarantor_member_id: memberID,
          guarantee_amount: NumberWithoutCommas(guaranteeAmount),
          postedBy: userName,
          guarantor_member_name: memberName,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        // console.log(response.data, "dattttt");
        if (response.data.responseCode === "000") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "The guarantor has been added successfully.",
          });
          setCheckData(!checkData);
          setMemberName("");
          setSavings("");
          setGuarantee("");
          setNoOfGuarantees("");
          setAvailableBalance("");
          setGuaranteeAmount("");
          setMemberInfo("");
          setPhone("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function formatDate(date) {
  //   const eDate = new Date(date);
  //   const effective_date = eDate
  //     .toLocaleDateString("en-GB", {
  //       day: "numeric",
  //       month: "short",
  //       year: "numeric",
  //     })
  //     .replace(/ /g, "-");
  //   return effective_date;
  // }

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
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

    // Pad the day with a leading zero if it's a single digit
    var day = inputDate.getDate();
    var paddedDay = day < 10 ? "0" + day : day;

    return (
      paddedDay +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  const getGua = () => {
    axios
      .post(
        API_SERVER + "/api/get-guarantor-data",
        { loan_app_no: appNumber },
        { headers }
      )
      .then((res) => {
        if (res.data) {
          let arr = [];
          res.data.map((i) => {
            arr.push([
              i.guarantor_member_id,
              i.guarantor_member_name,
              <div className="font-semibold">
                {i.guarantee_amount === "null"
                  ? ""
                  : formatNumber(parseFloat(i.guarantee_amount))}
              </div>,
              // formatDate(i.posting_date),
              formatDate(i.posting_sysdate),
              i.posted_by,
              // <div>
              //   <div

              //     className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              //   >
              //     <MdAddCircle size={20} />
              //   </div>
              // </div>,
            ]);
          });
          setData(arr);
        }
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGua();
  }, [checkData]);

  const guaranData = data.map((item) => {
    return [];
  });

  // useEffect(() => {
  //   axios
  //     .get(
  //       API_SERVER + "/api/get-guarantor-info-lov",

  //       {
  //         headers: headers,
  //       }
  //     )
  //     .then(function (response) {
  //       setGuarantorInfoData(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(data, "ddddd");

  function guaranteeAmountBlur() {
    setGuaranteeAmount(formatNumber(guaranteeAmount));
  }

  function generateGuarantorDetails(v) {
    axios
      .post(
        API_SERVER + "/api/get-guarantor-details",
        {
          customer_no: v,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        axios
          .post(
            API_SERVER + "/api/get-id-desc",
            {
              id_type: response.data[0]?.id_type,
            },
            {
              headers,
            }
          )
          .then(function (response) {
            setIdType(
              response.data[0]?.identification === "null"
                ? ""
                : response.data[0]?.identification
            );
          });
        axios
          .post(
            API_SERVER + "/api/get-country-desc",
            {
              code: response.data[0]?.nationality,
            },
            {
              headers,
            }
          )
          .then(function (response) {
            setPlaceBirth(
              response.data[0]?.country === "null"
                ? ""
                : response.data[0]?.country
            );
          });
        axios
          .post(
            API_SERVER + "/api/get-gua-acct",
            {
              customer_no: response.data[0]?.customer_number,
            },
            {
              headers,
            }
          )
          .then(function (response) {
            setGuaAcct(
              response.data[0]?.acct_link === "null"
                ? ""
                : response.data[0]?.acct_link
            );
          });
        setResidentialAdd(
          response.data[0]?.residential_address === "null"
            ? ""
            : response.data[0]?.residential_address
        );
        setTelePhone(
          response.data[0]?.mobile1 === "null" ? "" : response.data[0]?.mobile1
        );
        setIdNo(
          response.data[0]?.id_number === "null"
            ? ""
            : response.data[0]?.id_number
        );
        setResidenceSince(
          response.data[0]?.resident_since === "null"
            ? ""
            : formatDate(response.data[0]?.resident_since)
        );
        setDateBirth(
          response.data[0]?.date_of_birth === "null"
            ? ""
            : formatDate(response.data[0]?.date_of_birth)
        );
        setIdIssueDate(
          response.data[0]?.id_issue_date === "null"
            ? ""
            : formatDate(response.data[0]?.id_issue_date)
        );
        setIdExpiryDate(
          response.data[0]?.id_expiry_date === "null"
            ? ""
            : formatDate(response.data[0]?.id_expiry_date)
        );
        setPostal(
          response.data[0]?.postal_address === "null"
            ? ""
            : response.data[0]?.postal_address
        );
        setIdT(
          response.data[0]?.id_type === "null" ? "" : response.data[0]?.id_type
        );
        setEmail(
          response.data[0]?.email_address === "null"
            ? ""
            : response.data[0]?.email_address
        );
        setResidenceSince(
          response.data[0]?.resident_since === "null"
            ? ""
            : formatDate(response.data[0]?.resident_since)
        );
        setFullname(
          response.data[0]?.fullname === "null"
            ? ""
            : response.data[0]?.fullname
        );
        // setIntArr(formatNumber(parseFloat(response.data[0]?.int_arr)));
      });
  }

  function saveGuaDetails() {
    if (tableData?.length > 10)
      axios
        .post(
          API_SERVER + "/api/save-guarantor-details",
          {
            app_no: appNumber,
            fname: fullname,
            post_address: postalAdd,
            res_address: residentialAdd,
            phone: telephone,
            id_type: idT,
            id_no: idNo,
            id_issue_date: idIssueDate,
            date_of_birth: dateBirth,
            place_of_birth: placeBirth,
            gua_type: guaType,
            relationship: guaRelation,
          },
          { headers: headers }
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Guarantor Details Saved Successfully",
          });

          setTableData(response.data);
          // console.log(response.data, "resssss");
        });
  }

  console.log(guarantorInfoDetails, "wizzy");

  // async function saveGuaDetails() {
  //   if (tableData.length > 9) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: `Member has reached a total of <span style="color: red; font-weight: bold;">${guarantorBeneficiaryLimit}</span> Guarantors`,
  //       text: "",
  //     });
  //   } else {
  //     try {
  //       const response = await axios.post(
  //         `${API_SERVER}/api/save-guarantor-details`,
  //         {
  //           app_no: appNumber,
  //           fname: fullname,
  //           post_address: postalAdd,
  //           res_address: residentialAdd,
  //           phone: telephone,
  //           id_type: idT,
  //           id_no: idNo,
  //           id_issue_date: idIssueDate,
  //           date_of_birth: dateBirth,
  //           place_of_birth: placeBirth,
  //           gua_type: guaType,
  //           relationship: guaRelation,
  //         },
  //         { headers: headers }
  //       );

  //       Swal.fire({
  //         icon: "success",
  //         title: "Guarantor Details Saved Successfully",
  //       });

  //       setTableData(response.data);
  //       setGuarantorNumber("");
  //       setGuaType("");
  //       setGuaRelation("");
  //       setGuaAcct("");
  //       setIdType("");
  //       setIdNo("");
  //       setIdIssueDate("");
  //       setIdExpiryDate("");
  //       setDateBirth("");
  //       setPlaceBirth("");
  //       setResidentialAdd("");
  //       setPostal("");
  //       setTelePhone("");
  //       setOccupation("");
  //       setEmployedSince("");
  //       setPosition("");
  //       setEndService("");
  //       setNetIncome("");
  //       setEmail("");
  //     } catch (error) {
  //       console.error("Error saving guarantor details:", error);
  //       // Handle error gracefully, e.g., show an error message to the user
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to save guarantor details. Please try again later.",
  //       });
  //     }
  //   }
  // }

  const diff = parseFloat(savings) - parseFloat(guarantee);

  const selected = (row) => {
    setGua(`${row?.customer_number} - ${row?.gua_name}`);
    setGuarantorNumber(row?.customer_number);
    setToggle(false);
    searchAcct(row?.customer_number);
    setGuarantorName(row?.gua_name);
  };

  const searchAcct = (v) => {
    axios
      .post(
        API_SERVER + "/api/get-guarantor-details",
        {
          customer_no: v,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log({ response });
        if (response.data.length <= 0) {
          Swal.fire({
            icon: "warning",
            title: `INF - Member does not Exist`,
          }).then((result) => {});
        } else {
          axios
            .post(
              API_SERVER + "/api/get-id-desc",
              {
                id_type: response.data[0]?.id_type,
              },
              {
                headers,
              }
            )
            .then(function (response) {
              setIdType(
                response.data[0]?.identification === "null"
                  ? ""
                  : response.data[0]?.identification
              );
            });
          axios
            .post(
              API_SERVER + "/api/get-country-desc",
              {
                code: response.data[0]?.nationality,
              },
              {
                headers,
              }
            )
            .then(function (response) {
              setPlaceBirth(
                response.data[0]?.country === "null"
                  ? ""
                  : response.data[0]?.country
              );
            });
          axios
            .post(
              API_SERVER + "/api/get-gua-acct",
              {
                customer_no: response.data[0]?.customer_number,
              },
              {
                headers,
              }
            )
            .then(function (response) {
              setGuaAcct(
                response.data[0]?.acct_link === "null"
                  ? ""
                  : response.data[0]?.acct_link
              );
            });
          setResidentialAdd(
            response.data[0]?.residential_address === "null"
              ? ""
              : response.data[0]?.residential_address
          );
          setTelePhone(
            response.data[0]?.mobile1 === "null"
              ? ""
              : response.data[0]?.mobile1
          );
          setIdNo(
            response.data[0]?.id_number === "null"
              ? ""
              : response.data[0]?.id_number
          );
          setResidenceSince(
            response.data[0]?.resident_since === "null"
              ? ""
              : formatDate(response.data[0]?.resident_since)
          );
          setDateBirth(
            response.data[0]?.date_of_birth === "null"
              ? ""
              : formatDate(response.data[0]?.date_of_birth)
          );
          setIdIssueDate(
            response.data[0]?.id_issue_date === "null"
              ? ""
              : formatDate(response.data[0]?.id_issue_date)
          );
          setIdExpiryDate(
            response.data[0]?.id_expiry_date === "null"
              ? ""
              : formatDate(response.data[0]?.id_expiry_date)
          );
          setPostal(
            response.data[0]?.postal_address === "null"
              ? ""
              : response.data[0]?.postal_address
          );
          setIdT(
            response.data[0]?.id_type === "null"
              ? ""
              : response.data[0]?.id_type
          );
          setEmail(
            response.data[0]?.email_address === "null"
              ? ""
              : response.data[0]?.email_address
          );
          setResidenceSince(
            response.data[0]?.resident_since === "null"
              ? ""
              : formatDate(response.data[0]?.resident_since)
          );
          setFullname(
            response.data[0]?.fullname === "null"
              ? ""
              : response.data[0]?.fullname
          );
          setGuarantorNumber(
            response.data[0]?.customer_number === "null"
              ? ""
              : response.data[0]?.customer_number
          );
        }
      });
  };

  return (
    <div className="h-[495px] overflow-y-scroll">
      {/* <div>
        <HeaderComponent title={"Search Guarantor"} height={"35px"} />
      </div> */}
      <div
        style={{
          display: "flex",
          // marginTop: "5px",
          // padding: "10px",
          // borderRadius: "5px",
          // border: "2px solid #d6d7d9",
          // marginBottom: "15px",
          // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {/* <div style={{ flex: 0.5 }}>
          <div>
            <InputField
              label={"Member"}
              inputWidth={"100%"}
              // type={"number"}
              value={gua}
              onChange={(e) => {
                setGua(e.target.value);
                if (e.target.value == "") {
                  setGuarantorName("");
                  setGuaAcct("");
                  setEmail("");
                  setPhone("");
                  setPlaceBirth("");
                  setResidentialAdd("");
                  setIdNo("");
                  setGuarantorNumber("");
                  setTableData([]);
                }
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  searchAcct(e.target.value);
                }
              }}
            />
          </div>
          <div>
            <SelectField
              label={"Guarantor Type"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              required
              value={guaType}
              lovdata={[
                { label: "INDIVIDUAL", value: "Y" },
                { label: "EMPLOYER", value: "N" },
                { label: "", value: "" },
              ]}
              onChange={(value) => {
                setGuaType(value);
              }}
            />
          </div>
        </div> */}
        {/* <div style={{ flex: 0.5 }}>
          <div className="mt-8">
            <ButtonComponent
              // label={"Search"}
              buttonIcon={<TbUserSearch size={20} color="blue" />}
              buttonWidth={"35px"}
              buttonHeight={"30px"}
              buttonBackgroundColor={"#d4e2ff"}
              onClick={() => {
                setToggle(true);
              }}
            />
          </div>
          <div>
            <ListOfValue
              label={"Relation to Borrower"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={guaRelation}
              lovdata={guaRelationLov}
              onChange={(value) => {
                setGuaRelation(value);
              }}
            />
          </div>
        </div> */}
      </div>
      {/* <div>
        <HeaderComponent title={"Guarantor Details"} height={"35px"} />
      </div> */}
      {/* <div
        className="mt-1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          padding: "15px",
          border: "2px solid #dfdce6",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <div style={{ display: "flex", flex: 0.4 }}>
          <div className="pr-2">
            <FaUserCircle size={60} color="lightgray" />
          </div>
          <div className="p-2">
            <div
              className="font-bold text-gray-500 text-lg"
              style={{ whiteSpace: "nowrap" }}
            >
              {guarantorName}
            </div>
            <div className="flex">
              <span
                className="font-bold text-gray-500 pr-2"
                style={{ whiteSpace: "nowrap" }}
              >
                Member ID :
              </span>
              <span className="text-gray-400">{guarantorNumber}</span>
            </div>
            <div className="flex">
              <span
                className="font-bold text-gray-500 pr-2"
                style={{ whiteSpace: "nowrap" }}
              >
                Bank Account:
              </span>
              <span className="text-gray-400">{guaAcct}</span>
            </div>
          </div>
        </div>
        <div className=" flex-[0.3] pt-4">
          <div className="flex">
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Place of Birth :
            </span>
            <span className="text-gray-400">{placeBirth}</span>
          </div>
          <div className="flex">
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              ID Number :
            </span>
            <span className="text-gray-400">{idNo}</span>
          </div>
          <div className="flex w-[95%] ">
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Address :
            </span>
            <span className="text-gray-400">{residentialAdd}</span>
          </div>
        </div>
        <div className=" flex-[0.3] pt-4">
          <div></div>
          <div className="flex">
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Email :
            </span>
            <span className="text-gray-400">{email}</span>
          </div>
          <div className="pt-1 pb-2">
            <ButtonComponent
              label={"Send Email"}
              // buttonIcon={<IoMdAddCircle size={20} />}
              buttonWidth={"120px"}
              buttonHeight={"30px"}
              buttonBackgroundColor={email ? "#292368" : "#ccc"}
              // onClick={() => {
              //   setDisbursementDetailsModal(false);
              // }}
            />
          </div>
          <div className="flex pt-1">
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Phone :
            </span>
            <span className="text-gray-400">{phone}</span>
          </div>
          <div className="pt-1 pb-2">
            <ButtonComponent
              label={"Send SMS"}
              // buttonIcon={<IoMdAddCircle size={20} />}
              buttonWidth={"110px"}
              buttonHeight={"30px"}
              buttonBackgroundColor={phone ? "#292368" : "#ccc"}
              // onClick={() => {
              //   setDisbursementDetailsModal(false);
              // }}
            />
          </div>
        </div>
      </div> */}
      {/* <div
        style={{
          display: "flex",
          // marginTop: "5px",
          // padding: "10px",
          // borderRadius: "5px",
          // border: "2px solid #d6d7d9",
          // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div
          style={{
            flex: 0.5,
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            // backgroundColor: "white",
          }}
        >
          <div>
            <InputField
              label={"Guarantor's Account with Bank"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={guaAcct}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's ID Type"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={idType}
            />
          </div>
          <div>
            <InputField
              label={"ID Number"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={idNo}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"ID Issue Date"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={idIssueDate}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"ID Expiry Date"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={idExpiryDate}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"Date of Incorperation/Birth"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={dateBirth}
            />
          </div>
          <div>
            <InputField
              label={"Place of Birth"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={placeBirth}
            />
          </div>
          <div>
            <InputField
              label={"Residential Address / Business Location"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={residentialAdd}
            />
          </div>
          <div>
            <InputField
              label={"Postal / Digital Address"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={postalAdd}
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            // backgroundColor: "white",
          }}
        >
          <div>
            <InputField
              // type={"date"}
              label={"Residence Since"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={residenceSince}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Phone Number"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={telephone}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Occupation / Employer"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={occupation}
            />
          </div>
          <div>
            <InputField
              // type={"date"}
              label={"Employed Since"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={employedSince}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Position"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={position}
            />
          </div>
          <div>
            <InputField
              label={"End of Service Benefit"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={endService}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Net Monthly Income"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={netIncome}
            />
          </div>
          <div>
            <InputField
              label={"Email"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              disabled
              value={email}
            />
          </div>
        </div>
      </div> */}
      {/* <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          // alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <ButtonComponent
            label={"Save"}
            buttonIcon={<HiSave size={20} />}
            buttonHeight={"35px"}
            buttonWidth={"90px"}
            buttonBackgroundColor={"#42ba2c"}
            onClick={() => {
              if (
                guarantorNumber === "" ||
                guaType === "" ||
                guaRelation === ""
              ) {
                Swal.fire({
                  icon: "warning",
                  title: "All Fields Are Required",
                  html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
                });
              } else {
                saveGuaDetails();
              }
            }}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Add Comments"}
            buttonIcon={<FaComments size={20} />}
            buttonHeight={"35px"}
            buttonWidth={"160px"}
            buttonBackgroundColor={"grey"}
          />
        </div>
      </div>
      <br /> */}
      {/* <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Guarantor's ID",
            "Application No",
            "Guarantor's Name",
            "Residential / Business Address",
            "Guarantor's Contact",
          ]}
          data={tableData}
        />
      </div> */}
      <div
        style={{
          padding: "10px",
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div></div>
          <div>
            <ButtonComponent
              label={"Add Guarantor"}
              buttonIcon={<IoMdAdd size={20} />}
              buttonColor={"white"}
              buttonHeight={"40px"}
              buttonWidth={"150px"}
              buttonBackgroundColor={"#013281"}
              onClick={() => {
                if (data.length == 3) {
                  Swal.fire({
                    icon: "warning",
                    title: "Limit Reached",
                    html: `The member has already reached the maximum limit of <span style="color: red; font-weight: bold;">${guarantorBeneficiaryLimit}</span> guarantors.`,
                  }).then((result) => {
                    console.log("g");
                  });
                } else {
                  if (data.length > 0) {
                    getGuarantors(1);
                  } else {
                    getGuarantors();
                  }
                }
              }}
            />
          </div>
        </div>
        <div>
          <HeaderComponent title={"Guarantor Details"} />
        </div>
        <CustomTable
          headers={[
            "Member ID",
            "Member Name",
            "Guarantee Amount",
            "Posting Date",
            "Posted By",
          ]}
          data={data}
          style={{
            headerAlignRight: [3],
            headerAlignLeft: [1, 2, , 4, 5],
            columnAlignRight: [3],
          }}
        />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ButtonComponent
            label={"Previous"}
            buttonBackgroundColor={"#d4e2ff"}
            buttonColor={"blue"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={empTab}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            buttonBackgroundColor={"#0063d1"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={docTab}
          />
        </div>
      </div>
      <Modal
        className="p-0 m-0"
        open={guarantorModal}
        // size="60%"
        // style={{}}
        // withCloseButton={false}
        // transitionProps={"mounted"}
        onCancel={() => setGuarantorModal(false)}
        // trapFocus={false}
        footer={null}
        centered
        closable={false}
        closeIcon={false}
        width={700}
      >
        <div>
          <Header title={"Guarantor Form"} backgroundColor={"#013281"} />
        </div>
        <br />
        <div
          style={{
            padding: "10px",
            border: "2px solid #d6d7d9",
            borderRadius: "5px",
          }}
        >
          <div>
            <ListOfValue
              label={"Member ID / Name"}
              inputWidth={"50%"}
              labelWidth={"21%"}
              margin={"10px"}
              id={"memberID"}
              lovdata={guarantorInfoData}
              value={memberInfo}
              onChange={(value) => {
                setMemberInfo(value);
                // console.log(guarantorLimit, "guaaaaaaaa");
                // console.log(noOfGuarantees, "no of gua");

                axios
                  .post(
                    API_SERVER + "/api/get-member-status",
                    {
                      customer_number: value,
                    },
                    {
                      headers,
                    }
                  )
                  .then(function (response) {
                    console.log({ response });
                    if (response.data[0]?.member_status !== "A") {
                      Swal.fire({
                        icon: "warning",
                        title: `Selected Guarantor is not an <span style="color: darkblue; font-weight: bold;">ACTIVE</span> member`,
                        text: "Please select a Different Guarantor",
                      }).then((result) => {
                        document.getElementById("memberID")?.focus();
                      });
                    } else if (
                      response.data[0]?.member_status === "A" &&
                      parseFloat(response.data[0]?.classified) > 0
                    ) {
                      Swal.fire({
                        icon: "warning",
                        title: `Selected Guarantor has a <span style="color: red; font-weight: bold;">CLASSIFIED</span> loan`,
                        text: "Please select a Different Guarantor",
                      }).then((result) => {
                        document.getElementById("memberID")?.focus();
                      });
                    } else {
                      axios
                        .post(
                          API_SERVER + "/api/get-guarantor-info",
                          {
                            member_id: value,
                          },
                          {
                            headers: headers,
                          }
                        )
                        .then(function (response) {
                          setMemberID(value);
                          setSavings(
                            response.data[0]?.saving_av_bal !== "null"
                              ? response.data[0]?.saving_av_bal
                              : ""
                          );
                          setAddress(
                            response.data[0]?.address !== "null"
                              ? response.data[0]?.address
                              : ""
                          );
                          setPhone(
                            response.data[0]?.mobile !== "null"
                              ? response.data[0]?.mobile
                              : ""
                          );
                          setTin(
                            response.data[0]?.tin !== "null"
                              ? response.data[0]?.tin
                              : ""
                          );
                          setMemberName(response.data[0]?.member_name);
                          setNoOfGuarantees(response.data[0]?.no_of_guaranty);
                          setGuarantee(response.data[0]?.guaranted_amount);
                          setAvailableBalance(
                            response.data[0]?.av_amount_grant
                          );
                          if (
                            parseInt(response.data[0]?.no_of_guaranty) ===
                            parseInt(guarantorLimit)
                          ) {
                            Swal.fire({
                              icon: "warning",
                              title: `Member has reached a Limit of '${guarantorLimit}' Guaranteed Loans`,
                              text: "Please Add a Different Guarantor",
                            }).then((result) => {
                              document.getElementById("memberID")?.focus();
                              setDisableBtn(true);
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  });
              }}
            />
          </div>
          <div>
            <div>
              <div>
                <HeaderComponent title={"Guarantor Details"} height={"25px"} />
              </div>
              <div></div>
              <div
                style={{
                  padding: "5px",
                  // border: "2px solid #d6d7d9",
                  // borderRadius: "5px",
                  // marginTop: "10px",
                  display: "flex",
                }}
              >
                <div style={{ flex: 0.5 }}>
                  {/* <div>
                  <InputField
                    label={"Savings"}
                    inputWidth={"35%"}
                    disabled
                    labelWidth={"40%"}
                    margin={"10px"}
                    value={
                      formatNumber(parseFloat(savings)) === "NaN"
                        ? " "
                        : formatNumber(parseFloat(savings))
                    }
                  />
                </div> */}

                  <div>
                    <InputField
                      label={"Phone Number"}
                      inputWidth={"50%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={phone}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Address"}
                      inputWidth={"100%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={address}
                    />
                  </div>
                  {/* <div>
                    <InputField
                      label={"Guarantee"}
                      inputWidth={"35%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={
                        formatNumber(parseFloat(guarantee)) === "NaN"
                          ? " "
                          : formatNumber(parseFloat(guarantee))
                      }
                    />
                  </div> */}
                </div>
                <div style={{ flex: 0.5 }}>
                  <div>
                    <InputField
                      label={"Member Name"}
                      inputWidth={"100%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={memberName}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"TIN Number"}
                      inputWidth={"50%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={tin}
                    />
                  </div>
                  <div>
                    <InputField
                      label={"Number of Guarantees"}
                      inputWidth={"50%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={noOfGuarantees}
                    />
                  </div>
                  {/* <div>
                    <InputField
                      label={"Number Of Accounts"}
                      inputWidth={"35%"}
                      disabled
                      labelWidth={"40%"}
                      margin={"10px"}
                      value={numberOfAcc === "null" ? " " : numberOfAcc}
                    />
                  </div> */}
                  {/* <div>
                  <InputField
                    label={"Available Balance"}
                    inputWidth={"35%"}
                    disabled
                    labelWidth={"40%"}
                    margin={"10px"}
                    value={
                      formatNumber(parseFloat(diff)) === "NaN"
                        ? " "
                        : formatNumber(parseFloat(diff))
                    }
                  />
                </div> */}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                border: "2px solid #d6d7d9",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <div>
                <InputField
                  label={"Guarantee Amount"}
                  inputWidth={"25%"}
                  labelWidth={"20%"}
                  margin={"10px"}
                  textAlign={"right"}
                  onChange={(e) => {
                    setGuaranteeAmount(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleGuaranteeAmount();
                      guaranteeAmountBlur();
                    }
                  }}
                  value={guaranteeAmount}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <div>
            <ButtonComponent
              label={"Save"}
              buttonIcon={<MdOutlineSaveAlt size={20} />}
              buttonColor={"white"}
              buttonHeight={"30px"}
              buttonWidth={"80px"}
              buttonBackgroundColor={"#12AF70"}
              onClick={() => {
                if (guaranteeAmount) {
                  handleGenerateesInfo();
                  setGuarantorModal(false);
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: "Please enter the amount to guarantee before proceeding.",
                  });
                }
              }}
              // disabled={disableBtn}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Exit"}
              buttonColor={"white"}
              buttonHeight={"30px"}
              buttonWidth={"60px"}
              onClick={() => {
                setMemberName("");
                setSavings("");
                setGuarantee("");
                setNoOfGuarantees("");
                setAvailableBalance("");
                setGuaranteeAmount("");
                setMemberInfo("");
                setGuarantorModal(false);
                setPhone("");
                setAddress("");
                setTin("");
                setNumberOfAcc("");
              }}
              buttonBackgroundColor={"red"}
            />
          </div>
        </div>
      </Modal>
      <Findgua
        showModal={toggle}
        setShowModal={setToggle}
        handleSelected={selected}
      />
    </div>
  );
};

export default Guarantors;
