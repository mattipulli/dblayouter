
function ControllerUser(){

}

ControllerUser.prototype={

	controller_new_user:function(){
		var variables=new Object();
		variables["type"]=12;
		variables["username"]=$("#new_username").val();
		variables["password1"]=$("#new_password1").val();
		variables["password2"]=$("#new_password2").val();
		this.ajax.ajaxPost(variables, function(data){
			alert(data);
		});	
	}

}
