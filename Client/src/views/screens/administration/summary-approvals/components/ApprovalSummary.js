import React, { useState, useEffect }  from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { AiFillEye, AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
// import PreviewPendingApprovalsDataTable from './PreviewPendingApprovals';
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Header from '../../../../../components/others/Header/Header';
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent';
import {AiOutlineEye} from "react-icons/ai";
import CustomTable from '../../../../../components/others/customtable';
import { Modal } from "@mantine/core";
import ApprovalDetails from "./ApprovalDetails";

function ApprovalSummary({ title, dataProcessingInfo, rowsPerPage, tableCellFontSize, setShowApprovalItems, setApprovalItemsDescription, setItemCode }) {
  const options = {
    selectableRows: "none",
    rowsPerPage: 5,
    textLabels: {
      body: { noMatch: dataProcessingInfo },
    },
  };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  }

  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [summaryApprovalData,setSummaryApprovalData]=useState([]);

  const [approved, setApproved] = useState(
    JSON.stringify(localStorage.getItem("approved"))
  );

  const pageSize = 15; // Number of items per page

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the data to show only the items for the current page
  const currentPageData = data.slice(startIndex, endIndex);

  const [showPreviewPendingApprovals, setPreviewPendingApprovals] =
    useState(false);

  useEffect(() => {
    setData(data);
  }, [data]);

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  // Retrieve user_id and branch from localStorage
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const user_id = userInfo.id;
  const branch = userInfo.branch;

  const handleClick = (item_code, description) => {
    // alert(description);
    localStorage.setItem("itemCode", item_code);
    setItemCode(item_code);
    setApprovalItemsDescription(description);
    setShowApprovalItems(true);
  };


   useEffect(() => {
     setApproved(JSON.parse(localStorage.getItem("approved")));
   }, [approved]);

  useEffect(() => {
    async function getSummaryApproval() {
      let newData = [];
      let response = await axios.post(
        API_SERVER + "/api/summary-approvals",
        { user_id: user_id, branch: branch },
        { headers }
      );

      // console.log(response.data,"summaryapproval");

      response.data.map((d, index) => {
        let i = index + 1;
        newData.push([
          i,
          d.code_description,
          d.num,
          <div style={{ display: "grid", placeItems: "center" }}>
            <ButtonComponent
              onClick={() => handleClick(d.item_code, d.code_description)}
              buttonIcon={
                <AiOutlineRight size={20}  />
              }
              buttonHeight={"30px"}
              buttonWidth={"30px"}
            />
          </div>,
        ]);
      });
      setSummaryApprovalData(newData);
    }

    // Fetch summary approval initially and then every 1 second (adjust the interval as needed)
    getSummaryApproval();
    const interval = setInterval(getSummaryApproval, 1000);
    return () => clearInterval(interval);
}, []);

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

      <div>
        <Header title={"Approval Summary"} headerShade={"true"} fontSize="22" />
        <CustomTable data={summaryApprovalData} zoom="1.1" headers={["#","Description","Count","Action"]} rowsPerPage={15} />
      </div>

      {/* </ThemeProvider> */}


    </div>
  );
}

export default ApprovalSummary;
