import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps:true,
})
export class User extends Document{

    @Prop()
    name: string;

    @Prop()
    surname:string;

    @Prop({required:false})
    phone: string;

    @Prop({unique: [true, "No puede existir un correo duplicado"], required:[true]})
    email: string;

    @Prop({required:true, minlength: 6})
    password: string;

    @Prop()
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);