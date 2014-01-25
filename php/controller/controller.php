<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

require_once(dirname(__FILE__)."/../structs/database.php");
require_once(dirname(__FILE__)."/../structs/layout.php");
require_once(dirname(__FILE__)."/../structs/tab.php");
require_once(dirname(__FILE__)."/../tools/login.php");
require_once(dirname(__FILE__)."/../structs/searchresults.php");
require_once(dirname(__FILE__)."/../structs/row.php");
require_once(dirname(__FILE__)."/../structs/column.php");
require_once(dirname(__FILE__)."/../structs/table.php");
require_once(dirname(__FILE__)."/../structs/user.php");
require_once(dirname(__FILE__)."/../structs/file.php");
require_once(dirname(__FILE__)."/../structs/settings.php");
require_once(dirname(__FILE__)."/../structs/eobject.php");
require_once(dirname(__FILE__)."/../structs/permissions.php");
require_once(dirname(__FILE__)."/../structs/searchterm.php");
require_once(dirname(__FILE__)."/../database/db.php");
require_once(dirname(__FILE__)."/../tools/hash.php");
require_once(dirname(__FILE__)."/../tools/xml.php");

require_once(dirname(__FILE__)."/controller_column.php");
require_once(dirname(__FILE__)."/controller_layout.php");
require_once(dirname(__FILE__)."/controller_row.php");
require_once(dirname(__FILE__)."/controller_search.php");
require_once(dirname(__FILE__)."/controller_tab.php");
require_once(dirname(__FILE__)."/controller_table.php");
require_once(dirname(__FILE__)."/controller_user.php");

class Controller{

	public $controller_column;
	public $controller_layout;
	public $controller_row;
	public $controller_search;
	public $controller_tab;
	public $controller_table;
	public $controller_user;
	
	public $DB;
	public $xml;
	public $hash;
	
	//INITS
	
	function controller_init_column(){
		$this->controller_column=new ControllerColumn;
		$this->controller_column->DB=$this->DB;
	}
	
	function controller_init_layout(){
		$this->controller_layout=new ControllerLayout;
		$this->controller_layout->DB=$this->DB;
	}
	
	function controller_init_row(){
		$this->controller_row=new ControllerRow;
		$this->controller_row->DB=$this->DB;
		$this->controller_row->xml=$this->xml;
	}
	
	function controller_init_search(){
		$this->controller_search=new ControllerSearch;
		$this->controller_search->DB=$this->DB;
		$this->controller_search->xml=$this->xml;
	}
	
	function controller_init_tab(){
		$this->controller_tab=new ControllerTab;
		$this->controller_tab->DB=$this->DB;
		$this->controller_tab->xml=$this->xml;
	}
	
	function controller_init_table(){
		$this->controller_table=new ControllerTable;
		$this->controller_table->DB=$this->DB;
	}
	
	function controller_init_user(){
		$this->controller_user=new ControllerUser;
		$this->controller_user->DB=$this->DB;
	}
	
	function controller_init(){
		$databaseObj=new Database;
		$databaseObj->file="dblayouter";
		
		$this->DB=new DB;
		$this->DB->db_set_database($databaseObj);
		$this->DB->db_create_connection();
		
		$this->hash=new Hash;
		
		$this->xml=new Xml;
	}
	
	////////////////////
	////////////////////
	
	function clean_string($str){
		return $str;
	}
	
	function controller_get_database(){
			$databaseObj=new Database;
			$tableObj=new Table;
			$columnObj=new Column;
			$tabObj=new Tab;
			$layoutObj=new Layout;
			
			$databaseObj->table_arr=$this->DB->db_table_get_all();
			$databaseObj->layout_arr=$this->DB->db_layout_get_all();
			
			echo json_encode($databaseObj);
			
	}
	
	function controller_sync($tab_id, $xml){
		if($tab_id!=NULL && $xml!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->xml=$xml;
			$this->DB->db_tab_change_xml($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	

}

?>