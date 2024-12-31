import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { MdAddCircle } from "react-icons/md";
import { HiMinusCircle } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import swal from "sweetalert";

const Tranches = ({ appNumber, thirdTab }) => {
  const [data, setData] = useState([]);
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  // const [dueDate, setDueDate] = useState("");
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const getTranches = () => {
    axios
      .post(
        API_SERVER + "/api/get-tranches",
        { app_no: appNumber },
        { headers }
      )
      .then((res) => {
        setData(res.data);
        // console.log(formattedData, "callover");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTranches();
  });

  let totalDb = 0;
  let totalCr = 0;

  // useEffect(()=>{

  // },[dueDate])

  const tranchesData = data.map((item) => {
    console.log(item, "stoff");

    const dbValue = parseFloat(item.loan_percent);
    const crValue = parseFloat(item.amount);

    // Add the values to the totals if they are not NaN
    if (!isNaN(dbValue)) {
      totalDb += dbValue;
    }
    if (!isNaN(crValue)) {
      totalCr += crValue;
    }

    return [
      <div style={{}}>
        <div
          // onClick={() => {
          //   setShowModal(true);
          // }}
          className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
        >
          <TiDelete size={25} color={"red"} />
        </div>
      </div>,
      <div>
        <InputField value={item.tranche_seq_no} textAlign={"center"} disabled />
      </div>,
      <div>
        <InputField value={item.narration} inputWidth={"300px"} />
      </div>,
      <div>
        <InputField
          type={"date"}
          // value={dueDate}
          // onChange={(e) => {
          //   setDueDate(e.target.value);
          // }}
        />
      </div>,
      <div>
        <InputField
          value={formatNumber(+item.loan_percent)}
          textAlign={"right"}
        />
      </div>,
      <div>
        <InputField value={formatNumber(+item.amount)} textAlign={"right"} />
      </div>,
      <div style={{}}>
        <div
          // onClick={() => {
          //   setShowModal(true);
          // }}
          className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
        >
          <MdAddCircle size={20} />
        </div>
      </div>,
    ];
  });

  // console.log({ dueDate });

  tranchesData.push([]);

  tranchesData.push([
    <div className="font-bold" style={{ textAlign: "right" }}>
      Count:
    </div>,
    <div
      className="font-bold"
      style={{
        textAlign: "center",
        backgroundColor: "#e9e9ea",
        padding: "5px",
        borderRadius: "3px",
      }}
    >
      {data.length}
    </div>,
    <div>
      <InputField label={"Difference (Loan Amount - Total Amount)"} disabled />
    </div>,
    <div className="font-bold" style={{ textAlign: "right" }}>
      Totals:
    </div>,
    <div
      className="font-bold"
      style={{
        textAlign: "right",
        backgroundColor: "#e9e9ea",
        padding: "5px",
        borderRadius: "3px",
      }}
    >
      {formatNumber(totalDb)}
    </div>,
    <div
      className="font-bold"
      style={{
        textAlign: "right",
        backgroundColor: "#e9e9ea",
        padding: "5px",
        borderRadius: "3px",
      }}
    >
      {formatNumber(totalCr)}
    </div>,
  ]);

  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #d6d7d9",
        borderRadius: "5px",
      }}
    >
      {/* <div>
            <HeaderComponent title={"Syndicate Tranches"} />
          </div>
          <br />
          <div style={{ padding: "60px" }}>
            <DataTable
              columns={["Seq. Number", "Narration", "Due Date", "%", "Amount"]}
            />
          </div> */}
      <div>
        <HeaderComponent
          title={"Syndicate Tranches"}
          height={"35px"}
          color={"white"}
        />
      </div>
      {/* <div style={{ padding: "30px" }}>
        <div
          style={{
            height: "40px",
            width: "100%",
            display: "flex",
            padding: "10px",
            borderRadius: "3px",
            color: "white",
            background: "#0580c0",
          }}
        >
          <div style={{ flex: 0.15, marginLeft: "50px" }}>SEQ NUMBER</div>
          <div style={{ flex: 0.35, marginLeft: "230px" }}>NARRATION</div>
          <div style={{ flex: 0.2 }}>DUE DATE</div>
          <div style={{ flex: 0.14 }}>%</div>
          <div style={{ flex: 0.1 }}>AMOUNT</div>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"X"}
              buttonBackgroundColor={"#ffcbc8"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
          <div style={{ marginTop: "-10px", marginRight: "" }}>
            <InputField inputWidth={"80px"} disabled />
          </div>
          <div style={{ marginTop: "-10px" }}>
            <InputField inputWidth={"590px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} type={"date"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
            <InputField inputWidth={"150px"} />
          </div>
          <div style={{ marginTop: "3px" }}>
            <ButtonComponent
              label={"+"}
              buttonBackgroundColor={"#6faf5e"}
              buttonColor={"white"}
              buttonHeight={"27px"}
              buttonWidth={"40px"}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            border: "1.5px solid #d6d7d9",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          <div style={{ flex: 0.2 }}>
            <InputField
              label={"Count"}
              disabled
              inputWidth={"95px"}
              labelWidth={"30%"}
            />
          </div>
          <div style={{ flex: 0.45 }}>
            <InputField
              label={"Difference (Loan Amount - Total Amount)"}
              labelWidth={"50%"}
              inputWidth={"190px"}
              disabled
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: 0.3,
            }}
          >
            <div style={{ flex: 0.65 }}>
              <InputField
                label={"Total"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                // fontSize={"85%"}
              />
            </div>
            <div style={{ flex: 0.35 }}>
              <InputField inputWidth={"100%"} disabled />
            </div>
          </div>
        </div>
      </div> */}
      <div style={{ padding: "30px" }}>
        <div>
          <CustomTable
            headers={[
              "",
              "Seq. Number",
              "Narration",
              "Due Date",
              "%",
              "Amount",
              "",
            ]}
            data={tranchesData}
          />
        </div>
      </div>
      <br />
      {/* <br /> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ButtonComponent
            label={"Add Comments"}
            // buttonBackgroundColor={"black"}
            background={"#c4549c"}
            buttonHeight={"40px"}
            buttonWidth={"130px"}
            buttonColor={"white"}
            // onClick={() => {
            //   setDueDate("");
            // }}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            // buttonBackgroundColor={"black"}
            background={"#c4549c"}
            buttonHeight={"40px"}
            buttonWidth={"130px"}
            buttonColor={"white"}
            // onClick={() => {
            //   if (dueDate === "") {
            //     swal({
            //       title: "All Fields Are Required",
            //       text: "Please fill Due Date",
            //       icon: "warning",
            //       button: "Ok",
            //     }).then((result) => {
            //       // Do something here..
            //       // document.getElementById("postBTN").disabled = false;
            //     });
            //   } else {
            //     thirdTab();
            //   }
            // }}
            onClick={() => {
              thirdTab();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tranches;
