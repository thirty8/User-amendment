import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../control-setups/components/CustomTable";
import Header from "../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";

function BranchOpenClose() {
  // themes
  const [getButtonColor, setButtonColor] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  //headers
  const tableHeaders = [
    "Teller Name",
    "Teller FullName",
    "Currency",
    "Tillbal",
    "Teller Type",
  ];

  const modalHeaders = [
    "Batch No",
    "Currency",
    "Amount",
    "Sent By",
    "Sent To",
    "Posting Date",
    "Trans Details",
  ];

  // headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [currency, setCurrency] = useState([]);
  const [show, setShow] = useState(false);

  // functions
  const handleShow = () => {
    setShow(true);
    console.log("clicked");
  };

  const handleClose = () => setShow(false);

  // effects
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-currency", { headers: headers })
      .then(function (response) {
        console.log(response.data, "curr");
        setCurrency(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <ActionButtons
          displayNew={"none"}
          displayDelete={"none"}
          displayAuthorise={"none"}
          displayView={"none"}
          displayOk={"none"}
          displayCancel={"none"}
          displayReject={"none"}
          displayHelp={"none"}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {/* status of the current branch */}
        <input
          value="Branch is currently opened"
          disabled
          style={{
            textAlign: "center",
            width: "50%",
            outline: "1px solid rgb(196, 196, 196)",
            borderRadius: "3px",
            border: "none",
            height: "25px",
            paddingLeft: "7px",
            paddingRight: "7px",
            color: "rgb(92, 92, 92)",
            textTransform: "uppercase",
          }}
        />
      </div>

      {/* open and close button section */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* <div>
          <button
            className="button"
            style={{
              backgroundColor: "green",
              marginRight: "10px",
              color: "white",
              padding: "7px",
              borderRadius: "5px",
            }}
          >
            Open Branch
          </button>
        </div> */}
        <div>
          <button
            className="button"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "7px",
              borderRadius: "5px",
            }}
          >
            Close Branch
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          border: "1px solid rgb(196, 196, 196)",
          padding: "5px",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "50%" }}>
          <InputField
            label="Number of pending receivals"
            labelWidth={"35%"}
            inputWidth={"10%"}
            value={0}
            // textAlign={"right"}
            disabled
          />
        </div>

        <div>
          <ButtonComponent
            onClick={() => handleShow()}
            label="View pending receivals"
          />

          {show && (
            <div>
              <Modal show={handleShow} size="lg" backdrop={true} centered>
                <Modal.Body className="p-0 m-0">
                  <div>
                    <div>
                      <Header title="Pending Receivals" />
                    </div>
                    <div
                      className="w-[100%]"
                      style={{
                        zoom: "0.80",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        marginTop: "5px",
                        marginBottom: "15px",
                      }}
                      centered
                    >
                      <div
                        className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
                        onClick={handleClose}
                        style={{
                          zoom: "0.80",
                          cursor: "pointer",
                        }}
                      >
                        <div className=" flex flex-col items-center justify-center">
                          <MDBIcon
                            style={{
                              color: "grey",
                              fontSize: 20,
                              paddingTop: "15px",
                            }}
                            fas
                            icon="sign-out-alt"
                          />

                          <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                            Exit
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "10px" }}>
                      <CustomTable headers={modalHeaders} />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      </div>

      {/* details */}
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%", marginRight: "10px" }}>
          <ListOfValue
            label="Teller Name"
            labelWidth={"40%"}
            inputWidth={"60%"}
          />
        </div>

        <div style={{ width: "100%", marginRight: "10px" }}>
          <ListOfValue
            label="Currency"
            labelWidth={"40%"}
            inputWidth={"60%"}
            data={currency}
          />
        </div>

        <div style={{ width: "100%", marginRight: "10px" }}>
          <ListOfValue
            label="Teller Type"
            labelWidth={"40%"}
            inputWidth={"60%"}
          />
        </div>
      </div>

      <div>
        <Header headerShade={true} title="Teller Till Balance" />
        <CustomTable headers={tableHeaders} />
      </div>
    </div>
  );
}

export default BranchOpenClose;
