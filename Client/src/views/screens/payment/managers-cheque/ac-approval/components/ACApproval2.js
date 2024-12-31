import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../../../../components/others/AccountSummary";
import Header from "../../../../../../../components/others/Header/Header";
import CustomTable from "../../../../../teller-ops/teller/components/CustomTable";
import ActionButtons from "../../../../../../../components/others/action-buttons/ActionButtons";


function ACApproval2({ show, handleClose }) {

    const [getTheme, setGetTheme] = useState(JSON.parse(localStorage.getItem("theme")));


    return (
        <div>

            <Modal
                show={show}
                onHide={handleClose}
                size={"xl"}
                className="p-0 m-0"
                style={{ borderRadius: "0px" }}
            >
                <Modal.Body className="p-0 m-0">


                    {/* header   */}

                    <div style={{
                        display: "flex", color: "white", marginBottom: "15px", paddingLeft: "30px", background:
                            `url(` +
                            window.location.origin +
                            `/assets/images/headerBackground/` +
                            getTheme.theme.headerImage +
                            `)`
                    }}
                        className="p-1 ps-2"> AC APPROVAL </div>


                    <div style={{ marginBottom: "10px" }}><ActionButtons displayFetch={"none"} displayRefresh={"none"} /></div>


                    <div style={{ display: "", flex: 1, alignItems: "center" }} className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
                        <div style={{ display: "flex", width: "100%", padding: "10px" }} className="wrapper rounded border-2" >
                            {/* trans type   */}
                            <div style={{ display: "flex", background: "", flex: 1, alignItems: "center" }}>
                                <div style={{ flex: 0.645, background: "" }}>
                                    <InputField
                                        label="Transaction Type"
                                        labelWidth={"17%"}
                                        inputWidth={"79.2%"}
                                        // required={"true"}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div style={{ display: "flex", background: "" }}>
                        {/* left side    */}
                        <div style={{ display: "", flex: 1, alignItems: "center", }} className="rounded h-auto pb-2  px-2 mb-3 bg-white ">
                            <div style={{ display: "", width: "100%", padding: "10px" }} className="wrapper rounded border-2" >
                                {/* funding ac number    */}
                                <div style={{ display: "flex", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                label="Funding A/C Number"
                                                labelWidth={"34%"}
                                                inputWidth={"56%"}
                                                disabled={true}
                                            />
                                        </div>

                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                inputWidth={"100%"}
                                                disabled={true}
                                                noMarginRight={true}
                                            />
                                        </div>

                                    </div>
                                </div>


                                {/* draft amount    */}
                                <div style={{ display: "flex", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                label={"Draft Amount"}
                                                labelWidth={"34%"}
                                                inputWidth={"56%"}
                                                disabled={true}
                                            />
                                        </div>

                                        <div style={{ flex: 0.5, background: "" }}>
                                            <InputField
                                                inputWidth={"100%"}
                                                disabled={true}
                                                noMarginRight={true}
                                            />
                                        </div>

                                    </div>
                                </div>


                                {/* cheque number and select branch    */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <div style={{ flex: 0.65, background: "" }}>
                                        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                                            <div style={{ flex: 0.5 }}>
                                                <InputField
                                                    label="Cheque No"
                                                    labelWidth={"34%"}
                                                    inputWidth={"56%"}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div style={{ flex: 0.5 }}>
                                                <InputField
                                                    label={"Batch No"}
                                                    labelWidth={"34%"}
                                                    inputWidth={"60%"}
                                                    disabled={true}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* purchaser    */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <InputField
                                        label={"Purchaser"}
                                        labelWidth={"16.8%"}
                                        inputWidth={"80.1%"}
                                        disabled={true}

                                    />
                                </div>


                                {/* purchaser address   */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <InputField
                                        label={"Purchaser Address"}
                                        labelWidth={"16.8%"}
                                        inputWidth={"80.1%"}
                                        disabled={true}

                                    />
                                </div>

                                {/* beneficiary    */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <InputField
                                        label={"Beneficiary"}
                                        labelWidth={"16.8%"}
                                        inputWidth={"80.1%"}
                                        disabled={true}

                                    />
                                </div>

                                {/* beneficiary address   */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <InputField
                                        label={"Beneficiary Address"}
                                        labelWidth={"16.8%"}
                                        inputWidth={"80.1%"}
                                        disabled={true}

                                    />
                                </div>

                                {/* transaction details    */}
                                <div style={{ display: "", flex: 1, alignItems: "center", marginBottom: "15px" }}>
                                    <InputField
                                        label={" Transaction Details"}
                                        labelWidth={"16.8%"}
                                        inputWidth={"80.1%"}
                                        disabled={true}

                                    />
                                </div>
                            </div>
                        </div>

                        {/* space */}
                        <div style={{ display: "", width: "1%", }} ></div>


                        {/* right side     */}
                        <div style={{ display: "", width: "34%", alignItems: "center", padding: "10px" }} className="rounded h-auto pb-2 pt-2 mb-3 wrapper border-2">
                            {/* account summary   */}
                            <div>
                                <AccountSummary />
                            </div>

                            {/* bank cheque A/C   */}
                            <div style={{ marginTop: "8px", background: "white", borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px" }}>
                                <div> <Header title={"Bank Cheque A/C"} headerShade={true} /> </div>
                                <div style={{ padding: "5px 30px" }} >
                                    <div style={{ marginTop: "8px" }}>
                                        <span><InputField disabled={true} noMarginRight={true} inputWidth={"100%"} /></span>
                                    </div>
                                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                                        <span><InputField disabled={true} noMarginRight={true} inputWidth={"100%"} /></span>
                                    </div>
                                </div>
                            </div>




                        </div>



                    </div>


                    <div>
                    </div>

                    {/* data table   */}
                    <div style={{ margin: "10px", }}>
                        <CustomTable
                            headers={[
                                "Chg Code",
                                "Fee Account",
                                "Fee Account Description",
                                "Fee Description",
                                "Fee Amount Per Book",
                                "Currency",

                            ]} />
                    </div>


                    {/* <AccountSummary /> */}


                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ACApproval2;
