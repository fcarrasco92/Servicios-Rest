const User = require('../models/user')
module.exports = function(app){
    app.get('/users', (req , res)=>{
        User.getUsers((err, data) =>{
            res.status(200).json(data);
        });
    });

    app.post('/users', (request, response)=>{
        //console.log(request.body);
        const userData = {
            id: null,
            username: request.body.username,
            userpassword: request.body.password,
            email: request.body.email,
            created_at: null,
            update_at: null

        }; 
        
        User.insertUser(userData, (err, data)=>{
            
            if(data && data.insertId){
                console.log(data);
                response.json({
                    success : true,
                    msg : 'Usuario Insertado',
                    data : data
                })
            }else{
                response.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    app.put('/users/:id' , (request, response) =>{
        console.log(request)
        const userData = {
            id: request.params.id,
            username: request.body.username,
            userpassword: request.body.password,
            email: request.body.email,
            created_at: null,
            update_at: null

        };
        console.log(userData)
        User.updateUser(userData, (err, data) =>{
            if(data && data.msg){
                response.json(data);
            }else{
                response.json({
                    success: false,
                    msg : 'error'
                })
            }
        })
    });

    app.delete('/users/:id',(request, response)=>{
        User.deleteUser(request.params.id, (err, result)=>{
            if(result && result.msg == 'delete' || result.msg ==='not Exists'){
                response.json({
                    success: true,
                    result
                });
            }else{
                response.status(500).json({
                    msg: 'Error'
                });
            }
        })
    });
}

