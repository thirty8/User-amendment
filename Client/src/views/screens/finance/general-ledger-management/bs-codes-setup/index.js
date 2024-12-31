import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import { MDBIcon } from "mdb-react-ui-kit";
import DefaultPage from "./components/DefaultPage";
import ProfitAndLoss from "./components/ProfitAndLoss";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import swal from "sweetalert";

function BSCodesSetup() {
  const [performPost, setPerformPost] = useState(false);
  const [clearAlldata, setClearAlldata] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const tabsData = [
    {
      value: "default",
      label: "Setup Balance Sheet ",
      component: (
        <DefaultPage
          performPost={performPost}
          setPerformPost={setPerformPost}
          clearAlldata={clearAlldata}
          setClearAlldata={setClearAlldata}
        />
      ),
    },
    {
      value: "tab-2",
      label: "Hierachical View",
      component: <ProfitAndLoss refresh={refresh} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabsData[0].value);

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <ActionButtons
            // {activeTab === tabsData[0].value ? null :null}
            displayNew={activeTab === tabsData[0].value ? null : "none"}
            displayOk={activeTab === tabsData[0].value ? null : "none"}
            // displayFetch={activeTab === tabsData[1].value ? null : "none"}
            displayReject={"none"}
            displayFetch={"none"}
            displayAuthorise={"none"}
            displayCancel={"none"}
            displayView={"none"}
            displayDelete={"none"}
            displayHelp={"none"}
            onOkClick={() => {
              setPerformPost(true);
            }}
            onExitClick={handleExitClick}
            onNewClick={() => {
              swal({
                title: "Are you sure ?",
                icon: "warning",
                text: "All data entered will be cleared",
                buttons: true,
                dangerMode: true,
              }).then((res) => {
                if (res) {
                  setClearAlldata(true);
                }
              });
            }}
            onRefreshClick={() => setRefresh(!refresh)}
          />
        </div>
        <hr className="mb-1 p-0" />
        <div>
          <TabsComponent
            tabsData={tabsData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}

export default BSCodesSetup;

// import React, { useState } from "react";
// import DefaultPage from "./components/DefaultPage";
// import ProfitAndLoss from "./components/ProfitAndLoss";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
// import TabsComponent from "../../../../../components/others/tab-component/tab-component";

// function BSCodesSetup() {
//   const [performPost, setPerformPost] = useState(false);
//   const tabsData = [
//     { value: 'default', label: 'Setup Balance Sheet Co..',component:<DefaultPage performPost={performPost} setPerformPost={setPerformPost} /> },
//     { value: 'tab-2', label: 'Balance Sheet - Hierachical',component:<ProfitAndLoss />},
//   ];
//   const [activeTab, setActiveTab] = useState(tabsData[0].value);

//   return (
//     <div>
//       <div
//         style={{
//           // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//           borderRadius: "3px",
//           backgroundColor: "#ffffff",
//         }}
//       >

//         <div
//           style={{
//             marginTop: "0px",
//             textAlign: "center",
//             marginBottom: "15px",
//           }}
//         >
//           <ActionButtons displayNew={'none'} displayReject={'none'} displayAuthorise={'none'} displayCancel={'none'} displayView={'none'} displayDelete={'none'} displayHelp={'none'} onOkClick={()=>{setPerformPost(true)}} onExitClick={() => document.getElementById("closeModalBTN").click()} />
//         </div>
//         <hr className="mb-1 p-0" />
//         <div>
//           <TabsComponent tabsData={tabsData}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BSCodesSetup;
