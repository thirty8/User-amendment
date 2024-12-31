import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import BudgetCreation from "./components/budget-creation";
import Swal from "sweetalert2";
import OverlayLoader from "../../../../../components/others/OverlayLoader";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const GLBudgetSetup = () => {
  const [previousBudgetLov, setPreviousBudgetLov] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [budgetData, setBudgetData] = useState({});
  const [budgetYear, setBudgetYear] = useState("");
  const [budgetDate, setBudgetDate] = useState("");
  const [postLoader, setPostLoader] = useState(false);

  const handleNewBudget = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "All data entered will be cleared !!!",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setBudgetData({});
        setBudgetDate("");
        setBudgetYear("");
      }
    });
  };

  const postNewBudget = async () => {
    try {
      setPostLoader(true);
      await axios
        .post(
          API_SERVER + "/api/post_gl_budget_setup",
          {
            flag: "N",
            budget_description: budgetData.budget_description,
            budget_title: budgetData.budget_title,
            budget_status: budgetData.budget_status,
            budget_type: budgetData.budget_type,
            budget_year: budgetYear.toString(),
            username: JSON.parse(localStorage.getItem("userInfo")).id,
            previous_budget: budgetData.prev_budget_code,
            // amt_dist_method: "",
            // budget_value: "",
            // rounding_factor: "",
            // budget_method: "",
          },

          {
            headers,
          }
        )
        .then((res) => {
          if (res.data.success === "Y") {
            setPostLoader(false);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.message,
              allowOutsideClick: false,
            });
            setBudgetData({});
            setBudgetDate("");
            setBudgetYear("");
          } else {
            setPostLoader(false);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.message,
              allowOutsideClick: false,
            });
          }
        });
    } catch (error) {
      setPostLoader(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  // const tabsData = [
  //   {
  //     value: "default",
  //     label: "Budget Creation",
  //     component: (
  //       <BudgetCreation
  //         previousBudgetLov={previousBudgetLov}
  //         refresh={refresh}
  //         setBudgetData={setBudgetData}
  //         setBudgetYear={setBudgetYear}
  //         setBudgetDate={setBudgetDate}
  //         budgetData={budgetData}
  //         budgetYear={budgetYear}
  //         budgetDate={budgetDate}
  //         //   handleNewBudget={handleNewBudget}
  //       />
  //     ),
  //   },
  //   {
  //     value: "tab2",
  //     label: "Budget Amendment",
  //     component: <div>Amendment</div>,
  //   },
  // ];

  // const [activeTab, setActiveTab] = useState(tabsData[0].value);

  useEffect(() => {
    const getPreviousBudget = async () => {
      let response = await axios.get(
        API_SERVER + "/api/get-previous-budget",

        {
          headers,
        }
      );
      setPreviousBudgetLov(response.data);
    };
    getPreviousBudget();
  }, []);
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="mb-3">
          <ActionButtons
            displayAuthorise={"none"}
            displayCancel={"none"}
            displayDelete={"none"}
            displayFetch={"none"}
            displayRefresh={"none"}
            displayReject={"none"}
            displayHelp={"none"}
            displayView={"none"}
            onNewClick={handleNewBudget}
            onOkClick={postNewBudget}
            // onNewClick={
            //   activeTab === tabsData[0].value ? handleNewBudget : null
            // }
            // onOkClick={activeTab === tabsData[0].value ? postNewBudget : null}
          />
        </div>
        <OverlayLoader
          postLoader={postLoader}
          // color={"#0580c0"}
          textColor={true}
          displayText={"Processing..."}
        />
        <BudgetCreation
          previousBudgetLov={previousBudgetLov}
          refresh={refresh}
          setBudgetData={setBudgetData}
          setBudgetYear={setBudgetYear}
          setBudgetDate={setBudgetDate}
          budgetData={budgetData}
          budgetYear={budgetYear}
          budgetDate={budgetDate}
          //   handleNewBudget={handleNewBudget}
        />
        {/* <TabsComponent
          tabsData={tabsData}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        /> */}
      </div>
    </div>
  );
};

export default GLBudgetSetup;
