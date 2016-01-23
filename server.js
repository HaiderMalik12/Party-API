var express=require('express');
var app=express();
var PORT=process.env.PORT || 4000;
var _=require('underscore');
var parties=[];
var partyNextId=1;
var bodyParser=require('body-parser');

app.use(bodyParser.json());

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

//POST /parties
app.post('/parties',function(req,res){

//validate is there is party Object
 var body=_.pick(req.body,'name','type','credit','debit','balance','city');
  
    if(!_.isString(body.name) || body.name.trim().length===0 ||
    	  !_.isString(body.type) || body.type.trim().length===0 ||
    	  !_.isString(body.city) || body.city.trim().length===0 ||
    	  !_.isNumber(body.credit)||
    	  !_.isNumber(body.debit) ||
    	  !_.isNumber(body.balance)
        )
    {
    	return res.status(400).send();
    }


  body.id=partyNextId++;
  body.name=body.name.trim();
  body.type=body.type.trim();
   
   parties.push(body);
  
  res.json(body);

   });

app.listen(PORT,function(){
	console.log('Express is started listening on PORT :' +PORT);
});
