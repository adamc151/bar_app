let BarModel = require('../models/bar.model');
let express = require('express');
let router = express.Router();

router.post('/bar', (req, res) =>{
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }

    let model = new BarModel(req.body);
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc);
            }
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })

});

router.get('/bar', (req,res) => {
    if(!req.query.place_id){
        return res.status(400).send('missing URL param: place_id');
    }
    BarModel.findOne({
        place_id: req.query.place_id
    })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/bars', (req,res) => {

    BarModel.find()
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/locations', (req,res) => {

    if(!req.query.long || !req.query.lat || !req.query.miles){
        return res.status(400).send('missing URL params: long, lat, miles');
    }

    // BarModel.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [53.7961272,-1.5440538999999944]}, $maxDistance: 5 * 1609.34 } } })
    BarModel.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [req.query.lat, req.query.long]}, $maxDistance: req.query.miles * 1609.34 } } })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.put('/bar', (req,res) => {
    if(!req.query.place_id){
        return res.status(400).send('missing URL param: place_id');
    }
    BarModel.findOneAndUpdate({
        place_id: req.query.place_id
    }, req.body, { new:true })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.delete('/bar', (req,res) => {
    if(!req.query.place_id){
        return res.status(400).send('missing URL param: place_id');
    }
    BarModel.findOneAndRemove({
        place_id: req.query.place_id
    })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/find', (req,res) => {

    if(!req.query.name){
        return res.status(400).send('missing URL params: name');
    }

    BarModel.find({ "name" : { $regex: req.query.name, $options: 'i' }}).select({ "name": 1, "place_id": 1, "_id": 0})
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;