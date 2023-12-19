import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
    timestamps: true
})
export class Post extends Document{

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    category: string[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post)