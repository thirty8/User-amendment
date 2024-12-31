import swal from "sweetalert";

//variables for various uses
export const regex = /[a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|<>/?`~\s]/;

//convert to just two decimal places with commas
export function formatNumber2dp(num) {
  if (isNaN(num)) {
    return ""; // Return an empty string for invalid input
  }

  const numericInput = String(num).replace(/[^0-9.-]/g, "");
  // Convert the input to a number and check if it's valid
  const number = parseFloat(numericInput);

  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
  // console.log({ formatted }, amount);

  return formatted;
}

//swal if it doesnt contain only numbers
export function formatNumber(num, id) {
  // containsLetters(num,debit_amount_field)
  // const regex = /[0-9]/;
  if (regex.test(num) === true) {
    swal({
      title: "Error",
      text: "kindly ensure amount entered doesn't contain any letters or symbols",
      icon: "warning",
      closeOnClickOutside: false,
    }).then((result) => {
      if (result) {
        id.focus();
        id.select();
      }
    });
  } else {
    const numericInput = String(num).replace(/[^0-9.-]/g, "");
    // Convert the input to a number and check if it's valid
    const number = parseFloat(numericInput);

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    // console.log({ formatted }, amount);

    return formatted;
  }
}

//numbers with no commas
export const NumberWithoutCommas = (number) => {
  const formattedNumber = String(number).replace(/,/g, "");
  return Number(formattedNumber);
};

//////
export function formatNumberclear(num) {
  const numericInput = String(num).replace(/[^0-9.-]/g, "");
  // Convert the input to a number and check if it's valid
  const number = parseFloat(numericInput);

  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });

  return formatted;
}

///format number and never return NAN
export function formatNumber1(num) {
  const number = parseFloat(num);

  if (isNaN(number)) {
    return ""; // Return an empty string for invalid input
  }

  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });

  return formatted;
}

export const handleExitClick = () => {
  if (document.getElementById("exitBTN1")) {
    const exitBTN = document.getElementById("exitBTN1");
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    exitBTN.dispatchEvent(clickEvent);
  }
};

export function formatDate(inputDateStr) {
  var inputDate = new Date(inputDateStr);
  var months = [
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
  return (
    inputDate.getDate() +
    "-" +
    months[inputDate.getMonth()] +
    "-" +
    inputDate.getFullYear()
  );
}

// function to handle radiobuttons in budget screens
export const handleRadioButtons = (text) => {
  switch (text.toUpperCase()) {
    case "OPEN" || "O":
      return "O";
    case "FROZEN" || "F":
      return "F";
    case "CURRENT" || "C":
      return "C";
    case "BALANCE SHEET" || "BS":
      return "BS";
    case "PROFIT AND LOSS" || "PL":
      return "PL";
    default:
      break;
  }
};

export const switchFocus = (e, nextFieldId) => {
  if (e.key === "Enter") {
    // e.preventDefault()
    document.getElementById(nextFieldId).focus();
  }
};
