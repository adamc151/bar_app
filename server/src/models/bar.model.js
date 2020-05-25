let mongoose = require('mongoose');
const keys = require('../keys');

const MONGO_USERNAME = keys.mongoUsername;
const MONGO_PASSWORD = keys.mongoPassword;
const MONGO_HOSTNAME = keys.mongoHostname;
const MONGO_PORT = keys.mongoPort;
const MONGO_DB = keys.mongoDatabase;
const MONGO_PROD = keys.mongoProd;
let url = '';

if(MONGO_PROD == "Atlas"){
    url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`
}
else if(MONGO_PROD == "true"){
    url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
}
else{
    url = `mongodb://mongo:${MONGO_PORT}/${MONGO_DB}`;
}
console.log(url);

mongoose.connect(url);

let barsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    city:{
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
        require: true,
        unique: true
    },
    website:{
        type: String,
        require: false
    },
    social:{
        type: [{
            facebook:{
                type: String,
                require: false
            },
            instagram:{
                type: String,
                require: false
            },
            twitter:{
                type: String,
                required: false
            },
        }],
    },
    customPhotos:{
        type: Boolean,
        require: false
    },
    imgUrl:{
        type: String,
        require: false
    },
    imgUrls:{
        type: [String],
        require: false
    },
    validated:{
        type: Boolean,
        require: true
    },
    deals:{
        type: [{
            startTime:{
                type: String,
                require: true
            },
            endTime:{
                type: String,
                require: true
            },
            weekDays:{
                type: [Number],
                required: true
            },
            description:{
                type: [String],
                require: true
            },
            fullDescription:{
                type: String,
                require: true
            }
        }],
        required: true
    }
});


module.exports = mongoose.model('Bar', barsSchema);