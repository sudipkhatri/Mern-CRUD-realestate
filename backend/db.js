import {} from "dotenv/config";
import mongoose from "mongoose";

const URI = mongoose.connect(
   process.env.URI,
 // "mongodb+srv://user1:realestateu1@realestateapp.mloetdk.mongodb.net/?retryWrites=true&w=majority",
  {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  },
  function (error) {
    if (error) {
      return console.log(error);
    }
    console.log("db connection success.");
  }
);

export default URI;
