require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
const axios = require("axios");
var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");
// const multer = require("multer");
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

const util = require("util");
const { exec } = require("child_process");
const { channel } = require("diagnostics_channel");
const { transcode } = require("buffer");


// Call Account Entry

// customer number
exports.CUSTNUM = async (req, res) => {
  const { customerNumber } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    data = await db.execute(`select CUSTOMER_NAME,a.arm_code,arm_name
      FROM CUSTOMER a , tbl_arm b
      where A.customer_number = '${customerNumber}' 
      and APPROVAL_FLAG = 'Y'AND a.SUB_SEGMENT IS NOT NULL
      and a.SUB_SEGMENT = b.arm_code`);
    console.log(data)
    if (data.rows) {
      const result = {
        customerName: data.rows[0][0],
        label: data.rows[0][1] + " - " + data.rows[0][2],
        value: data.rows[0][1]
      }
      res.send(result);
    } else {
      return "Something went wrong... Nothing was returned!!";
    }

  } catch (error) {
    throw error;
  }
}


// Ben number
exports.BENNUM = async (req, res) => {
  const { BenNumber } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`select CUSTOMER_NAME 
    from customer
    where customer_number = '${BenNumber}'`);
    if (data.rows) {

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

  } catch (error) {
    throw error;
  }
}

//   Source Account LOVs
exports.srcAccountLovs = async (req, res) => {
  const { customerNumber } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`SELECT ALL G_LEDGER.ACCT_LINK as label, G_LEDGER.ACCOUNT_DESCRP as value
    From G_Ledger
    Where  customer_number = '${customerNumber}'
    and status_indicator not in ('BO','CLOS','DR')`);
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
  } catch (error) {
    throw error;
  }
}

// Interest Account
exports.InterestAccount = async (req, res) => {
  const { interestAccount } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(` select distinct rtrim(ACCOUNT_NUMBER),ACCOUNT_DESCRP
      from VW_CASA_LEDGER
      where acct_link =  '${interestAccount}'
     
     and status_indicator not in ('DO','BO','DR')`);
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

  } catch (error) {
    throw error;
  }

}

// Liquidation Account
exports.LiquidationAccount = async (req, res) => {
  const { liquidationAccount } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(` select distinct rtrim(ACCOUNT_NUMBER),ACCOUNT_DESCRP
      from VW_CASA_LEDGER
      where acct_link =  '${liquidationAccount}'
      and status_indicator not in ('DO','BO','DR')
     `);
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

  } catch (error) {
    throw error;
  }

}


// deal source lovs
exports.DealSource = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(` SELECT ALL CODE_DESC.ACTUAL_CODE as value, CODE_DESC.DESCRIPTION as label
      FROM CODE_DESC 
      WHERE CODE_TYPE = 'SRC'
     `);
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

  } catch (error) {
    throw error;
  }

}

// get Product Lovs
exports.ProductLovs = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`SELECT ALL TB_PRODUCT.PROD_CODE as value, TB_PRODUCT.DESCRIPTION as label,TB_PRODUCT.prod_cat
      FROM TB_PRODUCT 
      where app_flag ='Y' and prod_cat in ('CD')
      and prod_group = '4'
     `);
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

  } catch (error) {
    throw error;
  }

}

// Get Currency
exports.Currency = async (req, res) => {
  const { sourceAccount } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`select a.currency_code ,iso_code,description 
      from g_ledger a, tb_currency b
      where acct_link = '${sourceAccount}'
      and a.currency_code = b.currency_code
     `);
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

  } catch (error) {
    throw error;
  }

}

//   Get Interest and Agreed Rates
exports.IAR = async (req, res) => {
  const { sourceAccount, currencyAmount, productCode } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`SELECT DISTINCT INT_RATE,INT_RATE
      FROM interest_type_acct
      WHERE prod_code = '${productCode}'
      AND CURRENCY = get_acctcurrcode('${sourceAccount}')
     and '${currencyAmount}' between min_bal and max_bal
     `);
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

  } catch (error) {
    throw error;
  }

}