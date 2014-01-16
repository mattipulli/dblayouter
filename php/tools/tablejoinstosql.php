<?php

require_once(dirname(__FILE__)."/../structs/tablejoin.php");
require_once(dirname(__FILE__)."/../structs/graph_node.php");

class TableJoinsToSQL{

	public $node_sql=array();
	public $sorted_list;
	public $graph;
	public $joins;
	
	function create_join($obj){
		$sql="";
		for($i=0; $i<count($this->joins); $i++){
			if(strcmp($this->joins[$i]->table1, $obj->name)==0){
				$table1=$this->joins[$i]->table1;
				$table2=$this->joins[$i]->table2;
				$column1=$this->joins[$i]->column1;
				$column2=$this->joins[$i]->column2;
				$sql=$sql." LEFT JOIN ".$table2." ON ".$table1.".".$column1."=".$table2.".".$column2." ";
			}
		}
		
		return $sql;
	}
	
	function iterate(){
		$whole_sql="SELECT * FROM ".$this->sorted_list[0]->name." ";
		for($i=0; $i<count($this->sorted_list); $i++){
			$whole_sql=$whole_sql.$this->create_join($this->sorted_list[$i]);
		}
		return $whole_sql;
	}
	
}

?>