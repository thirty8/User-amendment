import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap"
import InputField from "../../../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../../components/others/Fields/ListOfValue";
import ButtonType from "../../../../../../../../components/others/Button/ButtonType";
import TextAreaField from "../../../../../../../../components/others/Fields/TextArea";
import SelectField from "../../../../../../../../components/others/Fields/SelectField";
import { Select } from "@mantine/core";
import Label from "../../../../../../../../components/others/Label/Label";
import CustomTable from "../../../../../../teller-ops/teller/components/CustomTable";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import ActionButtons from "../../../../../../../../components/others/action-buttons/ActionButtons";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../../../../../config/constant";
import Header from "../../../../../../../../components/others/Header/Header";


const headers = {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
};
function Approval3({ show, handleClose }) {

    const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
    const handleBtnClick = () => {
        setOpenChequeReqScreen(true);

    };

    const [data, setData] = useState([
        [0, "004001100050080283", "JOHN & FLORENCE UNION92151", 3, 4, 5, 6, 7, 8,
            <div className="d-flex justify-center" >
                <ButtonComponent
                    label={<MDBIcon fas icon="angle-double-right" />}
                    buttonHeight={"20px"}
                    onClick={handleBtnClick}
                />{" "}
            </div>

        ],
        [0, "004001087252140067", "UNION930368", 3, 4, 5, 6, 7, 8, 9],
    ]);
    return (
        <div style={{ zoom: 0.9 }}>
            <Modal show={show} onHide={handleClose} className="" size={"xl"} >
                <Modal.Body className="" style={{ height: "" }}>
                    <div
                        style={{ display: "", flex: 1, alignItems: "center" }}
                        className="rounded h-auto pt-2 px-2 mb-3 bg-white "
                    >


                        <div
                            style={{ display: "flex", width: "100%", padding: "10px", justifyContent: "space-around", alignItems: "center" }}
                            className="wrapper rounded border-2"
                        >
                            <div style={{ flex: 0.3 }}>
                                <InputField
                                    label={"Posted By"}
                                    labelWidth={"35%"}
                                    inputWidth={"50%"}
                                    disabled={true}
                                />
                            </div>
                            <div style={{ flex: 0.3 }}>
                                <InputField
                                    label={"Posted Date"}
                                    labelWidth={"35%"}
                                    inputWidth={"50%"}
                                    disabled={true}
                                />
                            </div>
                            <div style={{ flex: 0.3 }}>
                                <InputField
                                    label={" Batch Number"}
                                    labelWidth={"35%"}
                                    inputWidth={"50%"}
                                    disabled={true}
                                />
                            </div>



                        </div>
                    </div>



                    {/* table  */}
                    <div style={{ margin: "20px 10px" }}>
                        <CustomTable
                            headers={[
                                "Account No",
                                "Description",
                                "Account Name",
                                "Document Ref",
                                "Transaction Details",
                                "Currency",
                                "Account DB",
                                "Account CR",
                                "Value Date",
                                "Action",
                            ]}
                            data={data}
                        />
                    </div>

                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Approval3