var todos=require('../DbModule/ToDoModule');

module.exports=function(app){
    app.get('/',function(req,res){
        todos.find(function(err,result){
            
            res.render('../Public/index',{Todos:result});
        });        
    });
};