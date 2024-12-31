import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { MDBIcon } from "mdb-react-ui-kit";
import CustomTable from "./components/DataTable";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",

  "Content-Type": "application/json",
};
export default function Menus() {
  const [columns, setColumns] = useState();
  const [response, setResponse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [parentId, setParentId] = useState("");
  const [dataProcessingInfo, setDataProcessingInfo] = useState(
    "Processing data, please wait..."
  );

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const [getTheme, setTheme] = useState(customTheme);

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

  const swal = require("sweetalert");

  function closeModal(formName) {
    // let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // var closedModalName = t((formName.toLowerCase()).replace(/\s/g, ""));
    var closedModalName = capitalizeFirstCharacter(formName);

    // if((((userInfo.lang).toLowerCase()).slice(0, 2)) === "en"){

    swal({
      title: "Are you sure?",
      text: "You're about to close the '" + closedModalName + "' form",
      icon: "warning",
      confirmButtonColor: "#8CD4F5",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        var minimizedModals = [];
        var formName = localStorage.getItem("formName");
        if (localStorage.getItem("namesOfMinimizedModals")) {
          minimizedModals = JSON.parse(
            localStorage.getItem("namesOfMinimizedModals")
          );
          minimizedModals = minimizedModals.filter((e) => e !== formName);
          localStorage.setItem(
            "namesOfMinimizedModals",
            JSON.stringify(minimizedModals)
          );
        }
        document.getElementById("globalModalCloseBtn").click();
        // alert(localStorage.getItem("namesOfMinimizedModals"));
      }
    });

    // } else if((((userInfo.lang).toLowerCase()).slice(0, 2)) === "fr"){

    //   swal({
    //       title: "Es-tu Sûr?",
    //       text: "Vous êtes sur le point de fermer le '" + closedModalName + "' formulaire",
    //       icon: "warning",
    //       buttons: [ "Annuler", "Oui, Fermer Le Formulaire" ],
    //       dangerMode: true,
    //       }).then((result) => {
    //       if (result) {
    //       var minimizedModals = [];
    //       var formName = localStorage.getItem('formName');
    //       if(localStorage.getItem("namesOfMinimizedModals")){
    //       minimizedModals = JSON.parse(localStorage.getItem("namesOfMinimizedModals"));
    //       minimizedModals = minimizedModals.filter(e => e !== formName);
    //       localStorage.setItem("namesOfMinimizedModals", JSON.stringify(minimizedModals));
    //       }
    //       document.getElementById('globalModalCloseBtn').click();
    //       // alert(localStorage.getItem("namesOfMinimizedModals"));
    //       }
    //      });

    // } else if((((userInfo.lang).toLowerCase()).slice(0, 2)) === "sp"){

    //   swal({
    //       title: "Estas Seguro?",
    //       text: "Estas a punto de cerrar el '" + closedModalName + "' forma",
    //       icon: "warning",
    //       buttons: [ "Cancelar", "Sí, Cerrar Formulario" ],
    //       dangerMode: true,
    //       }).then((result) => {
    //       if (result) {
    //       var minimizedModals = [];
    //       var formName = localStorage.getItem('formName');
    //       if(localStorage.getItem("namesOfMinimizedModals")){
    //       minimizedModals = JSON.parse(localStorage.getItem("namesOfMinimizedModals"));
    //       minimizedModals = minimizedModals.filter(e => e !== formName);
    //       localStorage.setItem("namesOfMinimizedModals", JSON.stringify(minimizedModals));
    //       }
    //       document.getElementById('globalModalCloseBtn').click();
    //       // alert(localStorage.getItem("namesOfMinimizedModals"));
    //       }
    //      });

    // }
  }

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: 0 },
        { headers }
      )
      .then((res) => {
        setColumns(Object.keys(res.data[0]));
        // setColumns((prev) => [...prev, "Actions"]);

        setResponse(res.data);

        if (res.data.length === 0) {
          setDataProcessingInfo("Sorry, there are currently no menus");
        }
      });
  }, [showModal, dataProcessingInfo]);

  //   console.log(response, "res");

  const arr = [];
  const arr1 = [];

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
            setShowModal(true);
            // console.log(i.menu_id, "parent");
            setParentId({
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
            setShowModal(true);
            // console.log(i.menu_id, "parent");
            setParentId({
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
          name={i.parent_menu_id}
          onClick={function (e) {
            e.preventDefault();
            setShowModal(true);
            // console.log(i.menu_id, "parent");
            setParentId({
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

  // arr.map((i, key) => {
  //   arr[key].push();
  // });

  // console.log(parentId);

  return (
    <>
      <div className="-mb-4 shadow-0 -mt-2">
        {/* <div style={{ marginTop: "-15px", textAlign: "center", zoom: "0.85" }}>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="file-alt" /><br />New</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="times" /><br />Cancel</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sync" /><br />Refresh</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="eye" /><br />Preview</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="question-circle" /><br />Help</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-primary' onClick={() => document.getElementById("closeModalBTN").click()} style={{ background: `url(` + window.location.origin + `/assets/images/headerBackground/` + headerImage + `)` }}><MDBIcon style={{ color: "white", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sign-out-alt" /><br />Exit</button>
          </span>

        </div>  */}

        {/* <hr style={{ marginTop: "0px", marginBottom: "10px" }} /> */}

        {
          <Modal
            type={parentId?.type}
            parentId={parentId?.id}
            name={parentId?.name}
            showModal={showModal}
            setShowModal={setShowModal}
            formData={parentId?.content}
            // parent={parent}
          />
        }

        <div className="scale-[90%]">
          <CustomTable
            className="shadow-0"
            data={arr}
            defaultMessage={dataProcessingInfo}
            title={
              <b
                style={{
                  fontSize: "20px",
                  fontFamily: "calibri",
                  textTransform: "uppercase",
                }}
              >
                System Menus
              </b>
            }
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
      </div>

      {/* <div className="float-right mt-3 -mb-1 w-[100%]">
          <hr />
          <div className="float-right -mt-1 mb-1">
          <button
            type="button"
            onClick={()=> document.getElementById("minimizeModal").click() }
            style={{ paddingLeft: "20px", paddingRight: "20px", color: "white" }}
            className="bg-gray-400 text-white text-sm font-medium rounded-sm px-3 py-2"
          >
            Minimize Modal
          </button>

          &nbsp;&nbsp;&nbsp;&nbsp;

          <button
              type="button"
              onClick={()=> document.getElementById("closeModalBTN").click() }
              className="bg-red-500 text-white text-sm font-medium rounded-sm px-3 py-2"
          >
            Close Modal
          </button>
          </div>
        </div> */}
    </>
  );
}
