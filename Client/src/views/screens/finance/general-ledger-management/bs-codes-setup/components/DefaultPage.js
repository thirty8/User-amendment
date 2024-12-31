import React, { useState, useEffect } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import Label from "../../../../../../components/others/Label/Label";
import Header from "../../../../../../components/others/Header/Header";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import swal from "sweetalert";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";

function DefaultPage({
  performPost,
  setPerformPost,
  closeBSamendment,
  details,
  getBalanceSheet
}) {
  const [parentLine, setParentLine] = useState([]);
  const [cleartoCode, setCleartoCode] = useState("");
  const [bsDesc, setBsDesc] = useState("");
  const [bsCode, setBsCode] = useState("");
  const [levelIndicator, setLevelIndicator] = useState("");
  const [ordering, setOrdering] = useState("");
  const [lineCategory, setLineCategory] = useState("");
  const [balanceSheetACType, setBalanceSheetACType] = useState("");
  const [reportClass, setReportClass] = useState("");
  const [rCode, setRCode] = useState("");
  const [reportType, setReportType] = useState("");
  const [enablePLcode,setEnablePLcode] = useState(false);

  useEffect(() => {
    if (details){
      // setBranch(details.branch_code)
      setCleartoCode(details.parent_line)
      setBsDesc(details.line_description)
      setOrdering(details.ordering)
      setLevelIndicator(details.level_indicator)
      setLineCategory(details.line_category)
      setBalanceSheetACType(details.balance_sheet_ac_type)
      setReportClass(details.report_class)
      setBsCode(details.bs_code)
      
      setEnablePLcode(true)
      // setCurrencyLOV(details.currency)
      // setAccountRestriction(details.account_restriction)
      // document.getElementById("chartGroup").value = details.chart_code
      // document.getElementById("clearToCode").value = details.clear_to_code
    }
  }, [details]);


  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function clearData() {
    setCleartoCode("");
    setBsDesc("");
    setOrdering("");
    setLevelIndicator("");
    setLineCategory("");
    setBalanceSheetACType("");
    setReportClass("");
  }

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const bsDate = `${day}-${month}-${year}`;

  useEffect(() => {
    setRCode("Y");

    async function getParentLine() {
      let response = await axios.get(
        API_SERVER + "/api/get-parent-line-details",
        { headers }
      );
      setParentLine(response.data);
    }
    getParentLine();
  }, []);

 
  useEffect(() => {
    if (performPost) {
      postBSCodeSetup();
    }
  }, [performPost]);


  function postBSCodeSetup() {
    console.log( {
      cleartoCode: cleartoCode,
      bsDate: bsDate,
      bsDesc: bsDesc,
      levelIndicator: levelIndicator,
      positiveCleartoCode: "",
      negativeCleartoCode: "",
      branchCode: "",
      rCode: rCode,
      rComments: "",
      ordering: ordering,
      lineCategory: lineCategory,
      reportType: reportType,
      postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
      postingSysDate: "",
      postingSysTime: " ",
      postingTerminal: "",
      flag: "N",
      flagMessage: "NEW",
      balanceSheetACType: balanceSheetACType,
      reportClass: reportClass,
      typeOfSetup: "B",
      status: "N",
    })
    axios
      .post(
        API_SERVER + "/api/get_post_prc_BSCode_Setup",
        {
          cleartoCode: cleartoCode,
          bsDate: bsDate,
          bsDesc: bsDesc,
          levelIndicator: levelIndicator,
          positiveCleartoCode: "",
          negativeCleartoCode: "",
          branchCode: "",
          rCode: rCode,
          rComments: "",
          // ordering: ordering,
          lineCategory: lineCategory,
          reportType: reportType,
          postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
          postingSysDate: "",
          postingSysTime: " ",
          postingTerminal: "",
          flag: "N",
          flagMessage: "New",
          balanceSheetACType: balanceSheetACType,
          reportClass: reportClass,
          typeOfSetup: "B",
          status: "N",
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data.success == "Y") {
          swal({
            icon: "success",
            title: response.data.message,
            text: "",
          });
          setPerformPost(false);
          clearData();
        } else {
          swal({
            icon: "error",
            title: response.data.message,
            text: "",
          });
          setPerformPost(false);
        }
      });
  }

  function amendBSCodeSetup() {
    console.log(bsDesc,"bsDescbsDesc")
    if (bsDesc === "" || reportClass === "" || levelIndicator === "" || lineCategory === "" || balanceSheetACType === "")
      {
        swal({
          title: "ERR - 00103",
          text: "Fill All Mandatory Fields",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        });
      }
      else{
    axios
      .post(
        API_SERVER + "/api/get_post_prc_BSCode_Setup",
        { 
          bsDate: bsDate,
          bsDesc: bsDesc,
          levelIndicator: levelIndicator,
          cleartoCode: cleartoCode,
          positiveCleartoCode: "",
          negativeCleartoCode: "",
          branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode,
          rCode: rCode,
          rComments: "",
          ordering: ordering,
          lineCategory: lineCategory,
          reportType: reportType,
          amendedBy: JSON.parse(localStorage.getItem("userInfo")).id,
          amendedDate: "",
          flag: "A",
          flagMessage: "Amended",
          balanceSheetACType: balanceSheetACType,
          reportClass: reportClass,
          typeOfSetup: "B",
          status: "A",
          bsCode : bsCode 
        },
        {headers}
      )
      .then((response) => {
        console.log(response,"f3f3l3f3")
        if (response.data.success == "Y") {
          swal({
            icon: "success",
            title: response.data.message,
            text: "",
          }).then(()=>{
            // setPerformPost(false);
            clearData();
            closeBSamendment();
            getBalanceSheet();
          })
        
        } else {
          swal({
            icon: "error",
            title: response.data.message,
            text: "Contact Your Supervisor For Action",
          });
          setPerformPost(false);
        }
      })
      .catch((error)=>{console.log(error)})
    }
  }

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }


  // useEffect
  return (
    <div>
       {enablePLcode ?<div style={{margin:"0px 0px 20px 0px"}}> <ActionButtons onOkClick={amendBSCodeSetup} displayFetch={'none'} displayRefresh={'none'} displayNew={'none'} displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onExitClick={() => document.getElementById("closeModalBTN").click()} />  </div> : null}
      <div className=" w-[80%] mx-auto">
        {/* <div></div> */}
        {/* =================================================== */}
        {/* main container   */}
        <div className="mb-1">
          {/* {" "} */}
          {enablePLcode ?   <Header headerShade={true} title={"Amend Balance Sheet Codes"} /> :   <Header headerShade={true} title={"Create Code"} />}
        </div>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            backgroundColor: "#ffffff",
            marginBottom: "25px",
          }}
        >
          <div style={{ padding: "10px 15px" }}>
            <div style={{ display: "flex", flex: 1, marginBottom: "25px" }}>
              {/* branch   */}
              <div style={{ flex: 0.5 }}>
                <ListOfValue
                  label={"Parent Line"}
                  labelWidth={"21%"}
                  inputWidth={"70%"}
                  required={false}
                  data={parentLine}
                  onChange={(value) => {
                    setCleartoCode(value);
                    setTimeout(() => {
                      const input = document.getElementById("lineDescription");
                      input.focus();
                    }, 0);
                  }}
                  value={cleartoCode}
                />
              </div>
              {/*   Parent Line   */}
              <div style={{ flex: 0.5 }}>
                <InputField
                  label={"Line Description"}
                  labelWidth={"25%"}
                  inputWidth={"60%"}
                  required={true}
                  id={"lineDescription"}
                  onChange={(e) => {
                    setBsDesc(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "lineOrder");
                  }}
                  value={bsDesc}
                />
              </div>
            </div>

            <div style={{ display: "flex", flex: 1, marginBottom: "25px" }}>
              {/* line code   */}
              <div style={{ flex: 0.5 }}>
              <RadioButtons
                  display={true}
                  display2={true}
                  display3={true}
                  label={"Report Class"}
                  name={"reportClass"}
                  labelWidth={"21%"}
                  radioLabel={"Total"}
                  id={"Total"}
                  value={"T"}
                  checked={reportClass === "T"}
                  radioLabel2={"Detail"}
                  id2={"Detail"}
                  value2={"D"}
                  checked2={reportClass === "D"}
                  radioLabel3={"Breakdown"}
                  id3={"Breakdown"}
                  value3={"B"}
                  checked3={reportClass === "B"}
                  radioButtonsWidth={"72%"}
                  onChange={(e) => {
                    setReportClass(e.target.value);
                  }}
                  required={true}
                />
                {/* <InputField
                  label={"Line Order"}
                  labelWidth={"21%"}
                  inputWidth={"70%"}
                  required={true}
                  onChange={(e) => {
                    setOrdering(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "HeadLevel");
                  }}
                  id={"lineOrder"}
                  value={ordering}
                /> */}
              </div>
              <div style={{ flex: 0.5 }}>
                <div>
                  <RadioButtons
                    display={true}
                    display2={true}
                    display3={true}
                    label={"Line Level"}
                    name={"lineLevel"}
                    labelWidth={"25%"}
                    radioLabel={"Head Level"}
                    id={"HeadLevel"}
                    value={"H"}
                    checked={levelIndicator === "H"}
                    radioLabel2={"Total Level"}
                    id2={"Total Level"}
                    checked2={levelIndicator === "T"}
                    value2={"T"}
                    radioLabel3={"Detail Level"}
                    id3={"Detail Level"}
                    checked3={levelIndicator === "D"}
                    value3={"D"}
                    radioButtonsWidth={"72%"}
                    onChange={(e) => {
                      setLevelIndicator(e.target.value);
                    }}
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flex: 1, marginBottom: "25px" }}>
              {/* bs chart group   */}
              <div style={{ flex: 0.5 }}>
                <RadioButtons
                  display={true}
                  display2={true}
                  display3={true}
                  label={"BS Chart Group"}
                  name={"chartGroup"}
                  labelWidth={"21%"}
                  radioLabel={"Asset"}
                  id={"Asset"}
                  value={"A"}
                  checked={lineCategory === "A"}
                  radioLabel2={"Liability"}
                  id2={"Liability"}
                  value2={"L"}
                  checked2={lineCategory === "L"}
                  radioLabel3={"Equity"}
                  id3={"Equity"}
                  value3={"E"}
                  checked3={lineCategory === "E"}
                  radioButtonsWidth={"72%"}
                  onChange={(e) => {
                    setLineCategory(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div style={{ flex: 0.5 }}>
                <div>
                  <div>
                    <RadioButtons
                      display={true}
                      display2={true}
                      label={"BS Account Type"}
                      name={"BSAccountType"}
                      labelWidth={"25%"}
                      radioLabel={"Balance Sheet"}
                      id={"Balance Sheet"}
                      value={"BSA"}
                      checked={balanceSheetACType === "BSA"}
                      radioLabel2={"Off Balance Sheet"}
                      id2={"Off Balance Sheet"}
                      value2={"OBSA"}
                      checked2={balanceSheetACType === "OBSA"}
                      radioButtonsWidth={"54%"}
                      onChange={(e) => {
                        setBalanceSheetACType(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            {enablePLcode ? 

            <div style={{ display: "flex", flex: 1, marginBottom: "25px" }}>
              {/* Line Order   */}
              <div style={{ flex: 0.5 }}>
              <InputField
                  label={"Line Code"}
                  labelWidth={"21%"}
                  inputWidth={"25%"}
                  value={bsCode}
                  textAlign={"center"}
                  disabled
                />
                </div>
              <div style={{ flex: 0.5 }}>
              </div>
            </div>
            : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;










// import React, { useState, useEffect } from "react";
// import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
// import SelectField from "../../../../../../components/others/Fields/SelectField";
// import InputField from "../../../../../../components/others/Fields/InputField";
// import TextAreaField from "../../../../../../components/others/Fields/TextArea";
// import ButtonType from "../../../../../../components/others/Button/ButtonType";
// import Label from "../../../../../../components/others/Label/Label";
// import Header from "../../../../../../components/others/Header/Header";
// import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
// import axios from "axios";
// import { API_SERVER } from "../../../../../../config/constant";
// import swal from "sweetalert";

// function DefaultPage({ performPost, setPerformPost }) {
//   const [parentLine, setParentLine] = useState([]);
//   const [cleartoCode, setCleartoCode] = useState("");
//   const [bsDesc, setBsDesc] = useState("");
//   const [levelIndicator, setLevelIndicator] = useState("");
//   const [ordering, setOrdering] = useState("");
//   const [lineCategory, setLineCategory] = useState("");
//   const [balanceSheetACType, setBalanceSheetACType] = useState("");
//   const [reportClass, setReportClass] = useState("");
//   const [rCode, setRCode] = useState("");
//   const [reportType, setReportType] = useState("");
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );

//   const headers = {
//     // 'x-api-key': process.env.REACT_APP_API_KEY,
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   const today = new Date();
//   const day = today.getDate();
//   const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
//     today
//   );
//   const year = today.getFullYear();
//   const bsDate = `${day}-${month}-${year}`;

//   useEffect(() => {
//     setRCode("Y");

//     async function getParentLine() {
//       let response = await axios.get(
//         API_SERVER + "/api/get-parent-line-details",
//         { headers }
//       );
//       setParentLine(response.data);
//     }
//     getParentLine();
//   }, []);

//   useEffect(() => {
//     if (performPost) {
//       postBSCodeSetup();
//     }
//   }, [performPost]);

//   function postBSCodeSetup() {
//     axios
//       .post(
//         API_SERVER + "/api/get_post_prc_BSCode_Setup",
//         {
//           cleartoCode: cleartoCode,
//           bsDate: bsDate,
//           bsDesc: bsDesc,
//           levelIndicator: levelIndicator,
//           cleartoCode: cleartoCode,
//           positiveCleartoCode: "",
//           negativeCleartoCode: "",
//           branchCode: "",
//           rCode: rCode,
//           rComments: "",
//           ordering: ordering,
//           lineCategory: lineCategory,
//           reportType: reportType,
//           postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
//           postingSysDate: "13-JUL-2023",
//           postingSysTime: " ",
//           postingTerminal: "",
//           flag: "N",
//           flagMessage: "NEW",
//           balanceSheetACType: balanceSheetACType,
//           reportClass: reportClass,
//           typeOfSetup: "B",
//           status: "N",
//         },
//         {
//           headers,
//         }
//       )
//       .then((response) => {
//         if (response.data.success == "Y") {
//           swal({
//             icon: "success",
//             title: response.data.message,
//             text: "",
//           });
//           setPerformPost(false);
//         } else {
//           swal({
//             icon: "error",
//             title: response.data.message,
//             text: "",
//           });
//           setPerformPost(false);
//         }
//       });
//   }

//   // useEffect
//   return (
//     <div>
//       <div className=" w-[80%] mx-auto">
//         {/* <div></div> */}
//         {/* =================================================== */}
//         {/* main container   */}
//         <div className="mb-1">
//           {/* {" "} */}
//           <Header headerShade={true} title={"Create Code"} />
//         </div>
//         <div
//           style={{
//             boxShadow:
//               "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
//             borderRadius: "3px",
//             backgroundColor: "#ffffff",
//             marginBottom: "25px",
//           }}
//         >
//           <div style={{ padding: "10px 15px" }}>
//             <div style={{ display: "flex", flex: 1, marginBottom: "20px" }}>
//               {/* branch   */}
//               <div style={{ flex: 0.5 }}>
//                 <ListOfValue
//                   label={"Parent Line"}
//                   labelWidth={"21%"}
//                   inputWidth={"70%"}
//                   required={false}
//                   data={parentLine}
//                   onChange={(value) => {
//                     setCleartoCode(value);
//                   }}
//                   value={cleartoCode}
//                 />
//               </div>
//               {/*   Parent Line   */}
//               <div style={{ flex: 0.5 }}>
//                 <InputField
//                   label={"Line Description"}
//                   labelWidth={"21%"}
//                   inputWidth={"70%"}
//                   required={true}
//                   onChange={(e) => {
//                     setBsDesc(e.target.value);
//                   }}
//                   value={bsDesc}
//                 />
//               </div>
//             </div>

//             <div style={{ display: "flex", flex: 1, marginBottom: "20px" }}>
//               {/* line code   */}
//               <div style={{ flex: 0.5 }}>
//                 <InputField
//                   label={"Line Order"}
//                   labelWidth={"21%"}
//                   inputWidth={"70%"}
//                   required={true}
//                   onChange={(e) => {
//                     setOrdering(e.target.value);
//                   }}
//                   value={ordering}
//                 />
//               </div>
//               <div style={{ flex: 0.5 }}>
//                 <div>
//                   <RadioButtons
//                     display={true}
//                     display2={true}
//                     display3={true}
//                     label={"Line Level"}
//                     name={"lineLevel"}
//                     labelWidth={"21%"}
//                     radioLabel={"Head Level"}
//                     id={"Head Level"}
//                     value={"H"}
//                     checked={levelIndicator === "H"}
//                     radioLabel2={"Total Level"}
//                     id2={"Total Level"}
//                     checked2={levelIndicator === "T"}
//                     value2={"T"}
//                     radioLabel3={"Detail Level"}
//                     id3={"Detail Level"}
//                     checked3={levelIndicator === "D"}
//                     value3={"D"}
//                     radioButtonsWidth={"72%"}
//                     onChange={(e) => {
//                       setLevelIndicator(e.target.value);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div style={{ display: "flex", flex: 1, marginBottom: "20px" }}>
//               {/* bs chart group   */}
//               <div style={{ flex: 0.5 }}>
//                 <RadioButtons
//                   display={true}
//                   display2={true}
//                   display3={true}
//                   label={"BS Chart Group"}
//                   name={"chartGroup"}
//                   labelWidth={"21%"}
//                   radioLabel={"Asset"}
//                   id={"Asset"}
//                   value={"A"}
//                   checked={lineCategory === "A"}
//                   radioLabel2={"Liability"}
//                   id2={"Liability"}
//                   value2={"L"}
//                   checked2={lineCategory === "L"}
//                   radioLabel3={"Equity"}
//                   id3={"Equity"}
//                   value3={"E"}
//                   checked3={lineCategory === "E"}
//                   radioButtonsWidth={"72%"}
//                   onChange={(e) => {
//                     setLineCategory(e.target.value);
//                   }}
//                 />
//               </div>
//               <div style={{ flex: 0.5 }}>
//                 <div>
//                   <div>
//                     <RadioButtons
//                       display={true}
//                       display2={true}
//                       label={"BS Account Type"}
//                       name={"BSAccountType"}
//                       labelWidth={"21%"}
//                       radioLabel={"Balance Sheet"}
//                       id={"Balance Sheet"}
//                       value={"BSA"}
//                       checked={balanceSheetACType === "BSA"}
//                       radioLabel2={"Off Balance Sheet"}
//                       id2={"Off Balance Sheet"}
//                       value2={"OBSA"}
//                       checked2={balanceSheetACType === "OBSA"}
//                       radioButtonsWidth={"50%"}
//                       onChange={(e) => {
//                         setBalanceSheetACType(e.target.value);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
//               {/* Line Order   */}
//               <div style={{ flex: 0.5 }}>
//                 <RadioButtons
//                   display={true}
//                   display2={true}
//                   display3={true}
//                   label={"Report Class"}
//                   name={"reportClass"}
//                   labelWidth={"21%"}
//                   radioLabel={"Total"}
//                   id={"Total"}
//                   value={"T"}
//                   checked={reportClass === "T"}
//                   radioLabel2={"Detail"}
//                   id2={"Detail"}
//                   value2={"D"}
//                   checked2={reportClass === "D"}
//                   radioLabel3={"Breakdown"}
//                   id3={"Breakdown"}
//                   value3={"B"}
//                   checked3={reportClass === "B"}
//                   radioButtonsWidth={"72%"}
//                   onChange={(e) => {
//                     setReportClass(e.target.value);
//                   }}
//                 />
//               </div>
//               {/* space   */}
//               {/* <div style={{ flex: 0.2 }}></div> */}
//               {/* Bs Account Type  */}
//               <div style={{ flex: 0.5 }}>
//                 <div>
//                   {/* <RadioButtons display={true}
//                   display2={true}
//                   display3={true}
//                   label={"Report Class"}
//                   name={"reportClass"}
//                    labelWidth={'25%'}
//                    radioLabel={'Total'}   
//                    id={'Total'}
//                    value={"T"}
//                    checked={reportClass==="T"}
//                    radioLabel2={"Detail"} 
//                      id2={"Detail"}
//                      value2={"D"}
//                      checked2={reportClass==="D"}
//                    radioLabel3={"Breakdown"}
//                      id3={"Breakdown"}
//                      value3={"B"}
//                      checked3={reportClass==="B"}
//                      radioButtonsWidth={'72%'}
//                      onChange={(e)=>{
//                       setReportClass(e.target.value)
//                      }}
//                   /> */}
//                 </div>
//               </div>
//             </div>

//             {/* <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
//               <div style={{ flex: 0.5 }}>
//                 <TextAreaField
//                   inputheight={"25px"}
//                   label={"Line Description"}
//                   labelWidth={"21%"}
//                   inputWidth={"70%"}
//                   required={true}
//                 />
//               </div>
//             </div>            */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DefaultPage;
