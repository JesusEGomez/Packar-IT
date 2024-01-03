import { Schema, models, model } from "mongoose";

export const ViajeSchema = new Schema({
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
        default: false, 
    },
    tamañoParaTrasnsportar: {
        type: String,
        enum: ["64x30cm", "81x37cm", "67x44cm"],
        required: true,
    },
    pesoParaTrasnsportar: {
        type: String,
        enum: ["< 5 Kg", "5-15 Kg", "15-30 Kg"],
        required: true,
    },
    articulosEspeciales: {
        type: String,
        enum: ["bicicleta", "Tabla de Surf", "Silla", "Cama", "TV", "Kayak", "Esquís" , "Otro"],
        required: false,
    },
    precio: {
        enum: ["7€  ", "15€ ", "30€ "],
        required: true,
    }
});

const Viaje = models.Viaje || model("Viaje", ViajeSchema);
export default Viaje;
