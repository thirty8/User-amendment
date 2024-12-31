import React, { useState } from "react";
import { Modal } from "@mantine/core";
import Header from "../../../../../components/others/Header/Header";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ViewErrorDetails from "./view-error-detaills-modal";

function ErrorModal({ showModal, handleClose, data, acct_link }) {
  const [modalState, setModalState] = useState(false);
  const [errorState, setErrorState] = useState("");

  return (
    <div>
      <Modal
        opened={showModal}
        onClose={handleClose}
        title="Account Information"
        size="50%"
      >
        <div className="w-full">
          <div className="w-full flex space-x-4">
            <div className="w-full mb-[100px]">
              {/* <span>
                <Header
                  headerShade={true}
                  title={"Error(s)"}
                  onClose={true}
                  handleClose={handleClose}
                />
              </span> */}
              <table className="w-full">
                <tr
                  className="bg-white text-center px-2 py-1  cursor-pointer bg-[#0580c0] text-white"
                  style={{ whiteSpace: "nowrap", background: "#0580c0" }}
                >
                  {/* <th className="border border-gray-100 uppercase w-[20%]">
                    Number
                  </th> */}
                  <th className="border border-gray-100 uppercase w-[80%] text-sm">
                    {/* activities to be done on account */}
                    Tasks to Be Accomplished on the Account
                  </th>
                </tr>
                <tbody className="">
                  {/* [#f9f9f9] */}

                  {data?.length > 0 &&
                    data?.map((i, key) => (
                      <tr
                        key={key}
                        className={`text-left border border-gray-100  h-8 border-spacing-2 border border-gray-100 hover:bg-[#d7f6ff]  cursor-pointer border border-gray-200 even:bg-gray-100 odd:bg-white`}
                        style={{ whiteSpace: "wrap" }}
                      >
                        {/* <td className="capitalize text-center border border-gray-300 ps-2">
                          {key + 1}
                        </td> */}
                        {Object.keys(i)?.map((a) => (
                          <tr className="flex justify-between items-center">
                            <td className="capitalize text-red-500  font-semibold text-sm  ps-2">
                              {i[a]}
                            </td>

                            <td className="capitalize text-red-500 font-semibold text-sm pe-4">
                              <ButtonComponent
                                buttonIcon={CustomButtons["viewDetails"]?.icon}
                                buttonBackgroundColor={
                                  CustomButtons["viewDetails"]?.bgColor
                                }
                                onClick={() => {
                                  const code = i[a]
                                    ?.split(":")[0]
                                    ?.split("-")[1]
                                    ?.trim();
                                  setModalState(true);
                                  setErrorState(code);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tr>
                    ))}

                  {/* open view details modal  */}
                  {modalState && (
                    <ViewErrorDetails
                      showModal={modalState}
                      acct_link={acct_link}
                      handleClose={() => setModalState(false)}
                      code={errorState}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ErrorModal;
