import React, { useState } from "react";
// import { Modal } from "@mantine/core";
// import { Modal } from "@mantine/core";
import { AiOutlineEye } from "react-icons/ai";
import Header from "../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ViewErrorDetails from "./view-error-details";
import ModalComponent from "../../../../../components/others/Modal/modal";
import { TiInfo } from "react-icons/ti";

function ErrorModal({ showModal, handleClose, data, acct_link, proceedFunction, cancelFunction }) {
  const [modalState, setModalState] = useState(false);
  const [errorState, setErrorState] = useState("");

  return (
    <div>
      <ModalComponent
        open={showModal}
        padding
        onClose={handleClose}
        className={modalState ? "hidden opacity-0" : "block"}
        // title={"Account Information"}
        width={"35%"}
        content={
          <div className="w-full">
            {/* justify-center capitalize*/}
            <div className=" flex  text-md text-blue-500 font-semibold mb-3 items-center">
              <span className="pe-1">
                <TiInfo size={25} color="red" />
              </span>{" "}
              {/* Task to be completed on this account */}
              Instruction(s) that exist on the account
              {/* Account Information */}
            </div>
            {data?.length > 0 &&
              data?.map((i, key) => (
                <div key={key} className={`flex  space-y-2`} style={{ whiteSpace: "no-wrap" }}>
                  {/* <td className="capitalize text-center border border-gray-300 ps-2">
                          {key + 1}
                        </td> */}

                  {Object.keys(i)?.map((a) => (
                    <div className="flex w-full justify-between text-left font-semibold">
                      <div className="flex items-center text-slate-700">
                        <span className="font-semibold">{key + 1}:</span>{" "}
                        <span className="ps-1">{i[a]}</span>
                      </div>

                      <div>
                        <ButtonComponent
                          buttonIcon={<AiOutlineEye size={20} className="text-slate-700" />}
                          // buttonIcon={CustomButtons["viewDetails"]?.icon}
                          buttonBackgroundColor={"white"}
                          // buttonBackgroundColor={CustomButtons["viewDetails"]?.bgColor}
                          onClick={() => {
                            const code = i[a]?.split(":")[0]?.split("-")[1]?.trim();
                            // handleClose();
                            setModalState(true);
                            setErrorState(code);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            <hr className="border-1 mt-3 mb-2" />

            <div className="w-full mt-2">
              {/* <div> */}
              {/* text-gray-800 */}
              <div className="text-red-500 font-semibold">
                {/* Do you still want to close this account? */}
                Closing this account will affect the current conditions. Please confirm if you still
                wish to proceed
              </div>
              <div className="w-full flex justify-end space-x-4 mt-2">
                {/* <div> */}
                <ButtonComponent
                  label={"Proceed"}
                  buttonWidth={"70px"}
                  buttonBackgroundColor={"#295ef2"}
                  buttonHeight={"35px"}
                  onClick={proceedFunction}
                />
                <ButtonComponent
                  label={"Cancel"}
                  buttonWidth={"70px"}
                  buttonBackgroundColor={"#ef0035"}
                  buttonHeight={"35px"}
                  onClick={cancelFunction}
                  // buttonBackgroundColor={"#9a9b9f"}
                />
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        }
      />

      {/* view details in modal  */}
      {modalState && (
        <ViewErrorDetails
          showModal={modalState}
          acct_link={acct_link}
          handleClose={() => setModalState(false)}
          code={errorState}
        />
      )}
    </div>
  );
}

export default ErrorModal;
