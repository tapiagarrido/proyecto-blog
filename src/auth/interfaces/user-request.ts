import { Request } from "express";
import { ObjectId } from "mongoose";

export interface UserRequest extends Request {
    user: {
        _id: ObjectId,
        name: string,
        surname: string,
        phone: string,
        email: string,
        password: string,
        role: string,
    }
}
