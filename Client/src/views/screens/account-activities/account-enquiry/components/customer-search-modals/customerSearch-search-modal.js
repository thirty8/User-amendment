import { React, useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import {AiOutlineEye} from "react-icons/ai";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";

import { API_SERVER } from "../../../../../../config/constant";

import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import PhoneNumber from "../../../../teller-ops/components/Phone_number";
import IndividualRelationshipAmendment from "../customer-search-modals/individual-relationship-amendment";
import CustomerEnquiry from "../customer-search-modals/customer-enquiry";
import AccountListEnquiry from "../../components/account-list-enquiry";
import CustomerSearchDataTable from "../customer-search-modals/customer-search-datatable";
import "../../../account-enquiry/customer-search.css";

import { Modal} from "@mantine/core";

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function CustomerSearchByNameModal({
  row1,
  closeSearchByName,
  customerNumber
}) {
    const [customerName, setCustomerName] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [relationshipType, setRelationshipType] = useState("");
    const [branch, setBranch] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const [relationshipAmendment, setRelationshipAmendment] = useState(false);
    const openRelationshipAmendment = () => setRelationshipAmendment(true);
    const closeRelationshipAmendment = () => setRelationshipAmendment(false);

    const [customerEnquiry, setCustomerEnquiry] = useState(false);
    const openCustomerEnquiry = () => setCustomerEnquiry(true);
    const closeCustomerEnquiry = () => setCustomerEnquiry(false);

    const [dataToAccountList,setDataToAccountList] = useState("")

    const [accountListEnquiry, setAccountListEnquiry] = useState(false);
    const openAccountListEnquiry = () => setAccountListEnquiry(true);
    const closeAccountListEnquiry = () => setAccountListEnquiry(false);

    const [stateLOV, setStateLOV] = useState([]);
    const [out, setOuts] = useState([]);
    const [Dataa, setDataa] = useState([]);
   
    let output = [];
    let searchResults = [];

    const onDoubleRowClick = (row) => {
      console.log(row[1] , "geee")
      setDataToAccountList(row[1]);
      closeSearchByName();
    };
    row1(dataToAccountList);

    // console.log(dataToAccountList,"dataToAccountList")

    useEffect(() => {
      let curr = [];
      const getBranch = () => {
        axios
          .get(API_SERVER + "/api/get-branch", { headers })
          .then((response) => {
            const results = response.data;
            results.map((i)=>{curr.push({label: i.br_code + " - " + i.br_description, value: i.br_description})})
            // for (let i = 0; i < results.length; i++) {
            //   const branch = results[0];
            //   const code = results[0];

            //   curr.push({ label: `${code} - ${branch}`, value: branch });
            // }
            console.log(curr, "djd");
            setStateLOV(curr);
            // console.log(stateLOV, "mmm");
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getBranch();
    }, []);

    const handleInputs = () => {
      setLoading(true);
      // console.log(phoneNumber,"phoneNumber")
      // console.log(branch,'letmeseesomething')
      console.log(customerID, "iddd");
      // console.log(stateLOV,"kk")
      console.log(relationshipType, "relajejue");
      axios
        .post(
          API_SERVER + "/api/getCustomerDetails",
          {
            customerName: customerName.toUpperCase(),
            customerID: customerID ? customerID : customerNumber,
            phoneNumber: phoneNumber,
            branch: branch,
            relationshipType: relationshipType,
          },
          { headers }
        )
        .then((response) => {
          setLoading(false);
          let results = response.data;
          console.log(results, "yolooooo");

          results.map((i, key) => {
            // searchResults.push([<button onClick={()=>{setDataa({customerNumber:results[key].i[1]})}}><MdCheckBoxOutlineBlank/></button>,null,i[1],null,i[0],i[2],null,i[3],null,i[4]])
            searchResults.push([
                <div style={{display:"flex",justifyContent:"center"}}>
              <ButtonComponent
                onClick={() => {
                  setDataa({ customerNumber: results[key].customer_number });
                  openCustomerEnquiry();
                }}
                buttonIcon={<FaLongArrowAltLeft  size={15} />}
                buttonHeight={"27px"}
                    buttonWidth={"27px"}
                    id="miniModalButton"
                    buttonBackgroundColor={"#5D8AA8"}
            />
            </div>,
                i.customer_number,
              null,
              i.customer_name,
              null,
              i.branch,
              <div style={{textAlign:"center"}}>{i.product}</div>,
              <div style={{display:"flex",justifyContent:"center"}}>
              {/* <ButtonComponent
                onClick={() => {
                  setDataa({ customerNumber: results[key].customer_number });
                  openAccountListEnquiry();
                }}
                buttonIcon={<FaLongArrowAltRight size={15} />}
                buttonWidth={"27px"}
                buttonHeight={"27px"}
                buttonBackgroundColor={"#5D8AA8"}
            /> */}
             <div style={{marginLeft: '5px'}}>
                     <ButtonComponent
                onClick={() => {
                  setDataa({
                    customerNumber: results[key].customer_number,
                    customerName: results[key].customer_name,
                  });
                  openRelationshipAmendment();
                }}
                buttonIcon={<AiOutlineEye  size={17} />}
                buttonHeight={"27px"}
                buttonWidth={"27px"}
                id="miniModalButton"
                // buttonBackgroundColor={"#003366"}
              />
              </div>
            </div>,
            ]);
          });
          console.log(searchResults, "resultss");
          setOuts(searchResults);
          console.log(Dataa.customerNumber, "numbrrrrr");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const clearFields = () => {
      console.log("lets gwuaexx");
      setCustomerName("");
      document.getElementById("customerName").value= "";
      setPhoneNumber("");
      // document.getElementById("phoneNumber").value = "";
      setRelationshipType("");
      setBranch("");
      setDate("");
      setOuts([]);
      // setCustomerID("");
      // document.getElementById("customerID").value= "";
    };

    useEffect(() => {
    handleInputs();
    }, []);

    console.log(dataToAccountList,"dataToAccountList")


  return (
    <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",zoom:0.9,marginTop:"10px"}}>
           <div style={{display:"flex"}}>
                <div style={{ flex: 0.03}}></div>
                <div style={{ flex: 0.94}}>
                  <div className="field" style={{paddingTop:"10px"}}>
                    <div style={{flex:0.51}}>
                      <InputField
                        label={"Customer Name"}
                        labelWidth={"38.7%"}
                        inputWidth={"61.3%"}
                        id={"customerName"}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                        }}
                        // placeholder={"Enter Customer Name"}
                      />
                    </div>
                    <div></div>
                    <div style={{flex:0.49}}>
                      {/* <InputField
                        label={"Customer ID"}
                        labelWidth={"35%"}
                        inputWidth={"51%"}
                        type={"number"}
                        id={"customerID"}
                        onChange={(e) => {
                          setCustomerID(e.target.value);
                        }}
                        // placeholder={"Enter Customer ID"}
                      /> */}
                       <ListOfValue
                        label={"Branch"}
                        labelWidth={"35%"}
                        inputWidth={"65%"}
                        data={stateLOV}
                        // placeholder={"Select Branch"}
                        onChange={(e) => {
                          setBranch(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div style={{display:"flex",flex:0.51}}
                    >
                      <div style={{ flex: 0.65 }}>
                        <InputField
                          label={"Date Of Incorp/Birth"}
                          labelWidth={"61%"}
                          inputWidth={"39%"}
                          type={"date"}
                        />
                      </div>
                      <div style={{ flex: 0.35 }}>
                        <InputField
                          label={"To:"}
                          labelWidth={"25%"}
                          inputWidth={"75%"}
                          type={"date"}
                        />
                      </div>
                    </div>
                    <div  style={{flex:0.07}}></div>
                    <div style={{flex:0.42}}>
                      <PhoneNumber
                        label={"Phone Number"}
                        labelWidth={"30%"}
                        inputWidth={"100%"}
                        // margin={"0 0  0 65px"}
                        onChange={(e) => {
                          setPhoneNumber(e);
                        }}
                        id={"phoneNumber"}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div style={{flex:0.51}}>
                    <SelectField
                        label={"Relationship Type"}
                        labelWidth={"38.7%"}
                        inputWidth={"61.3%"}
                        id={"relationshipType"}
                        data={[
                          { value: "SA - CORPORATE", label: "CORPORATE" },
                          { value: "SA - PERSONAL", label: "PERSONAL" },
                        ]}
                        onChange={(e) => {
                          setRelationshipType(e);
                        }}
                      />
                    </div>
                    <div></div>
                    <div style={{display:"flex",flex:0.49}}>
                      <div style={{flex:0.6}}></div>
                      <div style={{display:"flex",flex:0.4,justifyContent:"space-between"}}>
                      <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                      <ButtonComponent
                    label="Fetch"
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                    onClick={handleInputs}
                    buttonBackgroundColor={"green"}
                  />
                  </div>
                  <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
                  <ButtonComponent
                    label="Refresh"
                    onClick={clearFields}
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                  </div>
                      </div>
                   
                    </div>
                  </div>
                </div>
                <div style={{ flex: 0.03}}></div>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  marginTop: "17px",
                  marginBottom: "70px",
                }}
              >
                <div style={{ flex: 0.8}}></div>
                <div
                  style={{
                    display: "flex",
                    flex: "0.15",
                    justifyContent: "space-between",
                  }}
                >
                  <ButtonComponent
                    label="Fetch"
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                    onClick={handleInputs}
                  />
                  <ButtonComponent
                    label="Refresh"
                    onClick={() => {
                      clearFields();
                    }}
                    buttonWidth={"75px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                </div>
                <div style={{ flex: 0.05}}></div>
              </div> */}
              <br></br>
              <br></br>
              <div style={{zoom:0.95}}>
                <CustomerSearchDataTable
                style={{columnAlignCenter : [2]}}
                  onRowDoubleClick={onDoubleRowClick}
                  rowsPerPage={10}
                  data={out}
                  defaultMessage={loading}
                  headers={[ 
                    "",
                    "Customer ID",
                    "Relation NO.",
                    "Customer Name",
                    "Date Of Birth",
                    "Branch",
                    "Relationship Type",
                    "",
                  ]}
                />
              </div>
              <Modal
        size="70%"
        opened={relationshipAmendment}
        withCloseButton={false}
        centered
      >
             <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Individual Relationship Amendment
          </div>

          <svg
            onClick={closeRelationshipAmendment}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 ">
      <IndividualRelationshipAmendment Dataa={Dataa} />
 </div>
        </div>
      </div>
      
      </Modal>
      <Modal size="80%" opened={customerEnquiry} withCloseButton={false}>
      <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Customer Enquiry
          </div>

          <svg
            onClick={closeCustomerEnquiry}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div style={{marginTop:"5px"}} className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 " >
      <CustomerEnquiry Dataa={Dataa} />
 </div>
        </div>
      </div>
 </Modal>
      
      <Modal
        size="95%"
        opened={accountListEnquiry}
        withCloseButton={false}
      >
      <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#0369A1",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
          Account List Enquiry
          </div>

          <svg
            onClick={closeAccountListEnquiry}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div style={{marginTop:"5px"}} className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 " >
      <AccountListEnquiry customerID={customerID} Dataa={Dataa} />
 </div>
        </div>
      </div>
      </Modal>
            </div>
  );
}
export default CustomerSearchByNameModal;
