import React,{useState,useEffect} from "react";
import AccountsHierarchy from "./components/DefaultPage";
import AccountSetup from "./components/AccountSetup";
import CBReportingLines from "./components/CBReportingLines";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";

    
function GLCreateAccount({details}) {
    const [TO,setAccountT] = useState("")
    const [CT,setCT] = useState("")
    const [performPost,setPerformPost] = useState(false);

    const changeToFirstTab = () => 
    {
      setActiveTab(tabsData[0].value);
      setDisabledTabs([tabsData[1].value,tabsData[2].value])
    };


    const tabsData=[
      { 
        value: 'default', 
        label: 'Accounts Hiearachy',
        component:<AccountsHierarchy setAccountT={setAccountT} setCT={setCT} /> 
      },
      { 
        value: 'tab-2',
        label: 'Account Setup',
        component:<AccountSetup TO={TO} CT={CT} details={details} setPerformPost={setPerformPost} performPost={performPost} changeToFirstTab={changeToFirstTab}/>
      },
      { 
        value: 'tab-3', 
        label: 'CB Reporting LInes',
        component:<CBReportingLines /> 
      },
    ] 

    const [activeTab, setActiveTab] = useState(tabsData[0].value);
    const [disabledTabs,setDisabledTabs] = useState([tabsData[1].value,tabsData[2].value]);

    
   
    const changeToSecondTab = () => 
    {
      setActiveTab(tabsData[1].value);
      setDisabledTabs(tabsData[2].value)
    };
    
    const changeToThirdTab = () => 
    {
      setActiveTab(tabsData[1].value);
      setDisabledTabs(tabsData[2].value)
    };

    const disableFirstTab = () => {
      setActiveTab(tabsData[1].value,tabsData[2].value);
      setDisabledTabs(tabsData[0].value)
    };  
    
    
    
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

useEffect(()=>{
if (details){
  disableFirstTab()
}
},[details])

  return (
    <div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            color: "white", //////////
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "25px",
            fontSize: "1.1em",
            paddingLeft: "10px",
            alignItems: "center",
          }}
          className="mb-1"
        >
        </div>                                                  

        {/* buttons    */}
        <div
          style={{
            marginTop: "-30px",
            textAlign: "center",
            // marginBottom: "5px",
          }}
        >
          <ActionButtons displayFetch={'none'} displayRefresh={'none'}displayDelete={'none'} displayAuthorise={"none"} displayCancel={"none"} displayView={"none"} displayReject={"none"} onExitClick={handleExitClick} 
          onNewClick={changeToSecondTab} onOkClick={()=>{setPerformPost(true)}}
          />
         
        </div>
        {/* <hr className="mb-1 p-0" /> */}
        <div>
            <TabsComponent tabsData={tabsData} disabledTabs={disabledTabs} activeTab={activeTab} setActiveTab={setActiveTab} changeToSecondTab={changeToSecondTab}/>
          </div>
      </div>
    </div>
  );
}

export default GLCreateAccount;