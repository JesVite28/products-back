const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const Role = require('../Models/RoleModel');

const registerUser = async (req, res) => {
        try {
            const {name, email, password} = req.body;

            if(!name || !email || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos obligatorios',
               });
            }

            const newUser = new User({name, email, password: await User.encryptPassword(password)});
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];

            const  registerUser = await newUser.save();

            const token = jwt.sign({id: registerUser._id},process.env.JWT_SECRET, {expiresIn: 3600});
            

            return res.status(201).send({
                token,
                status: 'success',
                message: 'Registro guardado correctamente',
                data: registerUser
            });
        } catch (error) {
            console.log("Error al guardar el usuario:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al guardar el usuario',
                error: error.message
            });
        }
    };


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan datos obligatorios',
           });
        }
        const userFound = await User.findOne({email}).populate("roles");
        if(!userFound) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
           });
        }
        const matchPassword = await User.comparePassword(password, userFound.password);
        if(!matchPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta',
           });
        }
        const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        return res.status(200).json({
            token,
            status: 'success',
            message: 'Usuario logueado correctamente',
            data: userFound
        });
    }
    catch (error) {
        console.log("Error al loguear el usuario:", error);
        return res.status(500).json({    
            status: 'error',
            message: 'Error al loguear el usuario',
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};