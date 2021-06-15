const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const User=require('../models/user');
const jwtToken = require('../services/jwt');

function signUp(req,res){
const user = new User();
const {email, name, lastName, password, repeatPassword}=req.body;
user.email=email.toLowerCase();
user.name=name;
user.lastName=lastName;
user.active=true;

if(!name || !lastName || !email || !password || !repeatPassword){
    res.status(400).send({message: "Todos los campos son obligatorios"})
}else{
if(password !== repeatPassword){
    res.status(400).send({message: "Las contraseñas deben ser iguales"})
}else{
    bcrypt.hash(password,null,null,function(err,hash) {
        if(err){
            res.status(500).send({message: "Error al encriptar la contraseña"})
        }else{
            user.password=hash;
            user.save((err, userStores) => {
                if(err){
                    res.status(500).send({message: "El usuario ya existe"})
                }else{
                    if(!userStores){
                        res.status(404).send({message:"Usuario no ha sido encontrado"})
                    }else{
                        res.status(200).send({message:"El usuario ha sido creado"})
                    }
                }
            })
        }
    })
}
}
}

function logIn(req,res){
    
    const {email, password}=req.body;
    const emailBias=email.toLowerCase();
    User.findOne({email:emailBias}, (err,userStored) =>{
        if(err){
            res.status(500).send({message: "Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message: "Usuario no encontrado"})
            }else{
                bcrypt.compare(password,userStored.password, (err, passwordCheck) => {
                    if(err){
                        res.status(500).send({message:"Error del servidor"})
                    }else if(!passwordCheck){
                        res.status(404).send({message: "La contraseña no es válida"})
                    }else{
                        if(!userStored.active){
                            res.status(404).send({message:"El usuario está inactivo"})
                        }else{
                            const accessToken = jwtToken.createAccessToken(userStored);
                            const refreshAccessToken= jwtToken.createRefreshToken(userStored);
                            res.status(200).send({accessToken,refreshAccessToken})
                        }
                    }
                })
            }
        }
    })
    
}

module.exports ={
    signUp,
    logIn
}