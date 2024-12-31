import React, { useState, useEffect }  from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { AiFillEye } from "react-icons/ai";
import PreviewPendingApprovalsDataTable from './PreviewPendingApprovals';
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

function SummaryApproval({ title, dataProcessingInfo, rowsPerPage, tableCellFontSize }) {
  const options = {
    selectableRows: "none",
    rowsPerPage: 5,
    textLabels: {
      body: { noMatch: dataProcessingInfo },
    },
  };

  const [data, setData] = useState([]);

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const pageSize = 12; // Number of items per page

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


  // Retrieve user_id and branch from localStorage
  const user_id = localStorage.getItem("userInfo").id;
  const branch = localStorage.getItem("userInfo").branch;

  let results = [];

  axios
    .post(
      `${API_SERVER}/api/summary-approvals`,
      {
        user_id: user_id,
        branch: branch,
      },
      {
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // Use the populated data array as needed
      // console.log(response.data);

      response.data.forEach((element, index) => {
        const description = element.code_description;
        const number = element.num;

        results.push([
          index + 1,
          description,
          number,
          <div
            className="flex space-x-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              style={{
                fontSize: "15px",
                color: "white",
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  headerImage +
                  `)`,
              }}
              onClick={function (e) {
                e.preventDefault();
                setPreviewPendingApprovals(!showPreviewPendingApprovals);
              }}
              className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
            >
              <div className="flex space-x-3">
                <AiFillEye style={{ color: "#0369a1", fontSize: "23px" }} />
                &nbsp;
              </div>
            </button>
          </div>,
        ]);
      });

      setData(results);

      // console.log(data, ":::::data");
    })
    .catch((error) => {
      console.error(error);
    });

    

  const PreviewPendingApprovalsModal = ({ name, showModal, setShowModal }) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
      <>
        <Modal
          size="lg"
          className="headModal"
          show={showModal}
          centered
          // onHide={handleClose}
        >
          <Modal.Header
            style={{
              
            }}
          >
            <div className=" -mb-4 flex justify-between ">
              <Modal.Title
                style={{
                  fontSize: "14.5px",
                  color: "white",
                  padding: "10px",
                }}
              >
                <p>Cheque Aproval &nbsp;( Count: 8 )</p>
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

          <Modal.Body style={{ marginLeft: "330px", marginRight: "60px", marginTop: "130px", zoom: "0.9" }}>
            <PreviewPendingApprovalsDataTable />
          </Modal.Body>
        </Modal>
      </>
    );
  };


  return (
    <div style={{ zoom: "0.78", marginTop: "-7px", marginBottom: "-15px" }}>
      <PreviewPendingApprovalsModal
        name="Preview Pending Approvals"
        showModal={showPreviewPendingApprovals}
        setShowModal={setPreviewPendingApprovals}
      />

      {/* <ThemeProvider theme={getMuiTheme()}> */}
      {/* <MUIDataTable
          title={
            <b
              style={{
                fontSize: "20px",
                fontFamily: "calibri",
                textTransform: "uppercase",
              }}
            >
              Summary Approvals
            </b>
          }
          data={data}
          columns={columns}
          options={options}
        /> */}

      <div>
        <table className="min-w-full table-stripped divide-y divide-gray-200">
          <thead className="bg-sky-700 col-12" style={{ zoom: "0.95" }}>
            <tr className="text-center">
              <th
                scope="col"
                className="px-6 py-2 text-left text-s text-white font-bold uppercase tracking-wider"
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-left text-s text-white font-bold uppercase tracking-wider"
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                Pending Approval Summary
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-left text-s text-white font-bold uppercase tracking-wider"
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                Count
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-left text-s text-white font-bold uppercase tracking-wider"
                style={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="" style={{ background: "#e0f2fe", zoom: "1.2" }}>
            {Array.isArray(currentPageData) && currentPageData.length > 0 ? (
              currentPageData.map((row, rowIndex) => (
                <tr
                  style={{ textAlign: "center", lineHeight: "2.5" }}
                  key={rowIndex}
                  onClick={() => console.log("hmm")}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex === 0 ||
                        cellIndex === 4 ||
                        cellIndex === 5 ||
                        cellIndex === 6
                          ? "text-center"
                          : ""
                      }
                    >
                      {cellIndex === 5
                        ? new Date(cell).toLocaleDateString()
                        : cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {Array.isArray(data) && data.length > pageSize && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="custom-pagination-button"
              style={{ marginRight: "20px", fontSize: "20px" }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / pageSize)}
              className="custom-pagination-button"
              style={{ fontSize: "20px" }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* </ThemeProvider> */}
    </div>
  );
}

export default SummaryApproval;
