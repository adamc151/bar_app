let mongoose = require('mongoose');
const keys = require('../keys');

const MONGO_USERNAME = keys.mongoUsername;
const MONGO_PASSWORD = keys.mongoPassword;
const MONGO_HOSTNAME = keys.mongoHostname;
const MONGO_PORT = keys.mongoPort;
const MONGO_DB = keys.mongoDatabase;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

console.log(url);

mongoose.connect(url, {useNewUrlParser: true}).catch(err => {
    console.log(err);
});

let barsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    startTime:{
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    place_id:{
        type: String,
        require: true
    },
});


module.exports = mongoose.model('Bar', barsSchema);