// models/profile.js
import { Schema, models, model } from 'mongoose';

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  driverLicense: {
    frontPhoto: {
      type: String,
      required: true,
    },
    backPhoto: {
      type: String,
      required: true,
    },
  },
  idDocument: {
    type: {
      type: String,
      enum: ['DNI', 'Pasaporte'],
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    frontPhoto: {
      type: String,
      required: true,
    },
    backPhoto: {
      type: String,
      required: true,
    },
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    
  },
  
});

const Profile = models.Profile || model('Profile', ProfileSchema);
export default Profile;
