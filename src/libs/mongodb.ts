import mongoose from "mongoose"

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI no esta definido")
}

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)
        if (connection.readyState === 1) {
            //console.log("Conectado a MongoDB");
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(false)
    }
}