import React, { useState, useEffect } from "react";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import {
  AiOutlineDoubleRight,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ProfitAndLoss({ refresh }) {
  const columns = [
    "Line Code",
    "Line Description",
    "Line Level",
    "Parent Line",
    "Branch",
    "Line Order",
  ];

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [bsparentdetails, setbsparentdetails] = useState([]);
  const [bsassetdetails, setbsassetdetails] = useState([]);
  const [bsLiabilitydetails, setbsLiabilitydetails] = useState([]);
  const [bsEquitydetails, setbsEquitydetails] = useState([]);

  useEffect(() => {
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];
    async function getBalanceSheetDetails() {
      let response = await axios.get(
        API_SERVER + "/api/get-balance-sheet-details",
        { headers }
      );
      // console.log(response.data, "responsebscodesetup");
      // setbsdetails(response.data)
      response.data.map((detail) => {
        if (detail.level_indicator === "H" && !(detail.bs_desc === ".")) {
          arr1.push(detail);
        } else if (detail.line_category === "A") {
          arr2.push(detail);
        } else if (detail.line_category === "L") {
          arr3.push(detail);
        } else if (detail.line_category === "E") {
          arr4.push(detail);
        } else if (detail.level_indicator === "T") {
          arr4.length > 0
            ? arr4.push(detail)
            : arr3.length > 0
            ? arr3.push(detail)
            : arr2.push(detail);
        }
      });
      setbsparentdetails(arr1);
      setbsassetdetails(arr2);
      setbsLiabilitydetails(arr3);
      setbsEquitydetails(arr4);
      // console.log(arr2, "bsparentdetails");
    }
    getBalanceSheetDetails();
  }, [refresh]);

  const handleToggle = (parent) => {
    setbsparentdetails((prevParentData) => {
      const updatedParentData = prevParentData.map((p) => {
        if (p.bs_desc === parent.bs_desc) {
          return { ...p, open: !p.open };
        } else {
          return p;
        }
      });

      return updatedParentData;
    });
  };

  const getChildrenData = (parent) => {
    if (parent.bs_desc === "ASSETS:") {
      return bsassetdetails;
    } else if (parent.bs_desc === "LIABILITIES:") {
      return bsLiabilitydetails;
    } else if (parent.bs_desc === "EQUITY:") {
      return bsEquitydetails;
    }
    return [];
  };

  return (
    <div>
      <div>
        <div style={{ padding: "5px" }}>
          <div
            style={{
              height: "25px",
              display: "flex",
              background: "#0580c0",
              color: "white",
              textAlign: "center",
            }}
          >
            <span style={{ flex: 0.4 }}>Line Description</span>
            <span style={{ flex: 0.1 }}>Line Code</span>
            <span style={{ flex: 0.1 }}>Line Level</span>
            <span style={{ flex: 0.25 }}>Parent Line</span>
            <span style={{ flex: 0.05 }}>Branch</span>
            <span style={{ flex: 0.1 }}>Line Order</span>
          </div>
          <div>
            <div
              className="h-[500px] overflow-y-auto mb-3"
              style={{ borderBottom: "solid 1px lightgray" }}
            >
              {bsparentdetails.map((parent) => (
                <div
                  className=""
                  style={{ cursor: "pointer" }}
                  key={parent.bs_desc}
                >
                  <div
                    className="bg-slate-200 py-1 flex items-center gap-1"
                    style={{
                      borderTop: "1px solid lightgray",
                      borderBottom: "1px solid lightgray",
                    }}
                    onClick={() => handleToggle(parent)}
                  >
                    <span className="ml-2">
                      {parent.open ? (
                        <div className="flex gap-1">
                          {" "}
                          <HiMinusSm className="text-gray-600" />
                          <FcOpenedFolder size={15} />
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <AiOutlinePlus className="text-gray-600" />
                          <FcFolder size={15} />
                        </div>
                      )}
                    </span>
                    <span>{parent.bs_desc}</span>
                  </div>
                  {parent.open && (
                    <div>
                      {getChildrenData(parent).map((child) => (
                        <div
                          style={{
                            borderTop: "1px solid lightgray",
                            borderBottom: "1px solid lightgray",
                          }}
                          className={
                            child.level_indicator === "T"
                              ? "flex text-gray-600 bg-slate-100  hover:bg-[#daecfe] hover:text-black cursor-pointer py-1"
                              : "flex text-gray-500 bg-white hover:bg-[#daecfe] hover:text-black cursor-pointer py-1"
                          }
                          key={child.bs_desc}
                        >
                          <span className="ml-5 " style={{ flex: 0.4 }}>
                            {child.bs_desc}
                          </span>
                          <span className="text-center" style={{ flex: 0.1 }}>
                            {child.bs_code}
                          </span>
                          <span className="text-center" style={{ flex: 0.1 }}>
                            {child.level_indicator === "H"
                              ? "Head Level"
                              : child.level_indicator === "T"
                              ? "Total Level"
                              : "Detail Level"}
                          </span>
                          <span style={{ flex: 0.25 }}>
                            {child.clear_to_code}
                          </span>
                          <span className="text-left" style={{ flex: 0.1 }}>
                            {child.branch}
                          </span>
                          <span className="text-center" style={{ flex: 0.05 }}>
                            {child.ordering}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitAndLoss;
