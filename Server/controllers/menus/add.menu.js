require("dotenv").config();
var oracledb = require('oracledb');
oracledb.autoCommit = true;

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT;

const util = require('util');

    let addMenuFunc = async (id, menu_id, menu_level, menu_name, parent_menu_id, menu_groupings, icon, color, type_code, file_name, menu_url, menu_permitted, bank_permission) => {

        try {

          const db = await oracledb.getConnection({
            user : DB_USER,
            password: DB_PASSWORD,
            connectString : DB_CONNECTION_STRING
          });

          // node native promisify
          const execute = util.promisify(db.execute).bind(db);

          let response = await execute('INSERT INTO TB_MENUS(id, menu_id, menu_level, menu_name, parent_menu_id, menu_groupings, icon, color, type_code, file_name, menu_url, menu_permitted, bank_permission) VALUES ('+ id +', '+ menu_id +', '+ menu_level +', '+ menu_name +', '+ parent_menu_id +', '+ menu_groupings +', '+ icon +', '+ color +', '+ type_code +', '+ file_name +', '+ menu_url +', '+ menu_permitted +', '+ bank_permission +'');
          
          
          if(response){
            return "Menu Has Been Added Successfully";
          }

        } finally {
          // db.end();
        }

    };

module.exports.addMenuFunc = addMenuFunc;


