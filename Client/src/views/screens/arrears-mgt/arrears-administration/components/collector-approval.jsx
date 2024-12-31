import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import CustomTable from "../../../control-setups/components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../teller-ops/teller/teller-activities";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import Swal from "sweetalert2";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { Modal, ScrollArea } from "@mantine/core";
import { FiCheckCircle, FiX } from "react-icons/fi";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { Spin } from "antd";

const CollectorApproval = ({ batchNo, setShowModal }) => {
  // VARIABLES
  var linkToBranchHeaders = [
    <div>Branch Code</div>,
    <div className="text-left">Branch Description</div>,
  ];

  var linkToProductHeaders = [
    <div>Product Code</div>,
    <div className="text-left">Product Description</div>,
  ];

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
 
        ____    ____ _____  _  _____ _____ ____  
       / / /   / ___|_   _|/ \|_   _| ____/ ___| 
      / / /    \___ \ | | / _ \ | | |  _| \___ \ 
     / / /      ___) || |/ ___ \| | | |___ ___) |
    /_/_/      |____/ |_/_/   \_\_| |_____|____/ 
                                                 
 
*/
  const [checkedValue, setCheckedValue] = useState(false);
  const [rejectReasonValue, setRejectReasonValue] = useState("");
  const [rejectReasonLabel, setRejectReasonLabel] = useState("");
  const [rejectReasons, setRejectReasons] = useState([]);
  const [comment, setComment] = useState("");
  const [rejectOrCancelClick, setRejectOrCancelClick] = useState(false);
  const [rejectReasonModal, setRejectReasonModal] = useState(false);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [loadingCollectorBranches, setLoadingCollectorBranches] =
    useState(true);
  const [loadingCollectorProducts, setLoadingCollectorProducts] =
    useState(true);
  const [selectedCollector, setSelectedCollector] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [cancelReasonModal, setcancelReasonModal] = useState(false);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-customer-approval-details",
        {
          username: batchNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "Collector Deets ");
        setSelectedCollector(response.data[0]);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });

    axios
      .post(
        API_SERVER + "/api/get-customer-approval-branches",
        {
          username: batchNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "Branch Deets");
        setBranches(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        API_SERVER + "/api/get-customer-approval-products",
        {
          username: batchNo,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "Product Deets");
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // COLLECTOR REJECT REASONS
    axios
      .get(API_SERVER + "/api/get-collector-reject-reasons", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data);
        setRejectReasons(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  var branchesOfCollector = branches?.map((i) => {
    return [
      <div>{i?.br_code}</div>,
      <div className="text-left">{i?.br_description?.split(" - ")[1]}</div>,
    ];
  });

  var productsOfCollector = products?.map((i) => {
    return [
      <div>{i?.prod_code}</div>,
      <div className="text-left">{i?.prod_desc}</div>,
    ];
  });

  /*
 
     _____                 _   _                 
    |  ___|   _ _ __   ___| |_(_) ___  _ __  ___ 
    | |_ | | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    |  _|| |_| | | | | (__| |_| | (_) | | | \__ \
    |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                                                 
 
*/
  const handleCheckboxChange = (event) => {
    setCheckedValue(event.target.checked);
  };

  const handleRejectOrCancelClick = () =>
    setRejectOrCancelClick(!rejectOrCancelClick);

  /*
 
     ____                         _                
    |  _ \ _ __ ___   ___ ___  __| |_   _ _ __ ___ 
    | |_) | '__/ _ \ / __/ _ \/ _` | | | | '__/ _ \
    |  __/| | | (_) | (_|  __/ (_| | |_| | | |  __/
    |_|   |_|  \___/ \___\___|\__,_|\__,_|_|  \___|
                                                   
 
*/
  const approveCollector = () => {
    setApprovalLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var id = userInfo?.id;
    var branch = userInfo?.branchCode;
    axios
      .post(
        API_SERVER + "/api/collector-creation-authorize",
        {
          USER_NAME_v: selectedCollector?.user_name,
          COLLECTOR_CODE_v: selectedCollector?.collector_code,
          POSTING_BRANCH_v: branch,
          posted_by_v: id,
          ZONE_NAME_v: selectedCollector?.zone_name,
          global_username_v: id,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "REPPP");
        setApprovalLoading(false);

        if (response.data?.responseMessage?.split(" - ")[0] === "INF") {
          Swal.fire(response.data?.responseMessage, "", "success");
          setShowModal(false);
        } else {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        setApprovalLoading(false);
      });
  };

  /*
 
   ____  _____    _ _____ ____ _____    ____ ___  _     _     _____ ____ _____ ___  ____  
  |  _ \| ____|  | | ____/ ___|_   _|  / ___/ _ \| |   | |   | ____/ ___|_   _/ _ \|  _ \ 
  | |_) |  _| _  | |  _|| |     | |   | |  | | | | |   | |   |  _|| |     | || | | | |_) |
  |  _ <| |__| |_| | |__| |___  | |   | |__| |_| | |___| |___| |__| |___  | || |_| |  _ < 
  |_| \_\_____\___/|_____\____| |_|    \____\___/|_____|_____|_____\____| |_| \___/|_| \_\
                                                                                          
 
*/
  // REJECT COLLECTOR
  const rejectCollector = () => {
    setApprovalLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var id = userInfo?.id;
    var branch = userInfo?.branchCode;

    axios
      .post(
        API_SERVER + "/api/collector-creation-reject-and-cancel",
        {
          APP_REJ_v: "R",
          app_flag_v: "R",
          LSTREASON_V: rejectReasonValue,
          DSREASON_v: rejectReasonLabel,
          USER_NAME_v: selectedCollector?.user_name,
          COLLECTOR_CODE_v: selectedCollector?.collector_code,
          POSTING_BRANCH_v: branch,
          posted_by_v: id,
          ZONE_NAME_v: selectedCollector?.zone_name,
          global_username_v: id,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "REPPP");
        setApprovalLoading(false);
        Swal.fire(response.data?.responseMessage, "", "success");
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setApprovalLoading(false);
      });
  };

  // CANCEL COLLECTOR
  const cancelCollector = () => {
    setApprovalLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var id = userInfo?.id;
    var branch = userInfo?.branchCode;

    axios
      .post(
        API_SERVER + "/api/collector-creation-reject-and-cancel",
        {
          APP_REJ_v: "C",
          app_flag_v: "C",
          LSTREASON_V: rejectReasonValue,
          DSREASON_v: rejectReasonLabel,
          USER_NAME_v: selectedCollector?.user_name,
          COLLECTOR_CODE_v: selectedCollector?.collector_code,
          POSTING_BRANCH_v: branch,
          posted_by_v: id,
          ZONE_NAME_v: selectedCollector?.zone_name,
          global_username_v: id,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "REPPP");
        setApprovalLoading(false);
        Swal.fire(response.data?.responseMessage, "", "success");
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setApprovalLoading(false);
      });
  };

  return (
    <div className="p-2" style={{ zoom: 0.95 }}>
      {loading && (
        <div className=" h-full w-full grid place-items-center bg-white top-0 right-0 left-0 opacity-90 absolute z-10">
          <div className="z-30 opacity-100  rounded-full">
            <Spin size="large" />
          </div>
        </div>
      )}
      <div style={{ zoom: 0.9 }} className="mb-4">
        <ActionButtons
          displayDelete={"none"}
          displayHelp={"none"}
          displayRefresh={"none"}
          displayView={"none"}
          displayOk={"none"}
          displayReject={checkedValue ? "none" : "block"}
          displayAuthorise={checkedValue ? "block" : "none"}
          displayCancel={checkedValue ? "none" : "block"}
          displayNew={"none"}
          displayFetch={"none"}
          displayExit={"none"}
          onCancelClick={() => {
            setcancelReasonModal(true);
            setloading(true);
          }}
          onRejectClick={() => {
            setRejectReasonModal(true);
            setloading(true);
          }}
          onAuthoriseClick={() => {
            Swal.fire({
              title: `Are you sure you want to authorize the details of ${selectedCollector?.user_name} as a collector?`,
              text: "",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, authorize Collector",
            }).then((result) => {
              if (result.isConfirmed) {
                approveCollector();
              }
            });
          }}
        />
      </div>

      <hr />

      <div className="mt-4 mb-4 flex items-center justify-center w-full">
        <ButtonType
          type="checkbox"
          label={"Check to confirm all the details"}
          checked={checkedValue}
          onChange={handleCheckboxChange}
        />
      </div>

      <hr />

      {/* DETAILS TO CREATE */}
      <div className="space-y-4 py-4">
        <div className="py-4 rounded-sm space-y-4">
          <div className="flex">
            <div className="w-[100%]">
              <InputField
                label={"Collector Name"}
                required
                disabled
                labelWidth={"20%"}
                inputWidth={"75%"}
                value={selectedCollector?.fullname}
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2">
              <InputField
                disabled
                label={"Collector Group"}
                required
                id={"collector-group"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={
                  selectedCollector?.collector_code +
                    " - " +
                    selectedCollector?.collector_type ===
                  "undefined - undefined"
                    ? ""
                    : selectedCollector?.collector_type
                }
              />
            </div>
            <div className="w-1/2">
              <InputField
                disabled
                label={"Experience Level"}
                required
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={
                  selectedCollector?.exp_level +
                    " - " +
                    selectedCollector?.exp_desc ===
                  "undefined - undefined"
                    ? ""
                    : selectedCollector?.exp_level +
                      " - " +
                      selectedCollector?.exp_desc
                }
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%]">
              <InputField
                disabled
                label={"Global Collector"}
                required
                id={"global-collector"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={selectedCollector?.globaluser === "Y" ? "Yes" : "No"}
              />
            </div>
            <div className="w-[50%]">
              <InputField
                disabled
                label={"Collector Zone"}
                required
                labelWidth={"40%"}
                inputWidth={"50%"}
                id="collector-zone"
                value={selectedCollector?.zone_name}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%]">
              <InputField
                disabled
                label={"Min Arrears Days"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                textAlign={"right"}
                value={
                  formatNumberWithoutDecimals(
                    parseFloat(selectedCollector?.collector_min_days)
                  ) === "NaN"
                    ? ""
                    : formatNumberWithoutDecimals(
                        parseFloat(selectedCollector?.collector_min_days)
                      )
                }
              />
            </div>

            <div className="w-[50%]">
              <InputField
                disabled
                label={"Max Arrears Days"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                textAlign={"right"}
                value={
                  formatNumberWithoutDecimals(
                    parseFloat(selectedCollector?.collector_max_days)
                  ) === "NaN"
                    ? ""
                    : formatNumberWithoutDecimals(
                        parseFloat(selectedCollector?.collector_max_days)
                      )
                }
              />
            </div>
          </div>

          <div className="flex items-baseline w-[50%]">
            <InputField
              label={"Ratio (%)"}
              required
              disabled
              labelWidth={"40%"}
              inputWidth={"50%"}
              textAlign={"right"}
              value={selectedCollector?.ratio}
            />
          </div>
        </div>

        <hr />

        <div className="flex items-center w-full" style={{ zoom: 0.85 }}>
          <div className="border border-[#ccc] p-2 rounded-sm w-[50%] mr-2">
            <Header title={"Link To Branch"} headerShade />

            <div className={`h-56 overflow-y-scroll`}>
              <CustomTable
                data={branchesOfCollector}
                headers={linkToBranchHeaders}
                loading={loadingCollectorBranches}
                hidePagination
                rowsPerPage={10000}
              />
            </div>
          </div>
          <div className="border border-[#ccc] p-2 rounded-sm w-[50%]">
            <Header title={"Link To Product"} headerShade />

            <div className={`h-56 overflow-y-scroll`}>
              <CustomTable
                data={productsOfCollector}
                headers={linkToProductHeaders}
                loading={loadingCollectorProducts}
                hidePagination
                rowsPerPage={10000}
              />
            </div>
          </div>
        </div>
      </div>

      {/* REJECT REASON MODAL */}
      <Modal
        opened={rejectReasonModal}
        size={"55%"}
        padding={"12px"}
        withCloseButton={false}
        onClose={() => {
          setRejectReasonModal(false);
          setloading(false);
        }}
        closeOnEscape={false}
        scrollAreaComponent={ScrollArea.Autosize}
        centered
      >
        <div className="space-y-4 mb-4 h-56 rounded-md" style={{ zoom: 0.9 }}>
          <Header
            title="Reject Reason and Comments"
            headerShade
            closeIcon={<FiX />}
            handleClose={() => {
              setRejectReasonModal(false);
              setloading(false);
            }}
          />
          <ListOfValue
            label={"Reject Reason"}
            required
            labelWidth={"20%"}
            inputWidth={"30%"}
            onChange={(value) => {
              let rejLabel = rejectReasons?.find(
                (i) => i?.value === value
              )?.label;
              setRejectReasonValue(value);
              setRejectReasonLabel(rejLabel);
            }}
            data={rejectReasons}
            value={rejectReasonValue}
          />

          <TextAreaField
            label={"Comment"}
            inputheight={"60px"}
            labelWidth={"20%"}
            inputWidth={"75%"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <hr />

          <div className="flex items-center justify-end mr-5 gap-3">
            <ButtonComponent
              label="Exit"
              buttonWidth={"80px"}
              buttonBackgroundColor={"red"}
              buttonHeight={"28px"}
              onClick={() => {
                setRejectReasonModal(false);
                setloading(false);
              }}
            />
            <ButtonComponent
              label="Reject"
              buttonWidth={"80px"}
              buttonBackgroundColor={"green "}
              buttonIcon={<FiX />}
              buttonHeight={"27px"}
              onClick={rejectCollector}
            />
          </div>
        </div>
      </Modal>

      {/* CANCEL MODAL */}
      <Modal
        opened={cancelReasonModal}
        size={"55%"}
        padding={"12px"}
        withCloseButton={false}
        onClose={() => {
          setRejectReasonModal(false);
          setloading(false);
        }}
        closeOnEscape={false}
        scrollAreaComponent={ScrollArea.Autosize}
        centered
      >
        <div className="space-y-4 mb-4 h-56 rounded-md" style={{ zoom: 0.9 }}>
          <Header
            title="Cancel Reason"
            headerShade
            closeIcon={<FiX />}
            handleClose={() => {
              setRejectReasonModal(false);
              setloading(false);
            }}
          />
          <ListOfValue
            label={"Reject Reason"}
            required
            labelWidth={"20%"}
            inputWidth={"30%"}
            onChange={(value) => {
              let rejLabel = rejectReasons?.find(
                (i) => i?.value === value
              )?.label;
              setRejectReasonValue(value);
              setRejectReasonLabel(rejLabel);
            }}
            data={rejectReasons}
            value={rejectReasonValue}
          />

          <TextAreaField
            label={"Comment"}
            inputheight={"60px"}
            labelWidth={"20%"}
            inputWidth={"75%"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <hr />

          <div className="flex items-center justify-end mr-5 gap-3">
            <ButtonComponent
              label="Back"
              buttonWidth={"80px"}
              buttonBackgroundColor={"red"}
              buttonHeight={"28px"}
              onClick={() => {
                setcancelReasonModal(false);
                setloading(false);
              }}
            />
            <ButtonComponent
              label="Cancel"
              buttonWidth={"100px"}
              buttonBackgroundColor={"green"}
              buttonIcon={<FiCheckCircle />}
              buttonHeight={"27px"}
              onClick={rejectCollector}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CollectorApproval;
