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
    if(!req.query.name){
        return res.status(400).send('missing URL param: name');
    }
    BarModel.findOne({
        name: req.query.name
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

router.put('/bar', (req,res) => {
    if(!req.query.name){
        return res.status(400).send('missing URL param: name');
    }
    BarModel.findOneAndUpdate({
        name: req.query.name
    }, req.body, { new:true })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.delete('/bar', (req,res) => {
    if(!req.query.name){
        return res.status(400).send('missing URL param: name');
    }
    BarModel.findOneAndRemove({
        name: req.query.name
    })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;