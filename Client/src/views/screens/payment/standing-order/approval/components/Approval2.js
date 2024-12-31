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
import Approval3 from "./Approval3";
const headers = {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
};

export default function Approval2({ show, handleClose }) {
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
    );

    // const [selectedOption, setSelectedOption] = useState("internal");
    // const [selectedOption2, setSelectedOption2] = useState("infinite");
    // const [selectedOption3, setSelectedOption3] = useState("EOD");
    const [debitBranch, setDebitBranch] = useState([]);
    const [bankCode, setBankCode] = useState([]);
    const [branchCode, setBranchCode] = useState([]);
    const [frequency, setFrequency] = useState([]);
    const [finiteState, setFiniteState] = useState(false);
    const [intraDayState, setIntraDayState] = useState(false);

    const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
    const handleBtnClick = () => {
        setOpenChequeReqScreen(true);
        console.log("derrick")

    };
    const [data, setData] = useState([
        [0, "004001100050080283", "JOHN & FLORENCE UNION92151", 3, 4, 5, 6,
            <div className="d-flex justify-center">
                <ButtonComponent
                    label={<MDBIcon fas icon="angle-double-right" />}
                    buttonHeight={"20px"}
                    onClick={handleBtnClick}
                />{" "}
            </div>,

        ],
        [0, "004001087252140067", "UNION930368", 3, 4, 5, 6, 7],
    ]);

    // setting all LOVs
    useEffect(() => {
        async function getAllLOVS() {
            const allListOfValues = axios
                .post(
                    API_SERVER + "/api/standingOrderLOVs",
                    {
                        debitBranch: "debitBranch",
                        bankCode: "BNC",
                        branchCode: "branchCode",
                        frequency: "PRD",
                    },
                    { headers }
                )
                .then((response) => {
                    console.log(response.data, "data");
                    setDebitBranch(response.data.debitBranch);
                    setBankCode(response.data.bankCode);
                    setBranchCode(response.data.branchCode);
                    setFrequency(response.data.frequency);
                });
        }

        getAllLOVS();
    }, []);

    // const handleOptionChange = (e) => {
    //     setSelectedOption(e.target.value);
    // };

    // const handleOptionChangeProcessingTries = (e) => {
    //     setSelectedOption2(e.target.value);
    // };

    // const handleOptionChangeProcessingTimes = (e) => {
    //     setSelectedOption3(e.target.value);
    // };

    // intraDay hours and minutes
    const intraDayHours = [
        { label: "06", value: "06" },
        { label: "07", value: "07" },
        { label: "08", value: "08" },
        { label: "09", value: "09" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
    ];

    const intraDayMinutes = [
        { label: "00", value: "00" },
        { label: "15", value: "15" },
        { label: "30", value: "30" },
        { label: "45", value: "45" },
    ];


    const nextFieldRef = useRef(null);





    return (
        <div style={{ zoom: 0.9 }}>
            <Modal show={show} onHide={handleClose} className="p-0 m-0" size={"xl"}>
                <Modal.Body className="p-0 m-0">


                    <div className='mb-2'>
                        <Header title={"Approval"} icon={<MDBIcon fas icon="hand-holding-usd" />} />
                    </div>

                    <div className='mb-2'>
                        <ActionButtons displayFetch={"none"} displayRefresh={"none"} onExitClick={handleClose} />
                    </div>






                    <div
                        style={{ display: "", flex: 1, alignItems: "center" }}
                        className="rounded h-auto pt-2 px-2 mb-3 bg-white "
                    >


                        <div
                            style={{ display: "flex", width: "100%", padding: "10px" }}
                            className="wrapper rounded border-2"
                        >
                            {/* left container for ordering bban  */}
                            <div style={{ flex: 1 }}>
                                {/* order number */}

                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div style={{ flex: 0.27 }}>
                                        <InputField
                                            label={"Order Batch No."}
                                            labelWidth={"35%"}
                                            inputWidth={"50%"}
                                            disabled={true}
                                        />
                                    </div>

                                    <div style={{ flex: 0.2 }}>
                                        <InputField
                                            label={"Order No."}
                                            labelWidth={"34%"}
                                            inputWidth={"66%"}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <hr className="m-0 p-0" />


                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        background: "",
                                        justifyContent: "center",
                                        // marginBottom: "15px",
                                        alignItems: "center",
                                    }}
                                    className="mt-2"
                                >
                                    <div style={{ flex: 0.6, background: "" }}>
                                        <div style={{ display: "flex", flex: 1, background: "" }}>

                                            <div style={{ flex: 0.49, background: "" }}>

                                                <InputField
                                                    label={"Source Account"}
                                                    labelWidth={"38%"}
                                                    inputWidth={"53.5%"}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div style={{ flex: 0.51, background: "" }}>
                                                <div style={{ flex: 1 }} className="ms-1">
                                                    <InputField inputWidth={"95%"} disabled={true} noMarginRight={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div style={{ flex: 0.4, background: "" }}>
                                        <div style={{ display: "flex", flex: 1, alignItems: "center", background: "" }}>
                                            <div style={{ flex: 0.1, marginLeft: "2px" }}></div>

                                            <div style={{ flex: 0.34, background: "yellow" }}>
                                                <ButtonComponent
                                                    label={"View Transaction"}
                                                    buttonWidth={"150px"}
                                                // buttonWWidth={"35%"}

                                                />
                                            </div>
                                            <div style={{ flex: 0.09 }}></div>


                                            <div style={{ flex: 0.46 }}>
                                                <ButtonType
                                                    label={"Tick to confirm all details"}
                                                    labelWidth={"34%"}
                                                    type={"checkbox"}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                {/* ----------------------------------------------- */}
                            </div>


                        </div>
                    </div>

                    {/* beneficiary details and instruction details    */}
                    <div
                        style={{ display: "flex", flex: 1, alignItems: "center" }}
                        className="rounded h-auto pb-2 pt-2 px-2 mb-2 bg-white "
                    >
                        {/* ------------------------left------------------------------------------- */}
                        <div style={{ flex: 0.6 }}>
                            <div
                                style={{ width: "100%", padding: "" }}
                                className="wrapper rounded border-2"
                            >
                                <Header headerShade={true} title={"Beneficiary Details"} />

                                <div style={{ padding: "4px 10px 10px 10px" }}>
                                    <div
                                        style={{
                                            background: "",
                                            marginTop: "5px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <InputField
                                            label={"Bank Code"}
                                            labelWidth={"19%"}
                                            inputWidth={"43%"}
                                            disabled={true}

                                        />
                                    </div>

                                    <div style={{ background: "", marginBottom: "15px" }}>
                                        <InputField
                                            label={"Branch Code"}
                                            labelWidth={"19%"}
                                            inputWidth={"43%"}
                                            disabled={true}

                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            background: "",
                                            marginBottom: "15px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                label={"BBAN (Banks Customer)"}
                                                labelWidth={"38%"}
                                                inputWidth={"53.5%"}
                                                disabled={true}
                                            />
                                        </div>
                                        <div style={{ flex: 0.5, background: "" }}>
                                            <div style={{ flex: 1 }} className="ms-2">
                                                <InputField inputWidth={"100%"} disabled={true} noMarginRight={true} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ background: "", marginBottom: "15px" }}>
                                        <InputField
                                            label={"BBAN (Ex. Customer)"}
                                            labelWidth={"19%"}
                                            inputWidth={"26.7%"}
                                            disabled={true}
                                        />
                                    </div>

                                    <div style={{ background: "", marginBottom: "15px" }}>
                                        <InputField
                                            label={"A/C Name (Ex. Customer)"}
                                            labelWidth={"19%"}
                                            inputWidth={"81%"}
                                            disabled={true}
                                        />
                                    </div>

                                    <div style={{ background: "", marginBottom: "15px" }}>
                                        <TextAreaField
                                            label={"Narration"}
                                            labelWidth={"19.3%"}
                                            inputWidth={"80%"}
                                            disabled={true}
                                            rows={2}
                                            cols={2}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            background: "",
                                            display: "flex",
                                            flex: 1,
                                            marginBottom: "40px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                label={"Attach Doc"}
                                                labelWidth={"37%"}
                                                inputWidth={"54%"}
                                                disabled={true}

                                            />
                                        </div>
                                        <div style={{ flex: 0.44 }} className="">
                                            <ButtonComponent label={"View Doc"} buttonWidth={"100px"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------------space--------------- */}
                        <div style={{ flex: 0.0125 }}></div>

                        {/* ------------------------right------------------------------------------- */}

                        <div style={{ flex: 0.3875 }}>
                            <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                                <div
                                    style={{ width: "100%", padding: "" }}
                                    className="wrapper rounded border-2 "
                                >
                                    {/* <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  color: "white",
                  paddingLeft: "10px",
                  flex: 1,
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                }}
              >
                Instruction Details
              </span> */}
                                    <Header headerShade={true} title={"Instruction Details"} />

                                    <div style={{ padding: "4px 10px 10px 10px" }}>
                                        <div
                                            style={{
                                                background: "",
                                                display: "flex",
                                                flex: 1,
                                                marginTop: "5px",
                                                marginBottom: "15px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{ flex: 0.7 }}>
                                                <InputField
                                                    label={"Standing Amount"}
                                                    labelWidth={"40%"}
                                                    inputWidth={"55%"}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div style={{ flex: 0.02 }}></div>
                                            <div style={{ flex: 0.28 }}></div>
                                        </div>

                                        <div
                                            style={{
                                                background: "",
                                                display: "flex",
                                                flex: 1,
                                                marginBottom: "15px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{ flex: 0.7 }}>
                                                <InputField
                                                    label={"Charge Account"}
                                                    labelWidth={"40%"}
                                                    inputWidth={"55%"}
                                                    disabled={true}

                                                />
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                background: "",
                                                flex: 1,
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <InputField
                                                label={"Charge A/C Name"}
                                                labelWidth={"27.5%"}
                                                inputWidth={"68%"}
                                                disabled={true}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                background: "",
                                                display: "flex",
                                                flex: 1,
                                                marginBottom: "15px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{ flex: 0.7 }}>
                                                <InputField
                                                    label={"Start Date"}
                                                    labelWidth={"40%"}
                                                    inputWidth={"55%"}
                                                    disabled={true}

                                                />
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                background: "",
                                                display: "flex",
                                                flex: 1,
                                                marginBottom: "15px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{ flex: 0.7 }}>
                                                <InputField
                                                    label={"End Date"}
                                                    labelWidth={"40%"}
                                                    inputWidth={"55%"}
                                                    disabled={true}

                                                />
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                background: "",
                                                flex: 1,
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <InputField
                                                label={"Frequency"}
                                                labelWidth={"27.5%"}
                                                inputWidth={"68%"}
                                                disabled={true}

                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                flex: 1,
                                                alignItems: "center",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <div style={{ flex: 0.28, background: "" }}>
                                                <Label
                                                    label={"Processing tries"}
                                                    labelWidth={"100%"}
                                                    fontSize={"85%"}
                                                />
                                            </div>
                                            <div style={{ flex: 0.72, background: "", paddingLeft: "20px" }}>
                                                <div
                                                    style={{ display: "flex", flex: 1, alignItems: "center" }}
                                                >
                                                    <div style={{ flex: 0.3 }}>
                                                        <ButtonType
                                                            label={"Infinite"}
                                                            labelWidth={"100%"}
                                                            type={"radio"}
                                                            // checked={selectedOption2 === "infinite"}
                                                            // value1={"infinite"}
                                                            name={"processing tries"}
                                                        // onChange={handleOptionChangeProcessingTries}
                                                        // onClick={() => setFiniteState(false)}
                                                        />{" "}
                                                    </div>
                                                    <div style={{ flex: 0.3 }}>
                                                        <ButtonType
                                                            label={"Finite"}
                                                            labelWidth={"100%"}
                                                            type={"radio"}
                                                            // checked={selectedOption2 === "finite"}
                                                            // value1={"finite"}
                                                            name={"processing tries"}
                                                        // onChange={handleOptionChangeProcessingTries}
                                                        // onClick={() => setFiniteState(true)}
                                                        />{" "}
                                                    </div>

                                                    <div style={{ flex: 0.3 }}>
                                                        <InputField
                                                            label={"No."}
                                                            labelWidth={"30%"}
                                                            inputWidth={"40%"}
                                                            type={"number"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div
                                            style={{
                                                display: "flex",
                                                flex: 1,
                                                alignItems: "center",
                                                // marginBottom: "15px",
                                            }}
                                        >
                                            <div style={{ flex: 0.28, background: "" }}>
                                                <Label
                                                    label={"Processing times"}
                                                    labelWidth={"100%"}
                                                    fontSize={"85%"}
                                                />
                                            </div>
                                            <div style={{ flex: 0.72, }}>
                                                <div style={{ display: "flex", flex: 1, background: "", alignItems: "center" }}
                                                >

                                                    <div style={{ flex: 0.2 }}>
                                                        <InputField
                                                            inputWidth={"70%"}
                                                            data={intraDayHours}
                                                            disabled={true}

                                                        />
                                                    </div>
                                                    <div className="ms-2 me-1">:</div>
                                                    <div style={{ flex: 0.2 }}>
                                                        <InputField
                                                            inputWidth={"70%"}
                                                            data={intraDayMinutes}
                                                            disabled={true}
                                                        />
                                                    </div>



                                                </div>

                                            </div>
                                        </div>

                                        {/* --------------------------------------- */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* insert button   */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ButtonComponent label={"Insert"} buttonIcon={<BiAddToQueue />} />
                    </div>

                    {/* table  */}
                    <div style={{ margin: "20px 10px" }}>
                        <CustomTable
                            headers={[
                                "Order No",
                                "Acount Number",
                                "Account Name",
                                "Due Amount",
                                "Beneficiary Account",
                                "Due To Start",
                                "Last Pay Date",
                                "Action",
                            ]}
                            data={data}
                        />
                    </div>
                </Modal.Body>
            </Modal>

            {/* modal 2 */}

            {openChequeReqScreen ? (
                <Approval3
                    show={openChequeReqScreen}
                    handleClose={() => setOpenChequeReqScreen(false)}
                />
            ) : (
                ""
            )}

        </div>
    );
}
