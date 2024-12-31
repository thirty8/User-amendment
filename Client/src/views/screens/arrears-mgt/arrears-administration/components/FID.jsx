import React from "react";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";

function FID({ fid, loading }) {
  // CONSTANTS AND VARIABLES
  const collectorList = [
    <div style={{ textAlign: "left" }}>Facility No.</div>,
    <div style={{ textAlign: "left" }}>Customer Name</div>,
    <div style={{ textAlign: "left" }}>Date Due</div>,
    <div style={{ textAlign: "left" }}>Principal</div>,
    <div>Interest</div>,
    <div style={{ textAlign: "right" }}>Principal Paid</div>,
    <div style={{ textAlign: "right" }}>Interest Paid</div>,
    <div>Days Due</div>,
  ];
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  console.log(fid, "LEE");

  const fidData = fid?.map((i) => {
    return [
      <div className="text-left">{i?.facility_no}</div>,
      <div className="text-left">{i?.customer_name}</div>,
      <div>{formatDate(i?.date_due)}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.principal))}
      </div>,
      <div className="text-right">{formatNumber(parseFloat(i?.interest))}</div>,
      <div className="text-right">{formatNumber(parseFloat(i?.prp))}</div>,

      <div className="text-right">{formatNumber(parseFloat(i?.int_paid))}</div>,
      <div className="text-right text-red-500 font-bold">{i?.overdue_day}</div>,
    ];
  });

  return (
    <div>
      <Header headerShade title="First Installment Default" />
      <CustomTable
        headers={collectorList}
        data={fidData}
        load={loading}
        rowsPerPage={10}
      />
    </div>
  );
}

export default FID;
