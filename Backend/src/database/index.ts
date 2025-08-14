import mongoose from "mongoose";

const dbConnection = async():Promise<typeof mongoose | undefined> =>{
    try {
        const connectionString:string = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        const connectionInstance = await mongoose.connect(connectionString)
        return connectionInstance;
    } catch (error) {
        console.log("Something went wrong while connecting database",error)
        return undefined
    }
}

export default dbConnection