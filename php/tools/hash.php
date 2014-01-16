<?php

require_once(dirname(__FILE__)."/../structs/user.php");

class Hash{
	
    function generate_salt(){
		$chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$retstr = '';
		for ($i = 0; $i < 16; $i++) {
			$retstr .= $chars[rand(0, strlen($chars) - 1)];
		}
		return $retstr;
    }
        
    function crypt_password($user){
                
		$salt=$this->generate_salt();
		$hash=crypt($user->password, $salt);
                
		$userRet=new User;
		$userRet=$user;
		$userRet->hash=$hash;
		$userRet->salt=$salt;
                
		return $userRet;
        
    }
	
}

?>