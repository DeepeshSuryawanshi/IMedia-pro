import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!
if(!MONGODB_URI) throw new Error("MONGO DB URI not Found");

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn:null,promise:null};
}

export async function connectDB() {
    // already connet
    if(cached.conn) return cached.conn;console.log("already connected")
    // not have promise
    if(!cached.promise){
        const opt = {
            bufferCommands:true,
            maxPoolSize:10
        }
        // connect to DB
        console.log("Creating DB connection promiss")
        cached.promise = mongoose.connect(MONGODB_URI,opt)
        .then(()=>mongoose.connection)
    }
    
    // checking the connecting
    try {
        console.log("DB connectiong try")
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    // retrun the cached connection
    return cached.conn
}