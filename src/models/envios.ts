import { Schema, models, model } from "mongoose";

export const EnvioSchema = new Schema({
    desde: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    hasta: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        coordenadasExtras: {
            type: [String],
            default: [],
        },
    },
    cuando: {
        type: Date,
        required: [true, "La fecha de envío es obligatoria"],
    },
    producto: {
        name: {
            type: String,
            required: [true, "El nombre del producto es obligatorio"],
        }
    },
});

const Envio = models.Envio || model("Envio", EnvioSchema);
export default Envio;
