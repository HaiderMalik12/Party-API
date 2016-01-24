
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
sequelize.sync({force:true})
    .then(function () {
    console.log('-----------------------Start Create Parties-------------------------------------------');
    party.create({
        name:'Haider Malik',
        type:'Yarn',
        city:'FSD',
        credit:1000.0,
        debit:1000.0,
        balance:1000.0
    });
     return party.create({
         name:'Shah g',
         type:'dye',
         city:'FSD',
         credit:100.0,
         debit:100.0,
         balance:1000.0
     });

}).then(function(){
   return party.create({
       name:'Shah g',
       type:'dye',
       city:'FSD',
       credit:100.0,
       debit:100.0,
       balance:1000.0
   });
}).then(function(){

    return party.create({
        name:'Shah g',
        type:'dye',
        city:'FSD',
        credit:100.0,
        debit:100.0,
        balance:1000.0
    });
}).then(function(){
    console.log('--------------------Start Find All ----------------------------------');
    return party.findAll({
        where:{
            name:{
                like:'%Shah g%'
            }
        }
    })
}).then(function(parties){
    parties.forEach(function(party){
        console.log(party.toJSON());
    });
    return party.findById('1');
}).then(function(party){
    console.log('----------------Start Find By Id -------------------------------------');
    console.log(party.toJSON());
}).catch(function(e){
    console.log(e);
});