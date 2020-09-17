const mysql = require('mysql');

module.exports = function(){
    return {
        // init function createConnection , 밑에 정보는 local mysql 내 정보
        init: function () {
          return mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'love97jawoon!',
            database: 'barinhome'
          })
        },
        
        test_open: function (con: { connect: (arg0: (err: any) => void) => void; }) {
          con.connect(function (err) {
            if (err) {
              console.error('mysql connection error :' + err);
            } else {
              console.log("***************[Open Database Connection]***************");
            }
          })
        },
          /*
        close:function(con: { connect: (arg0: (err: any) => void) => void; }){
          con.disconnect();
        }
        */
    }
};