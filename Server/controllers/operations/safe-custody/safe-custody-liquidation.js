const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const SafeCustodyLiquidation = async (req, res) => {
  const {
    fetch_data,
    fetch_data2,
    type_of_box_lov,
    type_of_box,
    delete_batch,
    batch_no,
    procedure,
    acct_link,
    requisition_no,
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

    let determinant = "";

    if (acct_link) {
      determinant += `AND ACCT_LINK LIKE '%${acct_link}%'`;
    } else {
      determinant += "";
    }

    if (requisition_no) {
      determinant += `AND REQUISITION_NO LIKE '%${requisition_no}%'`;
    } else {
      determinant += "";
    }

    // if (procedure === "safe custody") {
    //   // console.log("derrick");
    //   console.log({
    //     acct_link,
    //     type_of_box,
    //     batch_no,
    //     document_ref,
    //     custody_descrp,
    //     comments_v,
    //     global_bra,
    //     form_code,
    //     username,
    //     machine_ip_v,
    //     hostname_v,
    //     global_prog,
    //     kofi: "me",
    //   });
    //   const result = await con.execute(
    //     `BEGIN bankowner.safe_custody_create( :acct_link , :type_of_box, :batch_no, :custody_descrp, :document_ref, get_ebankservices_seq, :comments_v, :global_bra, :form_code, GET_POSTINGDATE,:username, :machine_ip_v,:hostname_v, GET_SESSID,  :global_prog, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
    //     {
    //       acct_link,
    //       type_of_box,
    //       batch_no,
    //       custody_descrp,
    //       document_ref,
    //       global_bra,
    //       comments_v,
    //       form_code,
    //       username,
    //       machine_ip_v,
    //       hostname_v,
    //       global_prog,
    //       RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    //       RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    //     }
    //   );

    //   if (
    //     result.outBinds?.RESPONSE_CODE === "0" ||
    //     result.outBinds?.RESPONSE_CODE === "1"
    //   ) {
    //     return res.status(200).send([
    //       {
    //         RESPONSE_CODE: result.outBinds?.RESPONSE_CODE,
    //         RESPONSE_MESS: result.outBinds?.RESPONSE_MESS,
    //       },
    //     ]);
    //   } else {
    //     return res.status(200).send(result.outBinds?.RESPONSE_MESS);
    //   }
    // }

    // fetch account details
    if (fetch_data === "true") {
      const data = await con.execute(
        `SELECT REQUISITION_NO, ACCT_LINK , GET_ACCTDESC(ACCT_LINK) AS ACCOUNT_DESCRP, POSTED_BY FROM TB_SAFECUSTODY_RGT where APPROVAL_FLAG='Y' ${determinant}`
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
        return res.status(500).send(err);
      }
    }

    // fecth data for screen two
    if (fetch_data2 === "true") {
      const data = await con.execute(
        `SELECT a.*, get_acctdesc(a.acct_link) as account_descrp FROM TB_safecustody_RGT a where a.requisition_no = :requisition_no`,
        { requisition_no }
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
        return res.status(500).send(err);
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { SafeCustodyLiquidation };
