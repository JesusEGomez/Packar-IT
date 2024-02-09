import { Schema, models, model } from "mongoose";

// Esquema para los productos
const ProductSchema = new Schema({
  type: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: String, required: false },
  weigth: { type: String, required: false },
  photoProduct: { type: String, required: false },
  articulosEspeciales: { type: String, required: false }
});

// Esquema para los usuarios
const UserSchema = new Schema({
  _id: { type: String, required: false },
  email: { type: String, required: false },
  fullname: { type: String, required: false },
  smsCode: { type: String, required: false }
});

// Esquema para las notificaciones
const NotificationSchema = new Schema({
  type: { type: String, enum: ["solicitudServicio", "respuestaServicio"] },
  estado: { type: String, enum: ["Pendiente", "Aceptado", "Rechazado"], default: 'Pendiente' },
  subestado: { type: String, enum: ['solicitud', 'cambios'], default: 'solicitud'},
  estadoEnvio: { type: String, enum: ['Pendiente','Aceptado', 'Cancelado', 'En Curso', 'Entregado', 'Finalizado'], default: 'Pendiente'},
  visto: { type: Boolean, default: false },
  usuario: { type: UserSchema, required: false },
  desde: { type: { calle: String, pais: String, ciudad: String }, required: false },
  hasta: { type: { calle: String, pais: String, ciudad: String }, required: false },
  cuando: { type: Date, required: false },
  producto: { type: ProductSchema, required: false },
  recibe: { type: { nombreApellidos: String, telefono: String, email: String }, required: false },
  driver: {
    _id: String,
    usuario: { type: UserSchema, required: false },
    desde: { type: { pais: String, ciudad: String, calle: String }, required: false },
    hasta: { type: { pais: String, ciudad: String, calle: String }, required: false },
    cuando: { type: String, required: false },
    horaSalida: { type: String, required: false },
    horaLlegada: { type: String, required: false },
    eresFlexible: { type: Boolean, required: false },
    estado: { type: String, required: false },
    precio: [{ type: Object, required: false }],
    envios: [{ type: Array, required: false }],
    special: { type: Boolean, required: false },
    como: { type: String, required: false }
  }
});

const Notification = models.Notification || model("Notification", NotificationSchema);
export default Notification;
