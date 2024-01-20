import { DBUser, User, SessionUser } from '@/types/User';
import { Db, Collection } from 'mongodb';
import { connectToDB } from '../db/connectToDB';



const getUserCollection = (db : Db) : Collection<User> => db.collection<User>('users')

export const createUser = async (user : User) => {

  const db : Db = await connectToDB()

  const userCollections = getUserCollection(db)

  const result = await userCollections.insertOne(user)

  if(result.acknowledged) {
    return {
      success : true
    }
  }

  return {
    success : false,
    message : "Failed To Create User"
  }

}

export const getUser = async (email : string) : Promise<SessionUser> =>
{
  const db : Db = await connectToDB()

  const userCollections = getUserCollection(db)

  const user =  await userCollections.findOne({ email })

  if(user) {
    return {
      _id : user._id,
      name : user.name,
      email : user.email,
    }
  } 

  throw new Error("User Not Found")
}


export const userExistsInDB = async (email : string ) : Promise<boolean> => 
{
  const db : Db = await connectToDB()

  const userCollections = getUserCollection(db)

  const user =  await userCollections.findOne({ email })

  if (user) return true

  return false
}

const getUserWithPassword = async (email : string) : Promise<DBUser | null> => {
  const db : Db = await connectToDB()

  const userCollections = getUserCollection(db)

  const user =  await userCollections.findOne({ email })

  if(user) {
    return user
  } 

  return null
}


const verifyPassword = async ( password : string, hashedPassword : string ) : Promise<boolean> => 
{
  return (await import('argon2')).verify(hashedPassword, password)
}

export const authenticateUser = async (email : string, password : string) : Promise<SessionUser | null> => 
{

  const user = await getUserWithPassword(email);

  if (!user) {
    // User not found
    throw new Error("Invalid Email")
  }

  const isPasswordValid = await verifyPassword(password, user.password)

  
  if(isPasswordValid) {
    return {
      _id : user._id,
      name : user.name,
      email : user.email,
    }
  } else {
    throw new Error("Password is Incorrect")
  }

}