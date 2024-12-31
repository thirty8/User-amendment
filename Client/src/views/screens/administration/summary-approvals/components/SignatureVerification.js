import React,{useEffect,useState} from 'react'
import axios from "axios"
import Header from '../../../../../components/others/Header/Header';
import { API_SERVER } from '../../../../../config/constant';
import { SiFarfetch } from "react-icons/si";
import ImageVerification from "../../../../../components/ImageVerification"

function SignatureVerification({ setShowSignatureVerificationModal, accountNumber }) {

    const handleClose = () => setShowSignatureVerificationModal(false);

  return (
    <div className="text-gray-700" style={{ marginBottom: "-30px", marginLeft: "-17px", marginRight: "-16px", marginTop: "-20px", overflowY: "none" }}>
    <div>
      <div
        style={{
          backgroundColor: "#48c1d8",
        }}
        className="w-full shadow"
      >
        <div className=" flex justify-between py-[6px] px-2 items-center ">
          <div style={{ fontSize: "14px" }} className="text-white font-semibold">
            Signature Verification
          </div>

          <svg
            onClick={() => setShowSignatureVerificationModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            // style={{ padding: "10px" }}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      
    </div>
    <div className="bg-gray-200 rounded-b ">
      <div className="bg-white shadow rounded px-0 pt-1 pb-8 " style={{ marginBottom: "-25px" }}>
  
              <ImageVerification accountNumber={accountNumber} />

            </div>
        </div>
      </div>
  )
}

export default SignatureVerification