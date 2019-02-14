let express = require('express');
let app = express();
let barRoute = require('./routes/bar');
let path = require('path');
let bodyParser = require('body-parser');
const cors = require('cors');


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

app.use(barRoute);
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