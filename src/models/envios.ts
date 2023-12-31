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
        calle: String,
    },
    hasta: {
        pais: String,
        ciudad: String,
        calle: String,
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
    recibe: {
        nombreApellido: {
            type: String,
            required: [true, "El nombre del receptor es obligatorio"],
        },
        telefono: {
            type: String,
            required: [true, "El teléfono del receptor es obligatorio"],
        },
        email: {
            type: String,
            required: [true, "El email del receptor es obligatorio"],
        },
    }
});

const Envio = models.Envio || model("Envio", EnvioSchema);
export default Envio;
