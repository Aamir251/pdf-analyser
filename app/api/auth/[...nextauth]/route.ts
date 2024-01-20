import { authenticateUser, getUser } from "@/lib/services/UserService";
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

        const user = await authenticateUser(credentials?.email!, credentials?.password!)
        
        if(user){
          return user
        }

        return null
        
      },
    })
  ],

  secret : process.env.NEXTAUTH_SECRET as string,

  pages : {
    signIn : "/login"
  },

  callbacks : {


    // async signIn(params) {
        /**
         * If using OAuth providers, on successful signIn, 
         * we can save user to DB in the callback signIn function
        */
    // },
    async session({ session }) {

      if(session?.user?.email) {
        const user = await getUser(session?.user?.email)
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