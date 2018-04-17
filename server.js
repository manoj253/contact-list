var express = require('express'); // To access express
var app = express(); // we can use the express module in server.js file
var mongojs = require('mongojs'); // to access mongodb
var db = mongojs('contactlist',['contactlist']);// which mongodb & which db
var bodyParser = require('body-parser');//access bodyParser function

app.use(express.static(__dirname + "/public")); // static(they dont change), this uses the HTML CSS  img files __dirname + "/public" - where to look in files
app.use(bodyParser.json());// server can push body
app.get('/contactlist',function(req, res){
  //console.log("I received a Get request")

  db.contactlist.find(function(err,docs){
    //docs, response for the documents from db
    //console.log(docs); // It's destination to receive the db from documents
    res.json(docs);
  });
  // person1 = {
  //   name: 'Sid',
  //   email: 'sid123@gmail.com',
  //   number: '7780412345'
  // };
  //
  // person2 = {
  //   name: 'manoj',
  //   email: 'manoj456@gmail.com',
  //   number: '8201245678',
  // };
  //
  // person3 = {
  //   name: 'nicolas',
  //   email: 'nicolas7892@gmail.com',
  //   number: '99876543210',
  // };
  //
  // var contactlist = [person1, person2, person3]; // created a dummy data line 6 - 24
  // res.json(contactlist);
});

app.post('/contactlist',function(req, res){
  //console.log(req.body);//getting data from body, diz code wont work coz server dont know push a body data
  //below step is used to insert the input data into mongodb database
  db.contactlist.insert(req.body,function(err,docs){
    res.json(docs)
  })
});

app.delete('/contactlist/:id',function(req, res){
  db.contactlist.remove({_id:db.ObjectId(req.params.id)},function(err,docs){
    if(err){
      console.log("Error in mongojs")
    }else{
      console.log(docs);
      res.json(docs);
    }
  })
});

app.get('/contactlist/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,docs){
    res.json(docs);//dis will test & send the data back to controller
  });
});

app.put('/contactlist/:id', function(req,res){
  var id = req.params.id;
  console.log(req.body);
  db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number, city: req.body.city}},
      new: true},function(err,docs){
        res.json(docs);
      });
});



app.listen(process.env.PORT || 3000); // localhost 3k
console.log("Server running on port 3000");
// app.get('/',function(req,res){
//   res.send("Hi Swappy")
// })
// app.get('/swappy',function(req,res){
//   res.send("Welcome to page 2 of this site")
// })
