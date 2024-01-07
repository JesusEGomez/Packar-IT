import { Schema, models, model } from "mongoose";

export const EnvioSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desde: {
        pais: String,
        ciudad: String,
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
        pais: String,
        ciudad: String,
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
