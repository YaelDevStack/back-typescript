import { Router } from "express";
import { body, param } from "express-validator";
import { UserController } from "../controllers/userController";
import { handleInputsErrors } from "../middleware/validations";
import { authenticate } from "../middleware/auth";

const router = Router()

router.post('/create-account',
    // Validaciones
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('nameLastName').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputsErrors,

    // Controlador
    UserController.createAccount)

router.post('/confirm-account',
    // Validaciones
    body('token').notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputsErrors,
    // Controlador
    UserController.confirmAccount
)

// Iniciar Sesión / Login
router.post('/login',
    // Validaciones
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').notEmpty().withMessage('El password no puede ir vacio'),
    handleInputsErrors,
    // Controlador
    UserController.login
)

// Nuevo Token
router.post('/request-code',
    // Validaciones
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputsErrors,
    // Controlador
    UserController.requestConfirmationCode
)

// Restablecer contraseña
router.post('/forgot-password',
    // Validaciones
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputsErrors,
    // Controlador
    UserController.forgotPassword
)
// Validar token
router.post('/validate-token',
    // Validaciones
    body('token').notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputsErrors,
    // Controlador
    UserController.validateToken
)

// Actualizar la contraseña
router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no valido'),
    // Validaciones
    body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    handleInputsErrors,
    // Controlador
    UserController.updatePasswordWithToken
)

router.get('/user',
    // Validaciones
    authenticate,
    // Controlador
    UserController.user

)

/** Profile */
router.put('/profile',
    // Validaciones
    authenticate,
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputsErrors,

    // Controlador
    UserController.updateProfile
)

// Actualizar contraseña
router.post('/update-password',
    // Validaciones
    authenticate,
    body('current_password').notEmpty().withMessage('La contraseña actual no puede ir vacio'),
    body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    handleInputsErrors,
    // Controlador
    UserController.updateCurrentUserPassword
)

router.post('/check-password',
    // Validaciones
    authenticate,
     body('password').notEmpty().withMessage('La contraseña no puede ir vacia'),
     handleInputsErrors,
    // Controlador
    UserController.checkPassword
)

export default router