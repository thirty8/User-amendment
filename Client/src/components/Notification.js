import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import notificationSound from "../assets/sounds/notification.mp3"; // Replace with the path to your bell sound
import { API_SERVER } from "../config/constant";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 0;
  background-color: transparent;
`;

const NotificationContainer = styled.div`
  position: relative;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const CustomToast = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 6px;
  background-color: #0369a1;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer; // Add a cursor pointer to indicate that the notification is clickable

  svg {
    margin-right: 10px;
    font-size: 28px;
    animation: ${shakeAnimation} 0.4s ease infinite;
  }
`;


const Notification = ({
  setShowScreen,
  setWidth,
  setModalSize,
  setMarginLeft,
  setMarginTop,
  showNotification, // New state variable to control when to show the notification
  setShowNotification,
  approvalSummaryCount,
  notificationTitle,
  setShowMyApprovedItemsModal,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [clickedNotification, setClickedNotification] = useState("");

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

   const headers = {
     "x-api-key":
       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
     "Content-Type": "application/json",
   };

  const user_id = userInfo?.id;
  const branchCode = userInfo?.branchCode;
  const branch = userInfo?.branch;
  const posting_date = userInfo?.postingDate;

  useEffect(() => {
    if (showNotification) {
      // console.log("fire notification..");
      const newNotification = notificationTitle;
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);

      toast(
        <CustomToast onClick={() => handleNotificationClick("My Approvals")}>
          <FaBell
            style={{
              fontSize: "16px",
              paddingLeft: "5px",
              paddingRight: "-5px",
            }}
          />{" "}
          {newNotification}
        </CustomToast>,
        {
          onOpen: () => {
            const audio = new Audio(notificationSound);
            // audio.play();
          },
        }
      );

      setShowNotification(false);
    }
  }, [showNotification]);

  const handleNotificationClick = (formName) => {
    // Your logic for handling the click on the notification goes here
    // For example, you can update another state or perform some action
    // console.log("Notification clicked:", clickedNotification);
    // alert("am here now..");

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
            setWidth("83.7%");
            setModalSize("100%");
            setMarginLeft("0px");
            setMarginTop("65px");
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
  };

  return (
    <Container>
      <NotificationContainer>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </NotificationContainer>
    </Container>
  );
};

export default Notification;
