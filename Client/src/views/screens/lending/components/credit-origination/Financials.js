import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import InputField1 from "../fields/InputField.jsx";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { TiDelete } from "react-icons/ti";
import { MdAddCircle } from "react-icons/md";
import Swal from "sweetalert2";

const Financials = ({
  appNumber,
  quotationNo,
  empTab,
  firstTab,
  loanIns,
  tn,
  int,
  loanAmount,
  customerNumber,
}) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [incomeLov, setIncomeLov] = useState([]);
  const [income, setIncome] = useState("");

  const [assetLov, setAssetLov] = useState([]);
  const [asset, setAsset] = useState("");

  const [expenditureLov, setExpenditureLov] = useState([]);
  const [expenditure, setExpenditure] = useState("");

  const [liabilityLov, setLiabilityLov] = useState([]);
  const [liability, setLiability] = useState("");

  const [incomeAmt, setIncomeAmt] = useState("");
  const [incomeAmt2, setIncomeAmt2] = useState("");
  const [assetAmt, setAssetAmt] = useState("");
  const [assetAmt2, setAssetAmt2] = useState("");
  const [liabilityAmt, setLiabilityAmt] = useState("");
  const [totalLiability, setTotalLiability] = useState("");
  const [expenditureAmt, setExpenditureAmt] = useState("");
  const [expenditureAmt2, setExpenditureAmt2] = useState("");
  const [totalExpenditure, setTotalExpenditure] = useState("");
  const [totalAsset, setTotalAsset] = useState("");
  const [considerAmt, setConsiderAmt] = useState("");
  const [considerAmt2, setConsiderAmt2] = useState("");

  const [totalIncome, setTotalIncome] = useState("");

  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState("");
  const [totalMonthlyExpenditure, setTotalMonthlyExpenditure] = useState("");
  const [requestedLoanInstallment, setRequestedLoanInstallment] = useState("");
  const [debtServiceRatio, setDebtServiceRatio] = useState("");
  const [data, setData] = useState([]);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // console.log(customerNumber, "cussssss");

  const prin = parseFloat(loanAmount) / parseFloat(tn);
  const trst = (parseFloat(int) / 100) * parseFloat(loanAmount);
  const installment = parseFloat(prin) + parseFloat(trst);

  function validateBlock() {
    if (income === "" || incomeAmt === "") {
      Swal.fire({
        icon: "info",
        title: "INF - Select Income Details and Enter Income Amount",
        // html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
      }).then((result) => {
        document.getElementById("incomeDet")?.focus();
      });
    } else {
      empTab();
      // console.log(income, "incccccc");
    }
  }

  // function formatDate(date) {
  //   const eDate = new Date(date);
  //   const effective_date = eDate
  //     .toLocaleDateString("en-GB", {
  //       day: "numeric",
  //       month: "short",
  //       year: "numeric",
  //     })
  //     .toUpperCase()
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

  const getFinancials = () => {
    axios
      .post(
        API_SERVER + "/api/get-financial-summary",
        { customerNumber: customerNumber },
        { headers }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFinancials();
  }, [customerNumber]);

  const finn = data.map((item) => {
    // console.log(item, "stoff");

    return [
      <div>{item.fac_type === "null" ? "" : item.fac_type}</div>,
      <div>{item.loan_ac === "null" ? "" : item.loan_ac}</div>,
      <div>{item.ccy === "null" ? "" : item.ccy}</div>,
      <div>
        {item.loan_amt === "null"
          ? ""
          : formatNumber(parseFloat(item.loan_amt))}
      </div>,
      <div>
        {item.install_amt === "null"
          ? ""
          : formatNumber(parseFloat(item.install_amt))}
      </div>,
      <div>{item.exp_date === "null" ? "" : formatDate(item.exp_date)}</div>,
    ];
  });

  useEffect(() => {
    async function getIncome() {
      let response = await axios.post(
        API_SERVER + "/api/get-income",
        { loan_application_no: appNumber },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setIncomeLov(response.data);
    }

    async function getAsset() {
      let response = await axios.post(
        API_SERVER + "/api/get-asset",
        { loan_application_no: appNumber },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setAssetLov(response.data);
    }

    async function getExpenditure() {
      let response = await axios.post(
        API_SERVER + "/api/get-expenditure",
        { loan_application_no: appNumber },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setExpenditureLov(response.data);
    }

    async function getLiability() {
      let response = await axios.post(
        API_SERVER + "/api/get-liability",
        { loan_application_no: appNumber },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLiabilityLov(response.data);
    }

    getIncome();
    getAsset();
    getExpenditure();
    getLiability();
  }, []);

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  let sum;
  let sum1;
  let sum2;
  let exx;

  useEffect(() => {
    setDebtServiceRatio(
      formatNumber(
        (parseFloat(totalMonthlyExpenditure.replaceAll(",", "")) /
          parseFloat(totalMonthlyIncome.replaceAll(",", ""))) *
          100
      )
    );
    // console.log(loanIns, "LOAAAAA");
  }, [totalMonthlyExpenditure, totalMonthlyIncome]);

  useEffect(() => {
    sum = 0;
    sum +=
      parseFloat(considerAmt ? considerAmt?.replaceAll(",", "") : 0) +
      parseFloat(considerAmt2 ? considerAmt2?.replaceAll(",", "") : 0);
    setTotalIncome(formatNumber(sum));
    setTotalMonthlyIncome(formatNumber(sum));
    setRequestedLoanInstallment(
      formatNumber(parseFloat(installment?.toFixed(2)))
    );
    setTotalMonthlyExpenditure(
      formatNumber(parseFloat(installment?.toFixed(2)))
    );
    // exx = sum1 + installment;
    // setTotalMonthlyExpenditure(formatNumber(exx));
    console.log(tn);
    console.log(loanAmount);
    console.log(int);
    console.log(installment, "inss");
    // console.log(loanIns, "LOAAAAA");
  }, [considerAmt, considerAmt2]);

  useEffect(() => {
    sum1 = 0;
    sum1 +=
      parseFloat(expenditureAmt ? expenditureAmt?.replaceAll(",", "") : 0) +
      parseFloat(expenditureAmt2 ? expenditureAmt2?.replaceAll(",", "") : 0);
    setTotalExpenditure(formatNumber(sum1));
    exx = sum1 + installment;
    setTotalMonthlyExpenditure(formatNumber(exx));
  }, [expenditureAmt, expenditureAmt2]);

  useEffect(() => {
    sum2 = 0;
    sum2 +=
      parseFloat(assetAmt ? assetAmt?.replaceAll(",", "") : 0) +
      parseFloat(assetAmt2 ? assetAmt2?.replaceAll(",", "") : 0);
    setTotalAsset(formatNumber(sum2));
    //  setTotalMonthlyIncome(formatNumber(sum1));
  }, [assetAmt, assetAmt2]);

  var incomeDetailsArr = [
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          id={"incomeDet"}
          data={incomeLov}
          value={income}
          onChange={(value) => {
            setIncome(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          textAlign={"right"}
          value={incomeAmt}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setIncomeAmt(formatNumber(parseFloat(e.target.value)));
              setConsiderAmt(formatNumber(parseFloat(e.target.value)));
              // setTotalIncome(formatNumber(parseFloat(incomeAmt)));
              // setTotalMonthlyIncome(totalIncome);
            }
          }}
          onChange={(e) => setIncomeAmt(e.target.value)}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          value={considerAmt}
          textAlign={"right"}
          onChange={(e) => setConsiderAmt(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setConsiderAmt(formatNumber(parseFloat(e.target.value)));
              // setTotalMonthlyIncome(totalIncome);
              // setTotalIncome(formatNumber(parseFloat(e.target.value)));
            }
          }}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={incomeLov}
          onChange={(value) => {
            setIncome(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          value={incomeAmt2}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setIncomeAmt2(formatNumber(parseFloat(e.target.value)));
              setConsiderAmt2(formatNumber(parseFloat(e.target.value)));
              // setTotalIncome(
              //   formatNumber(parseFloat(incomeAmt) + parseFloat(incomeAmt2))
              // );

              // setTotalMonthlyIncome(
              //   formatNumber(parseFloat(incomeAmt + incomeAmt2))
              // );
            }
          }}
          onChange={(e) => setIncomeAmt2(e.target.value)}
          textAlign={"right"}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          textAlign={"right"}
          value={considerAmt2}
          inputWidth={"100%"}
          onChange={(e) => {
            setConsiderAmt2(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              // setIncomeAmt2(formatNumber(parseFloat(e.target.value)));
              setConsiderAmt2(formatNumber(parseFloat(e.target.value)));
            }
          }}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={incomeLov}
          disabled
        />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div></div>,
      <div style={{ textAlign: "right", color: "grey" }}>Total Income:</div>,
      <div>
        <InputField
          noMarginRight
          disabled
          inputWidth={"100%"}
          value={totalIncome}
          textAlign={"right"}
          className={"font-bold"}
        />
      </div>,
    ],
  ];

  var assetDetailsArr = [
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={assetLov}
          onChange={(value) => {
            setAsset(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setAssetAmt(formatNumber(parseFloat(e.target.value)));
              // setTotalAsset(formatNumber(+assetAmt));
            }
          }}
          onChange={(e) => setAssetAmt(e.target.value)}
          value={assetAmt}
          textAlign={"right"}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={assetLov}
          onChange={(value) => {
            setAsset(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          value={assetAmt2}
          textAlign={"right"}
          onChange={(e) => setAssetAmt2(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setAssetAmt2(formatNumber(parseFloat(e.target.value)));
              // setTotalAsset(formatNumber(+assetAmt));
            }
          }}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={assetLov}
          disabled
        />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div style={{ textAlign: "right", color: "grey" }}>Total Asset:</div>,
      <div>
        <InputField
          noMarginRight
          disabled
          inputWidth={"100%"}
          value={totalAsset}
          textAlign={"right"}
          className={"font-bold"}
        />
      </div>,
    ],
  ];

  var expenditureArr = [
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={expenditureLov}
          onChange={(value) => {
            setExpenditure(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setExpenditureAmt(formatNumber(parseFloat(e.target.value)));
              // setTotalExpenditure(formatNumber(+expenditureAmt));
            }
          }}
          onChange={(e) => setExpenditureAmt(e.target.value)}
          textAlign={"right"}
          value={expenditureAmt}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={expenditureLov}
          onChange={(value) => {
            setExpenditure(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          value={expenditureAmt2}
          textAlign={"right"}
          onChange={(e) => setExpenditureAmt2(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setExpenditureAmt2(formatNumber(parseFloat(e.target.value)));
              // setTotalExpenditure(formatNumber(+expenditureAmt));
            }
          }}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={expenditureLov}
          disabled
        />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div style={{ textAlign: "right", color: "grey" }}>
        Total Expenditure:
      </div>,
      <div>
        <InputField
          noMarginRight
          disabled
          inputWidth={"100%"}
          value={totalExpenditure}
          textAlign={"right"}
          className={"font-bold"}
        />
      </div>,
    ],
  ];

  var liabilityDetailsArr = [
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={liabilityLov}
          onChange={(value) => {
            setLiability(value);
          }}
        />
      </div>,
      <div>
        <InputField
          noMarginRight
          inputWidth={"100%"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setLiabilityAmt(formatNumber(parseFloat(e.target.value)));
              setTotalLiability(formatNumber(+liabilityAmt));
            }
          }}
          onChange={(e) => setLiabilityAmt(e.target.value)}
          textAlign={"right"}
          value={liabilityAmt}
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={liabilityLov}
          disabled
          onChange={(value) => {
            setLiability(value);
          }}
        />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <ListOfValue
          marginRight={"0px"}
          inputWidth={"100%"}
          data={liabilityLov}
          disabled
        />
      </div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div style={{ textAlign: "right", color: "grey" }}>Total Liability:</div>,
      <div>
        <InputField
          noMarginRight
          disabled
          inputWidth={"100%"}
          value={totalLiability}
          textAlign={"right"}
          className={"font-bold"}
        />
      </div>,
    ],
  ];

  var existingFacilitiesOtherBanks = [
    [
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <MdAddCircle size={20} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} type={"date"} />
      </div>,
    ],
    [
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <MdAddCircle size={20} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} type={"date"} />
      </div>,
    ],
    [
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[30px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <MdAddCircle size={20} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} type={"date"} />
      </div>,
    ],
    [
      <div></div>,
      <div></div>,
      <div></div>,
      <div style={{ textAlign: "right", color: "grey" }}>
        Total Monthly Installment:
      </div>,
      <div>
        <InputField disabled inputWidth={"100%"} className={"font-bold"} />
      </div>,
    ],
  ];
  // console.log({ debtServiceRatio });
  return (
    <div className="h-[495px] overflow-y-scroll" style={{}}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          // border: "2px solid #d6d7d9",
          // borderRadius: "5px",
          // padding: "10px",
        }}
      >
        <div style={{ flex: 0.6 }}>
          <div>
            <CustomTable
              headers={[
                "Income Details (Individual)",
                "Income Amount",
                "Amount to Consider",
                "",
              ]}
              data={incomeDetailsArr}
            />
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <div>
            <CustomTable
              headers={["Asset Details (Individuals)", "Amount", ""]}
              data={assetDetailsArr}
            />
          </div>
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          gap: "10px",
          // border: "2px solid #d6d7d9",
          // borderRadius: "5px",
          // padding: "10px",
        }}
      >
        <div style={{ flex: 0.6 }}>
          <div>
            <CustomTable
              headers={[
                "Expenditure and Other Contributions (Individual)",
                "Amount",
                "",
              ]}
              data={expenditureArr}
            />
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <div>
            <CustomTable
              headers={["Liability Details (Individuals)", "Amount", ""]}
              data={liabilityDetailsArr}
            />
          </div>
        </div>
      </div>
      <br />
      <div
        style={
          {
            // border: "2px solid #d6d7d9",
            // borderRadius: "5px",
            // padding: "10px",
          }
        }
      >
        <div style={{ flex: 0.6 }}>
          <div>
            <HeaderComponent title={"Existing Facilities"} />
          </div>
          <CustomTable
            headers={[
              "Facility Type",
              "Amount Number",
              "CCY",
              "Facility Amount",
              "Installment",
              "Expiry Date",
            ]}
            data={finn}
          />
        </div>
        {/* <div style={{ flex: 0.4 }}>
          <div
            style={{
              height: "35px",
              fontSize: "20px",
              fontWeight: "700",
              color: "grey",
            }}
          >
            Existing Facilities (Other Banks)
          </div>
          <div>
            <CustomTable
              headers={[
                "",
                "Bank Code",
                "Amount Granted",
                "Monthly Amount",
                "Date Granted",
              ]}
              data={existingFacilitiesOtherBanks}
            />
          </div>
        </div> */}
      </div>
      <div
        style={{
          border: "1px solid #d6d7d9",
          borderRadius: "5px",
          // padding: "15px",
          // backgroundColor: "#f6fbff",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div>
          <InputField1
            label={"Total Monthly Income"}
            // labelWidth={"50%"}
            inputWidth={"100%"}
            disabled
            value={totalMonthlyIncome}
            textAlign={"right"}
            className={"font-bold"}
          />
        </div>
        <div>
          <InputField1
            label={"Requested Loan Installment"}
            // labelWidth={"50%"}
            inputWidth={"100%"}
            value={
              requestedLoanInstallment === "NaN"
                ? "0.00"
                : requestedLoanInstallment
            }
            disabled
            textAlign={"right"}
            className={"font-bold"}
          />
        </div>
        <div>
          <InputField1
            label={"Total Monthly Expenditure"}
            // labelWidth={"50%"}
            inputWidth={"100%"}
            value={
              totalMonthlyExpenditure === "NaN"
                ? "0.00"
                : totalMonthlyExpenditure
            }
            disabled
            textAlign={"right"}
            className={"font-bold"}
          />
        </div>
        <div>
          <InputField1
            label={"Debt Service Ratio (DSR)"}
            // labelWidth={"50%"}
            inputWidth={"100%"}
            disabled
            className={"font-bold"}
            textAlign={"right"}
            value={debtServiceRatio === "NaN" ? "" : debtServiceRatio}
            color={
              debtServiceRatio.replaceAll(",", "") > 100 ? "red" : "#00a700"
            }
            labelColor={
              debtServiceRatio.replaceAll(",", "") > 100 ? "red" : "#00a700"
            }
          />
        </div>
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
            onClick={firstTab}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            buttonBackgroundColor={"#0063d1"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={validateBlock}
          />
        </div>
      </div>
    </div>
  );
};

export default Financials;
