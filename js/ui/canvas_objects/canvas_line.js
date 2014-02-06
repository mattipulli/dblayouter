
function CanvasLine(canvas,x1,y1,x2,y2){
	this.x1=x1;
	this.y1=y1;
	this.x2=x2;
	this.y2=y2;
	this.canvas=canvas;
}

CanvasLine.prototype={

	draw:function(){
		var ctx=this.canvas.getContext("2d");
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);
		ctx.stroke();
	}
  
}