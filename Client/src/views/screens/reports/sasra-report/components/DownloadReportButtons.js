import html2canvas from "html2canvas";
import Preview from "./Preview";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useState, useRef, useEffect } from "react";
import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";

function App({ data }) {
  const [showPreview, setShowPreview] = useState(false);
  const [download, setDownload] = useState(false);
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const childRef = useRef(null);

  function ExcelDownloadButton({ filename }) {
    const downloadExcelFile = (e) => {
      e.preventDefault();
      setShowPreview(true);
      // setDownload(!download);

      const table = document.getElementById("my-table");
      const worksheet = XLSX.utils.table_to_sheet(table);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, filename + ".xlsx");
    };

    console.log({data})
    return (
      <button
        className="btn-sm btn-light"
        onClick={downloadExcelFile}
        style={{
          background:
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`,
          color: "white",
        }}
      >
        <MDBIcon
          style={{ color: "white", marginRight: "7px", fontSize: 14 }}
          fas
          icon="file-excel"
        />{" "}
        Download Excel
      </button>
    );
  }

  function exportTableToPDF(e) {
    e.preventDefault();
    setShowPreview(true);
    setDownload(!download);
  }

  return (
    <div className="w-full ">
      <table id="my-table" className="w-[100%] hidden">
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
            <td className="px-2 font-semibold  border w-[10%]">NO. OF A/Cs</td>
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
      <div className="flex justify-end">
        <div className='flex space-x-2'>
          <ExcelDownloadButton filename="myReport" />

        <button
          className="btn-sm btn-light ml-3"
          onClick={exportTableToPDF}
          style={{ background: "red", color: "white" }}
        >
          <MDBIcon
            style={{ color: "white", marginRight: "7px", fontSize: 14 }}
            fas
            icon="file-pdf"
          />{" "}
          Download PDF
        </button>
        </div>
      </div>
      <Preview
        ref={childRef}
        showModal={showPreview}
        download={download}
        data={data}
        setShowModal={setShowPreview}
      />
    </div>
  );
}
export default App;
