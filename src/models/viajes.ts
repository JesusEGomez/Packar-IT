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
  estado: {
    type: Boolean,
  },
  precio: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  envios: [{}],

});

const Viaje = models.Viaje || model("Viaje", ViajeSchema);
export default Viaje;
