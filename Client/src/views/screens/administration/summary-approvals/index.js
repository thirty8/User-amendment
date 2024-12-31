import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MDBIcon } from "mdb-react-ui-kit";
import { ButtonGroup } from "@mui/material";
import ApprovalSummary from "./components/ApprovalSummary";
import ApprovalItems from "./components/ApprovalItems";

import { SiFarfetch } from "react-icons/si";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { SiWebauthn } from "react-icons/si";
import { LuView } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { BiHelpCircle } from "react-icons/bi";
import { ImExit } from "react-icons/im";

const MyApprovals = ({
  onNewClick,
  onExitClick,
  onHelpClick,
  onRejectClick,
  onCancelClick,
  onOkClick,
  onRefreshClick,
  onDeleteClick,
  onAuthoriseClick,
  onViewClick,
  onFetchClick,
  displayNew,
  displayFetch,
  displayRefresh,
  displayDelete,
  displayAuthorise,
  displayView,
  displayOk,
  displayCancel,
  displayReject,
  displayHelp,
  displayExit,
}) => {
  function capitalizeFirstCharacter(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [getTheme, setTheme] = useState(customTheme);

  const [showMyApprovalLimit, setMyApprovalLimit] = useState(false);

  const [showApprovalItems, setShowApprovalItems] = useState(false);
  const [approvalItemsDescription, setApprovalItemsDescription] = useState("");
  const [itemCode, setItemCode] = useState("");

  function closeModalFunc() {
    const closedForm = localStorage.getItem("formName");

    // alert(closedForm);

    // setWidth("83.7%");
    // setModalSize("100%");
    // setMarginLeft("0px");
    // setMarginTop("65px");
    // setValue(true);

    // swal({
    //   title: "Are you sure?",
    //   text: "You're about to close the '" + closedForm + "' form",
    //   icon: "warning",
    //   buttons: ["Cancel", "Yes, Close Form"],
    //   dangerMode: true,
    // }).then((result) => {
    //   if (result) {
    //     var minimizedModals = [];
    //     if (localStorage.getItem("namesOfMinimizedModals")) {
    //       minimizedModals = JSON.parse(
    //         localStorage.getItem("namesOfMinimizedModals")
    //       );
    //       minimizedModals = minimizedModals.filter((e) => e !== closedForm);
    //       localStorage.setItem(
    //         "namesOfMinimizedModals",
    //         JSON.stringify(minimizedModals)
    //       );
    //     }

    //     setShowScreen(false);

    //     setNamesOfMinimizedModals(JSON.stringify(minimizedModals));
    //   }
    // });
  }

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

  const MyApprovalLimit = ({ name, showModal, setShowModal }) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
      <>
        <Modal
          size="md"
          className="headModal"
          show={showModal}
          //    centered
          // onHide={handleClose}
        >
          <Modal.Header
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                headerImage +
                `)`,
            }}
          >
            <div className="w-full -mb-4 flex justify-between ">
              <Modal.Title
                style={{
                  fontSize: "14.5px",
                  color: "white",
                  padding: "10px",
                }}
              >
                <p>My Approval Limit</p>
              </Modal.Title>
              <svg
                onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Modal.Header>

          <Modal.Body style={{ background: "white" }}>
            {/* <MyApprovalLimitDataTable /> */}
          </Modal.Body>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    console.log(getTheme.theme.navBarColor);
  }, [getTheme]);

  // console.log('am inside the ')

  const swal = require("sweetalert");

  function closeModal(formName) {
    var closedModalName = capitalizeFirstCharacter(formName);

    swal({
      title: "Are you sure?",
      text: "You're about to close the '" + closedModalName + "' form",
      icon: "warning",
      confirmButtonColor: "#8CD4F5",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        var minimizedModals = [];
        var formName = localStorage.getItem("formName");
        if (localStorage.getItem("namesOfMinimizedModals")) {
          minimizedModals = JSON.parse(
            localStorage.getItem("namesOfMinimizedModals")
          );
          minimizedModals = minimizedModals.filter((e) => e !== formName);
          localStorage.setItem(
            "namesOfMinimizedModals",
            JSON.stringify(minimizedModals)
          );
        }
        document.getElementById("globalModalCloseBtn").click();
        // alert(localStorage.getItem("namesOfMinimizedModals"));
      }
    });
  }

  const { t } = useTranslation();

  return (
    <div>
      <MyApprovalLimit
        name="Scan Document"
        showModal={showMyApprovalLimit}
        setShowModal={setMyApprovalLimit}
      />

      <hr style={{ marginTop: "-5px", marginBottom: "0px" }} />

      <div
        className="flex"
        style={{
          zoom: "0.80",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        centered
      >
        <div
          style={{ display: displayFetch }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onFetchClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="file-alt"
            /> */}
            <SiFarfetch
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />

            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Fetch
            </p>
          </div>
        </div>

        <div
          style={{ display: displayNew }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onNewClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="file-alt"
            /> */}

            <MdOutlineOpenInNew
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">New</p>
          </div>
        </div>

        <div
          style={{ display: displayRefresh }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onRefreshClick}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="sync"
            /> */}
            <FiRefreshCcw
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Refresh
            </p>
          </div>
        </div>

        <div
          style={{ display: displayDelete }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onDeleteClick}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="calendar-times"
            /> */}
            <AiFillDelete
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Delete
            </p>
          </div>
        </div>

        <div
          style={{ display: displayAuthorise }}
          className="header-button  ml-3 flex flex-col items-center w-[95px]  justify-center rounded hover:bg-gray-200"
          onClick={onAuthoriseClick}
        >
          <div className="flex flex-col justify-center items-center  ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="thumbs-up"
            /> */}
            <SiWebauthn
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 px-2 text-lg mt-[-3px] font-semibold">
              Authorise
            </p>
          </div>
        </div>

        <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onViewClick}
          style={{ display: displayView }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="eye"
            /> */}
            <LuView
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              View
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            // swal("Record successfully uploaded!");
          }}
          style={{ display: displayOk }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onOkClick}
          >
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="check"
            /> */}

            <FaCheck
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">Ok</p>
          </div>
        </div>

        <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onCancelClick}
          style={{ display: displayCancel }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="ban"
            /> */}
            <GiCancel
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Cancel
            </p>
          </div>
        </div>

        <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onRejectClick}
          style={{ display: displayReject }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
              fas
              icon="thumbs-down"
            /> */}
            <TiCancel
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Reject
            </p>
          </div>
        </div>

        <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onHelpClick}
          style={{ display: displayHelp }}
        >
          <div className="flex flex-col justify-center items-center ">
            {/* <MDBIcon
              style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
              fas
              icon="question-circle"
            /> */}
            <BiHelpCircle
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Help
            </p>
          </div>
        </div>

        <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          id="exitBTN1"
          onClick={() => closeModalFunc()}
          style={{ display: displayExit }}
        >
          <div
            // onClick={() => {
            //   document.getElementById("closeModalBTN").click();
            // }}
            onClick={handleExitClick}
            className=" flex flex-col items-center justify-center"
            style={
              {
                // background:
                //   `url(` +
                //   window.location.origin +
                //   `/assets/images/headerBackground/` +
                //   getTheme.theme.headerImage +
                //   `)`,
              }
            }
          >
            {/* <MDBIcon
              style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
              fas
              icon="sign-out-alt"
            /> */}

            <ImExit
              style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}
            />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Exit
            </p>
          </div>
        </div>
      </div>

      <hr style={{ marginTop: "9px" }} />

      <div className="flex w-full mt-2" style={{ zoom: "1.1" }}>
        <div className="w-3/10" style={{ width: "30%" }}>
          <ApprovalSummary
            setShowApprovalItems={setShowApprovalItems}
            setApprovalItemsDescription={setApprovalItemsDescription}
            setItemCode={setItemCode}
          />
        </div>

        {showApprovalItems ? (
          <div className="w-7/10 pl-3" style={{ width: "70%" }}>
            <ApprovalItems
              approvalItemsDescription={approvalItemsDescription}
              itemCode={itemCode}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyApprovals;
