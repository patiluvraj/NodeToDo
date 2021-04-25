var express=require('express');
var controller=require('./Controllers');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log('Connected to mongodb');

var app=express();

app.use('/assets',express.static(__dirname+'//Public'));
app.use('/staticAssets',express.static(__dirname+'//Public//Static'));

app.set('view engine','ejs');

controller(app);

app.listen(3000);
console.log('Listening on port 3000');