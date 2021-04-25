var apiController=require('./apiControllers');
var setupController=require('./setupController');
var htmlController=require('./htmlControllers');

module.exports=function(app){
    apiController(app);
    htmlController(app);
    setupController(app);
}