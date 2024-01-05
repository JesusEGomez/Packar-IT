import { Schema, models, model } from "mongoose";

export const EnvioSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desde: {
        latitud: {
            type: Number,
            required: true,
        },
        longitud: {
            type: Number,
            required: true,
        },
    },
    hasta: {
        latitud: {
            type: Number,
            required: true,
        },
        longitud: {
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
        nombre: {
            type: String,
            required: [true, "El nombre del producto es obligatorio"],
        }
    },
});

const Envio = models.Envio || model("Envio", EnvioSchema);
export default Envio;
