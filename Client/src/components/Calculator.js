import React, { useState } from "react";

const ModernCalculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (input.includes("Error")) {
      setInput(value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleClearEntry = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleSquareRoot = () => {
    setInput(Math.sqrt(parseFloat(input)).toString());
  };

  const handleExponentiation = () => {
    setInput((prevInput) => prevInput + "**");
  };

  const handleTrigFunction = (func) => {
    setInput(func + "(" + input + ")");
  };

  const handleLogarithm = () => {
    setInput("log(" + input + ")");
  };

  const handleFactorial = () => {
    setInput((prevInput) => prevInput + "!");
  };

  return (
    <div style={calculatorStyle}>
      <div style={displayStyle}>{input}</div>
      <div style={gridStyle}>
        {/* First Row */}
        <button onClick={() => handleButtonClick("7")} style={buttonStyle}>
          7
        </button>
        <button onClick={() => handleButtonClick("8")} style={buttonStyle}>
          8
        </button>
        <button onClick={() => handleButtonClick("9")} style={buttonStyle}>
          9
        </button>
        <button onClick={() => handleButtonClick("/")} style={buttonStyle}>
          /
        </button>

        {/* Second Row */}
        <button onClick={() => handleButtonClick("4")} style={buttonStyle}>
          4
        </button>
        <button onClick={() => handleButtonClick("5")} style={buttonStyle}>
          5
        </button>
        <button onClick={() => handleButtonClick("6")} style={buttonStyle}>
          6
        </button>
        <button onClick={() => handleButtonClick("*")} style={buttonStyle}>
          *
        </button>

        {/* Third Row */}
        <button onClick={() => handleButtonClick("1")} style={buttonStyle}>
          1
        </button>
        <button onClick={() => handleButtonClick("2")} style={buttonStyle}>
          2
        </button>
        <button onClick={() => handleButtonClick("3")} style={buttonStyle}>
          3
        </button>
        <button onClick={() => handleButtonClick("-")} style={buttonStyle}>
          -
        </button>

        {/* Fourth Row */}
        <button onClick={() => handleButtonClick("0")} style={buttonStyle}>
          0
        </button>
        <button onClick={() => handleButtonClick(".")} style={buttonStyle}>
          .
        </button>
        <button onClick={handleClear} style={buttonStyle}>
          C
        </button>
        <button onClick={() => handleButtonClick("+")} style={buttonStyle}>
          +
        </button>
      </div>

      <div style={gridStyle}>
        <button onClick={() => handleButtonClick("(")} style={buttonStyle}>
          (
        </button>
        <button onClick={() => handleButtonClick(")")} style={buttonStyle}>
          )
        </button>
        <button onClick={handleSquareRoot} style={buttonStyle}>
          √
        </button>
        <button onClick={handleExponentiation} style={buttonStyle}>
          ^
        </button>
      </div>

      <div style={trigFunctionsGridStyle}>
        <button onClick={() => handleTrigFunction("sin")} style={buttonStyle}>
          sin
        </button>
        <button onClick={() => handleTrigFunction("cos")} style={buttonStyle}>
          cos
        </button>
        <button onClick={() => handleTrigFunction("tan")} style={buttonStyle}>
          tan
        </button>
        <button
          onClick={() => handleButtonClick("3.141592653589793")}
          style={buttonStyle}
        >
          π
        </button>
      </div>

      <div style={gridStyle}>
        <button onClick={handleLogarithm} style={buttonStyle}>
          log
        </button>
        <button onClick={handleFactorial} style={buttonStyle}>
          !
        </button>
        <button
          onClick={() => handleButtonClick("2.718281828459045")}
          style={buttonStyle}
        >
          e
        </button>
        <button onClick={handleClearEntry} style={buttonStyle}>
          CE
        </button>
      </div>

      {/* Equal sign that spans the entire row */}
      <div style={gridStyle}>
        <button
          onClick={handleEvaluate}
          style={{ ...buttonStyle, gridColumn: "1 / span 4" }}
        >
          =
        </button>
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

const calculatorStyle = {
  width: "300px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "50px auto",
  marginTop: "5px",
  marginBottom: "-23px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
};

const displayStyle = {
  textAlign: "right",
  fontSize: "20px",
  marginBottom: "10px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "5px",
};

const trigFunctionsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "5px",
  marginTop: "10px",
};

export default ModernCalculator;
