import role from "../Models/RoleModel.js";

export const createRoles = async () => {
    try {
        const count = await role.estimatedDocumentCount();
        if(count > 0) return;
        const values = await Promise.all([
            new role({name: 'user'}).save(),
            new role({name: 'admin'}).save(),
            new role({name: 'moderator'}).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error("Error al crear los roles iniciales:", error);
    }
};