# 🛠️ Products API – Backend

API RESTful desarrollada con **Express.js** y **MongoDB** para la gestión de productos.  
Incluye documentación interactiva con **RapiDoc (Swagger)**, conexión a base de datos con **Mongoose**, y soporte completo para **CRUD**.

---

## 🚀 Tecnologías

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [RapiDoc](https://rapidocweb.com/)
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
- [Cors](https://www.npmjs.com/package/cors)

---

## 📂 Estructura del proyecto

```
products-back/
├── Controllers/
│   └── ProductsController.js
├── Database/
│   └── Connect.js
├── Models/
│   └── ProductsModel.js
├── Routes/
│   └── ProductsRoutes.js
├── index.js
├── package.json
└── swagger.js
```

## 🧩 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo con nodemon
npm run dev

# O en producción
npm start
```

---

## 🌐 Endpoints principales

| Método | Endpoint              | Descripción                     |
|--------|------------------------|----------------------------------|
| GET    | `/api/v1/product/index`      | Obtener todos los productos       |
| GET    | `/api/v1/product/indexId/:id` | Obtener un producto por ID       |
| POST   | `/api/v1/product/save`       | Crear un nuevo producto          |
| PATCH  | `/api/v1/product/update/:id` | Actualizar un producto existente |
| DELETE | `/api/v1/product/delete/:id` | Eliminar un producto por ID      |

---

## 📘 Documentación interactiva

RapiDoc está disponible en:
```
http://localhost:3690/docs
```

---

## 🧠 Ejemplo de respuesta JSON

```json
{
  "status": "success",
  "message": "Producto encontrado",
  "data": {
    "_id": "672c90d67c96dc12e4c102d1",
    "name": "Laptop Dell XPS",
    "price": 28999,
    "description": "Ultrabook profesional",
    "stock": 8,
    "provider": "Dell México"
  }
}
```

---

## 🧪 Pruebas de API

Puedes probar con [Postman](https://www.postman.com/) o [Hoppscotch](https://hoppscotch.io/):

```
GET http://localhost:3690/api/v1/product/index
```

---

## 💬 Autor

Desarrollado por 
Adrian Vite 
Gilberto Hernandez
Omar Torres
Irving Alvarez