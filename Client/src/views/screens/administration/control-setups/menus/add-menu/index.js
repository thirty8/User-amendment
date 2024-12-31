import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function AddMenu({
  formData,
  disabled,
  handleClose,
  setStateChangeOfMenus,
}) {
  //   menu_id: menu_id,
  //             menu_level: menu_level,

  const [response, setResponse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [icon, setIcon] = useState("logo192.png");
  const [menu_level, setMenu_level] = useState("1"); // Initial state value
  const [parentmenu_level, setParentmenu_level] = useState("1"); // Initial state value

  const [menu_name, setMenu_Name] = useState(""); // Initial state value
  const [parent_menu_id, setParent_Menu_Id] = useState(""); // Initial state value
  const [color, setColor] = useState(""); // Initial state value
  const [type_code, setType_Code] = useState(""); // Initial state value
  const [file_name, setFile_Name] = useState(""); // Initial state value
  const [menu_url, setMenu_Url] = useState(""); // Initial state value
  const [menu_groupings, setMenu_Groupings] = useState(""); // Initial state value
  const [menu_permitted, setMenu_Permitted] = useState(""); // Initial state value
  const [bank_permission, setBank_Permission] = useState(""); // Initial state value
  const [menu_id, setMenu_Id] = useState(""); // Initial state value
  const [parent_menu_name, setParent_menu_name] = useState(""); // Initial state value

  const customTheme = JSON.parse(localStorage.getItem("theme"));
  const headerImage = customTheme.theme.headerImage;
  const bgColor = customTheme.theme.headerImage;



// function DoubleApostrophes() {
//   const [text, setText] = useState("")

//   const handleChange = (event) => {
//     setText(event.target.value.replace(/'/g, "''")); // Double apostrophes on every change
//   };

// //   return (
// //     <div>
// //       <input type="text" value={text} onChange={handleChange} />
// //       <p>Output: {text}</p>
// //     </div>
// //   );
// // }

//  default DoubleApostrophes;
  

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-menus-by-menu-level",
        { menu_level: parentmenu_level },
        { headers }
      )
      .then((res) => {
        setResponse(res.data);
      });
  }, [parentmenu_level]);

  const handleLevelChange = (event) => {
    setMenu_level(event.target.value); // Update the selectedLevel state with the selected value
  };
  const handleParentLevelChange = (event) => {
    setParentmenu_level(event.target.value); // Update the selectedLevel state with the selected value
  };
  

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

  async function handleSubmit(e) {
    e.preventDefault();

    // document.getElementById("saveBTN").disabled = true;

    const menu_id = Math.random().toString(36).slice(9);

    const type_code = "collapse-custom";
    // document.getElementById("type_code").value.replace(/'/g, "''");
    const file_name = menu_name.replace(/\s+/g, "-").toLowerCase();
    const menu_url = (
      "/"+ parent_menu_name.replace(/\s+/g, "-").toLowerCase() +
      "/" +
      menu_name.replace(/\s+/g, "-").toLowerCase()
    ).replace(/'/g,"''").replace(/[{()}]/g, "")
    ;

    if (
      menu_name === "" ||
      icon === "" ||
      menu_groupings === "" ||
      type_code === "" ||
      menu_url === "" ||
      menu_permitted === ""
      //    ||
      //   bank_permission === ""
    ) {
      swal({
        title: "All Fields Are Required",
        text: "Please fill all the fields",
        icon: "warning",
        button: "Ok",
      }).then((result) => {
        // Do something here..
        // document.getElementById("saveBTN").disabled = false;
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
            text: "Invalid File Type. The allowed file (extension) types include; '.png' only.",
            icon: "warning",
            dangerMode: true,
          }).then((result) => {
            // if (result) {
            //   document.getElementById("saveBTN").disabled = false;
            // }
          });
        }

        if (image_size > 1000000) {
          // check if image size is less than 1MB
          return swal({
            text: "The file size is too large. The maximum file size should be 1MB!",
            icon: "warning",
            dangerMode: true,
          }).then((result) => {
            if (result) {
              document.getElementById("saveBTN").disabled = false;
            }
          });
        }
      }
      const formData = new FormData();
      formData.append("menu_id", menu_id?.trim());
      formData.append("menu_level", menu_level);
      formData.append("menu_name", menu_name);
      formData.append("parent_menu_id", parent_menu_id?.trim());
      formData.append("menu_groupings", menu_groupings);
      formData.append("file", icon);
      formData.append("icon", "feather icon-monitor");
      formData.append("color", "#0047ab");
      formData.append("type_code", type_code);
      formData.append("file_name", file_name);
      formData.append("menu_url", menu_url);
      formData.append("menu_permitted", menu_permitted);
      formData.append("bank_permission", bank_permission);

      try {
        const response = await axios.post(
          API_SERVER + "/api/add-menu-icon",
          formData,
          { headers }
        );

        if (response) {
          // console.log(response);

          if (response.data[0].responseCode === "000") {
            // return alert("ghagahga");
            swal({
              title: "Added Successfully",
              text: "The menu icon has been added successfully",
              icon: "success",
              button: "Ok",
            }).then((result) => {
              if (result) {
                // document.getElementById("saveBTN").disabled = false;
                // document.getElementById("minimizeModal").click();
                // setStateChangeOfMenus(true);
              }
            });
          }
        } else {
          swal({
            title: "Something went wrong",
            text: "The menu icon could not be added",
            icon: "warning",
            button: "Ok",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    return false;
  }




  const arr = [
    "id",
    "menu_id",
    "menu_level",
    "menu_name",
    "parent_menu_id",
    "menu_groupings",
    "icon",
    "color",
    "type_code",
    "file_name",
    "menu_url",
    "menu_permitted",
    "bank_permission",
  ];
  const arr1 = [];
  arr.map((i) => {
    arr1.push(
      <>
        {(() => {
          if (i === "id") {
            return (
              <>
                <div key={i[0]} className="mb-3 flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "menu_level") {
            return (
              <>
                <div key={i[0]} className="mb-3 flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
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
          } else if (i === "icon") {
            return (
              <>
                <div key={i[0]} className="mb-3 flex items-center">
                  <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                    Menu {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    value="feather icon-folder"
                    onChange={(e) => this.value}
                    className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "file_name") {
            return (
              <>
                <div key={i[0]} className="flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "menu_name") {
            return (
              <>
                <div key={i[0]} className="-mt-3 mb-3 flex items-center">
                  <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "color") {
            return (
              <>
                <div key={i[0]} className="flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "menu_permitted" || i === "bank_permission") {
            return (
              <>
                <div key={i[0]} className="mb-3  flex items-center text-sm">
                  <label className="w-[30%] capitalize  font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <select
                    id={i}
                    className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                  >
                    <option value={"Y"}>Yes</option>
                    <option value={"N"} selected>
                      No
                    </option>
                  </select>
                </div>
              </>
            );
          } else if (i === "type_code") {
            return (
              <>
                <div key={i[0]} className="mb-3  flex items-center text-sm">
                  <label className="w-[30%] capitalize  font-semibold text-gray-400">
                    {/* {i.replace(/_/g, " ")} */}
                    Has Sub Menus?
                  </label>
                  <select
                    id={i}
                    className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                  >
                    <option value={"collapse"}>Yes</option>
                    <option value={"item"}>No</option>
                  </select>
                </div>
              </>

              // <SelectField
              // label={"as Sub Menus"}
              // labelWidth={"20%"}
              // input ={"80%"}
              // data={["yes", "no"]}

              // />
            );
          } else if (i === "parent_menu_id") {
            return (
              <>
                <div key={i[0]} className="flex items-center text-sm">
                  <label className="w-[30%] hidden capitalize  font-semibold text-gray-400">
                    {/* {i.replace(/_/g, " ")} */}
                    Has Sub Menus?
                  </label>
                  <select
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                  >
                    <option value={"collapse"}>Yes</option>
                    <option value={"item"}>No</option>
                  </select>
                </div>
              </>
            );
          } else if (i === "id") {
            return (
              <>
                <div key={i[0]} className="mb-3 flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "menu_url") {
            return (
              <>
                <div key={i[0]} className="flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else if (i === "menu_id") {
            return (
              <>
                <div key={i[0]} className="mb-0 -mt-8 flex items-center">
                  <label className="w-[30%] hidden capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] hidden border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    maxLength="4"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div key={i[0]} className="mb-3 flex items-center">
                  <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                    {i.replace(/_/g, " ")}
                  </label>
                  <input
                    id={i}
                    className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                    type="text"
                    disabled={disabled}
                  />
                </div>
              </>
            );
          }
        })()}
      </>
    );
  });

  console.log(response);
  console.log(menu_name);
  console.log(icon);
  console.log(menu_groupings);
  console.log(menu_permitted);
  console.log(bank_permission);
  console.log(type_code);
  console.log(menu_url);
  console.log(file_name);

  return (
    <>
      <div
        className="p-3"
        style={{
          zoom: "0.9",
          marginBottom: "-40px",
          backgroundColor: "#e0f2fe",
        }}
      >
        <ActionButtons
          displayFetch={"none"}
          displayCancel={"none"}
          displayAuthorise={"none"}
          displayDelete={"none"}
          displayReject={"none"}
          displayView={"none"}
          onOkClick={handleSubmit}
          okid={"saveBTN"}
        />

        {/* <div style={{ marginTop: "-32px", textAlign: "center", zoom: "0.95" }}>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sync" /><br />Refresh</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button id="saveBTN" className='btn btn-light' onClick={handleSubmit} style={{ color: "white", background: `url(` + window.location.origin + `/assets/images/headerBackground/` + headerImage + `)` }}><MDBIcon style={{ color: "white", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="save" /><br />Save</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="file-alt" /><br />New</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="question-circle" /><br />Help</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' onClick={() => document.getElementById("closeModalBTN").click()} style={{ color: "white", background: `url(` + window.location.origin + `/assets/images/headerBackground/` + headerImage + `)` }}><MDBIcon style={{ color: "white", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sign-out-alt" /><br />Exit</button>
          </span>

          </div>  */}

        <hr style={{ marginTop: "0px", marginBottom: "50px" }} />

        <form encType="multipart/form-data" className="">
          <>
            {/* <hr style={{ marginTop: "0px", marginBottom: "25px" }} /> */}

            {icon.type?.match(/image.*/) && (
              <>
                {/* <hr style={{ marginTop: "-20px", marginBottom: "15px" }} /> */}
                <div className="w-[100%] -mt-5 flex justify-center mb-4 bg-slate-100 p-1 rounded border-2 border-cyan-500 border-dashed ">
                  <img className="h-28" src={URL.createObjectURL(icon)} />
                </div>
                {/* <hr  style={{ marginBottom: "25px", marginTop: "-20px" }} /> */}
              </>
            )}

            <div className="mb-3 flex items-center">
              <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                Menu Name
              </label>
              <input
                onChange={(e) => {
                  setMenu_Name(e.target.value);
                  setMenu_Url(
                    (
                      "/" + menu_name.replace(/\s+/g, "-").toLowerCase()
                    ).replace(/[{()}]/g, "")
                  );
                  setType_Code("888");
                  setFile_Name(menu_name.replace(/\s+/g, "-").toLowerCase());

                  // Update the selectedLevel state with the selected value
                }}
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                type="text"
              />
            </div>

            <div className="mb-3  flex items-center text-sm">
              <label className="w-[30%] capitalize  font-semibold text-gray-400">
                Menu Level
              </label>
              <select
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                onChange={handleLevelChange} // Add onChange event handler
                value={menu_level} // Set the value of the select field based on the state
              >
                <option value={"0"} selected>
                  0
                </option>
                <option value={"1"}> 1 </option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
              </select>
            </div>

            
            <div className="mb-3  flex items-center text-sm">
              <label className="w-[30%] capitalize  font-semibold text-gray-400">
                Parent Level
              </label>
              <select
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                onChange={handleParentLevelChange}// Add onChange event handler
                value={parentmenu_level} // Set the value of the select field based on the state
              >
                <option value={"0"} selected>
                  0
                </option>
                <option value={"1"}> 1 </option>
                <option value={"2"}>2</option>
                {/* <option value={"3"}>3</option> */}?
              </select>
            </div> 
           

            <div className="mb-3 flex items-center">
              {}
              <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                Parent Name
              </label>
              {parentmenu_level === "3" ? (
                <input
                  className="w-[70%] border text-sm border-gray-400 focus:border-blue-400 focus:outline-none rounded-sm px-2 py-0.5"
                  type="text"
                  disabled // Add the disabled attribute when selectedLevel is "0"
                />
              ) : (
                //else
                <select
                  className="w-[70%] border text-sm border-gray-400 focus:border-blue-400 focus:outline-none rounded-sm px-2 py-0.5"
                  type="text"
                  placeholder="Enter Parent Name"
                  onChange={(e) => {
                    console.log(e, "karnama");
                    setParent_Menu_Id(e.target.value.split("-")[0].trim());

                    setParent_menu_name(e.target.value.split("-")[1].trim());
                     // Update the selectedLevel state with the selected value


                  }}
                  //   size={4} // Set the size attribute to limit the number of visible options
                  style={{ maxHeight: "50px" }}
                >
                  {response.map((item) => (
                    <option
                      value={`${item.menu_id} - ${item.menu_name}`}
                      style={{ color: "#000" }}
                    >
                      {item.menu_name}
                    </option>
                  ))}
                </select>

                // menu_id: menu_id,
                // color: color,
                // type_code: type_code,
                // file_name: file_name,
                // menu_url: menu_url,
              )}
            </div>
            <div className="mb-3 flex items-center">
              <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                Menu Grouping
              </label>
              <input
                onChange={(e) => {
                  setMenu_Groupings(e.target.value); // Update the selectedLevel state with the selected value
                }}
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                type="text"
              />
            </div>
            <div className="mb-3 flex items-center">
              <label className="w-[30%] capitalize text-sm font-semibold text-gray-400">
                Menu Icon
              </label>

              {menu_level == "3" ? (
                <label
                  style={{ textTransform: "uppercase" }}
                  className="bg-gray-400 w-[70%] font-semibold  text-white text-sm text-center rounded-sm px-2 py-1"
                >
                  Click To Select Icon
                  <input
                    accept="image/*"
                    type="file"
                    id="icon"
                    hidden
                    onChange={(e) => {
                      handleFileChange(e);
                      setIcon(e.target.files[0]); // Update the selectedLevel state with the selected value
                      setFile_Name(e.target.value);
                    }}
                  />
                </label>
              ) : (
                <input
                  value="feather icon-folder"
                  onChange={(e) => this.value}
                  className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                  type="text"
                  disabled
                />
              )}
            </div>

            <div className="mb-3  flex items-center text-sm">
              <label className="w-[30%] capitalize  font-semibold text-gray-400">
                Has Submenus
              </label>
              <select className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5">
                <option value={"Yes"}>Yes</option>
                <option value={"No"} selected>
                  No
                </option>
              </select>
            </div>

            <div className="mb-3  flex items-center text-sm">
              <label className="w-[30%] capitalize  font-semibold text-gray-400">
                Menu Permitted
              </label>
              <select
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                onChange={(e) => {
                  setMenu_Permitted(e.target.value); // Update the selectedLevel state with the selected value
                }}
              >
                <option value={"Y"}>Yes</option>
                <option value={"N"} selected>
                  No
                </option>
              </select>
            </div>

            <div className="mb-3  flex items-center text-sm">
              <label className="w-[30%] capitalize  font-semibold text-gray-400">
                Bank Permitted
              </label>
              <select
                className="w-[70%] border text-sm border-gray-400 focus:border-blue-400  focus:outline-none rounded-sm px-2 py-0.5"
                onChange={(e) => {
                  setBank_Permission(e.target.value); // Update the selectedLevel state with the selected value
                }}
              >
                <option value={"Y"}>Yes</option>
                <option value={"N"} selected>
                  No
                </option>
              </select>
            </div>
          </>

          {/*
          <hr />

           <div className="flex justify-end -mb-7">
            <button
              type="button"
              id="saveBTN"
              onClick={handleSubmit}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  bgColor +
                  `)`,
              }}
              className="text-white text-sm font-medium rounded-sm px-3 py-2"
            >
              Add Menu
            </button>
          </div> */}
        </form>
      </div>

      {/* <div className="float-right mt-2 -mb-1 pr-3 pl-3 w-[100%]">
            <hr />
            <div className="float-right -mt-1 mb-1">
            <button
              type="button"
              onClick={()=> document.getElementById("minimizeModal").click() }
              style={{ paddingLeft: "20px", paddingRight: "20px", color: "white" }}
              className="bg-gray-400 text-white text-sm font-medium rounded-sm px-3 py-2"
            >
              Minimize Modal
            </button>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <button
                type="button"
                onClick={()=> document.getElementById("closeModalBTN").click() }
                className="bg-red-500 text-white text-sm font-medium rounded-sm px-3 py-2"
            >
              Close Modal
            </button>
            </div>
          </div> */}
    </>
  );
}
