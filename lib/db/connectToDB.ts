import { Db, MongoClient } from "mongodb";



let cachedDb : Db;

export const connectToDB = async () => {
    if(cachedDb) {
        console.log("Database Already Connected");
        
        return cachedDb
    }
    const URL = process.env.MONGODB_URI

    if(!URL) throw new Error('Mongodb URL not found ');

    const client = new MongoClient(URL)

    try {
        await client.connect()
        const db = client.db('promptify')
        cachedDb = db;

        console.log("Connected To Database");
        return db
        
    } catch (error : any) {
        console.log("Error Connecting to DB ", error.stack);
    } finally {
        return cachedDb
    }

}