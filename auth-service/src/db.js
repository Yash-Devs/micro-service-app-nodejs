import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/userdb', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.log("❌ Error while connecting to MongoDB database", err);
        process.exit(1);
    }
};

export default connectDB;