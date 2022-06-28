const mongoose = require("mongoose");

const connectMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connection Successful")
        })
        .catch(err => {
            if(err.name === "MongoServerError" & err.code === 8000){
                console.log("WARNING : Check your MongoDB connection")
            }else{
                console.log(err)
            }
        })
};
module.exports = connectMongoDB;