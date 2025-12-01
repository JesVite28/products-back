// 1. Importar dependencias
const express = require("express");
const cors = require("cors");
const connect = require("./Database/Connect");
connect();
const ProductsRoutes = require("./Routes/ProductsRoutes");
const swaggerSpec = require("./swagger");
const createRoles = require("./libs/initialSetUp").createRoles;
const AuthRoutes = require("./Routes/AuthRoutes");
const Users = require("./Routes/UserRoutes");
const dotenv = require("dotenv");
dotenv.config();

// 2. Crear servidor
const app = express();
createRoles();
const PORT = 3690;

// 3. configurar cors
// 3. configurar cors
app.use(cors());

// Aumentar límite del body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Servir tu especificación OpenAPI en JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// 4. Servir la interfaz de RapiDoc (igual a Swagger pero moderna)
app.get("/docs", (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Documentación API de Productos</title>
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
      </head>
      <body>
        <rapi-doc
          spec-url="/api-docs.json"
          render-style="read"
          theme="dark"
          show-header="true"
          show-method-in-nav-bar="true"
          allow-authentication="true"
          persist-auth="true"
          allow-try="true"
          show-components="true"
          schema-style="tree"
          sort-endpoints-by="method"
        >
        </rapi-doc>
      </body>
    </html>
  `);
});

// Tus rutas reales
app.use("/api/v1/product", ProductsRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", Users);

// 5. Escuchar
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
});
