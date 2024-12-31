import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import SideNavComponent from "../../components/SideNavComponent";
import TopNavComponent from "../../components/TopNavComponent";
import FinanceDashboard from "../dashboard/components/FinanceDashboard";
import LendingDashboard from "../dashboard/components/LendingDashboard";
import BranchManagersDashboard from "../dashboard/components/BranchMangersDashboard";
import TellerDashboard from "../dashboard/components/TellerDashboard";
import CustomerServiceDashboard from "../dashboard/components/CustomerServiceDashboard";
import MainDashboard from "../dashboard/components/MainDashboard";
import CentralApprovalDashboard from "../dashboard/components/CentralApprovalDashboard";
import Swal from "sweetalert2";
// import { RelationProvider } from "./contextapi/RelationContext.js";

import {
  AiFillHome,
  AiFillStar,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineMinus,
} from "react-icons/ai";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";
import Cases from "./cases";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import VaultCustodianDashboard from "../dashboard/components/VaultCustodianDashboard";
import { RelationProvider } from "./contextapi/RelationContext";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function Screens() {
  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/") {
      document.title = "Dashboard | COOPTECH";
    } else {
      const pageName = path
        .substring(path.lastIndexOf("/") + 1)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (match) => match.toUpperCase());
      document.title = pageName + " | COOPTECH";
    }
  }, [window.location.pathname]);

  const [menuScreens, setMenuScreens] = useState([]);

  const [authorityCode, setAuthCode] = useState(null);
  const [showScreen, setShowScreen] = useState(false);
  const [allLoaded, setAllLoaded] = useState(true);

  const [modalSize, setModalSize] = useState("100%");
  const [fullScreen, setFullScreen] = useState("0px");
  const [widthC, setWidth] = useState("");
  const [marginLeftC, setMarginLeft] = useState("0px");
  const [marginTopC, setMarginTop] = useState("-50px");
  const [maximized, setMaximized] = useState(true);
  const [namesOfMinimizedModals, setNamesOfMinimizedModals] = useState(
    localStorage.getItem("namesOfMinimizedModals")
  );
  const [showMenus, setShowMenus] = useState(true);

  const [currentURL, setCurrentURL] = useState("");
  const [showPendingItems, setShowPendingItems] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(true);

  const [mmMarginLeft, setMMMarginLeft] = useState("");
  const [customZoom, setCustomZoom] = useState("");

  const [lastLoginCC, setLastLoginCC] = useState("");

  useEffect(() => {
    setLastLoginCC(localStorage.getItem("lastLogin"));
  }, [lastLoginCC]);

  useEffect(() => {
    setAuthCode(JSON.parse(localStorage.getItem("userInfo")).authorityCode);
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

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleShowPendingItems = () => {
    setShowPendingItems(true);
  };

  const handleGoBackToSummary = () => {
    setShowPendingItems(false);
  };

  function closeModalFunc() {
    navigate("?mid=" + localStorage.getItem("mid"));

    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-50px");

    const closedForm = localStorage.getItem("formName");

    swal({
      title: "Are you sure?",
      text: "You're about to close the '" + closedForm + "' form",
      icon: "warning",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        var minimizedModals = [];
        if (localStorage.getItem("namesOfMinimizedModals")) {
          minimizedModals = JSON.parse(
            localStorage.getItem("namesOfMinimizedModals")
          );
          if (localStorage.getItem("namesOfMinimizedModals")) {
            minimizedModals = minimizedModals.filter((e) => e !== closedForm);
            localStorage.setItem(
              "namesOfMinimizedModals",
              JSON.stringify(minimizedModals)
            );
          }
        }

        setShowScreen(false);

        setNamesOfMinimizedModals(JSON.stringify(minimizedModals));
      }
    });
  }

  function closeMinimizedModal(closedForm) {
    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-50px");
    setMaximized(true);

    swal({
      title: "Are you sure?",
      text: "You're about to close the '" + closedForm + "' form",
      icon: "warning",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        var minimizedModals = [];
        if (localStorage.getItem("namesOfMinimizedModals")) {
          minimizedModals = JSON.parse(
            localStorage.getItem("namesOfMinimizedModals")
          );
          minimizedModals = minimizedModals.filter((e) => e !== closedForm);
          localStorage.setItem(
            "namesOfMinimizedModals",
            JSON.stringify(minimizedModals)
          );
        }

        setShowScreen(false);

        setNamesOfMinimizedModals(JSON.stringify(minimizedModals));

        navigate("?mid=" + localStorage.getItem("mid"));
      } else {
        navigate("?mid=" + localStorage.getItem("mid"));
      }
    });
  }

  function minimizedCollapsedFunc(formName) {
    // alert(formName);

    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-51px");
    setMaximized(true);

    var namesOfMinimizedModals = [];
    namesOfMinimizedModals = localStorage.getItem("namesOfMinimizedModals");
    var nameOfForm = localStorage.getItem("formName");

    if (namesOfMinimizedModals !== null) {
      if (!namesOfMinimizedModals.includes(nameOfForm)) {
        var minimizedModals = [];

        minimizedModals.push(namesOfMinimizedModals);
        minimizedModals.push(nameOfForm);

        localStorage.setItem(
          "namesOfMinimizedModals",
          JSON.stringify(minimizedModals.filter((e) => e !== "[]"))
        );

        setNamesOfMinimizedModals(
          JSON.stringify(minimizedModals.filter((e) => e !== "[]"))
        );
      }
    } else {
      localStorage.setItem(
        "namesOfMinimizedModals",
        JSON.stringify(nameOfForm)
      );
    }

    if (localStorage.getItem("namesOfMinimizedModals")) {
      var minModal = localStorage
        .getItem("namesOfMinimizedModals")
        .replace(/\\/g, "")
        .replace(/"/g, "")
        .replace(/[\[\]']+/g, "");

      minModal = minModal.split(",");

      localStorage.setItem("namesOfMinimizedModals", JSON.stringify(minModal));

      setNamesOfMinimizedModals(JSON.stringify(minModal));
      setShowMenus(true);
    }

    // Close Form
    setShowScreen(false);

    navigate("?mid=" + localStorage.getItem("mid"));
  }

  function maximizeFunc() {
    setWidth("100.1%");
    setModalSize("100%");
    setMarginLeft("-283px");
    setMarginTop("-50px");
    setMaximized(false);
  }

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const user_id = userInfo?.id;
  const authCode = userInfo?.authorityCode;

  function minimizeFunc() {
    // setWidth("83.7%");

    const screenWidth = window.innerWidth;

    if (screenWidth === 3840) {
      setWidth("93.2%");
    } else if (screenWidth === 3072) {
      setWidth("91.5%");
    } else if (screenWidth === 2560) {
      setWidth("90%");
    } else if (screenWidth === 2195) {
      setWidth("88.2%");
    } else if (screenWidth === 1920) {
      setWidth("86.5%");
    } else if (screenWidth === 1707) {
      setWidth("85%");
    } else if (screenWidth === 1600) {
      setWidth("84.5%");
    } else if (screenWidth === 1536) {
      setWidth("83.7%");
    } else if (screenWidth === 1563) {
      setWidth("83.3%");
    } else if (screenWidth === 1488) {
      setWidth("83.2%");
    } else if (screenWidth === 1440) {
      setWidth("82.8%");
    } else if (screenWidth === 1280) {
      setWidth("80.4%");
    } else if (screenWidth === 1528) {
      setWidth("83.6%");
    } else if (screenWidth === 1098) {
      setWidth("77%");
    } else {
      setWidth("83.7%");
    }

    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-50px");
    setMaximized(true);
  }

  useEffect(() => {
    // console.log(maximized);
    setMaximized(maximized);
  }, [maximized]);

  useEffect(() => {
    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-50px");
  }, [showScreen]);

  // useEffect(() => {
  //   document.getElementById("menuShortCut").value = "";
  // }, []);

  useEffect(() => {
    // console.log(widthC);
    setWidth(widthC);
  }, [widthC]);

  // Calculate the initial width based on the screen resolution
  function calculateScreenWidth() {
    const screenWidth = window.innerWidth;

    // alert(screenWidth);

    if (screenWidth === 3840) {
      setCustomZoom("210%");
      setMMMarginLeft("-1668px");
      return "93.2%";
    } else if (screenWidth === 3072) {
      setCustomZoom("172%");
      setMMMarginLeft("-1162px");
      return "91.5%";
    } else if (screenWidth === 2560) {
      setCustomZoom("140%");
      setMMMarginLeft("-823px");
      return "90%";
    } else if (screenWidth === 2195) {
      setCustomZoom("118%");
      setMMMarginLeft("-585px");
      return "88.2%";
    } else if (screenWidth === 1920) {
      setCustomZoom("101%");
      setMMMarginLeft("-403px");
      return "86.5%";
    } else if (screenWidth === 1707) {
      setCustomZoom("88%");
      setMMMarginLeft("-263px");
      return "85%";
    } else if (screenWidth === 1600) {
      setCustomZoom("82%");
      setMMMarginLeft("-192px");
      console.log("Custom Large Screen", screenWidth);
      return "84.5%";
    } else if (screenWidth === 1536) {
      setCustomZoom("78%");
      setMMMarginLeft("-152px");
      return "83.7%";
    } else if (screenWidth === 1563) {
      setCustomZoom("65%");
      setMMMarginLeft("-155px");
      console.log("Torsu - Macbook", screenWidth);
      return "83.3%";
    } else if (screenWidth === 1488) {
      setCustomZoom("75%");
      setMMMarginLeft("-122px");
      return "83.2%";
    } else if (screenWidth === 1440) {
      setCustomZoom("70%");
      setMMMarginLeft("-80px");
      console.log("Torsu - Macbook", screenWidth);
      return "82.8%";
    } else if (screenWidth === 1280) {
      setCustomZoom("62%");
      setMMMarginLeft("14px");
      console.log("Charway - Macbook", screenWidth);
      return "80.2%";
    } else {
      setCustomZoom("76%");
      setMMMarginLeft("-80px");
      console.log("Smaller Laptop", screenWidth);
      return "83.7%";
    }
  }

  // Update the width when the window is resized
  function handleResize() {
    setWidth(calculateScreenWidth());
  }

  // Attach the event listener when the component mounts
  useEffect(() => {
    // Initial calculation
    setWidth(calculateScreenWidth());

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // console.log(showMenus);
    setShowMenus(showMenus);
  }, [showMenus]);

  // aaaaaa
  // useEffect(() => {
  //   localStorage.setItem("namesOfMinimizedModals", namesOfMinimizedModals);
  //   setNamesOfMinimizedModals(namesOfMinimizedModals);
  // }, [namesOfMinimizedModals]);

  // useEffect(() => {
  //   // console.log(modalSize);
  //   setModalSize(modalSize);
  // }, [modalSize]);

  useEffect(() => {
    // console.log(marginLeftC);
    setMarginLeft(marginLeftC);
  }, [marginLeftC]);

  useEffect(() => {
    // console.log(marginTopC);
    setMarginTop(marginTopC);
  }, [marginTopC]);

  function handleIconClickEvent(formName) {
    // alert(formName);
    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-50px");
    setMaximized(true);
    localStorage.setItem("formName", formName);
    setShowScreen(true);

    navigate("?mid=" + localStorage.getItem("mid"));
  }

  const currentURLWithQueryParams = window.location.search;
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menu-urls-icons-twene",
        {
          menu_id: currentURLWithQueryParams.split("=")[1],
          userID: user_id,
          authorityCode: authCode,
        },
        { headers }
      )
      .then((result) => {
        localStorage.setItem("menuIcons", result.data);
        setMenuScreens(result.data);
      });
  }, [currentURLWithQueryParams]);

  useEffect(() => {
    // setWidth("99.95%");
    // setModalSize("100%");
    // setMarginLeft("0px");
    // setMarginTop("-50px");

    const currURL = window.location.href;
    const url = new URL(currURL);
    const searchParams = new URLSearchParams(url.search);
    const midValue = searchParams.get("mid");

    if (midValue) {
      localStorage.setItem("mid", midValue);
    }
  }, [currentURLWithQueryParams]);

  async function handleImageError(ev) {
    ev.target.src = "/assets/menu-icons/no-image.png";
  }

  return (
    <RelationProvider>
      <div className="flex fixed w-full">
        <div style={{ flex: 0.15 }}>
          <SideNavComponent isMenuVisible={isMenuVisible} />
        </div>

        <div className="w-full">
          <div>
            <TopNavComponent toggleMenu={toggleMenu} />
          </div>
          {showScreen && (
            <div
              className="h-[100%] mt-2 mb-2"
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                height: "100%",
                marginTop: marginTopC,
                marginLeft: marginLeftC,
                zoom: "0.885",
                zIndex: 10,
                overflowY: "auto",
                overflowX: "hidden", // Added to prevent horizontal scrollbar
                width: widthC,
              }}
            >
              <div>
                <div
                  style={{
                    height: "25px",
                    display: "flex",
                    zIndex: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="bg-sky-700"
                >
                  <span className="ml-2 text-white font-bold">
                    {localStorage.getItem("formName")}
                  </span>

                  <div className="flex flex-row mr-2">
                    <span className="mr-2">
                      <AiOutlineMinus
                        className="hover:cursor-pointer"
                        color="white"
                        onClick={() =>
                          minimizedCollapsedFunc(
                            localStorage.getItem("formName")
                          )
                        }
                      />
                    </span>
                    <span className="mr-2">
                      {(() => {
                        if (maximized) {
                          return (
                            <AiOutlineExpand
                              className="hover:cursor-pointer"
                              color="white"
                              onClick={() => maximizeFunc()}
                            />
                          );
                        } else {
                          return (
                            <AiOutlineCompress
                              className="hover:cursor-pointer"
                              color="white"
                              onClick={() => minimizeFunc()}
                            />
                          );
                        }
                      })()}
                    </span>
                    <span>
                      <AiOutlineClose
                        className="hover:cursor-pointer"
                        color="white"
                        id="exitBTN1"
                        onClick={() => closeModalFunc()}
                      />
                    </span>
                  </div>
                </div>

                <div style={{ width: modalSize }} className="p-3">
                  <Cases
                    setModalSize={setModalSize}
                    setShowScreen={setShowScreen}
                    // setFullScreen={setFullScreen}
                  />
                </div>
              </div>
            </div>
          )}

          {menuScreens.length > 0 ? (
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
              <div
                className="flex flex-wrap gap-2"
                style={{ paddingBottom: "1000px" }}
              >
                <>
                  {menuScreens.map((screen, index) => (
                    <>
                      <div
                        style={{
                          paddingLeft: "15px",
                          paddingRight: "60px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          zoom: "0.85",
                        }}
                        className="flex items-center text-center"
                      >
                        <div
                          className="parent-div"
                          style={{ width: "120px" }}
                          key={index}
                        >
                          <div
                            style={{
                              background: "transparent",
                              height: "190px",
                              width: "170px",
                            }}
                            className="card p-4 rounded-md shadow-lg w-40 hover:cursor-pointer flex flex-col items-center"
                            onClick={() => {
                              localStorage.setItem(
                                "formName",
                                `${screen.menu_name}`
                              );
                              // setWidth("83.7%");
                              setModalSize("100%");
                              setMarginLeft("0px");
                              setMarginTop("-50px");
                              setShowScreen(true);
                            }}
                          >
                            <div className="flex items-center justify-center h-20">
                              <div
                                className="flex items-center justify-center h-13 w-13 p-7 text-2xl text-gray-800"
                                onClick={() =>
                                  console.log(
                                    "Image:::",
                                    screen.menu_name
                                      .replaceAll(" ", "-")
                                      .toLowerCase()
                                  )
                                }
                              >
                                <img
                                  src={`${
                                    "/assets/menu-icons/" +
                                    screen.menu_name
                                      .replaceAll(" ", "-")
                                      .toLowerCase()
                                  }.png`}
                                  onError={(ev) => handleImageError(ev)}
                                  alt=""
                                  style={{ width: "70px", height: "auto" }}
                                />
                              </div>
                            </div>
                            <div className="p-2">
                              <span
                                className="text-center whitespace-normal text-[17px]"
                                style={{
                                  fontWeight: "bolder",
                                  color: "#0369a1",
                                  overflow: "hidden",
                                  display: "inline-block",
                                }}
                              >
                                {screen.menu_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              </div>

              {/* {menuScreens.map((screen,index)=>(
          <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <div class="bg-white rounded-lg shadow-md" >
            <img class="w-full h-40 object-cover object-center rounded-t-md" src="{item.image_url}" alt="Card image" />
          </div>
          <div class="p-2">
            <h4 class="text-[13px] text-center font-semibold">{screen.menu_name}</h4>
          </div>
        </div>
      ))} */}
              {showScreen && (
                <div
                  className="h-[100%] mt-2 mb-2"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    height: "100%",
                    marginTop: marginTopC,
                    marginLeft: marginLeftC,
                    zoom: "1.3",
                    zIndex: 10,
                    overflowY: "auto",
                    overflowX: "hidden", // Added to prevent horizontal scrollbar
                    width: widthC,
                  }}
                >
                  <div>
                    <div
                      style={{
                        height: "25px",
                        display: "flex",
                        zIndex: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      className="bg-sky-700"
                    >
                      <span className="ml-2 text-white font-bold">
                        {localStorage.getItem("formName")}
                      </span>

                      <div className="flex flex-row mr-2">
                        <span className="mr-2">
                          <AiOutlineMinus
                            className="hover:cursor-pointer"
                            color="white"
                            onClick={() =>
                              minimizedCollapsedFunc(
                                localStorage.getItem("formName")
                              )
                            }
                          />
                        </span>
                        <span className="mr-2">
                          {(() => {
                            if (maximized) {
                              return (
                                <AiOutlineExpand
                                  className="hover:cursor-pointer"
                                  color="white"
                                  onClick={() => maximizeFunc()}
                                />
                              );
                            } else {
                              return (
                                <AiOutlineCompress
                                  className="hover:cursor-pointer"
                                  color="white"
                                  onClick={() => minimizeFunc()}
                                />
                              );
                            }
                          })()}
                        </span>
                        <span>
                          <AiOutlineClose
                            className="hover:cursor-pointer"
                            color="white"
                            id="exitBTN1"
                            onClick={() => closeModalFunc()}
                          />
                        </span>
                      </div>
                    </div>

                    <div style={{ width: modalSize }} className="p-3">
                      <Cases
                        setModalSize={setModalSize}
                        setShowScreen={setShowScreen}
                        // setFullScreen={setFullScreen}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                id="minModal"
                className="space-x-2 flex"
                style={{
                  width: "1250px",
                  zoom: 0.95,
                  marginLeft: mmMarginLeft,
                  position: "fixed",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: "0",
                }}
              >
                {(() => {
                  var temp = [];
                  var minimizedModals = JSON.parse(namesOfMinimizedModals);

                  if (minimizedModals) {
                    // Remove both "null" and null values from minimizedModals
                    minimizedModals = minimizedModals.filter(
                      (value) => value !== null && value !== "null"
                    );

                    for (let i = 0; i < minimizedModals.length; i++) {
                      const minimizedModal = minimizedModals[i];

                      temp.push(
                        <Link
                          to="#"
                          key={JSON.stringify(i)}
                          id={minimizedModal.toLowerCase().replace(/\s/g, "")}
                          style={{
                            color: "grey",
                            marginLeft: "109px",
                            marginRight: "-102px",
                            zIndex: 99999999999999999999,
                          }}
                        >
                          <div className="mr-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                            <div
                              style={{
                                overflow: "hidden",
                                marginBottom: "-10px",
                              }}
                              className="flex"
                            >
                              <AiOutlineExpand
                                onClick={() => {
                                  handleIconClickEvent(minimizedModal);
                                }}
                                className="maximizeBTN h-6 w-6 mt-3 mr-2.5 bg-blue-500 rounded text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                              />
                              <AiOutlineClose
                                onClick={function () {
                                  closeMinimizedModal(minimizedModal);
                                }}
                                className="closeBTN h-6 w-6 mt-3 bg-red-500 rounded text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                              />
                            </div>
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                background: "#f5f5f582",
                                color: "black",
                                paddingTop: "13px",
                                paddingBottom: "7px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                              className="mr-1 rounded-t-md border border-gray-200 shadow-xl"
                            >
                              {minimizedModal}
                            </div>
                          </div>
                        </Link>
                      );
                    }

                    return temp;
                  }
                })()}
              </div>
            </div>
          ) : (
            <>
              {(() => {
                let componentToRender;

                if (authorityCode === 99) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <MainDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 97) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <CentralApprovalDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 67) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <CustomerServiceDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 68) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <FinanceDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 69) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <VaultCustodianDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 70) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
                      }}
                    >
                      <TellerDashboard
                        showPendingItems={showPendingItems}
                        handleShowPendingItems={handleShowPendingItems}
                        handleGoBackToSummary={handleGoBackToSummary}
                      />
                    </div>
                  );
                } else if (authorityCode === 71) {
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
                        zoom: customZoom, // Adjust the zoom level as needed
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
                        zoom: customZoom, // Adjust the zoom level as needed
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
            </>
          )}
        </div>
      </div>
    </RelationProvider>
  );
}

export default Screens;
