import { Schema , models ,model } from "mongoose";


export const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"],
        match: [/.+@.+\..+/, "Formato de email invalido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minLength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxLength: [50, "El nombre debe tener como máximo 50 caracteres"]
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    smsCode: {
        type: String,
        required: false, 
        default: "", 
    }
})

 const User = models.User || model("User", UserSchema);
 export default User