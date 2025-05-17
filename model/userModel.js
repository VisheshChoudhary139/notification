import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'], 
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true 
});

export default mongoose.model("User", userSchema); 
