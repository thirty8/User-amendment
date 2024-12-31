import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const GlobalModal = ({
  showModal,
  download,
  setShowModal,
  body,
  title,
  data,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };
  const [modalSize, setModalSize] = useState("xl");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  useEffect(() => {
    const button = document.getElementById("export");
    if (button) {
      button.click();
    }
  }, [download]);

  function exportPDF() {
    //   e.preventDefault();
    console.log("ghana");
    const input = document.getElementById("my-table-preview");
    console.log({ input });
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, 200, 140);
      pdf.save("table.pdf");
    });
  }
  return (
    <Modal
      id="globalModal"
      key="globalModal"
      backdrop="static"
      size={modalSize}
      fullscreen={"xl"}
      show={showModal}
      onHide={handleClose}
      // centered
    >
      <Modal.Header>
        <div
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,
          }}
          className="flex justify-between items-center w-full h-[50px] bg-no-repeat"
        >
          {/* <div
            className="font-semibold uppercase px-2"
            style={{ fontSize: "16px", color: "whitesmoke" }}
          >
            
          </div> */}
          <div className="w-full  flex justify-between ">
            <Modal.Title
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "10px",
              }}
            >
              <p>LOAN CLASSIFICATION (SASRA FORM 2D)</p>
              <button id="export" className="hidden" onClick={exportPDF}>
                Export
              </button>
            </Modal.Title>
            <svg
              onClick={() => handleClose()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{ padding: "10px" }}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <hr style={{ marginTop: "-10%" }} />
      </Modal.Header>
      <Modal.Body style={{ background: "whitesmoke", marginTop: "-15px" }}>
        <table id="my-table-preview" className="w-[100%]">
          <thead className="font-semibold">
            <tr>
              <td colspan="6">FORM 2D</td>
            </tr>
            <tr>
              <td className="w-[5%] border"></td>

              <td
                colspan={5}
                className="w-[95%] text-center border font-semibold"
              >
                RISK CLASSIFICATION OF ASSETS AND PROVISIONING
              </td>
            </tr>

            <tr className="border">
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2 border ">NAME OF SACCO SOCIETY</td>
              <td colSpan={2} className="px-2 border w-[48%]"></td>
              <td className="px-2 border"></td>
            </tr>
            <tr className="border">
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2 border  ">SACCO SOCIETY CS NUMBER</td>
              <td colSpan={2} className="px-2 border w-[48%]"></td>
              <td className="px-2 border"></td>
            </tr>
            <tr className="border">
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2 border ">FINAL YEAR </td>
              <td colSpan={2} className="px-2 border w-[48%]"></td>
              <td className="px-2 border"></td>
            </tr>
            <tr className="border">
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2 border ">START DATE</td>
              <td colSpan={2} className="px-2 border w-[48%]"></td>
              <td className="px-2 border"></td>
            </tr>
            <tr className="border">
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2 border w-[30%]">END DATE </td>
              <td colSpan={2} className="px-2 border w-[48%]"></td>
              <td className="px-2 border"></td>
            </tr>
            <tr>
              {/* <th className="w-[5%] border"></th> */}
              <th colSpan={6} className="text-center border">
                PORTFOLIO AGEING REPORT
              </th>
            </tr>
            <tr>
              <th className="px-2 w-[5%] border"></th>
              <th className="px-2  border w-[30%]"></th>
              <th className="px-2  border w-[10%]">A</th>
              <th className="px-2  border w-[25%]">B</th>
              <th className="px-2  border w-[13%]">C</th>
              <th className="px-2  border w-[20%] ">D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 font-semibold w-[5%] border">NO.</td>
              <td className="px-2 font-semibold  border w-[30%]">
                CLASSIFICATION
              </td>
              <td className="px-2 font-semibold  border w-[10%]">
                NO. OF A/Cs
              </td>
              <td className="px-2 font-semibold  border w-[25%]">
                OUTSTANDING LOAN PORTFOLIO (Kshs)
              </td>
              <td className="px-2 font-semibold  border w-[13%]">
                REQUIRED PROVISION
              </td>
              <td className="px-2 font-semibold  border w-[20%] ">
                REQUIRED PROVISION AMOUNT (Kshs)
              </td>
            </tr>

            {/* <tr>
            <td className="px-2 w-[5%] border">&nbsp;</td>
            <td className="px-2  border w-[30%] font-semibold"></td>
            <td className="px-2  border w-[10%] text-right font-semibold"></td>
            <td className="px-2  border w-[25%] text-right font-semibold"></td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold"></td>
          </tr>
          <tr>
            <td className="px-2 w-[5%] border">&nbsp;</td>
            <td className="px-2  border w-[30%] font-semibold"></td>
            <td className="px-2  border w-[10%] text-right font-semibold"></td>
            <td className="px-2  border w-[25%] text-right font-semibold"></td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold"></td>
          </tr> */}

            {/* <tr>
            <td className="px-2 w-[5%] border"></td>
            <td className="px-2  border w-[30%] font-semibold">subtotal</td>
            <td className="px-2  border w-[10%] text-right font-semibold">0</td>
            <td className="px-2  border w-[25%] text-right font-semibold">0</td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold">0</td>
          </tr>
          <tr>
            <td className="px-2 w-[5%] border"></td>
            <td className="px-2  border w-[30%] ">
              Reschedule / Renegotiated loans
            </td>
            <td className="px-2  border w-[10%] text-right font-semibold"></td>
            <td className="px-2  border w-[25%] text-right font-semibold"></td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold"></td>
          </tr>
          <tr>
            <td className="px-2 w-[5%] border">&nbsp;</td>
            <td className="px-2  border w-[30%] font-semibold"></td>
            <td className="px-2  border w-[10%] text-right font-semibold"></td>
            <td className="px-2  border w-[25%] text-right font-semibold"></td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold"></td>
          </tr> */}
            {data.map((i) => (
              <tr>
                <td className="px-2 w-[5%] border">&nbsp;</td>
                <td className="px-2  border w-[30%] ">{i[0]}</td>
                <td className="px-2  border w-[10%] text-right "></td>
                <td className="px-2  border w-[25%] text-right ">{i[1]}</td>
                <td className="px-2  border w-[13%] text-right">{i[2]}</td>
                <td className="px-2  border w-[20%] text-right ">{i[3]}</td>
              </tr>
            ))}
            {/* <tr>
            <td className="px-2 w-[5%] border"></td>
            <td className="px-2  border w-[30%] font-semibold">subtotal</td>
            <td className="px-2  border w-[10%] text-right font-semibold">0</td>
            <td className="px-2  border w-[25%] text-right font-semibold">0</td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold">0</td>
          </tr>
          <tr>
            <td className="px-2 w-[5%] border"></td>
            <td className="px-2  border w-[30%] font-semibold">GRAND TOTAL</td>
            <td className="px-2  border w-[10%] text-right font-semibold">0</td>
            <td className="px-2  border w-[25%] text-right font-semibold">0</td>
            <td className="px-2  border w-[13%]"></td>
            <td className="px-2  border w-[20%] text-right font-semibold">0</td>
          </tr> */}
            <tr>
              <td className="px-2 w-[5%] border">&nbsp;</td>
              <td className="px-2  border w-[30%] font-semibold"></td>
              <td className="px-2  border w-[10%] text-right font-semibold"></td>
              <td className="px-2  border w-[25%] text-right font-semibold"></td>
              <td className="px-2  border w-[13%]"></td>
              <td className="px-2  border w-[20%] text-right font-semibold"></td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td colspan={5} className="border px-2">
                <span className="font-semibold">Note :</span> This return should
                be received on or before the 15th day of the month following end
                of every quarter
              </td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border">&nbsp;</td>
              <td className="px-2  border w-[30%] font-semibold"></td>
              <td className="px-2  border w-[10%] text-right font-semibold"></td>
              <td className="px-2  border w-[25%] text-right font-semibold"></td>
              <td className="px-2  border w-[13%]"></td>
              <td className="px-2  border w-[20%] text-right font-semibold"></td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2  border w-[30%] font-semibold">
                AUTHORIZATION
              </td>
              <td className="px-2  border w-[10%] text-right font-semibold"></td>
              <td className="px-2  border w-[25%] text-right font-semibold"></td>
              <td className="px-2  border w-[13%]"></td>
              <td className="px-2  border w-[20%] text-right font-semibold"></td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border">&nbsp;</td>
              <td
                colspan={5}
                px-2
                className=" border text-right font-semibold"
              ></td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td colspan={5} className=" border px-2">
                We declare that this return , to the best of our knowledge and
                belief is correct
              </td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td colspan={5} className=" border px-2">
                sign ..................................
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                date...................................
              </td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2  border w-[30%] font-semibold">
                Name of Authorizing Officer
              </td>
              <td className="px-2  border w-[10%] text-right font-semibold"></td>
              <td className="px-2  border w-[25%] text-right font-semibold"></td>
              <td className="px-2  border w-[13%]"></td>
              <td className="px-2  border w-[20%] text-right font-semibold"></td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td colspan={5} className=" border px-2">
                ..................................sign
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                date...................................
              </td>
            </tr>
            <tr>
              <td className="px-2 w-[5%] border"></td>
              <td className="px-2  border w-[30%] font-semibold">
                Name of Countersigning
              </td>
              <td className="px-2  border w-[10%] text-right font-semibold"></td>
              <td className="px-2  border w-[25%] text-right font-semibold"></td>
              <td className="px-2  border w-[13%]"></td>
              <td className="px-2  border w-[20%] text-right font-semibold"></td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer style={{ display: "none" }}>
        {/* <Button id="globalModalCloseBtn" style={{ background: "#0047AB", color: "white", paddingLeft: "20px", paddingRight: "20px" }} variant='dark' onClick={props.onHide}>Close Form</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default GlobalModal;
