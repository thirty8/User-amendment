import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import FormLayout from "./FormLayout";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import { Modal, Group } from "@mantine/core";
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
  showSubSubModal,
  setShowSubSubModal,
  formData,
}) => {
  // const handleClose = () => setShowSubSubModal(false);
  const handleShow = () => setShowSubSubModal(true);
  const [columns, setColumns] = useState({});
  const [showSubModal, setShowSubModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [children, setChildren] = useState("");
  const [showSubSubSubModal, setshowSubSubSubModal] = useState(false);
  const [type2, setType2] = useState("");
  const [name2, setName2] = useState("");
  const [greatGrandChildren, setGreatGrandChildren] = useState("");

  function handleClose() {
    setResponse([]);
    setShowSubSubModal(false);
  }

  function handleClose2() {
    // setResponse([]);
    setshowSubSubSubModal(false);
  }
  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [getTheme, setTheme] = useState(customTheme);
  const [dataProcessingInfo, setDataProcessingInfo] = useState(
    "Processing data, please wait..."
  );

  function capitalizeFirstCharacter(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

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
        console.log(res, parentId, "john");
        setResponse(res.data);

        if (res.data.length === 0) {
          setResponse([]);
        }
      });
  }, [parentId, showSubSubModal, showSubSubSubModal]);

  const [header, setHeader] = useState();

  useEffect(() => {
    if (type === "view") {
      setHeader(`Details of ${name2}`);
    } else if (type === "edit") {
      setHeader(`Update Details of ${name2}`);
    } else {
      setHeader(`${name2} `);
    }
  }, [name2]);

  // console.log(response, "res");

  let arr = [];
  const arr1 = [];

  // useEffect(() => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/get-sub-menus-by-parent-menu-id",
  //       {
  //         parent_menu_id: children,
  //       },
  //       { headers }
  //     )
  //     .then((res) => {
  //       setResponse(res.data);

  //       if (children) {
  //         if (res.data.length === 0) {
  //           setDataProcessingInfo(
  //             "Sorry, there are no sub menus for the menu you selected"
  //           );
  //           setResponse([]);
  //         }
  //       }
  //     });
  // }, [children]);
  // console.log(formData, "jjj");

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
            setshowSubSubSubModal(true);
            setType2("edit");

            // setName2 (i.menu_name)

            setGreatGrandChildren({
              type: "edit",
              content: i,
              name: i.menu_name,
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
            setshowSubSubSubModal(true);
            setType2("view");
            // setGrandChildren({
            //   type: "view",
            //   content: i,
            //   name: i.menu_name,
            // });
            setGreatGrandChildren({
              type: "view",
              content: i,
              name: i.menu_name,
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
      </div>,
    ]);
  });
  return (
    <>
      <Modal
        size={type === "previewSub" ? "40%" : "sm"}
        opened={showSubSubSubModal}
        padding={0}
        withCloseButton={false}
        // centered
        // className='transform scale-90'
        style={{ zIndex: "999999999999999999999999" }}
        // onHide={() => handleClose()}
      >
        <div>
          <div className="w-full flex justify-between items-center bg-[#0580c0] uppercase font-semibold ">
            <div
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "10px",
              }}
            >
              <p>{header}</p>
            </div>
            <svg
              onClick={() => setshowSubSubSubModal(false)}
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
          style={{ background: "white", zoom: "0.85", paddingTop: "50px" }}
          className="px-5"
        >
          {/* {type === "previewSub" && (
            <div className="pt-4">
              <span
                className="my-2"
                style={{ fontSize: "15px", textTransform: "uppercase" }}
              >
                MENU ICONS OFf <b>{name}</b>
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
          )} */}
          {type2 === "edit" && (
            <FormLayout
              handleClose={() => handleClose2()}
              formData={greatGrandChildren?.content}
              disabled={false}
            />
          )}
          {type2 === "view" && (
            <FormLayout
              handleClose={() => handleClose2()}
              formData={greatGrandChildren?.content}
              disabled={true}
            />
          )}

          {/* <div className="float-right mt-0 -mb-1 w-[100%]">
          <hr />
          <div className="float-right -mt-1 mb-1">
          <button
              type="button"
              onClick={()=> handleClose() }
              className="bg-red-500 text-white text-sm font-medium rounded-sm px-3 py-2"
          >
            Close
          </button>
          </div>
        </div> */}
        </div>
      </Modal>

      <Modal
        className={`${showSubSubSubModal ? "hidden" : ""}`}
        size={type === "previewSub" ? "80%" : "40%"}
        // size={ "80%"}

        opened={showSubSubModal}
        padding={0}
        withCloseButton={false}
        // centered
        // className='transform scale-90'
        style={{ zIndex: "999999999999999999999999" }}
        // onHide={() => handleClose()}
      >
        <div>
          <div className="w-full flex justify-between items-center bg-[#0580c0] uppercase font-semibold ">
            <div
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "10px",
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
        <div style={{ background: "white", zoom: "0.85" }} className="px-5">
          {type === "previewSub" && (
            <div className="pt-4">
              <span
                className="my-2"
                style={{ fontSize: "15px", textTransform: "uppercase" }}
              >
                MENU ICONS OF <b>{name2}</b>
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

          {/* <div className="float-right mt-0 -mb-1 w-[100%]">
          <hr />
          <div className="float-right -mt-1 mb-1">
          <button
              type="button"
              onClick={()=> handleClose() }
              className="bg-red-500 text-white text-sm font-medium rounded-sm px-3 py-2"
          >
            Close
          </button>
          </div>
        </div> */}
        </div>
      </Modal>
    </>
  );
};

export default AddSubMenuModal;
