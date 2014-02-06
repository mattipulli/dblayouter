<?php

require_once(dirname(__FILE__)."/../structs/tablejoin.php");
require_once(dirname(__FILE__)."/../structs/eobject.php");
require_once(dirname(__FILE__)."/../structs/tabstyle.php");
require_once(dirname(__FILE__)."/../tools/topological_sort.php");
require_once(dirname(__FILE__)."/../structs/graph_node.php");
require_once(dirname(__FILE__)."/../structs/row_column.php");
require_once(dirname(__FILE__)."/../structs/graphics_object.php");
require_once(dirname(__FILE__)."/../structs/result_changes.php");
require_once(dirname(__FILE__)."/../structs/diagram_label.php");

class Xml{

	public $xmlsqljoins;
	public $xmltab;
	public $xmlrowdata;
	public $xmlgraphics;
	public $xmlchanges;
	public $xmldiagram;
	
	function xml_init_diagram_labels($xmlstr){
		$this->xmldiagram=new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_diagram_labels(){
		$labels_list=array();
		$labels_list[]=array("title"=>(string)$this->xmldiagram->title[0]["title"]);
		foreach($this->xmldiagram->label as $label){
			$labelObj=new DiagramLabel;
			$labelObj->label=(string)$label["label"];
			$labelObj->data=(string)$label["data"];
			$labelObj->column=(string)$label["column"];
			$labels_list[]=$labelObj;
		}
		return json_encode($labels_list);
	}
	
	function xml_init_result_changes($xmlstr){
		$this->xmlchanges=new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_result_changes(){
		$changes_list=array();
		foreach($this->xmlchanges->change as $change){
			$changeObj=new ResultChanges;
			$changeObj->from=(string)$change["from"];
			$changeObj->to=(string)$change["to"];
			$changes_list[]=$changeObj;
		}
		return json_encode($changes_list);
	}
	
	function xml_init_graphics($xmlstr){
		$this->xmlgraphics = new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_graphics(){
		$graphics_list=array();
		foreach ($this->xmlgraphics->object as $object) {
			$graphicsObj=new GraphicsObject;
			$graphicsObj->type=(string)$object["type"];
			$graphicsObj->x=(string)$object["x"];
			$graphicsObj->y=(string)$object["y"];
			$graphicsObj->w=(string)$object["w"];
			$graphicsObj->h=(string)$object["h"];
			$graphicsObj->x2=(string)$object["x2"];
			$graphicsObj->y2=(string)$object["y2"];
			$graphicsObj->r=(string)$object["r"];
			$graphics_list[]=$graphicsObj;
		}
		return json_encode($graphics_list);
	}

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
			$objObj->style=(string)$object["style"];
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
	
	function xml_init_rowdata($xmlstr){
		$this->xmlrowdata = new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_row_data(){
		$rowcolumn_list=array();
		foreach($this->xmlrowdata->columndata as $columndata ){
			$column=(string)$columndata["column"];
			$data=(string)$columndata["data"];
			$rowcolumnObj=new RowColumn;
			$rowcolumnObj->column=$column;
			$rowcolumnObj->rowdata=$data;
			$rowcolumn_list[]=$rowcolumnObj;
		}
		return $rowcolumn_list;
	}

}

?>
