// Liberias
import  Express  from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";

// Routes para consumirse
import auth from './routes/userRoutes'
import product from './routes/productRoutes'

// Configuración de dotenv
dotenv.config();
connectDB()

// Se crea la instancia de express
const app = Express();
const PORT = process.env.PORT_BACK;
// Llenar los datos
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/api/auth', auth)
app.use('/api/product', product)

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
})