import type { Request, Response } from "express"
import Product from "../models/Producto"

export class ProductController {
    // Crear un Producto
    static createProduct = async (req: Request, res: Response) => {
        try {
            const { nameProducto } = req.body
            // Prevenir duplicados
            const productExists = await Product.findOne({ nameProducto })
            if (productExists) {
                const error = new Error("Este producto ya esta registrado")
                return res.status(409).json({ error: error.message })
            }
            // Crear el producto
            const product = new Product(req.body);

            await product.save()
            return res.status(201).json({
                message: `El producto ${product.nameProducto} se ha creado exitosamente`,
                status: 1
            })


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error', status: 3 })
        }
    }

    // Actualizar Producto
    static updateProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nameProducto, description, stock, price } = req.body;

            // Verifica si existe ese producto
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    error: "El producto no existe",
                    status: 2
                });
            }

            if (nameProducto) {
                const duplicate = await Product.findOne({
                    nameProducto,
                    _id: { $ne: id }
                });

                if (duplicate) {
                    return res.status(409).json({
                        error: "Ya existe un producto con este nombre",
                        status: 2
                    });
                }
            }

            product.nameProducto = nameProducto ?? product.nameProducto;
            product.description = description ?? product.description;
            product.stock = stock ?? product.stock;
            product.price = price ?? product.price;

            await product.save();

            return res.status(200).json({
                message: `El producto fue actualizado correctamente`,
                status: 1
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Hubo un error en el servidor',
                status: 3
            });
        }
    };


}