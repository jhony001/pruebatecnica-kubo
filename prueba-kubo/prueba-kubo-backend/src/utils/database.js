const mysql = require("mysql");
const Conf = require("../config");

class Database{
    static getConnection(){
        const con = mysql.createConnection({
            host: Conf.DATABASE_HOST,
            port: Conf.DATABASE_PORT,
            user: Conf.DATABASE_USER,
            password: Conf.DATABASE_PASSWORD,
            database: Conf.DATABASE_NAME
        });
        return con;
    }

    static executeQuery(req, res, query){
        let con = Database.getConnection();
        con.connect(function(err){
            if(err){
                console.log(err);
                res.json({data: [], status: 0, message: "Error al conectar con la base de datos"});
                throw err;
            }
            con.query(query, function(err, result){
                if(err){
                    console.log(err);
                    res.json({data:[], status: 0, message: "Error al realizar la consulta"});
                    throw err;
                }

                res.json({data: result, status: 1, message: "OK"});
            })
        })
    }
}

module.exports = Database;