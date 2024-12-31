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

const LienCreation = async (req, res) => {
  const {
    okay_procedure,
    account_number,
    lien_type,
    amount,
    effective_date,
    expiry_date,
    next_review_date,
    comments,
    posted_by,
    global_branch_v,
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
      const result = await con.execute(
        `BEGIN cbxdmx.prc_lien_rqt(:account_number , :amount , :lien_type, :global_branch_v , :effective_date , :expiry_date, :next_review_date , :comments , :posted_by, :ip_address, :RESPONSE_CODE, :RESPONSE_MESS  ); END;`,
        {
          account_number,
          amount: parseFloat(amount),
          ip_address: { val: ip.address(), dir: oracledb.BIND_IN, type: oracledb.STRING },
          lien_type,
          global_branch_v,
          effective_date,
          expiry_date,
          next_review_date,
          comments,
          posted_by,
          RESPONSE_MESS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          RESPONSE_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      if (result?.outBinds) {
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
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { LienCreation };
