import { Schema, models, model } from "mongoose";

const NotificationSchema = new Schema({
    type: { type: String, required: false },
    usuario: { type: String, required: false },
    desde: { calle: { type: String, required: false }, pais: { type: String, required: false }, ciudad: { type: String, required: false }},
    hasta: { calle: { type: String, required: false }, pais: { type: String, required: false }, ciudad: { type: String, required: false }},
    cuando: { type: String, required: false },
    producto: {
      type: { type: String, required: false },
      name: { type: String, required: false },
      size: { type: String, required: false },
      weigth: { type: String, required: false },
      photoProduct: { type: String, required: false },
      articulosEspeciales: { type: String, required: false }
    },
    recibe: { nombreApellidos: { type: String, required: false }, telefono: { type: String, required: false }, email: { type: String, required: false }},
    driver: {
      _id: { type: String, required: false },
      usuario: {
        _id: { type: String, required: false },
        email: { type: String, required: false },
        fullname: { type: String, required: false },
        smsCode: { type: String, required: false }
      },
      desde: { pais: { type: String, required: false }, ciudad: { type: String, required: false }, calle: { type: String, required: false } },
      hasta: { pais: { type: String, required: false }, ciudad: { type: String, required: false }, calle: { type: String, required: false } },
      cuando: { type: String, required: false },
      horaSalida: { type: String, required: false },
      horaLlegada: { type: String, required: false },
      eresFlexible: false,
      estado: { type: String, required: false },
      precio: [ { type: Object, required: false }, { type: Object, required: false }, { type: Object, required: false }, { type: Object, required: false } ],
      envios: [{ type: Array, required: false }],
      special: { type: Boolean, required: false },
      como: { type: String, required: false },
    }
});

const Notification = models.Notification || model("Notification", NotificationSchema);
export default Notification;
