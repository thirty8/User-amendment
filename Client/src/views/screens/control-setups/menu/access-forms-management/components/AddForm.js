import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import Header from "../../../../../../components/others/Header/Header";
import axios from "axios";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ModuleComponent from "./ModuleComponent";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../../../config/constant";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function AddForm({
  formModal,
  customTitle,
  customUserGroup,
  userGroupCode,
  lovData,
  setCloseModal,
}) {
  const [allComponents, setAllComponents] = useState([1]);
  const [modules, setModules] = useState([]);

  const addComponent = () => {
    setAllComponents((prevButtons) => [...prevButtons, prevButtons.length + 1]);
  };

  const handleClose = () => {
    setCloseModal();
    setAllComponents([1]);
    setModules([]);
  };

  const handleSave = () => {
    const filteredModules = modules?.filter((module) => {
      return module?.access_role !== "" || module?.screen_code !== "";
    });

    if (modules?.length <= 0) {
      axios
        .post(
          API_SERVER + "/api/access-form-management",
          { procedureType: "grant access", access_v: filteredModules },
          { headers }
        )
        .then((response) => {
          Swal.fire({
            text: response?.data?.msg,
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        });
    } else if (modules?.length > 0) {
      axios
        .post(
          API_SERVER + "/api/access-form-management",
          { procedureType: "grant access", access_v: filteredModules },
          { headers }
        )
        .then((response) => {
          if (response?.data?.msg === "1") {
            // if (response.data === "Form Added Successfully") {
            Swal.fire({
              text: "User Group Created Successfully",
              icon: "success",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          } else {
            Swal.fire({
              text: response?.data?.msg,
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        });
    } else {
      return false;
    }
  };

  return (
    <div>
      <Modal
        opened={formModal}
        withCloseButton={false}
        padding={0}
        trapFocus={false}
        size={"lg"}
        onClose={handleClose}
      >
        <div>
          {/* header  */}
          <div className="w-full min-h-[450px]">
            <span className="w-[80%]">
              <Header
                title={`Add Form To  user group${customTitle} `}
                headerShade={true}
                closeIcon={true}
                handleClose={handleClose}
              />
            </span>

            <div className="w-full flex justify-center mt-5">
              <InputField
                label={"User Group"}
                labelWidth={"25%"}
                inputWidth={"60%"}
                disabled={true}
                value={customUserGroup}
                textAlign={"center"}
              />
            </div>

            <hr className="border-2 mt-3 mb-5 px-2" />

            <div className="space-y-2 ">
              {allComponents?.map((buttonIndex, index) => (
                <ModuleComponent
                  addBtnOnclick={index === allComponents?.length - 1 ? addComponent : undefined}
                  lovData={lovData}
                  buttonKey={buttonIndex}
                  onChangeOnModule={(value) => {
                    // const selectedOption = lovData?.find(
                    //   (option) => option.value === value
                    // );
                    if (
                      modules?.filter((i) => {
                        return i?.screen_code === value;
                      })?.length > 0
                    ) {
                      Swal.fire({
                        text: "User Group Has Already Been Selected",
                        icon: "error",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                      }).then(() => {
                        const arr = [...modules];
                        arr[index] = { access_role: "", screen_code: "" };
                        // setModules(arr);
                        setModules(arr);
                      });
                      return;
                    }
                    const arr = [...modules];
                    arr[index] = {
                      access_role: userGroupCode,
                      screen_code: value,
                    };
                    // setModules(arr);
                    setModules(arr);
                  }}
                  moduleValue={
                    modules[index]
                      ? modules[index]?.screen_code
                      : modules[index]?.screen_code === ""
                      ? ""
                      : ""
                  }
                />
              ))}
            </div>

            <div className="flex w-full justify-end pe-[40px] pt-2">
              <ButtonComponent
                label={"Save"}
                buttonHeight={"30px"}
                buttonWidth={"12%"}
                buttonColor={"white"}
                buttonBackgroundColor={CustomButtons["save"].bgColor}
                buttonIcon={CustomButtons["save"].icon}
                onClick={handleSave}
              />
            </div>

            {/* render more list of values */}
            <div className="w-full h-auto  space-y-2 overflow-y-auto pt-3 pb-5">
              {/* {allComponents} */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddForm;
