import React, {useState} from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from 'axios'
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";

function ACHACPEXCEPTIONS(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      return (
        <div>
          <div className="">
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
                <SelectField
                   label={"Status"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required= {true}
                   marginBottom="20px"
                  />
                </div>
               
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                  {/* <InputField
                   label={"Cheque Amount"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   type={"number"}
                   marginBottom="20px"
                  /> */}
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  {/* <InputField
                   label={"Value Date"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   type={"date"}
                   marginBottom="20px"
                  /> */}
                  <ListOfValue 
                  label={"Account"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  marginBottom="20px"
                  />
                </div>
                </div>
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
                  label={"Cheque Number"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                {/* <ListOfValue 
                  label={"Currency"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  marginBottom="20px"
                  /> */}
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                <ListOfValue 
                  label={"Currency"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  marginBottom="20px"
                  />
                  
                  
                </div>
                </div>
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
                   label={"Value Date"}
                   type={"date"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   marginBottom="20px"
                 
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                <InputField
                   label={"TO"}
                   type={"date"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   marginBottom="20px"
                 
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  {/* <SelectField
                   label={"Currency"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required= {true}
                   marginBottom="20px"
                  /> */}
                </div>
                </div>
                 <hr />
                
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
                  Cheque Exceptions Details
                  </header> 
                  &nbsp;
                  <DataTable
                  columns={["Status", "Status Desc", "Cheque No", "Account","Description", "Currency", "Amount", "Value Date", "Action"]}
                  />
          </div>
        </div>
      );
}
export default ACHACPEXCEPTIONS;