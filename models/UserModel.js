import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    displayName: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    photoURL: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);