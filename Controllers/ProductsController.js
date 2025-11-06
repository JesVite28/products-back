
const Product = require('../Models/ProductsModel');

    const saveProduct = async (req, res) => {
        try {
            const {name, price, description, stock, date_caducity, date_buy, provider, price_buy, image} = req.body;

            if(!name || !price || !description || !stock || !date_caducity || !date_buy || !provider || !price_buy) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos obligatorios',
               });
            }

            const newProduct = new Product({name, price, description, stock, date_caducity, date_buy, provider, price_buy, image});

            const productSave = await newProduct.save();

            return res.status(201).send({
                status: 'success',
                message: 'Registro guardado correctamente',
                data: productSave
            });
        } catch (error) {
            console.log("Error al guardar el producto:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al guardar el producto',
                error: error.message
            });
        }
    };
    // listar registros
    const indexProduct = async (req, res) => {
        try {
            // 1. Pedirle al modelo que me traiga los registros
            const producto = await Product.find();
            return res.status(200).json({
                status: 'success',
                message: 'Producto encontrada',
                data: producto
            });
        } catch (error) {
            console.log("Error al listar el producto:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al listar el producto',
                error: error.message
            });
        }
    };
    // listar un registro por id
    const indexIdProduct = async (req, res) => {
        try {
            // 1. Recibir el id por la url
            const id = req.params.id;
            // 2. Pedirle al modelo que me traiga el registro por id
            const productId = await Product.findById(id);
            // 3. Validar si existe el proyecto
            if (!productId) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Producto no encontrada',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Producto encontrada',
                data: productId
            });
        } catch (error) {
            console.log("Error al listar el producto por ID:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al listar el producto por ID',
                error: error.message
            });
        }
    };

    const deleteProduct = async (req, res) => {
        try {
            // 1. Recibir el id por la url
            const id = req.params.id;
            // 2. Pedirle al modelo que elimine el registro por id
            const productDeleted = await Product.findByIdAndDelete(id);
            // 3. Validar si existe el proyecto
            if (!productDeleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Producto no encontrada',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Producto eliminado correctamente',
                data: productDeleted
            });
        } catch (error) {
            console.log("Error al eliminar el producto:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al eliminar el producto',
                error: error.message
            });
        }
    };

    const updateProduct = async (req, res) => {
        try {
            // 1. Recibir el id por la url
            const id = req.params.id;
            // 2. Recibir los datos del body
            const {name, price, description, stock, date_caducity, date_buy, provider, price_buy, image} = req.body;
            // 3. Validar que vengan los datos obligatorios
            if(!name && !price && !description && !stock && !date_caducity && !date_buy && !provider && !price_buy && !image) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Proporcione al menos un dato para actualizar',
                });
            }
            // 4. Pedirle al modelo que actualice el registro por id
            const datosActualizados = {};
            if(name) datosActualizados.name = name;
            if(price) datosActualizados.price = price;
            if(description) datosActualizados.description = description;
            if(stock) datosActualizados.stock = stock;
            if(date_caducity) datosActualizados.date_caducity = date_caducity;
            if(date_buy) datosActualizados.date_buy = date_buy;
            if(provider) datosActualizados.provider = provider;
            if(price_buy) datosActualizados.price_buy = price_buy;
            if(image) datosActualizados.image = image;
            //Buscar y actualizar
            const updateProduct = await Product.findByIdAndUpdate(id, datosActualizados, 
                {
                    new: true, // para que me devuelva el objeto actualizado
                    runValidators: true // para que aplique las validaciones del modelo
                });

            // 5. Validar si existe el proyecto
            if (!updateProduct) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product no encontrada',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Product actualizado correctamente',
                data: updateProduct
            });
        }catch (error) {
            console.log("Error al actualizar el producto:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el producto',
                error: error.message
            });
        }
    };

    // 3. Exportar el controlador
    module.exports = {
        saveProduct,
        indexProduct,
        indexIdProduct,
        deleteProduct,
        updateProduct
    };