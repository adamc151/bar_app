let express = require('express');
let fs = require('fs');
let jwt = require('jsonwebtoken');
let app = express();
let barRoute = require('./routes/bar');
let path = require('path');
let bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');

let jwtSecret = keys.jwtSecret;

app.use(cors());
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
})

app.get('/jwt', (req, res) => {
    let token = jwt.sign({ "body": "stuff" }, jwtSecret, { algorithm: 'HS256'});
    res.send(token);
})

function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        console.log('token: ' + token);
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, jwtSecret, { algorithm: "HS256" }, (err, user) => {
            
            // if there has been an error...
            if (err) {  
                // shut them out!
                console.log('header defined but still not working: ' + err)
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        console.log('header undefined')
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}

app.use(isAuthorized, barRoute);
app.use(express.static('public'));

app.use((req,res,next) =>{
    res.status(404).send('We think you are lost');
})

app.use((err,req,res,next) =>{
    console.log(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));