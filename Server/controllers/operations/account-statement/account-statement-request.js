const oracledb = require("oracledb");
oracledb.autoCommit = true;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const accountStatementReqFunc = async (req, res) => {
  const {
    fetch,
    account_number,
    get_pages,
    user_name,
    delete_row,
    procedureType,
    validation1,
    validation2,
    // validation3,
    db_account_v,
    trans_code_v,
    doc_ref_v,
    batch_no_v,
    posted_by_v,
    terminal,
    form_code,
    destiC,
    app_flag,
    dbranch,
    cbranch,
    lov,
    statement_type_v,
    state_type_v,
    bra_v,
    doc_no_v,
    start_date,
    end_date,
    no_of_pages,
    requested_by,
    posted_by,
    report,
    comment_v,
  } = req.body;
  let con;

  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });
    // const execute = util.promisify(db.execute).bind(db);

    // get  total charges
    if (procedureType === "handleSubmit") {
      console.log({
        procedureType,
        db_account_v,
        statement_type_v,
        state_type_v,
        doc_no_v,
        bra_v,
        start_date,
        end_date,
        no_of_pages: parseInt(no_of_pages),
        requested_by,
        posted_by,
        terminal,
      });

      const data = await con.execute(
        `BEGIN CBXDMX.prc_account_statment_rqt(:db_account_v,:statement_type_v,:state_type_v, :doc_no_v ,:bra_v,:start_date,:end_date,:no_of_pages,:requested_by,:posted_by,:msg_v,:msg_code,:req_no_v,:terminal,:comment_v); END;`,
        {
          db_account_v: db_account_v,
          statement_type_v: statement_type_v,
          state_type_v: state_type_v,
          doc_no_v: doc_no_v,
          bra_v: bra_v,
          start_date: start_date,
          end_date: end_date,
          no_of_pages: no_of_pages,
          requested_by: requested_by,
          posted_by: posted_by,
          msg_v: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          msg_code: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
          req_no_v: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          terminal: terminal,
          comment_v: comment_v,
        }
      );
      if (data) {
        return res.status(200).send([
          {
            msg_code: data.outBinds?.msg_code,
            msg_v: data.outBinds?.msg_v,
          },
        ]);
      } else {
        return res.send("nothing found");
        // }
      }
    }

    // get  total charges
    if (procedureType === "getTotalCharges") {
      const data = await con.execute(
        `BEGIN CBXDMX.Prc_fees_transaction(:db_account_v,:trans_code_v,:trans_amount, GET_ACCTCURRCODE(:db_account_v) ,:prod_code_v,:batch_no_v,:posted_by_v,:doc_ref_v,:response,:total_charges,:terminal,:req_no_v,:scan_doc_reff, get_acctbra(:db_account_v),:cbranch,:dbranch,:ecode,:ucode,:dcode,:channel_v,:rate_v,:pcur,:app_flag,:destiC,:form_code,:para1,:para2,:para3,:para4,:para5); END;`,
        {
          db_account_v: db_account_v,
          trans_code_v: trans_code_v,
          trans_amount: 0,
          prod_code_v: null,
          batch_no_v: batch_no_v,
          posted_by_v: posted_by_v,
          doc_ref_v: doc_ref_v,
          response: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          total_charges: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
          terminal: terminal,
          req_no_v: null,
          scan_doc_reff: null,
          //   pbranch: pbranch,
          // cbranch: null,
          cbranch: cbranch,
          dbranch: dbranch,
          ecode: null,
          ucode: null,
          dcode: null,
          channel_v: null,
          // channel_v: channel_v,
          rate_v: null,
          pcur: null,
          // app_flag: "Y",
          app_flag: app_flag,
          destiC: destiC,
          // destiC: null,
          form_code: form_code,
          para1: null,
          para2: null,
          para3: null,
          para4: null,
          para5: null,
        },
        function (err, result) {
          if (err) {
            throw err;
          }

          if (result) {
            if (result.outBinds.total_charges != null) {
              var mess = result.outBinds.response;
              var charges = result.outBinds.total_charges;

              response = {
                success: true,
                responseMessage: mess,
                totalCharges: charges,
              };

              return res.send(response);
            } else {
              var mess = result.outBinds.response;
              var charges = result.outBinds.total_charges;

              response = {
                success: true,
                responseMessage: mess,
                totalCharges: charges,
              };

              return res.send(response);
            }
          }
        }
      );
    }

    //  get balance brought forward
    if (procedureType === "balance brought forward") {
      const data = await con.execute(
        `BEGIN CBXDMX.prc_genstatment(:account_number, :start_date, :end_date, :posted_by, :balance, :msg_v ,:msg_code, NULL); END;`,
        {
          account_number: account_number,
          start_date: start_date,
          end_date: end_date,
          posted_by: posted_by,
          balance: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          msg_v: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          msg_code: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
        },
        function (err, result) {
          if (err) {
            throw err;
          }

          if (result) {
            return res.send(result.outBinds);
          } else {
            return res.send("nothing found");
            // }
          }
        }
      );
      return;
    }

    if (lov === "true") {
      const data = await con.execute(
        `select actual_code,description,short_descrp from code_desc
             where code_type='STT' and NVL(STATUS, 'Y')='Y'`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const value = data.rows[i][0];
          const label = data.rows[i][1];
          const short_descrp = data.rows[i][2];

          arr.push({
            label: `${value} - ${label} - ${short_descrp}`,
            value: value ? `${value}` : "",
          });
        }

        return res.send(arr);
      } else {
        return res.send("Something went wrong... Nothing was returned!!");
      }
    }

    if (fetch === "true") {
      const response1 = [];
      const response2 = [];
      const response3 = [];

      if (validation1 === "not valid") {
        const data = await con.execute(
          `SELECT COUNT(*) as menu_users FROM MENU_USERS WHERE SPECIAL='Y' AND USER_NAME= :user_name`,
          {
            user_name,
          }
        );
        if (data.rows) {
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response1.push(rowData); // Push the object to the response array
          }
        } else {
          response1.push([]);
        }
      }

      if (validation2 === "not valid") {
        const data = await con.execute(
          `SELECT COUNT(*) as tb_sp FROM TB_SP  WHERE ACCT_LINK=:account_number`,
          {
            account_number,
          }
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response2.push(rowData); // Push the object to the response array
          }
          // return res.send(response);
        } else {
          response2.push([]);
        }
      }

      if (response1[0]?.menu_users === 0 && response2[0]?.tb_sp === 0) {
        const data = await con.execute(
          `SELECT a.ACCOUNT_DESCRP,a.PROD_CODE, GET_PRODUCTDESC(a.PROD_CODE) PRODUCT_DESC, b.AV_BAL,a.CURRENCY_CODE, GET_CURRDESC(a.CURRENCY_CODE) CURRENCY_DESC, GET_ISO_CODE(a.CURRENCY_CODE) AS ISCO_CODE,a.DATE_OPENED,a.DATE_OF_LAST_ACTIVITY,
                  b.POST_BOOKBAL,b.BRDESC, a.SHADOW_BALANCE_TODAY,a.SHADOW_UNCLEARED
                  from G_LEDGER a  join VW_CASA_LEDGER b on a.acct_link = b.acct_link
                  WHERE A.ACCT_LINK= '${account_number}'
                  and a.type_of_acct not in (select distinct type_of_acct from treasury_controls union
                  select distinct type_of_acct from facility_controlss )`
        );
        if (data.rows) {
          // const response = [];
          for (let i = 0; i < data.rows.length; i++) {
            const rowData = {}; // Create an object for each row

            for (let x = 0; x < data.metaData.length; x++) {
              const columnName = data.metaData[x].name.toLowerCase();
              const columnValue = data.rows[i][x];
              rowData[columnName] = columnValue; // Assign each column to the object
            }

            response3.push(rowData); // Push the object to the response array
          }
          // return res.send(response);
        } else {
          response3.push([]);
        }
      }

      return res.send({
        mess1: response1,
        mess2: response2,
        mess3: response3,
      });
    }

    // fetch report data
    if (report === "true") {
      const data = await con.execute(
        `SELECT VOUCHER_DATE,VALUE_DATE, TRANSACTION_DETAILS,DOCUMENT_REF, LOCAL_EQUIVALENT_DB,LOCAL_EQUIVALENT_CR, BALANCE FROM
            VW_STATEMENTS_NEW WHERE ACCT_LINK ='${account_number}'  AND VOUCHER_DATE BETWEEN NVL('${start_date}','1-JAN-1900') AND 
            NVL('${end_date}','31-DEC-9999') ORDER BY TRANS_NO`
      );

      // }
      // VW_STATEMENTS_NEW WHERE ACCT_LINK ='${account_number}' ORDER BY TRANS_NO`
      // start_date 20-JAN-2018
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

    if (get_pages === "true") {
      const data = await con.execute(
        `select username, page_no FROM state_pages WHERE username = '${user_name}'`
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

    if (delete_row === "true") {
      const data = await con.execute(`delete FROM state_pages WHERE username = '${user_name}'`);
      if (data) {
        return res.status(200).send([]);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send({ error: "An error occurred" + err });
  }
};

module.exports = { accountStatementReqFunc };
