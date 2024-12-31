import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { RiAddCircleLine } from "react-icons/ri";
import ModuleComponent from "./components/ModuleComponent";
import CustomTable from "../../../../../components/others/customtable";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import AddForm from "./components/AddForm";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function AccessFormManagement() {
  const [userGroupData, setUserGroupData] = useState([]);
  const [allModulesFromUserGroup, setAllModulesFromUserGroup] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [count, setCount] = useState(1);
  const [allComponents, setAllComponents] = useState([]);
  const [userGroup, setUserGroup] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customUserGroup, setCustomUserGroup] = useState("");
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      // get userGroup
      async function getUserGroup() {
        return await axios.post(API_SERVER + "/api/get-code-details", { code: "ACS" }, { headers });
      }

      // get module response
      async function getModuleResponse() {
        return await axios.post(
          API_SERVER + "/api/access-form-management",
          {
            lov: "true",
          },
          {
            headers,
          }
        );
      }

      Promise.all([getUserGroup(), getModuleResponse()]).then((response) => {
        setUserGroupData(response[0]?.data);
        setModuleData(response[1]?.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // getting user group lovs
  useEffect(() => {
    fetchData();
  }, []); //

  //  using count to set component
  useEffect(() => {
    const array = [];
    if (count > 1) {
      array.push(<ModuleComponent lovData={moduleData} myCount={count} />);
    }
    setAllComponents([...allComponents, array]);
  }, [count]);

  //  onClick on add button
  const addBtnOnclick = () => {
    setCount((prev) => prev + 1);
  };

  // onChange on modules
  // fetch all user groups
  const fetchAllUserGroups = async () => {
    setLoading(true);
    const array = [];
    await axios
      .post(
        API_SERVER + "/api/access-form-management",
        { get_all_user_groups: "true", access_code: userGroup },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setShowBtn(true);
          setLoading(false);
          response?.data?.map((i) => {
            const { form_code, menu_name } = i;
            array.push([
              form_code,
              menu_name,
              <div className="flex justify-center">
                <span>
                  <ButtonComponent
                    buttonIcon={<MdClose color={"white"} size={20} />}
                    buttonHeight={"26px"}
                    onClick={() => deleteRow(userGroup, form_code)}
                  />
                </span>
              </div>,
            ]);
          });
          setAllModulesFromUserGroup(array);
        } else {
          setLoading(false);
          setShowBtn(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setShowBtn(false);
        console.error(`error caught : ${err}`);
      });
  };

  useEffect(() => {
    fetchAllUserGroups();
  }, [userGroup]);

  // fetch all user when data has been added to the use group or when modal closes
  useEffect(() => {
    fetchAllUserGroups();
  }, [run]);

  // delete row in table
  const deleteRow = async (access_code, screen_code) => {
    Swal.fire({
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            API_SERVER + "/api/access-form-management",
            {
              procedureType: "delete access",
              access_code: access_code,
              screen_code: screen_code,
            },
            { headers }
          )
          .then((response) => {
            if (response) {
              Swal.fire({
                text: response?.data?.msg,
                icon: "success",
                timer: 1500,
              }).then(() => {
                setRun(!run);
              });
            }
          });
      }
    });
  };

  const openModal = () => {
    setFormModal(true);
  };

  return (
    <div>
      {/* action buttons  */}
      <div className="mb-2 mt-1">
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayFetch={"none"}
          displayHelp={"none"}
          displayNew={"none"}
          displayOk={"none"}
          displayRefresh={"none"}
          displayView={"none"}
          displayReject={"none"}
        />
      </div>

      <hr className="border-2 mb-2" style={{ marginTop: "20px" }} />

      {/* user group   */}
      <div className="w-full flex justify-center">
        <div className="w-[70%] pt-3 pb-3">
          <ListOfValue
            label={"User Group"}
            labelWidth={"23%"}
            inputWidth={"50%"}
            required={true}
            data={userGroupData}
            onChange={(value) => {
              setUserGroup(value);
              const selectedOption = userGroupData?.find((option) => option?.value === value);
              setCustomTitle(selectedOption?.label?.split("-")[1]);
              setCustomUserGroup(selectedOption?.label);
            }}
          />
        </div>
      </div>

      <hr className="border-2 mt-2 mb-5" />

      {/* button for adding row  */}
      {showBtn && (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <span style={{ display: "flex", justifyContent: "flex-end", flex: 0.7 }}>
            <ButtonComponent
              buttonIcon={<RiAddCircleLine size={20} />}
              label={"Add"}
              buttonColor={"white"}
              buttonWidth={"10%"}
              onClick={openModal}
              type={"button"}
            />
          </span>
        </div>
      )}

      {/* here    ------------------------------ */}
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }} className="mt-3">
        <span style={{ flex: 0.7 }}>
          <CustomTable
            headers={["Code", "Description", "Action"]}
            data={allModulesFromUserGroup}
            rowsPerPage={10}
            load={loading}
          />
        </span>
      </div>

      {/* open modal for form   */}
      {
        <AddForm
          formModal={formModal}
          customTitle={customTitle}
          customUserGroup={customUserGroup}
          addBtnOnclick={addBtnOnclick}
          userGroupCode={userGroup}
          lovData={moduleData}
          setCloseModal={() => {
            setRun(!run);
            setFormModal(false);
          }}
        />
      }
    </div>
  );
}

export default AccessFormManagement;
