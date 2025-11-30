const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
/**
 * @openapi
 * /auth/register:
 *   post:
 *      summary: Registra un nuevo usuario
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserRegister'
 *      responses:
 *          201:
 *              description: Usuario registrado correctamente
 *          400:
 *              description: Faltan datos obligatorios
 *          500:
 *              description: Error al guardar el usuario
 */
router.post("/register", AuthController.registerUser);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: Inicia sesión de un usuario
 *    tags: [Auth]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/UserLogin'
 *    responses:
 *      200:
 *       description: Usuario logueado correctamente
 *      400:
 *       description: Faltan datos obligatorios
 *      401:
 *       description: Contraseña incorrecta
 *      404:
 *       description: Usuario no encontrado
 *      500:
 *       description: Error al loguear el usuario
 */

router.post("/login", AuthController.loginUser);

module.exports = router;