import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IProducto extends Document {
    _id: Types.ObjectId
    nameProducto: string
    description: string
    stock: number
    price: number
    dataCreate: Date
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
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    dataCreate: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model<IProducto>('Product', productSchema)
export default Product