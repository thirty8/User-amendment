import React from "react";

const AccountInputs = () => {
  return (
    <div>
      <div className="flex gap-1 p-2 flex-1 h-[25px] sticky top-0 bg-[#0580c0] items-center text-white">
        <div>
          <div className="  border-r border-white  w-[300px] text-center">
            Account Description
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center">
            Control Amount
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center">
            Distributed Amount
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInputs;
