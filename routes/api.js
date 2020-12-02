// this code that talks to the database
// this is going to help connect the vue client to the server
let express = require('express');

// this will look for the models/index.js file
let db = require('../models');
let ActivityRecord = db.ActivityRecord;

let Sequelize = require('sequelize');

// a router runs on the server and listens for requests, and figures out which
// part of the code is going to run in response to the requests.
// In other words, a router matches a request to functions that respond to them
let router = express.Router()               // create a router

// our server will have the following questions to ask (get, post, patch, delete requests)

// route for getting all records (get request)
// a request to records will cause the attached function to run
router.get('/activity_records', function (req, res, next) {
    // get all records from the database, order records by date
    ActivityRecord.findAll( {order: ['date']} )
        .then( (records) => {
            // convert to JSON and return as response to client
            return res.json(records);
        })
        .catch( err => next(err) )
})


// route for getting one specified record (get request)
router.get('/activity_records/:id', function (req, res, next) {
    ActivityRecord.findByPk(req.params.id)
        .then( (record) => {
            if (record)
            {
                return res.json(record);
            }
            else
            {
                return res.status(404).send('get request: 404 activity record not found');
            }
        })
        .catch( err => next(err) )
})


// route for adding a new record (post request)
router.post('/activity_records', function (req, res, next) {
    let requestData = req.body;

    ActivityRecord.create(requestData)
        .then( (data) => {
            return res.status(201).send('ok');
        })
        // .catch( err => next(err))
        .catch( err => {
            if (err instanceof Sequelize.ValidationError)
            {
                let messages = err.errors.map( (e) => e.message );
                console.log(messages);
                return res.status(400).json(messages);              // 400 = bad request from user
            }

            return next(err);
        })
})


// route for a patch request (for updating activity record information)
router.patch('/activity_records/:id', function (req, res, next) {
    ActivityRecord.update( req.body, {where: {id: req.params.id}} )
        .then( (rowsModified) => {
            if (!rowsModified[0])
            {
                // 404 = not found, record with this ID not found
                return res.status(404).send('patch/update request: 404 Not found');
            }
            else
            {
                return res.send('patch/update request: ok');
            }
        })
        .catch( err => {
            if (err instanceof Sequelize.ValidationError)
            {
                let messages = err.errors.map( (e) => e.message );

                return res.status(400).json(messages);              // 400 = bad request from user
            }

            return next(err);
        })
})


// route for deleting a record (delete request)
router.delete('/activity_records/:id', function (req, res, next) {
    ActivityRecord.destroy( {where: {id: req.params.id}} )
        .then( (rowsModified) => {
            return res.send('ok');
        })
        .catch( err => next(err) )
})


// make the router available to the rest of the project
module.exports = router;
