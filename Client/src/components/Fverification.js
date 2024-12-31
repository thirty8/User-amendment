import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const FormData = require('form-data');

function Fverification({relationNo}) {
  const [initiated, setInitiated] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');
//   const [relationNo, setRelationNo] = useState('');
  const [isCaptured, setIsCaptured] = useState(false);
  const [responseData, setResponseData] = useState(null);

//   const handleRelationNoChange = (e) => {
//     setRelationNo(e.target.value);
//   };

  const initiateScanner = () => {
    // Initiate the scanner here and set 'initiated' state accordingly
    // You can use fetch or axios to make the AJAX request

    // Example using fetch:
    fetch('http://192.168.1.83:8080/init')
      .then((response) => response.json())
      .then((result) => {
        if (result === 1 || result === -1) {
          setInitiated(true);
          setIsCaptured(false); // Clear captured image on initiation
          Swal.fire({
            icon: 'success',
            title: 'Initiation Successful',
          });
        } else if (result === -2) {
          alert('Failed to initiate. Please make sure the device is connected.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const captureFingerprint = () => {
    // Capture the fingerprint and set 'capturedImage' state accordingly
    // You can use fetch or axios to make the AJAX request

    // Example using fetch:
    const formData = new FormData();
    formData.append('relation_no', relationNo); // Set the relation number here

    fetch('http://192.168.1.83:8080/capture', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response_code === -1) {
          Swal.fire({
            icon: 'error',
            title: 'Device not initiated',
            text: 'Make sure the device is connected',
          });
        } else if (result.response_code === 1) {
          setCapturedImage('data:image/png;base64,' + result.image);
          setIsCaptured(true); // Set captured flag
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

// const handleVerifyClick = async () => {
//     try {
//       const form = new FormData();
//       form.append("relation_no", relationNo);

//       const response = await fetch('http://192.168.1.83:8080/verify', {
//         method: 'POST',
//         body: form,
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       console.warn("response ::: ", response)

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const updateResponse = await response.json();
//       setResponseData(updateResponse); // Update state with response data
//       Swal.fire({
//         title:"Auto close alert",
//         test: responseData,
//         timer:2000
//       })
//     } catch (error) {
//       console.error('Error:', error);
//     }
// };

    const handleVerifyClick = async () => {
        
        let data = new FormData();
        data.append('relation_no',relationNo);

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.1.83:8080/verify',
        // headers: { 
        //     ...data.getHeaders()
        // },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log("response:::",JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });
    };
  
  const recapture = () => {
    setIsCaptured(false); // Clear captured image to recapture
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-light-blue-200 h-50 w-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">X FINGER</h1>

      <div className="bg-white rounded-md shadow-md p-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={initiateScanner}
        >
          Connect Scanner
        </button>

        {initiated && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Capture Fingerprint</h2>
            <img
              className="w-72 h-64 mx-auto"
              id="scanned_img"
              alt=""
              src={capturedImage}
            />
            <div className="text-center">
              {/* <input
                type="text"
                placeholder="Enter Relation Number"
                value={relationNo}
                // onChange={handleRelationNoChange}
                className="border border-gray-300 rounded-md p-2 mb-4"
              /> */}
              {!isCaptured ? (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleVerifyClick}
                >
                  Verify
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={recapture}
                >
                  Re-verify
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fverification;
