import { connectToDB } from "@/lib/db/connectToDB"
import { createUser, userExistsInDB } from "@/lib/services/UserService"
import argon2 from 'argon2'


export async function POST(request : Request) {

    try {
        
        const { name, email, password } = await request.json()

        // validate if email and password are valid texts or not
        
        /** 
         * Checking if user already exists in database
        */

        const db = await connectToDB()

        const userAlreadyExists : boolean = await userExistsInDB(email)

        if(userAlreadyExists) throw Error("User Already Exists")

        /** 
         * Create and save user to database
        */
        // Hash password
        const hashedPassword = await argon2.hash(password)

        await createUser({
            name,
            email,
            password : hashedPassword,
        })
        
        return  Response.json(
            { success : true, message : "User Created Successfully" },
            { status : 201 }
        )

    } catch (error : any) {
        console.log("Register Error ", { error });
        
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}