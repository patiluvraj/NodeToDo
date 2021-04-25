'use strict';
var mongoose=require('mongoose');

var schema=mongoose.Schema;

var toDoSchema=schema({
    user:String,
    todo:String,
    isDone:Boolean        
});

var todos=mongoose.model('Todos',toDoSchema);

module.exports=todos;