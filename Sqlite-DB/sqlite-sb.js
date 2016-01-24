/**
 * Created by HaiderNazir on 1/23/2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
    'dialect': 'sqlite',
    'storage': __dirname + '/itextile-db.sqlite'
});
//Define a Party Model
var party = sequelize.define('party',{
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    credit:{
        type:Sequelize.FLOAT
    },
    debit:{
        type:Sequelize.FLOAT
    },
    balance:{
        type:Sequelize.FLOAT
    }

});
sequelize.sync({force:true}).then(function () {
    console.log('Everything is synced !!');
    party.create({
        name:'Haider Malik',
        type:'Yarn',
        city:'FSD',
        credit:1000.0,
        debit:1000.0,
        balance:1000.0
    });
    console.log('Finished !!');
    console.log(party);
});