require("dotenv").config();
const express = require("express");
const cors = require("cors");

var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const app = express();

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;

let quickAccountOpeningFunc = async (cust_typeC, CUSTOMER_catC, titleC, fnameC, lnameC, onameC, tin_vC, DOBC, sufix_vC, place_ofbirthC, country_residenceC, staff_catC, risk_codeC, reasonC, company_nameC, contitution_codeC, corp_tinC, date_of_corpC, domiciel_counC, residence_statusC, prefer_langC, approval_panelC, sex_vC, nationalityC, homeaddrC, homeaddr1C, workaddrC, cityC, subprodC, usernameC, posted_by_vC, sub_sectorC, sub_segmentC, doctypeC, docidC, doc_expirydateC, personlphoneC, mandateC, emailC, issueauthC, issuedteC, sigC, picC, fingC, NO_DB_TRANSC, TOTAL_DB_TRANSC, NO_CR_TRANSC, TOTAL_CR_TRANSC, doc_refC, PROOF_ADDRESSC, SOURCE_OF_FUNDSC, OCCUPATIONC, NATURE_OF_BUSINESSC, armcodeC, source_of_worthC, worth_valC, rfidC, kycdocC, terminalC, approvalC, para3C) => {

  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
      timeout: DB_CONNECTION_TIMEOUT,
    });

    ///////////////////////////////////////////////////////////////////////////
    const util = require("util");

    const execute = util.promisify(db.execute).bind(db);

    let result;

    if (db) {

    let bindValues = {
        cust_type: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: cust_typeC ? cust_typeC : null },
        CUSTOMER_cat: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: CUSTOMER_catC ? CUSTOMER_catC : null },
        title: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: titleC ? titleC : null },
        fname: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: fnameC ? fnameC : null },
        lname: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: lnameC ? lnameC : null },
        oname: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: onameC ? onameC : null },
        tin_v: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: tin_vC ? tin_vC : null },
        DOB: { type: oracledb.DATE, dir: oracledb.BIND_IN, val: DOBC ? new Date(DOBC) : null },
        sufix_v: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: sufix_vC ? sufix_vC : null },
        place_ofbirth: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: place_ofbirthC ? place_ofbirthC : null },
        country_residence: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: country_residenceC ? country_residenceC : null },
        staff_cat: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: staff_catC ? staff_catC : null },
        risk_code: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: risk_codeC ? risk_codeC : null },
        reason: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: reasonC ? reasonC : null },
        company_name: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: company_nameC ? company_nameC : null },
        contitution_code: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: contitution_codeC ? contitution_codeC : null },
        corp_tin: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: corp_tinC ? corp_tinC : null },
        date_of_corp: { type: oracledb.DATE, dir: oracledb.BIND_IN, val: date_of_corpC ? new Date(date_of_corpC) : null },
        domiciel_coun: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: domiciel_counC ? domiciel_counC : null },
        residence_status: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: residence_statusC ? residence_statusC : null },
        prefer_lang: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: prefer_langC ? prefer_langC : null },
        approval_panel: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: approval_panelC ? approval_panelC : null },
        sex_v: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: sex_vC ? sex_vC : null },
        nationality: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: nationalityC ? nationalityC : null },
        homeaddr: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: homeaddrC ? homeaddrC : null },
        homeaddr1: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: homeaddr1C ? homeaddr1C : null },
        workaddr: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: workaddrC ? workaddrC : null },
        city: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: cityC ? cityC : null },
        subprod: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: subprodC ? subprodC : null },
        username: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: usernameC ? usernameC : null },
        posted_by_v: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: posted_by_vC ? posted_by_vC : null },
        sub_sector: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: sub_sectorC ? sub_sectorC : null },
        sub_segment: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: sub_segmentC ? sub_segmentC : null },
        doctype: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: doctypeC ? doctypeC : null },
        docid: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: docidC ? docidC : null },
        doc_expirydate: { type: oracledb.DATE, dir: oracledb.BIND_IN, val: doc_expirydateC ? new Date(doc_expirydateC) : null },
        personlphone: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: personlphoneC ? personlphoneC : null },
        mandate: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: mandateC ? mandateC : null },
        email: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: emailC ? emailC : null },
        issueauth: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: issueauthC ? issueauthC : null },
        issuedte: { type: oracledb.DATE, dir: oracledb.BIND_IN, val: issuedteC ? new Date(issuedteC) : null },
        sig: { type: oracledb.BLOB, dir: oracledb.BIND_IN, val: sigC ? sigC : null },
        pic: { type: oracledb.BLOB, dir: oracledb.BIND_IN, val: picC ? picC : null },
        fing: { type: oracledb.BLOB, dir: oracledb.BIND_IN, val: fingC ? fingC : null },
        NO_DB_TRANS: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: NO_DB_TRANSC ? Number(NO_DB_TRANSC) : null },
        TOTAL_DB_TRANS: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: TOTAL_DB_TRANSC ? Number(TOTAL_DB_TRANSC) : null },
        NO_CR_TRANS: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: NO_CR_TRANSC ? Number(NO_CR_TRANSC) : null },
        TOTAL_CR_TRANS: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: TOTAL_CR_TRANSC ? Number(TOTAL_CR_TRANSC) : null },
        doc_ref: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: doc_refC ? doc_refC : null },
        PROOF_ADDRESS: { type: oracledb.BLOB, dir: oracledb.BIND_IN, val: PROOF_ADDRESSC ? PROOF_ADDRESSC : null },
        SOURCE_OF_FUNDS: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: SOURCE_OF_FUNDSC ? SOURCE_OF_FUNDSC : null },
        OCCUPATION: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: OCCUPATIONC ? OCCUPATIONC : null },
        NATURE_OF_BUSINESS: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: NATURE_OF_BUSINESSC ? NATURE_OF_BUSINESSC : null },
        armcode: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: armcodeC ? armcodeC : null },
        source_of_worth: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: source_of_worthC ? source_of_worthC : null },
        worth_val: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: worth_valC ? worth_valC : null },
        rfid: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: rfidC ? rfidC : null },
        kycdoc: { type: oracledb.BLOB, dir: oracledb.BIND_IN, val: kycdocC ? kycdocC : null },
        terminal: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: terminalC ? terminalC : null },
        created_customer_no: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        created_acct_no: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        error_msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        response_code: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        approval: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: approvalC ? approvalC : null },
        para2: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        para3: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: para3C ? para3C : null },
        para4: { type: oracledb.STRING, dir: oracledb.BIND_INOUT },
        para5: { type: oracledb.STRING, dir: oracledb.BIND_INOUT },
        para1: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        };
        
        result = execute(
        "BEGIN prc_acct_creation_v(:cust_type, :CUSTOMER_cat, :title, :fname, :lname, :oname, :tin_v, :DOB, :sufix_v, :place_ofbirth, :country_residence, :staff_cat, :risk_code, :reason, :company_name, :contitution_code, :corp_tin, :date_of_corp, :domiciel_coun, :residence_status, :prefer_lang, :approval_panel, :sex_v, :nationality, :homeaddr, :homeaddr1, :workaddr, :city, :subprod, :username, :posted_by_v, :sub_sector, :sub_segment, :doctype, :docid, :doc_expirydate, :personlphone, :mandate, :email, :issueauth, :issuedte, :sig, :pic, :fing, :NO_DB_TRANS, :TOTAL_DB_TRANS, :NO_CR_TRANS, :TOTAL_CR_TRANS, :doc_ref, :PROOF_ADDRESS, :SOURCE_OF_FUNDS, :OCCUPATION, :NATURE_OF_BUSINESS, :armcode, :source_of_worth, :worth_val, :rfid, :kycdoc, :terminal, :created_customer_no, :created_acct_no, :error_msg, :response_code, :approval, :para2, :para3, :para4, :para5, :para1); END;", bindValues 
        );

        if (result) {

            return result;
            
        } else {
            return "Something went wrong... Nothing was returned!!";
        }

     }

  } catch (e) {
    return e;
  }
};

module.exports.quickAccountOpeningFunc = quickAccountOpeningFunc;