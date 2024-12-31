require("dotenv").config();

var bodyParser = require("body-parser");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;

var oracledb = require("oracledb");
const util = require("util");

let response = [];

let getUserDeviceInfoFunc = async (user_id) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    const response = [];
    let arr0 = "";
    // node native promisify
    const execute = util.promisify(db.execute).bind(db);
    const data = await execute(
      `SELECT * FROM TB_USER_DEVICE_INFO WHERE user_id = '${user_id}' ORDER BY last_login DESC OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY`
    );

    if(data){

      for (let i = 0; i < data.rows.length; i++) {
        for (let x = 0; x < data.metaData.length; x++) {
          arr0 +=
            '"' +
            [data.metaData[x].name.toLowerCase()] +
            '" : "' +
            data.rows[i][x] +
            '",';
        }

        response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
      }

      return response;

    } else {
      return "Something went wrong... Nothing was returned!!";
    }

  } finally {
    // conn.end();
  }
};

module.exports.getUserDeviceInfoFunc = getUserDeviceInfoFunc;