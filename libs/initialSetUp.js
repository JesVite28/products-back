import role from "../Models/RoleModel.js";
import user from "../Models/UserModel.js"

export const createRoles = async () => {
    try {
        const count = await role.estimatedDocumentCount();
        if(count > 0) return;
        const values = await Promise.all([
            new role({name: 'user'}).save(),
            new role({name: 'admin'}).save(),
            new role({name: 'moderator'}).save()
        ]);
        console.log('Roles iniciales creados:', values.map(v => v.name));
    } catch (error) {
        console.error("Error al crear los roles iniciales:", error);
    }
};

export const createAdminUser = async () => {
    try {
        const adminEmail = 'admin@local.com';
        const adminName = 'Adeministrador';
        const adminPass = '1234';

        // Si ya existe un usuario con ese correo, no hacer nada
        const existing = await user.findOne({ email: adminEmail });
        if (existing) {
            console.log('Admin inicial ya existe:', adminEmail);
            return;
        }

        // Buscar el rol admin
        const adminRole = await role.findOne({ name: 'admin' });
        if (!adminRole) {
            console.warn('No se encontró el rol "admin". Ejecuta createRoles() primero.');
            return;
        }

        const newAdmin = new user({
            name: adminName,
            email: adminEmail,
            password: await user.encryptPassword(adminPass),
            roles: [adminRole._id]
        });

        await newAdmin.save();
        console.log('Usuario admin creado:', adminEmail, 'con contraseña:', adminPass);
    } catch (error) {
        console.error('Error al crear el usuario admin inicial:', error);
    }
};
