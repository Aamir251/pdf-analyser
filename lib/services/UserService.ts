import { SessionUser } from '@/types/SessionUser';
import { Db, Collection, ObjectId } from 'mongodb';

interface SaveUser {
  name : string
  email : string
  password : string
}

interface IDatabaseUser {
  _id : ObjectId,
  name : string
  email : string
  password : string
}


const getUserCollection = (db : Db) : Collection<SaveUser> => db.collection<SaveUser>('users')

export const createUser = async (db : Db, user : SaveUser) => {

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

export const getUser = async (db : Db, email : string) : Promise<SessionUser> =>
{
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


export const userExistsInDB = async (db : Db, email : string ) : Promise<boolean> => 
{
  const userCollections = getUserCollection(db)

  const user =  await userCollections.findOne({ email })

  if (user) return true

  return false
}

const getUserWithPassword = async (db : Db, email : string) : Promise<IDatabaseUser | null> => {
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

export const authenticateUser = async (db : Db, email : string, password : string) : Promise<SessionUser | null> => 
{

  const user = await getUserWithPassword(db, email);

  if (!user) {
    // User not found
    throw new Error("Invalid Email")
  }

  const isPasswordValid = await verifyPassword(password, user.password)

  console.log({ isPasswordValid });

  
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