import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Button,
    Container,
    Form,
    Modal,
    Card,
  } from "react-bootstrap";
  import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
  import axios from "axios";
  import { MDBIcon } from "mdb-react-ui-kit";
  import { API_SERVER } from "../../../../../config/constant";
  import InputField from "../../../../../components/others/Fields/InputField";
  import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";

function IttInvalid(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const headers = {
        "x-api-key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      };
      return (
        <div>
        <div>
        <div>
          <ActionButtons />
    
          </div>
          <hr />
          <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-evenly",
                  backgroundColor: "",
                  marginBottom: "15px"
                }}
              >
                  <div style={{ backgroundColor: "", flex: 0.35}}>
                  <ListOfValue
                   label={"Transaction Reference"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required={true}
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.40}}>
                  <InputField
                   label={"Sending Institution"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                 
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.20}}>
                  <InputField
                   label={"Posted Date"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   type={"date"}
                   marginBottom="20px"
                  />
                </div>
                </div>
                {/* <br /> */}
                <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-evenly",
                  backgroundColor: "",
                  marginBottom: "15px"
                }}
              >
                  <div style={{ backgroundColor: "", flex: 0.35}}>
                  <InputField
                   label={"Currency"}
                   labelWidth={"40%"}
                   inputWidth={"40%"}
                 
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.40}}>
                  <InputField
                   label={"Receiving Institution"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                 
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.20}}>
                  <InputField
                   label={"Status Flag"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   
                   marginBottom="20px"
                  />
                </div>
                </div>
                <hr />
                <div  style={{
                  display: "flex",
                  //flex: 1,
                  justifyContent: "end",
                  backgroundColor: "",
                  marginBottom: "15px",
                 
                }}>
                    <div className="small-space" style={{background:"", paddingRight: "10px"}}>
                        <ButtonComponent 
                        label={"Fetch"}
                        buttonWidth="100%"
                        buttonHeight="25px"
                        buttonColor="white"
                        marginBottom="25px"
                        />
                    </div>
                    </div>
                    <header
                    className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                    style={{
                      background:
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`,
    
                     textAlign: "center",
                     marginLeft: '-16px',
                     marginRight: '-16px',
                     //marginTop: 'px'
                    }}
                  >
                  INVALID INWARD SWIFT TRANSACTIONS
                  </header> 
                  &nbsp;
                  <DataTable 
                  columns={["Msg Type", "Sender's Ref", "Sending Institution", "Receiving Institution", "Currency", "Amount", "Status", "Channel", "Posted Date"]}
                  />

        </div>
        </div>
      );
}
export default IttInvalid;