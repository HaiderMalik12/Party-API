var express = require('express');
var app = express();
var PORT = process.env.PORT || 4000;
var _ = require('underscore');
var parties = [];
var partyNextId = 1;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hey Express !!');
});

//GET /parties/:q?

app.get('/parties', function (req, res) {

   var queryParams=req.query;
    var filteredparties=parties;
    if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
        filteredparties = _.filter(filteredparties, function (party) {
            return party.name.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;

        });
    }
    res.json(filteredparties);


});

//Get /parties/:id

app.get('/parties/:id', function (req, res) {
    var partyId = parseInt(req.params.id, 10);
    var matchedParty = _.findWhere(parties, {id: partyId});
    if (matchedParty) {
        res.json(matchedParty);
    }
    else {
        res.status(400).send();
    }

});

//POST /parties
app.post('/parties', function (req, res) {

//validate is there is party Object
    var body = _.pick(req.body, 'name', 'type', 'credit', 'debit', 'balance', 'city');

    if (!_.isString(body.name) || body.name.trim().length === 0 || !_.isString(body.type) || body.type.trim().length === 0 || !_.isString(body.city) || body.city.trim().length === 0 || !_.isNumber(body.credit) || !_.isNumber(body.debit) || !_.isNumber(body.balance)
    ) {
        return res.status(400).send();
    }


    body.id = partyNextId++;
    body.name = body.name.trim();
    body.type = body.type.trim();

    parties.push(body);

    res.json(body);

});

//DELETE /parties/:id

app.delete('/parties/:id', function (req, res) {
    var partyId = parseInt(req.params.id, 10);
    var matchedParty = _.findWhere(parties, {id: partyId});
    if (matchedParty) {

        //delete the matched party from parties
        parties = _.without(parties, matchedParty);
        res.json(matchedParty);
    }
    else {
        res.status(404).send();
    }

});

//PUT /parties/:id

app.put('/parties/:id', function (req, res) {

    var partyId = parseInt(req.params.id, 10);
    var matchedParty = _.findWhere(parties, {id: partyId});
    var body = _.pick(req.body, 'name', 'type', 'credit', 'debit', 'balance', 'city');
    var validateAtrributes = {};

    if (!matchedParty) {

        return res.status(400).send();
    }

    if (body.hasOwnProperty('name') && _.isString(body.name) && body.name.trim().length > 0) {
        validateAtrributes.name = body.name;
    }
    else if (body.hasOwnProperty('name')) {
        return res.status(400).send();
    }
    if (body.hasOwnProperty('type') && _.isString(body.type) && body.type.trim().length > 0) {
        validateAtrributes.type = body.type;
    }
    else if (body.hasOwnProperty('type')) {
        return res.status(400).send();
    }
    if (body.hasOwnProperty('city') && _.isString(body.city) && body.city.trim().length > 0) {
        validateAtrributes.city = body.city;
    }
    else if (body.hasOwnProperty('city')) {
        return res.status(400).send();
    }
    if (body.hasOwnProperty('credit') && _.isNumber(body.credit)) {
        validateAtrributes.credit = body.credit;
    }
    else if (body.hasOwnProperty('credit') && !_.isNumber(body.credit)) {
        return res.status(400).send();
    }

    else if (body.hasOwnProperty('credit')) {
        return res.status(400).send();
    }
    if (body.hasOwnProperty('debit') && _.isNumber(body.debit)) {
        validateAtrributes.debit = body.debit;
    }
    else if (body.hasOwnProperty('debit')) {
        return res.status(400).send();
    }
    else if (body.hasOwnProperty('debit') && !_.isNumber(body.debit)) {
        return res.status(400).send();
    }
    if (body.hasOwnProperty('balance') && _.isNumber(body.balance)) {
        validateAtrributes.balance = body.balance;
    }
    else if (body.hasOwnProperty('balance')) {
        return res.status(400).send();
    }
    else if (body.hasOwnProperty('balance') && !_.isNumber(body.balance)) {
        return res.status(400).send();
    }
    _.extend(matchedParty, validateAtrributes);
    res.json(matchedParty);

});



app.listen(PORT, function () {
    console.log('Express is started listening on PORT :' + PORT);
});
