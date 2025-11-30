const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/UserController");
const { verifyToken, admin } = require("../middlewares/authjwt");

/**
* @openapi
* /user/index:
*   get:
*     summary: Obtiene todos los usuarios
*     security:
*      - AccessTokenAuth: []
*     tags: [Usuarios]
*     responses:
*       200:
*         description: Lista de usuarios obtenida correctamente
*       500:
*         description: Error al listar los usuarios
*/
router.get('/index', verifyToken, admin, UserController.indexUser);
/**
* @openapi
* /user/indexId/{id}:
*   get:
*     summary: Obtiene un usuario por su ID
*     security:
*      - AccessTokenAuth: []
*     tags: [Usuarios]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del usuario a consultar
*     responses:
*       200:
*         description: Usuario encontrado correctamente
*       404:
*         description: Usuario no encontrado
*       500:
*         description: Error al listar el usuario por ID
 */
router.get('/indexId/:id', verifyToken, admin, UserController.indexIdUser);

/**
 * @openapi
 * /user/update/{id}:
 *   patch:
 *     summary: Actualiza un usuario por su ID
 *     security:
 *      - AccessTokenAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: "Nuevo Nombre"
 *               email: "nuevo@email.com"
 *               password: "nuevaPassword"
 *               roles: ["user"]
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos para la actualización
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.patch('/update/:id', verifyToken, admin, UserController.updateUser);

/**
 * @openapi
 * /user/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     security:
 *      - AccessTokenAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/delete/:id', verifyToken, admin, UserController.deleteUser);

module.exports = router;