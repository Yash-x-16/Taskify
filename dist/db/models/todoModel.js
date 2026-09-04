import { model, Schema } from "mongoose";
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    description: {
        type: String
    },
    isDone: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
export const todoModel = model("todo", todoSchema);
//# sourceMappingURL=todoModel.js.map