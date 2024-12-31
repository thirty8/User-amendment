import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  createContext,
} from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "./views/auth/signin";
import Dashboard from "./views/dashboard";
import Screens from "./views/screens";
import { API_SERVER } from "./config/constant";
import axios from "axios";

export let globalContext = createContext();
export const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function App() {
  const [isMenuVisible, setMenuVisible] = useState(true);
  const [menuUrl, setMenuUrl] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [approvalClick, setApprovalClick] = useState("");
  const [approvalData, setApprovalData] = useState("");
  const [generalData, setGeneralData] = useState(null);
  const [refreshApproval, setRefreshApproval] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    axios.get(API_SERVER + "/api/get-menu-urls", { headers }).then((res) => {
      const arr = [];

      // arr.push(<Route key={"123232"} path="/" element={<Dashboard />} />);
      res.data.map((i) => {
        arr.push(
          <Route
            key={i.menu_url}
            path={`/${i.menu_url}`}
            element={i.key !== "/" ? <Screens /> : <Dashboard />}
          />
        );
      });

      setMenuUrl(arr);

      // console.log(arr);
    });
  }, []);

  // window.addEventListener("beforeunload", (e) => {
  //   e.preventDefault();
  //   e.returnValue = ""; // This empty string is necessary for older browsers.

  //   // Display a confirmation dialog to the user.
  //   const confirmationMessage =
  //     "Are you sure you want to leave this page? Your unsaved changes may be lost.";

  //   e.returnValue = confirmationMessage;
  //   return confirmationMessage;
  // });

  // console.log(menuUrl, "menuUrllll");

  // Add your authentication logic here
  // const authenticateUser = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <globalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        approvalClick,
        setApprovalClick,
        approvalData,
        setApprovalData,
        generalData,
        setGeneralData,
        refreshApproval,
        setRefreshApproval,
      }}
    >
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              {menuUrl.map((menuItem) => (
                <Route
                  key={menuItem.key}
                  path={`/${menuItem.key}`}
                  element={<Screens />}
                />
              ))}
            </>
          ) : (
            <Route path="*" element={<SignIn />} />
          )}
        </Routes>
      </BrowserRouter>
    </globalContext.Provider>
  );
}

export default App;
