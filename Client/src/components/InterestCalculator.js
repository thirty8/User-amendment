import React, { useState } from "react";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const calculateInterest = () => {
    try {
      const principalAmount = parseFloat(principal);
      const rate = parseFloat(interestRate) / 100;
      const timePeriod = parseFloat(time);

      const calculatedInterest = (principalAmount * rate * timePeriod).toFixed(
        2
      );
      setInterest(calculatedInterest);

      const totalAmountValue = (
        principalAmount + parseFloat(calculatedInterest)
      ).toFixed(2);
      setTotalAmount(totalAmountValue);
    } catch (error) {
      setInterest("Error");
      setTotalAmount("Error");
    }
  };

  const handleClear = () => {
    setPrincipal("");
    setInterestRate("");
    setTime("");
    setInterest("");
    setTotalAmount("");
  };

  return (
    <div style={calculatorStyle}>
      <div style={gridStyle}>
        <label>Principal Amount:</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={gridStyle}>
        <label>Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={gridStyle}>
        <label>Time Period (years):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={gridStyle}>
        <button onClick={calculateInterest} style={buttonStyle}>
          Calculate Interest
        </button>
        <button onClick={handleClear} style={buttonStyle}>
          Clear
        </button>
      </div>

      <hr />

      <div style={resultStyle}>
        <p>
          Interest: <b>{interest}</b>
        </p>
        <p>Total Amount: <b>{totalAmount}</b></p>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#ffffff",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "5px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const calculatorStyle = {
  width: "400px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "50px auto",
  marginTop: "5px",
  marginBottom: "-23px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
};

const gridStyle = {
  display: "grid",
  paddingBottom: "15px",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
  alignItems: "center",
};

const resultStyle = {
  padding: "5px",
  marginTop: "10px",
  paddingBottom: "25px",
  fontSize: "16px",
};

export default InterestCalculator;
