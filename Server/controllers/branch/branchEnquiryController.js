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
exports.branchZone = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`SELECT ACTUAL_CODE as value,DESCRIPTION as label
      FROM CODE_DESC  where code_TYPE='ZON'
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

// get all branches
exports.getAllBranches = async (req, res) => {
  const { br_desc, postedBy, branchCode, status, branchType, contactPerson } =
    req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    var query = "";

    // branch name
    if (br_desc) {
      if (query) {
        query += `AND BR_DESCRIPTION LIKE '%${br_desc}%'`;
      } else {
        query += `WHERE BR_DESCRIPTION LIKE '%${br_desc}%'`;
      }
    }

    // posted by
    if (postedBy) {
      if (query) {
        query += `AND POSTED_BY LIKE '%${postedBy}%'`;
      } else {
        query += `WHERE POSTED_BY LIKE '%${postedBy}%'`;
      }
    }

    // branch code
    if (branchCode) {
      if (query) {
        query += `AND BR_CODE LIKE '%${branchCode}%'`;
      } else {
        query += `WHERE BR_CODE LIKE '%${branchCode}%'`;
      }
    }

    // status
    if (status) {
      if (query) {
        query += `AND FLAG_STATUS LIKE '%${status}%'`;
      } else {
        query += `WHERE FLAG_STATUS LIKE '%${status}%'`;
      }
    }

    // branch type
    if (branchType) {
      if (query) {
        query += `AND BR_TYPE LIKE '%${branchType}%'`;
      } else {
        query += `WHERE BR_TYPE LIKE '%${branchType}%'`;
      }
    }

    // contact person
    if (contactPerson) {
      if (query) {
        query += `AND CONTACT_PERSON LIKE '%${contactPerson}%'`;
      } else {
        query += `WHERE CONTACT_PERSON LIKE '%${contactPerson}%'`;
      }
    }

    data =
      await db.execute(`SELECT  BR_CODE, BR_DESCRIPTION, ADDRESS1, CLEARING_CODE,EFT, BR_TYPE, TELEPHONE,CONTACT_PERSON, DATE_OPENED, POSTED_BY
        FROM TB_BRANCH ${query} ORDER BY br_code ASC`);

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

      for (let i = 0; i < response.length; i++) {
        let dateOpened = new Date(response[i].date_opened);
        let day = dateOpened.getDate().toString().padStart(2, "0");
        let month = (dateOpened.getMonth() + 1).toString().padStart(2, "0");
        let year = dateOpened.getFullYear();

        let formattedDate = `${day}/${month}/${year}`;
        response[i].date_opened = formattedDate;
      }
      res.send(response);
    } else {
      return "Something went wrong... Nothing was returned!!";
    }
  } catch (error) {
    throw error;
  }
};

// get branch lovs
exports.branches = async (req, res) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];
    data = await db.execute(`SELECT BR_CODE as value,BR_DESCRIPTION as label
        FROM TB_BRANCH
        order by  BR_DESCRIPTION
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

// get selected branches
exports.getSelectedBranch = async (req, res) => {
  const { branchDescription } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    var query = "";

    // data = await db.execute(`SELECT br_code, br_description, address1, address2, address3, swift_code, clearing_code,eft, br_type, telephone, email, contact_person, date_opened, fax_num, br_zone, device_flag, br_manager, sshort_code   FROM TB_BRANCH WHERE BR_DESCRIPTION = '${branchDescription}'`);
    data = await db.execute(
      `SELECT *   FROM TB_BRANCH WHERE BR_DESCRIPTION = '${branchDescription}'`
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

// get limits of a branch
exports.getLimits = async (req, res) => {
  const { br_code } = req.body;
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    var response = [];
    var arr0 = [];

    var query = "";

    data = await db.execute(
      `select currency_code, insurance_limit, max_online_cr, min_off_dr, max_floor_lim, min_floor_lim from users_teller_currency where TELLER_NAME = '${br_code}'`
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

// select currency_code, insurance_limit, max_online_cr, min_off_dr, max_floor_lim, min_floor_lim from users_teller_currency where TELLER_NAME = '000';
