<?php

require_once(dirname(__FILE__)."/../structs/tab.php");
require_once(dirname(__FILE__)."/../structs/row.php");
require_once(dirname(__FILE__)."/../structs/tablejoin.php");
require_once(dirname(__FILE__)."/../structs/eobject.php");
require_once(dirname(__FILE__)."/../structs/tabstyle.php");
require_once(dirname(__FILE__)."/../tools/topological_sort.php");
require_once(dirname(__FILE__)."/../tools/tablejoinstosql.php");
require_once(dirname(__FILE__)."/../structs/graph_node.php");

class ControllerRow{
	
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
	
	function controller_row_get_row($tab_id, $row){
		if($tab_id!=NULL && $row!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabRet->sql);
			$joins=$this->xml->xml_parse_join_no_json();
			
			if(count($joins)==1){
				$rowObj=new Row;
				$rowObj->row=$row;
				$rowObj->sql="SELECT * FROM ".$joins[0]->table1." ORDER BY id_".$joins[0]->table1." ASC ";
				$ret_object=$this->DB->db_row_get_row($rowObj);
				echo json_encode($ret_object);
			}else{	
				$rowObj=new Row;
				$rowObj->row=$row;
				$rowObj->sql=$this->row_topological_get_sql($joins);
				$ret_object=$this->DB->db_row_get_row($rowObj);
				echo json_encode($ret_object);
			}

		}else{
			echo 'Error!';
		}
	}
	
	function controller_row_set_row($tab_id, $row, $xml){
		if($tab_id!=NULL && $row!=NULL && $xml!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabRet->sql);
			$joins=$this->xml->xml_parse_join_no_json();
			
			if(count($joins)==1){
				$rowSetObj=new Row;
				$rowSetObj->row=$row;
				$rowSetObj->table_name=$joins[0]->table1;
				$this->xml->xml_init_rowdata($xml);
				$rowSetObj->data=$this->xml->xml_parse_row_data();
				
				$this->DB->db_row_set_row($rowSetObj);
			}
		}
	}
	
	function controller_row_get_count($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabRet->sql);
			$joins=$this->xml->xml_parse_join_no_json();
			
			if(count($joins)==1){
				$rowObj=new Row;
				$rowObj->sql="SELECT * FROM ".$joins[0]->table1."";
				$ret_object=$this->DB->db_row_count($rowObj);
				echo $ret_object;
			}else{	
				$rowObj=new Row;
				$rowObj->row=$row;
				$rowObj->sql=$this->row_topological_get_sql($joins);
				$ret_object=$this->DB->db_row_count($rowObj);
				echo $ret_object;
			}
		}
	}
	
	function controller_row_delete($tab_id, $row){
		if($tab_id!=NULL && $row!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabRet->sql);
			$joins=$this->xml->xml_parse_join_no_json();
			
			if(count($joins)==1){
				$rowObj=new Row;
				$rowObj->row=$row;
				$rowObj->table_name=$joins[0]->table1;
				$this->DB->db_row_destroy_row($rowObj);
			}
		}
	}
	
}

?>