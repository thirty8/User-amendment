import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import axios from "axios";
import CustomTable from "../../teller-ops/teller/components/CustomTable";
export default function CollateralCreationApproval() {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div className={`bg-gray-200 rounded py-[12px] scale-[0.85] -mx-20 -mt-8 `}>
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
      <div className="bg-white py-[10px] px-4">
        <div className="w-[65%] rounded">
          <div className="mb-2">
            <ListOfValue
              label={"Customer Number"}
              id={"Customer Number"}
              labelWidth={"22%"}
              inputWidth={"55%"}
              required={true}
              // onChange={(value) => {
              //   handleTransChange(value);
              //   setCollateralType(value);
              // }}
              // data={collateralArray}
              // value={body}
            />
          </div>
          <div className="">
            <InputField
              label={"Collateral Number"}
              labelWidth={"22%"}
              required={true}
              inputWidth={"55%"}
            />
          </div>
        </div>
      </div>
      <hr className="my-[3px]" />
      <div className="bg-white p-2">
        <CustomTable
          headers={[
            // "#",
            "Collateral Number",
            "Customer Number",
            "Customer Name",
            "Collateral Type",
            "Amount",
            "Amount Considered",
            "Review Date",
            "Expiry Date",
            "Posted By",
          ]}
          // data={insertArray}
        />
      </div>
    </div>
  );
}
