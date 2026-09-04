import mongoose, { Schema } from "mongoose";
export declare const userModel: mongoose.Model<{
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, {
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userName: string;
    email: string;
    password: string;
    todos: mongoose.Types.ObjectId[];
    profilePicture: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=userModel.d.ts.map