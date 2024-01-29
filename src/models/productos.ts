import { Schema, models, model } from "mongoose";

const ProductoSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
    },
    size: {
        type: String,
        required: true,
    },
    weigth: {
        type: String,
        required: true,
    },
    photoProduct: {
        type: String,
        required: false,
    },
    articulosEspeciales: {
        type: String,
        //type: Boolean,
        required: false
    },
    dirver: {
        type: String
    }
    

});

const Producto = models.Producto || model("Producto", ProductoSchema);
export default Producto;
