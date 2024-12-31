import React, { useState, useEffect } from "react";
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
import RadioButtons from "../fields/RadioButtons.jsx";
import Phone_number from "../fields/Phone_number.jsx";
import Swal from "sweetalert2";
import { HiSave } from "react-icons/hi";
import { Button } from "@mantine/core";

const Employment = ({ customerNumber, guaTab, secondTab }) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [employmentCategory, setEmploymentCategory] = useState("002");

  const [employmentType, setEmploymentType] = useState("");
  const [employmentTypeLov, setEmploymentTypeLov] = useState([]);

  const [city, setCity] = useState("");
  const [cityLov, setCityLov] = useState([]);
  const [employer, setEmployer] = useState("");
  const [others, setOthers] = useState("");
  const [positionHeld, setPositionHeld] = useState("");
  const [employedSince, setEmployedSince] = useState("");
  const [commencement, setCommencement] = useState("");
  const [dateExited, setDateExited] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [location, setLocation] = useState("");
  const [fixedContract, setFixedContract] = useState("");
  const [employmentNo, setEmploymentNo] = useState("");
  const [department, setDepartment] = useState("");
  const [salaryDay, setSalaryDay] = useState("");
  const [faxNo, setFaxNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [tableData, setTableData] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function validateBlock() {
    if (
      employmentCategory === "" ||
      employmentType === "" ||
      positionHeld === "" ||
      employedSince === "" ||
      address1 === "" ||
      phone1 === "" ||
      city === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "All Fields Are Required",
        html: 'Please fill all required fields with <span style="color: red; font-weight: bold;">asterisk (*)</span>',
      });
    } else {
      saveEmpDetails();
    }
  }

  useEffect(() => {
    async function getEmploymentType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "EMT" },
        {
          headers,
        }
      );
      setEmploymentTypeLov(response.data);
    }

    async function getCity() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CTY" },
        {
          headers,
        }
      );
      setCityLov(response.data);
    }

    getEmploymentType();
    getCity();
  }, []);

  function saveEmpDetails() {
    axios
      .post(
        API_SERVER + "/api/save-employment-details",
        {
          customerNumber: customerNumber,
          employmentCategory: employmentCategory,
          positionHeld: positionHeld?.toLowerCase(),
          employedSince: employedSince,
          address1: address1,
          city: city,
          phone1: phone1,
        },
        { headers: headers }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Employment Details Saved Successfully",
          // timer: 1500,
          // button: false,
        });
        console.log(response.data, "tabledata");
        setTableData(response.data);
        setEmploymentType("");
        setEmployer("");
        setOthers("");
        setPositionHeld("");
        setEmployedSince("");
        setCommencement("");
        setDateExited("");
        setAddress1("");
        setAddress2("");
        setEmail("");
        setPhone1("");
        setPhone2("");
        setLocation("");
        setEmploymentNo("");
        setDepartment("");
        setSalaryDay("");
        setFaxNo("");
        setLandmark("");
        setCity("");
      });
  }

  return (
    <div className="h-[495px] overflow-y-scroll">
      <div>
        <HeaderComponent title={"Employment Details"} height={"35px"} />
      </div>
      <div
        style={{
          display: "flex",
          // marginTop: "5px",
          borderRadius: "5px",
          // border: "2px solid #d6d7d9",
          // padding: "10px",
          // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div
          style={{
            flex: 0.5,
          }}
        >
          <div>
            <SelectField
              label={"Employment Category"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              required
              value={employmentCategory}
              lovdata={[
                { label: "Current Employment", value: "002" },
                { label: "Previous Employment", value: "001" },
              ]}
              onChange={(value) => {
                setEmploymentCategory(value);
              }}
            />
          </div>
          <div>
            <ListOfValue
              label={"Employment Type"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              required
              lovdata={employmentTypeLov}
              value={employmentType}
              onChange={(value) => {
                setEmploymentType(value);
              }}
            />
          </div>
          <div>
            <InputField
              label={"Employer"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Others"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={others}
              onChange={(e) => setOthers(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Position Held"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              required
              value={positionHeld?.toUpperCase()}
              onChange={(e) => setPositionHeld(e.target.value)}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Employed Since"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              required
              value={employedSince}
              onChange={(e) => setEmployedSince(e.target.value)}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Date of Commencement"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={commencement}
              onChange={(e) => setCommencement(e.target.value)}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Date of Exited"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={dateExited}
              onChange={(e) => setDateExited(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Address 1"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          {/* <div>
            <InputField
              label={"Address 2"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div> */}
          <div>
            <InputField
              label={"Email Address"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.45,
          }}
        >
          {/* <div>
            <InputField
              label={"Phone 1"}
              labelWidth={"35%"}
              inputWidth={"35%"}
              required
            />
          </div> */}
          <div>
            <Phone_number
              label={"Phone 1"}
              // labelWidth={"53%"}
              inputWidth={"100%"}
              required
              // margin={"15px"}
              value={phone1}
              onChange={(value) => setPhone1(value)}
            />
          </div>
          <div>
            <Phone_number
              label={"Phone 2"}
              // labelWidth={"53%"}
              inputWidth={"100%"}
              // margin={"15px"}
              value={phone2}
              onChange={(value) => setPhone2(value)}
            />
          </div>
          <div>
            <InputField
              label={"Location"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <ListOfValue
              label={"City"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              required
              value={city}
              lovdata={cityLov}
              onChange={(value) => {
                setCity(value);
              }}
            />
          </div>
          {/* <div style={{ display: "flex" }}>
                <div style={{ marginTop: "-5px" }}>
                  <Label label={"Fixed Term Contract"} />
                </div>
                <div style={{ marginLeft: "30px", marginTop: "-15px" }}>
                  <Radio.Group>
                    <Group mt="xs">
                      <Radio value="yes" label="Yes" color={"orange"} />
                      <Radio value="no" label="No" color={"orange"} />
                    </Group>
                  </Radio.Group>
                </div>
              </div> */}
          <div>
            <RadioButtons
              label={"Fixed Term Contract"}
              // labelWidth={"36%"}
              display={true}
              display2={true}
              name={"anyname"}
              value={"Y"}
              value2={"N"}
              radioLabel={"Yes"}
              radioLabel2={"No"}
              radioButtonsWidth={"23%"}
            />
          </div>
          <div>
            <InputField
              label={"Employment Number"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={employmentNo}
              onChange={(e) => setEmploymentNo(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Department"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Salary Day"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={salaryDay}
              onChange={(e) => setSalaryDay(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Fax Number"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={faxNo}
              onChange={(e) => setFaxNo(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label={"Landmark"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <ButtonComponent
                label={"Save"}
                buttonIcon={<HiSave size={20} />}
                buttonBackgroundColor={"#42ba2c"}
                // background={"#6faf5e"}
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
                onClick={validateBlock}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <CustomTable
          headers={[
            "Employment Category",
            "Customer Number",
            "Address",
            "Position Held",
            "Employed Since",
            "City",
            "Phone",
          ]}
          data={tableData}
          style={{ columnAlignCenter: [1, 2, 3, 4, 5, 6, 7] }}
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
            onClick={secondTab}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            buttonBackgroundColor={"#0063d1"}
            background={"#c4549c"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={guaTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Employment;
