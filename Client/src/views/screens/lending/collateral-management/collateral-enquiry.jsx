import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import CustomTable from "../../teller-ops/teller/components/CustomTable";

export default function CollateralEnquiry() {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div className="bg-gray-200 rounded py-[12px] scale-[0.85] -mx-20 -mt-8 ">
      <div className="w-full flex justify-center scale-[0.98] cursor-pointer">
        <div className="flex" style={{ zoom: "0.80" }} centered>
          <div
            // onClick={handleClearance}
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`,
            }}
            className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded"
          >
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "white", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="file-alt"
              />

              <p className="text-white text-lg mt-[-3px] font-semibold">New</p>
            </div>
          </div>
          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="sync"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                Refresh
              </p>
            </div>
          </div>
          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="calendar-times"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                Delete
              </p>
            </div>
          </div>

          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[95px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center ">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="thumbs-up"
              />

              <p className="text-gray-700 px-2 text-lg mt-[-3px] font-semibold">
                Authorise
              </p>
            </div>
          </div>

          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="eye"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                View
              </p>
            </div>
          </div>

          <div
            // onClick={() => handleSubmit(body)}
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`,
            }}
            className=" shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded"
          >
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "white", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="check"
              />

              <p className="text-white text-lg mt-[-3px] font-semibold">Ok</p>
            </div>
          </div>

          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="ban"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                Cancel
              </p>
            </div>
          </div>

          <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                fas
                icon="thumbs-down"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                Reject
              </p>
            </div>
          </div>

          <div className="bg-white shadow-sm mx-3 flex flex-col items-center w-[86px]  justify-center rounded">
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
                fas
                icon="question-circle"
              />

              <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                Help
              </p>
            </div>
          </div>
          <div
            onClick={() => document.getElementById("closeModalBTN").click()}
            className=" flex flex-col items-center w-[86px]  justify-center rounded"
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`,
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <MDBIcon
                style={{ color: "white", fontSize: 20, paddingTop: "15px" }}
                fas
                icon="sign-out-alt"
              />

              <p className="text-white text-lg mt-[-3px] font-semibold">Exit</p>
            </div>
          </div>
        </div>
      </div>
      {/* my body goes here  */}
      <hr className="my-[3px] mt-3" />
      <div className="rounded h-auto pb-2 pt-2 px-2 bg-white">
        <div className="wrapper w-full rounded space-x-6 border-2 py-2 px-3 mb-3 flex">
          {/* left side  */}
          <div className="w-[40%] rounded py-2 px-3 md:mr-2 md:mb-0">
            <div className="mb-2">
              <ListOfValue
                label={"Customer ID"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
              />
            </div>
            <div className="mb-2">
              <ListOfValue
                label={"Branch"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
              />
            </div>
            <div className="mb-2">
              <ListOfValue
                label={"Collateral Number"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
              />
            </div>
          </div>

          {/* right side  */}
          <div className="w-[60%] py-2 px-3 md:mr-2 md:mb-0">
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Coverage Amount B/W"}
                  labelWidth={"41%"}
                  inputWidth={"45%"}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"And"}
                  labelWidth={"10%"}
                  inputWidth={"40%"}
                />
              </div>
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Review Date Between"}
                  labelWidth={"41%"}
                  inputWidth={"45%"}
                  type={"date"}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"And"}
                  labelWidth={"10%"}
                  inputWidth={"40%"}
                  type={"date"}

                />
              </div>
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Expiry Date Between"}
                  labelWidth={"41%"}
                  inputWidth={"45%"}
                  type={"date"}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"And"}
                  labelWidth={"10%"}
                  inputWidth={"40%"}
                  type={"date"}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto pb-2 pt-2 px-2 bg-white">
        <CustomTable
          headers={[
            // "#",
            "Customer Number",
            "Collateral Number",
            "Collateral Description",
            "Market Value",
            "Coverage Value",
            "Realiz. Date",
            "Value Used",
            "Available Value",
            "Review Date",
          ]}
          // data={insertArray}
        />
      </div>
    </div>
  );
}
