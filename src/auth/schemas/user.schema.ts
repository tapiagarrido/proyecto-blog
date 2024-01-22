import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

enum UserRole {
    BASIC = 'basic',
    MODERATOR = 'moderator',
    ADMINISTRATOR = 'administrator',
}

@Schema({
    timestamps:true,
})
export class User{

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

    @Prop({ type: String, enum: Object.values(UserRole), default: UserRole.BASIC })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
