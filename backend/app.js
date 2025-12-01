const express = require("express");
const app = express();


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const ticketRoutes = require("./routes/ticketRoutes");




// Middleware pour lire le JSON
console.log("userRoutes value:", userRoutes);

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/tickets", ticketRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));