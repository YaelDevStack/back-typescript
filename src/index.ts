// Liberias
import  Express  from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";

// Routes para consumirse
import userRoutes from './routes/userRoutes'

// Configuración de dotenv
dotenv.config();
connectDB()

// Se crea la instancia de express
const app = Express();
const PORT = process.env.PORT_BACK;
// Llenar los datos
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes)

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
})