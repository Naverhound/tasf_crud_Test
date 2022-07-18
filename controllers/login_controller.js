const {db_open_connection} = require ('../database/db_connection');

const get = (req,res) => {
    return res.render('../views/Login.ejs');
}

const post = async (req,res) => {
    const db_connection = await db_open_connection();
    let valid = await db_connection.query(`SELECT * FROM users;`)
        .then(([res]) =>{
            let bool=false;
            res.forEach(row=>{                
                if(row.username==req.body.user
                    && row.password==req.body.pass){
                        bool= true;
                    }
            })
            return bool;
        })
        .catch(error => {throw error});
    db_connection.close();
    console.log(valid)
    if(!valid) return res.render('../views/Login.ejs',{"msg":"credenciales erroneas"}) 
    return res.redirect('/index');
}
module.exports = {get,post}
