import React, { useState, useEffect } from "react";
import FinanceDashboard from "./components/FinanceDashboard";
import LendingDashboard from "./components/LendingDashboard";
import BranchManagersDashboard from "./components/BranchMangersDashboard";
import TellerDashboard from "./components/TellerDashboard";
import CustomerServiceDashboard from "./components/CustomerServiceDashboard";
import MainDashboard from "./components/MainDashboard";
import "../../App.css";
import SideNavComponent from "../../components/SideNavComponent";
import TopNavComponent from "../../components/TopNavComponent";
import Swal from "sweetalert2";
import CentralApprovalDashboard from "./components/CentralApprovalDashboard";

const userInfoString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(userInfoString);

const authorityCode = userInfo?.authorityCode;

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | COOPTECH";
  }, []);

  const [showPendingItems, setShowPendingItems] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showScreen, setShowScreen] = useState(false);
  const [modalSize, setModalSize] = useState("100%");
  const [fullScreen, setFullScreen] = useState("0px");
  const [widthC, setWidth] = useState("83.2%");
  const [marginLeftC, setMarginLeft] = useState("0px");
  const [marginTopC, setMarginTop] = useState("-51px");
  const [maximized, setMaximized] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [allLoaded, setAllLoaded] = useState(true);
  const [lastLoginCC, setLastLoginCC] = useState("");
  const [authCode, setAuthCode] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleShowPendingItems = () => {
    setShowPendingItems(true);
  };

  const handleGoBackToSummary = () => {
    setShowPendingItems(false);
  };

  useEffect(() => {
    setAuthCode(JSON.parse(localStorage.getItem("userInfo")).authorityCode);
  }, [lastLoginCC]);

  function handleSearchClickEvent(formName) {
    if (formName === "" || formName === undefined || formName === null) {
      document.getElementById("menuShortCut").required = true;
      document.getElementById("menuShortCut").focus();
      return false;
    } else {
      // const storeSystemAuditLog = async () => {
      //   await axios
      //     .post(
      //       API_SERVER + "/api/store-system-audit-logs",
      //       {
      //         user_id: JSON.parse(localStorage.getItem("userInfo")).id,
      //         page_accessed: formName,
      //         page_url: null,
      //       },
      //       { headers }
      //     )
      //     .then(function (response) {
      //       // console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // };

      // storeSystemAuditLog();

      // alert(formName);
      // if (document.getElementById("minimizeContainer")) {
      //   document.getElementById("minimizeContainer").click();
      // }
      localStorage.setItem("formName", formName);

      // navigate(item.key);

      setShowScreen(true);

      // return alert(formName);

      // setLoading(true);
      // setTimeout(() => {
      //   setGlobalModal(true);
      //   setLoading(false);
      // }, 0);
    }
  }

  const onGoButtonClick = () => {
    setWidth("83.2%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-51px");
    localStorage.setItem("formName", selectedMenuItem);
    handleSearchClickEvent(selectedMenuItem);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(year, monthIndex)
    );
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    setLastLoginCC(localStorage.getItem("lastLogin"));
  }, [lastLoginCC]);

  const alreadyDisplayed = JSON.parse(
    localStorage.getItem("userLastLoginDisplayed")
  );

  useEffect(() => {
    const date = localStorage.getItem("lastLogin")?.substr(0, 25);
    const location = localStorage.getItem("location");
    // const macAddress = localStorage.getItem("macAddress");
    const browser = localStorage.getItem("browser");
    const ipAddress = localStorage.getItem("ipAddress");

    if (allLoaded) {
      if (!alreadyDisplayed) {
        if (date !== "" && date !== null && date !== undefined) {
          Swal.fire(
            "Welcome, " + JSON.parse(localStorage.getItem("userInfo")).username,
            "Your last login was " +
              date +
              ", using the IP address " +
              ipAddress +
              ", on a " +
              browser +
              " browser.",
            "info"
          ).then((res) => {
            localStorage.setItem("userLastLoginDisplayed", true);
            setAllLoaded(false);
          });
        }
      }
    }
  }, [allLoaded, alreadyDisplayed, lastLoginCC]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart("0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const seconds = currentDate.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex fixed w-full">
      <div style={{ flex: 0.15 }}>
        <SideNavComponent isMenuVisible={isMenuVisible} />
      </div>

      <div className="w-full">
        <div>
          <TopNavComponent toggleMenu={toggleMenu} />
        </div>

        {(() => {
          let componentToRender;

          if (authCode === 99) {
            componentToRender = (
              <div
                id="bgImage"
                // style={{ overflowY: "scroll", height: "500px" }}
                className="h-[1000px] overflow-none"
                style={{
                  // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/171/045/original/colorful-watercolor-world-map-on-transparent-background-free-png.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100vh",
                  marginTop: "20px",
                  zoom: "80%", // Adjust the zoom level as needed
                }}
              >
                <MainDashboard
                  showPendingItems={showPendingItems}
                  handleShowPendingItems={handleShowPendingItems}
                  handleGoBackToSummary={handleGoBackToSummary}
                />
              </div>
            );
          } else if (authCode === 97) {
            componentToRender = (
              <div
                id="bgImage"
                // style={{ overflowY: "scroll", height: "500px" }}
                className="h-[1000px] overflow-none"
                style={{
                  // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/171/045/original/colorful-watercolor-world-map-on-transparent-background-free-png.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100vh",
                  marginTop: "20px",
                  zoom: "82%", // Adjust the zoom level as needed
                }}
              >
                <CentralApprovalDashboard
                  showPendingItems={showPendingItems}
                  handleShowPendingItems={handleShowPendingItems}
                  handleGoBackToSummary={handleGoBackToSummary}
                />
              </div>
            );
          } else if (authCode === 70) {
            componentToRender = (
              <div
                id="bgImage"
                // style={{ overflowY: "scroll", height: "500px" }}
                className="h-[1000px] overflow-none"
                style={{
                  // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/171/045/original/colorful-watercolor-world-map-on-transparent-background-free-png.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100vh",
                  marginTop: "20px",
                  zoom: "79%", // Adjust the zoom level as needed
                }}
              >
                <TellerDashboard
                  showPendingItems={showPendingItems}
                  handleShowPendingItems={handleShowPendingItems}
                  handleGoBackToSummary={handleGoBackToSummary}
                />
              </div>
            );
          } else if (authCode === 71) {
            componentToRender = (
              <div
                id="bgImage"
                // style={{ overflowY: "scroll", height: "500px" }}
                className="h-[1000px] overflow-none"
                style={{
                  // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/171/045/original/colorful-watercolor-world-map-on-transparent-background-free-png.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "auto",
                  marginTop: "20px",
                  zoom: "84%", // Adjust the zoom level as needed
                }}
              >
                <LendingDashboard
                  showPendingItems={showPendingItems}
                  handleShowPendingItems={handleShowPendingItems}
                  handleGoBackToSummary={handleGoBackToSummary}
                />
              </div>
            );
          } else {
            componentToRender = (
              <div
                id="bgImage"
                // style={{ overflowY: "scroll", height: "500px" }}
                className="h-[1000px] overflow-none"
                style={{
                  backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/010/171/045/original/colorful-watercolor-world-map-on-transparent-background-free-png.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100vh",
                  marginTop: "20px",
                  zoom: "80%", // Adjust the zoom level as needed
                }}
              >
                {/* <LendingDashboard
                  showPendingItems={showPendingItems}
                  handleShowPendingItems={handleShowPendingItems}
                  handleGoBackToSummary={handleGoBackToSummary}
                /> */}
              </div>
            );
          }

          return componentToRender;
        })()}
      </div>
    </div>
  );
}

export default Dashboard;
