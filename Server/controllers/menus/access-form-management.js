const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const accessFormManagement = async (req, res) => {
  const { access_code, screen_code, access_v, get_all_user_groups, procedureType, lov } = req.body;
  let con;

  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });
    // const execute = util.promisify(db.execute).bind(db);

    // procedure for adding menu to form
    if (procedureType === "grant access") {
      const myData = JSON.stringify(access_v);

      const data = await con.execute(`BEGIN CBXDMX.prc_grantScreen_access(:access_v ,:msg);END;`, {
        access_v: {
          type: oracledb.STRING,
          dir: oracledb.BIND_IN,
          val: myData,
        },

        msg: {
          type: oracledb.STRING,
          dir: oracledb.BIND_OUT,
        },
      });
      if (data) {
        return res.status(200).send({
          msg: data.outBinds?.msg,
        });
      } else {
        return res.send(data.outBinds?.msg);
      }
    }

    // delete access
    if (procedureType === "delete access") {
      const data = await con.execute(
        `BEGIN CBXDMX.prc_deleteScreen_access(:access_code, :screen_code, :msg);END;`,
        {
          access_code: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },
          screen_code: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
          },

          msg: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
        }
      );
      if (data) {
        return res.status(200).send({
          msg: data.outBinds?.msg,
        });
      } else {
        return res.send(data.outBinds?.msg);
      }
    }

    // get access form management modules
    if (lov === "true") {
      const data = await con.execute(
        `select menu_id, menu_name from tb_menus where menu_level = '3'`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const value = data.rows[i][0];
          const label = data.rows[i][1];
          //   const short_descrp = data.rows[i][2];

          arr.push({
            label: `${value} - ${label}`,
            value: value ? `${value}` : "",
          });
        }

        return res.send(arr);
      } else {
        return res.send("Something went wrong... Nothing was returned!!");
      }
    }

    // get all user groups
    if (get_all_user_groups === "true") {
      const data = await con.execute(
        `select AC.FORM_CODE, MN.MENU_NAME from S_ACCESS_CODE_BR AC JOIN TB_MENUS MN ON AC.FORM_CODE = MN.MENU_ID WHERE AC.ACCESS_CODE= '${access_code}'`
      );

      if (data.rows) {
        const response = [];
        for (let i = 0; i < data.rows.length; i++) {
          const rowData = {}; // Create an object for each row

          for (let x = 0; x < data.metaData.length; x++) {
            const columnName = data.metaData[x].name.toLowerCase();
            const columnValue = data.rows[i][x];
            rowData[columnName] = columnValue; // Assign each column to the object
          }

          response.push(rowData); // Push the object to the response array
        }
        return res.status(200).send(response);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send({ error: "An error occurred" + err });
  }
};

module.exports = { accessFormManagement };
