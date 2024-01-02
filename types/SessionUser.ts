import { ObjectId } from "mongodb";

export interface SessionUser {
    _id : ObjectId,
    name : string,
    email : string,
}