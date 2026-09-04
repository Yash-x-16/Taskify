import { Schema } from "mongoose";
export declare const todoModel: import("mongoose").Model<{
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
}, import("mongoose").Document<unknown, {}, {
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    description?: string | null;
    isDone: boolean;
    createdAt: NativeDate;
    user: import("mongoose").Types.ObjectId;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=todoModel.d.ts.map