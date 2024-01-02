import { Schema, models, model } from "mongoose";

export const EnvioSchema = new Schema({
    desde: {
        type: String,
        required: [true, "La ubicación de origen es obligatoria"],
    },
    hasta: {
        type: String,
        required: [true, "La ubicación de destino es obligatoria"],
    },
    cuando: {
        type: Date,
        required: [true, "La fecha de envío es obligatoria"],
    },
    producto: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
    },
});

const Envio = models.Envio || model("Envio", EnvioSchema);
export default Envio;
