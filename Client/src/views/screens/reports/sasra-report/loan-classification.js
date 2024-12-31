import { useEffect, useState } from "react";
import DataTable from "../../../../components/others/Datatable/DataTable";
import InputField from "../../../../components/others/Fields/InputField";
import Modal from "./components/Modal";
import { MDBIcon } from "mdb-react-ui-kit";
import { end, start } from "@popperjs/core";
import swal from "sweetalert";
import { API_SERVER } from "../../../../config/constant";
// import SelectField from "../../teller-ops/teller/components/SelectField";
import axios from "axios";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
export default function Loan() {
  const [data, setData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [classification, setClassification] = useState("");
  const [allClassification, setAllClassification] = useState([]);
  const [requestProvisionFrom, setRequestProvisionFrom] = useState("");
  const [requestProvisionTo, setRequestProvisionTo] = useState("");
  const [sDate, setSDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [column, setColumn] = useState("");
  const [order, setOrder] = useState("");
  const [range, setRange] = useState(false);
  const [title, setTitle] = useState("");
  const [showDataTable, setShowDataTable] = useState(false);
  const getTheme = JSON.parse(localStorage.getItem("theme"));
  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const [dataProcessingInfo, setDataProcessingInfo] = useState(
    "Processing data, please wait..."
  );

  useEffect(() => {
    async function fetcher() {
      // setshowModal(true);
      // setShowDataTable(true);
      const arr = [];
      const response = await axios.post(
        API_SERVER + "/api/loan-classification",
        { headers }
      );
      console.log(response);
      response.data.map((i) => {
        arr.push(Object.values(i));
      });

      setData(arr);

      const arr2 = [];
      response.data.map((i) => {
        if (!arr2.includes(i.classification)) {
          arr2.push(i.classification);
        }
      });
      setAllClassification(arr2);
    }
    fetcher();
    const arr1 = [];
    for (let i = 0; i < 100; i++) {
      arr1.push(<option value={`${i}%`}>{i}%</option>);
    }
    setRange(arr1);
  }, []);

  function handleRefresh() {
    setClassification("");
    setRequestProvisionFrom("");
    setRequestProvisionTo("");
    setStartDate("");
    setEndDate("");
    setColumn("");
    setOrder("");
    setShowDataTable(false);
  }

  function generateTitle() {
    setTitle("Showing report for");
    if (classification) {
      setTitle((prev) => prev + " classification : " + classification + " | ");
    }
    if (requestProvisionFrom) {
      setTitle(
        (prev) => prev + " Request Provision From : " + requestProvisionFrom
      );
      if (!requestProvisionTo) {
        setTitle((prev) => prev + "  to :" + " 100%" + " | ");
      } else {
        setTitle((prev) => prev + "  to : " + requestProvisionTo + " | ");
      }
    }
    if (startDate) {
      setTitle((prev) => prev + " Starting From : " + startDate);
      if (!endDate) {
        setTitle(
          (prev) =>
            prev +
            "  to : " +
            new Date(Date.now()).getDate() +
            "-" +
            new Date(Date.now())
              .toLocaleString("default", { month: "short" })
              .toUpperCase() +
            "-" +
            new Date(Date.now()).getFullYear() +
            " | "
        );
      } else {
        setTitle((prev) => prev + "  to : " + endDate + " | ");
      }
    }

    if (column) {
      setTitle(
        (prev) => prev + " Ordered by : " + column + " in " + order + " | "
      );
    }

    if (
      classification === "" &&
      column === "" &&
      requestProvisionFrom === "" &&
      requestProvisionTo === "" &&
      startDate === "" &&
      endDate === ""
    ) {
      setTitle("LOAN CLASSIFICATION (SASRA FORM 2D)");
    }
  }

  // function validate() {}
  async function handleFetch() {
    // validate();
    if (column && order === "") {
      swal({
        title: "Kindly select the order for filtering",
        text: "Kindly select the order for filtering",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // setShowModal(false);
        }
      });
      return;
    }
    if (
      parseFloat(requestProvisionFrom.replace("%", "")) >
      parseFloat(requestProvisionTo.replace("%", ""))
    ) {
      swal({
        title: "Start range  cannot be greater than end range",
        text: "Start range  cannot be greater than end range",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // setShowModal(false);
        }
      });
      return;
    }
    if (
      new Date(endDate).getTime() > Date.now() ||
      new Date(startDate).getTime() > Date.now()
    ) {
      swal({
        title: "Start date or End date cannot be later than today",
        text: "Start date or End date cannot be later than today",
        icon: "warning",
        buttons: "OK",
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // setShowModal(false);
        }
      });
      return;
    }
    generateTitle();
    setshowModal(true);
    setShowDataTable(true);
    setData([]);
    const arr = [];
    const response = await axios.post(
      API_SERVER + "/api/loan-classification",
      {
        classification,
        column,
        requestProvisionFrom,
        requestProvisionTo,
        startDate,
        endDate,
        order,
      },
      { headers }
    );
    console.log(response);
    response.data.map((i) => {
      arr.push(Object.values(i));
    });

    if (arr.length < 1) {
      setDataProcessingInfo(
        "Sorry no records where found for your search criteria..."
      );
      setData(arr);
    } else {
      setData(arr);
    }
  }

  console.log(data, "jjjj");
  return (
    <>
      <div className=" py-3">
        {/* <div className="space-y-2">
          <div className="flex space-x-2">
            <InputField label={"haa"} />
            <InputField label={"haa"} />
            <InputField label={"haa"} />
          </div>
          <div className="flex space-x-2">
            <InputField label={"haa"} />
            <InputField label={"haa"} />
            <InputField label={"haa"} />
          </div>
        </div> */}
        <div
          style={{ marginTop: "-30px", textAlign: "center", zoom: "0.85" }}
          className=""
        >
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="check"
              />
              <br />
              Ok
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              onClick={handleRefresh}
              className="btn btn-light text-white"
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="sync"
              />
              <br />
              Refresh
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="spinner"
              />
              <br />
              Fetch
            </button>
          </span>

          {/* <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-primary"
              onClick={handleFetch}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="align-center"
              />
              <br />
              Generate Report
            </button>
          </span> */}

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              onClick={handleFetch}
              className="btn btn-light text-white"
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="arrow-down"
              />
              <br />
              Generate
            </button>
          </span>
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="file-alt"
              />
              <br />
              New
            </button>
          </span>

          {/* <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="thumbs-down"
              />
              <br />
              Reject
            </button>
          </span> */}

          {/* <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("closeModalBTN").click()}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="sign-out-alt"
              />
              <br />
              Exit
            </button>
          </span> */}
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-light text-white"
              onClick={() => document.getElementById("closeModalBTN").click()}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="sign-out-alt"
              />
              <br />
              Exit
            </button>
          </span>
        </div>

        <hr style={{ marginTop: "0px" }} />
        {/* <div
          className="py-1 px-3 rounded-sm mb-2"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/background/` +
              customTheme.theme.backgroundImage +
              `)`,
          }}
        >
          LOAN CLASSIFICATION ( SASRA FORM 2D )
        </div> */}
        <div
          className="w-full shadow rounded -mb-9 -mt-1  py-2 bg-white px-3"
          style={{ zoom: "0.9" }}
        >
          <p style={{ marginTop: "12px" }}>
            Set Filters for Loan Classification ( SASRA Form 2D )
          </p>
          <hr />
          <div className="space-y-4">
            <div className="flex w-[100%] ">
              <label className="w-[20%] whitespace-nowrap capitalize text-sm  text-gray-500">
                Classification
              </label>
              <select
                id="Classification"
                value={classification}
                onChange={(e) => {
                  setClassification(e.target.value);
                }}
                className=" w-[55%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
              >
                <option
                  selected
                  value=""
                >{`[ SELECT LOAN CLASSIFICATION ]`}</option>
                {allClassification.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex">
              <div className="w-[20%] whitespace-nowrap capitalize text-sm  text-gray-500">
                Request Provision
              </div>
              <div className="w-[55%]">
                <div className="flex space-x-2 whitespace-nowrap capitalize text-sm  text-gray-500">
                  <div className="flex flex-col w-1/2 space-y-1">
                    <label>From</label>
                    <select
                      value={requestProvisionFrom}
                      id="Classification"
                      onChange={(e) => {
                        setRequestProvisionFrom(e.target.value);
                      }}
                      className=" w-full border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    >
                      <option
                        selected
                        value=""
                      >{`[ SELECT START RANGE ]`}</option>
                      {range}
                    </select>
                  </div>
                  <div className="flex flex-col w-1/2 space-y-1 ">
                    <label>To</label>
                    <select
                      disabled={!requestProvisionFrom && true}
                      value={requestProvisionTo}
                      id="Classification"
                      onChange={(e) => {
                        setRequestProvisionTo(e.target.value);
                      }}
                      className={` w-full border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5 ${
                        !requestProvisionFrom
                          ? "cursor-not-allowed border-gray-300  text-gray-300"
                          : ""
                      }`}
                    >
                      <option
                        selected
                        value=""
                      >{`[ SELECT END RANGE ]`}</option>
                      {range}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-[20%] whitespace-nowrap capitalize text-sm  text-gray-500">
                Report From
              </div>
              <div className="w-[55%]">
                <div className="flex space-x-2 whitespace-nowrap capitalize text-sm  text-gray-500">
                  <div className="flex flex-col w-1/2 space-y-1">
                    <label>Start Date</label>
                    <input
                      value={sDate}
                      onChange={(e) => {
                        setSDate(e.target.value);
                        setStartDate(
                          new Date(e.target.value).getDate() +
                            "-" +
                            new Date(e.target.value)
                              .toLocaleString("default", { month: "short" })
                              .toUpperCase() +
                            "-" +
                            new Date(e.target.value).getFullYear()
                        );
                      }}
                      type="date"
                      className="px-2 py-0.5 w-full border rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col w-1/2 space-y-1">
                    <label>End Date</label>
                    <input
                      disabled={!sDate && true}
                      value={eDate}
                      onChange={(e) => {
                        setEDate(e.target.value);
                        setEndDate(
                          new Date(e.target.value).getDate() +
                            "-" +
                            new Date(e.target.value)
                              .toLocaleString("default", { month: "short" })
                              .toUpperCase() +
                            "-" +
                            new Date(e.target.value).getFullYear()
                        );
                      }}
                      type="date"
                      className={`px-2 py-0.5 w-full border rounded-sm ${
                        !sDate
                          ? "cursor-not-allowed border-gray-300  text-gray-300"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-[20%] whitespace-nowrap capitalize text-sm  text-gray-500">
                Order Report By
              </div>
              <div className="w-[55%]">
                <div className="flex space-x-2 whitespace-nowrap capitalize text-sm  text-gray-500">
                  <div className="flex flex-col w-1/2 space-y-1">
                    <label>Column</label>
                    <select
                      value={column}
                      id="Classification"
                      onChange={(e) => {
                        setColumn(e.target.value);
                      }}
                      className=" w-full border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    >
                      <option selected value="">{`[ SELECT COLUMN ]`}</option>
                      <option value={"classification"}>Classification</option>
                      <option value={"balance"}>Balance</option>
                      <option value={"req_provision"}>Request Provision</option>
                      <option value={"cur_prov_amt"}>
                        Currency Provision Amount
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col w-1/2 space-y-1 ">
                    <label>Order</label>
                    <select
                      disabled={!column && true}
                      value={order}
                      required
                      id="Classification"
                      onChange={(e) => {
                        setOrder(e.target.value);
                      }}
                      className={` w-full border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5 ${
                        !column
                          ? "cursor-not-allowed border-gray-300  text-gray-300"
                          : ""
                      }`}
                    >
                      <option selected value="">{`[ SELECT ORDER ]`}</option>
                      <option>ASC</option>
                      <option>DESC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-end">
              <button
                onClick={}
                className="uppercase bg-blue-600 text-white px-3 py-2 text-xs rounded-sm"
              >
                Retrieve Report
              </button>
            </div> */}
          </div>
        </div>

        {/* {showDataTable && (
          <div className=" mt-12 -mb-9">
            <DataTable
              title={<span className="text-sm">{title}</span>}
              data={data}
              dataProcessingInfo={"Processing data please wait ..."}
              rowsPerPage={5}
              columns={[
                "CLASSIFICATION",
                "BALANCE",
                "REQUEST PROVISION",
                "CURRENCY PROVISION AMOUNT",
              ]}
            />
          </div>
        )} */}
        <Modal
          setShowModal={setshowModal}
          dataProcessingInfo={dataProcessingInfo}
          showModal={showModal}
          body={data}
          title={title}
        />
      </div>
    </>
  );
}
