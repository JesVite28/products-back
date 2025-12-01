const User = require("../Models/UserModel");
const Role = require("../Models/RoleModel");

const indexUser = async (req, res) => {
    try {
        const users = await User.find().populate("roles");
        return res.status(200).json({
            status: "success",
            message: "Usuarios encontrados",
            data: users,
        });
    } catch (error) {
        console.log("Error al listar los usuarios:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al listar los usuarios",
            error: error.message,
        });
    }
};

const indexIdUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate("roles");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario encontrado",
            data: user,
        });
    } catch (error) {
        console.log("Error al listar el usuario por ID:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al listar el usuario por ID",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, roles, password, newPassword } = req.body;
        const passToUpdate = password || newPassword;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        // ✅ actualizar name/email si vienen
        if (typeof name === "string") user.name = name;
        if (typeof email === "string") user.email = email;

        // ✅ actualizar password en texto plano para que el hook del modelo lo encripte
        if (typeof passToUpdate === "string" && passToUpdate.trim() !== "") {
            user.password = passToUpdate.trim();
            user.markModified("password"); // 🔥 fuerza a mongoose a reconocer cambio
        }

        // ✅ roles por nombre -> ObjectId
        if (Array.isArray(roles) && roles.length > 0) {
            const foundRoles = await Role.find({ name: { $in: roles } });

            if (foundRoles.length === 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Roles inválidos",
                });
            }

            user.roles = foundRoles.map((r) => r._id);
            user.markModified("roles");
        }

        await user.save(); // ✅ aquí corre pre("save") y encripta password

        const populated = await User.findById(user._id).populate("roles");

        return res.status(200).json({
            status: "success",
            message: "Usuario actualizado correctamente",
            data: populated,
        });
    } catch (error) {
        console.log("Error al actualizar el usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar el usuario",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario eliminado correctamente",
            data: deletedUser,
        });
    } catch (error) {
        console.log("Error al eliminar el usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar el usuario",
            error: error.message,
        });
    }
};

module.exports = {
    indexUser,
    indexIdUser,
    updateUser,
    deleteUser,
};
