import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number }
})

const User = mongoose.model("User", UserSchema);
export default User;