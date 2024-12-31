import React, { useEffect, useState } from "react";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
// import CustomTable from "../../../../../components/others/customtable";
import AccountSummary from "../../../../../components/others/AccountSummary";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import Header from "../../../../../components/others/Header/Header";
import Swal from "sweetalert2";
import ModalLoader from "../../../../../components/others/ModalLoader";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const UntaggedStoppedChequeModal = ({ stopRef, formatDateToYMD, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);
  const [data, setData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/untagged-stopped-cheque",
        {
          fetch_screen_two_details: "true",
          stop_ref: stopRef || "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setData(response?.data[0]);
        }
      })
      .catch((err) => `error caught on page load: ${err}`)
      .finally(() => setLoading(false));
    // setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [stopRef]);

  const handleSubmit = () => {
    Swal.fire({
      text: "Are you sure you untag this cheque?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "red",
      // allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post(
            API_SERVER + "/api/untagged-stopped-cheque",
            {
              okay_procedure: "true",
              acct_link: data?.acct_link || "",
              batch_no_v: data?.batch_no || "",
              cheque_no_v: Number(data?.cheque_reference_number) || 0,
              username_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
              global_bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              form_code_v: "SDDS",
              global_prog_v: "React",
            },
            { headers }
          );

          if (response.data?.length > 0) {
            const res_code = response?.data[0]?.RESPONSE_CODE;
            const res_mess = response?.data[0]?.RESPONSE_MESS;

            if (res_code) {
              await Swal.fire({
                text: res_mess,
                icon: res_code === "999" ? "error" : res_code === "000" ? "success" : null,
              });

              if (res_code === "000") {
                handleClose();
              }
            }
          }
        } catch (err) {
          console.error(`Error here: ${err}`);
        } finally {
          Swal.close();
        }
      }
    });
  };

  return (
    <div style={{ zoom: 0.98 }}>
      {loading ? (
        <div className="flex justify-center pt-[100px] pb-[100px]">
          <ModalLoader />
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <Header
              title={"unstagged stopped cheques"}
              headerShade
              closeIcon
              handleClose={handleClose}
            />
          </div>
          <div className="mb-2">
            <ActionButtons
              displayAuthorise={"none"}
              displayView={"none"}
              displayFetch={"none"}
              displayCancel={"none"}
              displayRefresh={"none"}
              displayDelete={"none"}
              displayHelp={"none"}
              displayReject={"none"}
              displayNew={"none"}
              // onNewClick={handleNewClick}
              onExitClick={handleClose}
              onOkClick={handleSubmit}
            />
          </div>

          <hr className="mt-1" />

          <div className="flex w-full space-x-3 mt-2 mb-4">
            {/* left  */}
            <div className="w-[71%] border-2 rounded p-2 space-y-3">
              {/* account no  */}
              <div className="flex items-center space-x-3">
                <div className="w-[45%]">
                  <InputField
                    label={"Account No"}
                    id={"account_no"}
                    type={"number"}
                    labelWidth={"40%"}
                    inputWidth={"56%"}
                    disabled
                    value={data?.acct_link || ""}
                  />
                </div>

                <div className="w-[55%]">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"98%"}
                    disabled
                    value={data?.account_descrp || ""}
                  />
                </div>
              </div>

              {/* cheque no and cheque no end  */}
              <div className="flex items-center space-x-3">
                <div className="w-[54.2%]">
                  <div className="flex w-full space-x-3 items-center">
                    <div className="w-[80%]">
                      <InputField
                        label={"Cheque No"}
                        labelWidth={"42.3%"}
                        inputWidth={"50%"}
                        id={"cheque_no"}
                        value={data?.cheque_reference_number || ""}
                        disabled
                        type={"number"}
                      />
                    </div>
                    <div className="w-[20%] invisible">
                      <ButtonComponent
                        label={"Sign Ver"}
                        buttonWidth={"100%"}
                        buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                        buttonIcon={CustomButtons?.sigVer?.icon}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="w-[43.1%]">
                  <div className="flex justify-end w-full space-x-3 items-center">
                    <div className="w-[75%]">
                      <InputField
                        label={"Cheque No End"}
                        id={"cheque_no_end"}
                        labelWidth={"36%"}
                        inputWidth={"64%"}
                        value={data?.cheque_reference_end || ""}
                        type={"number"}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* cheque amount and date on cheque   */}
              <div className="flex items-center space-x-3">
                <div className="w-[54.2%]">
                  <div className="flex w-full space-x-3 items-center">
                    <div className="w-[80%]">
                      <InputField
                        label={"Cheque Amount"}
                        labelWidth={"42.3%"}
                        inputWidth={"50%"}
                        value={data?.amount_on_cheque || ""}
                        disabled
                        type={"number"}
                      />
                    </div>
                    <div className="w-[20%] invisible">
                      <ButtonComponent
                        label={"Sign Ver"}
                        buttonWidth={"100%"}
                        buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                        buttonIcon={CustomButtons?.sigVer?.icon}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="w-[43.1%]">
                  <div className="flex justify-end w-full space-x-3 items-center">
                    <div className="w-[75%]">
                      <InputField
                        label={"Date on Cheque"}
                        labelWidth={"36%"}
                        inputWidth={"64%"}
                        disabled
                        type={"date"}
                        value={data ? formatDateToYMD(data?.date_on_cheque) : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* time reported  and stop date   */}
              <div className="flex items-center space-x-3">
                <div className="w-[54.2%]">
                  <div className="flex w-full space-x-3 items-center">
                    <div className="w-[80%]">
                      <InputField
                        label={"Time Reported"}
                        labelWidth={"42.3%"}
                        inputWidth={"50%"}
                        value={data?.time_reported || ""}
                        disabled
                      />
                    </div>
                    <div className="w-[20%] invisible">
                      <ButtonComponent
                        label={"Sign Ver"}
                        buttonWidth={"100%"}
                        buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                        buttonIcon={CustomButtons?.sigVer?.icon}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="w-[43.1%]">
                  <div className="flex justify-end w-full space-x-3 items-center">
                    <div className="w-[75%]">
                      <InputField
                        label={"Stop Date"}
                        labelWidth={"39%"}
                        inputWidth={"61%"}
                        type={"date"}
                        value={data ? formatDateToYMD(data?.date_stopped) : ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <InputField
                  label={"Payee Information"}
                  labelWidth={"17.8%"}
                  inputWidth={"78.5%"}
                  value={data?.payee_details || ""}
                  disabled
                />
              </div>

              <div className="w-[65%] pt-1">
                <ListOfValue
                  label={"Stop Reason"}
                  labelWidth={"27.5%"}
                  inputWidth={"52%"}
                  value={
                    Object.keys(data)?.length > 0 && data?.reason_code && data?.reason_code_desc
                      ? `${data.reason_code} - ${data.reason_code_desc}`
                      : ""
                  }
                  data={[]}
                  disabled
                />
              </div>
            </div>
            {/* right */}
            <div className="w-[29%] rounded">
              <AccountSummary
                accountNumber={data?.acct_link || ""}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
          {/* 
      <div className="mt-4">
        <CustomTable
          headers={[
            "Chg Code",
            "Fee Account",
            "Fee Account Description",
            "Fee Description",
            "Fee Amount Per Book",
            "Currency",
          ]}
          //   style={{ columnAlignRight: [5] }}
          data={[]}
          rowsPerPage={6}
          load={loading}
        />
      </div> */}
        </div>
      )}
    </div>
  );
};

export default UntaggedStoppedChequeModal;
