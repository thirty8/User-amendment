import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputField from "../../components/fields/InputField";
import CustomTable from "../../components/data-table/CustomTable";
import { MdAddCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Financials = ({ setOtherDetailsModal }) => {
  var incomeDetailsArr = [
    [
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField
          margin={"0px"}
          inputWidth={"100%"}
          textAlign={"right"}
          disabled
        />
      </div>,
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField
          margin={"0px"}
          inputWidth={"100%"}
          textAlign={"right"}
          disabled
        />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField margin={"0px"} inputWidth={"100%"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div></div>,
      <div style={{ textAlign: "right", color: "grey" }}>Total Income:</div>,
      <div>
        <InputField disabled inputWidth={"100%"} margin={"0px"} />
      </div>,
    ],
  ];

  var assetDetailsArr = [
    [
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div style={{ textAlign: "right", color: "grey" }}>Total Asset:</div>,
      <div>
        <InputField disabled inputWidth={"100%"} margin={"0px"} />
      </div>,
    ],
  ];

  var expenditureArr = [
    [
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
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
          disabled
          inputWidth={"100%"}
          textAlign={"right"}
          margin={"0px"}
        />
      </div>,
    ],
  ];

  var liabilityDetailsArr = [
    [
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} margin={"0px"} disabled />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled margin={"0px"} />
      </div>,
      <div
        // onClick={() => {
        //   setShowModal(true);
        // }}
        className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
      >
        <TiDelete size={25} color={"red"} />
      </div>,
    ],
    [
      <div style={{ textAlign: "right", color: "grey" }}>Total Liability:</div>,
      <div>
        <InputField
          disabled
          inputWidth={"100%"}
          textAlign={"right"}
          margin={"0px"}
        />
      </div>,
    ],
  ];

  return (
    <div style={{ zoom: 0.8 }}>
      <div>
        <HeaderComponent
          title={"Financial Details"}
          height={"35px"}
          backgroundColor={"#0063d1"}
          color={"white"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <ButtonComponent
          label={"Return"}
          // buttonIcon={<HiViewfinderCircle size={20} />}
          buttonWidth={"90px"}
          buttonHeight={"33px"}
          buttonBackgroundColor={"red"}
          onClick={() => {
            setOtherDetailsModal(false);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
          padding: "10px",
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
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
          padding: "10px",
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
        style={{
          display: "flex",
          gap: "10px",
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <div style={{ flex: 0.6 }}>
          <div
            style={{
              height: "35px",
              fontSize: "20px",
              fontWeight: "700",
              color: "grey",
            }}
          >
            Existing Facilities (This Bank)
          </div>
          <CustomTable
            headers={[
              "Facility Type",
              "Amount Number",
              "CCY",
              "Facility Amount",
              "Installment",
              "Expiry Date",
              "",
            ]}
          />
        </div>
        <div style={{ flex: 0.4 }}>
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
            />
          </div>
        </div>
      </div>
      <div
        style={{
          border: "2px solid #d6d7d9",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#f6fbff",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div>
          <InputField
            label={"Total Monthly Income"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
            textAlign={"right"}
          />
        </div>
        <div>
          <InputField
            label={"Requested Loan Installment"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
            textAlign={"right"}
          />
        </div>
        <div>
          <InputField
            label={"Total Monthly Expenditure"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
          />
        </div>
        <div>
          <InputField
            label={"Debt Service Ratio (DSR)"}
            labelWidth={"50%"}
            inputWidth={"40%"}
            disabled
            textAlign={"right"}
          />
        </div>
      </div>
    </div>
  );
};

export default Financials;
