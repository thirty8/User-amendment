export default function PreviewChanges({ changedData, updateTimestamp }) {
    return Object.keys(changedData)?.length > 0 ? (
      <div className="text-sm text-gray-500">
        <div className="flex space-x-3 justify-between">
          <div className="space-y-2 w-[65%]">
            <div className="font-semibold text-[16px] mb-3 flex items-center space-x-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="">Previous Values</span>
            </div>
            {Object.keys(changedData)?.map((i) => (
              <div className="flex space-x-2 items-center ">
                <span className="font-semibold capitalize w-[40%]">
                  {i?.split("_")?.join(" ")}
                </span>
                <span className="bg-slate-100 rounded-md p-[5.5px] flex-grow">
                  {changedData[i] ?? <span>N/A</span>}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 flex-grow rounded-lg h-[130px]  p-2 border-2 border-[#6A89F8] bg-[#F2F5FF]">
            <div className="font-semibold text-[16px] mb-3 flex items-center space-x-2">
              <span>Alteration Info</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            <LabelAndValue
              label={"Altered By :"}
              value={JSON.parse(localStorage.getItem("userInfo")).id}
            />
            <LabelAndValue
              label={"Branch :"}
              value={JSON.parse(localStorage.getItem("userInfo")).branch}
            />
            <LabelAndValue label={"Timestamp :"} value={updateTimestamp} />
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col py-7  justify-center   items-center">
        <img src="/no-content.jpg" className="h-[200px]" />
        <span className="animate-pulse -mt-4">No changes have been made yet</span>
      </div>
    );
  }
  
  function LabelAndValue({ label, value }) {
    return (
      <div className="flex  space-x-2">
        <span className="w-[40%] text-blue-500 font-semibold whitespace-nowrap">
          {label}
        </span>
        <span>{value}</span>
      </div>
    );
  }