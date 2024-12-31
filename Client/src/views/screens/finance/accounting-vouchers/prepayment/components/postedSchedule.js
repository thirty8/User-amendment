import React from "react";
import CustomTable from "../../../../teller-ops/components/CustomTable";

function PostedSchedule({ scheduleData }) {
  return (
    <div className="p-2" style={{ zoom: 0.95 }}>
      <CustomTable
        headers={[
          "#",
          "Prepay Account .CR",
          "Expense Account .DB",
          "Due Amount",
          "Due Date",
          "Frequency",
          "Branch",
          "Narration",
        ]}
        data={scheduleData}
        rowsPerPage={15}
      />
    </div>
  );
}

export default PostedSchedule;
