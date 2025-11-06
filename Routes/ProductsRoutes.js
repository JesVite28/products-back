const express = require('express');
const router = express.Router();
const ProductController = require("../Controllers/ProductsController");

/**
 * @openapi
 * /product/save:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Faltan datos obligatorios
 *       500:
 *         description: Error al guardar el producto
 */
router.post('/save', ProductController.saveProduct);

/**
 * @openapi
 * /product/index:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *       500:
 *         description: Error al listar los productos
 */
router.get('/index', ProductController.indexProduct);

/**
 * @openapi
 * /product/indexId/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a consultar
 *     responses:
 *       200:
 *         description: Producto encontrado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al listar el producto por ID
 */
router.get('/indexId/:id', ProductController.indexIdProduct);

/**
 * @openapi
 * /product/update/{id}:
 *   patch:
 *     summary: Actualiza un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar el producto
 */
router.patch('/update/:id', ProductController.updateProduct);

/**
 * @openapi
 * /product/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports = router;
