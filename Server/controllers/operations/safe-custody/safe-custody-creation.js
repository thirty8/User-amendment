const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const SafeCustodyCreation = async (req, res) => {
  const {
    fetch,
    type_of_box_lov,
    type_of_box,
    delete_batch,
    batch_no,
    procedure,
    acct_link,
    document_ref,
    global_bra,
    custody_descrp,
    comments_v,
    form_code,
    username,
    machine_ip_v,
    hostname_v,
    global_prog,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    if (procedure === "safe custody") {
      const result = await con.execute(
        `BEGIN bankowner.safe_custody_create( :acct_link , :type_of_box, :batch_no, :custody_descrp, :document_ref, get_ebankservices_seq, :comments_v, :global_bra, :form_code, GET_POSTINGDATE,:username, :machine_ip_v,:hostname_v, GET_SESSID,  :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          acct_link,
          type_of_box,
          batch_no,
          custody_descrp,
          document_ref,
          global_bra,
          comments_v,
          form_code,
          username,
          machine_ip_v,
          hostname_v,
          global_prog,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );

      if (
        result.outBinds?.RESPONSE_CODE === "0" ||
        result.outBinds?.RESPONSE_CODE === "1"
      ) {
        return res.status(200).send([
          {
            RESPONSE_CODE: result.outBinds?.RESPONSE_CODE,
            RESPONSE_MESS: result.outBinds?.RESPONSE_MESS,
          },
        ]);
      } else {
        return res.status(200).send(result.outBinds?.RESPONSE_MESS);
      }
    }

    // fetch account details
    if (fetch === "true") {
      const data = await con.execute(
        `SELECT ACCT_LINK,ACCOUNT_DESCRP, GET_STAFF_BY_AC(ACCT_LINK) as staff_by_account,CURRENCY_CODE, get_localcurrency as local_currency from G_LEDGER
      WHERE ACCT_LINK=:acct_link and type_of_acct in ('1','2')
      and status_indicator not in ('BO','DO','DR','CLOS')`,
        { acct_link }
      );

      //   if local currency != currency code of acc number , err 06107

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
        return res.status(500).send(err);
      }
    }

    // delete fees
    if (delete_batch === "true") {
      const data = await con.execute(
        `DELETE FROM AC_POST_TEMP WHERE BATCH_NO = :batch_no`,
        { batch_no }
      );
      if (data) {
        return res
          .status(200)
          .send([{ mess_code: "1", mess: "successfully deleted" }]);
      }
    }
    // get type of box lov
    if (type_of_box_lov === "true") {
      const data = await con.execute(
        `SELECT ACTUAL_CODE,DESCRIPTION  FROM CODE_DESC WHERE CODE_TYPE='SDB'`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const value = data.rows[i][0];
          const label = data.rows[i][1];

          arr.push({
            label: `${value} - ${label}`,
            value: value ? `${value}` : "",
          });
        }

        return res.status(200).send(arr);
      } else {
        return res.status(500).send(err);
      }
    }
    // WHERE ACCT_LINK='004001100248250119'
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { SafeCustodyCreation };
