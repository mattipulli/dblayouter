
function CanvasPoint(canvas,x, y){
	this.x=x;
	this.y=y;
	this.canvas=canvas;
}

CanvasPoint.prototype={

	draw:function(){
		var ctx=this.canvas.getContext("2d");
		ctx.strokeRect(this.x,this.y,1,1); 
	}
  
}