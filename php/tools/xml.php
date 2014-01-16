<?php

require_once(dirname(__FILE__)."/../structs/tablejoin.php");
require_once(dirname(__FILE__)."/../structs/eobject.php");
require_once(dirname(__FILE__)."/../structs/tabstyle.php");
require_once(dirname(__FILE__)."/../tools/topological_sort.php");
require_once(dirname(__FILE__)."/../structs/graph_node.php");

class Xml{

	public $xmlsqljoins;
	public $xmltab;

	function xml_init_sqljoins($xmlstr){
		$this->xmlsqljoins = new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_join(){
		$join_list=array();
		foreach ($this->xmlsqljoins->join as $join) {
			$joinObj=new TableJoin;
			$joinObj->table1=(string)$join["table1"];
			$joinObj->table2=(string)$join["table2"];
			$joinObj->column1=(string)$join["column1"];
			$joinObj->column2=(string)$join["column2"];
			$joinObj->type=(string)$join["type"];
			$join_list[]=$joinObj;
		}
		return json_encode($join_list);
	}
	
	function xml_parse_join_no_json(){
		$join_list=array();
		foreach ($this->xmlsqljoins->join as $join) {
			$joinObj=new TableJoin;
			$joinObj->table1=(string)$join["table1"];
			$joinObj->table2=(string)$join["table2"];
			$joinObj->column1=(string)$join["column1"];
			$joinObj->column2=(string)$join["column2"];
			$joinObj->type=(string)$join["type"];
			$join_list[]=$joinObj;
		}
		return $join_list;
	}
	
	function xml_init_tab($xmlstr){
		$this->xmltab = new SimpleXMLElement($xmlstr);
	}

	function xml_parse_tab_properties(){
		$style_list=array();
		foreach ($this->xmltab->properties->style as $style) {
			$styleObj=new TabStyle;
			$styleObj->attr=(string)$style["attr"];
			$styleObj->data=(string)$style["data"];
			$style_list[]=$styleObj;
		}
		return json_encode($style_list);
	}
	
	function xml_parse_tab_objects(){
		$obj_list=array();
		foreach ($this->xmltab->objects->object as $object) {
			$objObj=new EObject;
			$objObj->x=(string)$object["x"];
			$objObj->y=(string)$object["y"];
			$objObj->w=(string)$object["w"];
			$objObj->h=(string)$object["h"];
			$objObj->type=(string)$object["type"];
			$objObj->style=(string)$this->xml_parse_tab_objects_object($object);
			$objObj->data=(string)$object["data"];
			$objObj->column=(string)$object["column"];
			$objObj->column_on=(string)$object["column_on"];
			$obj_list[]=$objObj;
		}
		return json_encode($obj_list);
	}
	
	function xml_parse_tab_objects_object($object){
		$obj_list=array();
		foreach ($object->style as $style) {
			$objObj=new TabStyle;
			$objObj->attr=(string)$style["attr"];
			$objObj->data=(string)$style["data"];
			$obj_list[]=$objObj;
		}
		return $obj_list;
	}

}

?>
