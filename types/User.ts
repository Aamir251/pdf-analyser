import { ObjectId } from "mongodb";

export interface SessionUser {
  _id : ObjectId,
  name : string,
  email : string,
}

export interface User {
  name : string
  email : string
  password : string
}

export interface DBUser extends SessionUser {
  password : string
}

