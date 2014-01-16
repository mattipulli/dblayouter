
function Ajax(){

}

Ajax.prototype={

	ajaxPost:function(variable_arr, callback){
		/*$.post( "././php/handle_post.php", variable_arr)
		.done(function( data ) {
			callback(data);
		});*/

		$.ajax({
			url: "././php/handle_post.php",
			type: "post",
			data: variable_arr,
			success: function(data){
			    callback(data);
			},
			error:function(){
			    
			},
			async:false
		    });
	}

}
