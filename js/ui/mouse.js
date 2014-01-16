var editor_size_on=0;

function mouseX(evt) {
	if (evt.pageX) return evt.pageX;
	else if (evt.clientX)
	   return evt.clientX + (document.documentElement.scrollLeft ?
	   document.documentElement.scrollLeft :
	   document.body.scrollLeft);
	else return null;
}

function mouseY(evt) {
	if (evt.pageY) return evt.pageY;
	else if (evt.clientY)
	   return evt.clientY + (document.documentElement.scrollTop ?
	   document.documentElement.scrollTop :
	   document.body.scrollTop);
	else return null;
}

function editSize(e,obj,sizdiv){
	if(editor_size_on==1){
		obj.style.height=(mouseY(e)-$(obj).offset().top)+"px";
		obj.style.width=(mouseX(e)-$(obj).offset().left)+"px";
		sizdiv.style.top=(obj.offsetHeight-5)+"px";
		sizdiv.style.left=(obj.offsetWidth-5)+"px";
	}
}

