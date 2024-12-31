import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import UserCreationForm from "./components/UserCreationForm";

const headers = {
  "x-api-key": process.env.REACT_APP_API_KEY,
  "Content-Type": "application/json",
};

export default function UserCreation() {
  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const bgColor = customTheme.theme.headerImage;

  // Handle form submission and update formData state
  function handleSubmit() {
    if (document.getElementById("submitUserCreationForm")) {
      document.getElementById("submitUserCreationForm").click();
    }
  }

  return (
    <>
      <div
      // className="p-3"
      // style={{ marginBottom: "-40px", marginTop: "-15px" }}
      >
        {/* <div style={{ marginTop: "-15px", textAlign: "center", zoom: "0.85" }}>
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="file-alt"
              />
              <br />
              New
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              id="saveBTN"
              className="btn btn-secondary"
              onClick={() => handleSubmit()}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="save"
              />
              <br />
              Submit
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="check"
              />
              <br />
              Ok
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-light" style={{ background: "white" }}>
              <MDBIcon
                style={{
                  color: "grey",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="question-circle"
              />
              <br />
              Help
            </button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById("closeModalBTN").click()}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  headerImage +
                  `)`,
              }}
            >
              <MDBIcon
                style={{
                  color: "white",
                  marginLeft: "10px",
                  paddingBottom: 5,
                  fontSize: 15,
                }}
                fas
                icon="sign-out-alt"
              />
              <br />
              Exit
            </button>
          </span>
        </div>

        <hr style={{ marginTop: "0px", marginBottom: "25px" }} /> */}

        <div className="">
          <UserCreationForm />
        </div>
      </div>
    </>
  );
}
