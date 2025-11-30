const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const Role = require('../Models/RoleModel');

const verifyToken = async (req, res, next) => {
    try {
        // Accept token from either x-access-token or Authorization: Bearer <token>
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);

        if (!token) {
            return res.status(403).json({
                status: 'error',
                message: 'No se proporcionó token de autenticación',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        // Use req.userId (was incorrectly using req.id before)
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Token inválido',
            error: error.message,
        });
    }
};

const moderador = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'moderator') return next();
        }
        return res.status(403).json({ status: 'error', message: 'Requiere rol de moderador' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

const admin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') return next();
        }
        return res.status(403).json({ status: 'error', message: 'Requiere rol de administrador' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = { verifyToken, moderador, admin };