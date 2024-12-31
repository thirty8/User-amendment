import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import { AiFillEye } from "react-icons/ai";
// import PreviewPendingApprovalsDataTable from './PreviewPendingApprovals';
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Header from "../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { AiOutlineEye } from "react-icons/ai";
import CustomTable from "../../../../../components/others/customtable";
import { Modal, ScrollArea } from "@mantine/core";
import ApprovalDetails from "./ApprovalDetails";

function ApprovalItems({
  title,
  dataProcessingInfo,
  rowsPerPage,
  tableCellFontSize,
  approvalItemsDescription,
  itemCode,
  setApproveChanged,
}) {
  const options = {
    selectableRows: "none",
    rowsPerPage: 5,
    textLabels: {
      body: { noMatch: dataProcessingInfo },
    },
  };

  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [maximized, setMaximized] = useState(false);

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [batchNo, setBatchNo] = useState("");
  const [accountSourceBranch, setAccountSourceBranch] = useState("");
  const [amount, setAmount] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [username, setUsername] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [postingDate, setPostingDate] = useState("");

  const handleClose = () => setShowModal(false);

  const [approvalItemsData, setApprovalItemsData] = useState([]);

  const [approved, setApproved] = useState(false);

  const [modalSize, setModalSize] = useState("20%");

  const pageSize = 15; // Number of items per page

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the data to show only the items for the current page
  const currentPageData = data.slice(startIndex, endIndex);

  const [showPreviewPendingApprovals, setPreviewPendingApprovals] = useState(false);

  useEffect(() => {
    setData(data);
  }, [data]);

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  const handleOpenSummaryApprovalModal = (batchNo, branch, amount, acct_link) => {
    setShowModal(true);
    setBatchNo(batchNo);
    setAccountSourceBranch(branch);
    setAmount(amount);
    setAccNumber(acct_link);
  };

  const handleCloseSummaryApprovalModal = () => {
    setShowModal(false);
  };

  function formatAmount(number, decimalPlaces = 2) {
    // Convert the number to a string and split into integer and decimal parts
    const parts = number.toFixed(decimalPlaces).toString().split(".");

    // Add commas as thousands separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer and decimal parts
    return parts.join(".");
  }

  // Retrieve user_id and branch from localStorage
  const posted_by = JSON.parse(localStorage.getItem("userInfo")).id;
  const branchCode = JSON.parse(localStorage.getItem("userInfo")).branchCode;

  useEffect(() => {
    async function getApprovalItems() {
      let newData = [];

      // console.log(itemCode);

      let response = await axios.post(
        API_SERVER + "/api/approval-items",
        { branch_code: branchCode, posted_by: posted_by, item_code: itemCode },
        { headers }
      );
      // console.log(response.data,"summaryapproval")
      response.data.map((d, index) => {
        let i = index + 1;

        const dateObj = new Date(d.posting_date);

        const day = dateObj.getUTCDate().toString().padStart(2, "0");
        const month = new Intl.DateTimeFormat("en-US", { month: "short" })
          .format(dateObj)
          .toUpperCase();
        const year = dateObj.getUTCFullYear();

        let posting_date = `${day}-${month}-${year}`;

        let amount;
        let batch_no;
        let curr_name;
        let acct_link;
        let name;
        let branch_name;
        let username;

        if (d.amount < 1) {
          amount = "N/A";
        } else {
          amount = formatAmount(d.amount);
        }

        if (!d.curr_name) {
          curr_name = "N/A";
        } else {
          curr_name = d.curr_name;
        }

        if (!d.acct_link) {
          acct_link = "N/A";
        } else {
          acct_link = d.acct_link;
        }

        if (!d.name) {
          name = "N/A";
        } else {
          name = d.name;
        }

        if (!d.branch_name) {
          branch_name = "N/A";
        } else {
          branch_name = d.branch_name;
        }

        if (!d.username) {
          username = "N/A";
        } else {
          username = d.username;
        }

        if (!d.batch_no) {
          batch_no = "N/A";
        } else {
          batch_no = d.batch_no;
        }

        newData.push([
          i,
          batch_no,
          posting_date,
          acct_link,
          name,
          branch_name,
          curr_name,
          amount,
          username,
          d.time.slice(11, 16),
          <div style={{ display: "grid", placeItems: "center" }}>
            <ButtonComponent
              onClick={() =>
                handleOpenSummaryApprovalModal(d.batch_no, branch_name, d.amount, d.acct_link)
              }
              buttonIcon={<AiOutlineEye size={20} />}
              buttonHeight={"30px"}
              buttonWidth={"30px"}
            />
          </div>,
        ]);
      });
      setApprovalItemsData(newData);
    }
    getApprovalItems();

    // Fetch summary approval initially and then every 1 second (adjust the interval as needed)
    getApprovalItems();
    const interval = setInterval(getApprovalItems, 1000);
    return () => clearInterval(interval);
  }, [itemCode, approved]);

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              fontSize: "16.5px",
            },
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: "red !important",
          },
        },
      },
    });

  return (
    <div style={{ zoom: "0.78", marginTop: "-7px", marginBottom: "-15px" }}>
      {showModal ? (
        <Modal
          className="p-2 m-0"
          scrollAreaComponent={ScrollArea.Autosize}
          opened={showModal}
          size={modalSize}
          fullScreen={maximized}
          styles={{
            modal: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              position: "fixed",
            },
          }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleClose}
          closeOnClickOutside={false}
        >
          <ApprovalDetails
            setModalSize={setModalSize}
            setShowModal={setShowModal}
            setMaximized={setMaximized}
            maximized={maximized}
            batchNo={batchNo}
            amount={amount}
            accNumber={accNumber}
            accountSourceBranch={accountSourceBranch}
            approvalTitle={approvalItemsDescription}
            setApproveChanged={setApproveChanged}
            setApproved={setApproved}
            handleClose={handleClose}
            postingDate={postingDate}
            username={username}
            postedBy={postedBy}
          />
        </Modal>
      ) : (
        ""
      )}

      <div>
        <Header
          title={approvalItemsDescription}
          backgroundColor="#22c55e69"
          fontColor={"#5c5c5c"}
          headerShade={false}
          fontSize="22"
        />
        <CustomTable
          data={approvalItemsData}
          theadBackground="#22c55e"
          zoom="1.1"
          headers={[
            "#",
            "Ref. No.",
            "Posting Date",
            "Acc Number",
            "Acc Name",
            "Branch",
            "Currency",
            "Amount",
            "Username",
            "Time",
            "Action",
          ]}
          rowsPerPage={15}
        />
      </div>

      {/* </ThemeProvider> */}
    </div>
  );
}

export default ApprovalItems;
