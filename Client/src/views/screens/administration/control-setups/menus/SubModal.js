// import { Row, Col, Container, Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { API_SERVER } from "../../../../../config/constant";
import { Modal, Button, Group } from "@mantine/core";
// import Modal from "../Modal";
import axios from "axios";
import FormLayout from "./FormLayout";
import SubSubModal from "./SubSubModal";
import CustomTable from "./components/DataTable";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",

  "Content-Type": "application/json",
};

const AddSubMenuModal = ({
  type,
  name,
  children,
  showSubModal,
  setShowSubModal,
  formData,
}) => {
  // const handleClose = () => setShowSubModal(false);

  const handleShow = () => setShowSubModal(true);
  const [columns, setColumns] = useState();
  const [showSubSubModal, setShowSubSubModal] = useState();
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);
  const [grandChildren, setGrandChildren] = useState();
  // console.log(children, "children");
  const [dataProcessingInfo, setDataProcessingInfo] = useState(
    "Processing data, please wait..."
  );

  function handleClose() {
    setResponse([]);
    setShowSubModal(false);
    setDataProcessingInfo("Processing data, please wait...");
  }

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-sub-menus-by-parent-menu-id",
        {
          parent_menu_id: children,
        },
        { headers }
      )
      .then((res) => {
        console.log({ res });
        setResponse(res.data);

        if (children) {
          if (res.data.length === 0) {
            setDataProcessingInfo(
              "Sorry, there are no sub menus for the menu you selected"
            );
            setResponse([]);
          }
        }
      });
  }, [children, showSubSubModal]);

  const [header, setHeader] = useState();

  useEffect(() => {
    if (type === "view") {
      setHeader(`Details of ${name}`);
    } else if (type === "edit") {
      setHeader(`Update Details of ${name}`);
    } else {
      setHeader(`${name} `);
    }
  }, [name]);

  // console.log(response, "res");

  const arr = [];
  const arr1 = [];

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [getTheme, setTheme] = useState(customTheme);

 
  response?.map((i, key) => {
    arr.push([
      key + 1,
      i.menu_name,
      // i.menu_groupings,
      i.menu_permitted === "Y" ? "YES" : "NO",
      i.bank_permission === "Y" ? "YES" : "NO",
      <div className="flex space-x-3 justify-center">
        <button
          onClick={function (e) {
            e.preventDefault();
            setShowSubSubModal(true);
            setGrandChildren({
              type: "edit",
              content: i,
              name: i.menu_name,
              id: i.menu_id,
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
            setShowSubSubModal(true);
            setGrandChildren({
              type: "view",
              content: i,
              name: i.menu_name,
              id: i.menu_id,
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
            setShowSubSubModal(true);
            setGrandChildren({
              type: "previewSub",
              content: i,
              id: i.menu_id,
              name: i.menu_name,
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
      <SubSubModal
        name={grandChildren?.name}
        showSubSubModal={showSubSubModal}
        setShowSubSubModal={setShowSubSubModal}
        parentId={grandChildren?.id}
        type={grandChildren?.type}
        formData={grandChildren?.content}
      />

      <Modal
        className={`${showSubSubModal ? "hidden" : ""}`}
        // size={type === "previewSub" ? "lg" : "md"}
        style={{ zIndex: "9999999999999999999"}}
        // size={type=== "previewSub"? "80%":"40%"}
        size={type=== "previewSub"? "80%":"40%"}
                // size={type === "view" ? "lg" : "md"}

        opened={showSubModal}
        // centered
        padding={5}
        withCloseButton={false}
        closeOnClickOutside={false}
        onClose
        // onHide={() => handleClose()}
      >
        <div>
          <div className="w-full flex mt-2 justify-between items-center bg-[#0580c0] uppercase font-semibold ">
            <div
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "5px",
              }}
            >
              <p>{header}</p>
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
        <div
          style={{ background: "white", zoom: "0.85" }}
          className="px-5 pt-4"
        >
          <span style={{ fontSize: "15px", textTransform: "uppercase" }}>
            SUB MENUS OF <b>{name}</b>
            <hr />
          </span>
          {type === "previewSub" && (
            <CustomTable
              defaultMessage={dataProcessingInfo}
              data={arr}
              headers={[
                "#",
                "Menu Name",
                // "Menu Groupings",
                "Menu Permission",
                "Bank Permitted",
                "Action",
              ]}
            />
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
