import { Schema, models, model } from "mongoose";

const ProductoSchema = new Schema({
    categoria: {
        type: String,
        enum: ["Belleza", "Bebé", "Bricolaje y herramientas", "Deportes", "Electronica", "Equipaje"],
        required: true,
    },
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true,
    },
    tamaño: {
        type: String,
        enum: ["64x30cm", "81x37cm", "67x44cm"],
        required: true,
    },
    peso: {
        type: String,
        enum: ["< 5 Kg", "5-15 Kg", "15-30 Kg"],
        required: true,
    },
});

const Producto = models.Producto || model("Producto", ProductoSchema);
export default Producto;
