import swal from "sweetalert";
import { useEffect, useState } from "react";
import { API_SERVER } from "../../../../../config/constant";
import { APP_URL } from "../../../../../config/constant";
import axios from "axios";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",

  "Content-Type": "application/json",
};
export default function FormLayout({ formData, disabled, handleClose }) {
  // console.log(formData, "from last");
  const [icon, setIcon] = useState("/assets/menu-icons/no-image.png");
  const [parentMenuLevel1, setParentMenuLevel1] = useState([]);
  const [parentMenuLevel2, setParentMenuLevel2] = useState([]);
  const [parentMenuLevel3, setParentMenuLevel3] = useState([]);
  const [parentMenuLevel4, setParentMenuLevel4] = useState([]);

  async function handleImageError(ev) {
    ev.target.src = "/assets/menu-icons/no-image.png";
  }

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: 0 },
        { headers }
      )
      .then((res) => {
        setParentMenuLevel1(res.data);
      });
  }, []);

  console.log({ parentMenuLevel1 });
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: 1 },
        { headers }
      )
      .then((res) => {
        setParentMenuLevel2(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: 2 },
        { headers }
      )
      .then((res) => {
        setParentMenuLevel3(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: 3 },
        { headers }
      )
      .then((res) => {
        setParentMenuLevel4(res.data);
      });
  }, []);

  const arr = Object.entries(formData);
  const arr1 = [];

  function handleFileChange(e) {
    let filesize = (e.target.files[0].size / 1024 / 1024).toFixed(4); // MB
    if (filesize > 1) {
      swal({
        title: "Oops...",
        text: "File size should be less than 1MB",
        icon: "error",
      }).then((res) => {
        // console.log(res);
      });
    } else {
      setIcon(e.target.files[0]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (menuLevel === "3" && document.getElementById("icon")?.files[0]) {
      // console.log("update with menu icon");
      const id = document.getElementById("id").value.replace(/'/g, "''");
      const menu_level = 3;
      const menu_name = document
        .getElementById("menu_name")
        .value.replace(/'/g, "''");
      const menu_id = Math.random().toString(36).slice(9);
      const parent_menu_id = document
        .getElementById("parent_menu_id")
        .value.replace(/'/g, "''");
      const menu_groupings = document
        .getElementById("menu_groupings")
        .value.replace(/'/g, "''");
      const file = icon;
      const color = "#000000";
      const type_code = "item";
      const file_name = menu_name.replace(/\s+/g, "-").toLowerCase();
      const menu_url = "GHANA";
      const menu_permitted = document
        .getElementById("menu_permitted")
        .value.replace(/'/g, "''");
      const bank_permission = document
        .getElementById("bank_permission")
        .value.replace(/'/g, "''");

      if (
        menu_name === "" ||
        file === "" ||
        parent_menu_id === "" ||
        menu_groupings === "" ||
        type_code === "" ||
        menu_url === "" ||
        menu_permitted === "" ||
        bank_permission === ""
      ) {
        return swal({
          title: "Required Fields",
          text: "Please complete all requied fields",
          icon: "warning",
          button: "Ok",
        });
      } else {
        var property = document.getElementById("icon")?.files[0];

        // console.log(property, "property");
        if (property) {
          var image_size = property.size;

          var image_name = property.name;
          var image_extension = image_name.split(".").pop().toLowerCase();
          // console.log(image_extension, "gh");
          if (!["png"].includes(image_extension)) {
            return swal({
              text: "Invalid File Type. Only '.png' file types allowed.",
              icon: "warning",
              dangerMode: true,
            });
          }

          if (image_size > 1000000) {
            // check if image size is less than 1MB
            return swal({
              text: "The file size is too large. The maximum file size should be 1MB!",
              icon: "warning",
              dangerMode: true,
            });
          }
        }
        const formData = new FormData();

        formData.append("menu_id", menu_id);
        formData.append("id", id);
        formData.append("menu_level", menu_level);
        formData.append("menu_name", menu_name);
        formData.append("parent_menu_id", parent_menu_id);
        formData.append("menu_groupings", menu_groupings);
        formData.append("fileX", icon);
        formData.append("icon", "feather icon-monitor");
        formData.append("color", color);
        formData.append("type_code", type_code);
        formData.append("file_name", file_name);
        formData.append("menu_url", menu_url);
        formData.append("menu_permitted", menu_permitted);
        formData.append("bank_permission", bank_permission);

        try {
          const response = await axios.post(
            API_SERVER + "/api/update-menu-details",
            formData,
            { headers }
          );
          // return console.log(response);
          if (response) {
            if (response.data[0].responseCode === "000") {
              return swal({
                title: "Update Successful",
                text: "The menu details has been updated",
                icon: "success",
                button: "Ok",
              }).then((result) => {
                if (result) {
                  handleClose();
                }
              });
            }
          } else {
            console.log("Something went wrong...");
          }
        } catch (e) {
          console.log(e);
        }
      }
      // return false;
    } else {
      // console.log("notFormara");
      const id = document.getElementById("id").value.replace(/'/g, "''");
      const menu_id = document
        .getElementById("menu_id")
        .value.replace(/'/g, "''");
      const menu_level = document
        .getElementById("menu_level")
        .value.replace(/'/g, "''");
      const menu_name = document
        .getElementById("menu_name")
        .value.replace(/'/g, "''");
      const parent_menu_id = document
        .getElementById("parent_menu_id")
        .value.replace(/'/g, "''");
      const menu_groupings = document
        .getElementById("menu_groupings")
        .value.replace(/'/g, "''");
      const icon = document.getElementById("icon").value.replace(/'/g, "''");
      const color = document.getElementById("color").value.replace(/'/g, "''");
      const type_code = document
        .getElementById("type_code")
        .value.replace(/'/g, "''");
      const file_name = document
        .getElementById("file_name")
        .value.replace(/'/g, "''");
      const menu_url = document
        .getElementById("menu_url")
        .value.replace(/'/g, "''");
      const menu_permitted = document
        .getElementById("menu_permitted")
        .value.replace(/'/g, "''");
      const bank_permission = document
        .getElementById("bank_permission")
        .value.replace(/'/g, "''");

      // return console.log("ghaga");
      try {
        const response = await axios.post(
          API_SERVER + "/api/update-menu-details",
          {
            id: id,
            menu_id: menu_id,
            menu_level: menu_level,
            menu_name: menu_name,
            parent_menu_id: parent_menu_id,
            menu_groupings: menu_groupings,
            icon: icon,
            color: color,
            type_code: type_code,
            file_name: file_name,
            menu_url: menu_url,
            menu_permitted: menu_permitted,
            bank_permission: bank_permission,
          },
          { headers }
        );
        if (response) {
          // console.log(response, "I reach here..");
          if (response.data[0].responseCode === "000") {
            swal({
              title: "Update Successful",
              text: "The menu details has been updated",
              icon: "success",
              button: "Ok",
            }).then((result) => {
              if (result) {
                handleClose();
              }
            });
          }
        } else {
          alert("Something went wrong...");
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const bgColor = customTheme.theme.headerImage;

  let menuLevel;
  let IconName;
  arr.map((i) => {
    if (i[0] === "menu_level") {
      menuLevel = i[1];
    }

    if (i[0] === "menu_name") {
      // useEffect(() => {
      // setIcon(
      //   "/assets/menu-icons/" +
      //     i[1].replace(/\s+/g, "-").toLowerCase() +
      //     ".png"
      // );
      // }, []);
    }
    arr1.push(
      <div key={i[0]}>
        {(() => {
          if (disabled) {
            if (i[0] === "id") {
              return (
                <>
                  <hr />
                  <div key={i[0]} className="mb-3 flex items-center">
                    <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                      {i[0].replace(/_/g, " ")}
                    </label>
                    <input
                      id={i[0]}
                      className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                      type="text"
                      disabled={disabled}
                      defaultValue={i[1]}
                    />
                  </div>
                </>
              );
            } else if (i[0] === "menu_id") {
              return (
                <>
                  <div key={i[0]} className="mb-3 -mt-5 flex items-center">
                    <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                      {i[0].replace(/_/g, " ")}
                    </label>
                    <input
                      id={i[0]}
                      className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                      type="text"
                      disabled={disabled}
                      defaultValue={i[1]}
                    />
                  </div>
                </>
              );
            } else if (i[0] === "parent_menu_id") {
              if (menuLevel === "1") {
                return (
                  <>
                    <div
                      key={i[0]}
                      className="mb-3 hidden -mt-0 flex items-center"
                    >
                      <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                        {i[0].replace(/_/g, " ")}
                      </label>
                      <input
                        id={i[0]}
                        className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                        type="text"
                        disabled={disabled}
                        key={i[1]}
                        defaultValue={i[1]}
                      />
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div key={i[0]} className="mb-3 -mt-0 flex items-center">
                      <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                        {i[0].replace(/_/g, " ")}
                      </label>
                      <input
                        id={i[0]}
                        className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                        type="text"
                        disabled={disabled}
                        key={i[1]}
                        defaultValue={i[1]}
                      />
                    </div>
                  </>
                );
              }
            } else if (i === "menu_groupings") {
              return (
                <>
                  <div key={i[0]} className="mb-3 flex items-center">
                    <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                      {i.replace(/_/g, " ")}
                    </label>
                    <input
                      id={i}
                      maxLength={11}
                      className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                      type="text"
                      disabled={disabled}
                    />
                  </div>
                </>
              );
            } else if (
              i[0] === "menu_permitted" ||
              i[0] === "bank_permission"
            ) {
              return (
                <>
                  <div key={i[0]} className="mb-3 flex items-center">
                    <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                      {i[0].replace(/_/g, " ")}
                    </label>
                    <input
                      className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                      type="text"
                      disabled={disabled}
                      defaultValue={i[1] === "Y" ? "Yes" : "No"}
                    />
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div key={i[0]} className="mb-3 flex items-center">
                    <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                      {i[0].replace(/_/g, " ")}
                    </label>
                    <input
                      className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                      type="text"
                      disabled={disabled}
                      defaultValue={i[1]}
                    />
                  </div>
                </>
              );
            }
          } else {
            return (
              <>
                {(() => {
                  if (i[0] === "id") {
                    return (
                      <>
                        <div key={i[0]} className="mb-3 flex items-center">
                          <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>
                          <input
                            id={i[0]}
                            className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                            type="text"
                            disabled={disabled}
                            defaultValue={i[1]}
                          />
                        </div>
                      </>
                    );
                  } else if (
                    i[0] === "menu_permitted" ||
                    i[0] === "bank_permission"
                  ) {
                    return (
                      <>
                        <div key={i[0]} className="mb-3  flex items-center">
                          <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>
                          <select
                            id={i[0]}
                            defaultValue={i[1]}
                            className="w-[70%]"
                          >
                            <option value={"Y"}>Yes</option>
                            <option value={"N"}>No</option>
                          </select>
                        </div>
                      </>
                    );
                  } else if (i[0] === "parent_menu_id") {
                    if (menuLevel === "0") {
                      return;
                    } else if (menuLevel === "1") {
                      return (
                        <>
                          <div className="mb-3  flex items-center">
                            <label className="w-[30%]  capitalize text-sm font-semibold text-gray-400">
                              {i[0].replace(/_/g, " ")}
                            </label>
                            <select id={i[0]} key={i[1]} className="w-[70%] ">
                              {parentMenuLevel1.map((x) => (
                                <>
                                  <option
                                    key={i[1]}
                                    selected={i[1] == x.menu_id}
                                    value={x.menu_id}
                                  >
                                    {x.menu_id + " (" + x.menu_name + ")"}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </>
                      );
                    } else if (menuLevel === "2") {
                      return (
                        <>
                          <div className="mb-3 flex items-center">
                            <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                              {i[0].replace(/_/g, " ")}
                            </label>
                            <select id={i[0]} key={i[1]} className="w-[70%]">
                              {parentMenuLevel2.map((x) => (
                                <>
                                  <option
                                    key={i[1]}
                                    selected={i[1] == x.menu_id}
                                    value={x.menu_id}
                                  >
                                    {x.menu_id + " (" + x.menu_name + ")"}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </>
                      );
                    } else if (menuLevel === "3") {
                      return (
                        <>
                          <div className="mb-3 flex items-center">
                            <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                              {i[0].replace(/_/g, " ")}
                            </label>
                            <select id={i[0]} key={i[1]} className="w-[70%]">
                              {parentMenuLevel3.map((x) => (
                                <>
                                  <option
                                    key={i[1]}
                                    selected={i[1] == x.menu_id}
                                    value={x.menu_id}
                                  >
                                    {x.menu_id + " (" + x.menu_name + ")"}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </>
                      );
                    }
                    // else if(menuLevel === "0"){
                    //   return
                    // }
                    else {
                      return (
                        <>
                          <div className="mb-3 flex items-center">
                            <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                              {i[0].replace(/_/g, " ")}
                            </label>
                            <select id={i[0]} key={i[1]} className="w-[70%]">
                              {parentMenuLevel2.map((x) => (
                                <>
                                  <option
                                    key={i[1]}
                                    selected={i[1] == x.menu_id}
                                    value={x.menu_id}
                                  >
                                    {x.menu_id + " (" + x.menu_name + ")"}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </>
                      );
                    }
                  } else if (i[0] === "icon" && menuLevel === "3") {
                    return (
                      <>
                        <div key={i[0]} className="mb-3  flex items-center">
                          <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>

                          <label className="bg-cyan-500 w-[70%] font-semibold  text-white text-sm text-center rounded-sm px-2 py-1">
                            Upload Icon
                            <input
                              accept="image/*"
                              type="file"
                              id="icon"
                              hidden
                              onChange={(e) => {
                                handleFileChange(e);
                                // console.log(e.target.files[0]);
                              }}
                            />
                          </label>
                        </div>
                      </>
                    );
                  } else if (i === "menu_groupings") {
                    return (
                      <>
                        <div key={i[0]} className="mb-3 flex items-center">
                          <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                            {i.replace(/_/g, " ")}
                          </label>
                          <input
                            id={i}
                            maxLength={11}
                            className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                            type="text"
                            disabled={disabled}
                          />
                        </div>
                      </>
                    );
                  } else if (i[0] === "id") {
                    return (
                      <>
                        <div key={i[0]} className="mb-3 flex items-center">
                          <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>
                          <input
                            id={i[0]}
                            className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                            type="text"
                            disabled={disabled}
                            defaultValue={i[1]}
                          />
                        </div>
                      </>
                    );
                  } else if (i[0] === "menu_id") {
                    return (
                      <>
                        <div
                          key={i[0]}
                          className="mb-3 -mt-5 flex items-center"
                        >
                          <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>
                          <input
                            id={i[0]}
                            className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                            type="text"
                            disabled={disabled}
                            defaultValue={i[1]}
                          />
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div key={i[0]} className="mb-3 flex items-center">
                          <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                            {i[0].replace(/_/g, " ")}
                          </label>
                          <input
                            id={i[0]}
                            className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                            type="text"
                            disabled={disabled}
                            defaultValue={i[1]}
                          />
                        </div>
                      </>
                    );
                  }
                })()}
              </>
            );
          }
        })()}
      </div>
    );
  });

  // console.log(arr, "from FormDat");
  // arr1.shift();

  //this is the edit component
  return (
    <>
      <div className="">
        {menuLevel === "3" && (
          <div className="flex justify-center bg-slate-200 p-2 border-2 border-dashed border-cyan-500 mb-4 rounded-sm">
            <img
              className="h-20"
              src={typeof icon !== "string" ? URL.createObjectURL(icon) : icon}
              onError={(ev) => handleImageError(ev)}
            />
          </div>
        )}
        <div className="mt-4">{arr1}</div>
        {!disabled && (
          <>
            <hr />

            <div className="flex justify-end mt-2 mb-2">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-cyan-500 text-white text-sm font-medium rounded-sm px-3 py-2"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
