import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMail,
  FiPackage,
  FiPaperclip,
  FiSettings,
} from "react-icons/fi";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const MenuComponent = ({ menu }) => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("");
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (menu && menu.length > 0) {
      const firstSubmenuKey =
        menu[0].children && menu[0].children.length > 0 ? [menu[0].key] : [];
      setDefaultOpenKeys(firstSubmenuKey);
    }
  }, [menu]);

  function handleMenuItemClick(item) {
    // return alert(item.key);
    if (item.key === "/?corP") {
      // alert(item.key);
      window.open("http://10.203.14.121:8181/ords/f?p=500:9999", "_blank");
      setSelectedKey(item.key);
    } else if (item.key === "/?corHR") {
      // alert(item.key);
      window.open("http://10.203.14.73/xhrm_coptech/app/login.php", "_blank");
      setSelectedKey(item.key);
    } else if (item.key === "/?corMIS") {
      // alert(item.key);
      window.open(
        "http://10.203.14.145:8181/ords/r/mis_user/kpi-dashboard106113113115120/home-page-template?session=12152114465226",
        "_blank"
      );
      setSelectedKey(item.key);
    } else {
      setSelectedKey(item.key);
      navigate(item.key);
    }
  }

  const renderMenuItems = (menuItems) => {
    if (!Array.isArray(menuItems)) {
      console.error("menuItems is not an array.");
      return null; // or return a default menu item if needed
    }

    return menuItems.map((menuItem) => {
      if (menuItem.children && menuItem.children.length > 0) {
        const isOpen = menuItem.key === selectedKey;
        return (
          <Menu.SubMenu
            key={menuItem.key}
            title={menuItem.label}
            icon={menuItem.icon}
            onTitleClick={() => setSelectedKey(isOpen ? "" : menuItem.key)}
          >
            {renderMenuItems(menuItem.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={menuItem.key}
            icon={menuItem.icon}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            {menuItem.label}
          </Menu.Item>
        );
      }
    });
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedKey("");
    }
  }, [location.pathname]);

  return (
    <div>
      <style>
        {`
          .ant-menu-item-selected:not(.ant-menu-item-selected-active) {
            background-color: #15aabf !important;
            color: black !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4) !important;
            transition: none !important;
          }
        `}
      </style>
      <Menu
        mode="inline"
        style={{ color: "white", lineHeight: "2.5" }}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[selectedKey]}
        className="menComp bg-sky-700 hover:text-black"
      >
        {renderMenuItems(menu)}
      </Menu>
    </div>
  );
};

export default MenuComponent;

// import React, { useState, useEffect } from "react";
// import { Menu } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";

// const MenuComponent = ({ menu }) => {
//   const navigate = useNavigate();
//   const [selectedKey, setSelectedKey] = useState("");
//   const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     if (menu && menu.length > 0) {
//       const firstSubmenuKey =
//         menu[0].children && menu[0].children.length > 0 ? [menu[0].key] : [];
//       setDefaultOpenKeys(firstSubmenuKey);
//     }
//   }, [menu]);

//   function handleMenuItemClick(item) {
//     // return alert(item.key);
//     if (item.key === "/?corP") {
//       // alert(item.key);
//       window.open("http://10.203.14.121:8181/ords/f?p=500:9999", "_blank");
//       setSelectedKey(item.key);
//     } else if (item.key === "/?corHR") {
//       // alert(item.key);
//       window.open("http://10.203.14.73/xhrm_coptech/app/login.php", "_blank");
//       setSelectedKey(item.key);
//     } else if (item.key === "/?corMIS") {
//       // alert(item.key);
//       window.open(
//         "http://10.203.14.145:8181/ords/r/mis_user/kpi-dashboard106113113115120/home-page-template?session=12152114465226",
//         "_blank"
//       );
//       setSelectedKey(item.key);
//     } else {
//       setSelectedKey(item.key);
//       navigate(item.key);
//     }
//   }

//   const renderMenuItems = (menuItems) => {
//     if (!Array.isArray(menuItems)) {
//       console.error("menuItems is not an array.");
//       return null; // or return a default menu item if needed
//     }

//     return menuItems.map((menuItem) => {
//       if (menuItem.children && menuItem.children.length > 0) {
//         const isOpen = menuItem.key === selectedKey;
//         return (
//           <Menu.SubMenu
//             className="poppins-regular"
//             key={menuItem.key}
//             title={menuItem.label}
//             icon={menuItem.icon}
//             onTitleClick={() => setSelectedKey(isOpen ? "" : menuItem.key)}
//           >
//             {renderMenuItems(menuItem.children)}
//           </Menu.SubMenu>
//         );
//       } else {
//         return (
//           <Menu.Item
//             key={menuItem.key}
//             icon={menuItem.icon}
//             className="poppins-regular"
//             onClick={() => handleMenuItemClick(menuItem)}
//           >
//             {menuItem.label}
//           </Menu.Item>
//         );
//       }
//     });
//   };

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setSelectedKey("");
//     }
//   }, [location.pathname]);

//   return (
//     <div>
//       <style>
//         {`
//           .ant-menu-item-selected:not(.ant-menu-item-selected-active) {
//             background-color: none !important;
//             color: #0063d1 !important;
//             transition: all 0.2s ease  !important;
//             border-left: 7px solid purple !important;
//             border-radius: 0px !important;
//             border-top-right-radius: 5px !important
//             border-bottom-right-radius: 5px !important
//           }
//         `}
//       </style>
//       <Menu
//         mode="inline"
//         style={{ color: "#0063d1", lineHeight: "2.5" }}
//         defaultOpenKeys={defaultOpenKeys}
//         selectedKeys={[selectedKey]}
//         className="menComp  hover:text-black"
//       >
//         {renderMenuItems(menu)}
//       </Menu>
//     </div>
//   );
// };

// export default MenuComponent;
