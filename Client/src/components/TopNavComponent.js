import React, { useState, useEffect, useRef, useContext } from "react";
import { globalContext } from "../App";
import usg from "../assets/usg.jpeg";
import TopNavOption from "./TopNavOption";
import Member360 from "../views/screens/account-activities/account-enquiry/components/member360";
import Customer360 from "../views/screens/account-activities/account-enquiry/components/customer360";
import DocumentCapture from "./DocumentCapture";
import PreviewDocument from "./PreviewDocument";
import Calculator from "./Calculator";
import InterestCalculator from "./InterestCalculator";
import Notification from "./Notification";
import { BsBank } from "../../node_modules/react-icons/bs/index.esm";
import CustomTable from "../components/others/customtable";
import Header from "../components/others/Header/Header";
import {
  FiBell,
  FiEdit,
  FiFile,
  FiMail,
  FiMenu,
  FiRepeat,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { Select, Modal, Button } from "@mantine/core";
import {
  AiOutlineArrowRight,
  AiOutlineCheckCircle,
  AiOutlineRight,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { API_SERVER, APP_URL } from "../config/constant";
import RateDashboard from "./RateDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AiFillHome,
  AiFillStar,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineMinus,
} from "react-icons/ai";
import Cases from "../views/screens/cases";
import ActionButtons from "./others/action-buttons/ActionButtons";
import {
  LuCalculator,
  LuCalendar,
  LuFileScan,
  LuFileSearch,
  LuLayoutDashboard,
  LuScan,
  LuUser,
  LuUserCheck,
} from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import ButtonComponent from "./others/Button/ButtonComponent";

function TopNavComponent({ toggleMenu }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTable1, setIsModalOpenTable1] = useState(false);
  const [isModalOpenTable2, setIsModalOpenTable2] = useState(false);
  const [utils, setUtils] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [approvedItemCount, setApprovedItemCount] = useState(5);
  const [rejectedItemCount, setRejectedItemCount] = useState(3);
  const [currentTime, setCurrentTime] = useState("");
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [approved, setApproved] = useState(
    JSON.stringify(localStorage.getItem("approved"))
  );

  const handleOpenTable1 = () => {
    setShowTable1(true);
    setShowTable2(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setUtils(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setApproved(JSON.parse(localStorage.getItem("approved")));
  }, [approved]);

  const handleLogout = () => {
    // Handle logout logic
    window.location.href = "/";
  };

  const handleOpenTable2 = () => {
    setShowTable1(false);
    setShowTable2(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalTable1 = () => {
    setIsModalOpenTable1(true);
  };

  const openModalTable2 = () => {
    setIsModalOpenTable2(true);
  };

  const closeModalTable1 = () => {
    setIsModalOpenTable1(false);
  };

  const closeModalTable2 = () => {
    setIsModalOpenTable2(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  localStorage.setItem(
    "theme",
    '{"theme": {"headerImage":"headerBGDefault.jpg", "backgroundImage":"bgDefault.jpg", "breadcrumbBGColor": "#dbdbdb47", "textColor":"black", "cardBGColor":"", "fontFamily":null}}'
  );

  const [menuScreens, setMenuScreens] = useState([]);
  const [showScreen, setShowScreen] = useState(false);

  const [modalSize, setModalSize] = useState("100%");
  const [fullScreen, setFullScreen] = useState("0px");
  const [widthC, setWidth] = useState("");
  const [marginLeftC, setMarginLeft] = useState("0px");
  const [marginTopC, setMarginTop] = useState("-51px");
  const [maximized, setMaximized] = useState(true);
  const [namesOfMinimizedModals, setNamesOfMinimizedModals] = useState(
    localStorage.getItem("namesOfMinimizedModals")
  );
  const [showMenus, setShowMenus] = useState(true);

  const [showModalC, setShowModalC] = useState(false);
  const [showMyApprovedItemsModal, setShowMyApprovedItemsModal] =
    useState(false);
  const [modalSizeC, setModalSizeC] = useState("75%");
  const [fullScreenC, setFullScreenC] = useState(false);
  const [fullScreenMAIM, setFullScreenMAIM] = useState(false);
  const [modalTitleC, setModalTitleC] = useState("");

  const [detailsOfMyApprovalItems, setDetailsOfMyApprovalItems] = useState([]);

  const handleClose = () => setShowModalC(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState(
    "You have a pending approval item."
  );

  const [pendingItems, setPendingItems] = useState("Pending Items");

  function closeModalFunc() {
    const closedForm = localStorage.getItem("formName");

    // setWidth("83.7%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("65px");
    setValue(true);

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
          if (minimizedModals) {
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
    // setWidth("83.2%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-51px");

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

  function minimizedCollapsedFunc(formName) {
    // alert(formName);

    // setWidth("83.2%");
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

  // Calculate the initial width based on the screen resolution
  function calculateScreenWidth() {
    const screenWidth = window.innerWidth;

    // alert(screenWidth);

    if (screenWidth >= 3840) {
      // setCustomZoom("210%");
      // setMMMarginLeft("-1668px");
      return "93.2%";
    } else if (screenWidth >= 3072) {
      // setCustomZoom("172%");
      // setMMMarginLeft("-1162px");
      return "91.5%";
    } else if (screenWidth >= 2560) {
      // setCustomZoom("140%");
      // setMMMarginLeft("-823px");
      return "90%";
    } else if (screenWidth >= 2195) {
      // setCustomZoom("118%");
      // setMMMarginLeft("-585px");
      return "88.2%";
    } else if (screenWidth >= 1920) {
      // setCustomZoom("101%");
      // setMMMarginLeft("-403px");
      return "86.5%";
    } else if (screenWidth >= 1707) {
      // setCustomZoom("88%");
      // setMMMarginLeft("-263px");
      return "85%";
    } else if (screenWidth >= 1600) {
      // setCustomZoom("82%");
      // setMMMarginLeft("-192px");
      console.log("Custom Large Screen", screenWidth);
      return "84.5%";
    } else if (screenWidth >= 1528) {
      // setCustomZoom("77%");
      // setMMMarginLeft("-145px");
      return "83.6%";
    } else if (screenWidth >= 1536) {
      // setCustomZoom("78%");
      // setMMMarginLeft("-152px");
      return "83.7%";
    } else if (screenWidth >= 1563) {
      // setCustomZoom("65%");
      // setMMMarginLeft("-155px");
      console.log("Torsu - Macbook", screenWidth);
      return "83.3%";
    } else if (screenWidth >= 1440) {
      // setCustomZoom("70%");
      // setMMMarginLeft("-80px");
      console.log("Torsu - Macbook", screenWidth);
      return "82.8%";
    } else if (screenWidth >= 1280) {
      // setCustomZoom("62%");
      // setMMMarginLeft("14px");
      console.log("Charway - Macbook", screenWidth);
      return "80.2%";
    } else if (screenWidth >= 1098) {
      // setCustomZoom("70%");
      // setMMMarginLeft("-155px");
      return "77%";
    } else {
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

  function maximizeFunc() {
    setWidth("100.1%");
    setModalSize("100%");
    setMarginLeft("-295px");
    setMarginTop("65px");
    setMaximized(false);
  }

  function minimizeFunc() {
    const screenWidth = window.innerWidth;

    if (screenWidth === 1528) {
      return "83.6%";
    } else if (screenWidth === 3840) {
      setWidth("93.2%");
    } else if (screenWidth === 1098) {
      setWidth("77%");
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
    } else {
      setWidth("83.7%");
    }

    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("65px");
    setMaximized(true);
  }

  useEffect(() => {
    // console.log(maximized);
    setMaximized(maximized);
  }, [maximized]);

  useEffect(() => {
    // console.log(widthC);
    setWidth(widthC);
  }, [widthC]);

  useEffect(() => {
    // console.log(showMenus);
    setShowMenus(showMenus);
  }, [showMenus]);

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
    setWidth("83.2%");
    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("-51px");
    setMaximized(true);
    localStorage.setItem("formName", formName);
    setShowScreen(true);
  }

  function handleMyApprovalClickEvent(formName) {
    const screenWidth = window.innerWidth;

    if (screenWidth === 1528) {
      return "83.6%";
    } else if (screenWidth === 3840) {
      setWidth("93.2%");
    } else if (screenWidth === 1098) {
      setWidth("77%");
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
    } else {
      setWidth("83.7%");
    }

    if (formName === "" || formName === undefined || formName === null) {
      document.getElementById("menuShortCut").required = true;
      document.getElementById("menuShortCut").focus();
      return false;
    } else {
      // Function to check approval level
      const showApprovalScreen = async () => {
        try {
          const response = await axios.post(
            `${API_SERVER}/api/get-approval-authority`,
            { user_id: user_id, branch_code: branchCode },
            { headers }
          );

          let approvalAuthority;

          response.data.map((d, index) => {
            approvalAuthority = d.approval_authority;
          });

          if (approvalAuthority === "Y") {
            // Show My Approval's Screen
            localStorage.setItem("formName", formName);
            setShowScreen(true);
          } else if (approvalAuthority === "N") {
            // Show My Approved Items Screen
            setShowMyApprovedItemsModal(true);
          }
        } catch (error) {
          // Handle error here
        }
      };

      showApprovalScreen();
    }
  }

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
      //       // console.log(error);
      //     });
      // };

      // storeSystemAuditLog();

      // alert(formName);
      // if (document.getElementById("minimizeContainer")) {
      //   document.getElementById("minimizeContainer").click();
      // }
      localStorage.setItem("formName", formName);

      // navigate(item.key);

      const screenWidth = window.innerWidth;

      if (screenWidth === 1528) {
        return "83.6%";
      } else if (screenWidth === 3840) {
        setWidth("93.2%");
      } else if (screenWidth === 1098) {
        setWidth("77%");
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
      } else {
        setWidth("83.7%");
      }

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
    const screenWidth = window.innerWidth;

    if (screenWidth === 1528) {
      return "83.6%";
    } else if (screenWidth === 3840) {
      setWidth("93.2%");
    } else if (screenWidth === 1098) {
      setWidth("77%");
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
    } else {
      setWidth("83.7%");
    }

    setModalSize("100%");
    setMarginLeft("0px");
    setMarginTop("65px");
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

  const [response, setResponse] = useState([]);
  const [value, setValue] = useState("");

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const [approvalSummaryCount, setApprovalSummaryCount] = useState(0);
  const [approvalTestCounter, setApprovalTestCounter] = useState(0);

  function formatAmount(number, decimalPlaces = 2) {
    // Convert the number to a string and split into integer and decimal parts
    const parts = number.toFixed(decimalPlaces).toString().split(".");

    // Add commas as thousands separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer and decimal parts
    return parts.join(".");
  }

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // console.log(headers);

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const user_id = userInfo?.id;
  const branchCode = userInfo?.branchCode;
  const branch = userInfo?.branch;
  const branchName = userInfo?.branch;
  const posting_date = userInfo?.postingDate;

  const currentDate = new Date(posting_date);
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(year, monthIndex)
  );
  const day = currentDate.getDate().toString().padStart(2, "0");
  const postingDate = `${day}-${month.toUpperCase()}-${year}`;
  const { approvalClick, setApprovalClick, setApprovalData, setGeneralData } =
    useContext(globalContext);

  useEffect(() => {
    if (showMyApprovedItemsModal) {
      setApprovalClick("");
    }
  }, [showMyApprovedItemsModal]);
  function handleApprovalItemClick(
    item_code,
    description,
    posted_by,
    posting_date,
    account_number,
    account_name,
    branch,
    currency,
    amount,
    approval_status,
    approved_by,
    approval_date,
    batchNo
  ) {
    setShowMyApprovedItemsModal(false);

    // alert(item_code);

    if (item_code === "CWL") {
      // Reset the flag
      setApprovalClick("");
      localStorage.setItem("formName", "Cash Operation");
      setApprovalData("CAW");
      setApprovalClick(batchNo);
      setGeneralData({
        approvalStatus: approval_status,
        batchNo,
      });
      setShowScreen(true);

      // localStorage.setItem("batchNo", batchNo);
    } else if (item_code === "CDS") {
      localStorage.setItem("formName", "Facility Enquiry");
      setShowScreen(true);
    } else if (item_code === "ACO") {
      localStorage.setItem("formName", "Individual Member Registration");
      setShowScreen(true);
    } else if (item_code === "SDR") {
      localStorage.setItem("formName", "Teller Activities");
      setShowScreen(true);
    } else {
      // handle else statement here
    }
  }

  useEffect(() => {
    async function getDetailsOfMyApprovalItems() {
      let newData = [];
      let response = await axios.post(
        API_SERVER + "/api/get-details-of-my-approval-items",
        {
          user_id: user_id,
          branch_code: branchCode,
          posting_date: postingDate,
        },
        { headers }
      );

      // console.log(response.data,"summaryapproval");

      let description;
      let batch_no;
      let posted_by;
      let posting_date;
      let account_number;
      let time;
      let account_name;
      let branch;
      let currency;
      let amount;
      let approval_status;
      let approved_by;
      let approval_date;
      let approval_time;
      let item_code;

      response.data.map((d, index) => {
        let i = index + 1;

        if (d.item_code) {
          item_code = d.item_code;
        } else {
          item_code = "N/A";
        }

        if (d.description) {
          description = d.description;
        } else {
          description = "N/A";
        }

        if (d.batch_no) {
          batch_no = d.batch_no;
        } else {
          batch_no = "N/A";
        }

        if (d.posted_by) {
          posted_by = d.posted_by;
        } else {
          posted_by = "N/A";
        }

        if (d.posting_date) {
          const currentDate = new Date(d.posting_date.substring(0, 10));
          const year = currentDate.getFullYear();
          const monthIndex = currentDate.getMonth();
          const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
          }).format(new Date(year, monthIndex));
          const day = currentDate.getDate().toString().padStart(2, "0");
          const postingDate = `${day}-${month.toUpperCase()}-${year}`;

          posting_date = postingDate;
        } else {
          posting_date = "N/A";
        }

        if (d.time) {
          time = d.time.slice(11, 16);
        } else {
          time = "N/A";
        }

        if (d.account_number) {
          account_number = d.account_number;
        } else {
          account_number = "N/A";
        }

        if (d.account_name) {
          account_name = d.account_name;
        } else {
          account_name = "N/A";
        }

        if (branchName) {
          branch = branchName;
        } else {
          branch = "N/A";
        }

        if (d.currency) {
          currency = d.currency;
        } else {
          currency = "N/A";
        }

        if (d.amount) {
          amount = formatAmount(d.amount);
        } else {
          amount = "N/A";
        }

        if (d.approval_status) {
          if (d.approval_status === "A") {
            approval_status = <b style={{ color: "green" }}>APPROVED</b>;
          } else if (d.approval_status === "R") {
            approval_status = <b style={{ color: "red" }}>REJECTED</b>;
          } else if (d.approval_status === "C") {
            approval_status = <b style={{ color: "grey" }}>CANCELLED</b>;
          } else {
            approval_status = d.approval_status;
          }
        } else {
          approval_status = "N/A";
        }

        if (d.approved_by) {
          approved_by = d.approved_by;
        } else {
          approved_by = "N/A";
        }

        if (d.approval_date) {
          const currentDate = new Date(d.approval_date.substring(0, 10));
          const year = currentDate.getFullYear();
          const monthIndex = currentDate.getMonth();
          const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
          }).format(new Date(year, monthIndex));
          const day = currentDate.getDate().toString().padStart(2, "0");
          const approvalDate = `${day}-${month.toUpperCase()}-${year}`;

          approval_date = approvalDate;
        } else {
          approval_date = "N/A";
        }

        if (d.approval_time) {
          approval_time = d.approval_time.slice(11, 16);
        } else {
          approval_time = "N/A";
        }

        newData.push([
          i,
          description,
          batch_no,
          //  posted_by,
          posting_date,
          //  time,
          account_number,
          account_name,
          branch,
          currency,
          amount,
          approval_status,
          approved_by,
          approval_date,
          //  approval_time,
          <div style={{ display: "grid", placeItems: "center" }}>
            <ButtonComponent
              onClick={() =>
                handleApprovalItemClick(
                  d.item_code,
                  d.description,
                  d.posted_by,
                  d.posting_date,
                  d.account_number,
                  d.account_name,
                  d.branch,
                  d.currency,
                  d.amount,
                  d.approval_status,
                  d.approved_by,
                  d.approval_date,
                  d.batch_no
                )
              }
              buttonIcon={
                <AiOutlineRight size={22} style={{ paddingLeft: "5px" }} />
              }
              buttonHeight={"30px"}
              buttonWidth={"30px"}
            />
          </div>,
        ]);
      });
      setDetailsOfMyApprovalItems(newData);
    }

    // Fetch summary approval initially and then every 1 second (adjust the interval as needed)
    getDetailsOfMyApprovalItems();
    //  const interval = setInterval(getDetailsOfMyApprovalItems, 1000);
    //  return () => clearInterval(interval);
  }, [approvalTestCounter]);

  useEffect(() => {
    // Function to fetch pending items count from the backend
    const fetchPendingApprovalsCount = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/summary-approvals`,
          { user_id: user_id, branch: branch },
          { headers }
        );

        let counter = 0;

        response.data.map((d, index) => {
          counter += d.num;
        });

        setApprovalTestCounter(counter);
      } catch (error) {
        // Handle error here
      }
    };

    // Function to fetch my approvals count from the backend
    const fetchMyApprovalsCount = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/get-details-of-my-approval-items`,
          {
            user_id: user_id,
            branch_code: branchCode,
            posting_date: postingDate,
          },
          { headers }
        );

        let counter = 0;

        response.data.map((d, index) => {
          counter += 1;
        });

        setApprovalTestCounter(counter);
      } catch (error) {
        // Handle error here
      }
    };

    // Function to check approval level
    const checkApprovalLevel = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/get-approval-authority`,
          { user_id: user_id, branch_code: branchCode },
          { headers }
        );

        let approvalAuthority;

        response.data.map((d, index) => {
          approvalAuthority = d.approval_authority;
        });

        if (approvalAuthority === "Y") {
          // Set All Pending Approval Count
          fetchPendingApprovalsCount();
        } else if (approvalAuthority === "N") {
          // Set My Approval Count
          setPendingItems("My Approval Items");
          fetchMyApprovalsCount();
        }
      } catch (error) {
        // Handle error here
      }
    };

    // Check approval level
    checkApprovalLevel();
    const interval = setInterval(checkApprovalLevel, 1000);
    return () => clearInterval(interval);
  }, [approvalTestCounter]);

  useEffect(() => {
    // Function to send all pending approval notifications
    const notificationForAllPendingApprovals = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/summary-approvals`,
          { user_id: user_id, branch: branch },
          { headers }
        );

        let currentApprovalSummaryCount = 0;

        response.data.map((d, index) => {
          currentApprovalSummaryCount += d.num;
        });

        if (currentApprovalSummaryCount > approvalSummaryCount) {
          // alert("previousApprovalSummaryCount: " + approvalSummaryCount);
          // alert("currentApprovalSummaryCount: " + currentApprovalSummaryCount);
          setApprovalSummaryCount(currentApprovalSummaryCount);
          setNotificationTitle("You have a pending approval item.");
          setPendingItems("Pending Items");
          setShowNotification(true);
        } else {
          // alert('am inside the else statement...');
          setApprovalSummaryCount(currentApprovalSummaryCount);
        }
      } catch (error) {
        // Handle error here
      }
    };

    // Function to send my approvals notification
    const notificationForMyApprovals = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/get-details-of-my-approval-items`,
          {
            user_id: user_id,
            branch_code: branchCode,
            posting_date: postingDate,
          },
          { headers }
        );

        let currentApprovalSummaryCount = 0;

        response.data.map((d, index) => {
          currentApprovalSummaryCount += 1;
        });

        if (currentApprovalSummaryCount > approvalSummaryCount) {
          setApprovalSummaryCount(currentApprovalSummaryCount);
          setNotificationTitle(
            "Approval Notice: An action has been taken on an activity you sent for approval"
          );
          setPendingItems("My Approval Items");
          setShowNotification(true);
        }
      } catch (error) {
        // Handle error here
      }
    };

    // Function to check approval level
    const sendNotification = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/get-approval-authority`,
          { user_id: user_id, branch_code: branchCode },
          { headers }
        );

        let approvalAuthority;

        response.data.map((d, index) => {
          approvalAuthority = d.approval_authority;
        });

        if (approvalAuthority === "Y") {
          // Check for new pending approvals every second
          notificationForAllPendingApprovals();
        } else if (approvalAuthority === "N") {
          // Check for my approvals every second
          notificationForMyApprovals();
        }
      } catch (error) {
        // Handle error here
      }
    };

    sendNotification();
  }, [approvalTestCounter]);

  const [selectedUtility, setSelectedUtility] = useState(null);

  const menuItems = [
    // {
    //   id: "member_360",
    //   label: "Member 360",
    //   icon: <LuUser style={{ marginTop: "4.2px" }} />,
    // },
    {
      id: "customer_360",
      label: "Member 360",
      icon: <LuUser style={{ marginTop: "4.2px" }} />,
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: <LuCalculator style={{ marginTop: "4.2px" }} />,
    },
    {
      id: "interest_calculator",
      label: "Interest Calculator",
      icon: <LuCalendar style={{ marginTop: "4.2px" }} />,
    },
    {
      id: "scan_document",
      label: "Scan Document",
      icon: <LuFileScan style={{ marginTop: "4.2px" }} />,
    },
    {
      id: "view_document",
      label: "View Document",
      icon: <LuFileSearch style={{ marginTop: "4.2px" }} />,
    },
    {
      id: "rate_dashboard",
      label: "Rate Dashboard",
      icon: <LuLayoutDashboard style={{ marginTop: "4.2px" }} />,
    },
  ];

  const menuStyle = {
    width: 170,
    background: "#e0f2fe",
    borderRadius: "5px",
    marginLeft: "-20px",
    padding: "4px",
    zIndex: 9999999999,
    background: "white",
  };

  const handleMenuItemClick = (id, label) => {
    // alert(id);
    setSelectedUtility(id);
    setShowModalC(true);
    setModalTitleC(label);
    setUtils(false);

    if (id === "member_360") {
      setModalSizeC("90%");
    } else if (id === "customer_360") {
      setModalSizeC("100%");
    } else if (id === "calculator") {
      setModalSizeC("23%");
    } else if (id === "interest_calculator") {
      setModalSizeC("30%");
    } else if (id === "scan_document") {
      setModalSizeC("40%");
    } else if (id === "view_document") {
      setModalSizeC("60%");
    } else if (id === "rate_dashboard") {
      setModalSizeC("50%");
    } else {
      setModalSizeC("75%");
    }
  };

  useEffect(() => {
    function getMenuIcons() {
      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoString);

      const user_id = userInfo?.id;
      const authCode = userInfo?.authorityCode;

      axios
        .post(
          API_SERVER + "/api/get-active-menus-by-menu-level",
          {
            menu_level: 3,
            userID: user_id,
            authorityCode: authCode,
          },
          { headers }
        )
        .then((res) => {
          const arr = [];
          res.data.map((i) => {
            arr.push({
              key: `${i.menu_id}`,
              value: `${i.menu_name}`,
              label: `${i.menu_id} - ${i.menu_name}`,
            });
          });
          setResponse(arr);
        });
    }
    getMenuIcons();
  }, []);

  const generateApprovedItems = () => {
    const rows = [];
    for (let i = 1; i <= approvedItemCount; i++) {
      rows.push(
        <tr key={i}>
          <td className="border px-4 py-1 text-center">Item {i}</td>
          <td className="border px-4 py-1 text-center">Description {i}</td>
          <td className="border px-4 py-2 flex items-center justify-center">
            <AiOutlineCheckCircle className="text-green-500" />
          </td>
        </tr>
      );
    }
    return rows;
  };

  const generateRejectedItems = () => {
    const rows = [];
    for (let i = 1; i <= rejectedItemCount; i++) {
      rows.push(
        <tr key={i}>
          <td className="border px-4 py-1 text-center">Item {i}</td>
          <td className="border px-4 py-1 text-center">Description {i}</td>
          <td className="border px-4 py-2 flex items-center justify-center">
            <MdOutlineCancel className="text-red-500" />
          </td>
        </tr>
      );
    }
    return rows;
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for the modal overlay
    },
    modal: {
      backgroundColor: "#000", // Background color for the modal content
    },
  };

  return (
    <div className=" ">
      {showMyApprovedItemsModal ? (
        <Modal
          className="p-0 m-0"
          opened={showMyApprovedItemsModal}
          size={"95%"}
          fullScreen={fullScreenMAIM}
          styles={{
            modal: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              position: "fixed",
            },
          }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleClose}
        >
          <div
            className="text-gray-700"
            style={{
              marginBottom: "-15px",
              marginLeft: "-17px",
              marginRight: "-16px",
              marginTop: "-20px",
              overflowY: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#0580c0",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  My Approval Items
                </div>

                <div className="flex">
                  {fullScreenMAIM ? (
                    <AiOutlineCompress
                      className="hover:cursor-pointer mt-1 mr-2"
                      color="white"
                      onClick={() => setFullScreenMAIM(false)}
                    />
                  ) : (
                    <AiOutlineExpand
                      className="hover:cursor-pointer mt-1 mr-2"
                      color="white"
                      onClick={() => setFullScreenMAIM(true)}
                    />
                  )}

                  <span
                    style={{ color: "white", marginTop: "-2px" }}
                    className="mr-2"
                  >
                    |
                  </span>

                  <svg
                    onClick={() => setShowMyApprovedItemsModal(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    // style={{ padding: "10px" }}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-gray-200 rounded-b ">
                <div className="bg-white shadow rounded px-2 pt-1">
                  <Header
                    title={
                      "List of all my " +
                      approvalSummaryCount +
                      " approval items"
                    }
                    backgroundColor="#22c55e69"
                    fontColor={"#5c5c5c"}
                    headerShade={false}
                    fontSize="15"
                    zoom={"0.9"}
                  />

                  <CustomTable
                    data={detailsOfMyApprovalItems}
                    theadBackground="#22c55e"
                    zoom="0.85"
                    headers={[
                      "#",
                      "Description",
                      "Batch Number",
                      // "Posted By",
                      "Posting Date",
                      // "Time",
                      "Account Number",
                      "Account Name",
                      "Branch",
                      "Currency",
                      "Amount",
                      "Status",
                      "Approved By",
                      "Date",
                      // "Time",
                      "Action",
                    ]}
                    rowsPerPage={15}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {showModalC ? (
        <Modal
          className="p-0 m-0"
          opened={showModalC}
          size={modalSizeC}
          fullScreen={fullScreenC}
          styles={{
            modal: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              position: "fixed",
            },
          }}
          withCloseButton={false}
          transitionProps={"mounted"}
          onClose={handleClose}
        >
          <div
            className="text-gray-700"
            style={{
              marginBottom: "-15px",
              marginLeft: "-17px",
              marginRight: "-16px",
              marginTop: "-20px",
              overflowY: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#0580c0",
              }}
              className="w-full shadow"
            >
              <div className=" flex justify-between py-[6px] px-2 items-center ">
                <div
                  style={{ fontSize: "14px" }}
                  className="text-white font-semibold"
                >
                  {modalTitleC}
                </div>

                <div className="flex">
                  {fullScreenC ? (
                    <AiOutlineCompress
                      className="hover:cursor-pointer mt-1 mr-2"
                      color="white"
                      onClick={() => setFullScreenC(false)}
                    />
                  ) : (
                    <AiOutlineExpand
                      className="hover:cursor-pointer mt-1 mr-2"
                      color="white"
                      onClick={() => setFullScreenC(true)}
                    />
                  )}

                  <span
                    style={{ color: "white", marginTop: "-2px" }}
                    className="mr-2"
                  >
                    |
                  </span>

                  <svg
                    onClick={() => setShowModalC(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    // style={{ padding: "10px" }}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-gray-200 rounded-b ">
                <div className="bg-white shadow rounded px-2 pt-1 pb-8 ">
                  {(() => {
                    if (selectedUtility === "member_360") {
                      return <Member360 />;
                    } else if (selectedUtility === "customer_360") {
                      return <Customer360 />;
                    } else if (selectedUtility === "calculator") {
                      return <Calculator />;
                    } else if (selectedUtility === "interest_calculator") {
                      return <InterestCalculator />;
                    } else if (selectedUtility === "scan_document") {
                      return <DocumentCapture />;
                    } else if (selectedUtility === "view_document") {
                      return <PreviewDocument />;
                    } else if (selectedUtility === "rate_dashboard") {
                      return <RateDashboard />;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {showScreen && (
        <div
          className="h-[100%] mt-2 mb-2"
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            height: "100%",
            marginTop: marginTopC,
            marginLeft: marginLeftC,
            zoom: "0.85",
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

      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="My Pending Items"
        styles={modalStyles}
      >
        <div>
          <div className="flex items-center justify-evenly">
            {/* <button onClick={openModalTable1} className="border p-2 rounded-md hover:shadow bg-green-400 ">Approved Items</button>
            <button onClick={openModalTable2}>Rejected Items</button> */}
            {/* <button onClick={openModalTable1} className="relative border p-2 rounded-md hover:shadow bg-sky-700">
              Approve These
              {approvedItemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-2 translate-y-0 bg-gray-300 text-black rounded-full w-5 h-5">
                  {approvedItemCount}
                </span>
              )}
            </button> */}

            <button
              onClick={openModalTable1}
              className="relative border p-2 rounded-md hover:shadow bg-green-400"
            >
              Approved Items
              {approvedItemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-2 translate-y-0 bg-sky-700 text-white rounded-full w-5 h-5">
                  {approvedItemCount}
                </span>
              )}
            </button>
            <button
              onClick={openModalTable2}
              className="relative border p-2 rounded-md hover:shadow bg-red-400"
            >
              Rejected Items
              {rejectedItemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-2 translate-y-0 bg-green-500 text-white rounded-full w-5 h-5">
                  {rejectedItemCount}
                </span>
              )}
            </button>
          </div>

          <Modal
            opened={isModalOpenTable1}
            onClose={closeModalTable1}
            title="Approved Items"
          >
            <table className="table w-full">
              <thead>
                <tr className="bg-sky-700">
                  <th className="border px-2">Items</th>
                  <th className="border px-2">Description</th>
                  <th className="border px-2">Status</th>
                </tr>
              </thead>
              <tbody>{generateApprovedItems()}</tbody>
            </table>
          </Modal>

          <Modal
            opened={isModalOpenTable2}
            onClose={closeModalTable2}
            title="Reject Items"
          >
            <table className="table w-full">
              <thead>
                <tr className="bg-sky-700">
                  <th className="border px-2 py-1">Items</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Status</th>
                </tr>
              </thead>
              <tbody>{generateRejectedItems()}</tbody>
            </table>
          </Modal>
        </div>
      </Modal>

      {/* flexing the x 100 logo and the other options on the right side */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1px",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
          // height: '100px'
        }}
        className="bg-sky-100"
      >
        {/* x100 logo */}
        {/* <div onClick={toggleMenu} className="cursor-pointer"> */}
        <div className="">
          <div className="flex items-end">
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <img 
                src={usg}
                alt="Union Systems Global"
                style={{ height: "60px" }}
              /> */}

              <div
                style={{
                  fontSize: "35px",
                  // fontStyle: "italic",
                  fontWeight: "500",
                  fontFamily: "Segoe Print",
                }}
                className="ml-2"
              >
                X.100
              </div>
            </div>

            <div
              style={{
                fontSize: "10px",
                fontWeight: "500",
              }}
              className="mb-2"
            >
              Banking&nbsp;System
            </div>
          </div>
        </div>

        {/* other options on the right side */}
        <div className="flex items-center p-3">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ marginLeft: "10px", marginRight: "23px" }}
              onClick={() => {
                setSelectedMenuItem("My Approvals");
                // setWidth("83.7%");
                setModalSize("100%");
                setMarginLeft("0px");
                setMarginTop("65px");
                setValue(true);
                handleMyApprovalClickEvent("My Approvals");
              }}
              className="relative mr-2"
            >
              <div
                style={{ zIndex: "999999999" }}
                className="absolute -top-3 h-6 w-6 px-4 py-3 flex items-center justify-center -right-4 rounded-full bg-red-500  text-xs text-white"
              >
                {approvalSummaryCount}
              </div>

              {/* <TopNavOption title="Pending Items" icon={<FiBell />} /> */}
              <button
                className="px-3 py-1 rounded text-white"
                style={{ background: "#2a93f5" }}
              >
                {pendingItems}
              </button>
            </div>

            <div className="relative">
              <div
                className=" cursor-pointer"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setUtils(!utils);
                  setUtils(true);
                }}
                onMouseOver={() => {}}
              >
                <TopNavOption
                  // title="Utilities"
                  icon={<FiMenu />}
                  width={35}
                  height={35}
                />
              </div>
              {utils && (
                <div
                  className="absolute top-10 left-[2px] "
                  onMouseOver={() => {
                    setUtils(true);
                  }}
                  onMouseOut={() => {
                    setUtils(false);
                  }}
                  style={menuStyle}
                >
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex"
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        backgroundColor:
                          selectedUtility === item.id
                            ? "#2a93f5"
                            : "transparent",
                        color: selectedUtility === item.id ? "white" : "black",
                        borderRadius: selectedUtility === item.id ? "6px" : "0",
                        transform:
                          selectedUtility === item.id
                            ? "translateY(0px)"
                            : "none",
                        transition: "transform 0.2s",
                        boxShadow:
                          selectedUtility === item.id
                            ? "0 2px 4px rgba(0, 0, 0, 0.2)"
                            : "none",
                        marginBottom:
                          selectedUtility === item.id ? "3px" : "0px",
                      }}
                      onClick={() => handleMenuItemClick(item.id, item.label)}
                    >
                      {item.icon}
                      <span style={{ marginLeft: "10px" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                // </div>
              )}
            </div>

            <div
              style={{ marginRight: "3px" }}
              className="relative"
              onClick={() => alert("Welcome!")}
            >
              <TopNavOption
                // title="Messages"
                icon={<FiMail />}
                width={35}
                height={35}
              />

              <div className="h-2 w-2 rounded-full bg-red-500 absolute top-0 right-[-1px]"></div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{ marginRight: "10px", cursor: "pointer" }}
              // onClick={handleToggle}
              onClick={() => {
                setIsOpen(true);
                handleToggle();
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <TopNavOption
                  // title="Profile"
                  icon={<BsBank />}
                  width={35}
                  height={35}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-12px",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    background: "#f0f9ff",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  }}
                />
              </div>
            </div>
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#f0f9ff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                  marginLeft: "-420px",
                  zIndex: 9999999999999,
                  width: "230px",
                  padding: "10px",
                }}
                onMouseOver={() => {
                  setIsOpen(true);
                }}
                onMouseOut={() => {
                  setIsOpen(false);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginLeft: "-10px",
                  }}
                >
                  {/* User Avatar */}
                  <div
                    style={{
                      width: "30px",
                      maxWidth: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "#2a93f5",
                      marginLeft: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <FiUser size={20} color="#fff" />
                  </div>
                  {/* Username */}
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                      marginLeft: "7px",
                    }}
                  >
                    <span>
                      {localStorage.getItem("userInfo")
                        ? JSON.parse(localStorage.getItem("userInfo")).username
                        : ""}
                    </span>
                  </div>
                </div>
                {/* Divider */}
                <div
                  style={{
                    borderTop: "1px solid #eee",
                    marginBottom: "10px",
                    marginTop: "-5px",
                  }}
                />
                {/* Profile Option */}
                <div
                  style={{ cursor: "pointer", marginLeft: "-5px" }}
                  onClick={() => null}
                >
                  &nbsp;&nbsp;&nbsp;My Profile Details
                </div>
                {/* Divider */}
                <div
                  style={{
                    borderTop: "1px solid #eee",
                    marginBottom: "5px",
                    marginTop: "10px",
                  }}
                />
                {/* Logout Option */}
                <div
                  style={{ cursor: "pointer", marginLeft: "-5px" }}
                  onClick={handleLogout}
                >
                  &nbsp;&nbsp;&nbsp;Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom part of the top nav */}
      <div
        className="bg-sky-50"
        style={{
          padding: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        {/* Menu Shortcut */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "baseline",
          }}
        >
          {/* <div
            style={{
              marginRight: "5px",
              marginLeft: "8px",
              fontSize: "13.5px",
            }}
          >
            Menu&nbsp;Shortcut
          </div> */}

          <div
            style={{ marginRight: "5px", marginLeft: "5px" }}
            className="poppins-regular relative"
          >
            <Select
              id="menuShortCut"
              require="required"
              style={{
                width: "270px",
                fontSize: "10px",
                border: "none",
                fontFamily: "Poppins",
              }}
              classNames="dropdown"
              placeholder="Search Menu"
              searchable
              nothingFound="No options"
              data={response}
              clearable
              icon={
                <FiSearch
                  size={15}
                  className="text-gray-200 stroke-gray-500 ml-1 absolute left-1 z-30"
                />
              }
              // unstyled
              radius={"md"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClickEvent(
                    document.getElementById("menuShortCut").value
                  );
                  setSelectedMenuItem(
                    document.getElementById("menuShortCut").value
                  );
                }
              }}
              onChange={(formName) => {
                setSelectedMenuItem(formName);
                // setWidth("83.7%");
                setModalSize("100%");
                setMarginLeft("0px");
                setMarginTop("65px");
                setValue(true);
                handleSearchClickEvent(formName);
              }}
            />
          </div>
          {/* <div
            onClick={onGoButtonClick}
            style={{
              padding: "5px",
              // backgroundColor: "#2a93f5",
              color: "white",
              borderRadius: "4px",
              marginRight: "5px",
              fontWeight: "500",
            }}
            className="cursor-pointer bg-sky-700 hover:bg-sky-500"
          >
            Go
          </div> */}
        </div>

        <div
          style={{ display: "flex", fontSize: "13.5px", alignItems: "center" }}
        >
          <Timer />
          <div
            style={{
              marginRight: "5px",
              paddingRight: "10px",
              paddingLeft: "3px",
              borderRight: "1px solid",
              whiteSpace: "nowrap",
            }}
          >
            User:{" "}
            <b>
              {localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo")).username
                : ""}
            </b>
          </div>
          <div
            style={{
              marginRight: "5px",
              paddingRight: "0px",
              paddingLeft: "3px",
              whiteSpace: "nowrap",
            }}
          >
            Branch:{" "}
            <b>
              {localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo")).branch
                : ""}
            </b>
          </div>
        </div>
      </div>

      <div className="">
        <Notification
          showNotification={showNotification}
          setShowMyApprovedItemsModal={setShowMyApprovedItemsModal}
          setShowNotification={setShowNotification}
          approvalSummaryCount={approvalSummaryCount}
          notificationTitle={notificationTitle}
          setShowScreen={setShowScreen}
          setWidth={setWidth}
          setModalSize={setModalSize}
          setMarginTop={setMarginTop}
          setMarginLeft={setMarginLeft}
        />
      </div>
    </div>
  );
}

export default TopNavComponent;

function Timer() {
  const [currentTime, setCurrentTime] = useState("");

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

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(year, monthIndex)
    );
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };
  return (
    <div
      style={{
        marginRight: "5px",
        paddingRight: "10px",
        borderRight: "1px solid",
        whiteSpace: "nowrap",
      }}
    >
      &nbsp;&nbsp;{getCurrentDate()} : {currentTime}
    </div>
  );
}
