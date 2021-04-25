$(document).ready(function(){
    $("#getTodods").click(ShowAllTodosforCurrentUser);
    $("#addTodo").click(ShowModalPopupToAddTodo);    
    $(".close").click(CloseModalPopupToAddTodo);   
    $("#btnReset").click(ResetAddPopup);   
    $('#clearTodods').click(ClearTodos);
    $('#btnAddUser').click(AddTodo);
    $(".deletetodo").click(DeleteTodo);            
});
function DeleteTodo(e){
    if(confirm('Are you sure you want to delete?')){
    var buttonName=e.currentTarget.name;
    var todoId=buttonName.replace('delete_','');
    
    $.ajax({
        url: "/api/todo/",
        type:'delete',
        data:{id:todoId}, 
        success: function(result){            
            ShowAllTodosforCurrentUser();
      }});
    }
}
function AddTodo(){
    $('#addTodoErrorMessage').text('');    
    var uName=$('#userNameAdd').val();
    if(!uName || uName===""){
        $('#addTodoErrorMessage').text('User name can not be empty.');            
    }
    else{
        var enteredTodo=$('#todoAdd').val();
        if(!enteredTodo || enteredTodo===""){
            $('#addTodoErrorMessage').text('Todo can not be empty.');    
        }
        else{
            $.post( "/api/todo", { user: uName, todo: enteredTodo })
            .done(function( data ) {
                CloseModalPopupToAddTodo();
                var userName=$('#txtUserName').val();
                if(!userName ||  userName==="")
                {
                    $('#txtUserName').val(uName);
                }
                ShowAllTodosforCurrentUser();
            });
        }
    }

}
function ClearTodos(){
    $('#txtUserName').val('').removeAttr("disabled");
    $('#getTodods').removeAttr("disabled");
    ShowTodos(null);
}
function ResetAddPopup(){
    $('#addTodoErrorMessage').text('');  
    $('#todoAdd').attr("style", "").val("");
    var userName=$('#txtUserName').val();
    if(userName){
        $('#userNameAdd').val(userName).attr("disabled", "disabled");
    }
    else{
        $('#userNameAdd').val('').removeAttr("disabled");
    }
}
function CloseModalPopupToAddTodo(){
    //Close modal popup
    $('.modal').css('display','none');
}
function ShowModalPopupToAddTodo(){
    //Show popup to add todo
    ResetAddPopup();
    $('.modal').css('display','block');
}
function GetAllTodosForUserAndUpdateUI(userName){
    //get all todos from server
    $.ajax({
        url: "/api/todos/"+userName, 
        success: function(result){            
            ShowTodos(result);
      }});
}

function ShowTodos(todos){
    //create Ui for todos
    $('#allTodosDiv').empty();
    if(Array.isArray(todos) && todos.length){ 
        DisableUserData();       
        $('#noTodosDiv').hide()
        $.each(todos,function(index,val){
            var strEleement=`<div><table style="width: 100%;"><tbody><tr><td style="width: 90%;"><div class="todoDiv">${val.todo}</div></td><td><button class="deletetodo" type="button" name="delete_${val._id}"><img src="/staticAssets/deleteTodo.png" alt="Delete" width="30" height="30"/></button></td></tr></tbody></table></div>`;
            $('#allTodosDiv').append(strEleement);
        });
        $(".deletetodo").click(DeleteTodo);   
    }
    else{
        $('#noTodosDiv').show();
    }      
}
function DisableUserData(){
    $('#txtUserName').attr("disabled", "disabled");
    $('#getTodods').attr("disabled", "disabled");
}
function ShowAllTodosforCurrentUser(){    
    ClearUserNameErrorMessage();
    var userName=$('#txtUserName').val();
    if(userName){
        GetAllTodosForUserAndUpdateUI(userName);
    }
    else{
        ShowUserNamError();
    }
}
function ClearUserNameErrorMessage(){
    // Show username error message
    $('#userErrorMessage').text('');
}
function ShowUserNamError(){
    // Show username error message
    $('#userErrorMessage').text('Please enter valid user name');
}
