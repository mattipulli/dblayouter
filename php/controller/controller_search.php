<?php

require_once(dirname(__FILE__)."/../structs/searchterm.php");
require_once(dirname(__FILE__)."/../structs/tab.php");
require_once(dirname(__FILE__)."/../structs/row.php");
require_once(dirname(__FILE__)."/../structs/tablejoin.php");
require_once(dirname(__FILE__)."/../structs/eobject.php");
require_once(dirname(__FILE__)."/../structs/tabstyle.php");
require_once(dirname(__FILE__)."/../tools/topological_sort.php");
require_once(dirname(__FILE__)."/../tools/tablejoinstosql.php");
require_once(dirname(__FILE__)."/../structs/graph_node.php");

class ControllerSearch{

	public $DB;
	public $xml;
	
	function row_topological_get_sql($joins){
		$topological_sorter=new TopologicalSort();
		$topological_sorter->graph_init($joins);
		$joins_sorted_list=$topological_sorter->topological_sort();
		$joins_graph=$topological_sorter->graph_create($joins);
		
		$sqler=new TableJoinsToSQL;
		$sqler->sorted_list=$joins_sorted_list;
		$sqler->graph=$joins_graph;
		$sqler->joins=$joins;
		return $sqler->iterate();
	}
	
	function sql_where_construct($wheres){
		$sql="";
		for($i=0; $i<count($wheres); $i++){
			$sql=$sql." ".$wheres[$i]->column." LIKE '".$wheres[$i]->rowdata."' ";
			if($i<count($wheres)-1){
				$sql=$sql.",";
			}
		}
		return $sql;
	}
	
	function controller_search($tab_id, $xml){
		if($tab_id!=NULL && $xml!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			if($tabRet->tab_type==0){
				$this->xml->xml_init_sqljoins($tabRet->sql);
				$joins=$this->xml->xml_parse_join_no_json();
				$this->xml->xml_init_rowdata($xml);
				$where=$this->xml->xml_parse_row_data();
				
				$searchtermObj=new SearchTerm;
				$searchtermObj->search_term=$this->row_topological_get_sql($joins)." WHERE ".$this->sql_where_construct($where);
				
				$ret_object=$this->DB->db_search($searchtermObj);
				echo json_encode($ret_object);
				//echo $searchtermObj->search_term;
			}
		}else{
		
		}
	}
	

}

?>