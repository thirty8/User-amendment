import axios from "axios";
import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../components/others/Fields/InputField";
import SelectField from "../../../../components/others/Fields/SelectField";
import { API_SERVER } from "../../../../config/constant";
import { FiEdit } from "react-icons/fi";
import CustomTable from "../components/CustomTable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { Modal } from "@mantine/core";
import Header from "../../../../components/others/Header/Header";
import { MDBIcon } from "mdb-react-ui-kit";
import Label from "../../../../components/others/Label/Label";
import ButtonType from "../../../../components/others/Button/ButtonType";

function BranchEnquiry() {
  // states
  const [branchZone, setBranchZone] = useState([]);
  const [branchDescription, setBranchDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchType, setBranchType] = useState("");
  const [status, setStatus] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [allBranches, setAllBranches] = useState([]);
  const [clickedData, setClickedData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [show, setShow] = useState(false);
  const [branchZoneValue, setBranchZoneValue] = useState("");
  const [limits, setLimits] = useState([]);

  // functions
  const handleClose = () => setShow(false);

  // getting the date opened
  function extractDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    document.getElementById("myDateInput").value = formattedDate;
  }

  // handle clear fields
  const handleClearFields = () => {
    setBranchDescription("");
    setPostedBy("");
    setStatus("");
    setBranchZoneValue("");
    setBranchCode("");
    setContactPerson("");
    setBranchType("");
  };

  console.log(selectedBranch, "selected");

  const handleShow = (i) => {
    setShow(true);
    console.log(i, "item");
    axios
      .post(
        API_SERVER + "/api/branchEnquiry/getSelectedBranch",
        {
          branchDescription: i?.branchDescription,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        setSelectedBranch(response.data[0]);
        extractDate(response.data[0]?.date_opened);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .post(
        API_SERVER + "/api/branchEnquiry/getLimits",
        {
          br_code: i?.br_code,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLimits(response.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId)?.focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  var modalHeaders = [
    "Currency",
    "Insurance Limit",
    "Max Credit Limit",
    "Min Dr Limit",
    "Max Floor Limit",
    "Min Floor Limit",
  ];

  var tableHeaders = [
    "Branch Code",
    "Branch Description",
    "Address 1",
    "Clearing Code",
    "EFT",
    "Branch Type",
    "Telephone",
    "Contact Person",
    "    Date Opened    ",
    "Posted By",
    "Details",
  ];

  // useEffects
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/branchEnquiry/branchZone", { headers: headers })
      .then(function (response) {
        // console.log(response.data);
        setBranchZone(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFetchAllBranches = () => {
    axios
      .post(
        API_SERVER + "/api/branchEnquiry/getAllBranches",
        {
          br_desc: branchDescription.toUpperCase(),
          postedBy: postedBy.toUpperCase(),
          branchCode: branchCode,
          status: status,
          branchType: branchType,
          contactPerson: contactPerson,
          br_zone: branchZoneValue,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setAllBranches(response.data);
        console.log(response.data, "all branches created");
      })
      .catch((err) => console.log(err));
  };

  let arr = [];

  var results = allBranches?.map((i) => {
    return [
      ...Object.values(i),
      <div
        onClick={() => {
          setClickedData(i);
          handleShow(i);
        }}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <ButtonComponent
          label={<FiEdit color={"white"} style={{ margin: "4px" }} />}
        />
      </div>,
    ];
  });

  // inserting into the limits table
  var lim = limits?.map((i) => {
    return [...Object.values(i)];
  });

  return (
    <div>
      {/* action buttons */}
      <div>
        <ActionButtons
          displayAuthorise={"none"}
          displayRefresh={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayOk={"none"}
          onFetchClick={handleFetchAllBranches}
          onNewClick={handleClearFields}
        />
      </div>
      <hr />
      <Header title={"Branch Enquiry"} headerShade={true} />
      <br />
      <div>
        {/* main body */}
        <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Branch Name"}
              labelWidth={"20%"}
              inputWidth={"70%"}
              id="branchName"
              textTransform={"uppercase"}
              onChange={(e) => setBranchDescription(e.target.value)}
              value={branchDescription}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  switchFocus(e, "postedBy");
                }
              }}
            />
          </div>

          <div style={{ width: "50%" }}>
            <ListOfValue
              label={"Branch Zone"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              data={branchZone}
              id={"branchZone"}
              value={branchZoneValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = document.getElementById("contactPerson");
                  input?.focus();
                }
              }}
              onChange={(value) => {
                setBranchZoneValue(value);
                setTimeout(() => {
                  const input = document.getElementById("contactPerson");
                  input?.focus();
                }, 0);
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Posted By"}
              labelWidth={"20%"}
              textTransform={"uppercase"}
              id="postedBy"
              inputWidth={"70%"}
              onChange={(e) => setPostedBy(e.target.value)}
              value={postedBy}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  switchFocus(e, "status");
                }
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Branch Code"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              onChange={(e) => setBranchCode(e.target.value)}
              value={branchCode}
              onKeyDown={(e) => {
                // switchFocus(e, )
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
          <div style={{ width: "50%", display: "flex" }}>
            <div style={{ width: "50%" }}>
              <InputField
                label={"Status"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                id="status"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "branchZone");
                  }
                }}
              />
            </div>

            <div style={{ marginLeft: "20px", width: "40%" }}>
              <SelectField
                label={"Branch Type"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                data={[
                  { label: "Local", value: "1" },
                  { label: "Node", value: "0" },
                  { label: "Select a type", value: "" },
                ]}
                onChange={(value) => setBranchType(value)}
                value={branchType}
              />
            </div>
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label={"Contact Person"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              onChange={(e) => {
                setContactPerson(e.target.value);
              }}
              value={contactPerson}
              id={"contactPerson"}
            />
          </div>
        </div>

        <br />
        <Header title={"Branch List"} headerShade={true} />
        {/* data table */}
        <CustomTable
          headers={tableHeaders}
          data={results}
          rowsPerPage={5}
          pagination={true}
        />

        {/* Modal Enquiry */}
        {show && (
          <div>
            <Modal
              className="p-0 m-0"
              opened={handleShow}
              size="90%"
              style={{ margin: 0, padding: 0 }}
              withCloseButton={false}
              transitionProps={"mounted"}
              onClose={handleShow}
            >
              <Header title="Branch Enquiry" headerShade={true} />
              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActionButtons
                    // displayExit={"none"}
                    onExitClick={() => handleClose()}
                    displayFetch={"none"}
                    displayDelete={"none"}
                    displayHelp={"none"}
                    displayRefresh={"none"}
                    displayNew={"none"}
                    displayView={"none"}
                    displayOk={"none"}
                    displayAuthorise={"none"}
                    displayCancel={"none"}
                    displayReject={"none"}
                  />

                  {/* <div
                    className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
                    onClick={handleClose}
                    style={{ zoom: "0.80", cursor: "pointer" }}
                  >
                    <div className=" flex flex-col items-center justify-center">
                      <MDBIcon
                        style={{
                          color: "grey",
                          fontSize: 20,
                          paddingTop: "15px",
                        }}
                        fas
                        icon="sign-out-alt"
                      />

                      <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                        Exit
                      </p>
                    </div>
                  </div> */}
                </div>
                <hr />

                <div
                  style={{ width: "100%", display: "flex", marginTop: "10px" }}
                >
                  {/* left side */}
                  <div style={{ width: "50%", marginRight: "50px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Branch Description"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        value={selectedBranch?.br_description}
                        // onChange={(e) => setBranchDescription(e.target.value)}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Branch Zone"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        // data={branchZone}
                        value={selectedBranch?.br_zone}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Address 1"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        value={selectedBranch?.address1}
                        // onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Address 2"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        value={
                          selectedBranch?.address2 === "null"
                            ? ""
                            : selectedBranch?.address2
                        }
                        // onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Address 3"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        value={
                          selectedBranch?.address3 === "null"
                            ? ""
                            : selectedBranch?.address3
                        }
                        // onChange={(e) => setAddress3(e.target.value)}
                      />
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "50%", marginRight: "10px" }}>
                        <InputField
                          disabled
                          label="Telephone"
                          labelWidth={"64%"}
                          inputWidth={"36%"}
                          required
                          type="number"
                          value={selectedBranch?.telephone}
                          // onChange={(e) => setTelephone(e.target.value)}
                        />
                      </div>

                      <div style={{ width: "50%" }}>
                        <InputField
                          disabled
                          label="Contact Person"
                          labelWidth={"50%"}
                          inputWidth={"50%"}
                          required
                          value={selectedBranch?.contact_person}

                          // onChange={(e) => setContactPerson(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Branch Email"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        value={selectedBranch?.email}
                        // onChange={(e) => setBranchEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* right side */}
                  <div style={{ width: "50%" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Branch Code"
                        labelWidth={"29%"}
                        inputWidth={"30%"}
                        // value={branchCode}
                        value={selectedBranch?.br_code}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label="Branch Manager"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        disabled
                        value={
                          selectedBranch?.br_manager === "null"
                            ? ""
                            : selectedBranch?.br_manager
                        }
                        // onChange={(e)=>setBranchManager(e.target.value)}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        label="Clearing Code"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        disabled
                        value={selectedBranch?.clearing_code}
                        // data={clearingCode}
                        // onChange={handleOnClearingCodeChange}
                      />
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "50%", marginRight: "10px" }}>
                        <InputField
                          disabled
                          label="Branch Short Code"
                          labelWidth={"65%"}
                          inputWidth={"35%"}
                          value={
                            selectedBranch?.sshort_code === "null"
                              ? ""
                              : selectedBranch?.sshort_code
                          }
                          // onChange={(e) => setBranchShortCode(e.target.value)}
                        />
                      </div>

                      <div style={{ width: "50%" }}>
                        <InputField
                          disabled
                          label="Swift Code"
                          labelWidth={"50%"}
                          inputWidth={"50%"}
                          value={
                            selectedBranch?.swift_code === "null"
                              ? ""
                              : selectedBranch?.swift_code
                          }
                          // onChange={(e) => setBranchSwiftCode(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <InputField
                        disabled
                        label="Region"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required
                        value={selectedBranch?.region}
                        // data={region}
                      />
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "70%",
                          marginRight: "10px",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Label
                          label="Branch Type"
                          fontSize="85%"
                          labelWidth={"43%"}
                        />

                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "30px" }}>
                            <ButtonType
                              label="Local"
                              type="radio"
                              name="branchType"
                              defaultChecked={
                                selectedBranch?.br_type === "1" ||
                                selectedBranch?.br_type === 1
                              }
                            />
                          </div>

                          <div>
                            <ButtonType
                              label="Node"
                              type="radio"
                              name="branchType"
                              defaultChecked={
                                selectedBranch?.br_type === "0" ||
                                selectedBranch?.br_type === 0
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "30%",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Label label="EFT" fontSize="85%" labelWidth={"30%"} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ marginRight: "30px" }}>
                            <ButtonType
                              label="Yes"
                              type="radio"
                              name="eft"
                              defaultChecked={
                                selectedBranch?.eft === "1" ||
                                selectedBranch?.eft === 1
                              }
                            />
                          </div>

                          <div>
                            <ButtonType
                              label="No"
                              type="radio"
                              name="eft"
                              defaultChecked={
                                selectedBranch?.eft === "0" ||
                                selectedBranch?.eft === 0
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "50%", marginRight: "10px" }}>
                        <InputField
                          disabled
                          label="Fax Number"
                          labelWidth={"65%"}
                          inputWidth={"35%"}
                          value={
                            selectedBranch?.fax_num === "null"
                              ? ""
                              : selectedBranch?.fax_num
                          }
                        />
                      </div>

                      <div style={{ width: "50%" }}>
                        <InputField
                          disabled
                          label="Date Opened"
                          id="myDateInput"
                          labelWidth={"50%"}
                          inputWidth={"50%"}
                          required
                          // value={extractDate(selectedBranch?.date_opened)}
                          type="date"
                        />
                      </div>
                    </div>

                    {/* device flag */}
                    <div
                      style={{
                        width: "70%",
                        marginRight: "10px",
                        display: "flex",
                        alignItems: "baseline",
                        marginBottom: "20px",
                      }}
                    >
                      <Label
                        label="Transactional Devices"
                        fontSize="85%"
                        labelWidth={"43%"}
                      />

                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "30px" }}>
                          <ButtonType
                            label="Enable"
                            type="radio"
                            value={"Y"}
                            name="transactionalDevices"
                            defaultChecked={selectedBranch?.device_flag === "Y"}
                            onChange={() => {}}
                          />
                        </div>

                        <div>
                          <ButtonType
                            label="Disable"
                            type="radio"
                            value={"N"}
                            name="transactionalDevices"
                            defaultChecked={selectedBranch?.device_flag === "N"}
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Header title="BRANCH LIMIT" headerShade={true} />
                <CustomTable headers={modalHeaders} data={lim} />
              </div>
              {/* </Modal.Body> */}
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default BranchEnquiry;
