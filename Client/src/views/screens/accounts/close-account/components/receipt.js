import React, { useRef } from "react";
import { Modal } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import coop from "../../../../../assets/coop.png";
import ModalLoader from "../../../../../components/others/ModalLoader";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";

export default function ClosedAccountReceipt({
  handleClose,
  showModal,
  errorLoader,
  receiptDetails,
  formatNumber,
}) {
  const componentRef = useRef();

  // current date
  const formattedDate = new Date();

  // format date
  function formatDate(dateString) {
    const originalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const monthNames = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      10: "OCT",
      11: "NOV",
      12: "DEC",
    };

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate?.toUpperCase();
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log({ receiptDetails, showModal, errorLoader }, "kelvin");
  return (
    <div>
      <Modal
        onClose={handleClose}
        opened={showModal}
        trapFocus={false}
        padding={0}
        size={"75%"}
        withCloseButton={false}
      >
        <div>
          {errorLoader ? (
            <div className="flex justify-center w-full pt-[200px] pb-[200px]">
              <ModalLoader />
            </div>
          ) : (
            <div>
              <div
                className="space-y-4"
                style={{
                  // display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  // textAlign: "center",
                }}
              >
                {/* <div className=""> */}
                <div className="flex justify-center mt-5">
                  <ButtonComponent
                    label={"Print Report"}
                    onClick={handlePrint}
                    buttonHeight={"35px"}
                    buttonWidth={"150px"}
                  />
                </div>

                <div ref={componentRef}>
                  <div className="flex justify-center" style={{ textAlign: "center" }}>
                    <div>
                      <div className="flex justify-center">
                        <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "800",
                        }}
                      >
                        COOPTECH
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          textDecoration: "capitalize",
                        }}
                      >
                        Branch : {JSON.parse(localStorage.getItem("userInfo"))?.branch}
                      </div>
                      <div style={{ fontSize: "15px" }}>
                        Print Date : {formatDate(formattedDate)}
                      </div>
                    </div>
                  </div>
                  {/* account details  */}
                  <div className="ms-3 mt-[40px]">
                    <p className="font-semibold text-lg w-full underline text-underline-auto mt-2">
                      Account Details
                    </p>

                    <p className="text-sm">
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Account No : </span>{" "}
                        {receiptDetails ? receiptDetails?.cr_acct : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold"> Account Name : </span>
                        {receiptDetails ? receiptDetails?.cr_name : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Branch : </span>{" "}
                        {receiptDetails ? receiptDetails?.br_description : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold"> Closure Reference : </span>
                        <span className="font-semibold">
                          {receiptDetails ? receiptDetails?.document_ref : ""}
                        </span>
                      </p>
                    </p>
                  </div>
                  {/* closure  details  */}
                  <div className="ms-3 mt-[40px]">
                    <p className="font-semibold text-lg w-full underline text-underline-auto mt-2">
                      Closure Details
                    </p>

                    <p className="text-sm">
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold"> User ID : </span>
                        {receiptDetails ? receiptDetails?.user_name : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Closure Branch : </span>{" "}
                        {receiptDetails ? receiptDetails?.br_description : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Currency : </span>{" "}
                        {receiptDetails ? receiptDetails?.cur_desc : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Batch Reference : </span>{" "}
                        {receiptDetails ? receiptDetails?.batch_no : ""}
                      </p>

                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Closure Date : </span>{" "}
                        {receiptDetails ? formatDate(receiptDetails?.posting_date) : ""}
                      </p>
                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold">Posting Date : </span>{" "}
                        {receiptDetails ? formatDate(receiptDetails?.posting_sys_date) : ""}
                      </p>

                      <p className="mt-2">
                        {" "}
                        <span className="font-semibold"> Amount : </span>
                        <span className="font-semibold underline underline-offset-auto">
                          {receiptDetails ? formatNumber(receiptDetails?.amt) : ""}
                        </span>
                      </p>
                    </p>
                  </div>
                  {/* right details and signature */}
                  <div className="me-3 mt-[40px] flex justify-end text-sm text-left">
                    <div className="">
                      <p>To be valid, this voucher must bear the CSO's stamp.</p>
                      <p>Proceed to the cashier to claim funds.</p>
                      <p>Thank you.</p>
                      <p className="mt-3">
                        <span className="font-medium"> Customer's Signature : </span>
                        <span className="ms-2">.........................................</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
