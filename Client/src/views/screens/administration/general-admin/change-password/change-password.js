import React, { useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../teller-ops/teller/teller-activities";
import Swal from "sweetalert2";
// import authPic from "../../../../../../public/assets/menu-icons/change-password.png";

export default function ChangePassword() {
  const [formData, setFormData] = useState({});

  async function handleSubmit() {
    const response = await axios.post(
      API_SERVER + "/api/change-password",
      {
        username: JSON.parse(localStorage.getItem("userInfo"))?.id,
        branch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        password: formData.password,
        password1: formData.new_password,
        password2: formData.con_password,
        ip: localStorage.getItem("ipAddress"),
      },
      { headers: headers }
    );

    Swal.fire({
      icon: `${response.data.msg_code === 1 ? "warning" : "success"}`,
      html: `<div class="font-semibold">
         <span class=' mx-2 ${
           response.data.msg_code === 1 ? "text-red-700" : "text-gray-700"
         }'>${response.data.msg}</span>
        </div>`,
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          password: "",
          new_password: "",
          con_password: "",
        });
      }
    });
    // console.log(response);
  }
  return (
    <div className="flex justify-center">
      <div className=" w-[45%] ">
        <div className="scale-[0.90] mt-4">
          <ActionButtons
            displayAuthorise={"none"}
            displayCancel={"none"}
            displayDelete={"none"}
            displayFetch={"none"}
            displayHelp={"none"}
            displayView={"none"}
            displayReject={"none"}
            onOkClick={() => {
              handleSubmit();
            }}
            //   onNewClick={handleNew}
            //   onAuthoriseClick={handleSubmit}
          />
        </div>
        <div className="space-y-4 mt-3 w-full shadow-md py-7 px-6 border border-gray-300 rounded-md">
          <div className="flex justify-center mb-4">
            <img
              src={"/assets/menu-icons/change-password.png"}
              height={90}
              width={90}
            />
          </div>
          <InputField
            label={"Username"}
            labelWidth={"35%"}
            inputWidth={"65%"}
            disabled={true}
            value={JSON.parse(localStorage.getItem("userInfo"))?.id}
          />

          <InputField
            label={"Password"}
            labelWidth={"35%"}
            inputWidth={"65%"}
            value={formData?.password}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          <InputField
            label={"New Password"}
            labelWidth={"35%"}
            inputWidth={"65%"}
            value={formData?.new_password}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                new_password: e.target.value,
              }));
            }}
          />
          <InputField
            label={"Confirm Password"}
            labelWidth={"35%"}
            inputWidth={"65%"}
            value={formData?.con_password}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                con_password: e.target.value,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
