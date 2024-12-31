import React from 'react'

const Ebanking_Customer_Risk = ({isChecked, setIsChecked, handleCheckboxChange}) => {
  return (
    <div className="p-4">
      <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Our Ebanking Services :</h3>
        <ul class="grid w-full gap-6 md:grid-cols-3">

        <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
            <img src="https://img.freepik.com/premium-vector/atm-icon_1454-389.jpg" alt="logo" className="w-16 h-16 mr-6" />
            <div className="flex-grow">
                <h2 className="text-lg font-medium text-gray-900 mb-2">ATM</h2>
                {/* <p className="text-gray-700 text-sm">Withdraw money anywhere using our ATMs</p> */}
            </div>
            <div>
                <label className="inline-flex items-center">
                <input 
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    type="checkbox" 
                    className="form-checkbox h-8 w-8 text-blue-600" 
                />
                </label>
            </div>
        </div>

        <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
            <img src="https://cdn-icons-png.flaticon.com/512/204/204209.png" alt="logo" className="w-16 h-16 mr-6" />
            <div className="flex-grow">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Internet Banking</h2>
                {/* <p className="text-gray-700 text-sm">Check your account balance and send money</p> */}
            </div>
            <div>
                <label className="inline-flex items-center">
                <input
                    // checked={isChecked}
                    onChange={handleCheckboxChange}
                    type="checkbox" 
                    className="form-checkbox h-8 w-8 text-blue-600" 
                />
                </label>
            </div>
        </div>

        <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
            <img src="https://icons-for-free.com/iconfiles/png/512/phone+send+sms+icon-1320191835303044284.png" alt="logo" className="w-16 h-16 mr-6" />
            <div className="flex-grow">
                <h2 className="text-lg font-medium text-gray-900 mb-2">SMS</h2>
                {/* <p className="text-gray-700 text-sm">Receive an SMS Alert on this Account</p> */}
            </div>
            <div>
                <label className="inline-flex items-center">
                    <input
                        // checked={isChecked}
                        onChange={handleCheckboxChange}
                        type="checkbox" 
                        className="form-checkbox h-8 w-8 text-blue-600" 
                    />
                </label>
            </div>
        </div>


           
        </ul>
    </div>
  )
}

export default Ebanking_Customer_Risk