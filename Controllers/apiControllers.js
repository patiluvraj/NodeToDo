var bodyParser=require('body-parser');
var todos=require('../DbModule/ToDoModule');

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/api/todos/:userName',function(req,res){
        console.log('/api/todos/:userName->'+req.params.userName);
        todos.find({user:req.params.userName},function(err,result){
            if(err) throw err;
            res.json(result);
        });
    });  
    app.get('/api/todo/:id',function(req,res){
        console.log('GET /api/todo/:id->'+req.params.id);
        todos.find({_id:req.params.id},function(err,result){
            if(err) throw err;
            res.json(result);
        });
    });
    
    app.post('/api/todo/',function(req,res){
        console.log('POST /api/todo/->'+JSON.stringify(req.body));
        todos.create({
            user:req.body.user,
            todo:req.body.todo,
            isDone:req.body.isDone,
        },function(err,result){
            if(err) throw err;
            console.log('created todo'+ result);
            res.status(200).send({id:result._id});
        })
    });
    app.put('/api/todo/',function(req,res){
        console.log('PUT /api/todo/->'+JSON.stringify(req.body));
        var updatetodo={};
        if(req.body.hasOwnProperty('todo'))
        {
            console.log('todo present in body');
            updatetodo.todo=req.body.todo;
        }
        if(req.body.hasOwnProperty('isDone'))
        {
            console.log('isDone present in body');
            updatetodo.isDone=req.body.isDone;
        }

        console.log('updating to'+JSON.stringify(updatetodo));
        todos.findByIdAndUpdate(req.body.id,updatetodo,function(err,result){
            if(err) throw err;
            console.log('updated todo '+ result);
            res.status(200).send({id:result._id});
        })
    });
    app.delete('/api/todo/',function(req,res){
        console.log('DELETE /api/todo/->'+req.body.id);
        todos.findByIdAndRemove(req.body.id,function(err,result){
            if(err) throw err;
            console.log(result);
            res.sendStatus(200);
        });
    });

};