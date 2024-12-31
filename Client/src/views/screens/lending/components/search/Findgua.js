// import { Modal } from "@mantine/core";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

// import DataTable from "../../../../components/others/Datatable/DataTable";
// import { API_SERVER } from "./../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import swal from "sweetalert";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { headers } from "../../../teller-ops/teller/teller-activities";
import { API_SERVER } from "./../../../../../config/constant";

const Findgua = ({
  showModal,
  setShowModal,
  body,
  handleSelected,
  facilityType,
  customerType,
  determinant,
}) => {
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setFilter([]);
    setAccountDescription("");
  };

  const handleShow = () => setShowModal(true);

  const [modalSize, setModalSize] = useState("lg");
  const [selected, setSelected] = useState("");
  const [accountDescription, setAccountDescription] = useState("");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  useEffect(() => {
    if (showModal === false) {
      setFilter([]);
    }
  }, [showModal]);

  async function handleFind(e) {
    setLoading(true);
    try {
      const response = await axios.post(
        API_SERVER + "/api/get-loan-guarantors",
        {
          accountName: accountDescription,
        },
        { headers }
      );

      if (response.data.length > 0) {
        setLoading(false);

        setFilter(response.data);
      } else {
        swal({
          title: "Oops !!!",
          text: `No record match for account name '${accountDescription}' `,
          icon: "warning",
          buttons: "Ok",
          dangerMode: true,
        }).then((result) => {
          setFilter([]);
          setLoading(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log({ filter });

  return (
    <Modal
      className=" shadow-xl"
      width={750}
      padding={0}
      open={showModal}
      closeIcon={false}
      onCancel={handleClose}
      footer={null}
      centered
      closable={false}
    >
      <div className=" text-gray-700  " style={{}}>
        <div>
          <div
            style={{
              backgroundColor: "#0580c0",
            }}
            className=" w-full  shadow"
          >
            <div className=" flex justify-between py-[6px] px-2 items-center ">
              <div className="text-white font-semibold">
                SEARCH ACCOUNT BY NAME
              </div>

              <svg
                onClick={() => handleClose()}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                // style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          {/* <hr style={{ marginTop: "-10%" }} /> */}
        </div>
        <div className="bg-gray-200 rounded-b ">
          <div className="bg-white shadow rounded px-2 pt-1 pb-8   ">
            <div className="rounded p-2 space-y-2 border-2 mb-3 ">
              <div className="border-l-4 border-yellow-500 rounded leading-6  px-3 py-2 bg-yellow-50">
                <span className="font-semibold flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <div>Warning</div>
                </span>{" "}
                Clicking the "Find" button to see all values may take a very
                long time <br />
                Entering criteria that can be used to reduce the list may be
                significantly faster
              </div>
            </div>
            <div className="">
              <div className="mb-3 flex items-center space-x-2">
                <InputField
                  label={"Find"}
                  labelWidth={"10%"}
                  inputWidth={"70%"}
                  value={accountDescription}
                  onChange={(e) => {
                    setAccountDescription(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    e.key === "Enter" && handleFind();
                  }}
                />
                <ButtonComponent
                  label={"Find"}
                  onClick={handleFind}
                  buttonWidth={"15%"}
                  buttonHeight={"30px"}
                />
              </div>
              <div style={{ maxHeight: "400px", overflow: "auto" }} className>
                {/* <DataTable
                data={filter}
                rowsPerPage={10}
                columns={[
                  "Account Name",
                  "Account Number",
                  "ISO code",
                  "Customer Number",
                  "Status Indicator",
                ]}
              /> */}

                <table className="w-full text-[90%]  bg-white rounded-sm   even:bg-gray-100  border-spacing-2 border border-gray-400">
                  <thead>
                    <tr
                      className="py-1 uppercase font-semibold text-gray-100  "
                      // style={{
                      //   background:
                      //     `url(` +
                      //     window.location.origin +
                      //     `/assets/images/background/` +
                      //     getTheme.theme.backgroundImage +
                      //     `)`,
                      // }}
                      style={{
                        backgroundColor: "#3b82f6",
                      }}
                    >
                      <th className=" px-2 py-2 border border-gray-400">
                        Account Name
                      </th>
                      {/* <th className=" px-2 py-2 border border-gray-400">
                        Account Number
                      </th>
                      <th className=" px-2 py-2 border w-32 border-gray-400">
                        ISO Code
                      </th> */}
                      <th className=" px-2 py-2 border border-gray-400">
                        Member Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {!loading &&
                      filter.map((i, key) => {
                        return (
                          <tr
                            onDoubleClick={() => {
                              handleSelected(i);
                              setSelected("");
                            }}
                            onClick={() => {
                              setSelected(i?.customer_number);
                            }}
                            key={key}
                            className={`${
                              selected === i.customer_number
                                ? "bg-blue-400 text-white"
                                : "bg-[#f9f9f9] hover:bg-zinc-200"
                            } h-8 border-spacing-2   cursor-pointer border border-gray-400`}
                          >
                            <td
                              // style={{
                              //   background: getTheme.theme.navBarColor,
                              // }}
                              className="   capitalize px-2 py-1"
                            >
                              {i.gua_name}
                            </td>
                            {/* <td className="    px-2 py-1">
                              {i.acct_link === "null" ? "0.00" : i.acct_link}
                            </td>
                            <td className="    px-2 py-1">
                              {i.currency === "null" ? "0.00" : i.currency}
                            </td> */}
                            <td className="    px-2 py-1">
                              {i.customer_number === "null"
                                ? "0.00"
                                : i.customer_number}
                            </td>
                          </tr>
                        );
                      })}

                    {loading && (
                      <tr className="">
                        <td className="px-2 pt-2">
                          <Skeleton active />
                        </td>
                        {/* <td className="px-2">
                          <Skeleton active />
                        </td>
                        <td className="px-2">
                          <Skeleton active />
                        </td> */}
                        <td className="px-2">
                          <Skeleton active />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Findgua;
