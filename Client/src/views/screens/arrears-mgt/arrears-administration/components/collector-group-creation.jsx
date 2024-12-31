import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import {
  FiArrowRight,
  FiCheckCircle,
  FiPenTool,
  FiPlus,
  FiTrash,
  FiX,
} from "react-icons/fi";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../control-setups/components/CustomTable";
import { Modal, ScrollArea } from "@mantine/core";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { BsPen } from "react-icons/bs/index.esm";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";

function CollectorGroupCreation() {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // VARIABLES
  const collectionGroupSetupHeaders = [
    <div className="text-left">Collector Group</div>,
    <div className="text-right">Min Days</div>,
    <div className="text-right">Max Days</div>,
    <div className="text-left">Posted By</div>,
    <div>Action</div>,
  ];

  const collectionGroupCreateHeaders = [
    <div className="text-left">Collector Group</div>,
    <div className="text-right">Min Days</div>,
    <div className="text-right">Max Days</div>,
    <div className="text-left">Posted By</div>,
  ];

  // STATES AND VARIABLES
  const [collectorGroup, setCollectorGroup] = useState([]);
  const [collectorGroupAmendData, setCollectorGroupAmendData] = useState([]);
  const [collectorData, setCOllectorData] = useState([]);
  const [amendmentLoader, setAmendmentLoader] = useState(false);
  const [collectorAmendLov, setCollectorAmendLov] = useState([]);
  const [collectorGroupLov, setCollectorGroupLov] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectorGroupLovValue, setCollectorGroupLovValue] = useState("");
  const [collectorGroupMinDays, setCollectorGroupMinDays] = useState("");
  const [collectorGroupMaxDays, setCollectorGroupMaxDays] = useState("");
  const [amendCollectorModal, setAmendCollectorModal] = useState(false);
  const [createCollectorModal, setCreateCollectorModal] = useState(false);
  const [amendDetails, setAmendDetails] = useState(false);
  const [creationGroupLoader, setCreationGroupLoader] = useState(false);
  const [creationDetails, setCreationDetails] = useState({
    description: "",
    minDays: "",
    maxDays: "",
  });

  // AMENDING STATES
  const [selectedAmendmentObject, setselectedAmendmentObject] = useState({});

  var collectorSetupData = collectorGroup?.map((i) => {
    return [
      <div className="text-left">
        {i?.collector_code} - {i?.description}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_min_days)}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_max_days)}
      </div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div
        onClick={() => {
          setCOllectorData(i);
        }}
        className="flex items-center justify-center"
      >
        <ButtonComponent
          buttonIcon={<BsPen size={16} />}
          buttonWidth={"30px"}
          // label={"Amend"}
          title="Amend collector group"
          buttonHeight={"27px"}
          buttonBackgroundColor={"orange"}
          onClick={() => {
            setAmendCollectorModal(true);
            setselectedAmendmentObject({
              ...selectedAmendmentObject,
              collector_code: i?.collector_code,
              description: i?.description,
              collector_min_days: i?.collector_min_days,
              collector_max_days: i?.collector_max_days,
            });

            console.log(i, "mayaa");
          }}
        />

        <div className="ml-4">
          <ButtonComponent
            buttonIcon={<FiTrash size={16} />}
            buttonWidth={"30px"}
            title="Remove collector group"
            // label={"Remove"}
            buttonHeight={"27px"}
            buttonBackgroundColor={"red"}
            onClick={() => {
              Swal.fire({
                title: `Are you sure you want to remove ${i?.description}?`,
                text: "",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteCollectorGroup(i?.collector_code);
                }
              });
            }}
          />
        </div>
      </div>,
    ];
  });

  // VALIDATIONS FOR MIN AND MAX PAIRS
  let minMaxPairs = [];

  const [minArrearsDays, setMinArrearsDays] = useState("");
  const [maxArrearsDays, setMaxArrearsDays] = useState("");

  var collectorCreateData = collectorGroup?.map((i) => {
    minMaxPairs.push({
      min: parseFloat(i?.collector_min_days),
      max: parseFloat(i?.collector_max_days),
    });

    return [
      <div className="text-left">
        {i?.collector_code} - {i?.description}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_min_days)}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_max_days)}
      </div>,
      <div className="text-left">{i?.posted_by}</div>,
    ];
  });

  console.log(minMaxPairs);

  const handleCheckRange = () => {
    const minDays = parseFloat(minArrearsDays);
    const maxDays = parseFloat(maxArrearsDays);

    const foundInRange = minMaxPairs.some(
      (pair) =>
        (minDays >= pair.min && minDays <= pair.max) || // minDays is within any existing range
        (maxDays >= pair.min && maxDays <= pair.max) || // maxDays is within any existing range
        (minDays <= pair.min && maxDays >= pair.max) // input range overlaps with any existing range
    );

    console.log(minDays, "RAA");
    console.log(maxDays, "RAA");

    if (foundInRange) {
      Swal.fire(
        "ERR - 07749: Collector group min and max days fall in other collector group ranges",
        "",
        "error"
      );
    } else {
      createCollectorGroup();
    }
  };

  const handleCheckAmendRange = () => {
    const minDays = parseFloat(selectedAmendmentObject?.collector_min_days);
    const maxDays = parseFloat(selectedAmendmentObject?.collector_max_days);

    // const foundInRange = minMaxPairs.some(
    //   (pair) =>
    //     (minDays >= pair.min &&
    //       minDays <= pair.max &&
    //       !selectedAmendmentObject?.collector_code) || // minDays is within any existing range
    //     (maxDays >= pair.min &&
    //       maxDays <= pair.max &&
    //       !selectedAmendmentObject?.collector_code) || // maxDays is within any existing range
    //     (minDays <= pair.min &&
    //       maxDays >= pair.max &&
    //       !selectedAmendmentObject?.collector_code) // input range overlaps with any existing range
    // );

    const foundInRange = minMaxPairs.some(
      (pair) =>
        (minDays >= pair.min && minDays <= pair.max) || // minDays is within any existing range
        (maxDays >= pair.min && maxDays <= pair.max) || // maxDays is within any existing range
        (minDays <= pair.min && maxDays >= pair.max) // input range overlaps with any existing range
    );

    const nothingChanged = minMaxPairs?.some(
      (pair) => minDays === pair.min && maxDays === pair.max
    );

    if (
      foundInRange &&
      !nothingChanged &&
      !selectedAmendmentObject?.collector_code
    ) {
      Swal.fire(
        "ERR - 07749: Collector group min and max days fall in other collector group ranges",
        "",
        "error"
      );
    } else if (
      nothingChanged &&
      !foundInRange &&
      selectedAmendmentObject?.collector_code
    ) {
      handleAmendCollectorGroup();
    } else {
      handleAmendCollectorGroup();
    }
  };

  var collectorAmendData = collectorGroupAmendData?.map((i) => {
    return [
      <div className="text-left">
        {i?.collector_code} - {i?.description}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_min_days)}
      </div>,
      <div className="text-right">
        {formatNumberWithoutDecimals(i?.collector_max_days)}
      </div>,
      <div className="text-left">{i?.posted_by}</div>,
      <div
        onClick={() => {
          setCOllectorData(i);
        }}
        className="flex items-center justify-center"
      >
        <ButtonComponent
          buttonIcon={<FiArrowRight />}
          buttonWidth={"45px"}
          buttonHeight={"23px"}
          onClick={() => {
            setselectedAmendmentObject(i);
          }}
        />
      </div>,
    ];
  });

  //  FUNCTIONS
  // HANDLE ON CLICK OF EXIT BUTTON
  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  const getCurrentCollectorGroups = () => {
    axios
      .post(
        API_SERVER + "/api/get-collector-group-setup",
        {
          collector_code: collectorGroupLovValue,
          collector_min_days: collectorGroupMinDays,
          collector_max_days: collectorGroupMaxDays,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setCollectorGroup(response.data);
        setCollectorGroupAmendData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Something went wrong:` + error);
        setLoading(false);
      });
  };

  // EFFECTS
  useEffect(() => {
    getCurrentCollectorGroups();

    axios
      .get(API_SERVER + "/api/get-collector-group-lov", { headers: headers })
      .then(function (response) {
        setCollectorGroupLov(response.data);
        setCollectorAmendLov(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Something went wrong:` + error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getCurrentCollectorGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectorGroup]);

  // FUNCTION
  function formatNumberWithoutDecimals(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  /*
 
     ____                         _                
    |  _ \ _ __ ___   ___ ___  __| |_   _ _ __ ___ 
    | |_) | '__/ _ \ / __/ _ \/ _` | | | | '__/ _ \
    |  __/| | | (_) | (_|  __/ (_| | |_| | | |  __/
    |_|   |_|  \___/ \___\___|\__,_|\__,_|_|  \___|
                                                   
 
*/
  const handleAmendCollectorGroup = () => {
    var userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    var userName = userInfo?.id;
    var branch = userInfo?.branchCode;

    setAmendmentLoader(true);
    axios
      .post(
        API_SERVER + "/api/collector-grp-amendment-prc",
        {
          collector_code_v: selectedAmendmentObject?.collector_code,
          collector_desc_v: selectedAmendmentObject?.description,
          collector_min_days_v: parseFloat(
            selectedAmendmentObject?.collector_min_days
          ),
          collector_max_days_v: parseFloat(
            selectedAmendmentObject?.collector_max_days
          ),
          posting_branch_v: branch,
          posted_by_v: userName,
          global_username_v: userName,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data?.responseCode === "998") {
          Swal.fire(
            "INF-0942: Collector Group amended successfully",
            "",
            "success"
          );
          setAmendCollectorModal(false);
        } else {
          Swal.fire(response?.data?.responseMessage, "", "error");
        }
        setAmendmentLoader(false);
      })
      .catch((err) => {
        console.log("Something went wrong" + err);
        setAmendmentLoader(false);
      });
  };

  const handleDeleteCollectorGroup = (item) => {
    var userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    var userName = userInfo?.id;
    var branch = userInfo?.branchCode;

    axios
      .post(
        API_SERVER + "/api/collector-grp-deletion-prc",
        {
          collector_code_v: item,
          global_username_v: userName,
          posting_branch_v: branch,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data?.responseCode === "000") {
          Swal.fire(
            "INF-2881: Collector group deleted successfully",
            "",
            "success"
          );
          setAmendCollectorModal(false); // Close the delete modal if deletion is successful
        } else {
          Swal.fire(response?.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => console.log("Something went wrong: " + err));
  };

  const createCollectorGroup = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // var ip = localStorage.getItem("ipAddress");
    var hostname = userInfo?.id;
    var branch = userInfo?.branchCode;

    setCreationGroupLoader(true);

    axios
      .post(
        API_SERVER + "/api/collector-group-creation-ok",
        {
          collector_desc_v: creationDetails?.description,
          collector_min_days_v: creationDetails?.minDays,
          collector_max_days_v: creationDetails?.maxDays,
          posting_branch_v: branch,
          posted_by_v: hostname,
          global_username_v: hostname,
        },
        { headers: headers }
      )
      .then(function (response) {
        setCreationGroupLoader(false);

        console.log(response.data, "coll grp msg");
        if (response.data?.responseCode === "998") {
          Swal.fire(response?.data?.responseMessage, "", "success");
          setCreateCollectorModal(false);
          setCreationGroupLoader(false);
          getCurrentCollectorGroups();
        } else {
          Swal.fire(response?.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => {
        console.log("Something went wrong" + err);
        setCreationGroupLoader(false);
      });
  };

  return (
    <div className="grid place-items-center">
      <div className="border border-[#ccc] w-[70%] rounded-md p-3">
        {/* <br /> */}
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayNew={"none"}
          displayRefresh={"none"}
          displayOk={"none"}
          onFetchClick={getCurrentCollectorGroups}
        />
        {/*
 
   _____                   _             
  | ____|_ __   __ _ _   _(_)_ __ _   _  
  |  _| | '_ \ / _` | | | | | '__| | | | 
  | |___| | | | (_| | |_| | | |  | |_| | 
  |_____|_| |_|\__, |\__,_|_|_|   \__, | 
                  |_|             |___/  
 
*/}{" "}
        <div
          className="flex flex-col w-full pt-1 rounded-sm"
          style={{ zoom: 0.95 }}
        >
          <div className="flex gap-2 justify-between mt-4 mb-4">
            <ButtonComponent
              label={"Create Collector Group"}
              buttonHeight={"30px"}
              buttonWidth={"220px"}
              buttonIcon={<FiPlus />}
              buttonBackgroundColor={"#3b82f6"}
              onClick={() => setCreateCollectorModal(true)}
            />

            <div className="flex gap-2 items-center">
              {/* <div>
              <ButtonComponent
                label={"Fetch"}
                buttonHeight={"30px"}
                buttonWidth={"100px"}
                buttonBackgroundColor={"green"}
                buttonIcon={<FiCheckCircle />}
                onClick={() => getCurrentCollectorGroups()}
              />
            </div> */}

              <div></div>
            </div>
          </div>

          <hr />
          <br />

          <Header title={"Collector Group Setup"} headerShade />
          <div>
            <CustomTable
              headers={collectionGroupSetupHeaders}
              data={collectorSetupData}
              load={loading}
              hidePagination
              rowsPerPage={50}
            />
          </div>
        </div>
        {/*   _                             _            __  __           _       _ 
           / \   _ __ ___   ___ _ __   __| |          |  \/  | ___   __| | __ _| |
          / _ \ | '_ ` _ \ / _ \ '_ \ / _` |          | |\/| |/ _ \ / _` |/ _` | |
         / ___ \| | | | | |  __/ | | | (_| |          | |  | | (_) | (_| | (_| | |
        /_/   \_\_| |_| |_|\___|_| |_|\__,_|          |_|  |_|\___/ \__,_|\__,_|_|
*/}
        <Modal
          opened={amendCollectorModal}
          onClose={() => {
            setAmendCollectorModal(false);
            setAmendDetails(false);
            getCurrentCollectorGroups();
            setselectedAmendmentObject({
              description: "",
              collector_min_days: "",
              collector_max_days: "",
            });
          }}
          withCloseButton={false}
          size={"xl"}
          trapFocus={false}
          padding={10}
          scrollAreaComponent={ScrollArea.Autosize}
          radius={"sm"}
        >
          <div className="border border-[#ccc] rounded-sm p-2">
            <Header title="Amend Collector" headerShade />
            <div className="mt-2 mb-4 space-y-4 rounded-sm">
              <div className="mt-4">
                <InputField
                  label="Collector Group"
                  required
                  disabled={true}
                  labelWidth={"30%"}
                  inputWidth={"40%"}
                  value={selectedAmendmentObject?.description}
                  onChange={(e) => {
                    setselectedAmendmentObject({
                      ...selectedAmendmentObject,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <InputField
                  label="Min Arrears Days"
                  required
                  disabled={amendDetails ? false : true}
                  labelWidth={"30%"}
                  inputWidth={"40%"}
                  textAlign={"right"}
                  value={selectedAmendmentObject?.collector_min_days}
                  onChange={(e) => {
                    setselectedAmendmentObject({
                      ...selectedAmendmentObject,
                      collector_min_days: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <InputField
                  label="Max Arrears Days"
                  required
                  disabled={amendDetails ? false : true}
                  labelWidth={"30%"}
                  inputWidth={"40%"}
                  textAlign={"right"}
                  value={selectedAmendmentObject?.collector_max_days}
                  onChange={(e) => {
                    setselectedAmendmentObject({
                      ...selectedAmendmentObject,
                      collector_max_days: e.target.value,
                    });
                  }}
                />
              </div>

              <hr />

              <div className="flex justify-between" style={{ zoom: "0.9" }}>
                <div className="flex items-center justify-start">
                  <ButtonComponent
                    label={amendDetails ? "Cancel" : "Edit"}
                    buttonHeight={"29px"}
                    buttonWidth={"90px"}
                    buttonBackgroundColor={amendDetails ? "orange" : "#4287f5"}
                    buttonIcon={amendDetails ? <FiX /> : <FiPenTool />}
                    onClick={() => {
                      setAmendDetails(!amendDetails);
                    }}
                  />

                  <div className="ml-4">
                    <ButtonComponent
                      label={"Remove Collector Group"}
                      buttonHeight={"29px"}
                      buttonWidth={"240px"}
                      buttonBackgroundColor={"tomato"}
                      buttonIcon={<FiTrash />}
                      onClick={() => {
                        Swal.fire({
                          title: `Are you sure you want to remove ${selectedAmendmentObject?.description}?`,
                          text: "",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, remove",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteCollectorGroup();
                          }
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end mr-5">
                  <ButtonComponent
                    label={amendmentLoader ? <Spin /> : "Apply changes"}
                    buttonHeight={"29px"}
                    buttonWidth={"170px"}
                    disabled={amendDetails ? false : true}
                    buttonBackgroundColor={
                      amendDetails
                        ? "green"
                        : amendDetails && amendmentLoader === true
                        ? "#ccc"
                        : "#ccc"
                    }
                    buttonIcon={amendmentLoader ? "" : <FiCheckCircle />}
                    onClick={() => {
                      if (amendDetails === true) {
                        handleCheckAmendRange();
                      }
                    }}
                  />

                  <div className="ml-4">
                    <ButtonComponent
                      label={"Exit"}
                      buttonHeight={"29px"}
                      buttonWidth={"80px"}
                      buttonBackgroundColor={"red"}
                      buttonIcon={<FiX />}
                      onClick={() => {
                        setAmendCollectorModal(false);
                        setMinArrearsDays("");
                        setMaxArrearsDays("");
                        getCurrentCollectorGroups();
                        setselectedAmendmentObject({
                          ...selectedAmendmentObject,
                          description: "",
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ zoom: 0.8 }}>
                <Header title="Collector Groups" headerShade />
                <CustomTable
                  headers={collectionGroupCreateHeaders}
                  data={collectorCreateData}
                  load={loading}
                  hidePagination
                  rowsPerPage={50}
                />
              </div>
            </div>
          </div>
        </Modal>
        {/*
 
    ____                _                  __  __           _       _ 
   / ___|_ __ ___  __ _| |_ ___           |  \/  | ___   __| | __ _| |
  | |   | '__/ _ \/ _` | __/ _ \          | |\/| |/ _ \ / _` |/ _` | |
  | |___| | |  __/ (_| | ||  __/          | |  | | (_) | (_| | (_| | |
   \____|_|  \___|\__,_|\__\___|          |_|  |_|\___/ \__,_|\__,_|_|
                                                             
 
*/}
        <Modal
          opened={createCollectorModal}
          onClose={() => {
            setCreateCollectorModal(false);
            setMinArrearsDays("");
            setMaxArrearsDays("");
            setselectedAmendmentObject({
              ...selectedAmendmentObject,
              description: "",
            });
            setCreationDetails({
              ...creationDetails,
              description: "",
              minDays: "",
              maxDays: "",
            });
          }}
          withCloseButton={false}
          size={"xl"}
          trapFocus={false}
          padding={10}
          scrollAreaComponent={ScrollArea.Autosize}
          radius={"sm"}
        >
          <Header title="Create Collector" headerShade />
          <div className="mt-2 mb-4 space-y-4  rounded-lg">
            <div className="mt-4">
              <InputField
                label="Collector Group"
                required
                labelWidth={"30%"}
                inputWidth={"40%"}
                onChange={(e) => {
                  setCreationDetails({
                    ...creationDetails,
                    description: e.target.value,
                  });
                }}
                value={creationDetails?.description}
              />
            </div>

            <div>
              <InputField
                label="Min Arrears Days"
                required
                labelWidth={"30%"}
                inputWidth={"40%"}
                textAlign={"right"}
                onChange={(e) => {
                  setCreationDetails({
                    ...creationDetails,
                    minDays: e.target.value,
                  });
                  setMinArrearsDays(e.target.value);
                }}
                value={creationDetails?.minDays}
              />
            </div>

            <div>
              <InputField
                label="Max Arrears Days"
                required
                labelWidth={"30%"}
                inputWidth={"40%"}
                textAlign={"right"}
                onChange={(e) => {
                  setCreationDetails({
                    ...creationDetails,
                    maxDays: e.target.value,
                  });
                  setMaxArrearsDays(e.target.value);
                }}
                value={creationDetails?.maxDays}
              />
            </div>

            <hr />

            <div className="flex items-center justify-end mr-5">
              <ButtonComponent
                label={creationGroupLoader ? <Spin /> : "Save"}
                buttonHeight={"29px"}
                buttonWidth={"80px"}
                buttonBackgroundColor={creationGroupLoader ? "white" : "green"}
                buttonIcon={creationGroupLoader ? "" : <FiCheckCircle />}
                onClick={handleCheckRange}
              />

              <div className="ml-4">
                <ButtonComponent
                  label={"Exit"}
                  buttonHeight={"29px"}
                  buttonWidth={"80px"}
                  buttonBackgroundColor={"red"}
                  buttonIcon={<FiX />}
                  onClick={() => {
                    setCreateCollectorModal(false);
                    setMinArrearsDays("");
                    setMaxArrearsDays("");
                    setselectedAmendmentObject({
                      ...selectedAmendmentObject,
                      description: "",
                    });
                    setCreationDetails({
                      ...creationDetails,
                      description: "",
                      minDays: "",
                      maxDays: "",
                    });
                  }}
                />
              </div>
            </div>

            <div style={{ zoom: 0.8 }}>
              <Header title="Collector Groups" headerShade />
              <CustomTable
                headers={collectionGroupCreateHeaders}
                data={collectorCreateData}
                load={loading}
                hidePagination
                rowsPerPage={50}
              />
            </div>
          </div>
        </Modal>
        {/* <Modal
        opened={creationGroupLoader}
        onClose={() => {
          setCreationGroupLoader(false);
          setCreateCollectorModal(true);
        }}
        centered
        withCloseButton={false}
      >
        <div className="flex flex-col items-center justify-center">
          <Spin />

          <br />
          <div className="animate-pulse">Creating group collector...</div>
        </div>
      </Modal> */}
      </div>
    </div>
  );
}

export default CollectorGroupCreation;
