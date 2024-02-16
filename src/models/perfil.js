import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: false,
  },
  driverLicense: {
    frontPhoto: {
      type: String,
      required: false,
    },
    backPhoto: {
      type: String,
      required: false,
    },
  },
  idDocument: {
    type: {
      type: String,
      enum: ["DNI", "Pasaporte"],
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    frontPhoto: {
      type: String,
      required: false,
    },
    backPhoto: {
      type: String,
      required: false,
    },
  },
  city: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  customerId: {
    type: String,
    required: false,
  },
  account: {
    type: String,
    required: false,
  },
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: "Notification",
  }],

  location: {
    type: {
      latitude: Number,
      longitude: Number,
    },
    address: String,
    city: String,
    country: String,
    province: String,
  },
});

const Profile = models.Profile || model("Profile", ProfileSchema);
export default Profile;
