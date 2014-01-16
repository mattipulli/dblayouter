<?php

require_once(dirname(__FILE__)."/../structs/user.php");
require_once(dirname(__FILE__)."/../tools/hash.php");

class ControllerUser{

	public $DB;
	public $hash;
	
	function controller_new_user($username, $password1, $password2){
		if($username!=NULL && $password1!=NULL && $password2!=NULL){
			if(strcmp($password1, $password2) == 0){
				$userObj=new User;
				$userObj->username=$username;
				$userObj->password=$password1;
				$userObj=$this->hash->crypt_password($userObj);
				$this->DB->db_user_create_user($userObj);
				echo 'Success!';
			}else{
				echo 'Error!';
			}
		}else{
			echo 'Error!';
		}
	}
	
}

?>