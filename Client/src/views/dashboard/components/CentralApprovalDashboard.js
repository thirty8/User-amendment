import React, {useState, useEffect} from "react";
import { Bar, Pie, Doughnut, PolarArea } from "react-chartjs-2";
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
import swal from "sweetalert";
import axios from "axios";
import { API_SERVER } from "../../../config/constant";

const ApproverDashboard = () => {

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

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
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
     // console.log(marginLeftC);
     setMarginLeft(marginLeftC);
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


  // Sample data for graphs
  const barChartData = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    datasets: [
      {
        label: "Approvals by Category",
        data: [80, 90, 75, 60, 85],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#FF6347", "#FFA500", "#90EE90"],
      },
    ],
  };

  const polarAreaChartData = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    datasets: [
      {
        label: "Application Categories",
        data: [120, 80, 60, 100, 90],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
        ],
      },
    ],
  };

  const numGraphs = 4; // Number of graphs in the row
  const graphWidthPercent = 100 / numGraphs;

  const cards1 = [
    { title: "Total Approvals", icon: "👍", value: 250, color: "bg-blue-300" },
    {
      title: "Pending Approvals",
      icon: "⌛",
      value: 30,
      color: "bg-yellow-300",
    },
    { title: "Review Approvals", icon: "🔍", value: 15, color: "bg-green-300" },
    {
      title: "Approved Applications",
      icon: "✅",
      value: 200,
      color: "bg-green-300",
    },
    {
      title: "Rejected Applications",
      icon: "❌",
      value: 20,
      color: "bg-red-300",
    },
    { title: "High Priority", icon: "🔴", value: 45, color: "bg-red-300" },
  ];

   const cards2 = [
     {
       title: "Pending Requests",
       icon: "⏳",
       value: 20,
       color: "bg-yellow-300",
     },
     {
       title: "Total Requests",
       icon: "📊",
       value: 150,
       color: "bg-purple-300",
     },
     {
       title: "Reviewed Requests",
       icon: "📋",
       value: 100,
       color: "bg-green-300",
     },
     {
       title: "High Priority Requests",
       icon: "🚀",
       value: 25,
       color: "bg-red-300",
     },
     {
       title: "Approved Requests",
       icon: "✔️",
       value: 130,
       color: "bg-green-300",
     },
     { title: "Rejected Requests", icon: "❌", value: 10, color: "bg-red-300" },
   ];

  return (
    <>
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
      <div className="flex flex-col items-center p-4 -mt-5">
        <div className="flex justify-between space-x-4 mb-4 w-full">
          {cards1.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        <div className="flex w-full space-x-4">
          <ChartCard title="Approvals by Category" width={graphWidthPercent}>
            <Bar
              data={barChartData}
              options={{ maintainAspectRatio: false, height: 400 }}
            />
          </ChartCard>
          <ChartCard title="Approval Status" width={graphWidthPercent}>
            <Pie
              data={pieChartData}
              options={{ maintainAspectRatio: false, height: 400 }}
            />
          </ChartCard>
          <ChartCard title="Priority Distribution" width={graphWidthPercent}>
            <Doughnut
              data={doughnutChartData}
              options={{ maintainAspectRatio: false, height: 400 }}
            />
          </ChartCard>
          <ChartCard title="Application Categories" width={graphWidthPercent}>
            <PolarArea
              data={polarAreaChartData}
              options={{ maintainAspectRatio: false, height: 400 }}
            />
          </ChartCard>
        </div>

        {/* <div className="flex justify-between space-x-4 mb-4 w-full">
        {cards2.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div> */}
      </div>
    </>
  );
};

const Card = ({ title, icon, value }) => (
  <div className="bg-[#ffffffa1] rounded-lg shadow-md p-4 text-center w-1/4">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-xl font-semibold mb-1" style={{ color: "black", fontWeight: "normal", fontSize: "17px" }}>{title}</div>
    <div className="text-lg">{value}</div>
  </div>
);

const ChartCard = ({ title, children, width }) => (
  <div
    className="bg-[#ffffffa1] rounded-lg shadow-md p-4 mb-4 w-1/4"
    style={{ width: `${width}%` }}
  >
    <div className="text-xl font-semibold mb-2" style={{ color: "black", fontWeight: "normal", fontSize: "17px" }}>
      {title}
    </div>
    <div className="chart-container">{children}</div>
  </div>
);

export default ApproverDashboard;
