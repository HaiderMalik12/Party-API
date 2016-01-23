var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;
var _=require('underscore');
var parties=[{
	id:1,
	name:"Burj Bank",
	type:"Yarn",
	credit:0.0,
	debit:0.0,
	balance:0.0,
	city:'FSD'
},
{
	id:2,
	name:"Haider Malik",
	type:"Grey",
	credit:110.0,
	debit:0.0,
	balance:110.0,
	city:'LHR'
}];


app.get('/',function(req,res){
res.send('Hey Express !!');
});

//GET /parties

app.get('/parties',function(req,res){
 
 res.json(parties);

});

//Get /parties/:id

app.get('/parties/:id',function(req,res){
 var partyId=parseInt(req.params.id,10);
 var matchedParty=_.findWhere(parties,{id:partyId});
 if(matchedParty)
 {
 	res.json(matchedParty);
 }
 else{
 	res.status(400).send();
 }

});

app.listen(PORT,function(){
	console.log('Express is started listening on PORT :' +PORT);
});