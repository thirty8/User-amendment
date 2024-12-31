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

// get branch zone Lovs
exports.clearingCode = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data =
      await db.execute(`SELECT ALL CODE_DESC.ACTUAL_CODE as value, CODE_DESC.DESCRIPTION as label
    FROM CODE_DESC  where code_TYPE='CLR'
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
};

// get all regions
exports.region = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    let determinant = "";

    data =
      await db.execute(`SELECT ALL CODE_DESC.ACTUAL_CODE as value, CODE_DESC.DESCRIPTION as label
      FROM CODE_DESC  where code_TYPE='REG'`);

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
};

// get all branch managers
exports.getBranchManagers = async (req, res) => {
  const { globalBranchCode } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    let determinant = "";

    data = await db.execute(
      `select user_name as value,fullname as label from menu_users where branch_code = '${globalBranchCode}' AND NVL(APPROVAL_AUTHORITY,'N') = 'Y'`
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
  } catch (error) {
    throw error;
  }
};

// get field error
exports.branchFieldError = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    let determinant = "";

    data = await db.execute(`select * from ERROR_CODE where code = '05963'`);

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
};

//get FD branch code generated after OK is pressed and all required fields are filled
exports.getNewBranchCode = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    data = await db.execute(
      `SELECT LPAD(TO_CHAR(NVL(TO_NUMBER(MAX(substr(BR_CODE,2,GET_BRA_LENGTH))),0)+1),GET_BRA_LENGTH,'0') as code_generated from TB_BRANCH`
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
  } catch (error) {
    throw error;
  }
};
