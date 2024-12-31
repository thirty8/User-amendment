import React from 'react'

const Ebanking_Customer_Risk = () => {
  return (
    <div className="p-4">
      <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Our Ebanking Services :</h3>
        <ul class="grid w-full gap-6 md:grid-cols-3">
            <li>
                <input type="checkbox" id="react-option" value="" class="hidden peer" required="" />
                <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                    <div class="block">
                        <img className='mb-2 w-10 h-10 rounded-full' src='https://img.freepik.com/premium-vector/atm-icon_1454-389.jpg' />
                        <div class="w-full text-lg font-semibold">ATM</div>
                        <div class="w-full text-sm">Withdraw money anywhere using our ATMs</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="checkbox" id="flowbite-option" value="" class="hidden peer" />
                <label for="flowbite-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <img className='mb-2 w-10 h-10 rounded' src='https://cdn-icons-png.flaticon.com/512/204/204209.png' />
                        <div class="w-full text-lg font-semibold">Internet Banking</div>
                        <div class="w-full text-sm">Check your account balance and send money</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="checkbox" id="angular-option" value="" class="hidden peer" />
                <label for="angular-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <img className='mb-2 w-10 h-10 rounded' src="https://icons-for-free.com/iconfiles/png/512/phone+send+sms+icon-1320191835303044284.png" />
                        <div class="w-full text-lg font-semibold">SMS</div> 
                        <div class="w-full text-sm">Receive an SMS Alert on this Account</div>
                    </div>
                </label>
            </li>
        </ul>
    </div>
  )
}

export default Ebanking_Customer_Risk