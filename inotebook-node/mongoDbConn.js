const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongoDB = async () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to mongo db successfully");
    })
}

module.exports = connectToMongoDB;