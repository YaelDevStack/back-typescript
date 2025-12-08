import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IProducto extends Document {
    _id: Types.ObjectId
    nameProducto: string
    description: string
    stock: number
    price: number
}

const productSchema: Schema = new Schema({
    nameProducto: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    stock: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    }
})

const Product = mongoose.model<IProducto>('Product', productSchema)
export default Product