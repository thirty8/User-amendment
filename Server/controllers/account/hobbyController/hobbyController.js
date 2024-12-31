//imports
const { response } = require("express");
const oracledb = require("oracledb");


//db stuff
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};


//passing db configuration
// passing the request and response parameters
exports.getHobbyLov = async (req, res) => {

//qurying the database
  const sqlQuery = `
    SELECT  ACTUAL_CODE || ' - ' || DESCRIPTION  label, ACTUAL_CODE value FROM CODE_DESC WHERE CODE_TYPE='HOB'
  `;


  // innitaite connection 
  let connection;

  try {
    let arr0 = ""
    const response = [];

    connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      sqlQuery,
   
    );





    // code for converting the array of arratys to the arry of objects 
    if (result.rows && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        for (let x = 0; x < result.metaData.length; x++) {
          arr0 +=
            '"' +
            [result.metaData[x].name.toLowerCase()] +
            '" : "' +
            result.rows[i][x] +
            '",';
        }

        response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
      }
console.log(response)

// /this side is to tell of an error is encountered, thtry catch block should enbale that 
       return res.json(response);
    } else {
      res.status(204).send("No data found");
    }
} catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Server error");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing Oracle DB connection:", err);
      }
    }
  }
};



// // 
// const { response } = require("express");
// const oracledb = require("oracledb");



// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   connectString: process.env.DB_CONNECTION_STRING,
// }


// exports.getHobbyLov = async (req, res) => {



//   const sqlQuery = ` SELECT  ACTUAL_CODE || ' - ' || DESCRIPTION  label, ACTUAL_CODE value FROM CODE_DESC WHERE CODE_TYPE='HOB'
// `;


//   let connection;

//   try {
//     const response = [];
//     let arr0 = "";

//     connection = await oracledb.getConnection(config);


//     const result = await connection.execute(
//       sqlQuery,
//     );

//     if (data.rows && data.rows.length > 0) {
//       for (let i = 0; i < data.rows.length; i++) {
//         for (let x = 0; x < data.metaData.length; x++) {
//           arr0 +=
//             '"' +
//             [data.metaData[x].name.toLowerCase()] +
//             '" : "' +
//             data.rows[i][x] +
//             '",';
//         }

//         response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
//       }

//       res.json(response);
//     } else {
//       res.status(204).send("No data found");
//     }
//   } catch (error) {
//     console.error("and error has been encoubtere", error)
//     res.status(500).send("internal server error");
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error("another error encountered", err)

//       }
//     }

//   }

// }