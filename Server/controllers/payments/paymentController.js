require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
const axios = require("axios");
var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");
// const multer = require("multer");
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;
var IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

const util = require("util");
const { exec } = require("child_process");
const { channel } = require("diagnostics_channel");


// RTGS Origination
exports.RTGSOrigination = (req, res) => {
  const { } = req.body;
  async function RTGSOrigination() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      db.execute(
        ``, {

      },
        { autoCommit: true },
        function (err, result) {
          if (err) {
            console.error(err.message);
            return;
          }
          if (result) {
            if (result.rowsAffected > 0) {
              res.send('Successfully');
            }
          }
        }
      );
    }
    catch (err) {
      console.error(err.message);
    }
  }
  RTGSOrigination();
};


// Payer BBAN
exports.BBAN = (req, res) => {
  const { accountNumber } = req.body;
  async function PayerBBAN() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      var iso_code = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `select status_indicator,account_descrp,iso_code,c.description,GET_STATUSDESC(a.acct_link)
        from g_ledger a,tb_currency b, tb_product c
        where  a.acct_link = '${accountNumber}'
        and   date_account_closed is null
        and   level_identifier ='D'
        and a.currency_code = b.currency_code
        and a.prod_code = c.prod_code
        `
      );

      if (data.rows.length > 0) {
        iso_code = data.rows[0][2];
      } else {
        res.send("Invalid Account Number");
      }
      // iso_code = data.rows[0][2];
      const data2 = await execute(
        ` select nvl(rtgs_trans_lm,0)
        from tb_currency
        where iso_code = '${iso_code}'
        `
      );
      const data3 = await execute(
        `select av_bal, bookbal from vw_casa_ledger where acct_link = '${accountNumber}'
        `
      );
      if (data.rows) {
        const result = {
          [data.metaData[0].name]: data.rows[0][0],
          [data.metaData[1].name]: data.rows[0][1],
          [data.metaData[2].name]: data.rows[0][2],
          [data.metaData[3].name]: data.rows[0][3],
          availableBalance: data3.rows[0][0].trim(),
          bookBalance: data3.rows[0][1].trim(),
          status_description: data.rows[0][4],
          rtgs_trans_limit: data2.rows[0][0],
        };
        res.send(result);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
    }
  }
  PayerBBAN();
};
// Receiving Bank LOVs
exports.Banks = (req, res) => {
  const { ottCurrency } = req.body;
  async function ReceivingBank() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      var response = [];
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT distinct get_achCOUNTRY COUNTRY, GET_BANKDESC(get_swiftbankcode(ALTERNATE_BIC,CURRENCY_CODE)) label,
        ALTERNATE_BIC value,'' CITY,NOSTRO_AC CLEARING_SUSPENSE,get_swiftbankcode(ALTERNATE_BIC,CURRENCY_CODE) BANKS,
        VOSTRO SHORT_DESCRP
        FROM TB_BANKS_ACCT
        WHERE ALTERNATE_BIC != GET_SWIFTCODE
        AND get_swiftbankcode(ALTERNATE_BIC,CURRENCY_CODE)  IS NOT NULL
        and currency_code = get_iso_currcode('${ottCurrency}')
        `
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          const row = data.rows[i];
          const bankdesc = row[1];
          const value = row[2];
          const label = `${value} - ${bankdesc}`;
          const country = row[0];
          const city = row[3];
          const clearingSuspense = row[4];
          const bankCode = row[5];
          const shortDescription = row[6];
          const entry = { label, value, country, city, clearingSuspense, bankCode, shortDescription };
          response.push(entry);
        }
        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
    }
  }
  ReceivingBank();
};


// Sender's Corre A/C53a LoVs
exports.CorreAC53a = (req, res) => {
  async function CorreAC53a() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      var response = [];
      var arr0 = [];
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT COUNTRY, BANK_desc,BICode,CITY
          FROM tb_BIC  WHERE SUBSTR(BICODE,5,2)='SL' 
          `
      );
      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          // console.log(data.rows.length)
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

        res.send(response);
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    } finally {
    }
  }
  CorreAC53a();
};
// Account With Inst. 57a LoVs
exports.Inst57a = (req, res) => {
  async function Inst57a() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      var response = [];
      var arr0 = [];
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT BIC_CODE || ' - ' || DESCRIPTION as label ,
            SHORT_DESCRP as value
            FROM CLEARING_TOTALS_ACCT,CODE_DESC
              WHERE CODE_TYPE='BNC'
              AND ACTUAL_CODE = BANKS
              AND BIC_CODE != GET_SWIFTCODE`
      );
      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          // console.log(data.rows.length)
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

        res.send(response);
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    } finally {
    }
  }
  Inst57a();
};

//  Get Account Description
exports.getAccountName = (req, res) => {
  const { accountNumber } = req.body;
  var response = []
  async function getAccName() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      // node native promisify
      //   const execute = util.promisify(db.execute).bind(db);
      const data = await db.execute(
        `SELECT get_acctdescrp(:ACCT_LINK_V) FROM dual
        `,
        {
          ACCT_LINK_V: accountNumber
        },
        function (err, result) {
          if (err) {
            throw err;
          }
          if (result) {
            if (result.rows[0][0] != null) {
              var account_description = result.rows[0][0];
              res.send(account_description);
            }
            if (result.rows[0][0] === null) {
              res.send("")
            }
            else {
              res.send("Invalid Account Number");
            }
          }
        }
      );
    } catch (err) {
      console.log(err)
    }
  }
  getAccName();
}

//  Get TAX For FD Creation Entry 
exports.Tax = (req, res) => {
  const { productCode, currencyCode, dealAmount, interestVariance, tenor } = req.body;
  async function Tax() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `select distinct state_tax, state_tax_acc, max_bal, min_bal,account_descrp
        from tax_type_acct a, g_ledger b
        where a.prod_code =	'${productCode}'
        and a.currency = '${currencyCode}'
        and acct_link = a.state_tax_acc`
      );
      if (data.rows.length > 0) {
        max_bal = data.rows[0][2]
        min_bal = data.rows[0][3]
      } else {
        res.send("Invalid Produce or Currency Code")
      }

      const data1 = await execute(
        `SELECT GET_INTBASE_NEW('${currencyCode}','${productCode}') FROM DUAL`
      );
      if (data1.rows.length > 0) {
        int_base = data1.rows[0][0];
      } else {
        res.send("Invalid Produce or Currency Code")
      }
      const data2 = await execute(
        `SELECT round((${dealAmount} * (${tenor}/${int_base}) * (${interestVariance}/100)),2) FROM DUAL`
      );
      if (data2.rows.length > 0) {
        int_amount = data2.rows[0][0];
      } else {
        res.send("Invalid tenor")
      }


      const data3 = await execute(
        ` select state_tax, state_tax_acc, round((state_tax/100)*'${int_amount}',2)
        from tax_type_acct
        where currency = '${currencyCode}'
        and prod_code = '${productCode}'
        and '${int_amount}'  between  '${min_bal}' and '${max_bal}' `
      );
      if (data.rows) {
        const result = {
          [data.metaData[0].name]: data.rows[0][0],
          INT_BASE: data1.rows[0][0],
          INT_AMOUNT: data2.rows[0][0],
          TAX_AMT: data3.rows[0][2],
          [data.metaData[1].name]: data.rows[0][1],
          [data.metaData[4].name]: data.rows[0][4],
        };
        res.send(result);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
    }
  }
  Tax();
}
// RTGS Reservation(202)

// Select Branch LoVs
exports.BanksBranch = (req, res) => {
  async function BanksBranch() {
    try {

      var response = [];
      var arr0 = [];
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT BR_CODE, BR_DESCRIPTION FROM TB_BRANCH WHERE FLAG_STATUS='A' `
      );
      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          // console.log(data.rows.length)
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

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } catch (err) {
      console.log(err)
    }
  }
  BanksBranch();
}

// Tenor for FD Entry
exports.Tenor = (req, res) => {
  const { productCode, currencyCode } = req.body;
  async function Tenor() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      var pc = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT TB_PRODUCT.PROD_CODE,TB_PRODUCT.DESCRIPTION, TB_PRODUCT.PROD_GROUP, TB_PRODUCT.PROD_SGROUP
        FROM TB_PRODUCT WHERE TB_PRODUCT.PROD_CODE='${productCode}' AND APP_FLAG='Y' 
        AND TB_PRODUCT.PROD_GROUP='3'
        `
      );
      if (data.rows.length > 0) {
        pc = data.rows[0][3];
      } else {
        res.send("Invalid Product Code")
      }
      const data1 = await execute(
        `select distinct interest_account_type,default_tenor_days
        from treasury_controls
        where type_of_acct = '3'
        and currency_code = '${currencyCode}'
        and  legal_form = '${pc}'
        and treasury_code_type = 'FD'  
        `
      );
      if (data.rows) {
        const result = {
          [data1.metaData[0].name]: data1.rows[0][0],
          [data1.metaData[1].name]: data1.rows[0][1],
        };
        res.send(result);
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    } finally {
    }
  }
  Tenor();
};
// OTT Reservation(202)
// Ordering Institution52a
// OTT Origination



// Central Approval Procedure 
exports.CentralApp = (req, res) => {
  const {
    fromCode,
    itemCode,
    flag,
    postingDate,
    accountNumber,
    branchCode,
    currency,
    amount,
    postedBy,
    batchNumber,
    otherInfo,
    documentReference,
    narration,
    channelSource,
    module,
    approvedBy,
    approvedDate,
    approvedTerminal,
    accountName,
    para2,
    para3
  } = req.body;
  async function CentralApp() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      const data = await db.execute(
        "BEGIN prc_central_app(:from_CODE_v, :ITEM_CODE_v, :FLAG_v, :POSTING_DATE_v, :ACCT_LINK_v, :BRANCH_CODE_v, :CURRENCY_v, :AMOUNT_v, :POSTED_BY_v, :BATCH_NO_v, :OTHER_INFO_v, :DOCUMENT_REF_v, :NARRATION_v, :CHANNEL_SRC_v, :MODULEE_v, :APP_BY_v, app_date_v, :app_term_v, :acct_name_v, :para2, :para3); END;",
        {
          from_CODE_v: fromCode,
          ITEM_CODE_v: itemCode,
          FLAG_v: flag,
          POSTING_DATE_v: postingDate,
          ACCT_LINK_v: accountNumber,
          BRANCH_CODE_v: branchCode,
          CURRENCY_v: currency,
          AMOUNT_v: amount,
          POSTED_BY_v: postedBy,
          BATCH_NO_v: batchNumber,
          OTHER_INFO_v: otherInfo,
          DOCUMENT_REF_v: documentReference,
          NARRATION_v: narration,
          CHANNEL_SRC_v: channelSource,
          MODULEE_v: module,
          APP_BY_v: approvedBy,
          app_date_v: approvedDate,
          app_term_v: approvedTerminal,
          acct_name_v: accountName,
          para2: para2,
          para3: para3,
        },
        function (err, result) {
          if (err) {
            throw err;
          }
          if (result) {
            res.send(result);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  CentralApp();
};


// Fees Transaction Procedure 
exports.FeesTransaction = (req, res) => {

  const {
    debitAccount,
    transCode,
    transAmount,
    // currency,
    productCode,
    batchNumber,
    postedBy,
    approvedBy,
    terminal,
    documentReference,
    scanDocumentReference,
    // ownerBranch,
    creditBranch,
    debitBranch,
    employeeCode,
    unitCode,
    departmentCode,
    channel,
    rate,
    principalCur,
    appFlag,
    destination,
    formCode,
    para1,
    para2,
    para3,
    para4,
    para5
  } = req.body;
  async function FeesTransaction() {
    // const dates = new Date();
    // const month = dates.getMonth() + 1; // getMonth() returns a zero-indexed value, so add 1 to get the actual month number
    // const day = dates.getDate();
    // const year = dates.getFullYear();
    // const hours = dates.getHours();
    // const minutes = dates.getMinutes();
    // const seconds = dates.getSeconds();
    // const ampm = hours >= 12 ? "PM" : "AM";
    // //format the date and time string
    // const formattedDate = `${month}/${day}/${year} ${
    //   hours % 12
    // }:${minutes}:${seconds} ${ampm}`;

    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      const data = db.execute(
        `BEGIN Prc_fees_transaction(:db_account_v, :trans_code_v, :trans_amount, GET_ACCTCURRCODE('${debitAccount}'), :prod_code_v, :batch_no_v, :posted_by_v, :app_by, :response, :total_charges, :terminal, :doc_ref_v, :scan_doc_reff, get_acctbra('${debitAccount}'), :cbranch, :dbranch, :ecode, :ucode, :dcode, :channel_v, :rate_v, :pcur, :app_flag, :destiC, :form_code, :para1, :para2, :para3, :para4, :para5); END;`,
        {
          db_account_v: debitAccount,
          trans_code_v: transCode,
          trans_amount: transAmount,
          //currency_v: currency,
          prod_code_v: productCode,
          batch_no_v: batchNumber,
          posted_by_v: postedBy,
          app_by: approvedBy,
          terminal: terminal,
          doc_ref_v: documentReference,
          scan_doc_reff: scanDocumentReference,
          //pbranch: ownerBranch,
          cbranch: creditBranch,
          dbranch: debitBranch,
          ecode: employeeCode,
          ucode: unitCode,
          dcode: departmentCode,
          channel_v: channel,
          rate_v: rate,
          pcur: principalCur,
          app_flag: appFlag,
          destiC: destination,
          form_code: formCode,
          para1: para1,
          para2: para2,
          para3: para3,
          para4: para4,
          para5: para5,
          response: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
          total_charges: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT,
          },
        },
        function (err, result) {
          if (err) {
            throw err;
          }
          if (result) {
            if (result['outBinds'] != null) {
              res.send(result['outBinds'])
            }
            else {
              res.send(result)
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  FeesTransaction();
};

// FD Entry Creation 
exports.FDEC = (req, res) => {
  const {
    TREASURY_CODE_TYPE, QUOTATION_NO, TYPE_OF_ACCT, PRODUCT_CODE, CURRENCY_CODE, LEGAL_FORM, DEAL_AMOUNT, DEAL_AMOUNT_SIGN,
    TENOR, CUSTOMER_NUMBER, DATE_OPENED, EFFECTIVE_DATE, MATURITY_DATE, INTEREST_RATE_TYPE,
    INTEREST_RATE, CUSTOMER_RATE, INTEREST_VARIANCE, BONUS, BONUS_INTEREST, TAX_RATE,
    ROLLOVER, CAPITALISE, PREVAILING_RATE, TAX_AMOUNT, NET_INTEREST, total_interest, INTEREST_BASE, RATE_CODE,
    STATUS, POSTING_SYS_TIME, POSTING_SYS_DATE, POSTING_DATE, POSTED_BY, POSTING_TERMINAL, BRANCH_CODE,
    PRINCIPAL_CONTRA, SOURCE_ACCOUNT, INTEREST_ACCOUNT, LIQUIDATION_ACCOUNT, BENEFICIARY,
    TRADER, PORTFOLIO, DEAL_SOURCE, FIXED_INTEREST_RATE, bank_officer_resp_name, CUSTOMER_CODE,
    INTEREST_POSTING_FREQ, NEXT_INTEREST_DATE, SCHD_TYPE, sector, current_balance, tax_contra,
    method_of_settlement, CHANNEL, POSTING_IP
  } = req.body;
  async function FDEC() {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      db.execute(
        `INSERT INTO TREASURY_QUOTATION(
			  TREASURY_CODE_TYPE, QUOTATION_NO, TYPE_OF_ACCT,PRODUCT_CODE, CURRENCY_CODE, LEGAL_FORM,DEAL_AMOUNT,DEAL_AMOUNT_SIGN, 
			  TENOR, CUSTOMER_NUMBER, DATE_OPENED, EFFECTIVE_DATE, MATURITY_DATE,INTEREST_RATE_TYPE,
        INTEREST_RATE,CUSTOMER_RATE,INTEREST_VARIANCE,BONUS,BONUS_INTEREST,TAX_RATE,
        ROLLOVER, CAPITALISE, PREVAILING_RATE, TAX_AMOUNT,NET_INTEREST,total_interest,INTEREST_BASE,RATE_CODE,
			  STATUS,POSTING_SYS_TIME,POSTING_SYS_DATE,POSTING_DATE,POSTED_BY,POSTING_TERMINAL,BRANCH_CODE,			  
			  PRINCIPAL_CONTRA,SOURCE_ACCOUNT, INTEREST_ACCOUNT,LIQUIDATION_ACCOUNT,BENEFICIARY,
			  TRADER,PORTFOLIO,DEAL_SOURCE,FIXED_INTEREST_RATE,bank_officer_resp_name,CUSTOMER_CODE,
			  INTEREST_POSTING_FREQ,NEXT_INTEREST_DATE,SCHD_TYPE,sector,current_balance,tax_contra,
			  method_of_settlement,CHANNEL,POSTING_IP)
        VALUES(
          :TREASURY_CODE_TYPE,:QUOTATION_NO,:TYPE_OF_ACCT,:PRODUCT_CODE,:CURRENCY_CODE,:LEGAL_FORM,:DEAL_AMOUNT,:DEAL_AMOUNT_SIGN,
          :TENOR, :CUSTOMER_NUMBER, :DATE_OPENED, :EFFECTIVE_DATE,:MATURITY_DATE,:INTEREST_RATE_TYPE,
          :INTEREST_RATE, :CUSTOMER_RATE, :INTEREST_VARIANCE,:BONUS,:BONUS_INTEREST,:TAX_RATE,
          nvl('${ROLLOVER}','N'),nvl('${CAPITALISE}','N'), :PREVAILING_RATE, :TAX_AMOUNT, :NET_INTEREST, :total_interest, :INTEREST_BASE,'FIXED',
          :STATUS,:POSTING_SYS_TIME,:POSTING_SYS_DATE,:POSTING_DATE,:POSTED_BY,:POSTING_TERMINAL,:BRANCH_CODE,
          :PRINCIPAL_CONTRA,:SOURCE_ACCOUNT, :INTEREST_ACCOUNT,:LIQUIDATION_ACCOUNT,:BENEFICIARY,
          arm,'BRA','BRA',:FIXED_INTEREST_RATE, arm, :CUSTOMER_CODE, :INTEREST_POSTING_FREQ, :NEXT_INTEREST_DATE, :SCHD_TYPE, :sector,:current_balance,:tax_contra,
          :method_of_settlement,:CHANNEL,:POSTING_IP)
        `, {

        TREASURY_CODE_TYPE: TREASURY_CODE_TYPE,
        QUOTATION_NO: QUOTATION_NO,
        TYPE_OF_ACCT: TYPE_OF_ACCT,
        PRODUCT_CODE: PRODUCT_CODE,
        CURRENCY_CODE: CURRENCY_CODE,
        LEGAL_FORM: LEGAL_FORM,
        DEAL_AMOUNT: DEAL_AMOUNT,
        DEAL_AMOUNT_SIGN: DEAL_AMOUNT_SIGN,
        TENOR: TENOR,
        CUSTOMER_NUMBER: CUSTOMER_NUMBER,
        DATE_OPENED: DATE_OPENED,
        EFFECTIVE_DATE: EFFECTIVE_DATE,
        MATURITY_DATE: MATURITY_DATE,
        INTEREST_RATE_TYPE: INTEREST_RATE_TYPE,
        INTEREST_RATE: INTEREST_RATE,
        CUSTOMER_RATE: CUSTOMER_RATE,
        INTEREST_VARIANCE: INTEREST_VARIANCE,
        BONUS: BONUS,
        BONUS_INTEREST: BONUS_INTEREST,
        TAX_RATE: TAX_RATE,
        PREVAILING_RATE: PREVAILING_RATE,
        TAX_AMOUNT: TAX_AMOUNT,
        NET_INTEREST: NET_INTEREST,
        total_interest: total_interest,
        INTEREST_BASE: INTEREST_BASE,
        STATUS: STATUS,
        POSTING_SYS_TIME: POSTING_SYS_TIME,
        POSTING_SYS_DATE: POSTING_SYS_DATE,
        POSTING_DATE: POSTING_DATE,
        POSTED_BY: POSTED_BY,
        POSTING_TERMINAL: POSTING_TERMINAL,
        BRANCH_CODE: BRANCH_CODE,
        PRINCIPAL_CONTRA: PRINCIPAL_CONTRA,
        SOURCE_ACCOUNT: SOURCE_ACCOUNT,
        INTEREST_ACCOUNT: INTEREST_ACCOUNT,
        LIQUIDATION_ACCOUNT: LIQUIDATION_ACCOUNT,
        BENEFICIARY: BENEFICIARY,
        FIXED_INTEREST_RATE: FIXED_INTEREST_RATE,
        CUSTOMER_CODE: CUSTOMER_CODE,
        INTEREST_POSTING_FREQ: INTEREST_POSTING_FREQ,
        NEXT_INTEREST_DATE: NEXT_INTEREST_DATE,
        SCHD_TYPE: SCHD_TYPE,
        sector: sector,
        current_balance: current_balance,
        tax_contra: tax_contra,
        method_of_settlement: method_of_settlement,
        CHANNEL: CHANNEL,
        POSTING_IP: POSTING_IP,
      },
        { autoCommit: true },
        function (err, result) {
          if (err) {
            console.error(err.message);
            return;
          }
          if (result) {
            if (result.rowsAffected > 0) {
              res.send('Successfully');
            }
          }
        }

      )
    }
    catch (err) {
      console.error(err.message);
    }
  }
  FDEC();
};


// Deal No 
exports.DealNumber = async (req, res) => {
  const { dealNumber } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    const execute = util.promisify(db.execute).bind(db);

    const data = await execute(`
      SELECT app_flag
      FROM treas_advice
      WHERE deal_no = '${dealNumber}'
    `);

    if (data.rows.length === 0) {
      res.send('Invalid Deal Number, try again');
      return;
    }

    const appFlag = data.rows[0][0];

    if (appFlag === 'P' || appFlag === 'A') {
      res.send('This Deal Advice has been posted already, please check.');
      return;
    }

    if (appFlag === 'N') {
      res.send('This Deal Advice has not been approved by treasury, please check.');
      return;
    }

    if (appFlag === 'R') {
      res.send('This Deal Advice has been rejected by treasury, please check.');
      return;
    }

    const flag = await execute(`
      SELECT DB_ACCT, Agd_Rate, CR_AMT
      FROM Treas_Advice
      WHERE deal_no = '${dealNumber}'
      AND app_flag = 'Y'
    `);

    if (flag.rows.length === 0) {
      res.send('Invalid Deal Number, try again.');
      return;
    }

    const accountNumber = flag.rows[0][0];

    const data1 = await execute(`
      SELECT status_indicator, account_descrp, iso_code, c.description, GET_STATUSDESC(a.acct_link)
      FROM g_ledger a, tb_currency b, tb_product c
      WHERE a.acct_link = '${accountNumber}'
      AND date_account_closed IS NULL
      AND level_identifier = 'D'
      AND a.currency_code = b.currency_code
      AND a.prod_code = c.prod_code
    `);

    if (data1.rows.length === 0) {
      res.send('Invalid Account Number');
      return;
    }

    const iso_code = data1.rows[0][2];

    const data2 = await execute(`
      SELECT NVL(rtgs_trans_lm, 0)
      FROM tb_currency
      WHERE iso_code = '${iso_code}'
    `);

    const data3 = await execute(`
      SELECT av_bal, bookbal
      FROM vw_casa_ledger
      WHERE acct_link = '${accountNumber}'
    `);

    const result = {
      customerRate: flag.rows[0][1],
      amount: flag.rows[0][2],
      [data1.metaData[0].name]: data1.rows[0][0],
      [data1.metaData[1].name]: data1.rows[0][1],
      [data1.metaData[2].name]: data1.rows[0][2],
      [data1.metaData[3].name]: data1.rows[0][3],
      availableBalance: data3.rows[0][0].trim(),
      bookBalance: data3.rows[0][1].trim(),
      status_description: data1.rows[0][4],
      rtgs_trans_limit: data2.rows[0][0],
    };

    res.send(result);

  } catch (error) {
    console.error(error.message);
    res.send('Something went wrong. Please try again.');
  }
};


// Next Interest Date 
exports.NextIntDate = async (req, res) => {
  const { effectiveDate, frequency, tenor } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    const execute = util.promisify(db.execute).bind(db);
    const data = await execute(
      `SELECT DESCRIPTION,SHORT_DESCRP,CLASS_CODE 
      FROM code_desc
      WHERE CODE_TYPE = 'PRD' AND ACTUAL_CODE ='${frequency}' `
    );
    if (data.rows.length === 0) {
      res.send('Nothing was returned');
    }
    days = data.rows[0][1];
    const nxtd = await execute(
      `SELECT to_date('${effectiveDate}', 'yyyy-mm-dd') + ${days} Tomorrow FROM DUAL`
    );
    const mxtdate = await execute(
      `select to_date('${effectiveDate}', 'yyyy-mm-dd') + nvl('${tenor}',0) FROM dual`
    );
    if (data.rows) {
      const result = {
        nextInterestDate: nxtd.rows[0][0],
        maturityDate: mxtdate.rows[0][0],
      }
      res.send(result)
    } else {
      return "Something went wrong... Nothing was returned!!";
    }

  } catch (error) {
    console.log(error)
  }
};
// sender institution
exports.SenderInstitution = async (req, res) => {
  const { currencyCode } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    const data = await db.execute(`SELECT get_swiftcode FROM dual`);

    if (data.rows != null) {
      const CD = await db.execute(`SELECT DISTINCT CITY, BANK_desc
                                    FROM tb_BIC 
                                    WHERE BICode = get_swiftcode`);
      const Corre = await db.execute(`SELECT get_clearcode(GET_ISO_CURRCODE('${currencyCode}')) FROM dual`);
      if (Corre.rows != null) {
        const result = {
          SenderInstitution: [data.rows[0][0] + ' - ' + CD.rows[0][1]],
          SenderCorre53a: Corre.rows[0][0],
        };
        res.send(result);
      } else {
        res.send('An error occurred');
      }
    } else {
      res.send('No value was returned');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

exports.ReceiverInstitution = async (req, res) => {
  const { bicCode } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    const data = await db.execute(`SELECT distinct CITY, BANK_desc
      FROM tb_BIC 
      where BICode='${bicCode}'`);
    if (data.rows != null) {
      const result = {
        ReceiverInstitution: [bicCode, data.rows[0][0], data.rows[0][1]].join('-')
      };
      res.send(result);
    } else {
      res.send('Invalid biCode')
    }
  } catch (error) { console.log(error) }
}


// FD Entry New
exports.FDN = async (req, res) => {
  const { ROLLOVER,
    CAPITALISE,
    QUOTATION_NO,
    TYPE_OF_ACCT,
    PRODUCT_CODE,
    CURRENCY_CODE,
    LEGAL_FORM,
    DEAL_AMOUNT,
    TENOR,
    CUSTOMER_NUMBER,
    DATE_OPENED,
    EFFECTIVE_DATE,
    MATURITY_DATE,
    INTEREST_RATE,
    CUSTOMER_RATE,
    INTEREST_VARIANCE,
    BONUS,
    BONUS_INTEREST,
    TAX_RATE,
    PREVAILING_RATE,
    TAX_AMOUNT,
    NET_INTEREST,
    total_interest,
    INTEREST_BASE,
    STATUS,
    POSTING_DATE,
    POSTED_BY,
    POSTING_TERMINAL,
    BRANCH_CODE,
    PRINCIPAL_CONTRA,
    SOURCE_ACCOUNT,
    INTEREST_ACCOUNT,
    LIQUIDATION_ACCOUNT,
    BENEFICIARY,
    FIXED_INTEREST_RATE,
    CUSTOMER_CODE,
    INTEREST_POSTING_FREQ,
    NEXT_INTEREST_DATE,
    SCHD_TYPE,
    sector,
    current_balance,
    tax_contra,
    method_of_settlement,
    CHANNEL,
    POSTING_IP,
    interestFrequency,
    DOCUMENT_REF,
    hostname
  } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    db.execute(`INSERT INTO TREASURY_QUOTATION(
      TREASURY_CODE_TYPE, QUOTATION_NO, TYPE_OF_ACCT,PRODUCT_CODE, CURRENCY_CODE, LEGAL_FORM,DEAL_AMOUNT,DEAL_AMOUNT_SIGN, 
      TENOR, CUSTOMER_NUMBER, DATE_OPENED, EFFECTIVE_DATE, MATURITY_DATE,INTEREST_RATE_TYPE,
      INTEREST_RATE,CUSTOMER_RATE,INTEREST_VARIANCE,BONUS,BONUS_INTEREST,TAX_RATE,
      ROLLOVER, CAPITALISE, PREVAILING_RATE, TAX_AMOUNT,NET_INTEREST,total_interest,INTEREST_BASE,RATE_CODE,
      STATUS,POSTING_SYS_TIME,POSTING_SYS_DATE,POSTING_DATE,POSTED_BY,POSTING_TERMINAL,BRANCH_CODE,			  
      PRINCIPAL_CONTRA,SOURCE_ACCOUNT, INTEREST_ACCOUNT,LIQUIDATION_ACCOUNT,BENEFICIARY,
      TRADER,PORTFOLIO,DEAL_SOURCE,FIXED_INTEREST_RATE,bank_officer_resp_name,CUSTOMER_CODE,
      INTEREST_POSTING_FREQ,NEXT_INTEREST_DATE,SCHD_TYPE,sector,current_balance,tax_contra,
      method_of_settlement,CHANNEL,POSTING_IP)
      VALUES(
        'FD',:QUOTATION_NO,:TYPE_OF_ACCT,:PRODUCT_CODE,:CURRENCY_CODE,:LEGAL_FORM,:DEAL_AMOUNT,'P,
        :TENOR, :CUSTOMER_NUMBER, :DATE_OPENED, :EFFECTIVE_DATE,:MATURITY_DATE,'F',
        :INTEREST_RATE, :CUSTOMER_RATE, :INTEREST_VARIANCE,:BONUS,:BONUS_INTEREST,:TAX_RATE,
        nvl('${ROLLOVER}','N'),nvl('${CAPITALISE}','N'), :PREVAILING_RATE, :TAX_AMOUNT, :NET_INTEREST, :total_interest, :INTEREST_BASE,'FIXED',
        :STATUS,to_char(sysdate,'HH24:MI:SS'),sysdate,:POSTING_DATE,:POSTED_BY,:POSTING_TERMINAL,:BRANCH_CODE,
        :PRINCIPAL_CONTRA,:SOURCE_ACCOUNT, :INTEREST_ACCOUNT,:LIQUIDATION_ACCOUNT,:BENEFICIARY,
        arm,'BRA','BRA',:FIXED_INTEREST_RATE, arm, :CUSTOMER_CODE, :INTEREST_POSTING_FREQ, :NEXT_INTEREST_DATE, :SCHD_TYPE, :sector,:current_balance,:tax_contra,
        :method_of_settlement,:CHANNEL,:POSTING_IP)
      `, {
      QUOTATION_NO: QUOTATION_NO,
      TYPE_OF_ACCT: TYPE_OF_ACCT,
      PRODUCT_CODE: PRODUCT_CODE,
      CURRENCY_CODE: CURRENCY_CODE,
      LEGAL_FORM: LEGAL_FORM,
      DEAL_AMOUNT: DEAL_AMOUNT,
      TENOR: TENOR,
      CUSTOMER_NUMBER: CUSTOMER_NUMBER,
      DATE_OPENED: DATE_OPENED,
      EFFECTIVE_DATE: EFFECTIVE_DATE,
      MATURITY_DATE: MATURITY_DATE,
      INTEREST_RATE: INTEREST_RATE,
      CUSTOMER_RATE: CUSTOMER_RATE,
      INTEREST_VARIANCE: INTEREST_VARIANCE,
      BONUS: BONUS,
      BONUS_INTEREST: BONUS_INTEREST,
      TAX_RATE: TAX_RATE,
      PREVAILING_RATE: PREVAILING_RATE,
      TAX_AMOUNT: TAX_AMOUNT,
      NET_INTEREST: NET_INTEREST,
      total_interest: total_interest,
      INTEREST_BASE: INTEREST_BASE,
      STATUS: STATUS,
      POSTING_DATE: POSTING_DATE,
      POSTED_BY: POSTED_BY,
      POSTING_TERMINAL: POSTING_TERMINAL,
      BRANCH_CODE: BRANCH_CODE,
      PRINCIPAL_CONTRA: PRINCIPAL_CONTRA,
      SOURCE_ACCOUNT: SOURCE_ACCOUNT,
      INTEREST_ACCOUNT: INTEREST_ACCOUNT,
      LIQUIDATION_ACCOUNT: LIQUIDATION_ACCOUNT,
      BENEFICIARY: BENEFICIARY,
      FIXED_INTEREST_RATE: FIXED_INTEREST_RATE,
      CUSTOMER_CODE: CUSTOMER_CODE,
      INTEREST_POSTING_FREQ: INTEREST_POSTING_FREQ,
      NEXT_INTEREST_DATE: NEXT_INTEREST_DATE,
      SCHD_TYPE: SCHD_TYPE,
      sector: sector,
      current_balance: current_balance,
      tax_contra: tax_contra,
      method_of_settlement: method_of_settlement,
      CHANNEL: CHANNEL,
      POSTING_IP: POSTING_IP
    },
      { autoCommit: true },
      function (error, result) {
        if (error) {
          console.error(error.message);
        }
        if (result) {
          if (result.rowsAffected > 0) {
            //   const codes = db.execute(`
            //   SELECT
            // 'FTD PURCHASE @ '||'${INTEREST_VARIANCE}'||'% P.A FOR '||'${TENOR}'||' DAYS' ,b.actual_code,
            // b.voucher_number, a.sys_code
            //   FROM CODE_DESC b, SYSGEN_TRANSACTIONS a
            //      WHERE b.code_type = 'TR'
            //      AND A.ACTUAL_CODE = B.ACTUAL_CODE
            //      AND   b.actual_code = (SELECT actual_code FROM
            //   SYSGEN_TRANSACTIONS WHERE sys_code = 'CFD')
            //   `);
            //   if(codes.rows.length === 0){
            //     res.send('An error occurred')
            //   }
            //   const description_v = codes.rows[0][0];
            //   const  actual_code_v = codes.rows[0][1];
            //   const voucher_v = codes.rows[0][2];
            //   const trans_code = codes.rows[0][1];
            // const seq1 = db.execute(`SELECT seq1.NEXTVAL FROM DUAL`);
            // const acct_seq_v = seq1.rows[0][0];
            // const btno = db.execute(`SELECT GET_BATCHNO FROM DUAL`);

            if (interestFrequency != null) {
              const schedule_proc = db.execute(
                `BEGIN fd_int_schedule_proc(
                '${QUOTATION_NO}',  
                ${DEAL_AMOUNT}, 
                ${TENOR},   
                ${EFFECTIVE_DATE}, 
                '${interestFrequency}',  
                null, 
                '${POSTING_TERMINAL}',
                ${INTEREST_VARIANCE},
                :TYP,
                ${MATURITY_DATE},
                get_INTBASE_NEW('${CURRENCY_CODE}','${TYPE_OF_ACCT}') ); END;`,
                function (err, result) {
                  if (err) {
                    throw err;
                  }
                  if (result) {
                    if (result) {
                      res.send(result)
                    } else {

                    }
                  }
                }
              );
            }
            const prcapp = db.execute(
              `BEGIN prc_central_appp(null,'FDD',null,${POSTING_DATE},'${SOURCE_ACCOUNT}','${BRANCH_CODE},get_iso_currcode('${CURRENCY_CODE}'),${DEAL_AMOUNT},'${POSTING_TERMINAL}','${QUOTATION_NO}',null,'${DOCUMENT_REF}','FD REQUEST','BRA','TREAS','${POSTING_TERMINAL}',sysdate,'${hostname}',null,null,null); END;`,
              function (err, result) {
                if (err) {
                  throw err;
                }
                if (result) {
                  res.send(result);
                  // if(result){
                  //   res.send(result)
                  // }
                  // else{}
                }
              }
            )
            res.send('Record successfully saved')
          }
          else {
            res.send("An error occurred")
          }
        }
      }
    )

  } catch (error) {
    console.log(error)
  }
  FDN();
}