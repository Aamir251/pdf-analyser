import { connectToDB } from "@/lib/db/connectToDB";
import { authenticateUser, getUser } from "@/lib/services/UserService";
import { DBUser } from "@/types/DBUser";
import { SessionUser } from "@/types/SessionUser";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions : AuthOptions = {
  session : {
    strategy :'jwt'
  },
  
  providers : [
    CredentialsProvider({
      name : "Credentials",
      credentials : {
        email : { label : "email", type : "email", placeholder : "Please Enter your email" },
        password : { label : "Password", type : "password",},
      },

      async authorize(credentials) {
        

        
        const db = await connectToDB()

        const user = await authenticateUser(db, credentials?.email!, credentials?.password!)
        
        if(user){
          return user
        }

        return null
        
        /**
         * Verify If user is Valid
        */
        // const user : SessionUser | null = await getUser(db, credentials?.email!)

        // if(user) {
        //     return user
        // }

      },
    })
  ],

  secret : process.env.NEXTAUTH_SECRET as string,

  pages : {
    signIn : "/login"
  },

  callbacks : {
    async session({ session }) {

      if(session?.user?.email) {
        const db = await connectToDB()
        const user = await getUser(db, session?.user?.email)
        session.user.id = user?._id
        session.user.name = user?.name!
      }
      return session
    },
  },
    
}


const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
}