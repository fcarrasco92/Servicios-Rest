const mysql = require('mysql');

connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testapimysql'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if(connection){
        connection.query('SELECT * FROM users ORDER BY id',
        (err, rows) =>{
            if(err){
                throw err;
            }else{
                callback(null,rows);
            }
        }
    )
    }
};

userModel.insertUser = (userdata, callback) =>{
    if(connection){
        connection.query('INSERT INTO users SET ?',userdata,
            (err, result)=>{
                if(err){
                    throw err;
                }else{
                    callback(null,{'insertId':result.insertId})
                }
            }
        )
    }
};

userModel.updateUser = (userData, callback)=>{
    if(connection){
    const sql = `
        UPDATE users SET
        username = ${connection.escape(userData.username)},   
        userpassword = ${connection.escape(userData.userpassword)},   
        email = ${connection.escape(userData.email)}   
        WHERE id = ${userData.id}`;
        console.log(sql);
    connection.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            callback(null, {
                msg : 'Success'
            })
        }
    });
    }
};

userModel.deleteUser = (id, callback)=>{
    if(connection){
        let sqlExist = `SELECT * FROM users WHERE id=`+connection.escape(id);
        connection.query(sqlExist, (err, row)=>{
            if(row && row.length){
                let sql = `DELETE FROM users WHERE id=` + connection.escape(id);
                connection.query(sql, (err, result)=>{
                    if(err){
                        throw err;
                    }else{
                        callback(null,{
                            "msg": "delete"
                        });
                    }
                });
            }else{
                callback(null,{
                    "msg": "not Exists"
                })
            }
        });
    }
}
module.exports = userModel;