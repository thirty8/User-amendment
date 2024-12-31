import React, { useState, useEffect } from "react";
import coopTech from "../assets/coop.png";
import MenuComponent from "./MenuComponent";
import { API_SERVER } from "../config/constant";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  BarsOutlined,
  FolderOutlined,
} from "@ant-design/icons";

function SideNavComponent({ isMenuVisible }) {
  const [menu, setMenus] = useState("");
  const navigate = useNavigate();

  // const headers = {
  //   'x-api-key': process.env.REACT_APP_API_KEY,
  //   'Content-Type': 'application/json'
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function navigateToDashboard() {
    navigate("/");
  }

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const user_id = userInfo?.id;
  const authCode = userInfo?.authorityCode;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_SERVER}/api/get-menus-twene`,
          { userID: user_id, authorityCode: authCode },
          {
            headers,
          }
        );

        if (response.data.errorNum) {
          setMenus([]);
        } else {
          setMenus(createMenuTree(response.data));
        }
      } catch (error) {
        console.error(error);
        setMenus([]);
      }
    };

    fetchData();
  }, []);

  // console.log(menu,"menussssss")

  // Refines Data
  function createMenuTree(menuItems) {
    const menuMap = {};
    const rootItems = [];

    // Create a map of menu items using menu_id as the key
    menuItems.forEach((item) => {
      if (item.menu_level === "2") {
      } else {
        item.children = [];
      }
      menuMap[item.menu_id] = item;
    });

    // Build the tree structure by linking child items to their parent items
    menuItems.forEach((item) => {
      const parentMenuId = item.parent_menu_id;
      const menu_level = item.menu_level;
      let {
        menu_permitted,
        bank_permission,
        type_code,
        file_name,
        menu_groupings,
        menu_id,
        menu_url,
        parent_menu_id,
        menu_name,
        id,
        icon,
        ...others
      } = item;

      // console.log(item);

      const getColorForMenuItem = (item) => {
        // Add your color logic here based on the item properties or any other condition

        // console.log(item.menu_id);

        // Example color logic based on menu_id
        if (item.menu_id === "yufr") {
          return "red"; // Set color for menu_id 1
        } else if (item.menu_id === 2) {
          return "blue"; // Set color for menu_id 2
        } else {
          return "white"; // Default color
        }
      };

      const iconColor = getColorForMenuItem(item); // Replace getColorForMenuItem with your color logic

      if (parentMenuId && menuMap[parentMenuId]) {
        // console.log({ menuMap });
        let childKey = "";
        if (menu_level === "2") {
          menuMap[parentMenuId]?.children?.push({
            key: `${menu_url}?mid=${menu_id}`,
            label: (
              <div
                style={{ borderBottom: "1px solid #ffffff3b", color: "white" }}
                className={"subFIcons 2222 !poppins-regular" + icon}
              >
                {menu_name}
              </div>
            ),
            url: menu_url,
            menu_id: menu_id,
            icon: <FolderOutlined style={{ color: iconColor }} />,
            ...others,
          });
        } else {
          menuMap[parentMenuId]?.children?.push({
            key: `${id}`,
            label: (
              <div
                style={{ borderBottom: "1px solid #ffffff3b", color: "white" }}
                className={"subFIcons 111 !poppins-regular" + icon}
              >
                {menu_name}
              </div>
            ),
            url: menu_url,
            menu_id: menu_id,
            icon: <BarsOutlined style={{ color: iconColor }} />,
            ...others,
          });
        }
      } else {
        rootItems.push({
          key: "/?" + menu_id,
          label: (
            <div className={"subFIcons" + icon}>
              <div className="text-white !poppins-regular">{menu_name}</div>
              <div
                className="align-center pull-center"
                style={{ textAlign: "center" }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <hr
                    style={{
                      width: "100%",
                      borderTop: "1.6px solid rgba(255, 255, 255, 0.3)",
                      margin: 0,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          url: menu_url,
          menu_id: menu_id,
          icon: <AppstoreOutlined style={{ color: iconColor }} />,
          ...others,
        });
      }
    });

    const arr = [];
    rootItems.map((i) => {
      if (i.menu_level === "0") {
        arr.push(i);
      }
    });
    return arr;
  }

  return (
    <div
      // className={`w-[250px] menu ${isMenuVisible ? 'visible' : 'hidden'}`}
      className="w-[250px] min-h-screen bg-sky-700"
      style={{
        // height: "100vh",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        position: "relative",
        transition: "opacity 0.3s ease",
        opacity: isMenuVisible ? 1 : 0,
        pointerEvents: isMenuVisible ? "auto" : "none",
      }}
    >
      {/* coop tech logo */}

      <div
        className="cursor-pointer bg-sky-100"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {" "}
        <img
          src={coopTech}
          onClick={() => navigateToDashboard()}
          alt="Coop Tech"
          style={{ height: "98.5px" }}
        />
      </div>

      {/* menus */}
      {/* <hr className="mt-[6px]" /> */}
      <div style={{ height: "580px", overflowY: "auto" }} className="mt-0">
        <Scrollbars autoHide>
          {/* ant design menu goes here */}
          <MenuComponent menu={menu} />
        </Scrollbars>
      </div>

      {/* powered by section */}
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            padding: "5px",
            backgroundColor: "#e0f2fe",
            color: "#0369a1",
            fontWeight: "600",
          }}
          className="bg-sky-700 text-xs"
        >
          <hr />
          <div>
            <i>Powered By</i>
          </div>
          <div>X100 BANKING SYSTEMS</div>
        </div>
      </div>
    </div>
  );
}

export default SideNavComponent;

// import React, { useState, useEffect } from "react";
// import coopTech from "../assets/coop-1.png";
// import MenuComponent from "./MenuComponent";
// import { API_SERVER } from "../config/constant";
// import axios from "axios";
// import { Scrollbars } from "react-custom-scrollbars";
// import { useNavigate } from "react-router-dom";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
//   BarsOutlined,
//   FolderOutlined,
// } from "@ant-design/icons";
// import { Skeleton } from "antd";

// function SideNavComponent({ isMenuVisible }) {
//   const [menu, setMenus] = useState("");
//   const navigate = useNavigate();

//   // const headers = {
//   //   'x-api-key': process.env.REACT_APP_API_KEY,
//   //   'Content-Type': 'application/json'
//   // };

//   const headers = {
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   function navigateToDashboard() {
//     navigate("/");
//   }

//   const userInfoString = localStorage.getItem("userInfo");
//   const userInfo = JSON.parse(userInfoString);

//   const user_id = userInfo?.id;
//   const authCode = userInfo?.authorityCode;
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post(
//           `${API_SERVER}/api/get-menus-twene`,
//           { userID: user_id, authorityCode: authCode },
//           {
//             headers,
//           }
//         );

//         if (response.data.errorNum) {
//           setMenus([]);
//         } else {
//           setMenus(createMenuTree(response.data));
//         }
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error(error);
//         setMenus([]);
//       }
//     };

//     fetchData();
//   }, []);

//   var shimmerVal = [1, 2, 3, 4, 5, 6, 6, 7, 7, 1, 2, 3, 4];

//   // console.log(menu,"menussssss")

//   // Refines Data
//   function createMenuTree(menuItems) {
//     const menuMap = {};
//     const rootItems = [];

//     // Create a map of menu items using menu_id as the key
//     menuItems.forEach((item) => {
//       if (item.menu_level === "2") {
//       } else {
//         item.children = [];
//       }
//       menuMap[item.menu_id] = item;
//     });

//     // Build the tree structure by linking child items to their parent items
//     menuItems.forEach((item) => {
//       const parentMenuId = item.parent_menu_id;
//       const menu_level = item.menu_level;
//       let {
//         menu_permitted,
//         bank_permission,
//         type_code,
//         file_name,
//         menu_groupings,
//         menu_id,
//         menu_url,
//         parent_menu_id,
//         menu_name,
//         id,
//         icon,
//         ...others
//       } = item;

//       // console.log(item);

//       const getColorForMenuItem = (item) => {
//         // Add your color logic here based on the item properties or any other condition

//         // console.log(item.menu_id);

//         // Example color logic based on menu_id
//         if (item.menu_id === "yufr") {
//           return "red"; // Set color for menu_id 1
//         } else if (item.menu_id === 2) {
//           return "blue"; // Set color for menu_id 2
//         } else {
//           return "white"; // Default color
//         }
//       };

//       const iconColor = getColorForMenuItem(item); // Replace getColorForMenuItem with your color logic

//       if (parentMenuId && menuMap[parentMenuId]) {
//         // console.log({ menuMap });
//         // MENU LEVEL 3
//         let childKey = "";
//         if (menu_level === "2") {
//           menuMap[parentMenuId]?.children?.push({
//             key: `${menu_url}?mid=${menu_id}`,
//             label: (
//               <div
//                 style={{
//                   borderBottom: "1px solid #ffffff3b",
//                   color: "#2e2e2e",
//                 }}
//                 className={"subFIcons 2222 " + icon}
//               >
//                 {menu_name}
//               </div>
//             ),
//             url: menu_url,
//             menu_id: menu_id,
//             icon: (
//               <FolderOutlined
//                 style={{
//                   // backgroundColor: "#fce8ff",
//                   height: "35px",
//                   borderRadius: "50%",
//                   width: "35px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   // color: "purple",
//                 }}
//               />
//             ),
//             ...others,
//           });
//         } else {
//           // MENU LEVEL 2
//           menuMap[parentMenuId]?.children?.push({
//             key: `${id}`,
//             label: (
//               <div
//                 style={{
//                   borderBottom: "1px solid #ffffff3b",
//                   color: "#2e2e2e",
//                   overflowX: "scroll",
//                 }}
//                 className={"scroll subFIcons 111 " + icon}
//               >
//                 {menu_name}
//               </div>
//             ),
//             url: menu_url,
//             menu_id: menu_id,
//             icon: (
//               <BarsOutlined
//                 style={{
//                   // backgroundColor: "#e6f1df",
//                   height: "35px",
//                   borderRadius: "50%",
//                   width: "35px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   // color: "green",
//                 }}
//               />
//             ),
//             ...others,
//           });
//         }
//       } else {
//         // MENU LEVEL 1
//         rootItems.push({
//           key: "/?" + menu_id,
//           label: (
//             <div className={"scroll subFIcons" + icon}>
//               <div className="text-[#2e2e2e]">{menu_name}</div>
//               <div
//                 className="align-center pull-center"
//                 style={{ textAlign: "center" }}
//               >
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                   <hr
//                     style={{
//                       width: "100%",
//                       borderTop: "1.6px solid rgba(255, 255, 255, 0.3)",
//                       margin: 0,
//                       // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ),
//           url: menu_url,
//           menu_id: menu_id,
//           icon: (
//             <AppstoreOutlined
//               style={{
//                 // backgroundColor: "#d4e2ff",
//                 height: "35px",
//                 borderRadius: "50%",
//                 width: "35px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 // color: "#0063d1",
//               }}
//             />
//           ),
//           ...others,
//         });
//       }
//     });

//     const arr = [];
//     rootItems.map((i) => {
//       if (i.menu_level === "0") {
//         arr.push(i);
//       }
//     });
//     return arr;
//   }

//   return (
//     <div
//       // className={`w-[250px] menu ${isMenuVisible ? 'visible' : 'hidden'}`}
//       className="w-[250px] min-h-screen !text-[#0063d1]"
//       // side nav new color
//       style={{
//         position: "relative",
//         transition: "opacity 0.3s ease",
//         opacity: isMenuVisible ? 1 : 0,
//         pointerEvents: isMenuVisible ? "auto" : "none",
//         backgroundColor: "white",
//       }}
//     >
//       {/* coop tech logo */}

//       <div
//         className="cursor-pointer "
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "15px",
//         }}
//       >
//         {" "}
//         <img
//           src={coopTech}
//           onClick={() => navigateToDashboard()}
//           alt="Coop Tech"
//           className="h-[99px] pt-3"
//         />
//       </div>

//       <hr />

//       {/* menus */}
//       {/* <hr className="mt-[6px]" />  bg-[#0063d1]*/}
//       {!loading ? (
//         <div
//           style={{ height: "580px", overflowY: "auto" }}
//           className="mt-0 shadow"
//         >
//           <Scrollbars autoHide>
//             {/* ant design menu goes here */}
//             <MenuComponent menu={menu} />
//           </Scrollbars>
//         </div>
//       ) : (
//         <div className="space-y-10 px-5 flex-1" style={{ zoom: 0.6 }}>
//           {shimmerVal.map((i) => (
//             <div className="flex items-center space-x-4">
//               <div
//                 className="h-8 w-10 overflow-hidden relative bg-[#e2e2e2] rounded-md"
//                 style={{ content: "" }}
//               ></div>

//               <Skeleton.Input
//                 style={{ width: "100%", borderRadius: "6px " }}
//                 size="small"
//                 className="w-full"
//                 active
//                 block
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* powered by section */}
//       <div>
//         <div className="text-[11px] text-left flex flex-col pt-2 pl-6 space-y-1">
//           {/* <div>Powered by: </div> */}
//           <div className="flex flex-col">
//             <span> Powered by</span>
//             <span className="font-bold">X.100 BANKING SYSTEMS</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideNavComponent;
