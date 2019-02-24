let mongoose = require('mongoose');
const keys = require('../keys');

console.log(process.env.NODE_VERSION);

const server = keys.mongoDatabase;
const database = 'bars';
const PORT = keys.mongoPort;
const password = keys.mongoPassword;
const mongoString = `mongodb://${server}:${PORT}/${database}`;
console.log(mongoString);

mongoose.connect(mongoString);

let barsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    startTime:{
        type: String,
        require: true
    },
    endTime:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
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