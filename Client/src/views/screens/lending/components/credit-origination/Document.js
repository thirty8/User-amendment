import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
// import { Modal, Textarea } from "@mantine/core";
import { Modal } from "antd";
import DocumentViewing from "../../../../../components/DocumentViewing";
import Swal from "sweetalert2";
import DocumentCapture from "../../../../../components/DocumentCapture";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const Document = (props) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [scanDocModal, setScanDocModal] = useState(false);
  const [ageProof, setAgeProof] = useState();

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const nextFunc = () => {
    props.collTab();
  };

  const backFunc = () => {
    props.guaTab();
  };
  var documentArr = [
    [
      <div>PROOF OF AGE</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        <div>
          <InputField
            noMarginRight
            inputWidth={"100%"}
            value={ageProof}
            onChange={(e) => setAgeProof(e.target.value)}
            textAlign={"center"}
          />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
    [
      <div>PROOF OF ADDRESS</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        <div>
          <InputField noMarginRight inputWidth={"100%"} />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
    [
      <div>PROOF OF EMPLOYMENT</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField noMarginRight inputWidth={"100%"} />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
    [
      <div>PROOF OF VALUATION</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField noMarginRight inputWidth={"100%"} />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
    [
      <div>PROOF OF PREFERENCE</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField noMarginRight inputWidth={"100%"} />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
    [
      <div>PROOF OF CERTIFICATE</div>,
      <div>
        <ListOfValue marginRight={"0px"} inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField noMarginRight inputWidth={"100%"} />
        </div>
        <div className="hover:ring-[2px] rounded ring-blue-300 transition duration-300 ease-in-out">
          <ButtonComponent
            // label={"View"}
            buttonIcon={<IoDocumentText size={20} color="#1B76FF" />}
            buttonHeight={"27px"}
            // buttonWidth={"50px"}
            buttonColor={"white"}
            buttonBackgroundColor={"#bed9ff"}
            onClick={() => {
              setSweetAlertConfirmed(true);
            }}
          />
        </div>
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField noMarginRight type={"date"} inputWidth={"100%"} />
      </div>,
      <div>N</div>,
      <div>
        <InputField noMarginRight inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType type={"checkbox"} />
      </div>,
    ],
  ];
  return (
    <div style={{ zoom: 0.9 }}>
      <div style={{ marginBottom: "5px" }}>
        <HeaderComponent title={"Documents"} height={"35px"} />
      </div>
      <div>
        <CustomTable
          headers={[
            "Document Type",
            "Presented Document",
            "Scan Document Number",
            "Scan Date",
            "Expiry Date",
            "Mand",
            "Received Date",
            "",
          ]}
          data={documentArr}
        />
      </div>
      <br />
      <div style={{}}>
        <div
          style={{
            display: "flex",
            flex: 0.6,
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <ButtonComponent
              label={"Scan Document"}
              buttonBackgroundColor={"#013281"}
              buttonIcon={<MdOutlineDocumentScanner size={20} />}
              buttonHeight={"33px"}
              buttonWidth={"140px"}
              buttonColor={"white"}
              onClick={() => {
                setScanDocModal(true);
              }}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Add Comments"}
              buttonIcon={<FaRegCommentDots size={20} />}
              buttonBackgroundColor={"#013281"}
              buttonHeight={"33px"}
              buttonWidth={"140px"}
              buttonColor={"white"}
            />
          </div>
          {/* <div>
            <ButtonComponent
              label={"Add Other Documents"}
              buttonBackgroundColor={"black"}
              buttonHeight={"33px"}
              buttonWidth={"180px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Account Creation Document Details"}
              // buttonBackgroundColor={"black"}
              buttonHeight={"33px"}
              buttonWidth={"290px"}
              buttonColor={"white"}
            />
          </div> */}
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ButtonComponent
            label={"Previous"}
            buttonBackgroundColor={"#bed9ff"}
            buttonColor={"blue"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={backFunc}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            buttonBackgroundColor={"#0063d1"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={nextFunc}
          />
        </div>
      </div>
      {sweetAlertConfirmed && (
        <Modal
          className="p-0 m-0"
          open={sweetAlertConfirmed}
          // size="75%"
          width={800}
          footer={null}
          centered
          closable={false}
          closeIcon={false}
          // withCloseButton={false}
          // transitionProps={"mounted"}
          onCancel={() => setSweetAlertConfirmed(false)}
        >
          <div className="flex items-center justify-between mx-2 p-2">
            <div className="font-extrabold text-black">View Document</div>
            <div
              className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
              onClick={() => setSweetAlertConfirmed(false)}
            >
              x
            </div>
          </div>
          <DocumentViewing documentID={ageProof} />
        </Modal>
      )}
      <Modal
        className="p-0 m-0"
        open={scanDocModal}
        // size="75%"
        width={500}
        footer={null}
        centered
        closable={false}
        closeIcon={false}
        // withCloseButton={false}
        // transitionProps={"mounted"}
        onCancel={() => setScanDocModal(false)}
      >
        <HeaderComponent title={"Scan Document"} />
        <br />
        <DocumentCapture />
        <div className="flex justify-end">
          <ButtonComponent
            label={"Close"}
            buttonColor={"white"}
            buttonHeight={"30px"}
            buttonWidth={"60px"}
            onClick={() => {
              setScanDocModal(false);
            }}
            buttonBackgroundColor={"red"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Document;
