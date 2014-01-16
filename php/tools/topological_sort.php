<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require_once(dirname(__FILE__)."/../structs/graph_node.php");
require_once(dirname(__FILE__)."/../structs/tablejoin.php");

class TopologicalSort{
	
	public $list_L=array();
	public $list_S=array();
	public $list_full=array();

	function topological_sort(){
		$this->find_nodes_no_incoming();

		while(count($this->list_S)>0){
			$n=array_shift($this->list_S);
			$this->list_L[]=$n;
			while(count($n->neighbours)>0){
					$m=array_pop($n->neighbours);
					$n->neighbours=array_values($n->neighbours);
					if($this->any_incoming($m)==0){
						array_push($this->list_S,$m);
					}
			}
		}
		
		if($this->has_edges()==1){
			return -1;
		}else{
			return $this->list_L;
		}

	}
	
	function find_nodes_no_incoming(){
		$list_no_incoming=array();
		for($i=0;$i<count($this->list_full);$i++){
			if($this->any_incoming($this->list_full[$i])==0){
				$list_no_incoming[]=$this->list_full[$i];
			}
		}
		$this->list_S=$list_no_incoming;
	}
	
	function has_edges(){
		for($i=0;$i<count($this->list_full);$i++){
			if(count($this->list_full[$i]->neighbours)>0){
				return 1;
			}
		}
		return 0;
	}
	
	function any_incoming($m){
		for($i=0;$i<count($this->list_full);$i++){
				for($j=0; $j<count($this->list_full[$i]->neighbours); $j++){
					if(isset($this->list_full[$i]->neighbours[$j])){
						if( strcmp($this->list_full[$i]->neighbours[$j]->name, $m->name) == 0  ){
							return 1;
						}
					}
				}
		}	
		return 0;
	}
	
	function in_array($arr, $table_name){
		for($i=0; $i<count($arr); $i++){
			if(strcmp($arr[$i]->name,$table_name)==0){
				return 1;
			}
		}
		return 0;
	}
	
	function graph_init($arr){
		$nodes=array();
		for($i=0; $i<count($arr); $i++){
			if($this->in_array($nodes, $arr[$i]->table1)==0){
				$nodeObj=new GraphNode;
				$nodeObj->name=$arr[$i]->table1;
				$nodes[]=$nodeObj;
			}
			if($this->in_array($nodes, $arr[$i]->table2)==0){
				$nodeObj=new GraphNode;
				$nodeObj->name=$arr[$i]->table2;
				$nodes[]=$nodeObj;
			}
		}
		
		for($i=0; $i<count($nodes); $i++){
			for($j=0; $j<count($arr);$j++){
				if( strcmp($arr[$j]->table1,$nodes[$i]->name)==0 ){
					for($k=0; $k<count($nodes); $k++){
						if(strcmp($nodes[$k]->name,$arr[$j]->table2)==0){
							$nodes[$i]->neighbours[]=$nodes[$k];
						}
					}
				}
			}
		}
		$this->list_full=$nodes;
		//var_dump($nodes);
		return $nodes;
	}
	
	function graph_create($arr){
		$nodes=array();
		for($i=0; $i<count($arr); $i++){
			if($this->in_array($nodes, $arr[$i]->table1)==0){
				$nodeObj=new GraphNode;
				$nodeObj->name=$arr[$i]->table1;
				$nodes[]=$nodeObj;
			}
			if($this->in_array($nodes, $arr[$i]->table2)==0){
				$nodeObj=new GraphNode;
				$nodeObj->name=$arr[$i]->table2;
				$nodes[]=$nodeObj;
			}
		}
		
		for($i=0; $i<count($nodes); $i++){
			for($j=0; $j<count($arr);$j++){
				if( strcmp($arr[$j]->table1,$nodes[$i]->name)==0 ){
					for($k=0; $k<count($nodes); $k++){
						if(strcmp($nodes[$k]->name,$arr[$j]->table2)==0){
							$nodes[$i]->neighbours[]=$nodes[$k];
						}
					}
				}
			}
		}
		return $nodes;
	}

}

?>