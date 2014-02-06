
function XMLParse(){

}

XMLParse.prototype={
 
	returnXMLObject:function(xmlstr){
		xmlDoc = $.parseXML( xmlstr ),
		$xml = $( xmlDoc ),
		return $xml;
	}
  
}