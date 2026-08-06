const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("======================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📂 Database : ${conn.connection.name}`);
        console.log(`🖥️  Host     : ${conn.connection.host}`);
        console.log("======================================");

    } catch (error) {
        console.error("======================================");
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        console.error("======================================");
        process.exit(1);
    }
};

// Connection Events
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB Error:", err.message);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
    process.exit(0);
});

module.exports = connectDB;