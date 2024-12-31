import React, { useState, useEffect, useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../config/constant"
import coopTech from "../../../assets/coop.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBG from "../../../assets/images/loginBG.jpg";
import { globalContext } from "../../../App";

const SignIn = () => {
  useEffect(() => {
    document.title = "Login | COOPTECH";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const { setIsLoggedIn } = useContext(globalContext);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleToggleVirtualKeyboard = () => {
    setShowVirtualKeyboard(!showVirtualKeyboard);
  };

  const handleKeyboardInputChange = (input) => {
    if (input === "{bksp}") {
      setUsername(username.slice(0, -1));
    } else if (input === "{space}") {
      setUsername(username + " ");
    } else {
      setUsername(username + input);
    }
  };

   const handleKeyPress = (event) => {
     if (event.key === "Enter") {
       handleLogin();
     }
   };

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire("Error", "Please enter both username and password.", "error");
      return;
    }

    try {
      // Perform login logic here using the API endpoint '/api/login'
      const loginResponse = await axios.post(
        `${API_SERVER}/api/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
        }
      );

      const data = loginResponse.data;

      if (data.success) {
        // Successful login
        // Swal.fire("Success", "Login successful!", "success");

        const getUserDeviceInfo = async () => {
          try {
            const resp1 = await axios.post(
              `${API_SERVER}/api/get-user-device-info`,
              {
                user_id: username,
              },
              {
                headers: {
                  "x-api-key":
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                  "Content-Type": "application/json",
                },
              }
            );

            if (resp1.data) {
              const deviceDetails = resp1.data;

              deviceDetails.forEach((device) => {
                const { ip_address, last_login, browser, location } = device;

                localStorage.setItem("ipAddress", ip_address);
                localStorage.setItem("lastLogin", last_login);
                localStorage.setItem("browser", browser);
                localStorage.setItem("location", location);
              });
            }
          } catch (error) {
            // Handle error
          }
        };

        // Call the async function
        getUserDeviceInfo();

        setIsLoggedIn(true);
        navigate("/");
        // Redirect to another page or perform any other necessary actions

        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", true);

        localStorage.setItem("userLastLoginDisplayed", false);
      } else {
        // Incorrect login credentials
        Swal.fire(
          "Error",
          "Incorrect username or password. Please try again.",
          "error"
        );
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url("` + loginBG + `")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          backgroundColor: "#f0f9ff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #ccc",
            paddingRight: "20px",
            background: "",
            // backgroundImage: coopTech,
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
          }}
        >
          <img style={{ padding: "30px" }} src={coopTech} alt="CoopTech" />

          {/* <h2 style={{ textAlign: "center" }}>X100 Banking Solutions</h2> */}
          {/* <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              marginTop: "-5px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
          </p> */}
        </div>
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <div className="flex items-center justify-center mb-3">
            <div style={{ display: "flex", alignItems: "center" }}>
              <hr />
              <div
                style={{
                  fontSize: "35px",
                  fontWeight: "300",
                  // fontFamily: "Segoe Print",
                }}
                className="ml-2"
              >
                CoopTech
              </div>
              &nbsp;&nbsp;Login
            </div>

            {/* <div
              style={{
                fontSize: "10px",
                fontWeight: "500",
              }}
              className="-mb-3"
            >
              Banking&nbsp;System
            </div> */}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{ marginBottom: "5px", lineHeight: 2.5 }}
            >
              User ID:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your user id"
              value={username}
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
              autoComplete="off"
              style={{
                width: "100%",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{
                marginBottom: "5px",
                marginTop: "-15px",
                lineHeight: 2.5,
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              autoComplete="off"
              style={{
                width: "100%",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "5px",
                cursor: "pointer",
                color: "#007bff",
              }}
              onClick={handleToggleVirtualKeyboard}
            >
              Use Virtual Keyboard
              <MDBIcon
                icon="keyboard"
                style={{ marginLeft: "5px", color: "black" }}
              />
            </p>
            {showVirtualKeyboard && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {/* Virtual Keyboard */}
                <Keyboard
                // layout={{
                //   default: [
                //     "1 2 3 4 5 6 7 8 9 0",
                //     "q w e r t y u i o p",
                //     "a s d f g h j k l",
                //     "{shift} z x c v b n m {bksp}",
                //     "{numbers} {space} {enter}",
                //   ],
                //   shift: [
                //     "! @ # $ % ^ & * ( )",
                //     "Q W E R T Y U I O P",
                //     "A S D F G H J K L",
                //     "{shift} Z X C V B N M {bksp}",
                //     "{numbers} {space} {enter}",
                //   ],
                //   numbers: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 {bksp}"],
                // }}
                // display={{
                //   "{bksp}": <MDBIcon icon="backspace" />,
                //   "{shift}": <MDBIcon icon="arrow-up" />,
                //   "{enter}": <MDBIcon icon="sign-in-alt" />,
                //   "{space}": " ",
                // }}
                // theme="hg-theme-default hg-layout-default"
                // onChange={handleKeyboardInputChange}
                />
              </div>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <button
              type="submit"
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          zoom: 0.9,
          bottom: 0,
          background: "#f0f9ff",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <br />
        <p
          className="cursor-pointer"
          style={{
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "normal",
            marginTop: "-13px",
          }}
        >
          <span className="">
            <MDBIcon style={{ fontSize: "16px", color: "black" }} icon="road" />{" "}
            St. Mark's Church &nbsp;&nbsp;&nbsp;&nbsp;Divine Office Suite
            D1-1 &nbsp;&nbsp;&nbsp;&nbsp;Walyakj Way, Westlands
          </span>
          <span style={{ marginLeft: "60px" }}>
            <a href="tel:+254787198981">
              <MDBIcon
                icon="university"
                style={{ fontSize: "16px", color: "black" }}
              />{" "}
              Office No: +254 787 198 981
            </a>
          </span>
          <span style={{ marginLeft: "60px" }}>
            <a href="tel:+254722856019">
              <i
                className="fas fa-phone"
                style={{ fontSize: "16px", color: "black" }}
              ></i>{" "}
              Personal No: +254 722 856 019
            </a>
          </span>
          <span style={{ marginLeft: "60px" }}>
            <a href="mailto:info@3qs.co.ke">
              <MDBIcon
                icon="envelope"
                style={{ fontSize: "16px", color: "black" }}
              />{" "}
              info@3qs.co.ke
            </a>
          </span>
        </p>

        <hr
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            paddingRight: "150px",
            paddingLeft: "150px",
          }}
        />

        <p
          className="cursor-pointer"
          style={{
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "normal",
            marginBottom: "5px",
            marginTop: "-6px",
          }}
        >
          <span style={{ marginRight: "50px" }}>
            <MDBIcon style={{ fontSize: "16px", color: "black" }} icon="blog" />{" "}
            <a target="_blank" href="https://www.3qs.co.ke">
              www.3qs.co.ke
            </a>
          </span>
          <span style={{ marginRight: "50px" }}>
            <a
              target="_blank"
              href="https://www.facebook.com/Three-Quality-Services"
            >
              <i
                style={{ fontSize: "16px", color: "black" }}
                className="fab fa-facebook"
              ></i>{" "}
              Three-Quality-Services
            </a>
          </span>
          <span style={{ marginRight: "50px" }}>
            <a
              target="_blank"
              href="https://www.twitter.com/Three-Quality-Services"
            >
              <i
                className="fab fa-twitter-square"
                style={{ fontSize: "16px", color: "black" }}
              ></i>{" "}
              Three-Quality-Services
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
