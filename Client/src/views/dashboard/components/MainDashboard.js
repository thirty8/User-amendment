import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaListUl,
  FaTimes,
  FaMinus,
  FaSyncAlt,
} from "react-icons/fa";
import { Modal } from "@mantine/core";
import GraphComponent from "./Graphs";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_SERVER } from "../../../config/constant";
import Link from "antd/es/typography/Link";
import Cases from "../../screens/cases";
import {
  AiFillHome,
  AiFillStar,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineMinus,
} from "react-icons/ai";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
  RiSuitcaseFill,
  RiCheckFill,
  RiTimeFill,
  RiArrowDownFill,
  RiArrowUpFill,
  RiMoneyDollarCircleFill,
} from "react-icons/ri";

const Card = ({ color, icon, text, number }) => (
  <div
    className="card"
    style={{
      backgroundColor: color,
      padding: "10px",
      margin: "5px",
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s ease",
    }}
  >
    <span style={{ fontSize: "40px", color: "white" }}>{icon}</span>
    <h3 style={{ margin: "10px 0", color: "white" }}>{text}</h3>
    <p style={{ fontWeight: "bold", fontSize: "24px", color: "white" }}>
      {number}
    </p>
  </div>
);

// Sample data for graphs
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 150, 300, 250, 200],
      backgroundColor: "#FF6384",
      borderColor: "#FF6384",
      borderWidth: 1,
      fill: false,
    },
  ],
};

const barChartData = {
  labels: [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 100, 75, 120, 90, 150],
      backgroundColor: "#36A2EB",
      borderColor: "#36A2EB",
      borderWidth: 1,
    },
  ],
};

const pieChartData = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"],
  datasets: [
    {
      data: [30, 20, 10, 15, 25, 40],
      backgroundColor: [
        "#FFCE56",
        "#FF6384",
        "#36A2EB",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      hoverBackgroundColor: [
        "#FFCE56",
        "#FF6384",
        "#36A2EB",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    },
  ],
};

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const [menuScreens, setMenuScreens] = useState([]);
  const [showScreen, setShowScreen] = useState(false);

  const [modalSize, setModalSize] = useState("100%");
  const [fullScreen, setFullScreen] = useState("0px");
  const [widthC, setWidth] = useState("84%");
  const [marginLeftC, setMarginLeft] = useState("0px");
  const [marginTopC, setMarginTop] = useState("-65px");
  const [maximized, setMaximized] = useState(true);
  const [namesOfMinimizedModals, setNamesOfMinimizedModals] = useState(
    localStorage.getItem("namesOfMinimizedModals")
  );
  const [showMenus, setShowMenus] = useState(true);

  const [currentURL, setCurrentURL] = useState("");
  const [showPendingItems, setShowPendingItems] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(true);

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
    // navigate("?mid=" + localStorage.getItem("mid"));

    setWidth("84%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-65px");

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
          minimizedModals = minimizedModals.filter((e) => e !== closedForm);
          localStorage.setItem(
            "namesOfMinimizedModals",
            JSON.stringify(minimizedModals)
          );
        }

        setShowScreen(false);

        setNamesOfMinimizedModals(JSON.stringify(minimizedModals));
      }
    });
  }

  function closeMinimizedModal(closedForm) {
    setWidth("84%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-65px");
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

        // navigate("?mid=" + localStorage.getItem("mid"));
      } else {
        // navigate("?mid=" + localStorage.getItem("mid"));
      }
    });
  }

  function minimizedCollapsedFunc(formName) {
    // alert(formName);

    setWidth("83.2%");
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

    // navigate("?mid=" + localStorage.getItem("mid"));
  }

  function maximizeFunc() {
    setWidth("100%");
    setModalSize("100%");
    setMarginLeft("-313px");
    setMarginTop("-65px");
    setMaximized(false);
  }

  function minimizeFunc() {
    setWidth("84%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-65px");
    setMaximized(true);
  }

  useEffect(() => {
    // console.log(maximized);
    setMaximized(maximized);
  }, [maximized]);

  // useEffect(() => {
  //   document.getElementById("menuShortCut").value = "";
  // }, []);

  useEffect(() => {
    // console.log(widthC);
    setWidth(widthC);
  }, [widthC]);

  useEffect(() => {
    // console.log(showMenus);
    setShowMenus(showMenus);
  }, [showMenus]);

  // useEffect(() => {
  //   localStorage.setItem("namesOfMinimizedModals", namesOfMinimizedModals);
  //   setNamesOfMinimizedModals(namesOfMinimizedModals);
  // }, [namesOfMinimizedModals]);

  // useEffect(() => {
  //   // console.log(modalSize);
  //   setModalSize(modalSize);
  // }, [modalSize]);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth === 1528) {
      setMarginLeft("-145px");
    } else if (screenWidth === 3840) {
      setMarginLeft("-1668px");
    } else if (screenWidth === 1098) {
      setMarginLeft("-155px");
    } else if (screenWidth === 3072) {
      setMarginLeft("-1162px");
    } else if (screenWidth === 2560) {
      setMarginLeft("-823px");
    } else if (screenWidth === 2195) {
      setMarginLeft("-585px");
    } else if (screenWidth === 1920) {
      setMarginLeft("-403px");
    } else if (screenWidth === 1707) {
      setMarginLeft("-263px");
    } else if (screenWidth === 1600) {
      setMarginLeft("-192px");
    } else if (screenWidth === 1536) {
      setMarginLeft("-152px");
    } else if (screenWidth === 1563) {
      setMarginLeft("-155px");
    } else if (screenWidth === 1440) {
      setMarginLeft("-80px");
    } else if (screenWidth === 1280) {
      setMarginLeft("14px");
    } else {
      setMarginLeft("7px");
    }
  }, [marginLeftC]);

  useEffect(() => {
    // console.log(marginTopC);
    setMarginTop(marginTopC);
  }, [marginTopC]);

  function handleIconClickEvent(formName) {
    // alert(formName);
    setWidth("84%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-65px");
    setMaximized(true);
    localStorage.setItem("formName", formName);
    setShowScreen(true);

    // navigate("?mid=" + localStorage.getItem("mid"));
  }

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const user_id = userInfo?.id;
  const authCode = userInfo?.authorityCode;

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
    setWidth("99.95%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-60px");

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

  const totalItemsToApprove = 10;

  return (
    <div>
      {showScreen && (
        <div
          className="w-[82.5%] h-[100%] mt-2 mb-2"
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            height: "100%",
            marginTop: marginTopC,
            marginLeft: marginLeftC,
            zoom: "1.0.7",
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
                      minimizedCollapsedFunc(localStorage.getItem("formName"))
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
                // setFullScreen={setFullScreen}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="justify-content space-between"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingLeft: "9.5px",
          marginTop: "-10px",
          paddingRight: "9.5px",
          marginBottom: "50px",
        }}
      >
        <Card
          color="#36a2eb"
          icon={<RiSuitcaseFill />}
          text="Total Postings"
          number={235}
        />
        <Card
          color="#4bc0c0"
          icon={<RiCheckFill />}
          text="Approved Postings"
          number={182}
        />
        <Card
          color="#ff6384"
          icon={<RiTimeFill />}
          text="Pending Approvals"
          number={53}
        />
        <Card
          color="violet"
          icon={<RiArrowDownFill />}
          text="Total Debits Made"
          number={98}
        />
        <Card
          color="#9966ff"
          icon={<RiArrowUpFill />}
          text="Total Credits Made"
          number={137}
        />
        <Card
          color="#ff9f40d9"
          icon={<RiMoneyDollarCircleFill />}
          text="Total Balance"
          number={5000}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // overflowY: "scroll",
          // height: "500px",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            flex: "0 0 calc(33.33% - 0.5rem)",
            maxWidth: "calc(33.33% - 0.5rem)",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#ebf4fa",
              borderRadius: "8px",
              boxShadow:
                hoveredCard === 0
                  ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 6px rgba(0, 0, 0, 0.1)",
              marginTop: "-40px",
              padding: "3rem",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={() => handleCardHover(null)}
          >
            <h2>Daily Transaction Counts</h2>
            {/* Line Chart */}
            <Line
              data={lineChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div
          style={{
            flex: "0 0 calc(33.33% - 0.5rem)",
            maxWidth: "calc(33.33% - 0.5rem)",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#ebf4fa",
              borderRadius: "8px",
              marginTop: "-40px",
              boxShadow:
                hoveredCard === 1
                  ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "3rem",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={() => handleCardHover(null)}
          >
            <h2>Withdrawal Trends</h2>
            {/* Bar Chart */}
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div
          style={{
            flex: "0 0 calc(33.33% - 0.5rem)",
            maxWidth: "calc(33.33% - 0.5rem)",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#ebf4fa",
              borderRadius: "8px",
              marginTop: "-40px",
              boxShadow:
                hoveredCard === 2
                  ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0px 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "3rem",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={() => handleCardHover(null)}
          >
            <h2>Branch Deposits</h2>
            {/* Pie Chart */}
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* {/* <div
        id="minModal"
        className="space-x-2 flex"
        style={{
          width: "1250px",
          zoom: 1.05,
          marginLeft: "-85px",
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
      </div> */}

      <Modal
        title="List of Items to Approve"
        opened={isModalOpen}
        onClose={handleCloseModal}
        size="md"
        hideCloseButton
      >
        {/* Place your list of items here */}
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MainDashboard;

// ----------------------torsu dashboard---------------//

// import React, { useState, useEffect } from "react";
// import { Modal } from "@mantine/core";
// import swal from "sweetalert";
// import axios from "axios";
// import { API_SERVER } from "../../../config/constant";
// import Cases from "../../screens/cases";
// import {
//   AiOutlineClose,
//   AiOutlineExpand,
//   AiOutlineCompress,
//   AiOutlineMinus,
// } from "react-icons/ai";

// import { Bar, Line, Pie } from "react-chartjs-2";

// import { RiSuitcaseFill, RiCheckFill, RiTimeFill } from "react-icons/ri";
// import { ClockCircleFilled } from "@ant-design/icons";
// import { BsActivity } from "react-icons/bs";

// const Card = ({ color, icon, text, number }) => (
//   <div
//     className="card shadow items-center justify-center poppins-regular"
//     style={{
//       backgroundColor: "white",
//       padding: "10px",
//       margin: "5px",
//       flex: "1",
//       display: "flex",
//       transition: "transform 0.3s ease",
//       borderRadius: "8px",
//       gap: 4,
//     }}
//   >
//     <span
//       style={{
//         fontSize: "40px",
//         backgroundColor: color,
//         color: "white",
//         height: "50px",
//         width: "50px",
//         borderRadius: "50%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {icon}
//     </span>
//     <div className="flex flex-col space-y-3 text-center">
//       <h3 style={{ margin: "10px", color: "#2e2e2e" }}>{text}</h3>
//       <p
//         style={{ fontWeight: "bold", fontSize: "24px", color: "#2e2e2e" }}
//         className="poppins-regular"
//       >
//         {number}
//       </p>
//     </div>
//   </div>
// );

// // Sample data for graphs
// const lineChartData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [100, 200, 150, 300, 250, 200],
//       backgroundColor: "#FF6384",
//       borderColor: "#FF6384",
//       borderWidth: 1,
//       fill: false,
//     },
//   ],
// };

// const barChartData = {
//   labels: [
//     "Category 1",
//     "Category 2",
//     "Category 3",
//     "Category 4",
//     "Category 5",
//     "Category 6",
//   ],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [50, 100, 75, 120, 90, 150],
//       backgroundColor: "#36A2EB",
//       borderColor: "#36A2EB",
//       borderWidth: 1,
//     },
//   ],
// };

// const pieChartData = {
//   labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"],
//   datasets: [
//     {
//       data: [30, 20, 10, 15, 25, 40],
//       backgroundColor: [
//         "#FFCE56",
//         "#FF6384",
//         "#36A2EB",
//         "#4BC0C0",
//         "#9966FF",
//         "#FF9F40",
//       ],
//       hoverBackgroundColor: [
//         "#FFCE56",
//         "#FF6384",
//         "#36A2EB",
//         "#4BC0C0",
//         "#9966FF",
//         "#FF9F40",
//       ],
//     },
//   ],
// };

// const headers = {
//   "x-api-key":
//     "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//   "Content-Type": "application/json",
// };

// const MainDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const [hoveredCard, setHoveredCard] = useState(null);

//   const handleCardHover = (index) => {
//     setHoveredCard(index);
//   };

//   const [menuScreens, setMenuScreens] = useState([]);
//   const [showScreen, setShowScreen] = useState(false);

//   const [modalSize, setModalSize] = useState("100%");
//   const [widthC, setWidth] = useState("84%");
//   const [marginLeftC, setMarginLeft] = useState("0px");
//   const [marginTopC, setMarginTop] = useState("-65px");
//   const [maximized, setMaximized] = useState(true);
//   const [namesOfMinimizedModals, setNamesOfMinimizedModals] = useState(
//     localStorage.getItem("namesOfMinimizedModals")
//   );
//   const [showMenus, setShowMenus] = useState(true);

//   function closeModalFunc() {
//     // navigate("?mid=" + localStorage.getItem("mid"));

//     setWidth("84%");
//     setModalSize("100%");
//     setMarginLeft("0px");
//     setMarginTop("-65px");

//     const closedForm = localStorage.getItem("formName");

//     swal({
//       title: "Are you sure?",
//       text: "You're about to close the '" + closedForm + "' form",
//       icon: "warning",
//       buttons: ["Cancel", "Yes, Close Form"],
//       dangerMode: true,
//     }).then((result) => {
//       if (result) {
//         var minimizedModals = [];
//         if (localStorage.getItem("namesOfMinimizedModals")) {
//           minimizedModals = JSON.parse(
//             localStorage.getItem("namesOfMinimizedModals")
//           );
//           minimizedModals = minimizedModals.filter((e) => e !== closedForm);
//           localStorage.setItem(
//             "namesOfMinimizedModals",
//             JSON.stringify(minimizedModals)
//           );
//         }

//         setShowScreen(false);

//         setNamesOfMinimizedModals(JSON.stringify(minimizedModals));
//       }
//     });
//   }

//   function minimizedCollapsedFunc(formName) {
//     // alert(formName);

//     setWidth("83.2%");
//     setModalSize("100%");
//     setMarginLeft("0px");
//     setMarginTop("-51px");
//     setMaximized(true);

//     var namesOfMinimizedModals = [];
//     namesOfMinimizedModals = localStorage.getItem("namesOfMinimizedModals");
//     var nameOfForm = localStorage.getItem("formName");

//     if (namesOfMinimizedModals !== null) {
//       if (!namesOfMinimizedModals.includes(nameOfForm)) {
//         var minimizedModals = [];

//         minimizedModals.push(namesOfMinimizedModals);
//         minimizedModals.push(nameOfForm);

//         localStorage.setItem(
//           "namesOfMinimizedModals",
//           JSON.stringify(minimizedModals.filter((e) => e !== "[]"))
//         );

//         setNamesOfMinimizedModals(
//           JSON.stringify(minimizedModals.filter((e) => e !== "[]"))
//         );
//       }
//     } else {
//       localStorage.setItem(
//         "namesOfMinimizedModals",
//         JSON.stringify(nameOfForm)
//       );
//     }

//     if (localStorage.getItem("namesOfMinimizedModals")) {
//       var minModal = localStorage
//         .getItem("namesOfMinimizedModals")
//         .replace(/\\/g, "")
//         .replace(/"/g, "")
//         .replace(/[\[\]']+/g, "");

//       minModal = minModal.split(",");

//       localStorage.setItem("namesOfMinimizedModals", JSON.stringify(minModal));

//       setNamesOfMinimizedModals(JSON.stringify(minModal));
//       setShowMenus(true);
//     }

//     // Close Form
//     setShowScreen(false);

//     // navigate("?mid=" + localStorage.getItem("mid"));
//   }

//   function maximizeFunc() {
//     setWidth("100%");
//     setModalSize("100%");
//     setMarginLeft("-313px");
//     setMarginTop("-65px");
//     setMaximized(false);
//   }

//   function minimizeFunc() {
//     setWidth("84%");
//     setModalSize("100%");
//     setMarginLeft("0px");
//     setMarginTop("-65px");
//     setMaximized(true);
//   }

//   useEffect(() => {
//     // console.log(maximized);
//     setMaximized(maximized);
//   }, [maximized]);

//   // useEffect(() => {
//   //   document.getElementById("menuShortCut").value = "";
//   // }, []);

//   useEffect(() => {
//     // console.log(widthC);
//     setWidth(widthC);
//   }, [widthC]);

//   useEffect(() => {
//     // console.log(showMenus);
//     setShowMenus(showMenus);
//   }, [showMenus]);

//   // useEffect(() => {
//   //   localStorage.setItem("namesOfMinimizedModals", namesOfMinimizedModals);
//   //   setNamesOfMinimizedModals(namesOfMinimizedModals);
//   // }, [namesOfMinimizedModals]);

//   // useEffect(() => {
//   //   // console.log(modalSize);
//   //   setModalSize(modalSize);
//   // }, [modalSize]);

//   useEffect(() => {
//     const screenWidth = window.innerWidth;

//     if (screenWidth === 1528) {
//       setMarginLeft("-145px");
//     } else if (screenWidth === 3840) {
//       setMarginLeft("-1668px");
//     } else if (screenWidth === 1098) {
//       setMarginLeft("-155px");
//     } else if (screenWidth === 3072) {
//       setMarginLeft("-1162px");
//     } else if (screenWidth === 2560) {
//       setMarginLeft("-823px");
//     } else if (screenWidth === 2195) {
//       setMarginLeft("-585px");
//     } else if (screenWidth === 1920) {
//       setMarginLeft("-403px");
//     } else if (screenWidth === 1707) {
//       setMarginLeft("-263px");
//     } else if (screenWidth === 1600) {
//       setMarginLeft("-192px");
//     } else if (screenWidth === 1536) {
//       setMarginLeft("-152px");
//     } else if (screenWidth === 1563) {
//       setMarginLeft("-155px");
//     } else if (screenWidth === 1440) {
//       setMarginLeft("-80px");
//     } else if (screenWidth === 1280) {
//       setMarginLeft("14px");
//     } else {
//       setMarginLeft("7px");
//     }
//   }, [marginLeftC]);

//   useEffect(() => {
//     // console.log(marginTopC);
//     setMarginTop(marginTopC);
//   }, [marginTopC]);

//   const userInfoString = localStorage.getItem("userInfo");
//   const userInfo = JSON.parse(userInfoString);

//   const user_id = userInfo?.id;
//   const authCode = userInfo?.authorityCode;

//   const currentURLWithQueryParams = window.location.search;
//   useEffect(() => {
//     axios
//       .post(
//         API_SERVER + "/api/get-menu-urls-icons-twene",
//         {
//           menu_id: currentURLWithQueryParams.split("=")[1],
//           userID: user_id,
//           authorityCode: authCode,
//         },
//         { headers }
//       )
//       .then((result) => {
//         localStorage.setItem("menuIcons", result.data);
//         setMenuScreens(result.data);
//       });
//   }, [currentURLWithQueryParams]);

//   useEffect(() => {
//     setWidth("99.95%");
//     setModalSize("100%");
//     setMarginLeft("0px");
//     setMarginTop("-60px");

//     const currURL = window.location.href;
//     const url = new URL(currURL);
//     const searchParams = new URLSearchParams(url.search);
//     const midValue = searchParams.get("mid");

//     if (midValue) {
//       localStorage.setItem("mid", midValue);
//     }
//   }, [currentURLWithQueryParams]);

//   return (
//     <div className="flex flex-1 px-4 gap-3">
//       <div className="flex-[0.75]">
//         {showScreen && (
//           <div
//             className="w-[82.5%] h-[100%] mt-2 mb-2"
//             style={{
//               position: "absolute",
//               backgroundColor: "#fff",
//               height: "100%",
//               marginTop: marginTopC,
//               marginLeft: marginLeftC,
//               zoom: "1.0.7",
//               zIndex: 10,
//               overflowY: "auto",
//               overflowX: "hidden", // Added to prevent horizontal scrollbar
//               width: widthC,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   height: "25px",
//                   display: "flex",
//                   zIndex: 10,
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//                 className="bg-white"
//               >
//                 <span className="ml-2 text-white font-bold">
//                   {localStorage.getItem("formName")}
//                 </span>

//                 <div className="flex flex-row mr-2">
//                   <span className="mr-2">
//                     <AiOutlineMinus
//                       className="hover:cursor-pointer"
//                       color="white"
//                       onClick={() =>
//                         minimizedCollapsedFunc(localStorage.getItem("formName"))
//                       }
//                     />
//                   </span>
//                   <span className="mr-2">
//                     {(() => {
//                       if (maximized) {
//                         return (
//                           <AiOutlineExpand
//                             className="hover:cursor-pointer"
//                             color="white"
//                             onClick={() => maximizeFunc()}
//                           />
//                         );
//                       } else {
//                         return (
//                           <AiOutlineCompress
//                             className="hover:cursor-pointer"
//                             color="white"
//                             onClick={() => minimizeFunc()}
//                           />
//                         );
//                       }
//                     })()}
//                   </span>
//                   <span>
//                     <AiOutlineClose
//                       className="hover:cursor-pointer"
//                       color="white"
//                       id="exitBTN1"
//                       onClick={() => closeModalFunc()}
//                     />
//                   </span>
//                 </div>
//               </div>

//               <div style={{ width: modalSize }} className="p-3">
//                 <Cases
//                   setModalSize={setModalSize}
//                   // setFullScreen={setFullScreen}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         <div
//           className="justify-content space-between"
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             paddingLeft: "9.5px",
//             paddingRight: "9.5px",
//             marginBottom: "50px",
//           }}
//         >
//           <Card
//             color="#36a2eb"
//             icon={<RiSuitcaseFill size={25} />}
//             text="Total Postings"
//             number={235}
//           />
//           <Card
//             color="#4bc0c0"
//             icon={<RiCheckFill size={25} />}
//             text="Approved Postings"
//             number={182}
//           />
//           <Card
//             color="#ff6384"
//             icon={<RiTimeFill size={25} />}
//             text="Pending Approvals"
//             number={53}
//           />
//         </div>
//       </div>

//       <div className="flex-[0.25] shadow bg-white rounded-md capitalize text-[#0063d1] text-lg">
//         <div className="flex items-center p-3">
//           <BsActivity />
//           <p className="ml-2 poppins-regular">last activities</p>
//         </div>
//       </div>

//       <Modal
//         title="List of Items to Approve"
//         opened={isModalOpen}
//         onClose={handleCloseModal}
//         size="md"
//         hideCloseButton
//       >
//         {/* Place your list of items here */}
//         <button onClick={handleCloseModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default MainDashboard;
