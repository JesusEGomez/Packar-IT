import { Schema, models, model } from "mongoose";

export const ViajeSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desde: {
        pais: String,
        ciudad: String,
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
        pais: String,
        ciudad: String,
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
    horaSalida: {
        type: Date,
        required: [true, "La hora de salida es obligatoria"],
    },
    horaLlegada: {
        type: Date,
        required: [true, "La hora de llegada es obligatoria"],
    },
    eresFlexible: {
        type: Boolean,
        default: false, // Puedes establecer el valor predeterminado según tus necesidades
    },
    estado: {
        type: Boolean
    },
    precio: {
        type: Number,
        required: true,
    },
});

const Viaje = models.Viaje || model("Viaje", ViajeSchema);
export default Viaje;
