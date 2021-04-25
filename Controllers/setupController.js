var todos=require('../DbModule/ToDoModule');

module.exports=function(app){

    app.get('/api/createTestTodods',function(req,res){
        todos.countDocuments(function(err,count){
            if(err) throw err;
            console.log('current rows in db->'+count);
            if(count<=0)
            {
                var todoRows=[
                    {
                        user:'test',
                        todo:'Buy milk',
                        isDone:false    
                    },
                    {
                        user:'test',
                        todo:'Iron Clothes',
                        isDone:false    
                    },
                    {
                        user:'test',
                        todo:'Send money',
                        isDone:false    
                    }            
                ];
                todos.create(todoRows,function(err,rows){
                    if(err) throw err;
                    res.send(rows);
                });
            } 
            else
            {
                res.end();
            }           
        });            
    });    

};