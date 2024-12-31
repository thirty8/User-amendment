import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import SubModal from "./SubModal";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import FormLayout from "./FormLayout";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
// import { Modal } from "react-bootstrap";
import CustomTable from "./components/DataTable";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",

  "Content-Type": "application/json",
};

const AddSubMenuModal = ({
  type,
  name,
  parentId,
  showModal,
  setShowModal,
  formData,
}) => {
  // const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const [columns, setColumns] = useState({});
  const [showSubModal, setShowSubModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [children, setChildren] = useState("");
  const [dataProcessingInfo, setDataProcessingInfo] = useState(
    "Processing data, please wait..."
  );

  function handleClose() {
    setResponse([]);
    setShowModal(false);
    setDataProcessingInfo("Processing data, please wait...");
  }

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [getTheme, setTheme] = useState(customTheme);

  const [header, setHeader] = useState();
  const [mm, setMm] = useState([]);
  useEffect(() => {
    if (type === "view") {
      setHeader(`Details of ${name}`);
    } else if (type === "edit") {
      setHeader(`Update Details of ${name}`);
    } else {
      setHeader(`${name} `);
    }
  }, [name]);
  let arr = [];

  console.log({ parentId });

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-sub-menus-by-parent-menu-id",
        {
          parent_menu_id: parentId,
        },
        { headers }
      )
      .then((res) => {
        setResponse(res.data);
        console.log({ res });

        if (parentId) {
          if (res.data.length === 0) {
            setDataProcessingInfo(
              "Sorry, there are no sub menus for the menu you selected"
            );
            setResponse([]);
          }
        }
      });

    const arr1 = [];
  }, [parentId, showSubModal, showModal]);

  // console.log(response, "res");

  // console.log(formData, "jjj");
  response.map((i, key) => {
    arr.push([
      key + 1,
      i.menu_name,
      // // i.menu_groupings,
      i.menu_permitted === "Y" ? "YES" : "NO",
      i.bank_permission === "Y" ? "YES" : "NO",
      <div className="flex space-x-3 justify-center">
        <button
          onClick={function (e) {
            e.preventDefault();
            setShowSubModal(true);
            setChildren({
              id: i.menu_id,
              name: i.menu_name,
              type: "edit",
              content: i,
            });
          }}
          className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button
          onClick={function (e) {
            e.preventDefault();
            setShowSubModal(true);
            setChildren({
              id: i.menu_id,
              name: i.menu_name,
              type: "view",
              content: i,
            });
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <button
          onClick={function (e) {
            e.preventDefault();
            setShowSubModal(true);
            setChildren({
              id: i.menu_id,
              name: i.menu_name,
              type: "previewSub",
              content: i,
            });
          }}
          className="hover:scale-110 transition transform ease-in-out bg-green-600  px-2 py-1 rounded-sm text-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
            />
          </svg>
        </button>
      </div>,
    ]);
  });
  return (
    <>
      <SubModal
        name={children?.name}
        showSubModal={showSubModal}
        setShowSubModal={setShowSubModal}
        children={children?.id}
        type={children?.type}
        formData={children?.content}
      />

      <Modal
        className={`${showSubModal ? "hidden" : ""}`}
        // size={type === "previewSub" ? "lg" : "md"}
        size={type === "previewSub" ? "80%" : "40%"}
        opened={showModal}
        // centered
        padding={0}
        withCloseButton={false}
        closeOnClickOutside={false}
        onClose

        // className="transform scale-90"
        // onHide={() => handleClose() }
      >
        <div>
          <div className="w-full  flex justify-between items-center bg-[#0580c0] ">
            <div
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "5px",
              }}
            >
              <p className="uppercase font-semibold">{header}</p>
            </div>
            <svg
              onClick={() => handleClose()}
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
        </div>
        <div style={{ background: "white", zoom: "0.85" }} className="px-5">
          {type === "previewSub" && (
            <div className="pt-4">
              {/* <hr /> */}
              <span
                className="my-2"
                style={{ fontSize: "15px", textTransform: "uppercase" }}
              >
                SUB MENUS OF <b>{name}</b>
              </span>

              <CustomTable
                data={arr}
                dataProcessingInfo={dataProcessingInfo}
                headers={[
                  "#",
                  "Menu Name",
                  // "Menu Groupings",
                  "Menu Permission",
                  "Bank Permitted",
                  "Action",
                ]}
              />
            </div>
          )}
          {type === "edit" && (
            <FormLayout
              handleClose={() => handleClose()}
              formData={formData}
              disabled={false}
            />
          )}
          {type === "view" && (
            <FormLayout
              handleClose={() => handleClose()}
              formData={formData}
              disabled={true}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddSubMenuModal;
