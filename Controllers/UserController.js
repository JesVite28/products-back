const User = require("../Models/UserModel");
const Role = require('../Models/RoleModel');


const indexUser = async (req, res) => {
    try {
        const users = await User.find().populate("roles");
        return res.status(200).json({
            status: 'success',
            message: 'Usuarios encontrados',
            data: users
        });
    }
    catch (error) {
        console.log("Error al listar los usuarios:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar los usuarios',
            error: error.message
        });
    }
};

const indexIdUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate("roles");
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Usuario encontrado',
            data: user
        });
    } catch (error) {
        console.log("Error al listar el usuario por ID:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar el usuario por ID',
            error: error.message
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, roles } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, roles }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado correctamente',
            data: updatedUser
        });
    } catch (error) {
        console.log("Error al actualizar el usuario:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Usuario eliminado correctamente',
            data: deletedUser
        });
    } catch (error) {
        console.log("Error al eliminar el usuario:", error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};

module.exports = {
    indexUser,
    indexIdUser,
    updateUser,
    deleteUser
};