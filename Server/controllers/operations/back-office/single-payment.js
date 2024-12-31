const oracledb = require("oracledb");
oracledb.autoCommit = true;
const os = require("os");
const ip = require("ip");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
// const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;
// const bodyParser = require("body-parser");

const SinglePayment = async (req, res) => {
  const {
    okay_procedure,
    p_data_v,
    currency_code_v,
    batch_no_v,
    debit_total_v,
    credit_total_v,
    username_v,
    global_branch_v,
    form_code_v,
    global_prog_v,
    credit_bban_validation,
    credit_bban,
    debit_bban,
    debit_bban_validation,
    trans_type_v,
    trans_type_lov,
  } = req.body;
  let con;
  try {
    con = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    // procedure to submit
    if (okay_procedure === "true") {
      console.log({
        p_data_v,
        currency_code_v,
        batch_no_v,
        debit_total_v,
        credit_total_v,
        username_v,
        global_branch_v,
        form_code_v,
        hostname_v: os.hostname(),
        machine_ip_v: ip.address(),
        global_prog_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_single_payment(:p_data_v, :currency_code_v,:batch_no_v,
          :debit_total_v,:credit_total_v,GET_POSTINGDATE,
          :username_v,:global_branch_v,:machine_ip_v,:hostname_v,GET_SESSID,
          :form_code_v, :global_prog_v, 
          :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          p_data_v: JSON.stringify(p_data_v),
          currency_code_v,
          batch_no_v,
          debit_total_v: { val: debit_total_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          credit_total_v: { val: credit_total_v, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
          username_v,
          global_branch_v,
          form_code_v,
          hostname_v: { val: os.hostname(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          machine_ip_v: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          global_prog_v,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result.outBinds?.RESPONSE_CODE === "999" || result.outBinds?.RESPONSE_CODE === "000") {
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

    if (credit_bban_validation === "true") {
      console.log({
        credit_bban_validation,
        credit_bban,
        debit_bban,
        trans_type_v,
        currency_code_v,
      });
      const result = await con.execute(
        `BEGIN cbxdmx.prc_credit_bban_validate ( :credit_bban, :debit_bban, GET_POSTINGDATE, :trans_type_v, :currency_code_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          credit_bban,
          debit_bban,
          trans_type_v,
          currency_code_v,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result) {
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

    if (debit_bban_validation === "true") {
      const result = await con.execute(
        `BEGIN cbxdmx.prc_debit_bban_validate( :debit_bban , :credit_bban, GET_POSTINGDATE, :trans_type_v, :currency_code_v, :RESPONSE_CODE, :RESPONSE_MESS); END;`,
        {
          credit_bban,
          debit_bban,
          trans_type_v,
          currency_code_v,
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result) {
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

    // get trans type
    if (trans_type_lov === "true") {
      const data = await con.execute(
        `select CODE_DESC DESCRIPTION,   A.SYS_CODE ACTUAL_CODE , A.SYS_CODE
          from   code_desc b, sysgen_transactions a
          where   b.code_type = 'TR' and NVL(b.STATUS, 'Y') in ('Y','U')
          and    a.actual_code = b.actual_code
          AND A.SYS_CODE in (SELECT tr_code FROM batch_transcode)
          order by CODE_DESC `
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const label = data.rows[i][0];
          const value = data.rows[i][1];

          arr.push({
            label: `${value} - ${label}`,
            value: value ? `${value}` : "",
          });
        }

        return res.status(200).send(arr);
      } else {
        return res.status(500).send("Something went wrong... Nothing was returned!!");
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { SinglePayment };
