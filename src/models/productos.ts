import { Schema, models, model } from "mongoose";

const ProductoSchema = new Schema({
    types: {
        type: String,
        enum: ["Belleza", "Bebé", "Bricolaje y herramientas", "Deportes", "Electronica", "Equipaje"],
        required: true,
    },
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
    },
    size: {
        type: String,
        enum: ["64x30cm", "81x37cm", "67x44cm"],
        required: true,
    },
    weight: {
        type: String,
        enum: ["< 5 Kg", "5-15 Kg", "15-30 Kg"],
        required: true,
    },
});

const Producto = models.Producto || model("Producto", ProductoSchema);
export default Producto;
