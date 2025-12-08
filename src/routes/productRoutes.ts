import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputsErrors } from "../middleware/validations";
import { ProductController } from "../controllers/productController";
import { authenticate } from '../middleware/auth'
const router = Router();

// Crear un nuevo producto 
router.post('/create-product',
    // Validaciones
    authenticate,
    body('nameProducto').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('description').notEmpty().withMessage('La descripción del producto no puede ir vacio'),
    body('stock').notEmpty().withMessage('El stock del producto no puede ir vacio'),
    body('price').notEmpty().withMessage('El price del producto no puede ir vacio'),
    handleInputsErrors,
    // Controlador
    ProductController.createProduct)

// Actualizar un producto
router.put(
    "/update-product/:id",
    authenticate,

    // Validar parámetro id
    param("id")
        .isMongoId()
        .withMessage("El ID del producto no es válido"),

    // Validaciones de campos opcionales (pueden venir o no)
    body("nameProducto")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede ir vacío"),

    body("description")
        .optional()
        .notEmpty()
        .withMessage("La descripción no puede ir vacía"),

    body("stock")
        .optional()
        .isNumeric()
        .withMessage("El stock debe ser numérico"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("El precio debe ser numérico"),

    // Manejo de errores de validación
    handleInputsErrors,

    // Controlador
    ProductController.updateProduct
);

export default router