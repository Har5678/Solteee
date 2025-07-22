import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGO_URI);
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    await mongoose.connect(`${process.env.MONGO_URI}/solteee`);

}

export default connectDB;