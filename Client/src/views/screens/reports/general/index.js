import React, { useEffect, useState } from "react";

import axios from "axios";

import { Viewer } from "@grapecity/activereports-react";
import { Loader, Modal } from "@mantine/core";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import ReportForm from "./ReportForm";
import { API_SERVER } from "../../../../config/constant";
import { headers } from "../../teller-ops/teller/teller-activities";
import ButtonComponent from "../../lending/components/button/ButtonComponent";

const exportsSettings = {
  pdf: {
    title: "ActiveReportsJS Sample",
    author: "GrapeCity",
    subject: "Web Reporting",
    keywords: "reporting, sample",
    userPassword: "pwd",
    ownerPassword: "ownerPwd",
    printing: "none",
    copying: false,
    modifying: false,
    annotating: false,
    contentAccessibility: false,
    documentAssembly: false,
    pdfVersion: "1.7",
    autoPrint: true,
    filename: "ActiveReportsJS-Sample.pdf",
  },
  html: {
    title: "ActiveReportsJS Sample",
    filename: "ActiveReportsJS-Sample.html",
    autoPrint: true,
    multiPage: true,
    embedImages: "external",
    outputType: "html",
  },
};

const availableExports = ["pdf", "html", "tabular-data"];

export default function FinanceReports() {
  const [module, setModule] = useState([]);
  const [subModule, setSubModule] = useState([]);
  const [selectedSubModule, setSelectedSubModule] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(18);
  // const [showWithdrawalReport, setShowWithdrawalReport] = useState();

  async function getModules() {
    const response = await axios.post(
      API_SERVER + "/api/reports/general",
      {
        username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        key: "get-modules",
      },
      { headers: headers }
    );

    const modules = response?.data?.modules?.map((i) => ({
      label: `${i?.VALUE} - ${i?.LABEL}`,
      value: i?.VALUE,
    }));
    setModule(modules);
  }

  async function getSubModule(moduleCode) {
    const response = await axios.post(
      API_SERVER + "/api/reports/general",
      {
        username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        moduleCode,
        key: "get-subModules",
      },
      { headers: headers }
    );

    const subModules = response?.data?.subModules?.map((i) => ({
      label: ` ${i?.VALUE} - ${i?.LABEL}`,
      value: i?.VALUE,
    }));
    setSubModule(subModules);
  }

  async function getReports(subModuleCode) {
    setReports([]);
    setLoading(true);
    setCurrentPage(18);
    const response = await axios.post(
      API_SERVER + "/api/reports/general",
      {
        username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        subModuleCode,
        key: "get-reports",
      },
      { headers: headers }
    );
    console.log({ response: response?.data });
    setLoading(false);
    setReports(response?.data?.reports);
  }

  useEffect(() => {
    getModules();
  }, []);
  return (
    <div>
      <div className="bg-white  flex justify-center relative">
        <div className="bg-gradient-to-r from-sky-300 via-[#e3f2f7] w-full h-24 mb-16 to-sky-300 relative">
          &nbsp;
        </div>
        <div className="space-y-4 bg-white shadow-lg absolute top-9 shadow-gray-200 mb-4 py-4 rounded-lg w-[45%]  my-2">
          <ListOfValue
            required={true}
            labelWidth={"35%"}
            inputWidth={"50%"}
            label={"Choose a report module"}
            data={module}
            onChange={(value) => {
              setReports([]);
              setSelectedSubModule("");
              getSubModule(value);
            }}
          />
          <ListOfValue
            required={true}
            labelWidth={"35%"}
            inputWidth={"50%"}
            value={selectedSubModule}
            label={"Choose a sub module"}
            data={subModule}
            onChange={(value) => {
              setSelectedSubModule(value);
              getReports(value);
            }}
          />
        </div>
      </div>
      <div className="w-full flex-grow  ">
        <Render
          reports={reports}
          loading={loading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

function Render({ reports, loading, currentPage, setCurrentPage }) {
  const [currentData, setCurrentData] = useState([]);

  const [list, setList] = useState([]);
  const [pages, setPages] = useState("");

  useEffect(() => {
    const reportPages = Math.ceil(reports?.length / 18);
    setPages({ total: reportPages });
    setCurrentData(reports?.slice(currentPage - 18, currentPage));
  }, [reports, currentPage]);

  function handleNext() {
    if (currentPage < pages?.total * 18) {
      setCurrentPage(currentPage + 19);
    }
  }

  function handlePrevious() {
    if (currentPage > pages?.total * 18) {
      setCurrentPage(currentPage - 19);
    }
  }
  return (
    <div className=" w-full">
      {/* <div className="animate-pulse ">No reports...</div> */}
      <div>
        <div className="relative mb-6 mt-3">
          <div className="border-b-4 w-full"></div>
          <div className="flex justify-center -top-[12px]  absolute w-full">
            <div className="text-center bg-white  px-6  text-xl text-gray-600   font-extrabold">
              LIST OF REPORTS
            </div>
          </div>
        </div>
        {reports?.length > 0 ? (
          <div className="flex space-x-3  py-3 rounded px-2  w-full overflow-y-auto">
            {/* {currentData?.length > 0 &&
            currentData?.map((i) => (
              <div className="flex justify-between space-x-2 space-y-2">
                <div className="w-[60%]">{i?.LABEL}</div>
                <button className="bg-green-500 rounded transition-all text-white px-2 py-1 ">
                  Open
                </button>
              </div>
            ))} */}
            <div className="w-[33%]">
              <Pane
                range={{ start: 0, end: 6 }}
                list={list}
                currentData={currentData}
                setList={setList}
              />
            </div>
            <div className="w-[33%]">
              <Pane
                range={{ start: 6, end: 12 }}
                list={list}
                currentData={currentData}
                setList={setList}
              />
            </div>
            <div className="w-[33%]">
              <Pane
                range={{ start: 12, end: 18 }}
                list={list}
                currentData={currentData}
                setList={setList}
              />
            </div>
          </div>
        ) : loading ? (
          <div className=" flex justify-center items-center h-[400px]">
            <span className="h-10 animate-bounce flex items-center font-semibold space-x-2">
              <Loader color="rgba(66, 66, 66, 1)" />
              <span>Loading...</span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-end">
          <div className="w-[23%] text-black flex items-center space-x-2 py-2 ">
            <div
              onClick={handlePrevious}
              className="font-semibold cursor-pointer rounded bg-black text-white px-2 py-[4px]"
            >
              Previous
            </div>
            <div className="flex items-center font-semibold space-x-2 text-sm">
              <span className="bg-yellow-300  text-black px-2 py-0.5 rounded-sm">
                {Math.floor(currentPage / 18)}
              </span>{" "}
              <span className="font-semibold">/</span>
              <span className="bg-yellow-100  text-black px-2 py-0.5 rounded-sm mr-2">
                {pages?.total}
              </span>
              <span> Pages</span>
            </div>
            <div
              onClick={handleNext}
              className="font-semibold cursor-pointer rounded bg-pink-700 text-white px-4 py-[4px]"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pane({ range, currentData }) {
  const [list, setList] = useState();
  const [openReport, setOpenReport] = useState(false);
  useEffect(() => {
    setList(currentData?.slice(range?.start, range?.end));
    // if (number === 1) {
    // } else if (number === 2) {
    //   setList(currentData?.slice(11, 21));
    // } else {
    //   setList(currentData?.slice(22, 31));
    // }
  }, [range]);
  console.log({
    currentData,
    list,
    range,
    d: currentData?.slice(range?.start, range?.end),
  });
  return (
    <div className="shadow-lg bg-white hover:shadow-xl transition-all rounded w-full h-full flex-grow px-2 py-1 border">
      <Modal
        title={
          <div className="font-semibold">
            {openReport?.content?.FORM_CODE} - {openReport?.content?.LABEL}
          </div>
        }
        fullScreen
        paddding={0}
        opened={openReport?.status}
        onClose={() => {
          setOpenReport({ status: false });
        }}
      >
        {/* <ReportForm
          paraList={openReport?.value}
          content={openReport?.content}
        /> */}
        <div>
          <div id="viewer-host">
            <Viewer
              report={{ Uri: allReports[openReport?.content?.FORM_CODE] }}
              // client/public/assets/reports/All_Accounts_Opened_Report.json
              exportsSettings={exportsSettings}
              availableExports={availableExports}
            />
            <div
              style={{
                width: "100",
                backgroundColor: "#e9e6e6",
                border: "none",
              }}
            >
              <ButtonComponent
                label={"Return to Report"}
                margin={"3px"}
                buttonBackgroundColor={"#205f78"}
                onClick={() => setOpenReport(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
      {list?.length > 0 &&
        list?.map((i) => (
          <div className="flex justify-between items-center py-1 px-2 border-b h-[70px] space-x-2 space-y-2">
            <div className="w-[60%]">{i?.LABEL}</div>
            <button
              onClick={() => {
                setOpenReport({
                  status: true,
                  value: i?.PARA_LIST,
                  content: i,
                });
              }}
              className="bg-[#3b90df] h-[35px] font-semibold rounded transition-all text-white px-5 py-1 "
            >
              Open
            </button>
          </div>
        ))}
    </div>
  );
}

export const allReports = {
  ABBK: "/assets/reports/All_Accounts_Opened_Report.json",
};
