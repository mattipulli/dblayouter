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
require_once(dirname(__FILE__)."/../structs/row_column.php");

class DB{
	private $db_connection;
	private $database;
	private $settings;
	
	function db_set_database($database){
		$this->database=$database;
		$this->settings=new Settings;
	}
	
	function db_create_connection(){
		$db_file=$this->database->file;
		$this->db_connection = new PDO('mysql:unix_socket=/home/mattipul/mysql/socket;dbname='.$db_file, $this->settings->username, $this->settings->password);        
       		$this->db_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	
 	function db_exec($sqlstatement){
                try {
                        $mysqlquery = $this->db_connection->prepare($sqlstatement);
                         if($mysqlquery->execute() == FALSE){
                                die("Error!");
                        }
                }catch(Exception $e){
                        die("Error!");
                }
        }

        function db_select($sqlstatement){
                try{
                        $mysqlquery = $this->db_connection->prepare($sqlstatement);
                         $ret=$mysqlquery->execute();
                        if($ret==TRUE){                
                                return $mysqlquery->fetchAll();
                        }else{
                                die("Error!");
                        }
                }catch(Exception $e){
                       die("Error!");
                }
        }

        function db_exec_esc($sqlstatement, $hide_array){
               // try{
                        $mysqlquery = $this->db_connection->prepare($sqlstatement);
                        $ret=$mysqlquery->execute($hide_array);
                         if($ret == FALSE){
                                die("Error!");
                        }
               // }catch(Exception $e){
                //        die("Error!");
                //}
        }
        
        function db_select_esc($sqlstatement, $hide_array){
                //try{
                        $mysqlquery = $this->db_connection->prepare($sqlstatement);
                         $ret=$mysqlquery->execute($hide_array);
                        if($ret==TRUE){                
                                return $mysqlquery->fetchAll();
                        }else{
                                die("Error!");
                        }
                //}catch(Exception $e){
                //        die("Error!");
                //}
        }

	//TABLE

	function create_table_create_columns($tableObj){
		$columnObj=new Column;
		for($i=0; $i<count($tableObj->column_arr);$i++){
			$columnObj=$tableObj->column_arr[$i];
			$columnObj->table_id=$tableObj->table_id;
			$this->db_column_create_column($columnObj);
		}
	}

	function create_table_column_string($column_arr, $table_name){
		$return_string="id_".$table_name." int PRIMARY KEY AUTO_INCREMENT,";

		for($i=0; $i<count($column_arr);$i++){
			$return_string=$return_string." ".$column_arr[$i]->column_name. " ".$column_arr[$i]->column_type;
			if($i<count($column_arr)-1){
				$return_string=$return_string.",";
			}
		}

		return $return_string;
	}
	
	function db_table_create_table($table){
		$tableObj=new Table;
		$tableObj=$table;
		$this->db_exec("CREATE TABLE ".$tableObj->table_name." ( ".$this->create_table_column_string($tableObj->column_arr, $tableObj->table_name)." );");
		$this->db_exec("INSERT INTO DBTable (id_table, table_name) VALUES ( NULL, '".$tableObj->table_name."' );");
		$ret_object = $this->db_select("SELECT id_table FROM DBTable ORDER BY id_table DESC LIMIT 1;");
        $tableObj->table_id=$ret_object[0]['id_table'];
		$this->create_table_create_columns($tableObj);
	}
	
	function db_table_destroy_table($table){
		$tableObj=new Table;
		$tableObj=$table;
		
		$hide_array=array(":id"=>$tableObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);
        $tableObj->table_name=$ret_object[0]['table_name'];
		
		$this->db_exec("DROP TABLE ".$tableObj->table_name.";");
		
		$hide_array=array(":id"=>$tableObj->table_id);
		$this->db_exec_esc("DELETE FROM DBTable WHERE id_table=:id", $hide_array);
		$this->db_exec_esc("DELETE FROM DBColumn WHERE id_table=:id", $hide_array);
	}
	
	function db_table_change_name($table, $new_table_name){
		$tableObj=new Table;
		$tableObj=$table;
		
		$hide_array=array(":id"=>$tableObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);
        $tableObj->table_name=$ret_object[0]['table_name'];
		
		$this->db_exec("RENAME TABLE ".$tableObj->table_name." TO ".$new_table_name);
		
		$tableObj->table_name=$new_table_name;	
		$hide_array=array(":id"=>$tableObj->table_id, ":name"=>$tableObj->table_name);
		$this->db_exec_esc("UPDATE DBTable SET table_name=:name WHERE id_table=:id;", $hide_array);
	}
	
	function db_table_get($table){
	
	}
	
	function db_table_get_all(){
		$ret_object=$this->db_select("SELECT * FROM DBTable;");
		$table_list=array();
		foreach ($ret_object as $table)
        {
            $table_name=$table['table_name'];
			$table_id=$table["id_table"];
			
            $tableObj=new Table;
			$tableObj->table_id=$table_id;
			$tableObj->table_name=$table_name;
			
			$tableObj->column_arr=$this->db_column_get_by_table($tableObj);

            array_push( $table_list, (object)$tableObj );
        }
		return $table_list;
	}
	
	////////
	
	//LAYOUT
	
	function db_layout_create_layout($layout){
		$layoutObj=new Layout;
		$layoutObj=$layout;
		
		$hide_array=array(":name"=>$layoutObj->layout_name);
		$this->db_exec_esc("INSERT INTO DBLayout (id_layout, layout_name) VALUES (NULL, :name);", $hide_array);
	}
	
	function db_layout_destroy_layout($layout){
		$layoutObj=new Layout;
		$layoutObj=$layout;
		
		$hide_array=array(":id"=>$layoutObj->layout_id);
		$this->db_exec_esc("DELETE FROM DBLayout WHERE id_layout=:id;", $hide_array);
		$this->db_exec_esc("DELETE FROM DBTab WHERE id_layout=:id;", $hide_array);
	}
	
	function db_layout_change_name($layout){
		$layoutObj=new Layout;
		$layoutObj=$layout;
		
		$hide_array=array(":id"=>$layoutObj->layout_id, ":name"=>$layoutObj->layout_name);
		$this->db_exec_esc("UPDATE DBLayout SET layout_name=:name WHERE id_layout=:id", $hide_array);
	}
	
	function db_layout_get($layout){
	
	}
	
	function db_layout_get_all(){
		$ret_object=$this->db_select("SELECT * FROM DBLayout;");
		$layout_list=array();
		foreach ($ret_object as $layout)
        {
            $layout_name=$layout['layout_name'];
			$layout_id=$layout["id_layout"];
			
            $layoutObj=new Layout;
			$layoutObj->layout_name=$layout_name;
			$layoutObj->layout_id=$layout_id;
			
			$layoutObj->layout_tab_arr=$this->db_tab_get_by_layout($layoutObj);

            array_push( $layout_list, (object)$layoutObj );
        }
		return $layout_list;
	}
	
	////////
	
	//TAB
	
	function db_tab_create_tab($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		$hide_array=array(":tab_name"=>$tabObj->tab_name, ":tab_type"=>$tabObj->tab_type, ":id"=>$tabObj->layout_id, ":xml"=>$tabObj->xml, ":joins"=>$tabObj->sql);
		$this->db_exec_esc("INSERT INTO DBTab (id_tab, id_layout, tab_name, tab_type, xml, sqljoins) VALUES (NULL, :id, :tab_name, :tab_type, :xml, :joins);", $hide_array);
	}
	
	function db_tab_destroy_tab($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		
		$hide_array=array(":id"=>$tabObj->tab_id, ":sql"=>$tabObj->sql);
		$this->db_exec_esc("UPDATE DBTab SET sqljoins=:sql WHERE id_tab=:id;", $hide_array);
	}
	
	function db_tab_change_sql($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		
		$hide_array=array(":id"=>$tabObj->tab_id, ":name"=>$tabObj->tab_name);
		$this->db_exec_esc("UPDATE DBTab SET tab_name=:name WHERE id_tab=:id", $hide_array);
	}
	
	function db_tab_change_name($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		
		$hide_array=array(":id"=>$tabObj->tab_id, ":name"=>$tabObj->tab_name);
		$this->db_exec_esc("UPDATE DBTab SET tab_name=:name WHERE id_tab=:id", $hide_array);
	}
	
	function db_tab_change_type($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		
		$hide_array=array(":id"=>$tabObj->tab_id, ":type"=>$tabObj->tab_type);
		$this->db_exec_esc("UPDATE DBTab SET tab_type=:type WHERE id_tab=:id", $hide_array);
	}
	
	function db_tab_change_xml($tab){
		$tabObj=new Tab;
		$tabObj=$tab;
		
		$hide_array=array(":id"=>$tabObj->tab_id, ":xmldata"=>$tabObj->xml);
		$this->db_exec_esc("UPDATE DBTab SET xml=:xmldata WHERE id_tab=:id", $hide_array);
	}
	
	function db_tab_get($tab){
		$hide_array=array(":id"=>$tab->tab_id);
		$ret_object=$this->db_select_esc("SELECT * FROM DBTab WHERE id_tab=:id;", $hide_array);
		
		$tab=$ret_object[0];
		$tab_name=$tab["tab_name"];
		$tab_id=$tab["id_tab"];
		$tab_type=$tab["tab_type"];
		$tab_sql=$tab["sqljoins"];
		$tab_xml=$tab["xml"];
		$layout_id=$tab["id_layout"];
			
        $tabObj=new Tab;
		$tabObj->tab_name=$tab_name;
		$tabObj->tab_type=$tab_type;
		$tabObj->sql=$tab_sql;
		$tabObj->xml=$tab_xml;
		$tabObj->tab_id=$tab_id;
		$tabObj->layout_id=$layout_id;
		
		return $tabObj;
	}
	
	function db_tab_get_all(){
	
	}
	
	function db_tab_get_by_layout($layout){
		$hide_array=array(":id"=>$layout->layout_id);
		$ret_object=$this->db_select_esc("SELECT * FROM DBTab WHERE id_layout=:id;", $hide_array);
		$tab_list=array();
		foreach ($ret_object as $tab)
        {
            $tab_name=$tab["tab_name"];
			$tab_id=$tab["id_tab"];
			$tab_type=$tab["tab_type"];
			$tab_sql=$tab["sqljoins"];
			$tab_xml=$tab["xml"];
			$layout_id=$tab["id_layout"];
			
            $tabObj=new Tab;
			$tabObj->tab_name=$tab_name;
			$tabObj->tab_type=$tab_type;
			$tabObj->sql=$tab_sql;
			$tabObj->xml=$tab_xml;
			$tabObj->tab_id=$tab_id;
			$tabObj->layout_id=$layout_id;
			
            array_push( $tab_list, (object)$tabObj );
        }
		return $tab_list;
	}
	
	////////
	
	//USER
	
	function db_user_create_user($user){
		$userObj=new User;
		$userObj=$user;
		
		$hide_array=array(":usr"=>$userObj->username, ":usrhash"=>$userObj->hash, ":usrsalt"=>$userObj->salt);
		$this->db_exec_esc("INSERT INTO DBUser (id_user, username, hash, salt) VALUES(NULL, :usr, :usrhash, :usrsalt);", $hide_array);
	}
	
	function db_user_destroy_user($user){
	
	}
	
	function db_user_change_name($user, $new_user_name){
	
	}
	
	function db_user_get($user){
	
	}
	
	function db_user_get_all(){
	
	}
	
	/////////
	
	//ROW
	
	function db_row_set_row($row){
		$rowObj=new Row;
		$rowObj=$row;
		$ret_object=$this->db_select("SELECT count(*) AS count FROM ".$rowObj->table_name);
		if($ret_object[0]["count"]>=$rowObj->row){
			$this->db_row_update_row($rowObj);
			echo '<';
		}
		else if($ret_object[0]["count"]<$rowObj->row){
			$rowObj->row=$ret_object[0]["count"]+1;
			$this->db_row_add_row($rowObj);
			$this->db_row_update_row($rowObj);
		}
	}
	
	function db_row_add_row($row){
		 $rowObj=new Row;
		 $rowObj=$row;
		 $this->db_exec("INSERT INTO ".$rowObj->table_name." (id_".$rowObj->table_name.") VALUES (NULL);");
	}
	
	function db_row_get_row($row){
		$rowObj=new Row;
		$rowObj=$row;	
		$ret_object=$this->db_select($rowObj->sql."  LIMIT ".($rowObj->row-1).",1;");
		return $ret_object;
	}
	
	function db_row_set_sql_construct($data){
		$setsql="";
		
		for($i=0; $i<count($data); $i++){
			$setsql=$setsql." ".$data[$i]->column."='".$data[$i]->rowdata."' ";
			if($i<count($data)-1){
				$setsql=$setsql.",";
			}
		}
		
		return $setsql;
	}
	
	function db_row_get_id($row){
		$rowObj=new Row;
		$rowObj=$row;
		$ret_object=$this->db_select("SELECT id_".$rowObj->table_name." AS id FROM ".$rowObj->table_name." LIMIT ".($rowObj->row-1).",1;");
		return $ret_object[0]["id"];
	}
	
	function db_row_update_row($row){
		$rowObj=new Row;
		$rowObj=$row;
		$setSQL=$this->db_row_set_sql_construct($rowObj->data);
		$setRow=$this->db_row_get_id($rowObj);
		echo "UPDATE ".$rowObj->table_name." SET ".$setSQL." WHERE id_".$rowObj->table_name."=".$setRow.";";
		$this->db_exec("UPDATE ".$rowObj->table_name." SET ".$setSQL." WHERE id_".$rowObj->table_name."=".$setRow.";");
	}
	
	function db_row_destroy_row($row){
	
	}
	
	////////
	
	//COLUMN
	
	function db_column_create_column($column){
		$hide_array=array(":id_table"=>$column->table_id, ":column_name"=>$column->column_name, ":column_type"=>$column->column_type);
		$this->db_exec_esc("INSERT INTO DBColumn (id_column, id_table, column_name, column_type) VALUES (NULL, :id_table, :column_name, :column_type);", $hide_array);
	}
	
	function db_column_add_column($column){
		$columnObj=$column;
	
		$hide_array=array(":id"=>$columnObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);		
		$columnObj->table_name=$ret_object[0]['table_name'];
		
		$this->db_exec("ALTER TABLE ".$columnObj->table_name." ADD ".$columnObj->column_name." ".$columnObj->column_type.";");
		
		$hide_array=array(":id_table"=>$columnObj->table_id, ":column_name"=>$columnObj->column_name, ":column_type"=>$columnObj->column_type);
		$this->db_exec_esc("INSERT INTO DBColumn (id_column, id_table, column_name, column_type) VALUES (NULL, :id_table, :column_name, :column_type);", $hide_array);
	}
	
	function db_column_destroy_column($column){
		$columnObj=new Column;
		$columnObj=$column;

		$hide_array=array(":id"=>$columnObj->column_id);
		$ret_object = $this->db_select_esc("SELECT id_table,column_name FROM DBColumn WHERE id_column=:id;", $hide_array);		
		$columnObj->table_id=$ret_object[0]['id_table'];
		$columnObj->column_name=$ret_object[0]['column_name'];
		
		$hide_array=array(":id"=>$columnObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);		
		$columnObj->table_name=$ret_object[0]['table_name'];
		
		$this->db_exec("ALTER TABLE ".$columnObj->table_name." DROP COLUMN ".$columnObj->column_name.";");
		
		$hide_array=array(":column_id"=>$columnObj->column_id);
		$this->db_exec_esc("DELETE FROM DBColumn WHERE id_column=:column_id;", $hide_array);
	}
	
	function db_column_change_name($column, $new_column_name){
		$columnObj=new Column;
		$columnObj=$column;

		$hide_array=array(":id"=>$columnObj->column_id);
		$ret_object = $this->db_select_esc("SELECT id_table,column_name,column_type FROM DBColumn WHERE id_column=:id;", $hide_array);		
		$columnObj->table_id=$ret_object[0]['id_table'];
		$columnObj->column_name=$ret_object[0]['column_name'];
		$columnObj->column_type=$ret_object[0]['column_type'];
		
		$hide_array=array(":id"=>$columnObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);		
		$columnObj->table_name=$ret_object[0]['table_name'];
		
		
		$this->db_exec("ALTER TABLE ".$columnObj->table_name." CHANGE ".$columnObj->column_name." ".$new_column_name." ".$columnObj->column_type.";");
		
		$hide_array=array(":column_name"=>$new_column_name, ":column_id"=>$columnObj->column_id);
		$this->db_exec_esc("UPDATE DBColumn SET column_name=:column_name WHERE id_column=:column_id;", $hide_array);
	}
	
	function db_column_set_type($column){
		$columnObj=new Column;
		$columnObj=$column;
	
		$hide_array=array(":id"=>$columnObj->column_id);
		$ret_object = $this->db_select_esc("SELECT id_table,column_name FROM DBColumn WHERE id_column=:id;", $hide_array);		
		$columnObj->table_id=$ret_object[0]['id_table'];
		$columnObj->column_name=$ret_object[0]['column_name'];
		
		$hide_array=array(":id"=>$columnObj->table_id);
		$ret_object = $this->db_select_esc("SELECT table_name FROM DBTable WHERE id_table=:id;", $hide_array);		
		$columnObj->table_name=$ret_object[0]['table_name'];
			
		$this->db_exec("ALTER TABLE ".$columnObj->table_name." MODIFY COLUMN ".$columnObj->column_name." ".$columnObj->column_type.";");
		
		$hide_array=array(":column_type"=>$columnObj->column_type, ":column_id"=>$columnObj->column_id);
		$this->db_exec_esc("UPDATE DBColumn SET column_type=:column_type WHERE id_column=:column_id;", $hide_array);	
	}
	
	function db_column_get($column){
	
	}
	
	function db_column_get_all(){
	
	}
	
	function db_column_get_by_table($table){
		$hide_array=array(":id"=>$table->table_id);
		$ret_object=$this->db_select_esc("SELECT * FROM DBColumn WHERE id_table=:id;", $hide_array);
		$column_list=array();
		foreach ($ret_object as $column)
        {
			$column_id=$column['id_column'];
            $column_name=$column['column_name'];
			$column_type=$column['column_type'];
			
            $columnObj=new Column;
			$columnObj->column_id=$column_id;
			$columnObj->column_name=$column_name;
			$columnObj->column_type=$column_type;
			$columnObj->table_id=$table->table_id;
			$columnObj->table_name=$table->table_name;
			
            array_push( $column_list, (object)$columnObj );
        }
		return $column_list;
	}
	
	////////
	
	//AUTOHORIZE
	
	function db_login_auth($user){
	
	}
	
	////////
	
	//PERMISSION
	
	function db_permission_get_grants($user){
	
	}
	
	function db_permission_set_grants($permission){
	
	}
	
	////////
	
	//SEARCH
	
	function db_search($searchterm, $tab){
	
	}
	
	////////
	
}

?>
