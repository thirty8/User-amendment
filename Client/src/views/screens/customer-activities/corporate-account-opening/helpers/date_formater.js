// dateUtils.js

/**
 * Formats a date string into the format DD-MON-YYYY.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 * @throws {Error} Throws an error if the date is in the future.
 */
// const formatDate = (dateString) => {
//   const inputDate = new Date(dateString);
//   const currentDate = new Date();

//   if (inputDate > currentDate) {
//     throw new Error("Cannot format a future date.");
//   }

//   const formattedDate = `${inputDate.getDate()}-${formatMonth(
//     inputDate.getMonth()
//   )}-${inputDate.getFullYear()}`;
//   return formattedDate;
// };

// const formatDate = (dateString, isEndDate = false) => {
//   try {
//     // Attempt to create a Date object
//     const inputDate = new Date(dateString);

//     // Check if the input date is valid
//     if (isNaN(inputDate.getTime())) {
//       throw new RangeError(`Invalid time value: ${dateString}`);
//     }

//     const currentDate = new Date();

//     // // Handle future dates only for end dates
//     // if (!isEndDate && inputDate > currentDate) {
//     //   throw new Error("Cannot format a future date.");
//     // }
//     // Check for future dates only for non-end dates
//   if (!isEndDate && inputDate > currentDate) {
//     swal.fire({
//       icon: 'error',
//       title: 'Invalid Date',
//       text: 'Cannot select a future date!',
//       confirmButtonText: 'OK',
//     });
//     return; // Stop further execution
//   }

//     // Array of month names
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Format the date as dd-MMM-yyyy
//     const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}-${monthNames[inputDate.getMonth()]}-${inputDate.getFullYear()}`;
    
//     return formattedDate;

//   } catch (error) {
//     console.error(`Error formatting date: ${error.message}`);
//     throw error; // Optionally rethrow the error or handle it gracefully
//   }
// };


import swal from "sweetalert";

// export const formatDate = (dateString, isEndDate = false) => {
//   try {
//     if (!dateString) {
//       throw new RangeError("Date string is undefined or empty.");
//     }

//     // Parse date from the input string
//     const inputDate = new Date(dateString);

//     // Check if the date is valid
//     if (isNaN(inputDate.getTime())) {
//       throw new RangeError(`Invalid time value: ${dateString}`);
//     }

//     const currentDate = new Date();

//     // Show SweetAlert for future dates (non-end dates only)
//     if (!isEndDate && inputDate > currentDate) {
//       swal({
//         icon: 'error',
//         title: 'Invalid Date',
//         text: 'Cannot select a future date!',
//         confirmButtonText: 'OK',
//       });
//       return; // Stop execution and prevent further processing
//     }

//     // Month names array for formatting
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Format date as dd-MMM-yyyy
//     const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}-${monthNames[inputDate.getMonth()]}-${inputDate.getFullYear()}`;
    
//     return formattedDate;

//   } catch (error) {
//     console.error(`Error formatting date: ${error.message}`);
//     swal({
//       icon: 'error',
//       title: 'Date Formatting Error',
//       text: `Failed to format date: ${error.message}`,
//       confirmButtonText: 'OK',
//     });
//     return null; // Return null if error occurred
//   }
// };




// export const formatDate = (dateString, isEndDate = false) => {
//   try {
//     // Ensure dateString is valid before processing
//     if (!dateString) {
//       throw new Error("Date string is undefined or null");
//     }

//     // Check if the date string contains time
//     const dateOnlyString = dateString.includes('T') ? dateString.split('T')[0] : dateString;

//     const inputDate = new Date(dateOnlyString);

//     if (isNaN(inputDate.getTime())) {
//       throw new RangeError(`Invalid time value: ${dateString}`);
//     }

//     const currentDate = new Date();

//     // Show SweetAlert for future dates (non-end dates only)
//     if (!isEndDate && inputDate > currentDate) {
//       swal({
//         icon: 'error',
//         title: 'Invalid Date',
//         text: 'Cannot select a future date!',
//         confirmButtonText: 'OK',
//       });
//       return; // Stop execution and prevent further processing
//     }

//     // Month names array for formatting
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Format date as dd-MMM-yyyy
//     const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}-${monthNames[inputDate.getMonth()]}-${inputDate.getFullYear()}`;
    
//     return formattedDate;

//   } catch (error) {
//     console.error(`Error formatting date: ${error.message}`);
//     swal({
//       icon: 'error',
//       title: 'Date Formatting Error',
//       text: `Failed to format date: ${error.message}`,
//       confirmButtonText: 'OK',
//     });
//     return null; // Return null if error occurred
//   }
// };


export const formatDate = (dateString, isEndDate = false) => {
  try {
    // Check if the dateString is undefined, null, or empty
    if (!dateString) {
      throw new RangeError("Date string is undefined or empty.");
    }

    let inputDate;

    // Handle ISO 8601 format and general date strings
    if (typeof dateString === 'string' && dateString.includes('T')) {
      inputDate = new Date(dateString);
    } else if (typeof dateString === 'string') {
      inputDate = new Date(Date.parse(dateString));
    } else {
      inputDate = new Date(dateString); // Handle Date object or other types
    }

    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
      throw new RangeError(`Invalid time value: ${dateString}`);
    }

    const currentDate = new Date();

    // Check for future dates if isEndDate is false
    if (!isEndDate && inputDate > currentDate) {
      swal({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Cannot select a future date!',
        confirmButtonText: 'OK',
      });
      return null; // Stop further processing
    }

    // Month names array for formatting
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format date as dd-MMM-yyyy
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}-${monthNames[inputDate.getMonth()]}-${inputDate.getFullYear()}`;
    
    return formattedDate;

  } catch (error) {
    // Only log error if the date string was actually empty or invalid
    if (dateString === null || dateString === '') {
      console.log("dateString:",dateString)
      console.error(`Error: ${error.message}`);
      swal({
        icon: 'error',
        title: 'Date Formatting Error',
        text: `Failed to format date: ${error.message}`,
        confirmButtonText: 'OK',
      });
    }
    return null; // Return null if error occurred
  }
};



/**
 * Helper function to format the month.
 * @param {number} monthIndex - The month index (0-11).
 * @returns {string} The formatted month in abbreviated form.
 */
const formatMonth = (monthIndex) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return months[monthIndex];
};


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDateForInput = (date) => {
  if (!date) return ""; // Handle case when date is not set

  // Assume the date format is DD-MMM-YYYY (e.g., 01-Sep-2024)
  const [day, monthName, year] = date.split("-");
  
  // Find the numeric month value
  const month = monthNames.indexOf(monthName) + 1;
  if (month === 0) return ""; // Invalid month name
  
  // Format month and day with leading zeros if necessary
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.padStart(2, '0');

  console.log(`convert${formattedMonth}-${formattedDay}-${year}`)
  
  return `${formattedMonth}-${formattedDay}-${year}`; // Convert to MM-dd-yyyy format
};

export {
  // formatDate,
  formatMonth,
  formatDateForInput,
};
