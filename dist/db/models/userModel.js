import mongoose, { model, Schema } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    todos: [{
            type: mongoose.Schema.ObjectId,
        }],
    profilePicture: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});
export const userModel = model("user", userSchema);
//# sourceMappingURL=userModel.js.map