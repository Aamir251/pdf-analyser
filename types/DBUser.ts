import { ObjectId } from "mongodb";

export interface DBUser {
    _id : ObjectId,
    name : string,
    email : string,
    password : string
}