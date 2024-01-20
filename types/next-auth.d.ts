import { IUser } from "@/lib/services/UserService";
import { ObjectId } from "mongodb";
import NextAuth from "next-auth/";

declare module "next-auth" {
    /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */

    interface Session {
        user : {
            id : ObjectId
            email : string,
            name : string
        }
    }

    interface User {
        id? : ObjectId,
        _id : ObjectId,
        email : string,
        name : string
    }
}

// https://github.com/nextauthjs/next-auth/discussions/1599